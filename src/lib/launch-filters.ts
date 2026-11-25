import type { BoatLaunch } from "@/types/geo";

export type WaterFilter = "all" | "lake-michigan" | "inland" | "river";
export type AccessFilter =
  | "all"
  | "trailered"
  | "carry-in"
  | "non-motorized"
  | "steps";

const RIVER_LAKE_SLUGS = new Set([
  "fox-river",
  "des-plaines-river",
  "dupage-river",
]);

const INLAND_LAKE_SLUGS = new Set(["chain-o-lakes", "geneva-lake"]);

export const WATER_FILTERS: { id: WaterFilter; label: string }[] = [
  { id: "all", label: "All waters" },
  { id: "lake-michigan", label: "Lake Michigan" },
  { id: "inland", label: "Inland lakes" },
  { id: "river", label: "Rivers" },
];

export const ACCESS_FILTERS: { id: AccessFilter; label: string }[] = [
  { id: "all", label: "Any access" },
  { id: "trailered", label: "Trailered" },
  { id: "carry-in", label: "Carry-in" },
  { id: "non-motorized", label: "Non-motorized only" },
  { id: "steps", label: "Steps / harbor steps" },
];

export function parseWaterFilter(raw: string | undefined): WaterFilter {
  return WATER_FILTERS.some((f) => f.id === raw) ? (raw as WaterFilter) : "all";
}

export function parseAccessFilter(raw: string | undefined): AccessFilter {
  return ACCESS_FILTERS.some((f) => f.id === raw)
    ? (raw as AccessFilter)
    : "all";
}

export function matchesWater(launch: BoatLaunch, filter: WaterFilter): boolean {
  if (filter === "all") return true;
  if (filter === "lake-michigan") {
    return launch.lakeSlug === "lake-michigan-chicago";
  }
  if (filter === "inland") {
    return !!launch.lakeSlug && INLAND_LAKE_SLUGS.has(launch.lakeSlug);
  }
  if (filter === "river") {
    if (launch.lakeSlug && RIVER_LAKE_SLUGS.has(launch.lakeSlug)) return true;
    // Chicago River CPD sites are destination=chicago without a lakeSlug
    return launch.destinationSlug === "chicago" && !launch.lakeSlug;
  }
  return true;
}

export function matchesAccess(
  launch: BoatLaunch,
  filter: AccessFilter,
): boolean {
  if (filter === "all") return true;
  if (filter === "non-motorized") {
    return (
      launch.nonMotorizedOnly === true || launch.accessMode === "non-motorized"
    );
  }
  if (filter === "trailered") return launch.accessMode === "trailered";
  if (filter === "carry-in") return launch.accessMode === "carry-in";
  if (filter === "steps") return launch.accessMode === "steps";
  return true;
}

export function filterLaunches(
  launches: BoatLaunch[],
  water: WaterFilter,
  access: AccessFilter,
): BoatLaunch[] {
  return launches.filter(
    (launch) => matchesWater(launch, water) && matchesAccess(launch, access),
  );
}

export function filterHref(water: WaterFilter, access: AccessFilter): string {
  const params = new URLSearchParams();
  if (water !== "all") params.set("water", water);
  if (access !== "all") params.set("access", access);
  const q = params.toString();
  return q ? `/boat-launches?${q}` : "/boat-launches";
}

export function waterLabel(id: WaterFilter): string {
  return WATER_FILTERS.find((f) => f.id === id)?.label ?? "All waters";
}

export function accessLabel(id: AccessFilter): string {
  return ACCESS_FILTERS.find((f) => f.id === id)?.label ?? "Any access";
}

export interface AlternateOption {
  water: WaterFilter;
  access: AccessFilter;
  label: string;
  count: number;
  href: string;
}

/**
 * Non-empty neighbors of an empty filter combination: relax the access filter
 * (keeping the waterbody) and relax the waterbody filter (keeping access).
 * Counts come from the same published launch list, so nothing is invented.
 */
export function getAlternateOptions(
  launches: BoatLaunch[],
  water: WaterFilter,
  access: AccessFilter,
): { keepWater: AlternateOption[]; keepAccess: AlternateOption[] } {
  const keepWater: AlternateOption[] = [];
  if (access !== "all") {
    for (const item of ACCESS_FILTERS) {
      if (item.id === access) continue;
      const count = filterLaunches(launches, water, item.id).length;
      if (count > 0) {
        keepWater.push({
          water,
          access: item.id,
          label:
            item.id === "all"
              ? water === "all"
                ? "Any access"
                : `Any access on ${waterLabel(water)}`
              : item.label,
          count,
          href: filterHref(water, item.id),
        });
      }
    }
  }

  const keepAccess: AlternateOption[] = [];
  if (water !== "all") {
    for (const item of WATER_FILTERS) {
      if (item.id === water) continue;
      const count = filterLaunches(launches, item.id, access).length;
      if (count > 0) {
        keepAccess.push({
          water: item.id,
          access,
          label: item.label,
          count,
          href: filterHref(item.id, access),
        });
      }
    }
  }

  return { keepWater, keepAccess };
}
