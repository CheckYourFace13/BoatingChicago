import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Legacy-path normalization for crawl consistency.
 * Host canonicalization (www ↔ apex) is left to DNS/CDN — do not force
 * www→apex here (Hostinger dual-host serving timed out under that redirect).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // One-hop legacy editorial hub
  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/news";
    return NextResponse.redirect(url, 308);
  }

  // Retired boat-matching URL → rentals/experiences hub
  if (pathname === "/find-a-boat" || pathname.startsWith("/find-a-boat/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/boat-rentals-chicago";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|images/|api/).*)",
  ],
};
