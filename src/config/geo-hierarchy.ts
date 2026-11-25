/**
 * Geographic navigation hierarchy for BoatingChicago.
 * Chicago/Chicagoland stay primary; hubs organize discovery without
 * replacing existing Chicago-specific destination URLs.
 */

import type { GeoRegion } from "@/types/geo";

export type GeoHubId =
  | "chicago-chicagoland"
  | "illinois-inland"
  | "wisconsin-lake-michigan"
  | "wisconsin-inland"
  | "indiana-lake-michigan"
  | "indiana-inland"
  | "michigan-lake-michigan"
  | "michigan-inland"
  | "lake-michigan-full";

export type DistanceKind = "driving" | "water-route" | "straight-line";

export interface GeoHub {
  id: GeoHubId;
  slug: string;
  name: string;
  shortName: string;
  region: GeoRegion | "multi";
  shore: "lake-michigan" | "inland" | "mixed" | "full-lake";
  summary: string;
  /** SEO / hero intro — original editorial framing, not a facility dump. */
  intro: string;
  /** Priority for hub index (lower = higher). */
  order: number;
}

export const GEO_HUBS: GeoHub[] = [
  {
    id: "chicago-chicagoland",
    slug: "chicago-chicagoland",
    name: "Chicago & Chicagoland",
    shortName: "Chicago",
    region: "illinois",
    shore: "mixed",
    summary:
      "Primary audience hub — Chicago lakefront harbors, North Shore Lake Michigan access, Chain O’ Lakes, and county forest-preserve waters.",
    intro:
      "Start here for Chicago Park District harbors and launches, Waukegan and Winthrop Harbor on the Illinois Lake Michigan shore, the Chain O’ Lakes / Fox Waterway system, and Cook, Lake, DuPage, Will, Kane, and McHenry forest-preserve paddling and small-boat access. Chicago-specific landing pages keep their own URLs and search intent.",
    order: 1,
  },
  {
    id: "illinois-inland",
    slug: "illinois-inland",
    name: "Illinois Inland Waters",
    shortName: "IL inland",
    region: "illinois",
    shore: "inland",
    summary:
      "Rivers and reservoirs beyond the lakefront — Fox, Des Plaines, DuPage, Illinois River access, and major inland lakes within about 400 driving miles.",
    intro:
      "Illinois inland coverage focuses on verified river corridors and reservoirs used for trailering, paddling, and fishing trips from the Chicago area. Distances shown on destination and lake pages are driving miles unless a NOAA water-route figure is cited.",
    order: 2,
  },
  {
    id: "wisconsin-lake-michigan",
    slug: "wisconsin-lake-michigan",
    name: "Wisconsin Lake Michigan Shore",
    shortName: "WI Lake Michigan",
    region: "wisconsin",
    shore: "lake-michigan",
    summary:
      "Western Lake Michigan harbors from Kenosha through Milwaukee, Sheboygan, Manitowoc, Green Bay, and Door County.",
    intro:
      "Follow the Wisconsin shore north from the Illinois line through Kenosha, Racine, Milwaukee, Port Washington, Sheboygan, and Manitowoc, then into Green Bay and Door County. Open-lake runs here are exposed Lake Michigan or bay waters — use each harbor’s official marina and launch pages plus the local NWS point forecast.",
    order: 3,
  },
  {
    id: "wisconsin-inland",
    slug: "wisconsin-inland",
    name: "Wisconsin Inland Waters",
    shortName: "WI inland",
    region: "wisconsin",
    shore: "inland",
    summary:
      "Geneva Lake, Madison-area lakes, Winnebago, Green Lake, Delavan, Koshkonong, and other inland waters within trailer range of Chicago.",
    intro:
      "Southern and central Wisconsin inland lakes that Chicago-area boaters trailer to for weekends. Each lake page cites Wisconsin DNR or municipal launch rules; do not treat inland lake forecasts as Lake Michigan marine products.",
    order: 4,
  },
  {
    id: "indiana-lake-michigan",
    slug: "indiana-lake-michigan",
    name: "Indiana Lake Michigan Shore",
    shortName: "IN Lake Michigan",
    region: "indiana",
    shore: "lake-michigan",
    summary:
      "South-shore Lake Michigan access — Hammond, Michigan City, and other usable Indiana harbors and launches.",
    intro:
      "Indiana’s short Lake Michigan shoreline still matters for Chicago boaters: Hammond Marina is a short water run from the city, and Michigan City Port Authority harbors remain a primary south-shore destination. Verify industrial-channel and pier conditions before leaving the basin.",
    order: 5,
  },
  {
    id: "indiana-inland",
    slug: "indiana-inland",
    name: "Indiana Inland Waters",
    shortName: "IN inland",
    region: "indiana",
    shore: "inland",
    summary:
      "Northern Indiana lake districts — Wawasee, Maxinkuckee, and other recreational waters within about 400 driving miles.",
    intro:
      "Northern Indiana’s glacial lakes support powerboating, fishing, and paddling within a few hours’ drive of Chicago. Public-access details come from Indiana DNR and local municipalities — we only publish what those sources confirm.",
    order: 6,
  },
  {
    id: "michigan-lake-michigan",
    slug: "michigan-lake-michigan",
    name: "Michigan Lake Michigan Shore",
    shortName: "MI Lake Michigan",
    region: "michigan",
    shore: "lake-michigan",
    summary:
      "Eastern Lake Michigan from Harbor Country through Grand Haven, Muskegon, Ludington, and Traverse City / Grand Traverse Bay.",
    intro:
      "Michigan’s west coast is the long eastern shore of Lake Michigan for Chicago boaters — New Buffalo through Grand Haven today, with Muskegon, Ludington, and Traverse City extending the corridor north. Harbor basins and connecting lakes often shelter launches; the lake outside the piers is open water.",
    order: 7,
  },
  {
    id: "michigan-inland",
    slug: "michigan-inland",
    name: "Michigan Inland Waters",
    shortName: "MI inland",
    region: "michigan",
    shore: "inland",
    summary:
      "Southwest and western Michigan inland lakes within about 400 driving miles of Chicago.",
    intro:
      "Inland Michigan lakes near the Lake Michigan corridor — including Gull Lake and other qualifying waters — for trailer and paddling trips. Confirm MDNR access-site details and local ordinances before you go.",
    order: 8,
  },
  {
    id: "lake-michigan-full",
    slug: "lake-michigan",
    name: "All of Lake Michigan",
    shortName: "Full lake",
    region: "multi",
    shore: "full-lake",
    summary:
      "Entire Lake Michigan shoreline across Illinois, Wisconsin, Indiana, and Michigan — not limited by the inland driving-mile radius.",
    intro:
      "BoatingChicago covers the full Lake Michigan shore regardless of driving distance from Chicago. Use this hub to browse every published Lake Michigan destination; inland waters still use the approximate 400 driving-mile planning radius. Driving miles, NOAA water-route distances, and map straight-line distances are labeled separately and never mixed.",
    order: 9,
  },
];

export function getGeoHubBySlug(slug: string): GeoHub | undefined {
  return GEO_HUBS.find((hub) => hub.slug === slug);
}

export function getAllGeoHubSlugs(): string[] {
  return GEO_HUBS.map((hub) => hub.slug);
}

/** Destination / lake body-of-water check for Lake Michigan shore classification. */
export function isLakeMichiganBody(bodyOfWater: string): boolean {
  return /lake michigan|green bay|grand traverse|pere marquette lake|muskegon lake|sturgeon bay/i.test(
    bodyOfWater,
  );
}
