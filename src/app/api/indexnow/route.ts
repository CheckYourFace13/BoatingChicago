import { NextResponse } from "next/server";
import {
  getAllIndexableUrls,
  getIndexNowKeyLocation,
  notifyIndexNowUrls,
  submitUrlsToIndexNow,
  sweepIndexNowFromLiveSitemap,
  verifyIndexNowKeyFile,
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

/** Status check — key file + URL counts (no secrets exposed). */
export async function GET() {
  const key = await verifyIndexNowKeyFile();
  return NextResponse.json({
    configured: true,
    keyFile: `/${INDEXNOW_KEY}.txt`,
    keyLocation: getIndexNowKeyLocation(),
    keyVerified: key.ok,
    keyHttpStatus: key.status,
    codebaseUrlCount: getAllIndexableUrls().length,
    submitRequiresSecret: Boolean(process.env.INDEXNOW_SUBMIT_SECRET?.trim()),
  });
}

/**
 * Submit URLs to IndexNow (server-side only).
 *
 * Body options:
 * - { "all": true } — submit all codebase sitemap URLs
 * - { "sweep": true } — fetch live sitemap.xml and reconcile
 * - { "urls": ["https://..."] } — submit specific URLs
 *
 * Requires INDEXNOW_SUBMIT_SECRET via Authorization: Bearer … or ?secret=
 */
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Set INDEXNOW_SUBMIT_SECRET and pass Bearer token." },
      { status: 401 }
    );
  }

  let body: { urls?: string[]; all?: boolean; sweep?: boolean } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  let result;
  if (body.sweep) {
    result = await sweepIndexNowFromLiveSitemap();
  } else if (body.all) {
    result = await submitUrlsToIndexNow(getAllIndexableUrls(), {
      requireLiveKey: true,
      markSweep: true,
    });
  } else {
    result = await notifyIndexNowUrls(body.urls || []);
  }

  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
