import type { BoatLaunch, EventItem, GeoRegion, Lake } from "@/types/geo";
import { getPublishedLakes, getPublishedLaunches } from "@/data/geo";

const REGION_LABELS: Record<GeoRegion, string> = {
  illinois: "Illinois",
  wisconsin: "Wisconsin",
  indiana: "Indiana",
  michigan: "Michigan",
};

/** Region display order used across hubs, closest-to-Chicago first. */
export const REGION_ORDER: GeoRegion[] = [
  "illinois",
  "wisconsin",
  "indiana",
  "michigan",
];

export function regionLabel(region: GeoRegion): string {
  return REGION_LABELS[region];
}

/** Parse `YYYY-MM-DD` as a local calendar date so display never shifts a day. */
function parseDayString(value: string): Date | null {
  const parts = value.split("-").map(Number);
  if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) return null;
  const [year, month, day] = parts;
  return new Date(year, month - 1, day);
}

export function formatDayString(value: string): string {
  const date = parseDayString(value);
  if (!date) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatLastVerified(value?: string): string | null {
  if (!value) return null;
  const date = parseDayString(value);
  if (!date) return null;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatEventDates(event: EventItem): string {
  const start = parseDayString(event.startDate);
  const end = event.endDate ? parseDayString(event.endDate) : null;

  if (!start) return event.startDate;
  if (!end || end.getTime() === start.getTime()) {
    return formatDayString(event.startDate);
  }

  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = sameYear && start.getMonth() === end.getMonth();

  if (sameMonth) {
    const month = start.toLocaleDateString("en-US", { month: "long" });
    return `${month} ${start.getDate()}–${end.getDate()}, ${end.getFullYear()}`;
  }

  const startLabel = start.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    ...(sameYear ? {} : { year: "numeric" }),
  });
  const endLabel = end.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return `${startLabel} – ${endLabel}`;
}

const AMENITY_LABELS: Record<string, string> = {
  "boat-launch": "Boat launch ramp",
  "dog-friendly": "Dog-friendly areas",
  "fish-cleaning": "Fish cleaning station",
  fuel: "Fuel",
  "harbor-store": "Harbor store",
  laundry: "Laundry",
  parking: "Parking",
  pool: "Pool",
  power: "Shore power",
  "power-and-water": "Power and water at slips",
  "pump-out": "Pump-out",
  restrooms: "Restrooms",
  "seasonal-mooring": "Seasonal slips or moorings",
  security: "On-site security",
  service: "Boat service",
  "ships-store": "Ship's store",
  showers: "Showers",
  "transient-dockage": "Transient dockage",
  water: "Water",
  wifi: "Wi-Fi",
  "winter-storage": "Winter storage",
};

export function amenityLabel(key: string): string {
  const known = AMENITY_LABELS[key];
  if (known) return known;
  return key
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getLakesForDestination(destinationSlug: string): Lake[] {
  return getPublishedLakes().filter((lake) =>
    lake.destinationSlugs.includes(destinationSlug),
  );
}

export function getLaunchesByLake(lakeSlug: string): BoatLaunch[] {
  return getPublishedLaunches().filter((launch) => launch.lakeSlug === lakeSlug);
}
