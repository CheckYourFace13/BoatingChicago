export interface SourceRef {
  name: string;
  url: string;
  lastVerified?: string;
}

export type GeoRegion = "illinois" | "wisconsin" | "indiana" | "michigan";

export interface Destination {
  slug: string;
  name: string;
  region: GeoRegion;
  state: string;
  bodyOfWater: string;
  summary: string;
  overview: string[];
  highlights: string[];
  officialLinks: SourceRef[];
  relatedCategorySlugs?: string[];
  relatedGuideSlugs?: string[];
  weatherLocationId: string;
  coordinates: { lat: number; lng: number };
  distanceFromChicagoMiles?: number;
  isPublished: boolean;
  nearbyDestinationSlugs?: string[];
}

export interface LakeFact {
  label: string;
  value: string;
  /** Year or label clarifying when the fact was recorded (e.g. "2020 DNR survey") */
  asOf?: string;
}

export interface Lake {
  slug: string;
  name: string;
  region: GeoRegion;
  state: string;
  overview: string[];
  officialLinks: SourceRef[];
  destinationSlugs: string[];
  /** Forest-preserve / conservation landings on this waterway (optional cross-links) */
  relatedPreserveSlugs?: string[];
  /** Optional page-specific search title — do not invent access or fees. */
  seoTitle?: string;
  seoDescription?: string;
  /** Verified survey / agency facts for a Lake Facts table */
  lakeFacts?: LakeFact[];
  /** Optional FAQs answered only from cited official sources */
  faqs?: { question: string; answer: string }[];
  /** WGS84 when an official source publishes coordinates */
  coordinates?: { lat: number; lng: number };
  isPublished: boolean;
}

export interface MarinaAmenity {
  key: string;
  /** true = confirmed available; false = confirmed unavailable; null = unknown */
  available: boolean | null;
  note?: string;
}

export interface Marina {
  slug: string;
  name: string;
  destinationSlug: string;
  summary: string;
  officialWebsite?: string;
  phone?: string;
  amenities: MarinaAmenity[];
  /**
   * Seasonal access / harbor-season note from the cited operator.
   * Never invent opening dates — point readers to the official page when unsure.
   */
  seasonalAccessNote?: string;
  /**
   * Hours / office access note only when confirmed on the cited source.
   */
  hoursNote?: string;
  /**
   * Fees/permits note — prefer “see official source” over repeating dollar amounts
   * that go stale. Distinguish resident vs nonresident when the operator publishes that.
   */
  feesNote?: string;
  source: SourceRef;
  isPublished: boolean;
}

/** How you get a craft into the water — only set when the official source is clear. */
export type LaunchAccessMode =
  | "trailered"
  | "carry-in"
  | "steps"
  | "non-motorized";

export interface BoatLaunch {
  slug: string;
  name: string;
  destinationSlug: string;
  lakeSlug?: string;
  summary: string;
  /** Extra unique planning context — never invent fees or unconfirmed facilities */
  overview?: string[];
  /** Verified amenity notes only — never invent fees or unconfirmed facilities */
  amenityNotes?: string;
  seasonalAccessNote?: string;
  hoursNote?: string;
  feesNote?: string;
  /**
   * Access mode when the operating agency is explicit.
   * Omit when the source does not clearly classify the ramp.
   */
  accessMode?: LaunchAccessMode;
  /**
   * True when the official page limits the site to kayaks/canoes/non-motorized
   * (or equivalent wording). Never infer from destination alone.
   */
  nonMotorizedOnly?: boolean;
  /** Optional page-specific search title — do not invent access or fees. */
  seoTitle?: string;
  seoDescription?: string;
  source: SourceRef;
  isPublished: boolean;
}

export type EventCategory =
  | "air-show"
  | "fireworks"
  | "festival"
  | "race"
  | "seasonal"
  | "other";

export interface EventItem {
  slug: string;
  title: string;
  startDate: string;
  endDate?: string;
  location: string;
  summary: string;
  source: SourceRef;
  isPublished: boolean;
  category: EventCategory;
}

/**
 * Editorial storage / haul-out directory entry.
 * Only list operators whose official site confirms relevant services.
 * Never invent prices, availability, reviews, or endorsements.
 */
export interface StorageFacility {
  slug: string;
  name: string;
  /** City / harbor / yard location as stated by the operator */
  location: string;
  /** Who the facility serves geographically (plain language) */
  serviceArea: string;
  summary: string;
  /** Confirmed services only — wording must match the cited official page */
  confirmedServices: string[];
  officialWebsite: string;
  source: SourceRef;
  isPublished: boolean;
}

/** County / district that publishes the access rules for a preserve water. */
export type PreserveAgency =
  | "cook-fpdcc"
  | "dupage-fpd"
  | "lake-county-fpd"
  | "will-fpdwc"
  | "kane-fpd"
  | "mchenry-ccd"
  | "other";

export type PreserveAccessKind =
  | "trailered-launch"
  | "carry-in"
  | "rental-only"
  | "accessible-landing";

export type PreserveCraft =
  | "canoe"
  | "kayak"
  | "rowboat"
  | "sailboat"
  | "electric-trolling"
  | "paddle-boat"
  | "fishing-boat-electric";

/**
 * Forest-preserve / conservation-district water access.
 * Only publish facts confirmed on the cited official agency page.
 * Never invent motor limits, fees, hours, or rental availability.
 */
export interface PreserveWaterAccess {
  slug: string;
  name: string;
  county: string;
  agency: PreserveAgency;
  /** Nearest town / preserve name as the agency describes it */
  locationLabel: string;
  summary: string;
  overview: string[];
  accessKinds: PreserveAccessKind[];
  /** Craft types the agency lists as allowed at this site */
  allowedCraft: PreserveCraft[];
  /** Explicit agency prohibitions relevant to boaters (e.g. gasoline motors) */
  restrictions: string[];
  hasRentals: boolean;
  rentalNotes?: string;
  seasonalAccessNote?: string;
  phone?: string;
  addressHint?: string;
  source: SourceRef;
  /** Secondary official pages (maps, district boating hub) */
  relatedSources?: SourceRef[];
  isPublished: boolean;
  /**
   * When false, the location stays on the county hub but has no standalone
   * indexable detail page — use redirectTo for the permanent one-hop target.
   * Defaults to true when omitted.
   */
  standalonePage?: boolean;
  /** Permanent redirect target path (e.g. /lakes/des-plaines-river#allison-woods) */
  redirectTo?: string;
}
