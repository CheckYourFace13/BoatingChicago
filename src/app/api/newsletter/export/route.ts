import { NextResponse } from "next/server";
import {
  countNewsletterSignups,
  deleteNewsletterSignupByEmail,
  isValidEmail,
  listNewsletterSignups,
} from "@/lib/newsletter-store";
import { hasDatabaseConfig } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Owner-only export / management for Brief subscribers.
 * Auth: Authorization: Bearer <INDEXNOW_SUBMIT_SECRET or NEWSLETTER_EXPORT_SECRET>
 * Never expose this publicly without the secret.
 */
function authorized(request: Request): boolean {
  const header = request.headers.get("authorization") || "";
  const bearer = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const secrets = [
    process.env.NEWSLETTER_EXPORT_SECRET?.trim(),
    process.env.INDEXNOW_SUBMIT_SECRET?.trim(),
  ].filter(Boolean) as string[];
  if (!bearer || secrets.length === 0) return false;
  return secrets.includes(bearer);
}

function csvEscape(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export async function GET(request: Request) {
  try {
    if (!authorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const format = (url.searchParams.get("format") || "json").toLowerCase();
    const rows = await listNewsletterSignups();

    if (format === "csv") {
      const lines = [
        "id,email,source,createdAt",
        ...rows.map(
          (r) =>
            `${csvEscape(r.id)},${csvEscape(r.email)},${csvEscape(r.source)},${csvEscape(r.createdAt)}`
        ),
      ];
      return new NextResponse(lines.join("\n") + "\n", {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="boating-brief-subscribers.csv"',
          "Cache-Control": "no-store",
        },
      });
    }

    return NextResponse.json(
      {
        count: rows.length,
        storage: hasDatabaseConfig() ? "mysql" : "file",
        subscribers: rows,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error(
      "[newsletter-export] GET failed:",
      err instanceof Error ? err.message : "unknown"
    );
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}

/** DELETE ?email=... removes a test/subscriber row (owner auth required). */
export async function DELETE(request: Request) {
  try {
    if (!authorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = new URL(request.url);
    const email = String(url.searchParams.get("email") || "").trim();
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
    const removed = await deleteNewsletterSignupByEmail(email);
    const count = await countNewsletterSignups();
    return NextResponse.json({ success: true, removed, count });
  } catch (err) {
    console.error(
      "[newsletter-export] DELETE failed:",
      err instanceof Error ? err.message : "unknown"
    );
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
