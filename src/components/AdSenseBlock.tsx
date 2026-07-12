"use client";

import { useEffect, useRef } from "react";
import {
  getAdSenseClient,
  getSlotConfig,
  isSlotEnabled,
  type AdSlotKey,
} from "@/config/ads";

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
 * Usage: <AdSenseBlock slot="homepage-top" />
 */
export function AdSenseBlock({ slot, className = "" }: AdSenseBlockProps) {
  const pushed = useRef(false);
  const config = getSlotConfig(slot);
  const client = getAdSenseClient();
  const enabled = isSlotEnabled(slot);

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
  );
}
