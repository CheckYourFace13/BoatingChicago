"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import {
  getAdSenseClient,
  getSlotConfig,
  isSlotEnabled,
  type AdSlotKey,
} from "@/config/ads";
import { allowsAdvertising } from "@/lib/consent";
import { useConsent } from "./ConsentProvider";

interface AdSenseBlockProps {
  /** Logical slot key, e.g. "homepage-top" */
  slot: AdSlotKey;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

/**
 * Reusable AdSense unit. Renders nothing when AdSense is disabled,
 * the page slot is off, or no AdSense slot ID is configured.
 *
 * The adsbygoogle.js loader is mounted only with a live unit — never from the
 * root layout — so error pages, forms, and other non-ad routes do not request
 * the AdSense script even after advertising consent.
 *
 * Usage: <AdSenseBlock slot="homepage-top" />
 */
export function AdSenseBlock({ slot, className = "" }: AdSenseBlockProps) {
  const pushed = useRef(false);
  const config = getSlotConfig(slot);
  const client = getAdSenseClient();
  const { state } = useConsent();
  const enabled = isSlotEnabled(slot) && allowsAdvertising(state);

  useEffect(() => {
    if (!enabled || !client || !config?.adsenseSlotId || pushed.current) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushed.current = true;
    } catch {
      // Ad blocker or script not ready — fail silently
    }
  }, [enabled, client, config?.adsenseSlotId]);

  if (!enabled || !client || !config?.adsenseSlotId) return null;

  return (
    <>
      <Script
        id="adsbygoogle-loader"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <aside
        className={`adsense-block w-full overflow-hidden ${className}`}
        aria-label="Advertisement"
        data-ad-slot-key={slot}
      >
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            minHeight: config.minHeightPx,
          }}
          data-ad-client={client}
          data-ad-slot={config.adsenseSlotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </aside>
    </>
  );
}
