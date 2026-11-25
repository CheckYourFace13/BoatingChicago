import type { Marina } from "@/types/geo";

const VERIFIED = "2026-11-25";

export const marinasBatch3: Marina[] = [
  {
    slug: "algoma-marina",
    name: "Algoma Marina",
    destinationSlug: "algoma",
    summary:
      "City of Algoma marina at 60 Steele Street — seasonal slips, double launch ramps, fuel, pump-out, showers/restrooms, and Wi‑Fi listed on the city marina page.",
    officialWebsite: "https://www.algomacity.org/residents/marina/index.php",
    amenities: [
      { key: "boat-launch", available: true, note: "Double launch ramps (city)" },
      { key: "seasonal-mooring", available: true },
      { key: "transient-dockage", available: true },
      { key: "fuel", available: true, note: "Gasoline (city marina)" },
      { key: "pump-out", available: true },
      { key: "restrooms", available: true },
      { key: "showers", available: true },
      { key: "wifi", available: true },
      { key: "fish-cleaning", available: true },
    ],
    seasonalAccessNote:
      "City marina page lists season May 1–October 1. Confirm staffed hours before arrival.",
    feesNote:
      "Launch pass and slip schedules are published on the City of Algoma marina page. Confirm current amounts.",
    source: {
      name: "City of Algoma — Marina",
      url: "https://www.algomacity.org/residents/marina/index.php",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "menominee-marina",
    name: "Menominee Marina",
    destinationSlug: "menominee",
    summary:
      "City-associated marina at 1000 First Street with modern docks, launch ramp, and seasonal office hours published by Menominee Marina.",
    officialWebsite: "https://menomineemarina.com/about-us/",
    amenities: [
      { key: "boat-launch", available: true, note: "Designated ramp (marina rules)" },
      { key: "seasonal-mooring", available: true },
      { key: "transient-dockage", available: true },
      { key: "restrooms", available: true },
      { key: "parking", available: true },
    ],
    seasonalAccessNote:
      "Marina materials list May 15–Labor Day and post–Labor Day to October 15 office hours. Confirm before arrival.",
    feesNote:
      "Slip and launch fees are separate per marina rules. Confirm current rates with the marina office.",
    source: {
      name: "Menominee Marina — About",
      url: "https://menomineemarina.com/about-us/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "escanaba-municipal-marina",
    name: "Escanaba Municipal Marina",
    destinationSlug: "escanaba",
    summary:
      "City marina in Ludington Park — seasonal/transient slips, fuel, pump-out, power/water, showers, laundry, and small-boat launch (≤26 ft) listed by the city.",
    officialWebsite: "https://www.escanaba.org/marina",
    amenities: [
      { key: "boat-launch", available: true, note: "Small boat launch ≤26 ft (city)" },
      { key: "seasonal-mooring", available: true },
      { key: "transient-dockage", available: true },
      { key: "fuel", available: true, note: "Gasoline/diesel (city)" },
      { key: "pump-out", available: true },
      { key: "power-and-water", available: true },
      { key: "restrooms", available: true },
      { key: "showers", available: true },
      { key: "laundry", available: true },
      { key: "wifi", available: true },
    ],
    seasonalAccessNote:
      "City marina general-information page lists 2026 season May 11–October 2. Confirm before you cruise.",
    feesNote:
      "Seasonal and transient rate schedules are published as city PDFs. Confirm current amounts on the marina general-information page.",
    source: {
      name: "City of Escanaba — Marina",
      url: "https://www.escanaba.org/marina",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "kewaunee-city-marina",
    name: "Kewaunee City Marina",
    destinationSlug: "kewaunee",
    summary:
      "Municipal marina on the north side of Kewaunee Harbor east of the Highway 42 bridge — seasonal and daily mooring, fuel, showers, fish cleaning, and launch passes listed on the City of Kewaunee marina page.",
    amenities: [
      { key: "transient-dockage", available: true, note: "Daily mooring (city)" },
      { key: "fuel", available: true, note: "Gasoline (city marina page)" },
      { key: "pump-out", available: false, note: "Not listed on city marina page — confirm locally" },
      { key: "power-and-water", available: true, note: "Seasonal/daily mooring (confirm hookups with marina)" },
      { key: "restrooms", available: true },
      { key: "showers", available: true, note: "Private showers (city)" },
      { key: "laundry", available: false, note: "Not listed on city marina page" },
      { key: "wifi", available: false, note: "Not listed on city marina page" },
    ],
    seasonalAccessNote:
      "City marina page lists marina and campground season April 15–October 15. Confirm staffed hours and winter closure before arrival.",
    feesNote:
      "Seasonal and daily mooring rates and launch passes (daily/annual, resident/nonresident) are published on the city marina fee schedule PDF and marina-passes page. Confirm current amounts there — do not rely on third-party copies.",
    source: {
      name: "City of Kewaunee — Marina",
      url: "https://cityofkewauneewi.gov/departments/marina/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
];
