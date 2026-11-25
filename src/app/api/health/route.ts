import { NextResponse } from "next/server";
import { BUILD_SHA } from "@/generated/build-info";

/**
 * Lightweight liveness probe for post-deploy verification.
 * Avoids weather/news work so a hung upstream cannot fail the health check.
 */
export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      buildSha: BUILD_SHA,
      time: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
