import { NextResponse } from "next/server";
import { sendContactNotification, hasAnyEmailProviderConfigured } from "@/lib/email";
import { syncNewsletterSignup } from "@/lib/newsletter-sync";
import {
  isValidEmail,
  upsertNewsletterSignup,
} from "@/lib/newsletter-store";
import {
  createContactMessage,
  findRecentAcceptedDuplicate,
  isContactStoreConfigured,
  markContactAccepted,
  markContactFailed,
} from "@/lib/contact-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Consent source recorded in local MySQL `source` (not SendFable contact fields). */
const BRIEF_OPT_IN_SOURCE = "contact-form:brief-opt-in";

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function allowRequest(key: string): boolean {
  const now = Date.now();
  const row = hits.get(key);
  if (!row || now > row.resetAt) {
    hits.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (row.count >= RATE_MAX) return false;
  row.count += 1;
  return true;
}

type NewsletterResult =
  | { optedIn: false }
  | {
      optedIn: true;
      enrolled: boolean;
      created: boolean;
      alreadySubscribed: boolean;
      syncStatus: "synced" | "pending" | "failed" | "skipped";
      error?: string;
    };

/**
 * Enroll email-only into Chicago Boating Brief audience.
 * Never forwards name/subject/message to SendFable.
 * Failures are returned — caller must not fail the contact message.
 */
async function enrollBriefOptIn(email: string): Promise<
  Extract<NewsletterResult, { optedIn: true }>
> {
  try {
    const result = await upsertNewsletterSignup(email, BRIEF_OPT_IN_SOURCE);
    const sync = await syncNewsletterSignup(result.signup);
    if (sync.status === "synced") {
      return {
        optedIn: true,
        enrolled: true,
        created: result.created,
        alreadySubscribed: !result.created,
        syncStatus: "synced",
      };
    }
    return {
      optedIn: true,
      enrolled: true,
      created: result.created,
      alreadySubscribed: !result.created,
      syncStatus: sync.status === "skipped" ? "skipped" : "pending",
      error: sync.error || "SendFable sync pending retry",
    };
  } catch (err) {
    console.error(
      "[contact] Brief opt-in local upsert failed:",
      err instanceof Error ? err.message : "error"
    );
    return {
      optedIn: true,
      enrolled: false,
      created: false,
      alreadySubscribed: false,
      syncStatus: "failed",
      error: "Newsletter enrollment failed",
    };
  }
}

export async function POST(request: Request) {
  try {
    if (!allowRequest(clientKey(request))) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();
    const briefOptIn =
      body.briefOptIn === true ||
      body.briefOptIn === "true" ||
      body.briefOptIn === "on" ||
      body.briefOptIn === 1;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }
    if (name.length > 120 || email.length > 200 || subject.length > 120 || message.length > 4000) {
      return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 });
    }

    // Honeypot from JSON clients
    if (String(body.company_website || body.website || "").trim()) {
      return NextResponse.json({
        success: true,
        delivered: true,
        queued: false,
        status: "accepted",
        inboxConfirmed: false,
        newsletter: { optedIn: false },
      });
    }

    const duplicate = await findRecentAcceptedDuplicate({
      email,
      subject,
      message,
    }).catch(() => null);
    if (duplicate) {
      return NextResponse.json({
        success: true,
        delivered: true,
        queued: false,
        status: "accepted",
        inboxConfirmed: false,
        deduped: true,
        messageId: duplicate.id,
        newsletter: { optedIn: false },
      });
    }

    let storedId: string | null = null;
    if (isContactStoreConfigured()) {
      try {
        const row = await createContactMessage({
          name,
          email,
          subject,
          message,
          briefOptIn,
        });
        storedId = row?.id || null;
      } catch (err) {
        console.error(
          "[contact] Durable store write failed:",
          err instanceof Error ? err.message : "error"
        );
      }
    }

    const delivery = await sendContactNotification({
      name,
      email,
      subject,
      message,
      briefOptIn,
    }).catch((err) => {
      console.error(
        "[contact] Email notification failed:",
        err instanceof Error ? err.message : "error"
      );
      return {
        sent: false as const,
        recipientConfigured: true,
        provider: undefined as string | undefined,
        messageId: undefined as string | undefined,
        error: err instanceof Error ? err.message : "delivery failed",
      };
    });

    if (storedId) {
      if (delivery.sent) {
        await markContactAccepted({
          id: storedId,
          provider: delivery.provider || "unknown",
          providerMessageId: delivery.messageId || null,
        }).catch(() => undefined);
      } else {
        await markContactFailed({
          id: storedId,
          error: delivery.error || "provider rejected",
          dead: !hasAnyEmailProviderConfigured(),
        }).catch(() => undefined);
      }
    }

    let newsletter: NewsletterResult = { optedIn: false };
    if (briefOptIn) {
      newsletter = await enrollBriefOptIn(email);
    }

    const queued = Boolean(storedId && !delivery.sent && delivery.recipientConfigured);
    const delivered = Boolean(delivery.sent);

    // Honest UX: success only when provider accepted OR durable queue will retry.
    if (!delivered && !queued) {
      return NextResponse.json(
        {
          success: false,
          delivered: false,
          queued: false,
          status: "failed",
          inboxConfirmed: false,
          recipientConfigured: delivery.recipientConfigured,
          error: delivery.recipientConfigured
            ? "Message could not be delivered right now. Please try again shortly."
            : "Owner inbox is not configured.",
          newsletter,
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      delivered,
      queued,
      status: delivered ? "accepted" : "queued",
      // Provider acceptance ≠ confirmed inbox receipt.
      inboxConfirmed: false,
      recipientConfigured: delivery.recipientConfigured,
      provider: delivery.provider || null,
      messageId: storedId,
      newsletter,
    });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
