import type { NewsCategory, NewsSourceConfig } from "@/types/news";

/** Revalidate news aggregates ~3 hours. */
export const NEWS_REVALIDATE_SECONDS = 10800;
export const NEWS_FETCH_TIMEOUT_MS = 8000;

export const NEWS_USER_AGENT =
  "BoatingChicago.com news (chris@boatingchicago.com)";

/**
 * Allowlisted RSS / official feed sources only.
 * Items from filtered feeds must match includeKeywords when set.
 */
export const NEWS_SOURCES: NewsSourceConfig[] = [
  {
    id: "great-lakes-now",
    name: "Great Lakes Now",
    domain: "greatlakesnow.org",
    feedUrl: "https://www.greatlakesnow.org/feed/",
    defaultCategory: "Lake Michigan",
    includeKeywords: [
      "michigan",
      "chicago",
      "illinois",
      "boat",
      "harbor",
      "marina",
      "fishing",
      "coast guard",
      "ship",
      "vessel",
      "lake michigan",
      "recreation",
      "tourism",
      "water quality",
      "beach",
    ],
    excludeKeywords: ["apostle islands", "lake superior", "lake erie", "ontario"],
    enabled: true,
  },
  {
    id: "chicago-park-district",
    name: "Chicago Park District",
    domain: "chicagoparkdistrict.com",
    feedUrl: "https://www.chicagoparkdistrict.com/rss.xml",
    defaultCategory: "Events",
    includeKeywords: [
      "harbor",
      "marina",
      "boat",
      "beach",
      "lake",
      "water",
      "31st",
      "diversey",
      "montrose",
      "belmont",
      "burnham",
      "jackson",
      "du sable",
      "northerly island",
      "air and water",
      "swim",
    ],
    enabled: true,
  },
  {
    id: "nws-lot-news",
    name: "NWS Chicago (LOT)",
    domain: "weather.gov",
    feedUrl: "https://www.weather.gov/rss_page.php?site_name=lot",
    defaultCategory: "Safety",
    enabled: true,
  },
];

export const NEWS_CATEGORY_RELATED: Record<
  NewsCategory,
  { href: string; label: string }[]
> = {
  "Chicago Boating": [
    { href: "/boat-rentals-chicago", label: "Boat Rentals Chicago" },
    { href: "/weather", label: "Boating Weather" },
  ],
  "Lake Michigan": [
    { href: "/weather", label: "Lake Conditions" },
    { href: "/chicago-playpen-boat-rentals", label: "Playpen Boat Rentals" },
  ],
  Safety: [
    { href: "/weather", label: "Boating Weather & Alerts" },
    { href: "/captains-for-hire-chicago", label: "Captains for Hire" },
  ],
  Events: [
    { href: "/air-and-water-show-boat-rentals", label: "Air & Water Show Boats" },
    { href: "/navy-pier-fireworks-boat-rentals", label: "Fireworks Boat Rentals" },
  ],
  Fishing: [
    { href: "/fishing-charters-chicago", label: "Fishing Charters Chicago" },
  ],
  "Harbors & Marinas": [
    { href: "/chicago-marinas", label: "Chicago Marinas" },
    { href: "/boat-storage-chicago", label: "Boat Storage" },
  ],
};

/** Seasonal tip pool for Chicago Boating Brief (static, factual, conservative). */
export const SEASONAL_BOATING_TIPS = [
  "Lake Michigan water stays colder than downtown air for much of the season — dress for the water temperature, not the skyline temperature.",
  "Afternoon lake breezes can differ sharply from Loop conditions. Check the nearshore marine forecast before you leave the harbor.",
  "Thunderstorms can build quickly over the lake. If you hear thunder, get off the water and seek a safe harbor.",
  "Small craft advisories are common on windy days. Recreational boaters should treat them as a strong signal to reconsider departure.",
  "Night fireworks and special-event weekends fill harbors early — plan fuel, dockage, and a sober captain before you go.",
];
