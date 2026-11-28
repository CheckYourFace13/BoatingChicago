"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import {
  areAdSenseDisplayUnitsEnabled,
  getAdSenseClient,
  isAdSensePathExcluded,
} from "@/config/ads";

/**
 * Loads adsbygoogle.js once for Auto ads and Google Privacy & messaging.
 * Skips excluded legal / form / printable routes. Consent Mode defaults
 * stay denied until the visitor or Google's CMP updates them — do not
 * gate this script on first-party advertising consent (advanced mode).
 */
export function AdSenseLoader() {
  const pathname = usePathname();
  const client = getAdSenseClient();
  const enabled = areAdSenseDisplayUnitsEnabled() && Boolean(client);

  if (!enabled || !client || isAdSensePathExcluded(pathname)) {
    return null;
  }

  return (
    <Script
      id="adsbygoogle-loader"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
      // Official AdSense override: bottom-only anchors so top overlays do not
      // cover sticky header / H1 / nav on mobile (support.google.com/adsense/answer/7478225).
      data-overlays="bottom"
    />
  );
}
