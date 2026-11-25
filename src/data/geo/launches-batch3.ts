import type { BoatLaunch } from "@/types/geo";

const VERIFIED = "2026-11-25";

export const launchesBatch3: BoatLaunch[] = [
  {
    slug: "two-rivers-veterans-park-launch",
    name: "Veterans Park Boat Launch (Two Rivers)",
    destinationSlug: "two-rivers",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "City of Two Rivers major public launch and fish-cleaning station on West River Street.",
    amenityNotes: "Fish cleaning station; park amenities listed by city parks page.",
    feesNote:
      "City launch permits apply. Confirm resident, nonresident, and daily amounts on Two Rivers Parks materials before you tow.",
    source: {
      name: "City of Two Rivers — Veterans Park & Boat Launch",
      url: "https://www.two-rivers.org/parksrec/page/veterans-park-boat-launch",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "two-rivers-paddlers-park-launch",
    name: "Paddlers Park Launch (Two Rivers)",
    destinationSlug: "two-rivers",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "City launch at the end of 27th Street into the East Twin River — kayaks, canoes, and larger pleasure boats per city parks page.",
    feesNote:
      "City launch permits apply at Paddlers Park. Confirm current rules on Two Rivers Parks pages.",
    source: {
      name: "City of Two Rivers — Paddlers Park",
      url: "https://www.two-rivers.org/parksrec/page/paddlers-park",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "algoma-marina-launch",
    name: "Algoma Marina Double Launch Ramps",
    destinationSlug: "algoma",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "Double launch ramps at City of Algoma Marina (60 Steele Street) — seasonal marina operations May 1–October 1 per city page.",
    amenityNotes: "Double launch ramps; fish cleaning listed by city marina.",
    seasonalAccessNote:
      "City marina materials list marina season May 1–October 1. Confirm before you tow.",
    feesNote:
      "Daily and seasonal launch pass amounts are on the City of Algoma marina page. Confirm before arrival.",
    source: {
      name: "City of Algoma — Marina",
      url: "https://www.algomacity.org/residents/marina/index.php",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "menominee-marina-launch",
    name: "Menominee Marina Boat Launch",
    destinationSlug: "menominee",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "Designated launch ramp at Menominee Marina on Doyle Drive — city launch permit required; fees are separate from slip rates per marina rules.",
    feesNote:
      "Daily or annual city launch permit required. Confirm amounts on Menominee Recreation boat-launches materials.",
    source: {
      name: "Menominee Recreation — Boat Launches",
      url: "https://parksandrec8.wixsite.com/menomineerecreation/boat-launches",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "marinette-menekaunee-harbor-launch",
    name: "Menekaunee Harbor Park Boat Launch",
    destinationSlug: "marinette",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "City of Marinette Menekaunee Harbor launch at the Menominee River mouth — city launch sticker or daily permit required.",
    amenityNotes:
      "City lists Menekaunee among authorized public ramps; transient docks are dawn-to-dusk only per city ordinance materials.",
    feesNote:
      "Annual stickers and daily permits are described on the City of Marinette boat-launches page. Confirm current amounts.",
    source: {
      name: "City of Marinette — Boat Launches",
      url: "https://marinette.wi.us/407/Boat-Launches",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "escanaba-aronson-island-launch",
    name: "Aronson Island Boat Launch",
    destinationSlug: "escanaba",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "City launch west of Escanaba Municipal Marina — barrier-free skid piers; recommended for boats up to 26 feet per city page.",
    amenityNotes: "Barrier-free skid piers; car/trailer parking; restrooms (city).",
    feesNote:
      "Daily and seasonal launch permits are described on the city Aronson Island page. Confirm amounts before you tow.",
    source: {
      name: "City of Escanaba — Aronson Island Boat Launch",
      url: "https://www.escanaba.org/marina/page/aronson-island-boat-launch",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "oshkosh-rainbow-park-launch",
    name: "Rainbow Park Boat Launch (Oshkosh)",
    destinationSlug: "oshkosh",
    lakeSlug: "lake-winnebago",
    accessMode: "trailered",
    summary:
      "One of six City of Oshkosh public Lake Winnebago launches — electronic pay stations on site; daily or annual launch permit required for trailered motorized craft.",
    feesNote:
      "Daily/annual permits at electronic pay stations, online via City WebTrac, or Parks office (805 Witzel Ave). Confirm current resident/nonresident amounts on the city fee schedule.",
    source: {
      name: "City of Oshkosh — Boat Launch Locations",
      url: "https://www.oshkoshwi.gov/Parks/BoatLaunchLocations.aspx",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "oshkosh-menominee-park-launch",
    name: "Menominee Park Boat Launch (Oshkosh)",
    destinationSlug: "oshkosh",
    lakeSlug: "lake-winnebago",
    accessMode: "trailered",
    summary:
      "City of Oshkosh public Lake Winnebago launch at Menominee Park — listed on the city’s Boat Launch Locations page among the six municipal launches; electronic pay stations on site; permit required for trailered motorized craft.",
    feesNote:
      "Daily/annual permits available at electronic pay stations, online via City WebTrac, or at the Parks office (805 Witzel Ave). Annual sticker must be redeemed within 14 days per city materials — confirm current amounts there.",
    source: {
      name: "City of Oshkosh — Boat Launch Locations",
      url: "https://www.oshkoshwi.gov/Parks/BoatLaunchLocations.aspx",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "oshkosh-william-steiger-park-launch",
    name: "William Steiger Park Boat Launch (Oshkosh)",
    destinationSlug: "oshkosh",
    lakeSlug: "lake-winnebago",
    accessMode: "trailered",
    summary:
      "City of Oshkosh public Lake Winnebago launch at William Steiger Park — named on the city’s Boat Launch Locations page and launch map alt text; permit required for trailered motorized craft.",
    feesNote:
      "Daily/annual permits available at electronic pay stations, online via City WebTrac, or at the Parks office. Confirm current resident/nonresident amounts on city materials.",
    source: {
      name: "City of Oshkosh — Boat Launch Locations",
      url: "https://www.oshkoshwi.gov/Parks/BoatLaunchLocations.aspx",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "oshkosh-mill-street-launch",
    name: "Mill Street Boat Launch (Oshkosh)",
    destinationSlug: "oshkosh",
    lakeSlug: "lake-winnebago",
    accessMode: "trailered",
    summary:
      "City of Oshkosh public Lake Winnebago launch at Mill Street — named on the city’s launch map as one of six municipal sites; permit required for trailered motorized craft.",
    feesNote:
      "Daily/annual permits available at electronic pay stations, online via City WebTrac, or at the Parks office. Confirm current amounts on city materials.",
    source: {
      name: "City of Oshkosh — Boat Launch Locations",
      url: "https://www.oshkoshwi.gov/Parks/BoatLaunchLocations.aspx",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "oshkosh-fugleberg-launch",
    name: "Fugleberg Boat Launch (Oshkosh)",
    destinationSlug: "oshkosh",
    lakeSlug: "lake-winnebago",
    accessMode: "trailered",
    summary:
      "City of Oshkosh public Lake Winnebago launch at Fugleberg — named on the city’s launch map as one of six municipal sites; permit required for trailered motorized craft.",
    feesNote:
      "Daily/annual permits available at electronic pay stations, online via City WebTrac, or at the Parks office. Confirm current amounts on city materials.",
    source: {
      name: "City of Oshkosh — Boat Launch Locations",
      url: "https://www.oshkoshwi.gov/Parks/BoatLaunchLocations.aspx",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "oshkosh-24th-avenue-launch",
    name: "24th Avenue Boat Launch (Oshkosh)",
    destinationSlug: "oshkosh",
    lakeSlug: "lake-winnebago",
    accessMode: "trailered",
    summary:
      "City of Oshkosh public Lake Winnebago launch at 24th Avenue — named on the city’s launch map as one of six municipal sites; permit required for trailered motorized craft.",
    feesNote:
      "Daily/annual permits available at electronic pay stations, online via City WebTrac, or at the Parks office. Confirm current amounts on city materials.",
    source: {
      name: "City of Oshkosh — Boat Launch Locations",
      url: "https://www.oshkoshwi.gov/Parks/BoatLaunchLocations.aspx",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "kewaunee-harbor-launch",
    name: "Kewaunee Harbor Boat Launch",
    destinationSlug: "kewaunee",
    lakeSlug: "lake-michigan",
    accessMode: "trailered",
    summary:
      "City of Kewaunee harbor launch tied to the municipal marina — city materials mark the launch open and sell daily or annual resident/nonresident launch passes.",
    feesNote:
      "Purchase daily or annual launch passes via City of Kewaunee marina-passes links. Confirm current resident and nonresident amounts on the city fee schedule before you tow.",
    source: {
      name: "City of Kewaunee — Marina",
      url: "https://cityofkewauneewi.gov/departments/marina/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
];
