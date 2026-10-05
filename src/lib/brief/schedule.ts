/**
 * Next Thursday 15:00 America/Chicago helpers for Chicago Boating Brief.
 */

const TZ = "America/Chicago";

/** Format a Date as YYYY-MM-DD in America/Chicago. */
export function chicagoDateKey(d = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

/** Weekday 0=Sun … 6=Sat in America/Chicago. */
export function chicagoWeekday(d = new Date()): number {
  const wd = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
  }).format(d);
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return map[wd] ?? d.getUTCDay();
}

/**
 * Next Thursday 3:00 PM America/Chicago as a UTC Date.
 * If today is Thursday and before 3pm CT, returns today; otherwise next Thursday.
 */
export function nextThursdayBriefAt(from = new Date()): Date {
  // Iterate day-by-day in CT until we hit the right wall-clock moment
  for (let dayOffset = 0; dayOffset < 14; dayOffset++) {
    const probe = new Date(from.getTime() + dayOffset * 86_400_000);
    if (chicagoWeekday(probe) !== 4) continue;

    // Build ISO for that calendar date at 15:00 CT
    const dateKey = chicagoDateKey(probe);
    // America/Chicago offset for that date via formatToParts on a known UTC noon
    const candidate = zonedTimeToUtc(dateKey, 15, 0);
    if (candidate.getTime() > from.getTime() - 60_000) {
      return candidate;
    }
  }
  // Fallback: 7 days from now at 15:00 CT
  const fallbackKey = chicagoDateKey(new Date(from.getTime() + 7 * 86_400_000));
  return zonedTimeToUtc(fallbackKey, 15, 0);
}

/**
 * Convert a calendar date (YYYY-MM-DD) + local hour/minute in America/Chicago to UTC Date.
 * Uses Intl offset sniffing (no external tz lib).
 */
export function zonedTimeToUtc(
  dateKey: string,
  hour: number,
  minute: number
): Date {
  // Guess with UTC, then adjust by observed Chicago offset
  const guess = new Date(`${dateKey}T${pad(hour)}:${pad(minute)}:00.000Z`);
  const offsetMin = chicagoOffsetMinutes(guess);
  return new Date(guess.getTime() + offsetMin * 60_000);
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** Minutes to add to a UTC instant so wall clock matches Chicago for that date. */
function chicagoOffsetMinutes(instant: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    timeZoneName: "shortOffset",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(instant);
  const tz =
    parts.find((p) => p.type === "timeZoneName")?.value || "GMT-5";
  const m = tz.match(/GMT([+-])(\d+)(?::(\d+))?/i);
  if (!m) return 5 * 60; // CST fallback
  const sign = m[1] === "-" ? 1 : -1; // GMT-5 → add 5h to local→UTC
  const hours = Number(m[2] || 0);
  const mins = Number(m[3] || 0);
  return sign * (hours * 60 + mins);
}

export function isBriefAutomationPaused(): boolean {
  const v = (process.env.BRIEF_AUTOMATION_PAUSED || "").trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

export const BRIEF_SCHEDULE_LABEL =
  "Every Thursday 3:00 PM America/Chicago";
