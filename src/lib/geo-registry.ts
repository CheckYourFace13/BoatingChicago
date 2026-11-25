/**
 * Deduplicated geographic registry helpers.
 * Classifies published destinations and lakes into editorial hubs without
 * inventing facilities. Inventory counts are derived from published data only.
 */

import {
  GEO_HUBS,
  type GeoHub,
  type GeoHubId,
  isLakeMichiganBody,
} from "@/config/geo-hierarchy";
import {
  getDestinationBySlug,
  getPublishedDestinations,
  getPublishedLakes,
  getPublishedLaunches,
  getPublishedMarinas,
  getPublishedPreserveAccess,
} from "@/data/geo";
import type { Destination, Lake } from "@/types/geo";

/** Chicagoland / North Shore destination slugs kept under the primary hub. */
const CHICAGO_CHICAGOLAND_DESTINATION_SLUGS = new Set([
  "chicago",
  "waukegan",
  "winthrop-harbor",
  "chain-o-lakes",
]);

const CHICAGO_CHICAGOLAND_LAKE_SLUGS = new Set([
  "lake-michigan-chicago",
  "chain-o-lakes",
  "fox-river",
  "des-plaines-river",
  "dupage-river",
]);

export function classifyDestinationHub(destination: Destination): GeoHubId {
  if (CHICAGO_CHICAGOLAND_DESTINATION_SLUGS.has(destination.slug)) {
    return "chicago-chicagoland";
  }

  const lm = isLakeMichiganBody(destination.bodyOfWater);

  if (destination.region === "illinois") {
    return lm ? "chicago-chicagoland" : "illinois-inland";
  }
  if (destination.region === "wisconsin") {
    return lm ? "wisconsin-lake-michigan" : "wisconsin-inland";
  }
  if (destination.region === "indiana") {
    return lm ? "indiana-lake-michigan" : "indiana-inland";
  }
  return lm ? "michigan-lake-michigan" : "michigan-inland";
}

export function classifyLakeHub(lake: Lake): GeoHubId {
  if (CHICAGO_CHICAGOLAND_LAKE_SLUGS.has(lake.slug)) {
    return "chicago-chicagoland";
  }
  // Full-lake bucket remains discoverable under chicago-chicagoland and lake-michigan-full.
  if (lake.slug === "lake-michigan-chicago") {
    return "chicago-chicagoland";
  }

  const linkedLm = lake.destinationSlugs.some((slug) => {
    const dest = getDestinationBySlug(slug);
    return dest ? isLakeMichiganBody(dest.bodyOfWater) : false;
  });

  // Lakes without destinations: infer from name/region.
  const nameLooksLm =
    /lake michigan|green bay|sturgeon bay|grand traverse/i.test(lake.name);

  const lm = linkedLm || nameLooksLm;

  if (lake.region === "illinois") {
    return lm ? "chicago-chicagoland" : "illinois-inland";
  }
  if (lake.region === "wisconsin") {
    return lm ? "wisconsin-lake-michigan" : "wisconsin-inland";
  }
  if (lake.region === "indiana") {
    return lm ? "indiana-lake-michigan" : "indiana-inland";
  }
  return lm ? "michigan-lake-michigan" : "michigan-inland";
}

function destinationsForHub(hubId: GeoHubId): Destination[] {
  const all = getPublishedDestinations();
  if (hubId === "lake-michigan-full") {
    return all
      .filter((d) => isLakeMichiganBody(d.bodyOfWater))
      .sort(
        (a, b) =>
          (a.distanceFromChicagoMiles ?? Number.MAX_SAFE_INTEGER) -
          (b.distanceFromChicagoMiles ?? Number.MAX_SAFE_INTEGER),
      );
  }
  return all
    .filter((d) => classifyDestinationHub(d) === hubId)
    .sort(
      (a, b) =>
        (a.distanceFromChicagoMiles ?? Number.MAX_SAFE_INTEGER) -
        (b.distanceFromChicagoMiles ?? Number.MAX_SAFE_INTEGER),
    );
}

function lakesForHub(hubId: GeoHubId): Lake[] {
  const all = getPublishedLakes();
  if (hubId === "lake-michigan-full") {
    return all.filter(
      (lake) =>
        lake.slug === "lake-michigan-chicago" ||
        lake.destinationSlugs.some((slug) => {
          const dest = getDestinationBySlug(slug);
          return dest ? isLakeMichiganBody(dest.bodyOfWater) : false;
        }),
    );
  }
  return all.filter((lake) => classifyLakeHub(lake) === hubId);
}

export function getHubDestinations(hubId: GeoHubId): Destination[] {
  return destinationsForHub(hubId);
}

export function getHubLakes(hubId: GeoHubId): Lake[] {
  return lakesForHub(hubId);
}

export function getHubMarinaCount(hubId: GeoHubId): number {
  const destSlugs = new Set(destinationsForHub(hubId).map((d) => d.slug));
  return getPublishedMarinas().filter((m) => destSlugs.has(m.destinationSlug))
    .length;
}

export function getHubLaunchCount(hubId: GeoHubId): number {
  const destSlugs = new Set(destinationsForHub(hubId).map((d) => d.slug));
  return getPublishedLaunches().filter((l) => destSlugs.has(l.destinationSlug))
    .length;
}

export interface GeoInventorySnapshot {
  destinations: number;
  lakes: number;
  launches: number;
  marinas: number;
  preserves: number;
  hubs: number;
}

export function getGeoInventorySnapshot(): GeoInventorySnapshot {
  return {
    destinations: getPublishedDestinations().length,
    lakes: getPublishedLakes().length,
    launches: getPublishedLaunches().length,
    marinas: getPublishedMarinas().length,
    preserves: getPublishedPreserveAccess().length,
    hubs: GEO_HUBS.length,
  };
}

export function listGeoHubs(): GeoHub[] {
  return [...GEO_HUBS].sort((a, b) => a.order - b.order);
}

export function getHubsForDestination(destination: Destination): GeoHub[] {
  const primary = classifyDestinationHub(destination);
  const hubs = [GEO_HUBS.find((h) => h.id === primary)!];
  if (isLakeMichiganBody(destination.bodyOfWater)) {
    const full = GEO_HUBS.find((h) => h.id === "lake-michigan-full");
    if (full) hubs.push(full);
  }
  return hubs;
}
