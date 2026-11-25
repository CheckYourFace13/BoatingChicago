import type { BoatLaunch, Destination } from "@/types/geo";
import { haversineMiles, roundMiles } from "@/lib/geo-distance";
import { lookupZip } from "@/lib/zip-centroids";

export type WaterFilter = "all" | "lake-michigan" | "inland" | "river";
export type AccessFilter =
  | "all"
  | "trailered"
  | "carry-in"
  | "non-motorized"
  | "steps";
export type MotorFilter = "all" | "non-motorized" | "motors-not-restricted";
export type NoteFilter = "all" | "fees" | "seasonal" | "amenities";

const RIVER_LAKE_SLUGS = new Set([
  "fox-river",
  "des-plaines-river",
  "dupage-river",
  "illinois-river-starved-rock",
]);

/** Lake Michigan body used by Chicago-area and regional harbor launches. */
const LAKE_MICHIGAN_SLUGS = new Set(["lake-michigan-chicago"]);

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

export const MOTOR_FILTERS: { id: MotorFilter; label: string }[] = [
  { id: "all", label: "Any motor rules" },
  { id: "non-motorized", label: "Agency: non-motorized only" },
  { id: "motors-not-restricted", label: "Not tagged non-motorized" },
];

export const NOTE_FILTERS: { id: NoteFilter; label: string }[] = [
  { id: "all", label: "Any notes" },
  { id: "fees", label: "Has fee / permit note" },
  { id: "seasonal", label: "Has seasonal note" },
  { id: "amenities", label: "Has amenity notes" },
];

export function parseWaterFilter(raw: string | undefined): WaterFilter {
  return WATER_FILTERS.some((f) => f.id === raw) ? (raw as WaterFilter) : "all";
}

export function parseAccessFilter(raw: string | undefined): AccessFilter {
  return ACCESS_FILTERS.some((f) => f.id === raw)
    ? (raw as AccessFilter)
    : "all";
}

export function parseMotorFilter(raw: string | undefined): MotorFilter {
  return MOTOR_FILTERS.some((f) => f.id === raw) ? (raw as MotorFilter) : "all";
}

export function parseNoteFilter(raw: string | undefined): NoteFilter {
  return NOTE_FILTERS.some((f) => f.id === raw) ? (raw as NoteFilter) : "all";
}

export function matchesWater(launch: BoatLaunch, filter: WaterFilter): boolean {
  if (filter === "all") return true;
  if (filter === "lake-michigan") {
    return !!launch.lakeSlug && LAKE_MICHIGAN_SLUGS.has(launch.lakeSlug);
  }
  if (filter === "inland") {
    // Any published lake body that is not Lake Michigan or a river corridor.
    return (
      !!launch.lakeSlug &&
      !LAKE_MICHIGAN_SLUGS.has(launch.lakeSlug) &&
      !RIVER_LAKE_SLUGS.has(launch.lakeSlug)
    );
  }
  if (filter === "river") {
    if (launch.lakeSlug && RIVER_LAKE_SLUGS.has(launch.lakeSlug)) return true;
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

export function matchesMotor(launch: BoatLaunch, filter: MotorFilter): boolean {
  if (filter === "all") return true;
  const nonMotor =
    launch.nonMotorizedOnly === true || launch.accessMode === "non-motorized";
  if (filter === "non-motorized") return nonMotor;
  if (filter === "motors-not-restricted") return !nonMotor;
  return true;
}

export function matchesNote(launch: BoatLaunch, filter: NoteFilter): boolean {
  if (filter === "all") return true;
  if (filter === "fees") return Boolean(launch.feesNote?.trim());
  if (filter === "seasonal") return Boolean(launch.seasonalAccessNote?.trim());
  if (filter === "amenities") return Boolean(launch.amenityNotes?.trim());
  return true;
}

export interface LaunchFilterState {
  water: WaterFilter;
  access: AccessFilter;
  motor: MotorFilter;
  notes: NoteFilter;
  near?: string;
  zip?: string;
}

export function filterLaunches(
  launches: BoatLaunch[],
  water: WaterFilter,
  access: AccessFilter,
  extra?: Pick<LaunchFilterState, "motor" | "notes">,
): BoatLaunch[] {
  const motor = extra?.motor ?? "all";
  const notes = extra?.notes ?? "all";
  return launches.filter(
    (launch) =>
      matchesWater(launch, water) &&
      matchesAccess(launch, access) &&
      matchesMotor(launch, motor) &&
      matchesNote(launch, notes),
  );
}

export function filterHref(
  water: WaterFilter,
  access: AccessFilter,
  extra: Partial<Pick<LaunchFilterState, "motor" | "notes" | "near" | "zip">> = {},
): string {
  const params = new URLSearchParams();
  if (water !== "all") params.set("water", water);
  if (access !== "all") params.set("access", access);
  if (extra.motor && extra.motor !== "all") params.set("motor", extra.motor);
  if (extra.notes && extra.notes !== "all") params.set("notes", extra.notes);
  if (extra.near) params.set("near", extra.near);
  if (extra.zip) params.set("zip", extra.zip);
  const q = params.toString();
  return q ? `/boat-launches?${q}` : "/boat-launches";
}

export function launchFiltersIndexable(state: LaunchFilterState): boolean {
  return (
    state.water === "all" &&
    state.access === "all" &&
    state.motor === "all" &&
    state.notes === "all" &&
    !state.near &&
    !state.zip
  );
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

export function originFromFilters(
  destinations: Destination[],
  nearSlug: string | undefined,
  zip: string | undefined,
): { lat: number; lng: number; label: string } | null {
  const zipHit = lookupZip(zip);
  if (zipHit) {
    return { lat: zipHit.lat, lng: zipHit.lng, label: `${zipHit.zip} (${zipHit.label})` };
  }
  if (nearSlug) {
    const dest = destinations.find((d) => d.slug === nearSlug && d.isPublished);
    if (dest) {
      return {
        lat: dest.coordinates.lat,
        lng: dest.coordinates.lng,
        label: `${dest.name}, ${dest.state}`,
      };
    }
  }
  return null;
}

export function distanceToDestinationMiles(
  origin: { lat: number; lng: number },
  destination: Destination,
): number {
  return roundMiles(haversineMiles(origin, destination.coordinates));
}
