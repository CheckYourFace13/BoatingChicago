import type { BoatLaunch } from "@/types/geo";

const VERIFIED = "2026-11-25";

export const launchesBatch2: BoatLaunch[] = [
  {
    slug: "egg-harbor-public-boat-launch",
    name: "Egg Harbor Public Boat Launch",
    destinationSlug: "egg-harbor",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "Public launch at Egg Harbor Marina (7815 Dock Road) — two-lane access with trailer parking listed on the marina launch page.",
    amenityNotes: "Two-lane public launch; trailer parking listed by marina.",
    feesNote:
      "Launch fees are published on the Egg Harbor Marina public-boat-launch page. Confirm before you tow.",
    source: {
      name: "Egg Harbor Marina — Public Boat Launch",
      url: "https://eggharbormarina.com/public-boat-launch/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "sister-bay-marina-launch",
    name: "Sister Bay Marina Launch",
    destinationSlug: "sister-bay",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "Four-lane launch at Sister Bay Marina — confirm permit/fee rules on the village marina fees page.",
    amenityNotes: "Four-lane launch (Sister Bay Marina).",
    feesNote:
      "Launch and slip fees are on Sister Bay Marina pages. Confirm current amounts.",
    source: {
      name: "Sister Bay Marina — Information",
      url: "https://www.sisterbaymarina.com/marina-information/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "baileys-harbor-town-marina-launch",
    name: "Baileys Harbor Town Marina Launch",
    destinationSlug: "baileys-harbor",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "Four lighted launch ramps at the Town of Baileys Harbor marina on Hwy 57.",
    amenityNotes: "Four lighted ramps; fish cleaning listed by town.",
    feesNote:
      "Confirm launch fees on Town of Baileys Harbor marina-information pages.",
    source: {
      name: "Town of Baileys Harbor — Marina Information",
      url: "https://baileysharborwi.gov/marina-information/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "detroit-harbor-launch-washington-island",
    name: "Detroit Harbor Boat Launch",
    destinationSlug: "washington-island",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "Town of Washington launch in Detroit Harbor — daily or annual launch permit required per town page.",
    feesNote:
      "Daily and annual permit amounts are published by the Town of Washington. Confirm on the Detroit Harbor launch-permit page.",
    source: {
      name: "Town of Washington — Detroit Harbor Launch Permit",
      url: "https://www.washingtonisland-wi.gov/detroit-harbor-launch-permit",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "charlevoix-municipal-launch",
    name: "Charlevoix Municipal Launch",
    destinationSlug: "charlevoix",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "City of Charlevoix launch at the end of Stover Road near Ferry Beach (off M-66) — fish cleaning station; confirm fees on the city page.",
    amenityNotes: "Fish cleaning station; generally 24/7 access per city (attendant varies).",
    feesNote:
      "Launch fees are published by the City of Charlevoix. Confirm on the municipal launch page.",
    source: {
      name: "City of Charlevoix — Municipal Launch",
      url: "https://www.charlevoixmi.gov/534/City-of-Charlevoix-Municipal-Launch",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "petoskey-city-marina-launch",
    name: "Petoskey City Marina Launch",
    destinationSlug: "petoskey",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "Two-lane launch at Petoskey City Marina on Little Traverse Bay — fees on city marina rate materials.",
    amenityNotes: "Two-lane launch at the city marina.",
    feesNote:
      "Confirm launch fees on City of Petoskey marina rate materials.",
    source: {
      name: "City of Petoskey — Marina Amenities",
      url: "https://www.petoskey.us/services/parks___recreation/marina/amenities.php",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "fond-du-lac-lakeside-park-west-launch",
    name: "Lakeside Park West Launch",
    destinationSlug: "fond-du-lac",
    lakeSlug: "lake-winnebago",
    accessMode: "trailered",
    summary:
      "City of Fond du Lac multi-lane Lake Winnebago launch at Lakeside Park West — confirm fees on the city boating page.",
    amenityNotes: "Multi-lane launch listed by City of Fond du Lac Parks.",
    feesNote:
      "Launch fees are published by the City of Fond du Lac. Confirm on the boating page.",
    source: {
      name: "City of Fond du Lac — Boating",
      url: "https://www.fdl.wi.gov/parks/boating/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "shabbona-lake-state-park-launch",
    name: "Shabbona Lake State Recreation Area Launch",
    destinationSlug: "shabbona-lake",
    lakeSlug: "shabbona-lake",
    accessMode: "trailered",
    summary:
      "Illinois DNR launch inside Shabbona Lake State Recreation Area — entire lake is no-wake per IDNR brochure.",
    overview: [
      "Confirm park entry, parking, and launch status on IDNR pages the day you go. No-wake applies lake-wide according to the published brochure.",
    ],
    seasonalAccessNote:
      "State park seasonal schedules and notices are published by IDNR — verify before trailering.",
    feesNote:
      "Park entry and any launch-related fees are IDNR products. Confirm on the Shabbona Lake park page.",
    source: {
      name: "IDNR — Shabbona Lake State Recreation Area",
      url: "https://dnr.illinois.gov/parks/park.shabbonalake.html",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
];
