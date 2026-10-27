/**
 * Compact America/Chicago boating seasons for homepage copy.
 * Boundaries: spring Jan 1–Apr 30; peak May 1–Oct 31; winter Nov 1–Dec 31.
 */

export type BoatingSeason = "spring" | "peak" | "winter";

const TZ = "America/Chicago";

/** Calendar month (1–12) and day in America/Chicago. */
export function chicagoMonthDay(from: Date = new Date()): {
  month: number;
  day: number;
} {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    month: "numeric",
    day: "numeric",
  }).formatToParts(from);
  const month = Number(parts.find((p) => p.type === "month")?.value);
  const day = Number(parts.find((p) => p.type === "day")?.value);
  return { month, day };
}

export function getBoatingSeason(from: Date = new Date()): BoatingSeason {
  const { month } = chicagoMonthDay(from);
  if (month >= 1 && month <= 4) return "spring";
  if (month >= 5 && month <= 10) return "peak";
  return "winter";
}

/**
 * Late-peak haul-out planning window (America/Chicago Oct 15–31).
 * Does not change the May 1–Oct 31 peak season; used only for a compact
 * homepage link to winterization resources while harbors are still “in season.”
 */
export function isHaulOutPlanningWindow(from: Date = new Date()): boolean {
  const { month, day } = chicagoMonthDay(from);
  return month === 10 && day >= 15;
}

export interface SeasonalHeroCopy {
  season: BoatingSeason;
  /** Supporting sentence under the brand headline — one job. */
  supporting: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
}

export function getSeasonalHeroCopy(from: Date = new Date()): SeasonalHeroCopy {
  const season = getBoatingSeason(from);
  if (season === "spring") {
    return {
      season,
      supporting:
        "Spring commissioning season — use the launch checklist, storage wrap-up pages, and official harbor dates before you trailer out.",
      primaryCta: {
        href: "/spring-boat-launch-checklist-chicago",
        label: "Spring launch checklist →",
      },
      secondaryCta: { href: "/storage", label: "Storage & haul-out" },
    };
  }
  if (season === "winter") {
    return {
      season,
      supporting:
        "Haul-out and winter storage season — confirm yard schedules, shrink wrap, and off-season ownership guides before ice closes the harbors.",
      primaryCta: { href: "/storage", label: "Storage & haul-out →" },
      secondaryCta: {
        href: "/chicago-boat-winterization",
        label: "Winterization hub",
      },
    };
  }
  return {
    season,
    supporting:
      "Live weather and lake conditions, verified marinas and launches, destinations, news, and practical guides — with curated experiences when you are ready to get on the water.",
    primaryCta: { href: "/weather", label: "Check conditions →" },
    secondaryCta: { href: "/marinas", label: "Marinas" },
  };
}
