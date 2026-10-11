import { NextResponse } from "next/server";
import { generateBriefIssue } from "@/lib/brief/generator";
import { qaBriefIssue } from "@/lib/brief/qa";
import {
  BRIEF_SCHEDULE_LABEL,
  isBriefAutomationPaused,
  nextThursdayBriefAt,
} from "@/lib/brief/schedule";
import { briefCronAuthorized } from "@/lib/brief/auth";
import { retryFailedSendfableSyncs } from "@/lib/newsletter-sync";
import { retryFailedContactDeliveries } from "@/lib/contact-retry";
import {
  isSendfableConfigured,
  sendfableCreateCampaign,
  sendfableStatus,
} from "@/lib/sendfable-client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

/**
 * Weekly Brief automation cron.
 * Auth: Authorization: Bearer <BRIEF_CRON_SECRET>
 *
 * Query:
 *   ?mode=preview   — generate + QA only (default when paused or dry)
 *   ?mode=schedule  — create SendFable campaign scheduled for next Thu 3pm CT
 *   ?force=1        — allow schedule even if not Thursday window
 *
 * Recommended Hostinger/external cron: every Thursday 14:30 America/Chicago
 * hitting mode=schedule so the campaign is queued for 15:00 CT.
 */
export async function POST(request: Request) {
  try {
    if (!briefCronAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const mode = (url.searchParams.get("mode") || "schedule").toLowerCase();
    const force = url.searchParams.get("force") === "1";

    // Always attempt sync + contact delivery retry (safe, capped)
    const syncRetry = await retryFailedSendfableSyncs(40);
    const contactRetry = await retryFailedContactDeliveries(25).catch((err) => {
      console.error(
        "[brief-cron] contact retry failed:",
        err instanceof Error ? err.message : "error"
      );
      return { attempted: 0, accepted: 0, failed: 0 };
    });

    if (isBriefAutomationPaused() && mode === "schedule" && !force) {
      return NextResponse.json({
        ok: false,
        paused: true,
        message: "Brief automation is paused (BRIEF_AUTOMATION_PAUSED)",
        schedule: BRIEF_SCHEDULE_LABEL,
        syncRetry,
        contactRetry,
      });
    }

    const issue = await generateBriefIssue();
    const qa = await qaBriefIssue(issue);

    if (!qa.ok) {
      console.error("[brief-cron] QA failed:", qa.errors.join("; "));
      return NextResponse.json(
        {
          ok: false,
          stage: "qa",
          errors: qa.errors,
          warnings: qa.warnings,
          subject: issue.subject,
          sections: issue.sections.map((s) => s.id),
          syncRetry,
          contactRetry,
        },
        { status: 422 }
      );
    }

    if (mode === "preview" || mode === "dry") {
      return NextResponse.json({
        ok: true,
        stage: "preview",
        subject: issue.subject,
        previewText: issue.previewText,
        sections: issue.sections.map((s) => s.id),
        meta: issue.meta,
        qa,
        schedule: BRIEF_SCHEDULE_LABEL,
        nextScheduledAt: nextThursdayBriefAt().toISOString(),
        htmlLength: issue.htmlBody.length,
        syncRetry,
        contactRetry,
      });
    }

    if (!isSendfableConfigured()) {
      return NextResponse.json(
        {
          ok: false,
          stage: "sendfable",
          error: "SendFable API not configured (SENDFABLE_API_URL / SENDFABLE_API_SECRET)",
          qa,
          syncRetry,
          contactRetry,
        },
        { status: 503 }
      );
    }

    const status = await sendfableStatus();
    if (status.ok && status.data.campaignSendEnabled === false) {
      return NextResponse.json(
        {
          ok: false,
          stage: "sendfable",
          error: "SendFable CAMPAIGN_SEND_ENABLED is false — refusing to schedule",
          qa,
          syncRetry,
          contactRetry,
        },
        { status: 503 }
      );
    }

    const scheduledAt = nextThursdayBriefAt().toISOString();
    const created = await sendfableCreateCampaign({
      name: `Chicago Boating Brief — ${issue.editionKey}`,
      subject: issue.subject,
      previewText: issue.previewText,
      htmlBody: issue.htmlBody,
      scheduledAt,
      draftOnly: false,
    });

    if (!created.ok) {
      console.error("[brief-cron] campaign create failed");
      return NextResponse.json(
        {
          ok: false,
          stage: "campaign",
          error: created.error,
          qa,
          syncRetry,
          contactRetry,
        },
        { status: created.status || 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      stage: "scheduled",
      campaignId: created.campaignId,
      status: created.status,
      scheduledAt: created.scheduledAt || scheduledAt,
      subject: issue.subject,
      sections: issue.sections.map((s) => s.id),
      badge: created.badge,
      qa,
      syncRetry,
      contactRetry,
      schedule: BRIEF_SCHEDULE_LABEL,
    });
  } catch (err) {
    console.error(
      "[brief-cron] unexpected:",
      err instanceof Error ? err.message : "error"
    );
    return NextResponse.json({ error: "Brief cron failed" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  // Allow GET for simple cron providers that only support GET
  return POST(request);
}
