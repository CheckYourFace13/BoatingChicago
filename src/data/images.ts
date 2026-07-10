export interface SiteImage {
  src: string;
  alt: string;
}

/** Chicago / Lake Michigan scenery — local assets in /public/images/chicago */
export const siteImages = {
  heroSunset: {
    src: "/images/chicago/hero-sunset.jpg",
    alt: "Chicago skyline at sunset viewed from a boat on Lake Michigan",
  },
  heroBoats: {
    src: "/images/chicago/hero-boats.jpg",
    alt: "Navy Pier and recreational boats on Lake Michigan in Chicago",
  },
  partyBoat: {
    src: "/images/chicago/party-boat.jpg",
    alt: "Friends celebrating on a party boat with the Chicago skyline behind them",
  },
  yachtDeck: {
    src: "/images/chicago/yacht-deck.jpg",
    alt: "Guests relaxing on a luxury yacht deck at golden hour on Lake Michigan",
  },
  lakeCruise: {
    src: "/images/chicago/lake-cruise.jpg",
    alt: "Motor yacht cruising Lake Michigan toward the Chicago skyline",
  },
  sailLake: {
    src: "/images/chicago/sail-lake.jpg",
    alt: "Sailboat on Lake Michigan with the Chicago skyline on the horizon",
  },
  marinaSlips: {
    src: "/images/chicago/marina-slips.jpg",
    alt: "Boats docked in a Chicago marina harbor on Lake Michigan",
  },
  skylineWater: {
    src: "/images/chicago/skyline-water.jpg",
    alt: "Downtown Chicago skyline viewed from Lake Michigan",
  },
  fireworksGlow: {
    src: "/images/chicago/fireworks-glow.jpg",
    alt: "Fireworks over Lake Michigan with the Chicago skyline and Navy Pier glowing at night",
  },
  fishingMorning: {
    src: "/images/chicago/fishing-morning.jpg",
    alt: "Early morning fishing charter on Lake Michigan near the Chicago skyline",
  },
  beachCrowd: {
    src: "/images/chicago/beach-crowd.jpg",
    alt: "Chicago lakefront beach and Playpen boats anchored on Lake Michigan",
  },
  sunsetGlass: {
    src: "/images/chicago/sunset-glass.jpg",
    alt: "Warm sunset over Lake Michigan with the Chicago skyline in silhouette",
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
  "fishingMorning",
  "lakeCruise",
  "sunsetGlass",
];

export const sceneryBand: SiteImageKey[] = [
  "skylineWater",
  "partyBoat",
  "fishingMorning",
  "yachtDeck",
];
