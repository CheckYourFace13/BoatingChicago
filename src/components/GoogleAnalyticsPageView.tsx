"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { allowsAnalytics } from "@/lib/consent";
import { useConsent } from "./ConsentProvider";

interface GoogleAnalyticsPageViewProps {
  measurementId?: string;
}

/**
 * App Router page-view tracker. Must stay separate from the GA script loader
 * so useSearchParams + Suspense cannot block gtag from appearing in HTML.
 */
export function GoogleAnalyticsPageView({
  measurementId,
}: GoogleAnalyticsPageViewProps) {
  const id = measurementId?.trim();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { state } = useConsent();
  const analyticsOk = allowsAnalytics(state);

  useEffect(() => {
    if (!id || !pathname || !analyticsOk) return;
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    const search = searchParams?.toString();
    const pagePath = search ? `${pathname}?${search}` : pathname;

    window.gtag("config", id, {
      page_path: pagePath,
    });
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_title: document.title,
    });
  }, [analyticsOk, id, pathname, searchParams]);

  return null;
}
