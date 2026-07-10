export interface SiteImage {
  src: string;
  alt: string;
}

/**
 * Chicago / Lake Michigan imagery.
 * Each file path is owned by exactly one placement — never reuse across maps.
 */
export const siteImages = {
  // —— Category landing heroes (15) ——
  boatRentals: {
    src: "/images/chicago/sail-lake.jpg",
    alt: "Sailboat on Lake Michigan with the Chicago skyline on the horizon",
  },
  yachtRentals: {
    src: "/images/chicago/yacht-deck.jpg",
    alt: "Guests relaxing on a luxury yacht deck at golden hour on Lake Michigan",
  },
  partyBoats: {
    src: "/images/chicago/party-boat.jpg",
    alt: "Friends celebrating on a party boat with the Chicago skyline behind them",
  },
  bachelorette: {
    src: "/images/chicago/bachelorette-boat.jpg",
    alt: "Bachelorette party celebrating on a boat with the Chicago skyline behind them",
  },
  birthday: {
    src: "/images/chicago/birthday-boat.jpg",
    alt: "Birthday celebration on a Chicago yacht deck on Lake Michigan",
  },
  corporate: {
    src: "/images/chicago/corporate-yacht.jpg",
    alt: "Corporate group networking on a luxury yacht with the Chicago skyline behind them",
  },
  playpen: {
    src: "/images/chicago/beach-crowd.jpg",
    alt: "Chicago lakefront beach and Playpen boats anchored on Lake Michigan",
  },
  fireworks: {
    src: "/images/chicago/fireworks-glow.jpg",
    alt: "Fireworks over Lake Michigan with the Chicago skyline and Navy Pier glowing at night",
  },
  airWaterShow: {
    src: "/images/chicago/air-water-show.jpg",
    alt: "Jets flying over Lake Michigan during the Chicago Air and Water Show",
  },
  fishing: {
    src: "/images/chicago/fishing-morning.jpg",
    alt: "Early morning fishing charter on Lake Michigan near the Chicago skyline",
  },
  captains: {
    src: "/images/chicago/captain-helm.jpg",
    alt: "Licensed captain at the helm of a yacht on Lake Michigan near Chicago",
  },
  marinas: {
    src: "/images/chicago/marina-slips.jpg",
    alt: "Boats docked in a Chicago marina harbor on Lake Michigan",
  },
  boatStorage: {
    src: "/images/chicago/boat-storage.jpg",
    alt: "Boats in indoor winter storage racks at a Chicago marine facility",
  },
  boatDetailing: {
    src: "/images/chicago/boat-detailing.jpg",
    alt: "Boat detailing and wash service at a Chicago marina slip",
  },
  boatRepair: {
    src: "/images/chicago/boat-repair.jpg",
    alt: "Marine mechanic repairing an outboard engine at a Chicago boat yard",
  },

  // —— Homepage hero slideshow (6) ——
  heroSunset: {
    src: "/images/chicago/hero-sunset.jpg",
    alt: "Chicago skyline at sunset viewed from a boat on Lake Michigan",
  },
  heroParty: {
    src: "/images/chicago/hero-party.jpg",
    alt: "Crowded summer party boat on Lake Michigan with Chicago skyline in the distance",
  },
  heroBoats: {
    src: "/images/chicago/hero-boats.jpg",
    alt: "Navy Pier and recreational boats on Lake Michigan in Chicago",
  },
  heroFishing: {
    src: "/images/chicago/hero-fishing.jpg",
    alt: "Dawn fishing charter on Lake Michigan with soft sunrise light",
  },
  heroCruise: {
    src: "/images/chicago/hero-cruise.jpg",
    alt: "Motor yacht leaving a Chicago harbor at blue-hour dusk",
  },
  heroTwilight: {
    src: "/images/chicago/hero-twilight.jpg",
    alt: "Navy Pier Ferris wheel glowing at twilight over Lake Michigan",
  },

  // —— Scenery band (4) ——
  bandSkyline: {
    src: "/images/chicago/band-skyline.jpg",
    alt: "Chicago skyline from a boat deck railing on Lake Michigan",
  },
  bandParty: {
    src: "/images/chicago/band-party.jpg",
    alt: "Friends toasting on a boat bow with Chicago high-rises behind them",
  },
  bandFishing: {
    src: "/images/chicago/band-fishing.jpg",
    alt: "Angler reeling in a catch on a Lake Michigan fishing charter",
  },
  bandYacht: {
    src: "/images/chicago/band-yacht.jpg",
    alt: "Luxury yacht lounge seating facing Lake Michigan at sunset",
  },

  // —— Homepage popular category cards (8) ——
  homeBoatRentals: {
    src: "/images/chicago/home-boat-rentals.jpg",
    alt: "Pontoon boat rental on Lake Michigan near the Chicago skyline",
  },
  homeYacht: {
    src: "/images/chicago/home-yacht.jpg",
    alt: "Luxury yacht charter docking at a Chicago harbor",
  },
  homeParty: {
    src: "/images/chicago/home-party.jpg",
    alt: "Large party boat packed with dancers on Lake Michigan",
  },
  homeBachelorette: {
    src: "/images/chicago/home-bachelorette.jpg",
    alt: "Bachelorette squad celebrating on a Chicago boat",
  },
  homeFishing: {
    src: "/images/chicago/home-fishing.jpg",
    alt: "Fishing rods lined on a Lake Michigan charter boat",
  },
  homeFireworks: {
    src: "/images/chicago/home-fireworks.jpg",
    alt: "Passengers watching fireworks over Chicago from a boat",
  },
  homeCorporate: {
    src: "/images/chicago/home-corporate.jpg",
    alt: "Business meeting on a Chicago yacht deck with skyline views",
  },
  homeCaptains: {
    src: "/images/chicago/home-captains.jpg",
    alt: "Boat captain meeting clients on a Chicago marina dock",
  },

  // —— Homepage featured experiences (4) ——
  featuredBoat: {
    src: "/images/chicago/featured-speedboat.jpg",
    alt: "Speedboat racing across Lake Michigan with the Chicago skyline",
  },
  featuredYacht: {
    src: "/images/chicago/featured-yacht.jpg",
    alt: "Luxury yacht on Lake Michigan at sunset with the Chicago skyline",
  },
  featuredParty: {
    src: "/images/chicago/featured-party.jpg",
    alt: "Party boat celebration on Lake Michigan at golden hour",
  },
  featuredBachelorette: {
    src: "/images/chicago/featured-bachelorette.jpg",
    alt: "Bachelorette celebration on a Chicago boat at sunset",
  },

  // —— Seasonal promo cards ——
  seasonalFireworks: {
    src: "/images/chicago/seasonal-fireworks.jpg",
    alt: "Boats watching Navy Pier fireworks from Lake Michigan",
  },
  seasonalAirshow: {
    src: "/images/chicago/seasonal-airshow.jpg",
    alt: "Air and Water Show jets over Lake Michigan with spectator boats",
  },
  seasonalMemorial: {
    src: "/images/chicago/seasonal-memorial.jpg",
    alt: "Memorial Day weekend boat party on Lake Michigan",
  },
  seasonalJuly4: {
    src: "/images/chicago/seasonal-july4.jpg",
    alt: "Fourth of July boat celebration on Lake Michigan at dusk",
  },
  seasonalLabor: {
    src: "/images/chicago/seasonal-labor.jpg",
    alt: "Labor Day weekend boats rafted together on Lake Michigan",
  },
  seasonalBachelorette: {
    src: "/images/chicago/seasonal-bachelorette.jpg",
    alt: "Bachelorette group boarding a Chicago charter boat",
  },
  seasonalCorporate: {
    src: "/images/chicago/seasonal-corporate.jpg",
    alt: "Corporate team outing on a Chicago yacht",
  },

  // —— Section backgrounds ——
  whyChicago: {
    src: "/images/chicago/why-chicago.jpg",
    alt: "Chicago downtown towers reflected in Lake Michigan at soft morning light",
  },
  newsletterSunset: {
    src: "/images/chicago/newsletter-sunset.jpg",
    alt: "Golden hour light over Lake Michigan with a distant Chicago shoreline",
  },
  vendorsHero: {
    src: "/images/chicago/vendors-hero.jpg",
    alt: "Busy Chicago marina boardwalk with docked boats",
  },
  vendorsCta: {
    src: "/images/chicago/vendors-cta.jpg",
    alt: "Chicago marina office and docked boats for boating business partners",
  },

  // —— Experience page heroes ——
  skylineWater: {
    src: "/images/chicago/skyline-water.jpg",
    alt: "Downtown Chicago skyline viewed from Lake Michigan",
  },
  sunsetGlass: {
    src: "/images/chicago/sunset-glass.jpg",
    alt: "Warm sunset over Lake Michigan with the Chicago skyline in silhouette",
  },
  lakeCruise: {
    src: "/images/chicago/lake-cruise.jpg",
    alt: "Motor yacht cruising Lake Michigan toward the Chicago skyline",
  },
} as const satisfies Record<string, SiteImage>;

export type SiteImageKey = keyof typeof siteImages;

/** Category landing page heroes — one unique image per slug */
export const categoryImageMap: Record<string, SiteImageKey> = {
  "boat-rentals-chicago": "boatRentals",
  "yacht-rentals-chicago": "yachtRentals",
  "party-boat-rentals-chicago": "partyBoats",
  "bachelorette-boat-rentals-chicago": "bachelorette",
  "birthday-boat-rentals-chicago": "birthday",
  "corporate-yacht-charters-chicago": "corporate",
  "chicago-playpen-boat-rentals": "playpen",
  "navy-pier-fireworks-boat-rentals": "fireworks",
  "air-and-water-show-boat-rentals": "airWaterShow",
  "fishing-charters-chicago": "fishing",
  "captains-for-hire-chicago": "captains",
  "chicago-marinas": "marinas",
  "boat-storage-chicago": "boatStorage",
  "boat-detailing-chicago": "boatDetailing",
  "boat-repair-chicago": "boatRepair",
  "chicago-architecture-cruises": "skylineWater",
  "chicago-fireworks-cruises": "sunsetGlass",
  "chicago-jet-ski-rentals": "lakeCruise",
  "chicago-kayak-rentals": "heroTwilight",
  "chicago-dining-cruises": "bandYacht",
  "chicago-tiki-cruises": "heroParty",
  "chicago-sailing-charters": "boatRentals",
  "chicago-sunset-cruises": "heroSunset",
};

/** Homepage popular category grid */
export const homeCategoryImageMap: Record<string, SiteImageKey> = {
  "boat-rentals-chicago": "homeBoatRentals",
  "yacht-rentals-chicago": "homeYacht",
  "party-boat-rentals-chicago": "homeParty",
  "bachelorette-boat-rentals-chicago": "homeBachelorette",
  "fishing-charters-chicago": "homeFishing",
  "navy-pier-fireworks-boat-rentals": "homeFireworks",
  "corporate-yacht-charters-chicago": "homeCorporate",
  "captains-for-hire-chicago": "homeCaptains",
};

/** Homepage featured experience tiles (first 4 homepage categories) */
export const featuredImageMap: Record<string, SiteImageKey> = {
  "boat-rentals-chicago": "featuredBoat",
  "yacht-rentals-chicago": "featuredYacht",
  "party-boat-rentals-chicago": "featuredParty",
  "bachelorette-boat-rentals-chicago": "featuredBachelorette",
};

/** Seasonal promo cards by promo id */
export const seasonalImageMap: Record<string, SiteImageKey> = {
  "navy-pier-fireworks": "seasonalFireworks",
  "air-water-show": "seasonalAirshow",
  "memorial-day": "seasonalMemorial",
  "fourth-of-july": "seasonalJuly4",
  "labor-day": "seasonalLabor",
  bachelorette: "seasonalBachelorette",
  corporate: "seasonalCorporate",
};

export function getCategoryImage(slug: string): SiteImage {
  const key = categoryImageMap[slug] ?? "boatRentals";
  return siteImages[key];
}

export function getHomeCategoryImage(slug: string): SiteImage {
  const key = homeCategoryImageMap[slug] ?? "homeBoatRentals";
  return siteImages[key];
}

export function getFeaturedImage(slug: string): SiteImage {
  const key = featuredImageMap[slug] ?? "featuredBoat";
  return siteImages[key];
}

export function getSeasonalImage(promoId: string): SiteImage {
  const key = seasonalImageMap[promoId] ?? "seasonalFireworks";
  return siteImages[key];
}

export const heroSlideshow: SiteImageKey[] = [
  "heroSunset",
  "heroParty",
  "heroBoats",
  "heroFishing",
  "heroCruise",
  "heroTwilight",
];

export const sceneryBand: SiteImageKey[] = [
  "bandSkyline",
  "bandParty",
  "bandFishing",
  "bandYacht",
];

/** Dev helper — throws if any primary placement reuses a file path */
export function assertUniqueImagePlacements(): void {
  const used = new Map<string, string>();
  const claim = (owner: string, key: SiteImageKey) => {
    const src = siteImages[key].src;
    const prev = used.get(src);
    if (prev) {
      throw new Error(`Duplicate image ${src} used by ${prev} and ${owner}`);
    }
    used.set(src, owner);
  };

  for (const [slug, key] of Object.entries(categoryImageMap)) {
    claim(`category:${slug}`, key);
  }
  for (const [slug, key] of Object.entries(homeCategoryImageMap)) {
    claim(`homeCat:${slug}`, key);
  }
  for (const [slug, key] of Object.entries(featuredImageMap)) {
    claim(`featured:${slug}`, key);
  }
  for (const [id, key] of Object.entries(seasonalImageMap)) {
    claim(`seasonal:${id}`, key);
  }
  heroSlideshow.forEach((key, i) => claim(`hero[${i}]`, key));
  sceneryBand.forEach((key, i) => claim(`band[${i}]`, key));
  claim("why", "whyChicago");
  claim("newsletter", "newsletterSunset");
  claim("vendorsHero", "vendorsHero");
  claim("vendorsCta", "vendorsCta");
}
