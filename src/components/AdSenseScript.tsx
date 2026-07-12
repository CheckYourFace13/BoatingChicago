"use client";

import Script from "next/script";
import { getAdSenseClient, isAdSenseEnabled } from "@/config/ads";

/**
 * Loads the AdSense script once globally when NEXT_PUBLIC_ADSENSE_CLIENT is set.
 */
export function AdSenseScript() {
  const client = getAdSenseClient();
  if (!isAdSenseEnabled() || !client) return null;

  return (
    <Script
      id="adsense-loader"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
