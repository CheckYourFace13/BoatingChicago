import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Host + legacy-path normalization for crawl consistency.
 * Keeps ads.txt / static assets working; www always lands on apex.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() || "";
  const { pathname } = request.nextUrl;

  // Canonical host: www → apex (preserves path + query)
  if (host === "www.boatingchicago.com") {
    const url = request.nextUrl.clone();
    url.hostname = "boatingchicago.com";
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }

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
    /*
     * Run on page routes + ads.txt so www/ads.txt also canonicalizes.
     * Skip Next internals and most static assets (images, fonts, etc.).
     */
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|images/).*)",
  ],
};
