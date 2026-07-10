export type AffiliateOfferCategory =
  | "architecture-cruise"
  | "party-cruise"
  | "fireworks-cruise"
  | "dining-cruise"
  | "jet-ski-rental"
  | "kayak-rental";

export type AffiliateProvider = "getyourguide";

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
}

export const affiliateDisclosure =
  "Boating Chicago may earn a commission when you book through links on this page, at no additional cost to you.";

export const affiliateOffers: AffiliateOffer[] = [
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
  },
];

export function getActiveOffers(): AffiliateOffer[] {
  return affiliateOffers.filter((o) => o.active);
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

export function getHomepageOffers(): AffiliateOffer[] {
  const preferred = [
    "gyg-architecture-river-tour",
    "gyg-3d-fireworks-cruise",
    "gyg-seadog-fireworks",
    "gyg-jet-ski-north-ave",
    "gyg-kayak-downtown",
    "gyg-tiki-bar-cruise",
  ];
  const byId = new Map(getActiveOffers().map((o) => [o.id, o]));
  return preferred
    .map((id) => byId.get(id))
    .filter((o): o is AffiliateOffer => Boolean(o));
}
