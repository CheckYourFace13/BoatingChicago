import { NextResponse } from "next/server";
import { BUILD_SHA } from "@/generated/build-info";

/** Public deploy identity probe (no secrets). Used by CI to confirm Hostinger SHA. */
export async function GET() {
  const nodeEnv = process.env.NODE_ENV || "unknown";
  return NextResponse.json({
    buildSha: BUILD_SHA,
    nodeEnv,
    environment: nodeEnv === "production" ? "production" : "non-production",
    indexNowKeyPath: "/525facfab7354dd3a4f44e32baa456a1.txt",
    time: new Date().toISOString(),
  });
}
