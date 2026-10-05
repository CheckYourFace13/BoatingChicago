import { NextResponse } from "next/server";
import { generateBriefIssue } from "@/lib/brief/generator";
import { qaBriefIssue } from "@/lib/brief/qa";
import {
  BRIEF_SCHEDULE_LABEL,
  isBriefAutomationPaused,
  nextThursdayBriefAt,
} from "@/lib/brief/schedule";
import { briefOwnerAuthorized } from "@/lib/brief/auth";
import {
  getSubscriberSyncStats,
  countNewsletterSignups,
} from "@/lib/newsletter-store";
import { retryFailedSendfableSyncs } from "@/lib/newsletter-sync";
import {
  isSendfableConfigured,
  sendfableCancelCampaign,
  sendfableCreateCampaign,
  sendfableStatus,
  sendfableTestCampaign,
} from "@/lib/sendfable-client";
import { hasDatabaseConfig } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

/**
 * Owner-only Brief controls.
 * Auth: Authorization: Bearer <BRIEF_OWNER_SECRET|NEWSLETTER_EXPORT_SECRET|INDEXNOW_SUBMIT_SECRET>
 *
 * GET  — status dashboard JSON
 * POST — actions: preview | test | schedule | pause-info | retry-sync | cancel
 */
export async function GET(request: Request) {
  try {
    if (!briefOwnerAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [localStats, sf] = await Promise.all([
      getSubscriberSyncStats(),
      isSendfableConfigured() ? sendfableStatus() : Promise.resolve(null),
    ]);

    return NextResponse.json(
      {
        ok: true,
        local: {
          storage: hasDatabaseConfig() ? "mysql" : "file",
          ...localStats,
          subscribedCount: await countNewsletterSignups(),
        },
        automation: {
          paused: isBriefAutomationPaused(),
          schedule: BRIEF_SCHEDULE_LABEL,
          nextThursdayAt: nextThursdayBriefAt().toISOString(),
          sendfableConfigured: isSendfableConfigured(),
        },
        sendfable: sf && sf.ok ? sf.data : { error: sf && !sf.ok ? sf.error : "not configured" },
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error(
      "[brief-owner] GET failed:",
      err instanceof Error ? err.message : "error"
    );
    return NextResponse.json({ error: "Status failed" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!briefOwnerAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json().catch(() => ({}))) as {
      action?: string;
      email?: string;
      campaignId?: string;
    };
    const action = (body.action || "").toLowerCase();

    if (action === "retry-sync") {
      const result = await retryFailedSendfableSyncs(100);
      return NextResponse.json({ ok: true, action, ...result });
    }

    if (action === "preview") {
      const issue = await generateBriefIssue();
      const qa = await qaBriefIssue(issue);
      return NextResponse.json({
        ok: qa.ok,
        action,
        subject: issue.subject,
        previewText: issue.previewText,
        sections: issue.sections.map((s) => ({ id: s.id, title: s.title })),
        meta: issue.meta,
        qa,
        htmlBody: issue.htmlBody,
      });
    }

    if (action === "test") {
      const testEmail = String(body.email || process.env.BRIEF_TEST_EMAIL || "").trim();
      if (!testEmail) {
        return NextResponse.json(
          { error: "email required (or set BRIEF_TEST_EMAIL)" },
          { status: 400 }
        );
      }
      if (!isSendfableConfigured()) {
        return NextResponse.json({ error: "SendFable not configured" }, { status: 503 });
      }

      const issue = await generateBriefIssue();
      const qa = await qaBriefIssue(issue);
      if (!qa.ok) {
        return NextResponse.json(
          { ok: false, action, stage: "qa", errors: qa.errors, warnings: qa.warnings },
          { status: 422 }
        );
      }

      const draft = await sendfableCreateCampaign({
        name: `[TEST] Chicago Boating Brief — ${issue.editionKey}`,
        subject: issue.subject,
        previewText: issue.previewText,
        htmlBody: issue.htmlBody,
        draftOnly: true,
      });
      if (!draft.ok) {
        return NextResponse.json(
          { ok: false, action, error: draft.error },
          { status: draft.status || 502 }
        );
      }

      const sent = await sendfableTestCampaign({
        campaignId: draft.campaignId,
        email: testEmail,
      });
      if (!sent.ok) {
        return NextResponse.json({ ok: false, action, error: sent.error }, { status: 502 });
      }

      return NextResponse.json({
        ok: true,
        action,
        campaignId: draft.campaignId,
        testEmail,
        subject: `[TEST] ${issue.subject}`,
        sections: issue.sections.map((s) => s.id),
        qa,
        badge: draft.badge,
      });
    }

    if (action === "schedule") {
      if (isBriefAutomationPaused()) {
        return NextResponse.json(
          { ok: false, error: "Automation paused — unset BRIEF_AUTOMATION_PAUSED to schedule" },
          { status: 403 }
        );
      }
      if (!isSendfableConfigured()) {
        return NextResponse.json({ error: "SendFable not configured" }, { status: 503 });
      }

      const issue = await generateBriefIssue();
      const qa = await qaBriefIssue(issue);
      if (!qa.ok) {
        return NextResponse.json(
          { ok: false, action, stage: "qa", errors: qa.errors },
          { status: 422 }
        );
      }

      const scheduledAt = nextThursdayBriefAt().toISOString();
      const created = await sendfableCreateCampaign({
        name: `Chicago Boating Brief — ${issue.editionKey}`,
        subject: issue.subject,
        previewText: issue.previewText,
        htmlBody: issue.htmlBody,
        scheduledAt,
      });
      if (!created.ok) {
        return NextResponse.json(
          { ok: false, action, error: created.error },
          { status: created.status || 502 }
        );
      }
      return NextResponse.json({
        ok: true,
        action,
        campaignId: created.campaignId,
        status: created.status,
        scheduledAt: created.scheduledAt || scheduledAt,
        subject: issue.subject,
        qa,
      });
    }

    if (action === "cancel") {
      const campaignId = String(body.campaignId || "").trim();
      if (!campaignId) {
        return NextResponse.json({ error: "campaignId required" }, { status: 400 });
      }
      const result = await sendfableCancelCampaign(campaignId);
      if (!result.ok) {
        return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
      }
      return NextResponse.json({ ok: true, action, campaignId });
    }

    return NextResponse.json(
      {
        error: "Unknown action",
        actions: ["preview", "test", "schedule", "retry-sync", "cancel"],
        pauseHint:
          "Set BRIEF_AUTOMATION_PAUSED=true in Hostinger env to pause automated sends",
      },
      { status: 400 }
    );
  } catch (err) {
    console.error(
      "[brief-owner] POST failed:",
      err instanceof Error ? err.message : "error"
    );
    return NextResponse.json({ error: "Owner action failed" }, { status: 500 });
  }
}
