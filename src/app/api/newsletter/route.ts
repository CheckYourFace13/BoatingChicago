import { NextResponse } from "next/server";
import { saveNewsletterSignup } from "@/lib/leads";
import { sendNewsletterNotification } from "@/lib/email";
import { syncNewsletterSignup } from "@/lib/newsletter-sync";
import type { NewsletterSignup } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.email?.toString().trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    let signup: NewsletterSignup | null = null;

    try {
      signup = await saveNewsletterSignup({
        email: body.email,
        source: body.source || "unknown",
      });
    } catch (err) {
      console.error("[newsletter] Local storage failed:", err);
    }

    const signupForSync: NewsletterSignup = signup ?? {
      id: `ephemeral-${Date.now()}`,
      email: body.email,
      source: body.source || "unknown",
      createdAt: new Date().toISOString(),
    };

    await Promise.allSettled([
      sendNewsletterNotification(signupForSync.email, signupForSync.source),
      syncNewsletterSignup(signupForSync),
    ]);

    if (!signup) {
      console.log("[newsletter] Signup captured (sync/log only):", signupForSync.email);
    }

    return NextResponse.json({ success: true, id: signupForSync.id });
  } catch (err) {
    console.error("[newsletter] Unexpected error:", err);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
