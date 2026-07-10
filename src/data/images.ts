export interface SiteImage {
  src: string;
  alt: string;
}

/** High-resolution Unsplash photography for Lake Michigan / Chicago boating atmosphere */
export const siteImages = {
  heroSunset: {
    src: "https://images.unsplash.com/photo-1477414348463-c04d34ae63bf?auto=format&fit=crop&w=2400&q=80",
    alt: "Chicago skyline at dusk reflecting over the water",
  },
  heroBoats: {
    src: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?auto=format&fit=crop&w=2400&q=80",
    alt: "Navy Pier and boats along the Chicago lakefront",
  },
  partyBoat: {
    src: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1600&q=80",
    alt: "Friends celebrating on a yacht with city views behind them",
  },
  yachtDeck: {
    src: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1600&q=80",
    alt: "Guests on a luxury yacht deck at golden hour",
  },
  lakeCruise: {
    src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80",
    alt: "Motor yacht cruising open water toward an evening sky",
  },
  sailLake: {
    src: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1600&q=80",
    alt: "Sailboat cutting across bright summer water",
  },
  marinaSlips: {
    src: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1600&q=80",
    alt: "Boats lined up in marina slips on a clear day",
  },
  skylineWater: {
    src: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=1600&q=80",
    alt: "Downtown Chicago towers under a summer sky",
  },
  fireworksGlow: {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80",
    alt: "Fireworks bursting over dark water at night",
  },
  fishingMorning: {
    src: "https://images.unsplash.com/photo-1519709525797-0e4d9df83bbb?auto=format&fit=crop&w=1600&q=80",
    alt: "Early morning fishing on calm lake water",
  },
  beachCrowd: {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    alt: "Sunny shoreline stretch of sand and open water",
  },
  sunsetGlass: {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
    alt: "Warm sunset light over open water",
  },
} as const satisfies Record<string, SiteImage>;

export type SiteImageKey = keyof typeof siteImages;

export const categoryImageMap: Record<string, SiteImageKey> = {
  "boat-rentals-chicago": "sailLake",
  "yacht-rentals-chicago": "yachtDeck",
  "party-boat-rentals-chicago": "partyBoat",
  "bachelorette-boat-rentals-chicago": "partyBoat",
  "birthday-boat-rentals-chicago": "yachtDeck",
  "corporate-yacht-charters-chicago": "lakeCruise",
  "chicago-playpen-boat-rentals": "beachCrowd",
  "navy-pier-fireworks-boat-rentals": "fireworksGlow",
  "air-and-water-show-boat-rentals": "skylineWater",
  "fishing-charters-chicago": "fishingMorning",
  "captains-for-hire-chicago": "lakeCruise",
  "chicago-marinas": "marinaSlips",
  "boat-storage-chicago": "marinaSlips",
  "boat-detailing-chicago": "marinaSlips",
  "boat-repair-chicago": "marinaSlips",
};

export function getCategoryImage(slug: string): SiteImage {
  const key = categoryImageMap[slug] ?? "skylineWater";
  return siteImages[key];
}

export const heroSlideshow: SiteImageKey[] = [
  "heroSunset",
  "partyBoat",
  "heroBoats",
  "lakeCruise",
  "sunsetGlass",
];

export const sceneryBand: SiteImageKey[] = [
  "skylineWater",
  "partyBoat",
  "lakeCruise",
  "yachtDeck",
];
