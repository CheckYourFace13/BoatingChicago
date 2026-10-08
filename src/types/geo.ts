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

export interface Lake {
  slug: string;
  name: string;
  region: GeoRegion;
  state: string;
  overview: string[];
  officialLinks: SourceRef[];
  destinationSlugs: string[];
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
