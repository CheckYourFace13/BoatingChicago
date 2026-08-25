import { NextResponse } from "next/server";
import { BUILD_SHA } from "@/generated/build-info";

/** Temporary deploy identity probe for Hostinger diagnosis. */
export async function GET() {
  return NextResponse.json({
    buildSha: BUILD_SHA,
    nodeEnv: process.env.NODE_ENV || "unknown",
    indexNowKeyPath: "/525facfab7354dd3a4f44e32baa456a1.txt",
    time: new Date().toISOString(),
  });
}
