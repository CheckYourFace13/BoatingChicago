import type { SeasonalPromo } from "@/types";

export const seasonalPromos: SeasonalPromo[] = [
  {
    id: "navy-pier-fireworks",
    title: "Navy Pier Fireworks from the Water",
    description:
      "Skip the crowds — watch Navy Pier fireworks from a boat on Lake Michigan. Book early; summer Wednesday & Saturday shows sell out fast.",
    cta: "Find Fireworks Boat Rentals",
    href: "/navy-pier-fireworks-boat-rentals",
    emoji: "🎆",
    activeMonths: [5, 6, 7, 8, 9],
  },
  {
    id: "air-water-show",
    title: "Air & Water Show Boat Views",
    description:
      "The best seats for the Chicago Air & Water Show are on the water. Charter a boat for unobstructed views of the jets over Lake Michigan.",
    cta: "Book Air Show Boats",
    href: "/air-and-water-show-boat-rentals",
    emoji: "✈️",
    activeMonths: [7, 8],
  },
  {
    id: "memorial-day",
    title: "Memorial Day Weekend on the Lake",
    description:
      "Kick off Chicago boating season! Party boats, pontoons, and yacht charters fill up fast for Memorial Day weekend.",
    cta: "Book Memorial Day Boats",
    href: "/party-boat-rentals-chicago",
    emoji: "🇺🇸",
    activeMonths: [4, 5],
  },
  {
    id: "fourth-of-july",
    title: "Fourth of July Lake Michigan Celebrations",
    description:
      "Fireworks, sunshine, and the skyline — July 4th on a boat is peak Chicago summer. Reserve your charter now.",
    cta: "Find July 4th Boats",
    href: "/navy-pier-fireworks-boat-rentals",
    emoji: "🎇",
    activeMonths: [6, 7],
  },
  {
    id: "labor-day",
    title: "Labor Day Weekend Boat Parties",
    description:
      "End summer in style with a Lake Michigan boat party. Last chance for Playpen trips before the season winds down.",
    cta: "Book Labor Day Boats",
    href: "/party-boat-rentals-chicago",
    emoji: "🌊",
    activeMonths: [7, 8, 9],
  },
  {
    id: "bachelorette",
    title: "Bachelorette Boat Parties",
    description:
      "Chicago bachelorette parties belong on the water. Party boats with captains, coolers, and skyline views — book your squad's ride.",
    cta: "Plan a Bachelorette Boat",
    href: "/bachelorette-boat-rentals-chicago",
    emoji: "💃",
    activeMonths: [5, 6, 7, 8, 9],
  },
  {
    id: "corporate",
    title: "Corporate Outings on Lake Michigan",
    description:
      "Impress clients and reward your team with a corporate yacht charter. Custom packages for groups of 10–100+.",
    cta: "Plan a Corporate Charter",
    href: "/corporate-yacht-charters-chicago",
    emoji: "🤝",
    activeMonths: [5, 6, 7, 8, 9, 10],
  },
];

export function getActivePromos(month?: number): SeasonalPromo[] {
  const m = month ?? new Date().getMonth() + 1;
  return seasonalPromos.filter((p) => p.activeMonths.includes(m));
}
