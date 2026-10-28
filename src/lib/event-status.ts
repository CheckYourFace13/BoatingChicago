import type { EventItem } from "@/types/geo";
import { chicagoCalendarDate } from "@/lib/season";

export type PublishedSeasonPhase = "upcoming" | "open" | "closed";
export type DatedEventPhase = "upcoming" | "current" | "ended";

/**
 * Published program window using America/Chicago calendar dates, inclusive.
 * Does not mean every facility is operating or available on a given day.
 */
export function publishedSeasonPhase(
  startDate: string,
  endDate: string,
  asOf: Date = new Date(),
): PublishedSeasonPhase {
  const today = chicagoCalendarDate(asOf);
  if (today < startDate) return "upcoming";
  if (today <= endDate) return "open";
  return "closed";
}

export function datedEventPhase(
  startDate: string,
  endDate: string,
  asOf: Date = new Date(),
): DatedEventPhase {
  const today = chicagoCalendarDate(asOf);
  if (today < startDate) return "upcoming";
  if (today <= endDate) return "current";
  return "ended";
}

export function eventWindowPhase(
  event: EventItem,
  asOf: Date = new Date(),
): PublishedSeasonPhase | DatedEventPhase {
  const end = event.endDate ?? event.startDate;
  if (event.category === "seasonal") {
    return publishedSeasonPhase(event.startDate, end, asOf);
  }
  return datedEventPhase(event.startDate, end, asOf);
}

export function seasonStatusLabel(phase: PublishedSeasonPhase): string {
  if (phase === "upcoming") return "Upcoming published season";
  if (phase === "open") return "Published season open";
  return "Published season closed";
}

export function seasonalStatusLabel(
  event: EventItem,
  asOf: Date = new Date(),
): string | null {
  if (event.category !== "seasonal") return null;
  const phase = publishedSeasonPhase(
    event.startDate,
    event.endDate ?? event.startDate,
    asOf,
  );
  return seasonStatusLabel(phase);
}

export function eventTickerLabel(
  event: EventItem,
  asOf: Date = new Date(),
): string {
  const title = event.title.toUpperCase();
  const phase = eventWindowPhase(event, asOf);
  if (event.category === "seasonal") {
    if (phase === "upcoming") return `UPCOMING: ${title}`;
    if (phase === "open") return `${title}: OPEN`;
    return `${title}: CLOSED`;
  }
  if (phase === "upcoming") return `UPCOMING: ${title}`;
  return title;
}

/**
 * Prefer an in-progress dated event, then an open published season
 * (Chicago Harbors first), then the next upcoming date, then a closed season.
 */
export function pickTickerEvent(
  events: EventItem[],
  asOf: Date = new Date(),
): EventItem | undefined {
  const inProgress = events.find((event) => {
    if (event.category === "seasonal") return false;
    return eventWindowPhase(event, asOf) === "current";
  });
  if (inProgress) return inProgress;

  const harbor = events.find((event) => event.slug === "chicago-harbor-season");
  if (harbor && eventWindowPhase(harbor, asOf) === "open") return harbor;

  const openSeason = events.find(
    (event) =>
      event.category === "seasonal" && eventWindowPhase(event, asOf) === "open",
  );
  if (openSeason) return openSeason;

  const upcoming = events
    .filter((event) => eventWindowPhase(event, asOf) === "upcoming")
    .sort((a, b) => a.startDate.localeCompare(b.startDate))[0];
  if (upcoming) return upcoming;

  return (
    events.find((event) => event.category === "seasonal") ?? events[0]
  );
}
