import type { Destination } from "@/types/geo";

const VERIFIED = "2026-11-25";

/**
 * Batch 3 — WI LM shore (Two Rivers, Algoma), Green Bay north (Menominee,
 * Marinette, Escanaba), and Oshkosh Winnebago hub. Source-backed only.
 */
export const destinationsBatch3: Destination[] = [
  {
    slug: "two-rivers",
    name: "Two Rivers",
    region: "wisconsin",
    state: "WI",
    bodyOfWater: "Lake Michigan / Twin Rivers",
    summary:
      "City of Two Rivers public launches at Veterans Park and Paddlers Park on the Twin Rivers with Lake Michigan access via the harbor mouth.",
    overview: [
      "Two Rivers sits on Lake Michigan between Manitowoc and Kewaunee where the East and West Twin Rivers meet. It is a practical Wisconsin shore trailer stop with municipal parks launches; Kewaunee’s city marina is the next deep-water harbor stop north when you need fuel or overnight dockage.",
      "Planning distances: about 170 driving miles from downtown Chicago (trailer planning only). Water routes from Chicago are multi-day Lake Michigan passages for most recreational boats.",
      "City of Two Rivers Parks & Recreation lists Veterans Park as the major public boat launch and fish-cleaning station on West River Street, and Paddlers Park at the end of 27th Street for kayaks, canoes, and larger pleasure boats into the East Twin River. Launch permits apply — confirm current resident, nonresident, and daily amounts on city parks materials before you tow; we do not invent rates.",
      "Use NWS Green Bay / Manitowoc-area Lake Michigan nearshore products rather than Chicago LOT forecasts for this harbor.",
    ],
    highlights: [
      "Veterans Park public launch and fish cleaning",
      "Paddlers Park East Twin River access",
      "City launch permits required",
      "~170 driving miles from Chicago",
    ],
    officialLinks: [
      {
        name: "City of Two Rivers — Veterans Park & Boat Launch",
        url: "https://www.two-rivers.org/parksrec/page/veterans-park-boat-launch",
        lastVerified: VERIFIED,
      },
      {
        name: "City of Two Rivers — Paddlers Park",
        url: "https://www.two-rivers.org/parksrec/page/paddlers-park",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "manitowoc",
    coordinates: { lat: 44.153, lng: -87.569 },
    distanceFromChicagoMiles: 170,
    isPublished: true,
    nearbyDestinationSlugs: ["manitowoc", "kewaunee", "algoma", "sheboygan"],
  },
  {
    slug: "algoma",
    name: "Algoma",
    region: "wisconsin",
    state: "WI",
    bodyOfWater: "Lake Michigan",
    summary:
      "City of Algoma Marina at 60 Steele Street with seasonal slips, double launch ramps, fuel, and pump-out listed on the city marina page.",
    overview: [
      "Algoma is a Kewaunee County Lake Michigan harbor north of Two Rivers and south of Door County. The city marina is the primary public access and transient stop documented on Algoma’s official marina page.",
      "Planning distances: about 220 driving miles from downtown Chicago.",
      "City of Algoma materials list the marina open May 1–October 1 with seasonal slips, double launch ramps, gasoline, sanitary pump-out, showers/restrooms, fish cleaning, and Wi‑Fi. Launch and slip fee schedules are published on the city marina page — confirm current amounts and seasonal staff hours there before arrival.",
      "Use NWS Green Bay nearshore Lake Michigan zones for this shore rather than Chicago products.",
    ],
    highlights: [
      "City marina — double launch ramps",
      "Fuel and pump-out (city marina page)",
      "Seasonal slips May 1–October 1",
      "~220 driving miles from Chicago",
    ],
    officialLinks: [
      {
        name: "City of Algoma — Marina",
        url: "https://www.algomacity.org/residents/marina/index.php",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "manitowoc",
    coordinates: { lat: 44.608, lng: -87.433 },
    distanceFromChicagoMiles: 220,
    isPublished: true,
    nearbyDestinationSlugs: ["kewaunee", "two-rivers", "sturgeon-bay", "door-county"],
  },
  {
    slug: "menominee",
    name: "Menominee",
    region: "michigan",
    state: "MI",
    bodyOfWater: "Green Bay / Menominee River / Lake Michigan",
    summary:
      "Upper Peninsula harbor city with Menominee Marina and multiple city boat launches that require daily or annual launch permits.",
    overview: [
      "Menominee sits at the mouth of the Menominee River on Green Bay’s west shore, paired with Marinette, Wisconsin across the river. It is a northern Lake Michigan / Green Bay trailer and cruising destination near the edge of the ~400-mile inland planning radius from Chicago.",
      "Planning distances: about 280 driving miles from downtown Chicago.",
      "Menominee Marina (1000 First Street) publishes marina rules, seasonal office hours, and a designated boat launch ramp with fees separate from slip rates. The City Recreation Department lists Mystery Ship, 18th Avenue, and Marina boat launches and explains daily/annual permit purchase. Confirm current permit amounts and display rules on city recreation and marina pages — dollar figures change.",
      "Use NWS Green Bay marine zones for this harbor.",
    ],
    highlights: [
      "Menominee Marina with public launch ramp",
      "Multiple city launches with permit rules",
      "Green Bay / Menominee River access",
      "~280 driving miles from Chicago",
    ],
    officialLinks: [
      {
        name: "Menominee Recreation — Boat Launches",
        url: "https://parksandrec8.wixsite.com/menomineerecreation/boat-launches",
        lastVerified: VERIFIED,
      },
      {
        name: "Menominee Marina — Rules & Launch",
        url: "https://menomineemarina.com/rules-regulations-policies/",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "green-bay",
    coordinates: { lat: 45.108, lng: -87.614 },
    distanceFromChicagoMiles: 280,
    isPublished: true,
    nearbyDestinationSlugs: ["marinette", "green-bay", "escanaba"],
  },
  {
    slug: "marinette",
    name: "Marinette",
    region: "wisconsin",
    state: "WI",
    bodyOfWater: "Green Bay / Menominee River / Lake Michigan",
    summary:
      "City of Marinette public boat launches including Menekaunee Harbor, Stephenson Island, Boom Landing, Sixth Street, and Red Arrow Park with city launch stickers.",
    overview: [
      "Marinette faces Menominee, Michigan across the Menominee River at the head of Green Bay. City launches serve river and bay access for trailered boats.",
      "Planning distances: about 280 driving miles from downtown Chicago.",
      "The City of Marinette Boat Launches page lists Stephenson Island, Boom Landing, Sixth Street, Menekaunee Harbor, and Red Arrow Park, and describes annual stickers and daily permits sold at City Hall and listed vendors. Menekaunee Harbor transient docks are dawn-to-dusk only per city parks ordinance materials — no overnight transient dockage there. Confirm current sticker and daily fees on the city page before you tow.",
      "Pair with Menominee, MI for the opposite shore and use NWS Green Bay marine products.",
    ],
    highlights: [
      "Five city public launches",
      "Menekaunee Harbor dawn–dusk transient docks",
      "Annual sticker / daily permit system",
      "~280 driving miles from Chicago",
    ],
    officialLinks: [
      {
        name: "City of Marinette — Boat Launches",
        url: "https://marinette.wi.us/407/Boat-Launches",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "green-bay",
    coordinates: { lat: 45.1, lng: -87.631 },
    distanceFromChicagoMiles: 280,
    isPublished: true,
    nearbyDestinationSlugs: ["menominee", "green-bay", "escanaba"],
  },
  {
    slug: "escanaba",
    name: "Escanaba",
    region: "michigan",
    state: "MI",
    bodyOfWater: "Little Bay de Noc / Green Bay / Lake Michigan",
    summary:
      "City of Escanaba Municipal Marina in Ludington Park plus Aronson Island and North Shore public launches with published seasonal marina dates.",
    overview: [
      "Escanaba sits on Little Bay de Noc in Michigan’s Upper Peninsula — still Lake Michigan system water via Green Bay. It is a longer trailer tow from Chicago but inside full Lake Michigan shoreline coverage and near the inland 400-mile planning edge.",
      "Planning distances: about 330 driving miles from downtown Chicago.",
      "Escanaba Municipal Marina (city) lists seasonal and transient slips, fuel, pump-out, power/water, showers, laundry, and a small-boat launch limited to vessels up to 26 feet. The city publishes 2026 marina open dates (May 11–October 2, 2026 on the marina general-information page). Aronson Island Boat Launch west of the marina lists barrier-free skid piers, parking, restrooms, and daily/seasonal permits — confirm amounts on the city launch pages.",
      "Use NWS Green Bay / northern Green Bay marine products; do not substitute Chicago forecasts.",
    ],
    highlights: [
      "Municipal marina in Ludington Park",
      "Aronson Island public launch",
      "Published 2026 seasonal marina dates",
      "~330 driving miles from Chicago",
    ],
    officialLinks: [
      {
        name: "City of Escanaba — Marina",
        url: "https://www.escanaba.org/marina",
        lastVerified: VERIFIED,
      },
      {
        name: "City of Escanaba — Aronson Island Boat Launch",
        url: "https://www.escanaba.org/marina/page/aronson-island-boat-launch",
        lastVerified: VERIFIED,
      },
      {
        name: "City of Escanaba — Marina General Information (2026 season)",
        url: "https://www.escanaba.org/marina/page/marina-general-information-slip-rates-and-inquiries",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "green-bay",
    coordinates: { lat: 45.746, lng: -87.065 },
    distanceFromChicagoMiles: 330,
    isPublished: true,
    nearbyDestinationSlugs: ["menominee", "marinette", "green-bay"],
  },
  {
    slug: "oshkosh",
    name: "Oshkosh",
    region: "wisconsin",
    state: "WI",
    bodyOfWater: "Lake Winnebago",
    summary:
      "City of Oshkosh six public Lake Winnebago launches with daily and annual launch permits, plus Miller’s Bay sailboat mooring program.",
    overview: [
      "Oshkosh anchors the west shore of Lake Winnebago and complements Fond du Lac at the south end. This is inland-lake boating — not Lake Michigan coastal waters.",
      "Planning distances: about 175 driving miles from downtown Chicago.",
      "City of Oshkosh Parks lists six launches: Rainbow Park, Menominee Park, William Steiger Park, Mill Street, Fugleberg, and 24th Avenue. Daily and annual/multi-year launch permits are sold at on-site electronic pay stations, online via WebTrac, and at the Parks office (805 Witzel Ave) — confirm current resident and nonresident amounts on the city fee schedule pages. Annual stickers must be redeemed within 14 days per city materials. Miller’s Bay offers sailboat mooring and kayak/canoe storage under separate city program rules (sailboat-focused).",
      "Use inland Fond du Lac / Oshkosh point forecasts and the USGS Lake Winnebago at Oshkosh gage (04082500) for stage context; do not apply Lake Michigan nearshore products to Winnebago.",
    ],
    highlights: [
      "Six city launches named on one official locations page",
      "One published launch URL (Rainbow) — siblings stay on this hub",
      "Pay-station / WebTrac / Parks office permits",
      "USGS Winnebago gage cross-linked on weather & lake pages",
    ],
    officialLinks: [
      {
        name: "City of Oshkosh — Boat Launches & Mooring",
        url: "https://www.oshkoshwi.gov/Parks/BoatLaunchesMooring.aspx",
        lastVerified: VERIFIED,
      },
      {
        name: "City of Oshkosh — Boat Launch Locations",
        url: "https://www.oshkoshwi.gov/Parks/BoatLaunchLocations.aspx",
        lastVerified: VERIFIED,
      },
      {
        name: "City of Oshkosh — Boat Launch Permit Fees",
        url: "https://www.oshkoshwi.gov/Parks/BoatLaunchPermitFees.aspx",
        lastVerified: VERIFIED,
      },
      {
        name: "USGS — Lake Winnebago at Oshkosh (04082500)",
        url: "https://waterdata.usgs.gov/monitoring-location/04082500/",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "fond-du-lac",
    coordinates: { lat: 44.024, lng: -88.543 },
    distanceFromChicagoMiles: 175,
    isPublished: true,
    nearbyDestinationSlugs: ["fond-du-lac", "green-bay", "kewaunee"],
  },
  {
    slug: "kewaunee",
    name: "Kewaunee",
    region: "wisconsin",
    state: "WI",
    bodyOfWater: "Lake Michigan / Kewaunee Harbor",
    summary:
      "City of Kewaunee municipal marina in a breakwater-protected deep-water harbor — seasonal and daily mooring, launch passes, fuel, and fish cleaning listed on the city marina page.",
    overview: [
      "Kewaunee sits on Lake Michigan between Two Rivers and Algoma / Door County approaches. The city marina is east of the State Highway 42 bridge on the north side of Kewaunee Harbor, described by the city as protected by breakwaters and the Hathaway Landing peninsula.",
      "Planning distances: about 175 driving miles from downtown Chicago (trailer planning only).",
      "The City of Kewaunee marina page lists seasonal and daily mooring, gasoline, supplies, private showers and restrooms, a fish cleaning station, and a boat launch that the city marks as open. Launch passes can be purchased as daily or annual (resident and nonresident) through the city’s marina-passes links. The marina and campground season is published as April 15 through October 15 — confirm staffed hours and fee schedules on the official marina and fee-schedule pages before you tow.",
      "Transient and seasonal slip rates are published on the city’s marina fee schedule PDF. BoatingChicago points to that schedule rather than copying dollar amounts that change season to season.",
      "Use NWS Green Bay Lake Michigan nearshore products for this harbor, not Chicago LOT as a substitute for local marine weather.",
    ],
    highlights: [
      "Municipal marina with breakwater-protected harbor access",
      "Seasonal and daily mooring + launch passes (city)",
      "Fuel, showers/restrooms, fish cleaning (city marina page)",
      "Season listed April 15–October 15 (confirm annually)",
    ],
    officialLinks: [
      {
        name: "City of Kewaunee — Marina",
        url: "https://cityofkewauneewi.gov/departments/marina/",
        lastVerified: VERIFIED,
      },
      {
        name: "City of Kewaunee — Marina passes",
        url: "https://cityofkewauneewi.gov/marina-passes/",
        lastVerified: VERIFIED,
      },
      {
        name: "City of Kewaunee — 2026 Marina/Campground fee schedule (PDF)",
        url: "https://cdn.townweb.com/cityofkewauneewi.gov/wp-content/uploads/2026/02/2026_Fee_Schedule-Marina.pdf",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "manitowoc",
    coordinates: { lat: 44.458, lng: -87.503 },
    distanceFromChicagoMiles: 175,
    isPublished: true,
    nearbyDestinationSlugs: ["two-rivers", "algoma", "door-county", "manitowoc"],
  },
];
