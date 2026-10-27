"use client";

import Script from "next/script";
import { allowsAnalytics, applyGtagConsent } from "@/lib/consent";
import { useConsent } from "./ConsentProvider";

interface GoogleAnalyticsProps {
  measurementId?: string;
}

/**
 * Loads gtag.js only after analytics consent. Consent Mode defaults are set
 * in <head> as denied so a late script still cannot grant itself.
 */
export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const { state } = useConsent();
  const id = measurementId?.trim();
  if (!id || !allowsAnalytics(state)) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
        onLoad={() => applyGtagConsent(state)}
      />
      <Script id="ga4-gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${id}', {
            send_page_view: false
          });
        `}
      </Script>
    </>
  );
}
