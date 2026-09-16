import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Legacy-path + trailing-slash normalization for crawl consistency.
 * Do NOT force www→apex here — Hostinger dual-host CDN broke under that redirect.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // One-hop trailing-slash strip (skipTrailingSlashRedirect is enabled)
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const url = request.nextUrl.clone();
    const bare = pathname.replace(/\/+$/, "") || "/";

    if (bare === "/blog" || bare.startsWith("/blog/")) {
      url.pathname = "/news";
      return NextResponse.redirect(url, 308);
    }
    if (bare === "/find-a-boat" || bare.startsWith("/find-a-boat/")) {
      url.pathname = "/boat-rentals-chicago";
      return NextResponse.redirect(url, 308);
    }

    url.pathname = bare;
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/news";
    return NextResponse.redirect(url, 308);
  }

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
