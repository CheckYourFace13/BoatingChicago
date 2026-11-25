/**
 * Advertising framework — enables/disables ad blocks per page
 * without changing layouts. Sponsored/house ads are stubs for later.
 */

export type AdProvider = "adsense" | "sponsored" | "house" | "affiliate_featured";

export type AdSlotKey =
  | "homepage-top"
  | "guide-mid"
  | "guide-bottom"
  | "desktop_left_rail"
  | "desktop_right_rail"
  | "article_mid"
  | "article_end";

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

/** Approved AdSense publisher client (ca-pub-…). Single source for meta, script, and units. */
export const ADSENSE_PUBLISHER_ID = "ca-pub-9572509189594279";

/** AdSense publisher client (ca-pub-…). Single source for meta, script, and units. */
export function getAdSenseClient(): string | undefined {
  // Direct NEXT_PUBLIC_ access so Next can inline at build time when set.
  const fromEnv = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
  if (fromEnv) return fromEnv;
  // Fallback matches live ads.txt / approved publisher so builds still verify.
  return ADSENSE_PUBLISHER_ID;
}

/**
 * Display ads + adsbygoogle.js (Auto ads / Privacy & messaging).
 *
 * Emergency kill switch: set NEXT_PUBLIC_ADSENSE_DISPLAY_UNITS to
 * false / 0 / off / no and rebuild. Explicit true still enables.
 * After AdSense approval, default is ON whenever a client ID is available.
 */
export function areAdSenseDisplayUnitsEnabled(): boolean {
  const flag = process.env.NEXT_PUBLIC_ADSENSE_DISPLAY_UNITS?.trim().toLowerCase();
  if (flag === "0" || flag === "false" || flag === "no" || flag === "off") {
    return false;
  }
  if (flag === "1" || flag === "true" || flag === "yes") {
    return true;
  }
  return Boolean(getAdSenseClient());
}

export function isAdSenseEnabled(): boolean {
  return Boolean(getAdSenseClient()) && areAdSenseDisplayUnitsEnabled();
}

/**
 * Routes where AdSense script / Auto ads must not run (legal, forms,
 * conversion, printable utilities). Also exclude from dashboard page
 * exclusions once Auto ads are turned on.
 */
export const ADSENSE_EXCLUDED_PATHS = [
  "/privacy",
  "/terms",
  "/contact",
  "/subscribe",
  "/advertise",
  "/affiliate-disclosure",
  "/list-your-business",
  "/tools",
] as const;

export function isAdSensePathExcluded(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const path = pathname.split("?")[0]?.split("#")[0] || pathname;
  if (path === "/not-found") return true;
  return ADSENSE_EXCLUDED_PATHS.some(
    (excluded) => path === excluded || path.startsWith(`${excluded}/`),
  );
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
 * Without a slot ID, AdSenseBlock renders nothing. Prefer Auto ads first;
 * manual units are optional and stay off until slot IDs are configured.
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
  desktop_left_rail: {
    key: "desktop_left_rail",
    provider: "adsense",
    adsenseSlotId: envFlag("NEXT_PUBLIC_ADSENSE_SLOT_LEFT_RAIL"),
    minHeightPx: 250,
    label: "Desktop left rail (dormant)",
  },
  desktop_right_rail: {
    key: "desktop_right_rail",
    provider: "adsense",
    adsenseSlotId: envFlag("NEXT_PUBLIC_ADSENSE_SLOT_RIGHT_RAIL"),
    minHeightPx: 250,
    label: "Desktop right rail (dormant)",
  },
  article_mid: {
    key: "article_mid",
    provider: "adsense",
    adsenseSlotId: envFlag("NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_MID"),
    minHeightPx: 100,
    label: "Article mid (dormant)",
  },
  article_end: {
    key: "article_end",
    provider: "adsense",
    adsenseSlotId: envFlag("NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_END"),
    minHeightPx: 100,
    label: "Article end (dormant)",
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
