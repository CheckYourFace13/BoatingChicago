import { NextResponse } from "next/server";
import { generateBriefIssue } from "@/lib/brief/generator";
import { qaBriefIssue } from "@/lib/brief/qa";
import {
  BRIEF_SCHEDULE_LABEL,
  briefIssueSlotKey,
  isBriefAutomationPaused,
  nextThursdayBriefAt,
} from "@/lib/brief/schedule";
import { briefCronAuthorized } from "@/lib/brief/auth";
import { retryFailedSendfableSyncs } from "@/lib/newsletter-sync";
import { retryFailedContactDeliveries } from "@/lib/contact-retry";
import {
  findExistingBriefSchedule,
  isSendfableConfigured,
  sendfableCreateCampaign,
  sendfableListCampaigns,
  sendfableStatus,
  sendfableUntagReserved,
  sendfableUpdateCampaign,
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
 *   ?mode=schedule  — create or refresh SendFable campaign for next Thu 3pm CT
 *   ?force=1        — allow schedule even if automation paused
 *
 * Thursday cron refreshes content on an existing SCHEDULED campaign for the
 * same America/Chicago issue slot (no second campaign / no blast).
 */
export async function POST(request: Request) {
  try {
    if (!briefCronAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const mode = (url.searchParams.get("mode") || "schedule").toLowerCase();
    const force = url.searchParams.get("force") === "1";

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

    const scheduledAtDate = nextThursdayBriefAt();
    const scheduledAt = scheduledAtDate.toISOString();
    const issueSlotKey = briefIssueSlotKey(scheduledAtDate);

    const issue = await generateBriefIssue({
      now: new Date(),
      issueDate: scheduledAtDate,
    });
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
        nextScheduledAt: scheduledAt,
        issueSlotKey,
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

    const untag = await sendfableUntagReserved().catch(() => null);

    const listed = await sendfableListCampaigns();
    if (listed.ok) {
      const existing = findExistingBriefSchedule(
        listed.campaigns,
        scheduledAtDate
      );
      if (existing) {
        // Refresh content in place when still SCHEDULED (same campaign + slot).
        if (existing.status === "SCHEDULED") {
          const refreshed = await sendfableUpdateCampaign({
            campaignId: existing.id,
            name: `Chicago Boating Brief — ${issue.editionKey}`,
            subject: issue.subject,
            previewText: issue.previewText,
            htmlBody: issue.htmlBody,
          });
          if (!refreshed.ok) {
            return NextResponse.json(
              {
                ok: false,
                stage: "refresh",
                error: refreshed.error,
                campaignId: existing.id,
                qa,
                syncRetry,
                contactRetry,
                untag,
              },
              { status: refreshed.status || 502 }
            );
          }
          return NextResponse.json({
            ok: true,
            stage: "refreshed",
            campaignId: refreshed.campaignId,
            status: refreshed.status,
            scheduledAt: refreshed.scheduledAt || existing.scheduledAt,
            issueSlotKey: refreshed.issueSlotKey || issueSlotKey,
            subject: issue.subject,
            sections: issue.sections.map((s) => s.id),
            refreshedAt: refreshed.refreshedAt,
            message:
              "Refreshed weather/news content on the existing SCHEDULED Brief for this America/Chicago issue slot — no duplicate campaign created.",
            qa,
            syncRetry,
            contactRetry,
            untag,
            schedule: BRIEF_SCHEDULE_LABEL,
          });
        }

        return NextResponse.json({
          ok: true,
          stage: "already_scheduled",
          campaignId: existing.id,
          status: existing.status,
          scheduledAt: existing.scheduledAt,
          issueSlotKey: existing.issueSlotKey || issueSlotKey,
          subject: existing.subject,
          message:
            "A Chicago Boating Brief campaign already occupies this America/Chicago issue slot in a non-refreshable status — skipped create.",
          qa,
          syncRetry,
          contactRetry,
          untag,
          schedule: BRIEF_SCHEDULE_LABEL,
        });
      }
    }

    const created = await sendfableCreateCampaign({
      name: `Chicago Boating Brief — ${issue.editionKey}`,
      subject: issue.subject,
      previewText: issue.previewText,
      htmlBody: issue.htmlBody,
      scheduledAt,
      draftOnly: false,
      issueSlotKey,
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
          untag,
        },
        { status: created.status || 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      stage: created.alreadyScheduled ? "already_scheduled" : "scheduled",
      campaignId: created.campaignId,
      status: created.status,
      scheduledAt: created.scheduledAt || scheduledAt,
      issueSlotKey: created.issueSlotKey || issueSlotKey,
      subject: issue.subject,
      sections: issue.sections.map((s) => s.id),
      badge: created.badge,
      qa,
      syncRetry,
      contactRetry,
      untag,
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
  return POST(request);
}
