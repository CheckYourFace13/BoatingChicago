"use client";

import Script from "next/script";
import { getAdSenseClient } from "@/config/ads";
import { allowsAdvertising } from "@/lib/consent";
import { shouldLoadAdSenseScript } from "./AdSenseScript";
import { useConsent } from "./ConsentProvider";

/** adsbygoogle.js only after advertising consent and the display-units flag. */
export function AdSenseLoader() {
  const { state } = useConsent();
  const client = getAdSenseClient();
  if (!client || !shouldLoadAdSenseScript() || !allowsAdvertising(state)) {
    return null;
  }
  return (
    <Script
      id="adsbygoogle-loader"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
