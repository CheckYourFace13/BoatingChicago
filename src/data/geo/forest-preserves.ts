import type { PreserveWaterAccess } from "@/types/geo";

/** Checked against Forest Preserves of Cook County boating page. */
const VERIFIED = "2026-11-14";

const FPDCC_BOATING =
  "https://fpdcc.com/things-to-do/boating-canoeing-kayaking/";

/**
 * Cook County forest-preserve waters first — facts only from FPDCC.
 * Gasoline motors are prohibited on all FPDCC lakes; stand-up paddleboards
 * are listed as prohibited on all FPDCC waterbodies. Confirm on the source.
 */
export const forestPreserveAccess: PreserveWaterAccess[] = [
  {
    slug: "busse-lake-boating-center",
    name: "Busse Lake Boating Center",
    county: "Cook",
    agency: "cook-fpdcc",
    locationLabel: "Ned Brown Preserve (Busse Woods), near Elk Grove Village",
    summary:
      "Cook County Forest Preserves boating center with trailered launches, an accessible canoe landing, and seasonal rentals on Busse Lake — electric motors only; gasoline motors are prohibited on all FPDCC lakes.",
    overview: [
      "Busse Lake Boating Center sits in the Ned Brown Preserve (Busse Woods) off E. Higgins Road / Route 72 east of I-290. The Forest Preserves of Cook County lists two trailered launches for canoes, kayaks, rowboats, sailboats, and boats with electric trolling motors, plus an accessible canoe landing.",
      "Seasonal boat rentals are offered April–October, weather permitting, with schedules that start Fridays–Mondays in mid-April, expand daily in May, and return to Fridays–Sundays after Labor Day. Call the boating center before you go — FPDCC asks visitors to confirm availability.",
      "District-wide rules matter as much as the ramp: gasoline-powered boats are prohibited on all FPDCC lakes, and stand-up paddleboards are listed among prohibited flotation devices on all FPDCC waterbodies. Treat the official boating page as the source of truth before you trailer in.",
    ],
    accessKinds: ["trailered-launch", "accessible-landing"],
    allowedCraft: [
      "canoe",
      "kayak",
      "rowboat",
      "sailboat",
      "electric-trolling",
      "paddle-boat",
      "fishing-boat-electric",
    ],
    restrictions: [
      "Gasoline-powered boats prohibited on all Forest Preserves of Cook County lakes",
      "Stand-up paddleboards listed as prohibited on all FPDCC waterbodies",
    ],
    hasRentals: true,
    rentalNotes:
      "FPDCC lists row boats, single and tandem kayaks, canoes, paddle boats, and fishing boats with battery and trolling motor (2-hour minimum). Hours and rates are published on the official boating page — confirm by phone before visiting.",
    seasonalAccessNote:
      "Rentals: April–October, weather permitting, with mid-April / post–Labor Day schedule changes. Confirm current hours on the FPDCC boating page or by calling the center.",
    phone: "224-415-6554",
    addressHint: "E Higgins Rd / Rte 72, east of I-290 / Hwy 53, Cook County, IL 60007",
    source: {
      name: "Forest Preserves of Cook County — Boating, Canoeing & Kayaking",
      url: FPDCC_BOATING,
      lastVerified: VERIFIED,
    },
    relatedSources: [
      {
        name: "Forest Preserves of Cook County — Busse Woods",
        url: "https://fpdcc.com/places/locations/busse-woods/",
        lastVerified: VERIFIED,
      },
    ],
    isPublished: true,
  },
  {
    slug: "skokie-lagoons-tower-road",
    name: "Tower Road Boat Launch — Skokie Lagoons",
    county: "Cook",
    agency: "cook-fpdcc",
    locationLabel: "Skokie Lagoons, near Northfield / Glencoe corridor",
    summary:
      "Accessible trailered launch into Skokie Lagoons with seasonal canoe and kayak rentals at Tower Road — electric motors allowed; gasoline motors and SUPs are prohibited under district rules.",
    overview: [
      "The Forest Preserves of Cook County lists the Tower Road Boat Launch as an accessible trailered launch into Skokie Lagoons for canoes, kayaks, rowboats, sailboats, and boats with electric trolling motors.",
      "Seasonal rentals at Tower Road cover single kayaks, tandem kayaks, and canoes (April–October, weather permitting). FPDCC publishes the same mid-April / daily-May / post–Labor Day weekend pattern used at other rental centers — call ahead.",
      "Skokie Lagoons is a paddling-focused system inside the Cook County preserves, not a Lake Michigan harbor. District gasoline-motor and SUP prohibitions still apply; confirm current access on the official boating page.",
    ],
    accessKinds: ["trailered-launch", "accessible-landing"],
    allowedCraft: [
      "canoe",
      "kayak",
      "rowboat",
      "sailboat",
      "electric-trolling",
    ],
    restrictions: [
      "Gasoline-powered boats prohibited on all FPDCC lakes",
      "Stand-up paddleboards listed as prohibited on all FPDCC waterbodies",
    ],
    hasRentals: true,
    rentalNotes:
      "FPDCC lists single kayak, tandem kayak, and canoe rentals at Tower Road. Confirm rates and hours on the official page or by calling 847-414-5883.",
    seasonalAccessNote:
      "Rentals April–October, weather permitting. Confirm the current Friday–Monday / daily / weekend schedule before you go.",
    phone: "847-414-5883",
    addressHint: "Tower Rd, west of Forestway Dr, Cook County, IL 60093",
    source: {
      name: "Forest Preserves of Cook County — Boating, Canoeing & Kayaking",
      url: FPDCC_BOATING,
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "tampier-lake-boating-center",
    name: "Tampier Lake Boating Center",
    county: "Cook",
    agency: "cook-fpdcc",
    locationLabel: "Tampier Lake, near Orland Park",
    summary:
      "Southwest Cook County forest-preserve boating center with a trailered launch and seasonal rentals — electric trolling motors only.",
    overview: [
      "Tampier Lake Boating Center is listed by the Forest Preserves of Cook County with a trailered launch for canoes, kayaks, rowboats, and boats with electric trolling motors, plus seasonal rentals.",
      "Rental watercraft listed by FPDCC include row boats, kayaks, canoes, and fishing boats with battery and trolling motor (2-hour minimum). Confirm hours and availability by phone before trailering across the south suburbs.",
      "Like other FPDCC lakes, gasoline motors are prohibited and stand-up paddleboards are listed as prohibited district-wide.",
    ],
    accessKinds: ["trailered-launch"],
    allowedCraft: [
      "canoe",
      "kayak",
      "rowboat",
      "electric-trolling",
      "fishing-boat-electric",
    ],
    restrictions: [
      "Gasoline-powered boats prohibited on all FPDCC lakes",
      "Stand-up paddleboards listed as prohibited on all FPDCC waterbodies",
    ],
    hasRentals: true,
    rentalNotes:
      "Confirm published rental types, rates, and hours on the FPDCC boating page or by calling 708-830-5194.",
    seasonalAccessNote:
      "Rentals April–October, weather permitting, with the district’s mid-April / May / post–Labor Day schedule pattern.",
    phone: "708-830-5194",
    addressHint: "W 131st St west of S Wolf Rd, Cook County, IL 60467",
    source: {
      name: "Forest Preserves of Cook County — Boating, Canoeing & Kayaking",
      url: FPDCC_BOATING,
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "maple-lake-boating-center",
    name: "Maple Lake Boating Center",
    county: "Cook",
    agency: "cook-fpdcc",
    locationLabel: "Maple Lake, near Willow Springs",
    summary:
      "Forest Preserves rental-only lake — FPDCC states private boats are prohibited on Maple Lake; rentals operate seasonally through the listed operator.",
    overview: [
      "Maple Lake Boating Center is a Forest Preserves of Cook County rental location. Official FPDCC materials state that private boats are prohibited on Maple Lake — this is a rental destination, not a public trailer-in launch for personal craft.",
      "Rentals are listed April–October, weather permitting, with published weekday/weekend hours. FPDCC directs visitors to forgeparks.com/maple-lake or maplelake@theforgeparks.com to confirm availability.",
      "Even as a rental-only site, district rules still prohibit gasoline motors and list stand-up paddleboards among prohibited flotation devices on FPDCC waterbodies.",
    ],
    accessKinds: ["rental-only"],
    allowedCraft: ["canoe", "kayak", "rowboat", "paddle-boat"],
    restrictions: [
      "Private boats prohibited on Maple Lake (FPDCC)",
      "Gasoline-powered boats prohibited on all FPDCC lakes",
      "Stand-up paddleboards listed as prohibited on all FPDCC waterbodies",
    ],
    hasRentals: true,
    rentalNotes:
      "FPDCC lists row boats, single and tandem kayaks, canoes, and paddle boats. Confirm hours and rates with the operator linked from the official FPDCC boating page.",
    seasonalAccessNote:
      "April–October, weather permitting. FPDCC publishes Monday / closed Tue–Wed / Thu–Sun hour patterns — verify before visiting.",
    addressHint: "Wolf Rd, south of 95th St, Cook County, IL 60480",
    source: {
      name: "Forest Preserves of Cook County — Boating, Canoeing & Kayaking",
      url: FPDCC_BOATING,
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "saganashkee-slough-boat-launch",
    name: "Saganashkee Slough Boat Launch",
    county: "Cook",
    agency: "cook-fpdcc",
    locationLabel: "Saganashkee Slough, near Willow Springs / Palos area",
    summary:
      "Accessible trailered launch for canoes, kayaks, rowboats, and electric-trolling craft — FPDCC closes this launch roughly October–April for migrating waterfowl.",
    overview: [
      "The Forest Preserves of Cook County lists an accessible trailered boat launch at Saganashkee Slough for canoes, kayaks, rowboats, and boats with electric trolling motors.",
      "FPDCC states the launch closes from roughly October to April each year to accommodate migrating waterfowl — check whether the seasonal closure is active before you hitch up.",
      "Gasoline motors are prohibited on FPDCC lakes; stand-up paddleboards are listed as prohibited on all FPDCC waterbodies.",
    ],
    accessKinds: ["trailered-launch", "accessible-landing"],
    allowedCraft: ["canoe", "kayak", "rowboat", "electric-trolling"],
    restrictions: [
      "Seasonal waterfowl closure roughly October–April (confirm active status)",
      "Gasoline-powered boats prohibited on all FPDCC lakes",
      "Stand-up paddleboards listed as prohibited on all FPDCC waterbodies",
    ],
    hasRentals: false,
    seasonalAccessNote:
      "Launch closes roughly October–April for migrating waterfowl. Confirm the current closure status on the FPDCC boating page before you go.",
    addressHint: "107th St, west of S Willow Springs Rd / 104th Ave, Cook County, IL 60480",
    source: {
      name: "Forest Preserves of Cook County — Boating, Canoeing & Kayaking",
      url: FPDCC_BOATING,
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "beck-lake-cook",
    name: "Beck Lake",
    county: "Cook",
    agency: "cook-fpdcc",
    locationLabel: "Near Des Plaines",
    summary:
      "Trailored forest-preserve launch for canoes, kayaks, rowboats, sailboats, and electric-trolling craft — launch-only; no FPDCC rental center listed here.",
    overview: [
      "Beck Lake is listed by the Forest Preserves of Cook County with a trailered boat launch for canoes, kayaks, rowboats, sailboats, and boats with electric trolling motors.",
      "Unlike Busse, Tampier, Maple, and Tower Road, FPDCC does not list a rental center at Beck Lake — bring your own allowed craft and confirm district rules before launching.",
      "Gasoline motors are prohibited on all FPDCC lakes; stand-up paddleboards are listed as prohibited on all FPDCC waterbodies.",
    ],
    accessKinds: ["trailered-launch"],
    allowedCraft: [
      "canoe",
      "kayak",
      "rowboat",
      "sailboat",
      "electric-trolling",
    ],
    restrictions: [
      "Gasoline-powered boats prohibited on all FPDCC lakes",
      "Stand-up paddleboards listed as prohibited on all FPDCC waterbodies",
    ],
    hasRentals: false,
    addressHint: "East River Rd & Central Road, Cook County, IL 60016",
    source: {
      name: "Forest Preserves of Cook County — Boating, Canoeing & Kayaking",
      url: FPDCC_BOATING,
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "powderhorn-lake",
    name: "Powderhorn Lake",
    county: "Cook",
    agency: "cook-fpdcc",
    locationLabel: "Near Burnham, southeast Cook County",
    summary:
      "Southeast Cook County trailered launch for canoes, kayaks, rowboats, sailboats, and electric-trolling craft — launch-only on the FPDCC list.",
    overview: [
      "Powderhorn Lake appears on the Forest Preserves of Cook County lake-launch list with a trailered ramp for canoes, kayaks, rowboats, sailboats, and boats with electric trolling motors.",
      "No FPDCC rental center is listed at Powderhorn — plan as a launch-only stop and confirm district gasoline-motor and SUP prohibitions before you go.",
    ],
    accessKinds: ["trailered-launch"],
    allowedCraft: [
      "canoe",
      "kayak",
      "rowboat",
      "sailboat",
      "electric-trolling",
    ],
    restrictions: [
      "Gasoline-powered boats prohibited on all FPDCC lakes",
      "Stand-up paddleboards listed as prohibited on all FPDCC waterbodies",
    ],
    hasRentals: false,
    addressHint: "S Brainard Ave, east of S Burnham Ave / S Ave O, Burnham, IL 60633",
    source: {
      name: "Forest Preserves of Cook County — Boating, Canoeing & Kayaking",
      url: FPDCC_BOATING,
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "plank-road-meadow-des-plaines",
    name: "Plank Road Meadow Boat Launch",
    county: "Cook",
    agency: "cook-fpdcc",
    locationLabel: "Des Plaines River at Riverside",
    summary:
      "Trailored Des Plaines River access for canoes, kayaks, rowboats, sailboats, and boats with trolling motors — a river landing, not an inland lake harbor.",
    overview: [
      "Plank Road Meadow is listed under Forest Preserves of Cook County river canoe landings and boat launches on the Des Plaines River. FPDCC describes a trailered boat launch for canoes, kayaks, rowboats, sailboats, and boats with trolling motors.",
      "River conditions, bridges, and water levels change — check current conditions and district rules before launching. District flotation-device prohibitions (including stand-up paddleboards) still apply on FPDCC waterbodies.",
    ],
    accessKinds: ["trailered-launch"],
    allowedCraft: [
      "canoe",
      "kayak",
      "rowboat",
      "sailboat",
      "electric-trolling",
    ],
    restrictions: [
      "Stand-up paddleboards listed as prohibited on all FPDCC waterbodies",
      "Confirm motor and craft rules for this river landing on the official page before launching",
    ],
    hasRentals: false,
    addressHint: "Ogden Ave, east of 1st Ave, Riverside, IL 60534",
    source: {
      name: "Forest Preserves of Cook County — Boating, Canoeing & Kayaking",
      url: FPDCC_BOATING,
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
];
