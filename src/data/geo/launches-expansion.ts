import type { BoatLaunch } from "@/types/geo";

const VERIFIED = "2026-11-25";

export const launchesExpansion: BoatLaunch[] = [
  {
    slug: "port-washington-municipal-launch",
    name: "Port Washington Municipal Marina Launch",
    destinationSlug: "port-washington",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "Six-lane public launch at the City of Port Washington Municipal Marina — confirm daily and annual launch rates on the city marina rates page.",
    overview: [
      "The city’s marina accommodations page lists a six-lane launch ramp with the downtown harbor at 106 N. Lake Street. Pair launch planning with marine forecasts for the western Lake Michigan shore north of Milwaukee.",
    ],
    amenityNotes: "Six-lane ramp listed by the City of Port Washington.",
    seasonalAccessNote:
      "Marina season is listed April 1–November 1; confirm ramp access outside peak staffing.",
    feesNote:
      "Launch fees are published by the City of Port Washington. Use the marina rates page for current amounts.",
    source: {
      name: "City of Port Washington — Marina Accommodations",
      url: "https://www.portwashingtonwi.gov/departments/marina/accommodations",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "deland-park-boat-launch-sheboygan",
    name: "Deland Park Boat Launch",
    destinationSlug: "sheboygan",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "City of Sheboygan public launch at Deland Park (715 Broughton Drive) — city code requires a municipal launch permit or sticker at designated sites.",
    overview: [
      "Deland Park sits beside Harbor Centre Marina. The city also references an 8th Street launch; annual passes are described as valid at Harbor Centre and 8th Street sites. Confirm permit rules on city pages before you tow.",
    ],
    amenityNotes: "Public boat launch at Deland Park per City of Sheboygan.",
    feesNote:
      "Daily and annual launch permits are city products. Confirm current amounts with the City of Sheboygan.",
    source: {
      name: "City of Sheboygan — Deland Park",
      url: "https://www.sheboyganwi.gov/facilities/facility/details/Deland-Park-8",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "manitowoc-marina-launch-ramp",
    name: "Manitowoc Marina Launch Ramp",
    destinationSlug: "manitowoc",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "Six-lane launch ramp at Manitowoc Marina (425 Maritime Drive) with truck-and-trailer parking included when you purchase a launch pass, per the operator.",
    overview: [
      "The ramp serves Lake Michigan and Manitowoc River access from the small-boat harbor. Buy daily passes at the ramp (cash/check) or inside the ship’s store for other payment methods; seasonal passes are sold in the store.",
    ],
    amenityNotes: "Six-lane ramp; fish cleaning stations listed by Port of Manitowoc / operator.",
    feesNote:
      "Daily and annual launch-ramp fees are published by Manitowoc Marina. Confirm on the launch-ramp page before you tow.",
    source: {
      name: "Manitowoc Marina — Launch Ramp",
      url: "https://www.manitowoc-marina.com/launch-ramp/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "green-bay-metro-boat-launch",
    name: "Green Bay Metro Boat Launch",
    destinationSlug: "green-bay",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "City of Green Bay motorboat launch at 102 Bay Beach Road — ten lanes at the Fox River mouth with VenTek pay station in season.",
    overview: [
      "The city’s facility page publishes daily and annual launch fees, lists when docks are installed or winterized, and notes that annual passes also work at participating Brown County, De Pere, and Wrightstown launches for that calendar year. Confirm dock status the week you travel.",
    ],
    amenityNotes: "Ten launch lanes; trailer parking described in Brown County planning materials.",
    seasonalAccessNote:
      "City posts dock-in and winterization updates on the facility page (including VenTek closure when docks are pulled).",
    feesNote:
      "Daily and annual launch fees are published by the City of Green Bay. Use the Metro Boat Launch facility page for current amounts.",
    source: {
      name: "City of Green Bay — Metro Boat Launch",
      url: "https://www.greenbaywi.gov/Facilities/Facility/Details/Green-Bay-Metro-Boat-Launch-88",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "sawyer-park-boat-launch-sturgeon-bay",
    name: "Sawyer Park Boat Launch",
    destinationSlug: "sturgeon-bay",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "City of Sturgeon Bay six-lane launch at Neenah and East Oak — restrooms with showers, fish cleaning stations, lighted trailer parking, and two-hour transient docking.",
    overview: [
      "Sawyer Park is the city’s primary trailer facility for Sturgeon Bay / Door County canal access. Daily and seasonal launch passes are sold at the kiosk, dockmaster, envelopes, or Park & Recreation Department. Confirm current resident and non-resident seasonal amounts on the city boat-launches page.",
    ],
    amenityNotes:
      "Six-lane ramp; showers; two fish cleaning stations; dockmaster building; ~170 trailer spaces noted on park facilities page.",
    feesNote:
      "Daily and seasonal launch passes are published by the City of Sturgeon Bay. Confirm amounts on the official boat-launches page.",
    source: {
      name: "City of Sturgeon Bay — Boat Launches",
      url: "https://www.sturgeonbaywi.org/departments/parks___recreation/boat_launches.php",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "sunset-park-launch-sturgeon-bay",
    name: "Sunset Park Launching Ramp",
    destinationSlug: "sturgeon-bay",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "City of Sturgeon Bay two-ramp launch at 747 North 3rd Avenue — lighted parking and assist dock; no transient docking.",
    overview: [
      "Sunset Park is the secondary city trailer ramp. Seasonal and daily passes purchased for city launches work here as well — confirm purchase methods on the city boat-launches page.",
    ],
    amenityNotes: "Two launch ramps; lighted parking; small assist dock; no transient docking (city).",
    feesNote:
      "Same city daily/seasonal launch-pass system as Sawyer Park. Confirm amounts on the city page.",
    source: {
      name: "City of Sturgeon Bay — Boat Launches",
      url: "https://www.sturgeonbaywi.org/departments/parks___recreation/boat_launches.php",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "fishermans-landing-muskegon",
    name: "Fisherman’s Landing Launch",
    destinationSlug: "muskegon",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "City of Muskegon Muskegon Lake launch at 501 E. Western Ave. — four ramps plus camping amenities; city pass required; boats up to 30′.",
    overview: [
      "One of four city ramps on Muskegon Lake. City policy limits launches to boats no larger than 30′ overall on single or double-axle trailers. Passes are required year-round.",
    ],
    amenityNotes: "Four ramps; restrooms; showers; fish cleaning; campground (city).",
    feesNote:
      "Daily and annual launch-pass amounts (with residency/senior discounts at in-person locations) are published by the City of Muskegon.",
    source: {
      name: "City of Muskegon — Launch Ramps and Marina",
      url: "https://muskegon-mi.gov/city-services/public-works/launch-ramps-and-marina/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "jaycees-cottage-grove-launch-muskegon",
    name: "Jaycees (Cottage Grove) Launch Ramp",
    destinationSlug: "muskegon",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "City of Muskegon ramp at 2912 Lakeshore Dr. — described as the closest city Muskegon Lake ramp to Lake Michigan; ≤30′ boats; city pass required.",
    overview: [
      "Use this ramp when you want the shortest Muskegon Lake run toward the Lake Michigan channel. Still verify channel and pier-head conditions before leaving protected water.",
    ],
    amenityNotes: "City ramp; picnic context on city page for related sites.",
    feesNote:
      "Same City of Muskegon launch-pass system as other city ramps. Confirm current amounts on the city page.",
    source: {
      name: "City of Muskegon — Launch Ramps and Marina",
      url: "https://muskegon-mi.gov/city-services/public-works/launch-ramps-and-marina/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "loomis-street-boat-ramps-ludington",
    name: "Loomis Street Boat Ramps",
    destinationSlug: "ludington",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "City of Ludington Lake Michigan launch at the west end of Ludington Avenue — eight lanes (four docks), restrooms, fish cleaning, and kiosk payment.",
    overview: [
      "Direct Lake Michigan access between the harbor piers. Daily payment is at the boat-ramps parking kiosk; seasonal resident and non-resident rates are published by the city. A separate Pere Marquette Lake launch off Washington Avenue is also noted on city marina FAQs.",
    ],
    amenityNotes: "Eight launching ramps; restrooms; fish cleaning station; trailer parking (city).",
    feesNote:
      "Daily and seasonal launch rates are published by the City of Ludington. Confirm on the Boat Ramps page.",
    source: {
      name: "City of Ludington — Boat Ramps",
      url: "https://www.ludington.mi.us/396/Boat-Ramps",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "clinch-marina-launch-traverse-city",
    name: "Duncan L. Clinch Marina Launch Ramp",
    destinationSlug: "traverse-city",
    lakeSlug: "lake-michigan-chicago",
    accessMode: "trailered",
    summary:
      "City of Traverse City launch at the east end of Clinch Marina — daily fee via ParkMobile for boats not registered at the marina; trailers must stay attached to a vehicle.",
    overview: [
      "Read the marina Rules & Regulations before arrival: overnight trailer parking in the marina area is prohibited, vehicle-with-trailer spaces are metered, and off-site trailer parking is arranged through the dock house. Seasonal launch permits are sold at Parking Services in the Hardy Parking Garage.",
    ],
    amenityNotes: "Launch at east end of Clinch Marina (city).",
    seasonalAccessNote:
      "Marina season generally May 15–October 20 per city rules.",
    feesNote:
      "Daily, seasonal, commercial, and senior seasonal launch fees are published on the city’s Launch Ramp Fees page.",
    source: {
      name: "Clinch Marina — Launch Ramp Fees",
      url: "https://www.traversecitymi.gov/government/city-departments/duncan-l-clinch-marina/launch-ramp-fees.html",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
];
