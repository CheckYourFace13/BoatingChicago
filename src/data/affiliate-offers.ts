/**
 * Central affiliate offer catalog + contextual matching.
 * GetYourGuide partner_id=HISQ5ML · Viator pid=P00309183
 *
 * Ratings / review counts / priceFrom come from the owner's GetYourGuide
 * Bestseller Coverage export (static). Display as approximate provider stats —
 * never as BoatingChicago reviews. Omit priceFrom when stale risk is high.
 */

import { GETYOURGUIDE_PARTNER_ID } from "@/config/affiliates";

export type AffiliateOfferCategory =
  | "architecture-cruise"
  | "party-cruise"
  | "fireworks-cruise"
  | "dining-cruise"
  | "jet-ski-rental"
  | "kayak-rental"
  | "sunset-cruise"
  | "river-cruise"
  | "night-cruise"
  | "speedboat"
  | "private-yacht-charter"
  | "private-sailing-charter"
  | "sailing"
  | "sailing-event"
  | "chicago-experience";

export type AffiliateProvider = "getyourguide" | "viator";

export type ExperienceType =
  | "ticketed-cruise"
  | "private-charter"
  | "rental"
  | "destination"
  | "event"
  | "attraction"
  | "lesson";

export type OfferTag =
  | "architecture"
  | "river"
  | "lake-michigan"
  | "family"
  | "fireworks"
  | "sunset"
  | "night"
  | "speedboat"
  | "jet-ski"
  | "kayak"
  | "party"
  | "dining"
  | "sailing"
  | "cruise"
  | "lesson";

/** Dedupe family — avoid stacking near-identical architecture cards. */
export type OfferFamily =
  | "architecture"
  | "fireworks"
  | "kayak"
  | "jet-ski"
  | "sunset"
  | "night"
  | "party"
  | "dining"
  | "speedboat"
  | "sailing-shared"
  | "private-charter"
  | "other";

export interface AffiliateOffer {
  id: string;
  provider: AffiliateProvider;
  /** Network product / tour ID when known */
  providerProductId?: string;
  title: string;
  shortTitle?: string;
  shortDescription: string;
  url: string;
  category: AffiliateOfferCategory;
  relatedPageSlugs: string[];
  active: boolean;
  featured: boolean;
  image?: string;
  ctaLabel: string;
  /** Lower = higher priority in rankings */
  priority: number;
  experienceType?: ExperienceType;
  tags?: OfferTag[];
  family?: OfferFamily;
  location?: string;
  /** Approximate "from" price from GYG bestseller export — optional */
  priceFrom?: number;
  /** Provider rating from GYG export */
  rating?: number;
  /** Provider review count from GYG export */
  reviewCount?: number;
  /** Bestseller rank from GYG export (lower = more popular) */
  bestsellerRank?: number;
  seasonality?: string;
  bestFor?: string[];
}

export const affiliateDisclosure =
  "Boating Chicago may earn a commission when you book through links on this page, at no additional cost to you.";

export const PROVIDER_RATINGS_DISCLAIMER =
  "Ratings and review counts from GetYourGuide (or Viator where noted). Not BoatingChicago reviews.";

const providerLabel: Record<AffiliateProvider, string> = {
  getyourguide: "GetYourGuide",
  viator: "Viator",
};

export function getProviderLabel(provider: AffiliateProvider): string {
  return providerLabel[provider];
}

/** Build GetYourGuide activity URL with HISQ5ML tracking intact. */
export function buildGygUrl(tourId: string, slugPath?: string): string {
  const base = slugPath
    ? `https://www.getyourguide.com/chicago-l225/${slugPath}-t${tourId}/`
    : `https://www.getyourguide.com/activity/-t${tourId}`;
  const joiner = base.includes("?") ? "&" : "?";
  return `${base}${joiner}partner_id=${GETYOURGUIDE_PARTNER_ID}&utm_medium=online_publisher&cmp=Boating`;
}

export function formatOfferRating(offer: AffiliateOffer): string | null {
  if (offer.rating == null || offer.reviewCount == null) return null;
  const rounded = (Math.round(offer.rating * 10) / 10).toFixed(1);
  return `${rounded} ★ (${formatReviewCount(offer.reviewCount)} reviews)`;
}

export function formatReviewCount(n: number): string {
  if (n >= 1000) {
    const rounded = Math.floor(n / 1000) * 1000;
    return `${rounded.toLocaleString("en-US")}+`;
  }
  if (n >= 100) {
    return `${Math.floor(n / 50) * 50}+`;
  }
  return String(n);
}

export function formatPriceFrom(offer: AffiliateOffer): string | null {
  if (offer.priceFrom == null || offer.priceFrom <= 0) return null;
  return `From $${offer.priceFrom.toFixed(2).replace(/\.00$/, "")}`;
}

function sortOffers(a: AffiliateOffer, b: AffiliateOffer): number {
  const brA = a.bestsellerRank ?? 999;
  const brB = b.bestsellerRank ?? 999;
  if (brA !== brB) return brA - brB;
  if (a.priority !== b.priority) return a.priority - b.priority;
  return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
}

function familyOf(offer: AffiliateOffer): OfferFamily {
  if (offer.family) return offer.family;
  if (offer.tags?.includes("architecture")) return "architecture";
  if (offer.tags?.includes("fireworks")) return "fireworks";
  if (offer.tags?.includes("kayak")) return "kayak";
  if (offer.tags?.includes("jet-ski")) return "jet-ski";
  if (offer.tags?.includes("sunset")) return "sunset";
  if (offer.tags?.includes("night")) return "night";
  if (offer.tags?.includes("party")) return "party";
  if (offer.tags?.includes("dining")) return "dining";
  if (offer.tags?.includes("speedboat")) return "speedboat";
  if (offer.experienceType === "private-charter") return "private-charter";
  if (offer.tags?.includes("sailing")) return "sailing-shared";
  return "other";
}

const FAMILY_CAPS: Partial<Record<OfferFamily, number>> = {
  architecture: 2,
  fireworks: 2,
  kayak: 2,
  "jet-ski": 1,
  sunset: 1,
  night: 1,
  party: 1,
  dining: 1,
  speedboat: 1,
  "sailing-shared": 1,
  "private-charter": 2,
  other: 3,
};

/** Prefer one strong product per family; allow small caps for variety. */
export function dedupeOfferFamilies(
  offers: AffiliateOffer[],
  maxPerFamily: Partial<Record<OfferFamily, number>> = FAMILY_CAPS
): AffiliateOffer[] {
  const counts: Partial<Record<OfferFamily, number>> = {};
  const out: AffiliateOffer[] = [];
  for (const offer of offers) {
    const fam = familyOf(offer);
    const cap = maxPerFamily[fam] ?? 2;
    const used = counts[fam] ?? 0;
    if (used >= cap) continue;
    counts[fam] = used + 1;
    out.push(offer);
  }
  return out;
}

export const affiliateOffers: AffiliateOffer[] = [
  // ——— GetYourGuide bestsellers (water / boating) ———
  {
    id: "gyg-290485",
    provider: "getyourguide",
    providerProductId: "290485",
    title: "Chicago River: 1.5-Hour Guided Architecture Cruise",
    shortTitle: "1.5-Hour Architecture Cruise",
    shortDescription:
      "Chicago’s top-reviewed architecture river cruise — bridges, skyline landmarks, and downtown stories from the water.",
    url: buildGygUrl(
      "290485",
      "chicago-river-75-minute-guided-architecture-cruise"
    ),
    category: "architecture-cruise",
    relatedPageSlugs: [
      "chicago-architecture-cruises",
      "chicago-architecture-cruise-guide",
      "chicago-river-cruises",
      "riverwalk-boat-tours-chicago",
      "boat-rentals-chicago",
      "destinations-chicago",
      "homepage",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/skyline-water.jpg",
    ctaLabel: "See Cruise Times",
    priority: 5,
    experienceType: "ticketed-cruise",
    tags: ["architecture", "river", "cruise", "family"],
    family: "architecture",
    location: "Chicago River",
    priceFrom: 38.82,
    rating: 4.77,
    reviewCount: 9353,
    bestsellerRank: 1,
    bestFor: ["first-timers", "architecture fans", "visitors"],
  },
  {
    id: "gyg-361750",
    provider: "getyourguide",
    providerProductId: "361750",
    title: "Chicago: 45-Minute Family-Friendly Architecture River Cruise",
    shortTitle: "45-Min Family Architecture Cruise",
    shortDescription:
      "A shorter, family-friendly architecture cruise on the Chicago River — easier for kids and tight schedules.",
    url: buildGygUrl("361750"),
    category: "architecture-cruise",
    relatedPageSlugs: [
      "chicago-architecture-cruises",
      "chicago-architecture-cruise-guide",
      "family-boat-rentals-chicago",
      "chicago-river-cruises",
      "boat-rentals-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/band-skyline.jpg",
    ctaLabel: "See Tickets & Times",
    priority: 12,
    experienceType: "ticketed-cruise",
    tags: ["architecture", "river", "family", "cruise"],
    family: "architecture",
    location: "Chicago River",
    priceFrom: 24.15,
    rating: 4.71,
    reviewCount: 2814,
    bestsellerRank: 3,
    bestFor: ["families", "short trips"],
  },
  {
    id: "gyg-266010",
    provider: "getyourguide",
    providerProductId: "266010",
    title: "Chicago by Night River and Lake Cruise",
    shortTitle: "Night River & Lake Cruise",
    shortDescription:
      "Evening skyline views on a combined Chicago River and Lake Michigan night cruise.",
    url: buildGygUrl("266010"),
    category: "night-cruise",
    relatedPageSlugs: [
      "chicago-fireworks-cruises",
      "navy-pier-fireworks-boat-rentals",
      "chicago-sunset-cruises",
      "best-chicago-sunset-cruises",
      "romantic-boat-cruises-chicago",
      "boat-rentals-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/hero-twilight.jpg",
    ctaLabel: "View This Cruise",
    priority: 18,
    experienceType: "ticketed-cruise",
    tags: ["night", "river", "lake-michigan", "cruise"],
    family: "night",
    location: "Chicago River / Lake Michigan",
    priceFrom: 38.82,
    rating: 4.65,
    reviewCount: 1172,
    bestsellerRank: 6,
    bestFor: ["evening outings", "visitors"],
  },
  {
    id: "gyg-46389",
    provider: "getyourguide",
    providerProductId: "46389",
    title: "Chicago: Architecture River Cruise Skip-the-Ticket Line",
    shortTitle: "Architecture Cruise (Skip the Line)",
    shortDescription:
      "Guided Chicago architecture river cruise with skip-the-ticket-line convenience for peak visitor days.",
    url: buildGygUrl("46389", "architecture-river-tour"),
    category: "architecture-cruise",
    relatedPageSlugs: [
      "chicago-architecture-cruises",
      "chicago-architecture-cruise-guide",
      "chicago-river-cruises",
      "boat-rentals-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/band-skyline.jpg",
    ctaLabel: "Check Availability",
    priority: 10,
    experienceType: "ticketed-cruise",
    tags: ["architecture", "river", "cruise"],
    family: "architecture",
    location: "Chicago River",
    priceFrom: 33.64,
    rating: 4.82,
    reviewCount: 4643,
    bestsellerRank: 7,
    bestFor: ["architecture fans", "peak-season visitors"],
  },
  {
    id: "gyg-994332",
    provider: "getyourguide",
    providerProductId: "994332",
    title: "Chicago: Tiki Bar Cruise on Chicago River or Lake Michigan",
    shortTitle: "Tiki Bar Cruise",
    shortDescription:
      "Tropical-themed tiki bar cruise — music, drinks, and skyline views on the river or lake.",
    url: buildGygUrl(
      "994332",
      "chicago-tiki-bar-cruise-on-chicago-river-or-lake-michigan"
    ),
    category: "party-cruise",
    relatedPageSlugs: [
      "chicago-tiki-cruises",
      "party-boat-rentals-chicago",
      "bachelorette-boat-rentals-chicago",
      "birthday-boat-rentals-chicago",
      "chicago-playpen-boat-rentals",
      "chicago-boat-party-guide",
      "chicago-bachelor-party-boats",
      "chicago-bachelorette-party-boats-guide",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/party-boat.jpg",
    ctaLabel: "Explore This Experience",
    priority: 22,
    experienceType: "ticketed-cruise",
    tags: ["party", "river", "lake-michigan", "cruise"],
    family: "party",
    location: "Chicago River / Lake Michigan",
    priceFrom: 32.78,
    rating: 4.1,
    reviewCount: 50,
    bestsellerRank: 11,
    bestFor: ["groups", "celebrations"],
  },
  {
    id: "gyg-293160",
    provider: "getyourguide",
    providerProductId: "293160",
    title: "Chicago: 1.5-Hour Lake and River Architecture Cruise",
    shortTitle: "Lake & River Architecture Cruise",
    shortDescription:
      "Architecture sightseeing that covers both the Chicago River and nearshore Lake Michigan.",
    url: buildGygUrl("293160"),
    category: "architecture-cruise",
    relatedPageSlugs: [
      "chicago-architecture-cruises",
      "lake-michigan-boating-guide",
      "boat-rentals-chicago",
      "destinations-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/lake-cruise.jpg",
    ctaLabel: "See Cruise Times",
    priority: 14,
    experienceType: "ticketed-cruise",
    tags: ["architecture", "river", "lake-michigan", "cruise"],
    family: "architecture",
    location: "Chicago River / Lake Michigan",
    priceFrom: 38.82,
    rating: 4.74,
    reviewCount: 2185,
    bestsellerRank: 13,
  },
  {
    id: "gyg-233082",
    provider: "getyourguide",
    providerProductId: "233082",
    title: "City Cruises Chicago: Brunch, Lunch, or Dinner River Cruise",
    shortTitle: "Dining River Cruise",
    shortDescription:
      "Brunch, lunch, or dinner on a Chicago River cruise with downtown architecture as the backdrop.",
    url: buildGygUrl(
      "233082",
      "city-cruises-chicago-brunch-lunch-or-dinner-river-cruise"
    ),
    category: "dining-cruise",
    relatedPageSlugs: [
      "chicago-dining-cruises",
      "yacht-rentals-chicago",
      "corporate-yacht-charters-chicago",
      "romantic-boat-cruises-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/featured-yacht.jpg",
    ctaLabel: "See Tickets & Times",
    priority: 28,
    experienceType: "ticketed-cruise",
    tags: ["dining", "river", "cruise"],
    family: "dining",
    location: "Chicago River",
    priceFrom: 63.65,
    rating: 4.6,
    reviewCount: 235,
    bestsellerRank: 14,
  },
  {
    id: "gyg-1336935",
    provider: "getyourguide",
    providerProductId: "1336935",
    title: "Chicago: North Avenue Beach Jet Ski Rental with Skyline View",
    shortTitle: "North Ave Jet Ski Rental",
    shortDescription:
      "Jet ski rental at North Avenue Beach with Chicago skyline views on Lake Michigan.",
    url: buildGygUrl(
      "1336935",
      "chicago-north-avenue-beach-jet-ski-rental-with-skyline-view"
    ),
    category: "jet-ski-rental",
    relatedPageSlugs: [
      "chicago-jet-ski-rentals",
      "chicago-jet-ski-rental-guide",
      "boat-rentals-chicago",
      "chicago-playpen-boat-rentals",
      "chicago-playpen-guide",
      "homepage",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/home-boat-rentals.jpg",
    ctaLabel: "Check Jet Ski Availability",
    priority: 16,
    experienceType: "rental",
    tags: ["jet-ski", "lake-michigan"],
    family: "jet-ski",
    location: "North Avenue Beach",
    priceFrom: 64.48,
    rating: 4.42,
    reviewCount: 26,
    bestsellerRank: 16,
    seasonality: "warm season",
  },
  {
    id: "gyg-466163",
    provider: "getyourguide",
    providerProductId: "466163",
    title: "Chicago: Summer Fireworks Cruise with 3D Glasses and Music",
    shortTitle: "3D Fireworks Cruise",
    shortDescription:
      "Summer fireworks from the water with 3D glasses and music — a ticketed alternative to a private fireworks charter.",
    url: buildGygUrl("466163", "chicago-3d-fireworks-cruise"),
    category: "fireworks-cruise",
    relatedPageSlugs: [
      "chicago-fireworks-cruises",
      "chicago-fireworks-cruise-guide",
      "navy-pier-fireworks-boat-rentals",
      "homepage",
      "events",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/fireworks-glow.jpg",
    ctaLabel: "See Tickets & Times",
    priority: 8,
    experienceType: "ticketed-cruise",
    tags: ["fireworks", "night", "lake-michigan", "cruise"],
    family: "fireworks",
    location: "Lake Michigan",
    priceFrom: 44.86,
    rating: 4.25,
    reviewCount: 155,
    bestsellerRank: 17,
    seasonality: "summer fireworks season",
  },
  {
    id: "gyg-24790",
    provider: "getyourguide",
    providerProductId: "24790",
    title: "City Cruises Chicago: Seadog Lakefront Speedboat Ride",
    shortTitle: "Seadog Speedboat Ride",
    shortDescription:
      "High-energy Seadog speedboat ride along the Chicago lakefront — splashy sightseeing on Lake Michigan.",
    url: buildGygUrl("24790"),
    category: "speedboat",
    relatedPageSlugs: [
      "boat-rentals-chicago",
      "family-boat-rentals-chicago",
      "chicago-playpen-boat-rentals",
      "lake-michigan-boating-guide",
      "destinations-chicago",
      "homepage",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/featured-speedboat.jpg",
    ctaLabel: "Check Availability",
    priority: 20,
    experienceType: "ticketed-cruise",
    tags: ["speedboat", "lake-michigan", "family", "cruise"],
    family: "speedboat",
    location: "Lake Michigan",
    priceFrom: 31.82,
    rating: 4.51,
    reviewCount: 477,
    bestsellerRank: 23,
  },
  {
    id: "gyg-386902",
    provider: "getyourguide",
    providerProductId: "386902",
    title: "Chicago: 1.5-Hour Scenic Sunset Lake Cruise",
    shortTitle: "Sunset Lake Cruise",
    shortDescription:
      "Golden-hour Lake Michigan skyline cruise — a classic Chicago evening on the water.",
    url: buildGygUrl("386902"),
    category: "sunset-cruise",
    relatedPageSlugs: [
      "chicago-sunset-cruises",
      "best-chicago-sunset-cruises",
      "romantic-boat-cruises-chicago",
      "lake-michigan-boating-guide",
      "homepage",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/sunset-glass.jpg",
    ctaLabel: "See Cruise Times",
    priority: 9,
    experienceType: "ticketed-cruise",
    tags: ["sunset", "lake-michigan", "cruise"],
    family: "sunset",
    location: "Lake Michigan",
    priceFrom: 38.82,
    rating: 4.66,
    reviewCount: 782,
    bestsellerRank: 29,
  },
  {
    id: "gyg-46393",
    provider: "getyourguide",
    providerProductId: "46393",
    title: "Chicago: Shoreline Lake Michigan Skyline Cruise",
    shortTitle: "Shoreline Skyline Cruise",
    shortDescription:
      "Shoreline Lake Michigan skyline cruise — classic sightseeing along Chicago’s waterfront.",
    url: buildGygUrl("46393"),
    category: "river-cruise",
    relatedPageSlugs: [
      "lake-michigan-boating-guide",
      "boat-rentals-chicago",
      "destinations-chicago",
      "beginners-guide-boating-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/hero-cruise.jpg",
    ctaLabel: "View This Cruise",
    priority: 24,
    experienceType: "ticketed-cruise",
    tags: ["lake-michigan", "cruise", "family"],
    family: "other",
    location: "Lake Michigan",
    priceFrom: 28.03,
    rating: 4.58,
    reviewCount: 803,
    bestsellerRank: 30,
  },
  {
    id: "gyg-994419",
    provider: "getyourguide",
    providerProductId: "994419",
    title: "Chicago: 2-Hour Downtown Kayak Rental",
    shortTitle: "Downtown Kayak Rental",
    shortDescription:
      "Two-hour downtown kayak rental — paddle the Chicago River at skyline level.",
    url: buildGygUrl("994419", "chicago-2-hour-downtown-kayak-rental"),
    category: "kayak-rental",
    relatedPageSlugs: [
      "chicago-kayak-rentals",
      "chicago-kayak-rental-guide",
      "paddle-board-rentals-chicago",
      "boat-rentals-chicago",
      "chicago-playpen-boat-rentals",
      "homepage",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/sail-lake.jpg",
    ctaLabel: "Check Kayak Availability",
    priority: 15,
    experienceType: "rental",
    tags: ["kayak", "river"],
    family: "kayak",
    location: "Chicago River / downtown",
    rating: undefined,
    reviewCount: undefined,
    bestFor: ["active visitors", "couples"],
  },
  {
    id: "gyg-1308165",
    provider: "getyourguide",
    providerProductId: "1308165",
    title: "Chicago: Riverwalk Introductory Kayak Lesson & Paddle",
    shortTitle: "Riverwalk Kayak Lesson",
    shortDescription:
      "Introductory kayak lesson and paddle from the Riverwalk — good for first-timers on the Chicago River.",
    url: buildGygUrl("1308165"),
    category: "kayak-rental",
    relatedPageSlugs: [
      "chicago-kayak-rentals",
      "chicago-kayak-rental-guide",
      "beginners-guide-boating-chicago",
      "paddle-board-rentals-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/sail-lake.jpg",
    ctaLabel: "See Lesson Times",
    priority: 26,
    experienceType: "lesson",
    tags: ["kayak", "river", "lesson", "family"],
    family: "kayak",
    location: "Chicago Riverwalk",
  },
  {
    id: "gyg-1308175",
    provider: "getyourguide",
    providerProductId: "1308175",
    title: "Chicago: Guided Twilight Kayak Paddle on the River",
    shortTitle: "Twilight Kayak Paddle",
    shortDescription:
      "Guided twilight kayak paddle on the Chicago River — evening lights and quieter water.",
    url: buildGygUrl("1308175"),
    category: "kayak-rental",
    relatedPageSlugs: [
      "chicago-kayak-rentals",
      "chicago-kayak-rental-guide",
      "chicago-sunset-cruises",
      "romantic-boat-cruises-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/hero-twilight.jpg",
    ctaLabel: "Explore This Experience",
    priority: 27,
    experienceType: "ticketed-cruise",
    tags: ["kayak", "river", "night", "sunset"],
    family: "kayak",
    location: "Chicago River",
  },
  {
    id: "gyg-24800-seadog-fireworks",
    provider: "getyourguide",
    providerProductId: "24800",
    title: "Seadog Speedboat Lake Fireworks Cruise",
    shortTitle: "Seadog Fireworks Cruise",
    shortDescription:
      "Seadog speedboat fireworks cruise on Lake Michigan — high-energy alternative to a private fireworks charter.",
    url: buildGygUrl(
      "24800",
      "city-cruises-chicago-seadog-speedboat-lake-firework-cruise"
    ),
    category: "fireworks-cruise",
    relatedPageSlugs: [
      "chicago-fireworks-cruises",
      "chicago-fireworks-cruise-guide",
      "navy-pier-fireworks-boat-rentals",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/featured-speedboat.jpg",
    ctaLabel: "Check Availability",
    priority: 19,
    experienceType: "ticketed-cruise",
    tags: ["fireworks", "speedboat", "lake-michigan", "night"],
    family: "fireworks",
    location: "Lake Michigan",
    seasonality: "summer fireworks season",
  },

  // ——— Viator (preserved; water-focused) ———
  {
    id: "viator-chicago-river-destination",
    provider: "viator",
    title: "Chicago River Cruises and Experiences",
    shortTitle: "More River Experiences",
    shortDescription:
      "Browse a wider selection of Chicago River cruises and water experiences on Viator.",
    url: "https://www.viator.com/Chicago-attractions/Chicago-River/d673-a1219?pid=P00309183&mcid=42383&medium=link",
    category: "architecture-cruise",
    relatedPageSlugs: ["chicago-architecture-cruises"],
    active: true,
    featured: false,
    image: "/images/chicago/skyline-water.jpg",
    ctaLabel: "Explore Chicago River Cruises",
    priority: 80,
    experienceType: "destination",
    tags: ["architecture", "river", "cruise"],
    family: "other",
  },
  {
    id: "viator-sunset-cruise",
    provider: "viator",
    title: "Chicago Sunset Cruise",
    shortTitle: "Viator Sunset Cruise",
    shortDescription:
      "Ticketed Chicago sunset cruise experience — golden-hour views over the water.",
    url: "https://www.viator.com/tours/Chicago/Chicago-Sunset-Cruise/d673-76126P8?pid=P00309183&mcid=42383&medium=link",
    category: "sunset-cruise",
    relatedPageSlugs: [
      "chicago-sunset-cruises",
      "best-chicago-sunset-cruises",
      "chicago-sailing-charters",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/sunset-glass.jpg",
    ctaLabel: "View Sunset Cruise",
    priority: 40,
    experienceType: "ticketed-cruise",
    tags: ["sunset", "lake-michigan", "cruise"],
    family: "sunset",
  },
  {
    id: "viator-speedboat-architecture",
    provider: "viator",
    title: "Lake Michigan and Chicago River Architecture Cruise by Speedboat",
    shortTitle: "Speedboat Architecture Cruise",
    shortDescription:
      "Architecture sightseeing by speedboat on Lake Michigan and the Chicago River.",
    url: "https://www.viator.com/tours/Chicago/Lake-Michigan-and-Chicago-River-Architecture-Cruise-by-Speedboat/d673-5042CHIARC?pid=P00309183&mcid=42383&medium=link",
    category: "architecture-cruise",
    relatedPageSlugs: ["chicago-architecture-cruises", "boat-rentals-chicago"],
    active: true,
    featured: true,
    image: "/images/chicago/featured-speedboat.jpg",
    ctaLabel: "View Speedboat Cruise",
    priority: 45,
    experienceType: "ticketed-cruise",
    tags: ["architecture", "speedboat", "lake-michigan", "river"],
    family: "speedboat",
  },
  {
    id: "viator-chicago-river-cruise",
    provider: "viator",
    title: "Chicago River Cruise",
    shortTitle: "Viator River Cruise",
    shortDescription:
      "Classic Chicago River cruise for skyline and downtown sightseeing.",
    url: "https://www.viator.com/tours/Chicago/Chicago-River-Cruise/d673-70067P1?pid=P00309183&mcid=42383&medium=link",
    category: "river-cruise",
    relatedPageSlugs: ["chicago-architecture-cruises", "chicago-river-cruises"],
    active: true,
    featured: false,
    image: "/images/chicago/band-skyline.jpg",
    ctaLabel: "View River Cruise",
    priority: 55,
    experienceType: "ticketed-cruise",
    tags: ["river", "cruise"],
    family: "architecture",
  },
  {
    id: "viator-private-yacht-charter",
    provider: "viator",
    title: "Customize Your Chicago Experience with a Private Yacht Charter",
    shortTitle: "Private Yacht Charter",
    shortDescription:
      "Instant-booking private yacht charter on Viator. For additional private matching, browse related category pages.",
    url: "https://www.viator.com/tours/Chicago/Customize-Your-Chicago-Experience-with-a-Private-Yacht-Charter/d673-5599206P2?pid=P00309183&mcid=42383&medium=link",
    category: "private-yacht-charter",
    relatedPageSlugs: [
      "yacht-rentals-chicago",
      "luxury-yacht-charters-chicago",
      "boat-rentals-chicago",
      "corporate-yacht-charters-chicago",
      "chicago-sailing-charters",
      "homepage",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/yacht-deck.jpg",
    ctaLabel: "View Private Yacht Charter",
    priority: 2,
    experienceType: "private-charter",
    tags: ["sailing", "cruise"],
    family: "private-charter",
  },
  {
    id: "viator-kayak-ohio-street",
    provider: "viator",
    title: "Lake Michigan Skyline Kayak Rental at Ohio Street Beach",
    shortTitle: "Ohio Street Beach Kayak",
    shortDescription:
      "Kayak rental at Ohio Street Beach with Lake Michigan skyline views — different launch from downtown river kayaks.",
    url: "https://www.viator.com/tours/Chicago/Chicagos-Lake-Michigan-Skyline-Kayak-Rental-at-Ohio-Street-Beach/d673-3332P25?pid=P00309183&mcid=42383&medium=link",
    category: "kayak-rental",
    relatedPageSlugs: [
      "chicago-kayak-rentals",
      "chicago-kayak-rental-guide",
      "ohio-street-beach-guide",
      "boat-rentals-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/beach-crowd.jpg",
    ctaLabel: "Check Kayak Availability",
    priority: 30,
    experienceType: "rental",
    tags: ["kayak", "lake-michigan"],
    family: "kayak",
  },
  {
    id: "viator-helicopter-skyline",
    provider: "viator",
    title: "Chicago Skyline Helicopter Tour",
    shortTitle: "Helicopter Tour",
    shortDescription:
      "Not a boating experience — kept inactive to stay water-focused.",
    url: "https://www.viator.com/tours/Chicago/Chicago-Skyline-Helicopter-Tour/d673-126471P1?pid=P00309183&mcid=42383&medium=link",
    category: "chicago-experience",
    relatedPageSlugs: [],
    active: false,
    featured: false,
    image: "/images/chicago/why-chicago.jpg",
    ctaLabel: "View Skyline Tour",
    priority: 95,
    experienceType: "attraction",
    family: "other",
  },
  {
    id: "viator-skyline-sail",
    provider: "viator",
    title: "Chicago Skyline Sail",
    shortTitle: "Skyline Sail",
    shortDescription:
      "Shared Chicago skyline sailing outing on Lake Michigan — not a private boat rental.",
    url: "https://www.viator.com/tours/Chicago/Chicago-Skyline-Sail/d673-5560540P2?pid=P00309183&mcid=42383&medium=link",
    category: "sailing",
    relatedPageSlugs: [
      "chicago-sailing-charters",
      "sailboat-charters-chicago",
      "chicago-sunset-cruises",
      "sailing-lessons-chicago",
      "homepage",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/sail-lake.jpg",
    ctaLabel: "View Skyline Sail",
    priority: 25,
    experienceType: "ticketed-cruise",
    tags: ["sailing", "lake-michigan", "cruise"],
    family: "sailing-shared",
  },
  {
    id: "viator-monday-concert-sail",
    provider: "viator",
    title: "Monday Night Concert Series",
    shortTitle: "Concert Sail",
    shortDescription:
      "Special sailing and concert-series experience — details and schedule on the booking page.",
    url: "https://www.viator.com/tours/Chicago/Monday-Night-Concert-Series/d673-5560540P6?pid=P00309183&mcid=42383&medium=link",
    category: "sailing-event",
    relatedPageSlugs: ["chicago-sailing-charters", "party-boat-rentals-chicago"],
    active: true,
    featured: false,
    image: "/images/chicago/hero-party.jpg",
    ctaLabel: "View Concert Sail",
    priority: 70,
    experienceType: "event",
    tags: ["sailing", "party", "night"],
    family: "sailing-shared",
  },
  {
    id: "viator-fireworks-sail",
    provider: "viator",
    title: "Fireworks Sail into the Night",
    shortTitle: "Fireworks Sail",
    shortDescription:
      "Ticketed fireworks sailing experience — not a private fireworks charter.",
    url: "https://www.viator.com/tours/Chicago/FIREWORKS-Sail-into-the-Night-with-Sparkles-in-the-Sky/d673-5560540P3?pid=P00309183&mcid=42383&medium=link",
    category: "fireworks-cruise",
    relatedPageSlugs: [
      "chicago-fireworks-cruises",
      "chicago-fireworks-cruise-guide",
      "navy-pier-fireworks-boat-rentals",
      "chicago-sailing-charters",
      "party-boat-rentals-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/seasonal-fireworks.jpg",
    ctaLabel: "View Fireworks Sail",
    priority: 17,
    experienceType: "ticketed-cruise",
    tags: ["fireworks", "sailing", "night", "lake-michigan"],
    family: "fireworks",
  },
  {
    id: "viator-navy-pier-private-sail",
    provider: "viator",
    title: "Navy Pier Private Sailboat Charter with Captain",
    shortTitle: "Navy Pier Private Sail",
    shortDescription:
      "Private sailboat charter with captain near Navy Pier. Instant-booking alternative — browse related category pages for more matching.",
    url: "https://www.viator.com/tours/Chicago/Navy-Pier-Chicago-Private-Sailboat-Charter-with-Captain/d673-5647184P1?pid=P00309183&mcid=42383&medium=link",
    category: "private-sailing-charter",
    relatedPageSlugs: [
      "chicago-sailing-charters",
      "private-sailing-charters-chicago",
      "yacht-rentals-chicago",
      "boat-rentals-chicago",
      "captains-for-hire-chicago",
      "homepage",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/hero-boats.jpg",
    ctaLabel: "View Private Sailboat Charter",
    priority: 3,
    experienceType: "private-charter",
    tags: ["sailing"],
    family: "private-charter",
  },
  {
    id: "viator-private-lake-sailing",
    provider: "viator",
    title: "Private Lake Michigan Sailing Charter with Skyline Views",
    shortTitle: "Private Lake Sailing",
    shortDescription:
      "Private Lake Michigan sailing charter with skyline views.",
    url: "https://www.viator.com/tours/Chicago/Private-Lake-Michigan-Sailing-Charter-with-Skyline-Views/d673-5662934P1?pid=P00309183&mcid=42383&medium=link",
    category: "private-sailing-charter",
    relatedPageSlugs: [
      "chicago-sailing-charters",
      "private-sailing-charters-chicago",
      "yacht-rentals-chicago",
      "boat-rentals-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/lake-cruise.jpg",
    ctaLabel: "View Private Sailing Charter",
    priority: 4,
    experienceType: "private-charter",
    tags: ["sailing", "lake-michigan"],
    family: "private-charter",
  },
  {
    id: "viator-private-day-sailing",
    provider: "viator",
    title: "Private Day Sailing on Lake Michigan",
    shortTitle: "Private Day Sail",
    shortDescription:
      "Private day sailing on Lake Michigan — book online or request a custom match through instant-booking listings on this site.",
    url: "https://www.viator.com/tours/Chicago/Private-Day-Sailing-on-Lake-Michigan/d673-46250P1?pid=P00309183&mcid=42383&medium=link",
    category: "private-sailing-charter",
    relatedPageSlugs: [
      "chicago-sailing-charters",
      "yacht-rentals-chicago",
      "boat-rentals-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/hero-cruise.jpg",
    ctaLabel: "View Private Day Sailing",
    priority: 6,
    experienceType: "private-charter",
    tags: ["sailing", "lake-michigan"],
    family: "private-charter",
  },
  {
    id: "viator-private-sunset-sailing",
    provider: "viator",
    title: "Private Chicago Sunset Sailing Charter",
    shortTitle: "Private Sunset Sail",
    shortDescription:
      "Private sunset sailing charter on Lake Michigan.",
    url: "https://www.viator.com/tours/Chicago/Private-Chicago-Sunset-Sailing-Charter-on-Lake-Michigan/d673-5662934P2?pid=P00309183&mcid=42383&medium=link",
    category: "private-sailing-charter",
    relatedPageSlugs: [
      "chicago-sailing-charters",
      "chicago-sunset-cruises",
      "best-chicago-sunset-cruises",
      "yacht-rentals-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/hero-sunset.jpg",
    ctaLabel: "View Sunset Sailing Charter",
    priority: 5,
    experienceType: "private-charter",
    tags: ["sailing", "sunset", "lake-michigan"],
    family: "private-charter",
  },
  {
    id: "viator-navy-pier-fireworks-cruise",
    provider: "viator",
    title: "Navy Pier Fireworks Cruise at Navy Pier Marina",
    shortTitle: "Navy Pier Fireworks Cruise",
    shortDescription:
      "Ticketed Navy Pier fireworks cruise departing from Navy Pier Marina.",
    url: "https://www.viator.com/tours/Chicago/Navy-Pier-Fireworks-Cruise-at-Navy-Pier-Marina/d673-5647184P2?pid=P00309183&mcid=42383&medium=link",
    category: "fireworks-cruise",
    relatedPageSlugs: [
      "chicago-fireworks-cruises",
      "chicago-fireworks-cruise-guide",
      "navy-pier-fireworks-boat-rentals",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/home-fireworks.jpg",
    ctaLabel: "See Tickets & Times",
    priority: 11,
    experienceType: "ticketed-cruise",
    tags: ["fireworks", "night", "lake-michigan", "cruise"],
    family: "fireworks",
  },
];

/** Page slug → preferred tags for contextual matching */
export const PAGE_OFFER_INTENT: Record<
  string,
  { tags: OfferTag[]; preferIds?: string[]; limit?: number }
> = {
  "navy-pier-fireworks-boat-rentals": {
    tags: ["fireworks", "night", "lake-michigan"],
    preferIds: ["gyg-466163", "viator-navy-pier-fireworks-cruise", "gyg-266010", "viator-fireworks-sail"],
    limit: 4,
  },
  "chicago-fireworks-cruises": {
    tags: ["fireworks", "night"],
    preferIds: ["gyg-466163", "viator-navy-pier-fireworks-cruise", "viator-fireworks-sail", "gyg-24800-seadog-fireworks"],
    limit: 4,
  },
  "chicago-fireworks-cruise-guide": {
    tags: ["fireworks", "night"],
    preferIds: ["gyg-466163", "viator-navy-pier-fireworks-cruise", "gyg-266010"],
    limit: 3,
  },
  "chicago-architecture-cruises": {
    tags: ["architecture", "river"],
    preferIds: ["gyg-290485", "gyg-46389", "gyg-361750", "gyg-293160"],
    limit: 4,
  },
  "chicago-architecture-cruise-guide": {
    tags: ["architecture", "river"],
    preferIds: ["gyg-290485", "gyg-46389", "gyg-361750"],
    limit: 3,
  },
  "chicago-river-cruises": {
    tags: ["architecture", "river", "kayak", "cruise"],
    preferIds: ["gyg-290485", "gyg-46389", "gyg-994419"],
    limit: 3,
  },
  "riverwalk-boat-tours-chicago": {
    tags: ["architecture", "river", "kayak"],
    preferIds: ["gyg-290485", "gyg-1308165", "gyg-361750"],
    limit: 3,
  },
  "family-boat-rentals-chicago": {
    tags: ["family", "architecture", "speedboat", "cruise"],
    preferIds: ["gyg-361750", "gyg-24790", "gyg-46393", "gyg-290485"],
    limit: 4,
  },
  "chicago-playpen-boat-rentals": {
    tags: ["party", "jet-ski", "speedboat", "lake-michigan"],
    preferIds: ["gyg-994332", "gyg-1336935", "gyg-24790"],
    limit: 3,
  },
  "chicago-playpen-guide": {
    tags: ["party", "jet-ski", "speedboat"],
    preferIds: ["gyg-994332", "gyg-1336935", "gyg-24790"],
    limit: 3,
  },
  "chicago-sunset-cruises": {
    tags: ["sunset", "night", "sailing"],
    preferIds: ["gyg-386902", "gyg-266010", "viator-private-sunset-sailing"],
    limit: 3,
  },
  "best-chicago-sunset-cruises": {
    tags: ["sunset", "night"],
    preferIds: ["gyg-386902", "gyg-266010", "viator-sunset-cruise"],
    limit: 3,
  },
  "chicago-kayak-rentals": {
    tags: ["kayak", "river", "lesson"],
    preferIds: ["gyg-994419", "gyg-1308165", "gyg-1308175", "viator-kayak-ohio-street"],
    limit: 4,
  },
  "chicago-kayak-rental-guide": {
    tags: ["kayak"],
    preferIds: ["gyg-994419", "gyg-1308165", "gyg-1308175"],
    limit: 3,
  },
  "lake-michigan-boating-guide": {
    tags: ["lake-michigan", "cruise", "speedboat", "sunset"],
    preferIds: ["gyg-46393", "gyg-24790", "gyg-386902", "gyg-293160"],
    limit: 4,
  },
  "destinations-chicago": {
    tags: ["architecture", "lake-michigan", "cruise", "sunset"],
    preferIds: ["gyg-290485", "gyg-386902", "gyg-24790", "gyg-466163"],
    limit: 4,
  },
  "boat-rentals-chicago": {
    tags: ["cruise", "architecture", "kayak", "jet-ski", "speedboat"],
    preferIds: ["gyg-290485", "gyg-24790", "gyg-994419", "gyg-1336935", "viator-private-yacht-charter"],
    limit: 5,
  },
  "party-boat-rentals-chicago": {
    tags: ["party", "fireworks", "sailing"],
    preferIds: ["gyg-994332", "viator-fireworks-sail", "viator-skyline-sail"],
    limit: 3,
  },
  "yacht-rentals-chicago": {
    tags: ["sailing", "dining"],
    preferIds: [
      "viator-private-yacht-charter",
      "viator-navy-pier-private-sail",
      "gyg-233082",
    ],
    limit: 4,
  },
  "air-and-water-show-boat-rentals": {
    tags: ["architecture", "kayak", "cruise"],
    preferIds: ["gyg-290485", "gyg-994419", "gyg-46393"],
    limit: 3,
  },
  homepage: {
    tags: ["architecture", "sunset", "fireworks", "kayak", "jet-ski", "sailing"],
    // Variety: architecture cruise, sailing/charter, jet ski, fireworks
    preferIds: [
      "gyg-290485",
      "gyg-386902",
      "gyg-1336935",
      "gyg-466163",
    ],
    limit: 4,
  },
  weather: {
    tags: ["architecture", "lake-michigan", "cruise", "sunset"],
    preferIds: ["gyg-290485", "gyg-386902", "gyg-24790"],
    limit: 3,
  },
  "chicago-jet-ski-rentals": {
    tags: ["jet-ski", "lake-michigan", "speedboat"],
    preferIds: ["gyg-1336935", "gyg-24790", "gyg-994332"],
    limit: 3,
  },
  "chicago-dining-cruises": {
    tags: ["dining", "cruise", "architecture"],
    preferIds: ["gyg-233082", "gyg-290485", "gyg-386902"],
    limit: 3,
  },
  "chicago-tiki-cruises": {
    tags: ["party", "cruise", "lake-michigan"],
    preferIds: ["gyg-994332", "gyg-24790", "gyg-466163"],
    limit: 3,
  },
  "chicago-sailing-charters": {
    tags: ["sailing", "sunset", "lake-michigan"],
    preferIds: [
      "viator-skyline-sail",
      "viator-private-sunset-sailing",
      "viator-navy-pier-private-sail",
      "gyg-386902",
    ],
    limit: 4,
  },
  "bachelorette-boat-rentals-chicago": {
    tags: ["party", "dining", "cruise"],
    preferIds: ["gyg-994332", "gyg-233082", "viator-skyline-sail"],
    limit: 3,
  },
  "birthday-boat-rentals-chicago": {
    tags: ["party", "cruise", "speedboat"],
    preferIds: ["gyg-994332", "gyg-24790", "gyg-233082"],
    limit: 3,
  },
  "corporate-yacht-charters-chicago": {
    tags: ["dining", "sailing", "architecture"],
    preferIds: [
      "viator-private-yacht-charter",
      "gyg-233082",
      "viator-navy-pier-private-sail",
    ],
    limit: 3,
  },
  "romantic-boat-cruises-chicago": {
    tags: ["sunset", "night", "dining"],
    preferIds: ["gyg-386902", "gyg-266010", "gyg-233082"],
    limit: 3,
  },
};

export function getActiveOffers(): AffiliateOffer[] {
  return affiliateOffers.filter((o) => o.active).sort(sortOffers);
}

export function getOfferById(id: string): AffiliateOffer | undefined {
  return affiliateOffers.find((o) => o.id === id);
}

export function getOffersByCategory(
  category: AffiliateOfferCategory
): AffiliateOffer[] {
  return getActiveOffers().filter((o) => o.category === category);
}

export function getOffersForPage(slug: string): AffiliateOffer[] {
  return getContextualOffers(slug);
}

/**
 * Contextual offer selection: preferIds → tag match → relatedPageSlugs,
 * then family-dedupe and limit.
 */
export function getContextualOffers(
  pageSlug: string,
  options?: { limit?: number; placement?: string }
): AffiliateOffer[] {
  const intent = PAGE_OFFER_INTENT[pageSlug];
  const limit = options?.limit ?? intent?.limit ?? 4;
  const active = getActiveOffers().filter(
    (o) => o.experienceType !== "destination"
  );

  const scored: { offer: AffiliateOffer; score: number }[] = [];

  for (const offer of active) {
    let score = 0;
    const preferIdx = intent?.preferIds?.indexOf(offer.id) ?? -1;
    if (preferIdx >= 0) score += 1000 - preferIdx * 10;
    if (offer.relatedPageSlugs.includes(pageSlug)) score += 200;
    if (intent?.tags?.length && offer.tags?.length) {
      const overlap = intent.tags.filter((t) => offer.tags!.includes(t)).length;
      score += overlap * 50;
    }
    if (offer.featured) score += 5;
    if (offer.bestsellerRank != null) score += Math.max(0, 40 - offer.bestsellerRank);
    if (score > 0) scored.push({ offer, score });
  }

  // Fallback: relatedPageSlugs only
  if (!scored.length) {
    return dedupeOfferFamilies(
      active.filter((o) => o.relatedPageSlugs.includes(pageSlug))
    ).slice(0, limit);
  }

  scored.sort((a, b) => b.score - a.score || sortOffers(a.offer, b.offer));
  return dedupeOfferFamilies(scored.map((s) => s.offer)).slice(0, limit);
}

export function getFeaturedOffers(limit = 6): AffiliateOffer[] {
  return getActiveOffers()
    .filter((o) => o.featured && o.experienceType !== "destination")
    .slice(0, limit);
}

/** Homepage Popular on the Water — max 4 varied experiences. */
export function getHomepageOffers(limit = 4): AffiliateOffer[] {
  return getContextualOffers("homepage", { limit, placement: "homepage_popular" });
}

/** Popular on the Water module defaults. */
export function getPopularOnTheWaterOffers(limit = 3): AffiliateOffer[] {
  const preferred = ["gyg-290485", "gyg-386902", "gyg-1336935", "gyg-24790", "gyg-994419"];
  const byId = new Map(getActiveOffers().map((o) => [o.id, o]));
  const selected = preferred
    .map((id) => byId.get(id))
    .filter((o): o is AffiliateOffer => Boolean(o));
  return selected.slice(0, limit);
}

/** Assert partner_id is present on all active GYG URLs (dev/test helper). */
export function assertGygTrackingIntact(): string[] {
  return getActiveOffers()
    .filter((o) => o.provider === "getyourguide")
    .filter((o) => !o.url.includes(`partner_id=${GETYOURGUIDE_PARTNER_ID}`))
    .map((o) => o.id);
}
