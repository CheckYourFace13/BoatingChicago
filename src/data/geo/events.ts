import type { EventItem } from "@/types/geo";

const VERIFIED = "2026-08-25";

/**
 * Recurring / seasonal events with official sources only.
 * Dated entries use the verified 2026 schedule where published.
 * Prefer evergreen seasonal framing in summaries; check source URLs each season.
 */
export const events: EventItem[] = [
  {
    slug: "chicago-air-and-water-show-2026",
    title: "Chicago Air and Water Show",
    startDate: "2026-08-15",
    endDate: "2026-08-16",
    location: "Chicago lakefront (North Avenue Beach focal area; Fullerton to Oak Street)",
    summary:
      "The City of Chicago’s free Air and Water Show is the largest free show of its kind in the United States, presented by DCASE. The 2026 show was scheduled Saturday–Sunday, August 15–16, with a Friday rehearsal on August 14, along the lakefront from Fullerton to Oak Street (North Avenue Beach focal point). Boaters should confirm future-year dates on the official city page each summer — schedules and performer lineups change annually.",
    source: {
      name: "City of Chicago — Chicago Air and Water Show",
      url: "https://www.chicago.gov/city/en/depts/dca/supp_info/air_water_show.html",
      lastVerified: VERIFIED,
    },
    isPublished: true,
    category: "air-show",
  },
  {
    slug: "navy-pier-summer-fireworks-2026",
    title: "Navy Pier Summer Fireworks",
    startDate: "2026-05-23",
    endDate: "2026-09-05",
    location: "Navy Pier, Chicago — over Lake Michigan",
    summary:
      "Navy Pier’s free Summer Fireworks series runs on Wednesday and Saturday nights through the summer season. For 2026, Navy Pier published displays from May 23 through September 5, typically 9:00 p.m. on Wednesdays and 10:00 p.m. on Saturdays. Always verify the live schedule on Navy Pier’s event page before planning a fireworks cruise — individual nights can be adjusted.",
    source: {
      name: "Navy Pier — Summer Fireworks",
      url: "https://navypier.org/pier-events/summer-fireworks/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
    category: "fireworks",
  },
  {
    slug: "chicago-harbor-season",
    title: "Chicago Harbors Mooring Season",
    startDate: "2026-05-01",
    endDate: "2026-10-31",
    location: "Chicago Park District harbors, Lake Michigan",
    summary:
      "The Chicago Park District / Chicago Harbors program publishes an annual harbor season for seasonal moorings along the lakefront. Official materials state the harbor season runs May 1 through October 31 each year. Slip applications, rates, and harbor-specific details are on chicagoharbors.info — not reproduced here because they change.",
    source: {
      name: "Chicago Park District — Harbors",
      url: "https://www.chicagoparkdistrict.com/facilities/harbors",
      lastVerified: VERIFIED,
    },
    isPublished: true,
    category: "seasonal",
  },
  {
    slug: "mckinley-marina-boating-season",
    title: "McKinley Marina Official Boating Season",
    startDate: "2026-05-01",
    endDate: "2026-10-31",
    location: "McKinley Marina, Milwaukee, WI",
    summary:
      "Milwaukee County Parks lists McKinley Marina’s official boating season as May 1 – October 31. Slip rentals, launch permits, and storage details are published on the County Parks marina page.",
    source: {
      name: "Milwaukee County Parks — McKinley Marina",
      url: "https://county.milwaukee.gov/EN/Parks/Explore/Lakefront/McKinley-Marina",
      lastVerified: VERIFIED,
    },
    isPublished: true,
    category: "seasonal",
  },
];
