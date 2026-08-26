import type { Marina } from "@/types/geo";

const VERIFIED = "2026-08-25";

/**
 * Published marinas with clear official websites only.
 * Amenities use available: null when not confirmed on the cited source.
 * Do not invent fees, slip counts, or hours here — link to the source.
 */
export const marinas: Marina[] = [
  {
    slug: "belmont-harbor",
    name: "Belmont Harbor",
    destinationSlug: "chicago",
    summary:
      "Chicago Park District harbor in Lincoln Park — one of the larger basins in the Chicago Harbors system, with slips, mooring cans, and star docks described on the official harbors site.",
    officialWebsite: "https://www.chicagoharbors.info/harbors/",
    phone: "(312) 742-7673",
    amenities: [
      { key: "seasonal-mooring", available: true, note: "Seasonal moorings via Chicago Harbors" },
      { key: "fuel", available: null },
      { key: "pump-out", available: null },
      { key: "restrooms", available: null },
    ],
    source: {
      name: "Chicago Harbors — Harbors",
      url: "https://www.chicagoharbors.info/harbors/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "burnham-harbor",
    name: "Burnham Harbor",
    destinationSlug: "chicago",
    summary:
      "Largest harbor in the Chicago Harbors system on Museum Campus. Official harbor page lists fuel dock, complimentary pump-out, laundry, harbor store, transient dockage, and a multi-lane launch ramp.",
    officialWebsite: "https://www.chicagoharbors.info/harbors/burnham/",
    phone: "(312) 747-7009",
    amenities: [
      { key: "seasonal-mooring", available: true },
      { key: "fuel", available: true, note: "Fuel dock with gas and diesel (per harbor page)" },
      { key: "pump-out", available: true, note: "Complimentary pump-out (per harbor page)" },
      { key: "laundry", available: true },
      { key: "harbor-store", available: true },
      { key: "transient-dockage", available: true },
      { key: "boat-launch", available: true, note: "3-lane launch ramp (per harbor page)" },
      { key: "power-and-water", available: true, note: "Slips have power and water (per harbor page)" },
    ],
    source: {
      name: "Chicago Harbors — Burnham",
      url: "https://www.chicagoharbors.info/harbors/burnham/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "monroe-harbor",
    name: "Monroe Harbor",
    destinationSlug: "chicago",
    summary:
      "Iconic downtown Chicago Harbor known for mooring cans and skyline views at the foot of the city, operated within the Chicago Harbors / Park District system.",
    officialWebsite: "https://www.chicagoharbors.info/harbors/",
    phone: "(312) 742-7643",
    amenities: [
      { key: "seasonal-mooring", available: true, note: "Mooring cans featured on harbors overview" },
      { key: "fuel", available: null },
      { key: "pump-out", available: null },
    ],
    source: {
      name: "Chicago Harbors — Harbors",
      url: "https://www.chicagoharbors.info/harbors/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "dusable-harbor",
    name: "DuSable Harbor",
    destinationSlug: "chicago",
    summary:
      "Downtown Chicago harbor at the foot of Randolph Street with slips close to the Loop, part of the Chicago Harbors system.",
    officialWebsite: "https://www.chicagoharbors.info/harbors/",
    phone: "(312) 742-3577",
    amenities: [
      { key: "seasonal-mooring", available: true },
      { key: "fuel", available: null },
      { key: "pump-out", available: null },
    ],
    source: {
      name: "Chicago Harbors — Harbors",
      url: "https://www.chicagoharbors.info/harbors/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "montrose-harbor",
    name: "Montrose Harbor",
    destinationSlug: "chicago",
    summary:
      "North lakefront Chicago Harbor near Montrose Beach in Lincoln Park, with northern skyline views described on the official harbors site.",
    officialWebsite: "https://www.chicagoharbors.info/harbors/",
    phone: "(312) 742-7527",
    amenities: [
      { key: "seasonal-mooring", available: true },
      { key: "fuel", available: null },
      { key: "pump-out", available: null },
      { key: "boat-launch", available: true, note: "Lincoln Boat Launch — Montrose Harbor listed by CPD" },
    ],
    source: {
      name: "Chicago Harbors — Harbors",
      url: "https://www.chicagoharbors.info/harbors/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "31st-street-harbor",
    name: "31st Street Harbor",
    destinationSlug: "chicago",
    summary:
      "Newer Chicago Harbors facility on the south lakefront with slips described on the official harbors site as including metered electric, seasonal water, and internet access.",
    officialWebsite: "https://www.chicagoharbors.info/harbors/",
    phone: "(312) 225-6464",
    amenities: [
      { key: "seasonal-mooring", available: true },
      { key: "power", available: true, note: "Metered electric (per harbors overview)" },
      { key: "water", available: true, note: "Water with seasonal charge (per harbors overview)" },
      { key: "wifi", available: true, note: "Internet access (per harbors overview)" },
      { key: "fuel", available: null },
      { key: "pump-out", available: null },
    ],
    source: {
      name: "Chicago Harbors — Harbors",
      url: "https://www.chicagoharbors.info/harbors/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "waukegan-harbor-marina",
    name: "Waukegan Harbor & Marina",
    destinationSlug: "waukegan",
    summary:
      "Public marina owned by the Waukegan Port District. Official site describes fuel pier, free pump-outs, launch ramps, washrooms/showers, laundry, fish cleaning stations, Wi-Fi, and 24-hour security.",
    officialWebsite: "https://waukeganharbor.com/",
    phone: "(847) 244-3133",
    amenities: [
      { key: "fuel", available: true },
      { key: "pump-out", available: true, note: "Free pump-outs (per marina site)" },
      { key: "boat-launch", available: true },
      { key: "restrooms", available: true },
      { key: "showers", available: true },
      { key: "laundry", available: true },
      { key: "fish-cleaning", available: true },
      { key: "wifi", available: true },
      { key: "security", available: true, note: "24-hour security (per marina site)" },
    ],
    source: {
      name: "Waukegan Harbor & Marina",
      url: "https://waukeganharbor.com/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "north-point-marina",
    name: "North Point Marina",
    destinationSlug: "winthrop-harbor",
    summary:
      "Illinois DNR North Point Marina State Recreation Area in Winthrop Harbor — IDNR describes a protected floating-dock system of 1,500 slips adjacent to Illinois Beach State Park.",
    officialWebsite: "https://dnr.illinois.gov/parks/park.northpointmarina.html",
    phone: "(847) 746-2845",
    amenities: [
      { key: "seasonal-mooring", available: true, note: "1,500 slips, 30–60 ft (per IDNR)" },
      {
        key: "power-and-water",
        available: true,
        note: "Electricity and water included in one-price slip rental (per IDNR about page)",
      },
      { key: "wifi", available: true, note: "Per IDNR about page" },
      { key: "pump-out", available: true, note: "Sanitary pump-outs (per IDNR about page)" },
      { key: "restrooms", available: true },
      { key: "showers", available: true },
      { key: "security", available: true, note: "24-hour security (per IDNR about page)" },
      { key: "parking", available: true, note: "Restricted parking (per IDNR about page)" },
    ],
    source: {
      name: "IDNR — North Point Marina State Recreation Area",
      url: "https://dnr.illinois.gov/parks/park.northpointmarina.html",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "southport-marina",
    name: "Southport Marina",
    destinationSlug: "kenosha",
    summary:
      "Full-service marina in Kenosha’s Harbor Park. Official site lists slip rentals, service, winter storage, and downtown lakefront access.",
    officialWebsite: "https://spmarina.net/",
    phone: "(262) 657-5565",
    amenities: [
      { key: "seasonal-mooring", available: true, note: "Slips for boats from 30' to 80'+ (per marina site)" },
      { key: "service", available: true },
      { key: "winter-storage", available: true },
      { key: "fuel", available: null },
      { key: "pump-out", available: null },
    ],
    source: {
      name: "Southport Marina",
      url: "https://spmarina.net/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "reefpoint-marina",
    name: "Reefpoint Marina",
    destinationSlug: "racine",
    summary:
      "Racine County–owned lakefront marina at Len Ziolkowski Harbor Park, with a dedicated marina website for amenities and slip information.",
    officialWebsite: "https://reefpointmarina.org/",
    phone: "(262) 633-7171",
    amenities: [
      { key: "seasonal-mooring", available: true },
      { key: "pool", available: true, note: "Heated pool (per marina site)" },
      { key: "dog-friendly", available: true, note: "Dog-friendly areas (per marina site)" },
      { key: "fuel", available: null },
      { key: "pump-out", available: null },
    ],
    source: {
      name: "Reefpoint Marina",
      url: "https://reefpointmarina.org/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "mckinley-marina",
    name: "McKinley Marina",
    destinationSlug: "milwaukee",
    summary:
      "Milwaukee County’s public lakefront marina. County Parks pages describe floating docks, fuel docks with pump-out, ships store, restrooms/showers, and launch permits covering multiple county sites.",
    officialWebsite:
      "https://county.milwaukee.gov/EN/Parks/Explore/Lakefront/McKinley-Marina",
    phone: "(414) 273-5224",
    amenities: [
      { key: "seasonal-mooring", available: true, note: "655 slips (per Milwaukee County Parks)" },
      { key: "fuel", available: true },
      { key: "pump-out", available: true },
      { key: "ships-store", available: true },
      { key: "restrooms", available: true },
      { key: "showers", available: true },
      { key: "boat-launch", available: true, note: "Launch permits required (per County Parks)" },
      { key: "power-and-water", available: true },
      { key: "parking", available: true },
      { key: "security", available: true },
    ],
    source: {
      name: "Milwaukee County Parks — McKinley Marina",
      url: "https://county.milwaukee.gov/EN/Parks/Explore/Lakefront/McKinley-Marina",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "washington-park-marina",
    name: "Washington Park Marina",
    destinationSlug: "michigan-city",
    summary:
      "Flagship wet-slip marina of the Michigan City Port Authority. Official services pages list fuel dock, pump-out with fuel purchase, bathhouses, laundry, and fish cleaning facilities.",
    officialWebsite: "https://www.mcmarina.org/",
    phone: "(219) 872-1712",
    amenities: [
      { key: "seasonal-mooring", available: true },
      { key: "transient-dockage", available: true },
      { key: "fuel", available: true, note: "Diesel and alcohol-free gasoline (per MCPA services page)" },
      {
        key: "pump-out",
        available: true,
        note: "Free pump-out with fuel purchase (per MCPA services page)",
      },
      { key: "restrooms", available: true, note: "Air-conditioned bathhouses (per MCPA)" },
      { key: "showers", available: true },
      { key: "laundry", available: true },
      { key: "fish-cleaning", available: true },
      { key: "wifi", available: null },
    ],
    source: {
      name: "Michigan City Port Authority",
      url: "https://www.mcmarina.org/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "new-buffalo-municipal-marina",
    name: "New Buffalo Municipal Marina",
    destinationSlug: "new-buffalo",
    summary:
      "City of New Buffalo transient marina at 100 W. Water Street. Official city page lists guest slips, VHF 9/16 monitoring, shore power, water, and bathrooms with showers.",
    officialWebsite: "https://cityofnewbuffalomi.gov/municipal-marina/",
    phone: "(269) 469-3574",
    amenities: [
      { key: "transient-dockage", available: true, note: "30 guest slips (per city page)" },
      { key: "power", available: true, note: "30 or 50 amp shore power (per city page)" },
      { key: "water", available: true },
      { key: "restrooms", available: true },
      { key: "showers", available: true },
      { key: "fuel", available: null },
      { key: "pump-out", available: null },
    ],
    source: {
      name: "City of New Buffalo — Municipal Marina",
      url: "https://cityofnewbuffalomi.gov/municipal-marina/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
];
