"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  getAdSenseClient,
  getSlotConfig,
  isAdSensePathExcluded,
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
 * Optional manual AdSense unit. Renders nothing when AdSense is disabled,
 * the path is excluded, the slot has no unit ID, or advertising consent
 * is not granted. Prefer Auto ads; use this only when slot IDs exist.
 *
 * The adsbygoogle.js loader lives in AdSenseLoader (root layout) — this
 * component only mounts the reserved <ins> and pushes once.
 *
 * Usage: <AdSenseBlock slot="homepage-top" />
 */
export function AdSenseBlock({ slot, className = "" }: AdSenseBlockProps) {
  const pushed = useRef(false);
  const pathname = usePathname();
  const config = getSlotConfig(slot);
  const client = getAdSenseClient();
  const { state } = useConsent();
  const pathOk = !isAdSensePathExcluded(pathname);
  const enabled =
    pathOk && isSlotEnabled(slot) && allowsAdvertising(state);

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
