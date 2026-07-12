/**
 * Advertising framework — enables/disables ad blocks per page
 * without changing layouts. Sponsored/house ads are stubs for later.
 */

export type AdProvider = "adsense" | "sponsored" | "house" | "affiliate_featured";

export type AdSlotKey =
  | "homepage-top"
  | "guide-mid"
  | "guide-bottom";

export interface AdSlotConfig {
  key: AdSlotKey;
  provider: AdProvider;
  /** AdSense unit slot ID (from AdSense UI). Empty = do not render unit. */
  adsenseSlotId?: string;
  /** Min height reserved to reduce CLS when an ad loads */
  minHeightPx: number;
  label?: string;
}

function envFlag(key: string): string | undefined {
  const value = process.env[key]?.trim();
  return value || undefined;
}

export function getAdSenseClient(): string | undefined {
  return envFlag("NEXT_PUBLIC_ADSENSE_CLIENT");
}

export function isAdSenseEnabled(): boolean {
  return Boolean(getAdSenseClient());
}

/** Provider toggles — only AdSense can be live today */
export const adProviders: Record<
  AdProvider,
  { enabled: boolean; description: string }
> = {
  adsense: {
    enabled: isAdSenseEnabled(),
    description: "Google AdSense display units",
  },
  sponsored: {
    enabled: false,
    description: "Paid sponsored banners (not populated yet)",
  },
  house: {
    enabled: false,
    description: "House promotional banners (not populated yet)",
  },
  affiliate_featured: {
    enabled: true,
    description:
      "Affiliate offer grids — managed by the existing affiliate system, not this ad renderer",
  },
};

/**
 * Logical AdSense slots. Slot IDs come from env when units are created in AdSense.
 * Without a slot ID, AdSenseBlock renders nothing (script may still load for Auto ads).
 */
export const adSlots: Record<AdSlotKey, AdSlotConfig> = {
  "homepage-top": {
    key: "homepage-top",
    provider: "adsense",
    adsenseSlotId: envFlag("NEXT_PUBLIC_ADSENSE_SLOT_HOMEPAGE_TOP"),
    minHeightPx: 100,
    label: "Homepage — below hero",
  },
  "guide-mid": {
    key: "guide-mid",
    provider: "adsense",
    adsenseSlotId: envFlag("NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_MID"),
    minHeightPx: 100,
    label: "Long guide — mid content",
  },
  "guide-bottom": {
    key: "guide-bottom",
    provider: "adsense",
    adsenseSlotId: envFlag("NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_BOTTOM"),
    minHeightPx: 100,
    label: "Long guide — near bottom",
  },
};

/** Which slots are allowed on which page types */
export const pageAdSlots = {
  homepage: ["homepage-top"] as AdSlotKey[],
  /** Category / long guide pages */
  guide: ["guide-mid", "guide-bottom"] as AdSlotKey[],
  /** Legal / trust pages — no ads */
  legal: [] as AdSlotKey[],
  /** Forms-heavy or conversion-primary pages — no AdSense by default */
  conversion: [] as AdSlotKey[],
};

export function isSlotEnabled(slot: AdSlotKey): boolean {
  const config = adSlots[slot];
  if (!config) return false;
  if (config.provider === "adsense") {
    return isAdSenseEnabled() && Boolean(config.adsenseSlotId);
  }
  return adProviders[config.provider].enabled;
}

export function getSlotConfig(slot: AdSlotKey): AdSlotConfig | undefined {
  return adSlots[slot];
}
