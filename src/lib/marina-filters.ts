import type { Destination, Marina } from "@/types/geo";

export const MARINA_FILTER_AMENITIES = [
  "fuel",
  "pump-out",
  "transient-dockage",
  "boat-launch",
  "winter-storage",
  "showers",
] as const;

export type MarinaFilterAmenity = (typeof MARINA_FILTER_AMENITIES)[number];
export type WaterKindFilter = "all" | "lake-michigan" | "inland";

export function parseMarinaAmenity(raw: string | undefined): MarinaFilterAmenity | null {
  return MARINA_FILTER_AMENITIES.includes(raw as MarinaFilterAmenity)
    ? (raw as MarinaFilterAmenity)
    : null;
}

export function parseWaterKind(raw: string | undefined): WaterKindFilter {
  return raw === "lake-michigan" || raw === "inland" ? raw : "all";
}

export function waterKind(destination: Destination): "lake-michigan" | "inland" {
  return /lake michigan/i.test(destination.bodyOfWater)
    ? "lake-michigan"
    : "inland";
}

export function hasConfirmedAmenity(marina: Marina, key: MarinaFilterAmenity): boolean {
  return marina.amenities.some((a) => a.key === key && a.available === true);
}

export function marinaFilterHref(
  water: WaterKindFilter,
  amenity: MarinaFilterAmenity | null,
): string {
  const params = new URLSearchParams();
  if (water !== "all") params.set("water", water);
  if (amenity) params.set("amenity", amenity);
  const q = params.toString();
  return q ? `/marinas?${q}` : "/marinas";
}

export function marinaFiltersActive(
  water: WaterKindFilter,
  amenity: MarinaFilterAmenity | null,
): boolean {
  return water !== "all" || amenity != null;
}
