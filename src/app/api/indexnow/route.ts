import { NextResponse } from "next/server";
import {
  getAllIndexableUrls,
  getIndexNowKeyLocation,
  submitUrlsToIndexNow,
} from "@/lib/indexnow";
import { INDEXNOW_KEY } from "@/config/indexnow";

function isAuthorized(request: Request): boolean {
  const secret = process.env.INDEXNOW_SUBMIT_SECRET?.trim();
  if (!secret) return false;
  const header = request.headers.get("authorization") || "";
  const bearer = header.startsWith("Bearer ") ? header.slice(7) : "";
  const query = new URL(request.url).searchParams.get("secret") || "";
  return bearer === secret || query === secret;
}

/** Status check — confirms key file path is configured. */
export async function GET() {
  return NextResponse.json({
    configured: true,
    keyFile: `/${INDEXNOW_KEY}.txt`,
    keyLocation: getIndexNowKeyLocation(),
    urlCount: getAllIndexableUrls().length,
    submitRequiresSecret: Boolean(process.env.INDEXNOW_SUBMIT_SECRET?.trim()),
  });
}

/**
 * Submit URLs to IndexNow.
 * Body: { "urls": ["https://..."] } or { "all": true }
 * Requires INDEXNOW_SUBMIT_SECRET via Authorization: Bearer … or ?secret=
 */
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Set INDEXNOW_SUBMIT_SECRET and pass Bearer token." },
      { status: 401 }
    );
  }

  let body: { urls?: string[]; all?: boolean } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const urls = body.all ? getAllIndexableUrls() : body.urls || [];
  const result = await submitUrlsToIndexNow(urls);

  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
