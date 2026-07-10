export type AffiliateOfferCategory =
  | "architecture-cruise"
  | "party-cruise"
  | "fireworks-cruise"
  | "dining-cruise"
  | "jet-ski-rental"
  | "kayak-rental"
  | "sunset-cruise"
  | "river-cruise"
  | "private-yacht-charter"
  | "private-sailing-charter"
  | "sailing"
  | "sailing-event"
  | "chicago-experience";

export type AffiliateProvider = "getyourguide" | "viator";

export type ExperienceType =
  | "ticketed-cruise"
  | "private-charter"
  | "rental"
  | "destination"
  | "event"
  | "attraction";

export interface AffiliateOffer {
  id: string;
  provider: AffiliateProvider;
  title: string;
  shortDescription: string;
  url: string;
  category: AffiliateOfferCategory;
  relatedPageSlugs: string[];
  active: boolean;
  featured: boolean;
  image?: string;
  ctaLabel: string;
  /** Lower number = higher priority in rankings */
  priority?: number;
  experienceType?: ExperienceType;
}

export const affiliateDisclosure =
  "Boating Chicago may earn a commission when you book through links on this page, at no additional cost to you.";

const providerLabel: Record<AffiliateProvider, string> = {
  getyourguide: "GetYourGuide",
  viator: "Viator",
};

export function getProviderLabel(provider: AffiliateProvider): string {
  return providerLabel[provider];
}

export const affiliateOffers: AffiliateOffer[] = [
  // ——— GetYourGuide (preserved) ———
  {
    id: "gyg-architecture-river-tour",
    provider: "getyourguide",
    title: "Chicago Architecture River Tour",
    shortDescription:
      "See Chicago’s iconic skyline from the river with a guided architecture cruise through downtown.",
    url: "https://www.getyourguide.com/chicago-l225/architecture-river-tour-t46389/?partner_id=HISQ5ML&utm_medium=online_publisher&cmp=Boating",
    category: "architecture-cruise",
    relatedPageSlugs: [
      "chicago-architecture-cruises",
      "boat-rentals-chicago",
      "air-and-water-show-boat-rentals",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/band-skyline.jpg",
    ctaLabel: "View Cruise",
    priority: 40,
    experienceType: "ticketed-cruise",
  },
  {
    id: "gyg-architecture-75-min",
    provider: "getyourguide",
    title: "Chicago River 75-Minute Guided Architecture Cruise",
    shortDescription:
      "A 75-minute guided architecture cruise on the Chicago River — skyline stories, bridges, and downtown landmarks.",
    url: "https://www.getyourguide.com/chicago-l225/chicago-river-75-minute-guided-architecture-cruise-t290485/?partner_id=HISQ5ML&utm_medium=online_publisher&cmp=Boating",
    category: "architecture-cruise",
    relatedPageSlugs: [
      "chicago-architecture-cruises",
      "boat-rentals-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/skyline-water.jpg",
    ctaLabel: "Check Availability",
    priority: 42,
    experienceType: "ticketed-cruise",
  },
  {
    id: "gyg-tiki-bar-cruise",
    provider: "getyourguide",
    title: "Chicago Tiki Bar Cruise",
    shortDescription:
      "A tropical-themed tiki bar cruise on the Chicago River or Lake Michigan — drinks, music, and skyline views.",
    url: "https://www.getyourguide.com/chicago-l225/chicago-tiki-bar-cruise-on-chicago-river-or-lake-michigan-t994332/?partner_id=HISQ5ML&utm_medium=online_publisher&cmp=Boating",
    category: "party-cruise",
    relatedPageSlugs: [
      "chicago-tiki-cruises",
      "party-boat-rentals-chicago",
      "bachelorette-boat-rentals-chicago",
      "birthday-boat-rentals-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/party-boat.jpg",
    ctaLabel: "Book This Experience",
    priority: 45,
    experienceType: "ticketed-cruise",
  },
  {
    id: "gyg-3d-fireworks-cruise",
    provider: "getyourguide",
    title: "Chicago 3D Fireworks Cruise",
    shortDescription:
      "Watch Chicago fireworks from the water on a 3D fireworks cruise — lake views without the pier crowds.",
    url: "https://www.getyourguide.com/chicago-l225/chicago-3d-fireworks-cruise-t466163/?partner_id=HISQ5ML&utm_medium=online_publisher&cmp=Boating",
    category: "fireworks-cruise",
    relatedPageSlugs: [
      "chicago-fireworks-cruises",
      "navy-pier-fireworks-boat-rentals",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/fireworks-glow.jpg",
    ctaLabel: "View Cruise",
    priority: 35,
    experienceType: "ticketed-cruise",
  },
  {
    id: "gyg-seadog-fireworks",
    provider: "getyourguide",
    title: "Seadog Speedboat Lake Fireworks Cruise",
    shortDescription:
      "Ride a Seadog speedboat onto Lake Michigan for a high-energy fireworks cruise with skyline views.",
    url: "https://www.getyourguide.com/chicago-l225/city-cruises-chicago-seadog-speedboat-lake-firework-cruise-t24800/?partner_id=HISQ5ML&utm_medium=online_publisher&cmp=Boating",
    category: "fireworks-cruise",
    relatedPageSlugs: [
      "chicago-fireworks-cruises",
      "navy-pier-fireworks-boat-rentals",
      "boat-rentals-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/featured-speedboat.jpg",
    ctaLabel: "Check Availability",
    priority: 36,
    experienceType: "ticketed-cruise",
  },
  {
    id: "gyg-dining-cruise",
    provider: "getyourguide",
    title: "Chicago Brunch, Lunch, or Dinner River Cruise",
    shortDescription:
      "Brunch, lunch, or dinner on a Chicago River cruise — dining with downtown architecture as your backdrop.",
    url: "https://www.getyourguide.com/chicago-l225/city-cruises-chicago-brunch-lunch-or-dinner-river-cruise-t233082/?partner_id=HISQ5ML&utm_medium=online_publisher&cmp=Boating",
    category: "dining-cruise",
    relatedPageSlugs: [
      "chicago-dining-cruises",
      "yacht-rentals-chicago",
      "corporate-yacht-charters-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/featured-yacht.jpg",
    ctaLabel: "Book This Experience",
    priority: 50,
    experienceType: "ticketed-cruise",
  },
  {
    id: "gyg-jet-ski-north-ave",
    provider: "getyourguide",
    title: "North Avenue Beach Jet Ski Rental",
    shortDescription:
      "Rent a jet ski at North Avenue Beach and ride Lake Michigan with Chicago skyline views.",
    url: "https://www.getyourguide.com/chicago-l225/chicago-north-avenue-beach-jet-ski-rental-with-skyline-view-t1336935/?partner_id=HISQ5ML&utm_medium=online_publisher&cmp=Boating",
    category: "jet-ski-rental",
    relatedPageSlugs: [
      "chicago-jet-ski-rentals",
      "boat-rentals-chicago",
      "chicago-playpen-boat-rentals",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/home-boat-rentals.jpg",
    ctaLabel: "Rent a Jet Ski",
    priority: 38,
    experienceType: "rental",
  },
  {
    id: "gyg-kayak-downtown",
    provider: "getyourguide",
    title: "Chicago 2-Hour Downtown Kayak Rental",
    shortDescription:
      "Paddle downtown Chicago for two hours — kayak the river and see the skyline from water level.",
    url: "https://www.getyourguide.com/chicago-l225/chicago-2-hour-downtown-kayak-rental-t994419/?partner_id=HISQ5ML&utm_medium=online_publisher&cmp=Boating",
    category: "kayak-rental",
    relatedPageSlugs: [
      "chicago-kayak-rentals",
      "boat-rentals-chicago",
      "chicago-playpen-boat-rentals",
      "air-and-water-show-boat-rentals",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/sail-lake.jpg",
    ctaLabel: "Rent a Kayak",
    priority: 37,
    experienceType: "rental",
  },

  // ——— Viator ———
  {
    id: "viator-chicago-river-destination",
    provider: "viator",
    title: "Chicago River Cruises and Experiences",
    shortDescription:
      "Browse a wider selection of Chicago River cruises and water experiences. Use this as a “see more” destination — not a single tour.",
    url: "https://www.viator.com/Chicago-attractions/Chicago-River/d673-a1219?pid=P00309183&mcid=42383&medium=link",
    category: "architecture-cruise",
    relatedPageSlugs: ["chicago-architecture-cruises"],
    active: true,
    featured: false,
    image: "/images/chicago/skyline-water.jpg",
    ctaLabel: "Explore Chicago River Cruises",
    priority: 80,
    experienceType: "destination",
  },
  {
    id: "viator-sunset-cruise",
    provider: "viator",
    title: "Chicago Sunset Cruise",
    shortDescription:
      "A Chicago sunset cruise experience — golden-hour views over the water. Ticketed cruise, not a private boat rental.",
    url: "https://www.viator.com/tours/Chicago/Chicago-Sunset-Cruise/d673-76126P8?pid=P00309183&mcid=42383&medium=link",
    category: "sunset-cruise",
    relatedPageSlugs: [
      "chicago-sunset-cruises",
      "chicago-sailing-charters",
      "boat-rentals-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/sunset-glass.jpg",
    ctaLabel: "View Sunset Cruise",
    priority: 28,
    experienceType: "ticketed-cruise",
  },
  {
    id: "viator-speedboat-architecture",
    provider: "viator",
    title: "Lake Michigan and Chicago River Architecture Cruise by Speedboat",
    shortDescription:
      "Architecture sightseeing by speedboat on Lake Michigan and the Chicago River — a faster-paced ticketed cruise.",
    url: "https://www.viator.com/tours/Chicago/Lake-Michigan-and-Chicago-River-Architecture-Cruise-by-Speedboat/d673-5042CHIARC?pid=P00309183&mcid=42383&medium=link",
    category: "architecture-cruise",
    relatedPageSlugs: [
      "chicago-architecture-cruises",
      "boat-rentals-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/featured-speedboat.jpg",
    ctaLabel: "View Speedboat Cruise",
    priority: 32,
    experienceType: "ticketed-cruise",
  },
  {
    id: "viator-chicago-river-cruise",
    provider: "viator",
    title: "Chicago River Cruise",
    shortDescription:
      "A classic Chicago River cruise for skyline and downtown sightseeing. Ticketed public cruise experience.",
    url: "https://www.viator.com/tours/Chicago/Chicago-River-Cruise/d673-70067P1?pid=P00309183&mcid=42383&medium=link",
    category: "river-cruise",
    relatedPageSlugs: [
      "chicago-architecture-cruises",
      "boat-rentals-chicago",
    ],
    active: true,
    featured: false,
    image: "/images/chicago/band-skyline.jpg",
    ctaLabel: "View River Cruise",
    priority: 55,
    experienceType: "ticketed-cruise",
  },
  {
    id: "viator-private-yacht-charter",
    provider: "viator",
    title: "Customize Your Chicago Experience with a Private Yacht Charter",
    shortDescription:
      "An instant-booking private yacht charter option on Viator. For additional private charter matching, use our Find a Boat form.",
    url: "https://www.viator.com/tours/Chicago/Customize-Your-Chicago-Experience-with-a-Private-Yacht-Charter/d673-5599206P2?pid=P00309183&mcid=42383&medium=link",
    category: "private-yacht-charter",
    relatedPageSlugs: [
      "yacht-rentals-chicago",
      "boat-rentals-chicago",
      "corporate-yacht-charters-chicago",
      "chicago-sailing-charters",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/yacht-deck.jpg",
    ctaLabel: "View Private Yacht Charter",
    priority: 1,
    experienceType: "private-charter",
  },
  {
    id: "viator-kayak-ohio-street",
    provider: "viator",
    title: "Lake Michigan Skyline Kayak Rental at Ohio Street Beach",
    shortDescription:
      "Kayak rental at Ohio Street Beach with Lake Michigan skyline views. A different launch location from downtown river kayak rentals.",
    url: "https://www.viator.com/tours/Chicago/Chicagos-Lake-Michigan-Skyline-Kayak-Rental-at-Ohio-Street-Beach/d673-3332P25?pid=P00309183&mcid=42383&medium=link",
    category: "kayak-rental",
    relatedPageSlugs: [
      "chicago-kayak-rentals",
      "boat-rentals-chicago",
      "chicago-playpen-boat-rentals",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/beach-crowd.jpg",
    ctaLabel: "Rent a Kayak",
    priority: 30,
    experienceType: "rental",
  },
  {
    id: "viator-helicopter-skyline",
    provider: "viator",
    title: "Chicago Skyline Helicopter Tour",
    shortDescription:
      "A Chicago skyline helicopter tour — not a boating experience. Listed under more Chicago experiences only.",
    url: "https://www.viator.com/tours/Chicago/Chicago-Skyline-Helicopter-Tour/d673-126471P1?pid=P00309183&mcid=42383&medium=link",
    category: "chicago-experience",
    relatedPageSlugs: ["more-chicago-experiences"],
    active: true,
    featured: false,
    image: "/images/chicago/why-chicago.jpg",
    ctaLabel: "View Skyline Tour",
    priority: 95,
    experienceType: "attraction",
  },
  {
    id: "viator-skyline-sail",
    provider: "viator",
    title: "Chicago Skyline Sail",
    shortDescription:
      "A Chicago skyline sailing experience on Lake Michigan. Shared sailing outing — not a private boat rental.",
    url: "https://www.viator.com/tours/Chicago/Chicago-Skyline-Sail/d673-5560540P2?pid=P00309183&mcid=42383&medium=link",
    category: "sailing",
    relatedPageSlugs: [
      "chicago-sailing-charters",
      "chicago-sunset-cruises",
      "party-boat-rentals-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/sail-lake.jpg",
    ctaLabel: "View Skyline Sail",
    priority: 25,
    experienceType: "ticketed-cruise",
  },
  {
    id: "viator-monday-concert-sail",
    provider: "viator",
    title: "Monday Night Concert Series",
    shortDescription:
      "A special sailing and concert-series experience. Details and schedule are on the booking page.",
    url: "https://www.viator.com/tours/Chicago/Monday-Night-Concert-Series/d673-5560540P6?pid=P00309183&mcid=42383&medium=link",
    category: "sailing-event",
    relatedPageSlugs: [
      "chicago-sailing-charters",
      "party-boat-rentals-chicago",
    ],
    active: true,
    featured: false,
    image: "/images/chicago/hero-party.jpg",
    ctaLabel: "View Concert Sail",
    priority: 70,
    experienceType: "event",
  },
  {
    id: "viator-fireworks-sail",
    provider: "viator",
    title: "Fireworks Sail into the Night",
    shortDescription:
      "A fireworks sailing experience into the night. Ticketed sailing outing — not a private fireworks charter.",
    url: "https://www.viator.com/tours/Chicago/FIREWORKS-Sail-into-the-Night-with-Sparkles-in-the-Sky/d673-5560540P3?pid=P00309183&mcid=42383&medium=link",
    category: "fireworks-cruise",
    relatedPageSlugs: [
      "chicago-fireworks-cruises",
      "navy-pier-fireworks-boat-rentals",
      "chicago-sailing-charters",
      "party-boat-rentals-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/seasonal-fireworks.jpg",
    ctaLabel: "View Fireworks Sail",
    priority: 20,
    experienceType: "ticketed-cruise",
  },
  {
    id: "viator-navy-pier-private-sail",
    provider: "viator",
    title: "Navy Pier Private Sailboat Charter with Captain",
    shortDescription:
      "Private sailboat charter with captain from the Navy Pier area. Instant-booking alternative — use Find a Boat for additional private charter matching.",
    url: "https://www.viator.com/tours/Chicago/Navy-Pier-Chicago-Private-Sailboat-Charter-with-Captain/d673-5647184P1?pid=P00309183&mcid=42383&medium=link",
    category: "private-sailing-charter",
    relatedPageSlugs: [
      "chicago-sailing-charters",
      "yacht-rentals-chicago",
      "boat-rentals-chicago",
      "captains-for-hire-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/hero-boats.jpg",
    ctaLabel: "View Private Sailboat Charter",
    priority: 2,
    experienceType: "private-charter",
  },
  {
    id: "viator-private-lake-sailing",
    provider: "viator",
    title: "Private Lake Michigan Sailing Charter with Skyline Views",
    shortDescription:
      "Private Lake Michigan sailing charter with skyline views. Instant-booking private sailing option alongside our lead form.",
    url: "https://www.viator.com/tours/Chicago/Private-Lake-Michigan-Sailing-Charter-with-Skyline-Views/d673-5662934P1?pid=P00309183&mcid=42383&medium=link",
    category: "private-sailing-charter",
    relatedPageSlugs: [
      "chicago-sailing-charters",
      "yacht-rentals-chicago",
      "boat-rentals-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/lake-cruise.jpg",
    ctaLabel: "View Private Sailing Charter",
    priority: 3,
    experienceType: "private-charter",
  },
  {
    id: "viator-private-day-sailing",
    provider: "viator",
    title: "Private Day Sailing on Lake Michigan",
    shortDescription:
      "Private day sailing on Lake Michigan. Book online for a private sailing outing, or request a custom match through Find a Boat.",
    url: "https://www.viator.com/tours/Chicago/Private-Day-Sailing-on-Lake-Michigan/d673-46250P1?pid=P00309183&mcid=42383&medium=link",
    category: "private-sailing-charter",
    relatedPageSlugs: [
      "chicago-sailing-charters",
      "yacht-rentals-chicago",
      "boat-rentals-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/hero-cruise.jpg",
    ctaLabel: "View Private Day Sailing",
    priority: 5,
    experienceType: "private-charter",
  },
  {
    id: "viator-private-sunset-sailing",
    provider: "viator",
    title: "Private Chicago Sunset Sailing Charter",
    shortDescription:
      "Private sunset sailing charter on Lake Michigan. Instant-booking private charter alternative to a custom lead request.",
    url: "https://www.viator.com/tours/Chicago/Private-Chicago-Sunset-Sailing-Charter-on-Lake-Michigan/d673-5662934P2?pid=P00309183&mcid=42383&medium=link",
    category: "private-sailing-charter",
    relatedPageSlugs: [
      "chicago-sailing-charters",
      "chicago-sunset-cruises",
      "yacht-rentals-chicago",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/hero-sunset.jpg",
    ctaLabel: "View Sunset Sailing Charter",
    priority: 4,
    experienceType: "private-charter",
  },
  {
    id: "viator-navy-pier-fireworks-cruise",
    provider: "viator",
    title: "Navy Pier Fireworks Cruise at Navy Pier Marina",
    shortDescription:
      "Navy Pier fireworks cruise departing from Navy Pier Marina. Ticketed fireworks cruise — not a private charter.",
    url: "https://www.viator.com/tours/Chicago/Navy-Pier-Fireworks-Cruise-at-Navy-Pier-Marina/d673-5647184P2?pid=P00309183&mcid=42383&medium=link",
    category: "fireworks-cruise",
    relatedPageSlugs: [
      "chicago-fireworks-cruises",
      "navy-pier-fireworks-boat-rentals",
    ],
    active: true,
    featured: true,
    image: "/images/chicago/home-fireworks.jpg",
    ctaLabel: "View Navy Pier Fireworks Cruise",
    priority: 22,
    experienceType: "ticketed-cruise",
  },
];

function sortByPriority(a: AffiliateOffer, b: AffiliateOffer): number {
  return (a.priority ?? 50) - (b.priority ?? 50);
}

export function getActiveOffers(): AffiliateOffer[] {
  return affiliateOffers.filter((o) => o.active).sort(sortByPriority);
}

export function getOffersForPage(slug: string): AffiliateOffer[] {
  return getActiveOffers().filter((o) => o.relatedPageSlugs.includes(slug));
}

export function getOffersByCategory(
  category: AffiliateOfferCategory
): AffiliateOffer[] {
  return getActiveOffers().filter((o) => o.category === category);
}

export function getFeaturedOffers(limit = 6): AffiliateOffer[] {
  return getActiveOffers()
    .filter((o) => o.featured)
    .slice(0, limit);
}

/** Balanced homepage mix — max 6, GYG + Viator, no helicopter */
export function getHomepageOffers(limit = 6): AffiliateOffer[] {
  const preferred = [
    "viator-private-yacht-charter",
    "viator-navy-pier-private-sail",
    "viator-skyline-sail",
    "viator-sunset-cruise",
    "viator-fireworks-sail",
    "gyg-kayak-downtown",
  ];
  const byId = new Map(getActiveOffers().map((o) => [o.id, o]));
  const selected = preferred
    .map((id) => byId.get(id))
    .filter((o): o is AffiliateOffer => Boolean(o));

  if (selected.length < limit) {
    for (const offer of getActiveOffers()) {
      if (selected.length >= limit) break;
      if (offer.category === "chicago-experience") continue;
      if (selected.some((s) => s.id === offer.id)) continue;
      selected.push(offer);
    }
  }

  return selected.slice(0, limit);
}
