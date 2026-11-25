/**
 * Growth pipeline types — candidates must pass quality gates before publish.
 */

export type GrowthEntityKind =
  | "destination"
  | "lake"
  | "marina"
  | "launch";

export type GrowthCandidateStatus =
  | "draft"
  | "queued"
  | "ready"
  | "rejected"
  | "published";

export interface GrowthSource {
  name: string;
  url: string;
  /** ISO date YYYY-MM-DD when a human/agent last confirmed the page */
  lastVerified: string;
}

export interface GrowthCandidate {
  id: string;
  kind: GrowthEntityKind;
  slug: string;
  name: string;
  state: "IL" | "WI" | "IN" | "MI";
  region: "illinois" | "wisconsin" | "indiana" | "michigan";
  bodyOfWater?: string;
  summary: string;
  overview: string[];
  highlights?: string[];
  officialLinks: GrowthSource[];
  /** Required for destinations */
  weatherLocationId?: string;
  coordinates?: { lat: number; lng: number };
  distanceFromChicagoMiles?: number;
  nearbyDestinationSlugs?: string[];
  destinationSlug?: string;
  lakeSlug?: string;
  accessMode?: "trailered" | "carry-in" | "steps" | "non-motorized";
  feesNote?: string;
  seasonalAccessNote?: string;
  amenityNotes?: string;
  amenities?: { key: string; available: boolean | null; note?: string }[];
  officialWebsite?: string;
  relatedGuideSlugs?: string[];
  destinationSlugs?: string[];
  status?: GrowthCandidateStatus;
  notes?: string;
}

export interface GateFailure {
  code: string;
  message: string;
}

export interface GateResult {
  ok: boolean;
  failures: GateFailure[];
  warnings: string[];
}

export interface MonitorFinding {
  kind: "broken-link" | "stale-verification" | "seasonal-note" | "source-failure";
  severity: "info" | "warn" | "error";
  target: string;
  detail: string;
  url?: string;
}

export interface PipelineReport {
  generatedAt: string;
  mode: "check" | "propose" | "apply" | "test";
  inventoryBefore: Record<string, number>;
  inventoryAfter?: Record<string, number>;
  discovered: number;
  duplicatesRejected: number;
  unsourcedRejected: number;
  qualityRejected: number;
  ready: string[];
  published: string[];
  proposed: string[];
  enrichments: string[];
  monitor: MonitorFinding[];
  metrics: {
    searchConsole: "unavailable" | "ok";
    adsense: "unavailable" | "ok";
    affiliate: "unavailable" | "ok";
    note: string;
  };
  publication: {
    autoPublishEnabled: boolean;
    applied: boolean;
    reviewablePath?: string;
    note: string;
  };
  ownerActions: string[];
}
