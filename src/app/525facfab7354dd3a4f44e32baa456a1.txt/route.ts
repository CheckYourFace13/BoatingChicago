import { NextResponse } from "next/server";
import { INDEXNOW_KEY } from "@/config/indexnow";

/**
 * Serves the IndexNow ownership key at the site root.
 * Complements public/{key}.txt so verification works even if static
 * public-file sync is delayed on the host.
 */
export async function GET() {
  return new NextResponse(INDEXNOW_KEY, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
