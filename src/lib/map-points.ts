import type { BoatLaunch, Destination, Marina } from "@/types/geo";
import { verifiedMarinaPlaces } from "@/data/geo/place-verification";

export type MapPointKind = "marina" | "launch-area";

export interface MapPointLink {
  label: string;
  href: string;
}

/** Serializable pin for the lazy-loaded Leaflet map. */
export interface MapPoint {
  id: string;
  kind: MapPointKind;
  title: string;
  subtitle: string;
  lat: number;
  lng: number;
  /** Primary page for the pin (marina page / destination guide). */
  href: string;
  /** Extra existing pages listed in the popup (e.g. each launch in the area). */
  links: MapPointLink[];
}

function validCoord(lat: unknown, lng: unknown): boolean {
  return (
    typeof lat === "number" &&
    typeof lng === "number" &&
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

/**
 * One pin per marina. Prefer verifiedMarinaPlaces (OSM) coordinates; otherwise
 * fall back to the published destination coordinate and label the pin as a
 * harbor-area marker (not a slip GPS). Marinas with neither remain unmapped.
 */
export function buildMarinaPoints(
  marinas: Marina[],
  destinationName: (slug: string) => string | undefined,
  destinationCoords?: (
    slug: string,
  ) => { lat: number; lng: number } | undefined,
): { points: MapPoint[]; unmapped: Marina[] } {
  const points: MapPoint[] = [];
  const unmapped: Marina[] = [];
  for (const marina of marinas) {
    const place = verifiedMarinaPlaces[marina.slug];
    const dest = destinationCoords?.(marina.destinationSlug);
    if (place && validCoord(place.lat, place.lng)) {
      points.push({
        id: `marina:${marina.slug}`,
        kind: "marina",
        title: marina.name,
        subtitle: destinationName(marina.destinationSlug) ?? "Marina",
        lat: place.lat,
        lng: place.lng,
        href: `/marinas/${marina.slug}`,
        links: [],
      });
      continue;
    }
    if (dest && validCoord(dest.lat, dest.lng)) {
      points.push({
        id: `marina:${marina.slug}`,
        kind: "marina",
        title: marina.name,
        subtitle: `${destinationName(marina.destinationSlug) ?? "Harbor"} area marker (not slip GPS)`,
        lat: dest.lat,
        lng: dest.lng,
        href: `/marinas/${marina.slug}`,
        links: [],
      });
      continue;
    }
    unmapped.push(marina);
  }
  return { points, unmapped };
}

/**
 * Launches carry no per-ramp coordinates in our data, so launches are grouped
 * into one "area" pin at the published destination coordinate. The popup links
 * to every launch page in that destination; the pin is NOT a ramp location.
 */
export function buildLaunchAreaPoints(
  groups: { destination: Destination; launches: BoatLaunch[] }[],
): MapPoint[] {
  const points: MapPoint[] = [];
  for (const { destination, launches } of groups) {
    const c = destination.coordinates;
    if (launches.length === 0 || !c || !validCoord(c.lat, c.lng)) continue;
    points.push({
      id: `launch-area:${destination.slug}`,
      kind: "launch-area",
      title: `${destination.name}, ${destination.state}`,
      subtitle: `${launches.length} public launch${launches.length === 1 ? "" : "es"} · area marker`,
      lat: c.lat,
      lng: c.lng,
      href: `/destinations/${destination.slug}`,
      links: launches.map((l) => ({
        label: l.name,
        href: `/boat-launches/${l.slug}`,
      })),
    });
  }
  return points;
}
