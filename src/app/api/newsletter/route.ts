import { NextResponse } from "next/server";
import { sendNewsletterNotification } from "@/lib/email";
import { syncNewsletterSignup } from "@/lib/newsletter-sync";
import {
  isValidEmail,
  upsertNewsletterSignup,
} from "@/lib/newsletter-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 8;
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

/** Never let optional outbound sync/email block the response. */
function fireAndForget(label: string, work: Promise<unknown>): void {
  void work.catch((err) => {
    console.error(`[newsletter] ${label} failed:`, err instanceof Error ? err.message : "error");
  });
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
    const email = String(body.email || "").trim();
    const source = String(body.source || "unknown").trim().slice(0, 255) || "unknown";

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const result = await upsertNewsletterSignup(email, source);

    // Owner notify + ESP sync are optional and must not hang the API.
    fireAndForget(
      "owner-notification",
      sendNewsletterNotification(result.signup.email, result.signup.source)
    );
    fireAndForget("esp-sync", syncNewsletterSignup(result.signup));

    return NextResponse.json({
      success: true,
      id: result.signup.id,
      created: result.created,
      alreadySubscribed: !result.created,
    });
  } catch (err) {
    console.error(
      "[newsletter] Unexpected error:",
      err instanceof Error ? err.message : "unknown"
    );
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
