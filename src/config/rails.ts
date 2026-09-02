/**
 * Side rail / future advertising architecture.
 * Display ads stay OFF until explicitly enabled via env flags.
 */

export type RailSlotKey =
  | "desktop_left_rail"
  | "desktop_right_rail"
  | "article_mid"
  | "article_end";

export type RailModuleId =
  | "weather_now"
  | "marine_alerts"
  | "popular_guides"
  | "upcoming_events"
  | "explore_lake_michigan"
  | "popular_destinations"
  | "newsletter"
  | "find_a_boat"
  | "ad_slot";

export interface RailSlotConfig {
  key: RailSlotKey;
  /** When false, never render ad creative in this slot. */
  adsEnabled: boolean;
  label: string;
}

/**
 * Future ad/sponsor slots. All adsEnabled=false by design until
 * ad-network approval and NEXT_PUBLIC_ADSENSE_DISPLAY_UNITS=true.
 */
export const railAdSlots: Record<RailSlotKey, RailSlotConfig> = {
  desktop_left_rail: {
    key: "desktop_left_rail",
    adsEnabled: false,
    label: "Desktop left rail (future AdSense / sponsorship)",
  },
  desktop_right_rail: {
    key: "desktop_right_rail",
    adsEnabled: false,
    label: "Desktop right rail (future AdSense / sponsorship)",
  },
  article_mid: {
    key: "article_mid",
    adsEnabled: false,
    label: "Article mid (future)",
  },
  article_end: {
    key: "article_end",
    adsEnabled: false,
    label: "Article end (future)",
  },
};

export function isRailAdSlotEnabled(slot: RailSlotKey): boolean {
  return railAdSlots[slot]?.adsEnabled === true;
}

/** Default resource modules for rails (non-ad). */
export const DEFAULT_LEFT_RAIL_MODULES: RailModuleId[] = [
  "weather_now",
  "marine_alerts",
  "upcoming_events",
];

export const DEFAULT_RIGHT_RAIL_MODULES: RailModuleId[] = [
  "popular_guides",
  "popular_destinations",
  "explore_lake_michigan",
  "newsletter",
];
