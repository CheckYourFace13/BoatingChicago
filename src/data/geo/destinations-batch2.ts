import type { Destination } from "@/types/geo";

const VERIFIED = "2026-11-25";

/**
 * Batch 2 — Door County villages, northern Michigan Lake Michigan,
 * and selected inland hubs with verified municipal / DNR sources.
 */
export const destinationsBatch2: Destination[] = [
  {
    slug: "egg-harbor",
    name: "Egg Harbor",
    region: "wisconsin",
    state: "WI",
    bodyOfWater: "Green Bay / Lake Michigan",
    summary:
      "Door County village on Green Bay’s east shore with a village marina and public two-lane launch at 7815 Dock Road.",
    overview: [
      "Egg Harbor sits on the Green Bay side of the Door County peninsula, north of Sturgeon Bay. Compared with the open Lake Michigan shore, the bay side often has less fetch — but local wind and seiche still matter. Use the Sturgeon Bay / Door County weather anchor and NWS Green Bay nearshore products before you clear the harbor.",
      "Planning distances: about 245 driving miles from downtown Chicago (trailer planning only). Water routes from Chicago are multi-day Lake Michigan passages for most recreational boats.",
      "Egg Harbor Marina (village-associated facility at 7815 Dock Road) publishes a public boat launch page and marina services including slips, fuel, and pump-out. Confirm current launch and slip fees, seasonal hours, and transient availability on the official marina pages before you tow — we do not invent rates or open slips.",
      "Pair this village guide with the Door County region hub and Sturgeon Bay city launches when you need canal/bay staging or county park ramps that require Door County permits.",
    ],
    highlights: [
      "Village marina and public launch at Dock Road",
      "Green Bay–side Door County exposure",
      "Fuel and pump-out listed by marina operator pages",
      "~245 driving miles from Chicago",
    ],
    officialLinks: [
      {
        name: "Egg Harbor Marina",
        url: "https://eggharbormarina.com/",
        lastVerified: VERIFIED,
      },
      {
        name: "Egg Harbor Marina — Public Boat Launch",
        url: "https://eggharbormarina.com/public-boat-launch/",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "sturgeon-bay",
    coordinates: { lat: 45.049, lng: -87.297 },
    distanceFromChicagoMiles: 245,
    isPublished: true,
    nearbyDestinationSlugs: ["sturgeon-bay", "door-county", "sister-bay", "baileys-harbor"],
  },
  {
    slug: "sister-bay",
    name: "Sister Bay",
    region: "wisconsin",
    state: "WI",
    bodyOfWater: "Green Bay / Lake Michigan",
    summary:
      "Northern Door County village marina at 10733 N. Bay Shore Drive with a four-lane launch and transient slips managed for the Village of Sister Bay.",
    overview: [
      "Sister Bay is farther up the peninsula on Green Bay’s east shore. It is a common stop for cruisers working Door County and a trailer destination for boaters who want village services without running all the way to Washington Island.",
      "Planning distances: about 260 driving miles from downtown Chicago. Driving miles are not water miles.",
      "Sister Bay Marina’s official site lists marina information, a four-lane launch, transient slips with power and water, and pump-out. Contact marinamanager@sisterbaywi.gov through the marina pages for current operations. Slip and launch fees are published on the marina fees page — confirm amounts there.",
      "Use NWS Green Bay marine zones (Door County / Green Bay) rather than Chicago LOT products for this harbor.",
    ],
    highlights: [
      "Village marina — four-lane launch",
      "Transient slips with power/water (marina site)",
      "Pump-out listed by marina",
      "~260 driving miles from Chicago",
    ],
    officialLinks: [
      {
        name: "Sister Bay Marina — Information",
        url: "https://www.sisterbaymarina.com/marina-information/",
        lastVerified: VERIFIED,
      },
      {
        name: "Sister Bay Marina — Slip Fees",
        url: "https://www.sisterbaymarina.com/marina-information/slip-fees/",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "sturgeon-bay",
    coordinates: { lat: 45.187, lng: -87.122 },
    distanceFromChicagoMiles: 260,
    isPublished: true,
    nearbyDestinationSlugs: ["egg-harbor", "baileys-harbor", "door-county", "washington-island"],
  },
  {
    slug: "baileys-harbor",
    name: "Baileys Harbor",
    region: "wisconsin",
    state: "WI",
    bodyOfWater: "Lake Michigan",
    summary:
      "Town of Baileys Harbor marina on Door County’s Lake Michigan shore — four lighted launch ramps with fuel, slips, and pump-out listed by the town.",
    overview: [
      "Baileys Harbor faces Lake Michigan on the peninsula’s east shore, so exposure differs from Green Bay–side villages. Treat open-lake nearshore zones seriously even on short fishing runs.",
      "Planning distances: about 255 driving miles from downtown Chicago.",
      "The Town of Baileys Harbor marina pages (8132 Hwy 57) describe four lighted launch ramps, gas and diesel, slips, restrooms/showers, laundry, fish cleaning, and pump-out. Confirm seasonal dates and all fees on the town marina-information pages before arrival.",
      "Pair with the Door County hub for county park launches that require separate county permits.",
    ],
    highlights: [
      "Town marina — four lighted launch ramps",
      "Gas/diesel and pump-out listed by town",
      "Lake Michigan–side Door County exposure",
      "~255 driving miles from Chicago",
    ],
    officialLinks: [
      {
        name: "Town of Baileys Harbor — Marina",
        url: "https://baileysharborwi.gov/marina/",
        lastVerified: VERIFIED,
      },
      {
        name: "Town of Baileys Harbor — Marina Information",
        url: "https://baileysharborwi.gov/marina-information/",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "sturgeon-bay",
    coordinates: { lat: 45.065, lng: -87.124 },
    distanceFromChicagoMiles: 255,
    isPublished: true,
    nearbyDestinationSlugs: ["sister-bay", "egg-harbor", "door-county", "sturgeon-bay"],
  },
  {
    slug: "washington-island",
    name: "Washington Island",
    region: "wisconsin",
    state: "WI",
    bodyOfWater: "Green Bay / Lake Michigan",
    summary:
      "Door County island north of the peninsula — Town of Washington Detroit Harbor launch (permit required) plus private marina options; ferry and open-water planning required.",
    overview: [
      "Washington Island sits beyond the tip of Door County and is reached by ferry or open water from the peninsula. It is a full destination, not a casual day add-on from Chicago — driving miles to the Northport ferry exceed 270 from downtown Chicago, and water passages need charts and marine forecasts.",
      "The Town of Washington publishes Detroit Harbor launch-permit information (daily and annual). Confirm current permit amounts and launch rules on the town page. Private facilities such as Shipyard Island Marina are separate operators — verify services on their own sites.",
      "This page stays focused on verified public-access facts. Detailed slip inventories for private marinas are not invented here. Use NWS Green Bay marine zones (including Rock Island Passage–area products) rather than Chicago weather.",
    ],
    highlights: [
      "Town Detroit Harbor launch — permit required",
      "Island destination beyond Door County tip",
      "Ferry and open-water planning required",
      "Use GRB marine zones, not Chicago LOT",
    ],
    officialLinks: [
      {
        name: "Town of Washington — Detroit Harbor Launch Permit",
        url: "https://www.washingtonisland-wi.gov/detroit-harbor-launch-permit",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "washington-island",
    coordinates: { lat: 45.377, lng: -86.892 },
    distanceFromChicagoMiles: 280,
    isPublished: true,
    nearbyDestinationSlugs: ["sister-bay", "door-county", "sturgeon-bay"],
  },
  {
    slug: "charlevoix",
    name: "Charlevoix",
    region: "michigan",
    state: "MI",
    bodyOfWater: "Lake Michigan / Lake Charlevoix",
    summary:
      "Northern Michigan harbor city — City Marina on Round Lake / Pine River with Michigan DNR transient reservations, plus a municipal launch off Stover Road.",
    overview: [
      "Charlevoix connects Lake Michigan to Lake Charlevoix through the Pine River and Round Lake. Visiting boaters often use the City Marina downtown and trailer boaters use the municipal launch near Ferry Beach.",
      "Planning distances: about 340 driving miles from downtown Chicago — still inside the approximate 400-mile inland/trailer planning radius and fully inside Lake Michigan shoreline coverage.",
      "Charlevoix City Marina (100 E Clinton St) lists floating docks and boater amenities; fuel and pump-out are described via adjacent Ward Brothers per city materials. Transient dockage uses the Michigan DNR reservation system. The City of Charlevoix Municipal Launch at the end of Stover Road (near Ferry Beach off M-66) lists a fish cleaning station and generally 24/7 access — confirm fees and attendant hours on the city page.",
      "Use northern Lake Michigan / Little Traverse–area marine products (NWS APX) rather than Chicago forecasts.",
    ],
    highlights: [
      "City Marina — DNR transient reservations",
      "Municipal launch on Stover Road",
      "Lake Michigan ↔ Lake Charlevoix connection",
      "~340 driving miles from Chicago",
    ],
    officialLinks: [
      {
        name: "City of Charlevoix — Marina",
        url: "https://www.charlevoixmi.gov/165/Marina",
        lastVerified: VERIFIED,
      },
      {
        name: "City of Charlevoix — Municipal Launch",
        url: "https://www.charlevoixmi.gov/534/City-of-Charlevoix-Municipal-Launch",
        lastVerified: VERIFIED,
      },
      {
        name: "Michigan DNR — Boating",
        url: "https://www.michigan.gov/dnr/things-to-do/boating",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "charlevoix",
    coordinates: { lat: 45.318, lng: -85.258 },
    distanceFromChicagoMiles: 340,
    isPublished: true,
    nearbyDestinationSlugs: ["traverse-city", "petoskey", "mackinaw-city"],
  },
  {
    slug: "petoskey",
    name: "Petoskey",
    region: "michigan",
    state: "MI",
    bodyOfWater: "Little Traverse Bay / Lake Michigan",
    summary:
      "City of Petoskey marina on Little Traverse Bay — 144 slips, two-lane launch, fuel, pump-out, and Harbor of Refuge services listed by the city.",
    overview: [
      "Petoskey sits on Little Traverse Bay east of Charlevoix. The bay can still build steep seas in strong winds — use NWS Gaylord (APX) marine zones and local observations.",
      "Planning distances: about 350 driving miles from downtown Chicago.",
      "Petoskey City Marina (101 E. Lake St) publishes marina amenities including a two-lane launch, fuel, pump-out, restrooms/showers/laundry, and Wi-Fi. Confirm launch and slip fees on the city’s rate materials before you arrive.",
    ],
    highlights: [
      "City marina — 144 slips (city materials)",
      "Two-lane launch on site",
      "Fuel and pump-out listed by city",
      "~350 driving miles from Chicago",
    ],
    officialLinks: [
      {
        name: "City of Petoskey — Marina",
        url: "https://www.petoskey.us/services/parks___recreation/marina/index.php",
        lastVerified: VERIFIED,
      },
      {
        name: "City of Petoskey — Marina Amenities",
        url: "https://www.petoskey.us/services/parks___recreation/marina/amenities.php",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "petoskey",
    coordinates: { lat: 45.374, lng: -84.955 },
    distanceFromChicagoMiles: 350,
    isPublished: true,
    nearbyDestinationSlugs: ["charlevoix", "mackinaw-city", "traverse-city"],
  },
  {
    slug: "mackinaw-city",
    name: "Mackinaw City",
    region: "michigan",
    state: "MI",
    bodyOfWater: "Straits of Mackinac / Lake Michigan",
    summary:
      "Village marina at the Straits of Mackinac with fuel, pump-out, and a 24-hour ramp pass system listed by the marina operator and village parks information.",
    overview: [
      "Mackinaw City sits at the northern tip of Michigan’s Lower Peninsula where Lake Michigan and Lake Huron meet at the Straits. Currents, ferry traffic, and bridge approaches require careful chart work — this is not a casual Chicago day trip by water.",
      "Planning distances: about 380 driving miles from downtown Chicago (near the edge of the inland 400-mile trailer planning radius; still within full Lake Michigan coverage).",
      "Mackinaw City Municipal Marina materials (107 S Huron Ave) describe fuel, pump-out, power/water, restrooms/showers, laundry, and a boat ramp open 24 hours with a pass. Confirm fees and seasonal staffing on the marina and village parks pages.",
    ],
    highlights: [
      "Municipal marina at the Straits",
      "Fuel and pump-out listed by marina",
      "24-hour ramp with pass (marina materials)",
      "~380 driving miles from Chicago",
    ],
    officialLinks: [
      {
        name: "Mackinaw City Municipal Marina",
        url: "https://www.mackinawmarina.com/",
        lastVerified: VERIFIED,
      },
      {
        name: "Village of Mackinaw City — Parks & Recreation",
        url: "https://www.mackinawcity.org/services/parks-recreation",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "mackinaw-city",
    coordinates: { lat: 45.777, lng: -84.728 },
    distanceFromChicagoMiles: 380,
    isPublished: true,
    nearbyDestinationSlugs: ["petoskey", "charlevoix", "beaver-island"],
  },
  {
    slug: "beaver-island",
    name: "Beaver Island",
    region: "michigan",
    state: "MI",
    bodyOfWater: "Lake Michigan",
    summary:
      "Lake Michigan island municipality — St. James Township municipal marinas on Main Street with fuel, pump-out, launch, and Michigan DNR slip reservations.",
    overview: [
      "Beaver Island is a true Lake Michigan island destination northwest of Charlevoix. Access is by ferry or open water; do not treat driving miles to Charlevoix as an island arrival plan.",
      "St. James Township operates municipal marina basins (South Marina 26184 Main St; North Marina 25860 Main St with fuel and boat launch). Township materials list power, water, gas/diesel, pump-outs, launch, Wi-Fi, and boater amenities. Slips use Michigan DNR reservations. Confirm seasonal operations on township and DNR harbor pages.",
      "Use northern Lake Michigan marine forecasts (APX) and understand that island weather can differ sharply from mainland harbors.",
    ],
    highlights: [
      "Township municipal marinas in St. James",
      "Fuel and launch at North Marina (township)",
      "DNR slip reservations",
      "Island — ferry or open-water access only",
    ],
    officialLinks: [
      {
        name: "St. James Township — Beaver Island Municipal Marina",
        url: "https://www.stjamestwp.org/beaver_island_municipal_marina/index.php",
        lastVerified: VERIFIED,
      },
      {
        name: "Michigan DNR — Beaver Island harbor guide",
        url: "https://www2.dnr.state.mi.us/Publications/pdfs/harbor_guide/beaver_island.htm",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "beaver-island",
    coordinates: { lat: 45.746, lng: -85.508 },
    distanceFromChicagoMiles: 360,
    isPublished: true,
    nearbyDestinationSlugs: ["charlevoix", "mackinaw-city", "petoskey"],
  },
  {
    slug: "fond-du-lac",
    name: "Fond du Lac",
    region: "wisconsin",
    state: "WI",
    bodyOfWater: "Lake Winnebago",
    summary:
      "South end of Lake Winnebago — City of Fond du Lac Lakeside Park marina and multi-lane public launches for Wisconsin’s largest inland lake.",
    overview: [
      "Fond du Lac anchors the south shore of Lake Winnebago, Wisconsin’s largest inland lake. This is inland-lake boating — shallow relative to its size, with local ordinances and heavy summer traffic — not Lake Michigan.",
      "Planning distances: about 175 driving miles from downtown Chicago.",
      "City of Fond du Lac Parks boating pages describe Lakeside Park Marina (fuel, pump-out, restrooms) and launches including the marina ramps, Lakeside Park West (multi-lane), and Harbor View Drive. Confirm launch fees and marina slip rules on the city boating page before you trailer.",
      "Use inland point forecasts for Fond du Lac; do not apply Lake Michigan coastal waters products to Winnebago.",
    ],
    highlights: [
      "Lakeside Park Marina (city)",
      "Multi-lane Lakeside Park West launch",
      "Lake Winnebago south-shore hub",
      "~175 driving miles from Chicago",
    ],
    officialLinks: [
      {
        name: "City of Fond du Lac — Boating",
        url: "https://www.fdl.wi.gov/parks/boating/",
        lastVerified: VERIFIED,
      },
      {
        name: "Wisconsin DNR — Lake Winnebago",
        url: "https://dnr.wisconsin.gov/topic/WildlifeHabitat/Winnebago",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "fond-du-lac",
    coordinates: { lat: 43.777, lng: -88.439 },
    distanceFromChicagoMiles: 175,
    isPublished: true,
    nearbyDestinationSlugs: ["green-bay", "manitowoc", "sheboygan"],
  },
  {
    slug: "shabbona-lake",
    name: "Shabbona Lake",
    region: "illinois",
    state: "IL",
    bodyOfWater: "Shabbona Lake",
    summary:
      "Illinois DNR Shabbona Lake State Recreation Area — inland reservoir with a state-park boat launch and a lake-wide no-wake rule published by IDNR.",
    overview: [
      "Shabbona Lake State Recreation Area in DeKalb County is a popular inland trailer destination west of Chicago. IDNR materials describe park amenities and a boat launch; the park brochure states the entire lake is no-wake.",
      "Planning distances: about 70 driving miles from downtown Chicago.",
      "Confirm park entry, launch rules, camping, and seasonal notices on the IDNR Shabbona Lake pages and site map. Electric and motor rules can change — never assume gasoline motors are unrestricted on a no-wake inland lake without reading the current brochure.",
    ],
    highlights: [
      "IDNR state recreation area",
      "Entire lake no-wake (IDNR brochure)",
      "Boat launch on park map",
      "~70 driving miles from Chicago",
    ],
    officialLinks: [
      {
        name: "IDNR — Shabbona Lake State Recreation Area",
        url: "https://dnr.illinois.gov/parks/park.shabbonalake.html",
        lastVerified: VERIFIED,
      },
      {
        name: "IDNR — Shabbona Lake brochure (PDF)",
        url: "https://dnr.illinois.gov/content/dam/soi/en/web/dnr/parks/documents/shabbona-lake-sp-brochure.pdf",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["chicago-area-inland-paddling-guide"],
    weatherLocationId: "shabbona-lake",
    coordinates: { lat: 41.754, lng: -88.875 },
    distanceFromChicagoMiles: 70,
    isPublished: true,
    nearbyDestinationSlugs: ["chain-o-lakes", "chicago"],
  },
];
