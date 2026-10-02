/**
 * Small, evergreen Amazon category recommendations.
 * Prefer search links over hard-coded ASINs so listings stay maintainable.
 * No prices, ratings, or review copy — shoppers see current Amazon data.
 */

import { buildAmazonSearchUrl } from "@/config/amazon";

export interface AmazonGearItem {
  id: string;
  /** Category / product family for analytics */
  category: string;
  /** Short editorial title on the card */
  title: string;
  /** One sentence of original guidance — not Amazon copy */
  blurb: string;
  /** Search keywords used to build the Special Link */
  searchKeywords: string;
  /** Visible CTA — must name Amazon as destination */
  ctaLabel: string;
}

export interface AmazonGearPlacement {
  /** Page path without domain, e.g. /boat-ownership */
  pagePath: string;
  /** Optional guide slug when rendered inside GuideLanding */
  guideSlug?: string;
  heading?: string;
  intro?: string;
  itemIds: string[];
}

const catalog: Record<string, AmazonGearItem> = {
  "life-jackets": {
    id: "life-jackets",
    category: "pfd-life-jackets",
    title: "Life jackets (PFDs)",
    blurb:
      "Coast Guard–approved PFDs sized for each person on board are the first piece of gear Chicago boaters should confirm before leaving the dock.",
    searchKeywords: "USCG approved life jacket PFD adult",
    ctaLabel: "Shop life jackets on Amazon",
  },
  "waterproof-dry-bags": {
    id: "waterproof-dry-bags",
    category: "waterproof-dry-bags",
    title: "Waterproof / dry bags",
    blurb:
      "A sealed dry bag keeps phones, keys, and spare layers usable when spray or a wet deck is part of a Lake Michigan afternoon.",
    searchKeywords: "waterproof dry bag boating",
    ctaLabel: "Shop dry bags on Amazon",
  },
  "marine-vhf": {
    id: "marine-vhf",
    category: "marine-vhf-radios",
    title: "Marine VHF radios",
    blurb:
      "A marine VHF is the standard channel for harbor traffic and distress calling — more reliable than a phone when you are offshore.",
    searchKeywords: "handheld marine VHF radio",
    ctaLabel: "Shop marine VHF radios on Amazon",
  },
  "marine-safety": {
    id: "marine-safety",
    category: "marine-safety-equipment",
    title: "Marine safety equipment",
    blurb:
      "Throwable flotation, a sound signal, and a basic first-aid kit are the quiet essentials that belong on any open-water day bag.",
    searchKeywords: "boat safety kit throwable flotation",
    ctaLabel: "Shop marine safety gear on Amazon",
  },
  "dock-lines": {
    id: "dock-lines",
    category: "dock-lines",
    title: "Dock lines",
    blurb:
      "Spare nylon dock lines in the right diameter for your boat make marina approaches and overnight dockage far less stressful.",
    searchKeywords: "nylon boat dock lines",
    ctaLabel: "Shop dock lines on Amazon",
  },
  "boat-fenders": {
    id: "boat-fenders",
    category: "boat-fenders",
    title: "Boat fenders",
    blurb:
      "Properly sized fenders protect gelcoat when you share slips, raft up, or wait at a busy Chicago Harbor fuel dock.",
    searchKeywords: "boat fenders marina",
    ctaLabel: "Shop boat fenders on Amazon",
  },
  "boat-cleaning": {
    id: "boat-cleaning",
    category: "boat-cleaning-supplies",
    title: "Boat cleaning supplies",
    blurb:
      "Marine wash, wax, and vinyl protectant help counteract Lake Michigan mineral spots and summer UV between professional details.",
    searchKeywords: "boat wash wax marine cleaning kit",
    ctaLabel: "Shop boat cleaning supplies on Amazon",
  },
  "fishing-tackle": {
    id: "fishing-tackle",
    category: "fishing-gear",
    title: "Fishing tackle basics",
    blurb:
      "When you already have a plan and a launch, a simple terminal-tackle refresh is often more useful than buying another rod.",
    searchKeywords: "Lake Michigan fishing tackle hooks leaders",
    ctaLabel: "Shop fishing gear on Amazon",
  },
  "portable-power": {
    id: "portable-power",
    category: "portable-power",
    title: "Portable power / chargers",
    blurb:
      "A compact power bank keeps phones and handheld VHF batteries alive for longer day trips when shore power is not an option.",
    searchKeywords: "waterproof portable phone charger power bank",
    ctaLabel: "Shop portable chargers on Amazon",
  },
};

export function getAmazonGearItem(id: string): AmazonGearItem | undefined {
  return catalog[id];
}

export function getAmazonGearUrl(item: AmazonGearItem): string {
  return buildAmazonSearchUrl(item.searchKeywords);
}

/** Page → restrained recommendation sets (2–4 items max per placement). */
export const amazonGearPlacements: AmazonGearPlacement[] = [
  {
    pagePath: "/beginners-guide-boating-chicago",
    guideSlug: "beginners-guide-boating-chicago",
    heading: "Recommended gear for first boat days",
    intro:
      "You do not need a full marine locker to enjoy a captained Chicago boat day. These are the small items that most often make a first outing safer and more comfortable.",
    itemIds: ["life-jackets", "waterproof-dry-bags"],
  },
  {
    pagePath: "/lake-michigan-boating-guide",
    guideSlug: "lake-michigan-boating-guide",
    heading: "Recommended safety gear for Lake Michigan",
    intro:
      "Open-lake days reward preparation. These category links send you to Amazon search results — compare current options there; we do not sell or fulfill gear.",
    itemIds: ["marine-vhf", "marine-safety", "life-jackets"],
  },
  {
    pagePath: "/boat-ownership",
    heading: "Recommended dock & ownership gear",
    intro:
      "Once you own a boat, dock lines and fenders are the everyday tools that protect the hull at Chicago-area slips and launches.",
    itemIds: ["dock-lines", "boat-fenders", "boat-cleaning"],
  },
  {
    pagePath: "/chicago-boat-detailing-guide",
    guideSlug: "chicago-boat-detailing-guide",
    heading: "Recommended cleaning supplies",
    intro:
      "Between professional details, marine-specific wash and protectant products are what most owners use on Lake Michigan mineral residue.",
    itemIds: ["boat-cleaning"],
  },
  {
    pagePath: "/chicago-fishing-guide",
    guideSlug: "chicago-fishing-guide",
    heading: "Recommended fishing gear",
    intro:
      "Charters often supply rods. If you are fishing from a launch or pier, a basic tackle refresh is usually enough.",
    itemIds: ["fishing-tackle", "waterproof-dry-bags"],
  },
  {
    pagePath: "/essential-boating-gear-chicago",
    guideSlug: "essential-boating-gear-chicago",
    heading: "Shop related gear on Amazon",
    intro:
      "Category links below open Amazon search results with current availability. BoatingChicago does not sell these products.",
    itemIds: [
      "life-jackets",
      "marine-vhf",
      "dock-lines",
      "waterproof-dry-bags",
    ],
  },
];

export function getAmazonGearPlacementForPath(
  pagePath: string
): AmazonGearPlacement | undefined {
  const normalized = pagePath.replace(/\/$/, "") || "/";
  return amazonGearPlacements.find((p) => p.pagePath === normalized);
}

export function getAmazonGearPlacementForGuide(
  slug: string
): AmazonGearPlacement | undefined {
  return amazonGearPlacements.find((p) => p.guideSlug === slug);
}

export function resolveAmazonGearItems(
  placement: AmazonGearPlacement
): AmazonGearItem[] {
  return placement.itemIds
    .map((id) => catalog[id])
    .filter((item): item is AmazonGearItem => Boolean(item));
}
