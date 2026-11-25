import type { Marina } from "@/types/geo";

const VERIFIED = "2026-11-25";

export const marinasBatch2: Marina[] = [
  {
    slug: "egg-harbor-marina",
    name: "Egg Harbor Marina",
    destinationSlug: "egg-harbor",
    summary:
      "Village marina at 7815 Dock Road with a public launch, slips, fuel, and pump-out listed on Egg Harbor Marina pages.",
    officialWebsite: "https://eggharbormarina.com/",
    amenities: [
      { key: "boat-launch", available: true, note: "Public launch (marina site)" },
      { key: "seasonal-mooring", available: true },
      { key: "transient-dockage", available: true },
      { key: "fuel", available: true },
      { key: "pump-out", available: true },
      { key: "restrooms", available: true },
      { key: "showers", available: true },
      { key: "laundry", available: true },
      { key: "parking", available: true, note: "Trailer parking listed" },
    ],
    feesNote:
      "Launch and slip fees are published on Egg Harbor Marina pages. Confirm current amounts before arrival.",
    source: {
      name: "Egg Harbor Marina",
      url: "https://eggharbormarina.com/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "sister-bay-marina",
    name: "Sister Bay Marina",
    destinationSlug: "sister-bay",
    summary:
      "Village of Sister Bay marina at 10733 N. Bay Shore Drive — four-lane launch, transient slips, power/water, and pump-out on official marina pages.",
    officialWebsite: "https://www.sisterbaymarina.com/marina-information/",
    amenities: [
      { key: "boat-launch", available: true, note: "Four-lane launch (marina)" },
      { key: "transient-dockage", available: true },
      { key: "power-and-water", available: true },
      { key: "pump-out", available: true },
      { key: "wifi", available: true },
    ],
    feesNote:
      "Slip and launch fees are on the Sister Bay Marina fees page. Confirm before you tow.",
    source: {
      name: "Sister Bay Marina — Information",
      url: "https://www.sisterbaymarina.com/marina-information/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "baileys-harbor-town-marina",
    name: "Baileys Harbor Town Marina",
    destinationSlug: "baileys-harbor",
    summary:
      "Town of Baileys Harbor marina at 8132 Hwy 57 — four lighted launch ramps, fuel, slips, and pump-out listed by the town.",
    officialWebsite: "https://baileysharborwi.gov/marina/",
    amenities: [
      { key: "boat-launch", available: true, note: "Four lighted ramps (town)" },
      { key: "fuel", available: true, note: "Gas and diesel (town)" },
      { key: "seasonal-mooring", available: true },
      { key: "pump-out", available: true },
      { key: "restrooms", available: true },
      { key: "showers", available: true },
      { key: "laundry", available: true },
      { key: "fish-cleaning", available: true },
    ],
    feesNote:
      "Fees are published on Town of Baileys Harbor marina-information pages. Confirm current amounts.",
    source: {
      name: "Town of Baileys Harbor — Marina",
      url: "https://baileysharborwi.gov/marina/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "charlevoix-city-marina",
    name: "Charlevoix City Marina",
    destinationSlug: "charlevoix",
    summary:
      "City of Charlevoix marina at 100 E Clinton Street — floating docks with transient reservations through Michigan DNR.",
    officialWebsite: "https://www.charlevoixmi.gov/165/Marina",
    amenities: [
      { key: "transient-dockage", available: true, note: "Via Michigan DNR reservations" },
      { key: "seasonal-mooring", available: true },
      { key: "laundry", available: true },
      { key: "restrooms", available: true },
      { key: "fuel", available: null, note: "City points to adjacent Ward Brothers for fuel/pump-out" },
      { key: "pump-out", available: null },
    ],
    feesNote:
      "Transient rates follow Michigan State Waterways / DNR schedules. Confirm with the marina and reservation system.",
    source: {
      name: "City of Charlevoix — Marina",
      url: "https://www.charlevoixmi.gov/165/Marina",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "petoskey-city-marina",
    name: "Petoskey City Marina",
    destinationSlug: "petoskey",
    summary:
      "City of Petoskey marina at 101 E. Lake Street on Little Traverse Bay — slips, two-lane launch, fuel, and pump-out listed by the city.",
    officialWebsite:
      "https://www.petoskey.us/services/parks___recreation/marina/index.php",
    amenities: [
      { key: "seasonal-mooring", available: true, note: "144 slips (city materials)" },
      { key: "boat-launch", available: true, note: "Two-lane launch (city)" },
      { key: "fuel", available: true },
      { key: "pump-out", available: true },
      { key: "restrooms", available: true },
      { key: "showers", available: true },
      { key: "laundry", available: true },
      { key: "wifi", available: true },
    ],
    feesNote:
      "Launch and slip fees are on City of Petoskey marina rate materials. Confirm before arrival.",
    source: {
      name: "City of Petoskey — Marina",
      url: "https://www.petoskey.us/services/parks___recreation/marina/index.php",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "mackinaw-city-municipal-marina",
    name: "Mackinaw City Municipal Marina",
    destinationSlug: "mackinaw-city",
    summary:
      "Village marina at 107 S Huron Avenue — fuel, pump-out, power/water, and a 24-hour ramp with pass listed by the marina operator.",
    officialWebsite: "https://www.mackinawmarina.com/",
    amenities: [
      { key: "fuel", available: true },
      { key: "pump-out", available: true },
      { key: "power-and-water", available: true },
      { key: "restrooms", available: true },
      { key: "showers", available: true },
      { key: "laundry", available: true },
      { key: "boat-launch", available: true, note: "24-hour ramp with pass (marina)" },
    ],
    feesNote:
      "Confirm slip and ramp-pass fees on the marina and village pages.",
    source: {
      name: "Mackinaw City Municipal Marina",
      url: "https://www.mackinawmarina.com/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "beaver-island-municipal-marina",
    name: "Beaver Island Municipal Marinas",
    destinationSlug: "beaver-island",
    summary:
      "St. James Township municipal marina basins on Main Street — North Marina includes fuel and a boat launch; slips via Michigan DNR reservations.",
    officialWebsite:
      "https://www.stjamestwp.org/beaver_island_municipal_marina/index.php",
    amenities: [
      { key: "seasonal-mooring", available: true },
      { key: "transient-dockage", available: true, note: "Michigan DNR reservations" },
      { key: "fuel", available: true, note: "North Marina (township)" },
      { key: "pump-out", available: true },
      { key: "boat-launch", available: true, note: "North Marina (township)" },
      { key: "power-and-water", available: true },
      { key: "wifi", available: true },
      { key: "showers", available: true },
      { key: "laundry", available: true },
    ],
    feesNote:
      "Slip products use Michigan DNR schedules. Confirm township seasonal notices before crossing.",
    source: {
      name: "St. James Township — Beaver Island Municipal Marina",
      url: "https://www.stjamestwp.org/beaver_island_municipal_marina/index.php",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "fond-du-lac-lakeside-marina",
    name: "Fond du Lac Lakeside Park Marina",
    destinationSlug: "fond-du-lac",
    summary:
      "City of Fond du Lac marina on Lake Winnebago at Lakeside Park — fuel, pump-out, and restrooms listed on the city boating page.",
    officialWebsite: "https://www.fdl.wi.gov/parks/boating/",
    amenities: [
      { key: "seasonal-mooring", available: true },
      { key: "fuel", available: true },
      { key: "pump-out", available: true },
      { key: "restrooms", available: true },
      { key: "boat-launch", available: true, note: "Marina launch lanes (city)" },
    ],
    feesNote:
      "Marina and launch fees are published by the City of Fond du Lac. Confirm on the boating page.",
    source: {
      name: "City of Fond du Lac — Boating",
      url: "https://www.fdl.wi.gov/parks/boating/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
];
