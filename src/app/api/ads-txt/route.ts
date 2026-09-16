import { NextResponse } from "next/server";

/** Exact AdSense authorized seller line for pub-9572509189594279 */
const ADS_TXT_BODY =
  "google.com, pub-9572509189594279, DIRECT, f08c47fec0942fa0\n";

/**
 * Robust ads.txt response independent of stale public-file CDN caches.
 * Rewritten from /ads.txt via next.config beforeFiles.
 */
export function GET() {
  return new NextResponse(ADS_TXT_BODY, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
