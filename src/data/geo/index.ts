import type {
  BoatLaunch,
  Destination,
  EventItem,
  Lake,
  Marina,
  StorageFacility,
} from "@/types/geo";
import { chicagoCalendarDate } from "@/lib/season";
import { destinations } from "./destinations";
import { events } from "./events";
import { lakes } from "./lakes";
import { launches } from "./launches";
import { marinas } from "./marinas";
import { storageFacilities } from "./storage-facilities";

export { destinations } from "./destinations";
export { lakes } from "./lakes";
export { marinas } from "./marinas";
export { launches } from "./launches";
export { events } from "./events";
export { storageFacilities } from "./storage-facilities";

function isPublished<T extends { isPublished: boolean }>(item: T): boolean {
  return item.isPublished;
}

/**
 * Dated events drop the calendar day after their inclusive end date
 * (America/Chicago). Seasonal program dates stay listed through Dec 31 of
 * the end-date year so a CLOSED label can show after the season.
 */
export function isEventExpired(
  event: EventItem,
  asOf: Date = new Date(),
): boolean {
  const lastDay = event.endDate ?? event.startDate;
  const today = chicagoCalendarDate(asOf);
  if (event.category === "seasonal") {
    const endYear = lastDay.slice(0, 4);
    return today > `${endYear}-12-31`;
  }
  return today > lastDay;
}

export function getPublishedDestinations(): Destination[] {
  return destinations.filter(isPublished);
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getAllPublishedDestinationSlugs(): string[] {
  return getPublishedDestinations().map((d) => d.slug);
}

export function getPublishedLakes(): Lake[] {
  return lakes.filter(isPublished);
}

export function getLakeBySlug(slug: string): Lake | undefined {
  return lakes.find((l) => l.slug === slug);
}

export function getAllPublishedLakeSlugs(): string[] {
  return getPublishedLakes().map((l) => l.slug);
}

export function getPublishedMarinas(): Marina[] {
  return marinas.filter(isPublished);
}

export function getMarinaBySlug(slug: string): Marina | undefined {
  return marinas.find((m) => m.slug === slug);
}

export function getAllPublishedMarinaSlugs(): string[] {
  return getPublishedMarinas().map((m) => m.slug);
}

export function getMarinasByDestination(destinationSlug: string): Marina[] {
  return getPublishedMarinas().filter(
    (m) => m.destinationSlug === destinationSlug,
  );
}

export function getPublishedLaunches(): BoatLaunch[] {
  return launches.filter(isPublished);
}

export function getLaunchBySlug(slug: string): BoatLaunch | undefined {
  return launches.find((l) => l.slug === slug);
}

export function getAllPublishedLaunchSlugs(): string[] {
  return getPublishedLaunches().map((l) => l.slug);
}

export function getLaunchesByDestination(destinationSlug: string): BoatLaunch[] {
  return getPublishedLaunches().filter(
    (l) => l.destinationSlug === destinationSlug,
  );
}

export function getPublishedEvents(asOf: Date = new Date()): EventItem[] {
  return events.filter(isPublished).filter((e) => !isEventExpired(e, asOf));
}

/** All published events including expired (for archives / admin). */
export function getAllPublishedEvents(): EventItem[] {
  return events.filter(isPublished);
}

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug);
}

export function getAllPublishedEventSlugs(asOf: Date = new Date()): string[] {
  return getPublishedEvents(asOf).map((e) => e.slug);
}

export function filterExpiredEvents(
  items: EventItem[],
  asOf: Date = new Date(),
): EventItem[] {
  return items.filter((e) => !isEventExpired(e, asOf));
}

export function getPublishedStorageFacilities(): StorageFacility[] {
  return storageFacilities.filter(isPublished);
}

export function getStorageFacilityBySlug(
  slug: string,
): StorageFacility | undefined {
  return storageFacilities.find((f) => f.slug === slug);
}
