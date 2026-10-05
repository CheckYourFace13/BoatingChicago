import { NextResponse } from "next/server";
import { briefWebhookAuthorized } from "@/lib/brief/auth";
import {
  isValidEmail,
  markLocalUnsubscribed,
  normalizeEmail,
} from "@/lib/newsletter-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Receive unsubscribe events from SendFable so local MySQL status stays aligned.
 * Auth: Bearer SENDFABLE_WEBHOOK_SECRET or SENDFABLE_API_SECRET
 * Never logs the email address.
 */
export async function POST(request: Request) {
  try {
    if (!briefWebhookAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json().catch(() => null)) as {
      email?: string;
      reason?: string;
    } | null;
    const email = normalizeEmail(String(body?.email || ""));
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const updated = await markLocalUnsubscribed(email);
    return NextResponse.json({ ok: true, updated });
  } catch (err) {
    console.error(
      "[brief-unsub-webhook] failed:",
      err instanceof Error ? err.message : "error"
    );
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
