import type { PreserveWaterAccess } from "@/types/geo";
import {
  PRESERVE_OVERVIEW_OVERRIDES,
  PRESERVE_SUMMARY_OVERRIDES,
} from "./forest-preserve-overviews";

/** Checked against official county forest-preserve boating / paddling pages. */
const VERIFIED = "2026-11-14";

const FPDCC_BOATING =
  "https://fpdcc.com/things-to-do/boating-canoeing-kayaking/";

const LCFPD_PADDLING =
  "https://www.lcfpd.org/things-to-do/recreation/boat-launches/";

const DUPAGE_BOATING =
  "https://www.dupageforest.org/things-to-do/recreational-activities/boating";

const WILL_BOATING = "https://www.reconnectwithnature.org/activities/boating";
const WILL_PADDLING =
  "https://www.reconnectwithnature.org/activities/canoeing-kayaking";

/**
 * Forest-preserve waters — facts only from the cited official agency page.
 * Cook FPDCC: gasoline motors prohibited on lakes; SUPs listed as prohibited
 * on FPDCC waterbodies. Lake County FPD: inland lakes allow cartop /
 * non-motorized craft + electric trolling. DuPage: nongasoline craft with
 * permits; Silver Lake has the trailered launch. Rules differ by site — confirm.
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
  {
    slug: "sterling-lake-van-patten-woods",
    name: "Sterling Lake — Van Patten Woods",
    county: "Lake",
    agency: "lake-county-fpd",
    locationLabel: "Van Patten Woods Forest Preserve, Wadsworth",
    summary:
      "Lake County Forest Preserves inland lake for cartop / non-motorized craft and electric trolling motors — free launch at your own risk; trailers permitted only here among the four inland lakes, with overflow grass parking.",
    overview: [
      "Lake County Forest Preserves lists Sterling Lake at Van Patten Woods among four inland lakes where you may launch your own cartop boat, canoe, kayak, paddleboard, or other small non-motorized watercraft. Launching is free and at your own risk; approved flotation gear is required.",
      "Electric trolling motors are allowed. LCFPD states trailers are permitted only at Van Patten Woods, with parking limited to the grass overflow area. Confirm current rules on the official paddling page before you go.",
    ],
    accessKinds: ["carry-in"],
    allowedCraft: ["canoe", "kayak", "electric-trolling"],
    restrictions: [
      "Cartop / small non-motorized craft per LCFPD paddling page; electric trolling motors allowed",
      "Trailers permitted only at Van Patten Woods among the four inland lakes — parking limited to grass overflow",
    ],
    hasRentals: false,
    seasonalAccessNote:
      "Confirm preserve hours and any temporary closures on Lake County Forest Preserves channels before launching.",
    source: {
      name: "Lake County Forest Preserves — Paddling / Boat Launches",
      url: LCFPD_PADDLING,
      lastVerified: VERIFIED,
    },
    relatedSources: [
      {
        name: "Lake County Forest Preserves — Van Patten Woods",
        url: "https://www.lcfpd.org/van-patten-woods/",
        lastVerified: VERIFIED,
      },
    ],
    isPublished: true,
  },
  {
    slug: "long-lake-grant-woods",
    name: "Long Lake — Grant Woods",
    county: "Lake",
    agency: "lake-county-fpd",
    locationLabel: "Grant Woods Forest Preserve, Ingleside",
    summary:
      "Lake County Forest Preserves inland lake for cartop / non-motorized craft and electric trolling motors — free launch; use the boat-launch parking lot south of Rollins Road.",
    overview: [
      "LCFPD lists Long Lake at Grant Woods for cartop boats, canoes, kayaks, paddleboards, and other small non-motorized craft. Launching is free and at your own risk with approved flotation gear; electric trolling motors are allowed.",
      "The district directs paddlers to the boat-launch parking lot in the south section of the preserve, south of Rollins Road. Trailers are not listed as permitted at this inland lake (only Van Patten Woods among the four).",
    ],
    accessKinds: ["carry-in"],
    allowedCraft: ["canoe", "kayak", "electric-trolling"],
    restrictions: [
      "Cartop / small non-motorized craft per LCFPD paddling page; electric trolling motors allowed",
      "Trailers not listed as permitted at Grant Woods — confirm on the official page",
    ],
    hasRentals: false,
    source: {
      name: "Lake County Forest Preserves — Paddling / Boat Launches",
      url: LCFPD_PADDLING,
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "hastings-lake-lake-villa",
    name: "Hastings Lake",
    county: "Lake",
    agency: "lake-county-fpd",
    locationLabel: "Hastings Lake Forest Preserve, Lake Villa",
    summary:
      "Lake County Forest Preserves inland lake for cartop / non-motorized craft and electric trolling motors — free launch at your own risk.",
    overview: [
      "LCFPD lists Hastings Lake in Lake Villa among the four inland lakes open to cartop boats, canoes, kayaks, paddleboards, and other small non-motorized watercraft. Launching is free and at your own risk; approved flotation gear is required; electric trolling motors are allowed.",
      "Confirm current preserve access on the official paddling page before you go.",
    ],
    accessKinds: ["carry-in"],
    allowedCraft: ["canoe", "kayak", "electric-trolling"],
    restrictions: [
      "Cartop / small non-motorized craft per LCFPD paddling page; electric trolling motors allowed",
    ],
    hasRentals: false,
    source: {
      name: "Lake County Forest Preserves — Paddling / Boat Launches",
      url: LCFPD_PADDLING,
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "lake-carina-gurnee",
    name: "Lake Carina",
    county: "Lake",
    agency: "lake-county-fpd",
    locationLabel: "Lake Carina Forest Preserve, Gurnee",
    summary:
      "Lake County Forest Preserves inland lake for cartop / non-motorized craft and electric trolling motors — free launch at your own risk.",
    overview: [
      "LCFPD lists Lake Carina in Gurnee among the four inland lakes for cartop / non-motorized craft. Launching is free and at your own risk with approved flotation gear; electric trolling motors are allowed.",
      "Confirm current rules on the official paddling page before launching.",
    ],
    accessKinds: ["carry-in"],
    allowedCraft: ["canoe", "kayak", "electric-trolling"],
    restrictions: [
      "Cartop / small non-motorized craft per LCFPD paddling page; electric trolling motors allowed",
    ],
    hasRentals: false,
    source: {
      name: "Lake County Forest Preserves — Paddling / Boat Launches",
      url: LCFPD_PADDLING,
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "independence-grove-rentals",
    name: "Independence Grove Marina Rentals",
    county: "Lake",
    agency: "lake-county-fpd",
    locationLabel: "Independence Grove Forest Preserve, Libertyville",
    summary:
      "Seasonal boat rentals on the 129-acre lake at Independence Grove — LCFPD states personal watercraft are not allowed on this lake.",
    overview: [
      "Lake County Forest Preserves offers seasonal boat and small-watercraft rentals at the marina at Independence Grove Forest Preserve in Libertyville. The district notes the 129-acre lake is a good beginner setting because rentals are available and the water is calm.",
      "LCFPD states personal watercraft are not allowed on the lake at Independence Grove. Confirm seasonal rental hours and craft types on the official paddling page or with the marina before you visit.",
    ],
    accessKinds: ["rental-only"],
    allowedCraft: ["canoe", "kayak"],
    restrictions: [
      "Personal watercraft not allowed on Independence Grove lake per LCFPD",
      "Confirm which craft types are available for rent each season on the official page",
    ],
    hasRentals: true,
    rentalNotes:
      "Seasonal rentals at the Independence Grove marina — confirm current inventory and hours with Lake County Forest Preserves.",
    source: {
      name: "Lake County Forest Preserves — Paddling / Boat Launches",
      url: LCFPD_PADDLING,
      lastVerified: VERIFIED,
    },
    relatedSources: [
      {
        name: "Lake County Forest Preserves — Independence Grove",
        url: "https://www.lcfpd.org/independence-grove/",
        lastVerified: VERIFIED,
      },
    ],
    isPublished: true,
  },
  {
    slug: "silver-lake-blackwell",
    name: "Silver Lake — Blackwell",
    county: "DuPage",
    agency: "dupage-fpd",
    locationLabel: "Blackwell Forest Preserve, Warrenville",
    summary:
      "DuPage Forest Preserve District’s Silver Lake at Blackwell — trailered boat launch (March 1–Nov. 30) for permitted nongasoline-powered craft, plus seasonal canoe/kayak/rowboat/paddleboat rentals.",
    overview: [
      "The Forest Preserve District of DuPage County lists Silver Lake at Blackwell as the preserve lake with a boat launch (open March 1–November 30). Bring-your-own canoe, kayak, stand-up paddleboard, or other qualifying nongasoline-powered watercraft requires a daily or annual private-watercraft permit; electric motors are allowed, gas motors are not.",
      "Seasonal rentals of canoes, kayaks, paddleboats, and rowboats are offered at Blackwell on published weekend/weekday schedules — confirm current hours and rates on the official boating page. Watercraft over 20 feet, float tubes, and passive floating inflatables are not allowed per district rules.",
      "You must be off the water by sunset. Confirm permit purchase options and full regulations on the DuPage Forest Preserve boating page before you go.",
    ],
    accessKinds: ["trailered-launch", "accessible-landing"],
    allowedCraft: [
      "canoe",
      "kayak",
      "rowboat",
      "paddle-boat",
      "electric-trolling",
    ],
    restrictions: [
      "Nongasoline-powered craft only; electric motors allowed, gas-powered not allowed",
      "Private watercraft require a DuPage Forest Preserve daily or annual permit",
      "Watercraft over 20 feet, float tubes, and passive floating inflatables not allowed",
      "Off the water by sunset",
    ],
    hasRentals: true,
    rentalNotes:
      "Seasonal canoe, kayak, paddleboat, and rowboat rentals at Blackwell — hours and rates are published on the official DuPage Forest Preserve boating page.",
    seasonalAccessNote:
      "Boat launch open March 1–Nov. 30 per DuPage Forest Preserve. Rental schedules are seasonal — confirm on the official boating page.",
    source: {
      name: "Forest Preserve District of DuPage County — Boating",
      url: DUPAGE_BOATING,
      lastVerified: VERIFIED,
    },
    relatedSources: [
      {
        name: "Forest Preserve District of DuPage County — Blackwell",
        url: "https://www.dupageforest.org/places-to-go/forest-preserves/blackwell",
        lastVerified: VERIFIED,
      },
    ],
    isPublished: true,
  },
  {
    slug: "round-meadow-lake-hidden-lake",
    name: "Round Meadow Lake — Hidden Lake",
    county: "DuPage",
    agency: "dupage-fpd",
    locationLabel: "Hidden Lake Forest Preserve",
    summary:
      "DuPage Forest Preserve carry-in lake for permitted nongasoline-powered private watercraft — no trailered launch; electric motors only.",
    overview: [
      "DuPage Forest Preserve lists Round Meadow Lake at Hidden Lake among three carry-in-only lakes for permitted private watercraft. You must manually move your craft from the parking lot to the water; if using a trailer, unhitch it and park it in its own space.",
      "Daily or annual permits are required. Electric motors are allowed; gas motors are not. Confirm full rules on the official boating page.",
    ],
    accessKinds: ["carry-in"],
    allowedCraft: ["canoe", "kayak", "electric-trolling"],
    restrictions: [
      "Carry-in only; private watercraft permit required",
      "Electric motors allowed; gas-powered not allowed",
      "Off the water by sunset",
    ],
    hasRentals: false,
    source: {
      name: "Forest Preserve District of DuPage County — Boating",
      url: DUPAGE_BOATING,
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "mallard-lake-dupage",
    name: "Mallard Lake",
    county: "DuPage",
    agency: "dupage-fpd",
    locationLabel: "Mallard Lake Forest Preserve",
    summary:
      "DuPage Forest Preserve carry-in lake for permitted nongasoline-powered private watercraft — electric motors only.",
    overview: [
      "DuPage Forest Preserve lists Mallard Lake as a carry-in-only site for permitted private watercraft. Manually move craft from parking to water; unhitch trailers into their own parking space.",
      "Permits required; electric motors allowed; gas motors not allowed. Confirm on the official boating page.",
    ],
    accessKinds: ["carry-in"],
    allowedCraft: ["canoe", "kayak", "electric-trolling"],
    restrictions: [
      "Carry-in only; private watercraft permit required",
      "Electric motors allowed; gas-powered not allowed",
      "Off the water by sunset",
    ],
    hasRentals: false,
    source: {
      name: "Forest Preserve District of DuPage County — Boating",
      url: DUPAGE_BOATING,
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "deep-quarry-lake-west-branch",
    name: "Deep Quarry Lake — West Branch",
    county: "DuPage",
    agency: "dupage-fpd",
    locationLabel: "West Branch Forest Preserve",
    summary:
      "DuPage Forest Preserve carry-in lake for permitted nongasoline-powered private watercraft, including stand-up paddleboards under district rules — electric motors only.",
    overview: [
      "DuPage Forest Preserve lists Deep Quarry Lake at West Branch as a carry-in-only lake for permitted private watercraft. The district’s private-watercraft rules also address stand-up paddleboarding on Silver Lake and Deep Quarry Lake — confirm current SUP rules on the official permit materials.",
      "Permits required; electric motors allowed; gas motors not allowed. Off the water by sunset.",
    ],
    accessKinds: ["carry-in"],
    allowedCraft: ["canoe", "kayak", "electric-trolling"],
    restrictions: [
      "Carry-in only; private watercraft permit required",
      "Electric motors allowed; gas-powered not allowed",
      "Off the water by sunset; confirm SUP rules on official permit materials",
    ],
    hasRentals: false,
    source: {
      name: "Forest Preserve District of DuPage County — Boating",
      url: DUPAGE_BOATING,
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "herrick-lake-rentals",
    name: "Herrick Lake Rentals",
    county: "DuPage",
    agency: "dupage-fpd",
    locationLabel: "Herrick Lake Forest Preserve",
    summary:
      "Seasonal canoe, kayak, paddleboat, and rowboat rentals at Herrick Lake — published weekend schedule on the DuPage Forest Preserve boating page.",
    overview: [
      "DuPage Forest Preserve lists Herrick Lake alongside Blackwell for seasonal canoe, kayak, paddleboat, and rowboat rentals. Weekend rental hours are published on the official boating page; weekday private outing options are also noted there.",
      "Confirm current seasonal dates, hours, and rates on the DuPage Forest Preserve boating page before you visit. Bring-your-own private craft on designated lakes requires a separate permit program.",
    ],
    accessKinds: ["rental-only"],
    allowedCraft: ["canoe", "kayak", "rowboat", "paddle-boat"],
    restrictions: [
      "Confirm rental craft types and age/supervision rules on the official boating page",
    ],
    hasRentals: true,
    rentalNotes:
      "Seasonal rentals at Herrick Lake — hours and rates are published on the official DuPage Forest Preserve boating page.",
    source: {
      name: "Forest Preserve District of DuPage County — Boating",
      url: DUPAGE_BOATING,
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "whalon-lake-will",
    name: "Whalon Lake",
    county: "Will",
    agency: "will-fpdwc",
    locationLabel: "Whalon Lake Forest Preserve, Naperville",
    summary:
      "Will County Forest Preserve fishing lake with a trailered boat launch and canoe/kayak access — non-gasoline craft up to 18 feet; electric trolling only; paddleboards prohibited.",
    overview: [
      "The Forest Preserve District of Will County lists a boat launch at Whalon Lake in Naperville with trailer parking and no launch fee. District boating rules permit non-gasoline-powered watercraft up to 18 feet (fishing boats, rowboats, canoes, kayaks); sailboats, float tubes, and paddleboards are not permitted. Only electric trolling motors may be used; gas motors must be raised out of the water.",
      "Boats may be launched April 1–October 31 per the district boating page. Canoes and kayaks may also launch here; no launch pass is required. Kayak rentals are offered through The Forge under a district concessions license — confirm current costs and hours on The Forge’s Whalon Lake rental page.",
    ],
    accessKinds: ["trailered-launch"],
    allowedCraft: ["canoe", "kayak", "rowboat", "fishing-boat-electric", "electric-trolling"],
    restrictions: [
      "Non-gasoline craft up to 18 feet; electric trolling only",
      "Sailboats, float tubes, and paddleboards not permitted",
      "District boat launches close October 31; confirm open status before you tow",
    ],
    hasRentals: true,
    rentalNotes:
      "Kayak rentals via The Forge at Whalon Lake (district concessions licensee). Confirm current hours, limits, and rates on The Forge / district pages.",
    seasonalAccessNote:
      "Will County FPD: boats may be launched April 1–Oct. 31. Canoe/kayak launching on designated preserve property may continue year-round except when ice is present — confirm on the canoeing/kayaking page.",
    source: {
      name: "Forest Preserve District of Will County — Boating",
      url: WILL_BOATING,
      lastVerified: VERIFIED,
    },
    relatedSources: [
      {
        name: "Forest Preserve District of Will County — Canoeing/Kayaking",
        url: WILL_PADDLING,
        lastVerified: VERIFIED,
      },
    ],
    isPublished: true,
  },
  {
    slug: "rock-run-rookery-will",
    name: "Rock Run Rookery Preserve",
    county: "Will",
    agency: "will-fpdwc",
    locationLabel: "Rock Run Rookery Preserve, Joliet",
    summary:
      "Will County Forest Preserve trailered boat launch and canoe/kayak access — electric-only rules; boats prohibited in the small west lake and buoy-marked rookery area of the east lake.",
    overview: [
      "Will County Forest Preserve lists a boat launch at Rock Run Rookery Preserve in Joliet with trailer parking and no launch fee. The same district craft rules apply: non-gasoline craft up to 18 feet, electric trolling only, no sailboats/float tubes/paddleboards.",
      "At Rock Run, boats are not allowed in the small west lake or in the portion of the large east lake marked by buoys protecting an established rookery. Confirm buoyed closures on site and on the official boating page.",
    ],
    accessKinds: ["trailered-launch"],
    allowedCraft: ["canoe", "kayak", "rowboat", "fishing-boat-electric", "electric-trolling"],
    restrictions: [
      "Non-gasoline craft up to 18 feet; electric trolling only; paddleboards prohibited",
      "No boats in small west lake or buoy-marked rookery area of east lake",
      "Boat launches close October 31 per district",
    ],
    hasRentals: false,
    seasonalAccessNote:
      "Boats may be launched April 1–Oct. 31 per Will County FPD boating page.",
    source: {
      name: "Forest Preserve District of Will County — Boating",
      url: WILL_BOATING,
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "lake-chaminwood-will",
    name: "Lake Chaminwood",
    county: "Will",
    agency: "will-fpdwc",
    locationLabel: "Lake Chaminwood Preserve, Channahon / Troy Township",
    summary:
      "Will County Forest Preserve carry-in lake with an accessible/adaptive canoe/kayak launch — no trailer parking; paddleboards prohibited; seasonal kayak rentals via Rent.Fun.",
    overview: [
      "Will County Forest Preserve allows boating at Lake Chaminwood, but only craft that can be transported in or on top of a vehicle and carried or rolled by hand cart — there is no boat trailer parking. An accessible and adaptive canoe/kayak launch is published for paddlers of all abilities.",
      "District rules prohibit paddleboards and float tubes. Kayak rentals April 1–Oct. 31 through a Rent.Fun station are listed on the canoeing/kayaking page — confirm current rates and app instructions there. No launch pass is required for private canoes/kayaks at designated sites.",
    ],
    accessKinds: ["carry-in", "accessible-landing"],
    allowedCraft: ["canoe", "kayak", "fishing-boat-electric", "electric-trolling"],
    restrictions: [
      "Carry-in / hand-cart only — no trailer parking",
      "Paddleboards and float tubes prohibited",
      "Electric trolling only under district boating rules",
    ],
    hasRentals: true,
    rentalNotes:
      "Kayak rentals via Rent.Fun April 1–Oct. 31 — confirm current pricing and hours on the official canoeing/kayaking page.",
    seasonalAccessNote:
      "Boat launches close Oct. 31; canoe/kayak launching rules for ice and year-round access are on the canoeing/kayaking page.",
    source: {
      name: "Forest Preserve District of Will County — Canoeing/Kayaking",
      url: WILL_PADDLING,
      lastVerified: VERIFIED,
    },
    relatedSources: [
      {
        name: "Forest Preserve District of Will County — Boating",
        url: WILL_BOATING,
        lastVerified: VERIFIED,
      },
    ],
    isPublished: true,
  },
  {
    slug: "monee-reservoir-will",
    name: "Monee Reservoir",
    county: "Will",
    agency: "will-fpdwc",
    locationLabel: "Monee Reservoir, Monee Township",
    summary:
      "Will County Forest Preserve carry-in fishing lake with canoe/kayak/rowboat/pedal-boat rentals — no trailer launch; paddleboards prohibited; age rules for personal canoes/kayaks.",
    overview: [
      "Will County Forest Preserve allows private canoes, kayaks, and small fishing boats at Monee Reservoir only when they can be carried or rolled by hand cart — there is no boat trailer parking or boat launch. Pedal boats and rowboats (and canoe/kayak rentals) are offered seasonally at the visitor center under published deposit and age rules.",
      "Individuals must be 12 or older to launch a personal canoe or kayak; those under 18 must be accompanied by an adult on the water. Paddleboards and float tubes are prohibited. Confirm rental seasons and activity fees on the official boating and canoeing pages.",
    ],
    accessKinds: ["carry-in", "rental-only"],
    allowedCraft: [
      "canoe",
      "kayak",
      "rowboat",
      "paddle-boat",
      "fishing-boat-electric",
      "electric-trolling",
    ],
    restrictions: [
      "No trailer parking or boat launch — hand-cart / car-top only for private craft",
      "Paddleboards and float tubes prohibited",
      "Age rules for personal canoe/kayak launching published on canoeing page",
    ],
    hasRentals: true,
    rentalNotes:
      "Seasonal canoe, kayak, rowboat, and pedal-boat rentals at Monee Reservoir — deposits, late fees, and hourly rates are published on the district boating page.",
    seasonalAccessNote:
      "Rowboat rentals typically April 1–Oct. 31; canoe/kayak rentals May 1–Sept. 30; pedal boats typically May 1–Oct. 31 — confirm on the official page.",
    source: {
      name: "Forest Preserve District of Will County — Boating",
      url: WILL_BOATING,
      lastVerified: VERIFIED,
    },
    relatedSources: [
      {
        name: "Forest Preserve District of Will County — Canoeing/Kayaking",
        url: WILL_PADDLING,
        lastVerified: VERIFIED,
      },
    ],
    isPublished: true,
  },
  {
    slug: "isle-a-la-cache-will",
    name: "Isle a la Cache — Des Plaines River",
    county: "Will",
    agency: "will-fpdwc",
    locationLabel: "Isle a la Cache, Romeoville",
    summary:
      "Will County Forest Preserve canoe/kayak river access to the Des Plaines River — no launch pass; paddleboards prohibited on district waters.",
    overview: [
      "Will County Forest Preserve lists a canoe/kayak launch at Isle a la Cache in Romeoville for Des Plaines River access. No launch pass is required at designated forest-preserve locations.",
      "Unless otherwise posted, canoes and kayaks may launch year-round except when ice is present. District boat launches close October 31. Paddleboards and float tubes are prohibited under district rules.",
    ],
    accessKinds: ["carry-in"],
    allowedCraft: ["canoe", "kayak"],
    restrictions: [
      "Paddleboards and float tubes prohibited",
      "No launching when ice is present",
    ],
    hasRentals: false,
    seasonalAccessNote:
      "Canoe/kayak launching year-round except ice; district boat launches close Oct. 31.",
    source: {
      name: "Forest Preserve District of Will County — Canoeing/Kayaking",
      url: WILL_PADDLING,
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "jon-j-duerr-kane",
    name: "Jon J. Duerr Forest Preserve",
    county: "Kane",
    agency: "kane-fpd",
    locationLabel: "Jon J. Duerr Forest Preserve, South Elgin (Fox River)",
    summary:
      "Kane County Forest Preserve Fox River access — canoe/kayak launch open when the river is open; the district states the boat/trailer launch is currently closed.",
    overview: [
      "The Forest Preserve District of Kane County lists Jon J. Duerr Forest Preserve at 35W003 Route 31, South Elgin, with boat/canoe launch amenities on the Fox River.",
      "The preserve page states: when the river is open, the canoe/kayak launch is open, however the boat launch (for boats and trailers) is currently closed. Mind all barricades and confirm status on the official page before trailering.",
      "Kane County fishing materials state that within forest preserves only trolling motors (no gasoline motors) are permitted, while the Fox River is the only location where gasoline motors are allowed — confirm current rules before launching.",
    ],
    accessKinds: ["carry-in"],
    allowedCraft: ["canoe", "kayak", "electric-trolling"],
    restrictions: [
      "Trailer boat launch currently closed per Kane Forest Preserve page — canoe/kayak launch open when river is open",
      "Confirm motor rules: preserve waters vs Fox River gasoline allowance on official materials",
    ],
    hasRentals: false,
    seasonalAccessNote:
      "Canoe/kayak launch open when the river is open per preserve page. Confirm trailer-launch project status before you hitch up.",
    addressHint: "35W003 Route 31, South Elgin, IL",
    source: {
      name: "Forest Preserve District of Kane County — Jon J. Duerr",
      url: "https://www.kaneforest.com/location/jon-j-duerr",
      lastVerified: VERIFIED,
    },
    relatedSources: [
      {
        name: "Forest Preserve District of Kane County — Fishing (launch notes)",
        url: "https://kaneforest.com/upload/Fishing_2020.pdf",
        lastVerified: VERIFIED,
      },
    ],
    isPublished: true,
  },
  {
    slug: "fabyan-kane",
    name: "Fabyan Forest Preserve",
    county: "Kane",
    agency: "kane-fpd",
    locationLabel: "Fabyan Forest Preserve, Geneva (Fox River)",
    summary:
      "Kane County Forest Preserve on the Fox River with a listed boat/canoe launch amenity — confirm motor and craft rules on official Kane Forest Preserve materials.",
    overview: [
      "Kane County Forest Preserve lists Fabyan Forest Preserve at 1925 S. Batavia Ave., Geneva, with boat/canoe launch among published amenities on the Fox River.",
      "District fishing materials note designated boat/canoe/kayak launch locations and state that within forest preserves only trolling motors are permitted, while gasoline motors are allowed on the Fox River. Confirm current launch status and rules before you go.",
    ],
    accessKinds: ["carry-in"],
    allowedCraft: ["canoe", "kayak", "electric-trolling"],
    restrictions: [
      "Confirm posted launch rules and motor restrictions on official Kane Forest Preserve pages",
    ],
    hasRentals: false,
    addressHint: "1925 S. Batavia Ave., Geneva, IL",
    source: {
      name: "Forest Preserve District of Kane County — Fabyan",
      url: "https://kaneforest.com/location/fabyan",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "fox-river-shores-kane",
    standalonePage: false,
    redirectTo: "/lakes/fox-river#fox-river-shores",
    name: "Fox River Shores Forest Preserve",
    county: "Kane",
    agency: "kane-fpd",
    locationLabel: "Fox River Shores, Carpentersville",
    summary:
      "Kane County Forest Preserve Fox River shoreline with a listed boat/canoe launch amenity.",
    overview: [
      "Kane County Forest Preserve lists Fox River Shores Forest Preserve (Williams Rd., Carpentersville) with boat/canoe launch amenities along the Fox River.",
      "Confirm craft and motor rules on official Kane Forest Preserve materials before launching — preserve inland waters and the Fox River can carry different motor rules in district publications.",
    ],
    accessKinds: ["carry-in"],
    allowedCraft: ["canoe", "kayak", "electric-trolling"],
    restrictions: [
      "Confirm posted launch and motor rules on official Kane Forest Preserve pages",
    ],
    hasRentals: false,
    addressHint: "716 Williams Rd., Carpentersville, IL",
    source: {
      name: "Forest Preserve District of Kane County — Fox River Shores",
      url: "https://kaneforest.com/location/fox-river-shores",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "lake-atwood-hollows-mchenry",
    name: "Lake Atwood — The Hollows",
    county: "McHenry",
    agency: "mchenry-ccd",
    locationLabel: "The Hollows Conservation Area, Cary",
    summary:
      "McHenry County Conservation District lake for canoe, kayak, paddleboard, or electric-motorized rowboat — ADA kayak launch improvements published by the district.",
    overview: [
      "McHenry County Conservation District’s The Hollows page states you can launch a canoe, kayak, paddle board, or electric motorized rowboat on Lake Atwood (about 22 acres) at 3804 US Highway 14, Cary. Site hours are sunrise to sunset unless seasonally closed.",
      "The district published accessibility improvements at Lake Atwood including an ADA kayak launch. Confirm current open status and any seasonal notices on the official Hollows page before you go.",
    ],
    accessKinds: ["carry-in", "accessible-landing"],
    allowedCraft: ["canoe", "kayak", "rowboat", "electric-trolling"],
    restrictions: [
      "Electric motorized rowboats noted by MCCD — confirm gasoline policy on official materials before assuming gas is allowed",
      "Site hours sunrise–sunset unless otherwise posted",
    ],
    hasRentals: false,
    seasonalAccessNote:
      "Open daily sunrise to sunset; some MCCD sites have seasonal closures — confirm on the Hollows page.",
    addressHint: "3804 US Highway 14, Cary, IL",
    source: {
      name: "McHenry County Conservation District — The Hollows",
      url: "https://www.mccdistrict.org/visit___explore/places_to_go/find_a_site/the_hollows.php",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "keystone-landing-mchenry",
    name: "Keystone Road Canoe Landing",
    county: "McHenry",
    agency: "mchenry-ccd",
    locationLabel: "Glacial Park / Nippersink Creek, Richmond",
    summary:
      "McHenry County Conservation District canoe/kayak landing on Nippersink Creek — tubing/flotation devices prohibited; launches close at high water.",
    overview: [
      "MCCD lists Keystone Road Canoe Landing at 6500 Keystone Road, Richmond, as a canoe/kayak put-in for Nippersink Creek trips toward Pioneer Landing, Lyle C. Thomas, or Nippersink Canoe Base. Site hours are sunrise to sunset.",
      "The district states tubing/flotation devices are prohibited on Nippersink Creek. When USGS levels are above 750 cfs or 7 feet, all launches are CLOSED due to bridge clearance. Paddling is at your own risk; debris conditions are not continuously updated.",
    ],
    accessKinds: ["carry-in"],
    allowedCraft: ["canoe", "kayak"],
    restrictions: [
      "Tubing/flotation devices prohibited on Nippersink Creek",
      "All launches closed when water is above 750 cfs / 7 feet per MCCD",
      "Paddling at your own risk — debris not continuously reported",
    ],
    hasRentals: false,
    seasonalAccessNote:
      "Sunrise–sunset; confirm water levels before launching. High-water closures published by MCCD.",
    addressHint: "6500 Keystone Road, Richmond, IL",
    source: {
      name: "McHenry County Conservation District — Keystone Landing",
      url: "https://mccdistrict.org/visit___explore/places_to_go/find_a_site/keystone_road_canoe_landing.php",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "pioneer-landing-mchenry",
    standalonePage: false,
    redirectTo: "/forest-preserves/keystone-landing-mchenry#pioneer-landing",
    name: "Pioneer Road Canoe Landing",
    county: "McHenry",
    agency: "mchenry-ccd",
    locationLabel: "Glacial Park / Nippersink Creek, Richmond",
    summary:
      "McHenry County Conservation District canoe/kayak landing on Nippersink Creek — same high-water and no-tubing rules as other Nippersink landings.",
    overview: [
      "MCCD lists Pioneer Road Canoe Landing at 7049 Pioneer Road, Richmond, on the Nippersink canoe trail. Hours are sunrise to sunset.",
      "Tubing/flotation devices are prohibited. High-water closures apply when levels exceed 750 cfs / 7 feet. Confirm conditions before you put in.",
    ],
    accessKinds: ["carry-in"],
    allowedCraft: ["canoe", "kayak"],
    restrictions: [
      "Tubing/flotation devices prohibited on Nippersink Creek",
      "All launches closed above 750 cfs / 7 feet per MCCD",
    ],
    hasRentals: false,
    addressHint: "7049 Pioneer Road, Richmond, IL",
    source: {
      name: "McHenry County Conservation District — Pioneer Landing",
      url: "https://mccdistrict.org/visit___explore/places_to_go/find_a_site/pioneer_road_canoe_landing.php",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "nippersink-canoe-base-mchenry",
    standalonePage: false,
    redirectTo: "/forest-preserves/keystone-landing-mchenry#nippersink-canoe-base",
    name: "Nippersink Canoe Base",
    county: "McHenry",
    agency: "mchenry-ccd",
    locationLabel: "Nippersink Creek, Spring Grove",
    summary:
      "McHenry County Conservation District take-out / landing on Nippersink Creek with shelter and short trails — tubing prohibited; high-water launch closures apply.",
    overview: [
      "MCCD’s Nippersink Canoe Base (400 E. US Highway 12, Spring Grove) sits on the southern banks of Nippersink Creek as a landing/take-out on the published canoe trail, with a small shelter and short nature trail.",
      "District Nippersink rules prohibit tubing/flotation devices and close all launches above 750 cfs / 7 feet. Confirm water levels and site status before you go.",
    ],
    accessKinds: ["carry-in"],
    allowedCraft: ["canoe", "kayak"],
    restrictions: [
      "Tubing/flotation devices prohibited on Nippersink Creek",
      "All launches closed above 750 cfs / 7 feet per MCCD",
    ],
    hasRentals: false,
    addressHint: "400 E. US Highway 12, Spring Grove, IL",
    source: {
      name: "McHenry County Conservation District — Nippersink Canoe Base",
      url: "https://mccdistrict.org/visit___explore/places_to_go/find_a_site/nippersink_canoe_base.php",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "maywood-grove-des-plaines",
    name: "Maywood Grove — Des Plaines River",
    county: "Cook",
    agency: "cook-fpdcc",
    locationLabel: "Maywood Grove, Maywood",
    summary:
      "Accessible Cook County Forest Preserves carry-in canoe landing on the Des Plaines River — home of the Greater Maywood Paddling Program.",
    overview: [
      "Forest Preserves of Cook County lists Maywood Grove (Ohio St & Des Plaines Ave, Maywood) as a Des Plaines River carry-in canoe landing and includes it among accessible canoe landings with accessible parking and a paved path to a stable landing surface.",
      "FPDCC also notes Maywood Grove as home of the Greater Maywood Paddling Program for organized community kayaking. District-wide prohibitions still apply on FPDCC waterbodies, including stand-up paddleboards among listed flotation devices.",
      "Confirm current open status and program details on the official Maywood Grove and boating pages before you put in.",
    ],
    accessKinds: ["carry-in", "accessible-landing"],
    allowedCraft: ["canoe", "kayak"],
    restrictions: [
      "Stand-up paddleboards listed as prohibited on all FPDCC waterbodies",
      "Confirm craft rules on the official FPDCC boating page before launching",
    ],
    hasRentals: false,
    addressHint: "Ohio St & Des Plaines Ave, Maywood, IL 60153",
    source: {
      name: "Forest Preserves of Cook County — Boating, Canoeing & Kayaking",
      url: FPDCC_BOATING,
      lastVerified: VERIFIED,
    },
    relatedSources: [
      {
        name: "Forest Preserves of Cook County — Maywood Grove",
        url: "https://fpdcc.com/places/locations/maywood-grove/",
        lastVerified: VERIFIED,
      },
    ],
    isPublished: true,
  },
  {
    slug: "irving-park-road-canoe-landing",
    standalonePage: false,
    redirectTo: "/lakes/des-plaines-river#irving-park-road",
    name: "Irving Park Road Canoe Landing",
    county: "Cook",
    agency: "cook-fpdcc",
    locationLabel: "Des Plaines River at Schiller Park",
    summary:
      "Cook County Forest Preserves carry-in canoe landing on the Des Plaines River north of Irving Park Road.",
    overview: [
      "Forest Preserves of Cook County lists Irving Park Road Canoe Landing (Des Plaines River Rd, north of Irving Park Rd, Schiller Park) as a carry-in canoe landing on the Des Plaines River.",
      "Hours are published as year-round sunrise to sunset on the landing page. Confirm district flotation-device and craft rules on the FPDCC boating page — stand-up paddleboards are listed as prohibited on all FPDCC waterbodies.",
    ],
    accessKinds: ["carry-in"],
    allowedCraft: ["canoe", "kayak"],
    restrictions: [
      "Stand-up paddleboards listed as prohibited on all FPDCC waterbodies",
    ],
    hasRentals: false,
    addressHint: "Des Plaines River Rd, north of Irving Park Rd, Schiller Park, IL 60176",
    source: {
      name: "Forest Preserves of Cook County — Irving Park Road Canoe Landing",
      url: "https://fpdcc.com/places/locations/irving-park-road-canoe-landing/",
      lastVerified: VERIFIED,
    },
    relatedSources: [
      {
        name: "Forest Preserves of Cook County — Boating, Canoeing & Kayaking",
        url: FPDCC_BOATING,
        lastVerified: VERIFIED,
      },
    ],
    isPublished: true,
  },
  {
    slug: "schuths-grove-des-plaines",
    standalonePage: false,
    redirectTo: "/lakes/des-plaines-river#schuths-grove",
    name: "Schuth’s Grove — Des Plaines River",
    county: "Cook",
    agency: "cook-fpdcc",
    locationLabel: "Near Riverside / Des Plaines River",
    summary:
      "Accessible Cook County Forest Preserves canoe/kayak landing on the Des Plaines River near Riverside.",
    overview: [
      "Forest Preserves of Cook County lists Schuth’s Grove (W Cermak Rd, west of Des Plaines Ave) among Des Plaines River river-access sites and among accessible canoe landings with accessible parking and a paved path to a stable landing.",
      "The preserve page describes an accessible canoe and kayak launch with paved pathways and shoreline access. Confirm district-wide craft prohibitions (including stand-up paddleboards on FPDCC waterbodies) before you go.",
    ],
    accessKinds: ["carry-in", "accessible-landing"],
    allowedCraft: ["canoe", "kayak"],
    restrictions: [
      "Stand-up paddleboards listed as prohibited on all FPDCC waterbodies",
    ],
    hasRentals: false,
    addressHint: "W Cermak Rd, west of Des Plaines Ave, Cook County, IL 60546",
    source: {
      name: "Forest Preserves of Cook County — Schuth’s Grove",
      url: "https://fpdcc.com/places/locations/schuths-grove/",
      lastVerified: VERIFIED,
    },
    relatedSources: [
      {
        name: "Forest Preserves of Cook County — Boating, Canoeing & Kayaking",
        url: FPDCC_BOATING,
        lastVerified: VERIFIED,
      },
    ],
    isPublished: true,
  },
  {
    slug: "allison-woods-des-plaines",
    standalonePage: false,
    redirectTo: "/lakes/des-plaines-river#allison-woods",
    name: "Allison Woods — Des Plaines River",
    county: "Cook",
    agency: "cook-fpdcc",
    locationLabel: "Allison Woods, near Northbrook / Wheeling area",
    summary:
      "Cook County Forest Preserves carry-in canoe landing on the upper Des Plaines River corridor.",
    overview: [
      "Forest Preserves of Cook County lists Allison Woods (Milwaukee Ave & Winkleman Rd) as a Des Plaines River carry-in canoe landing.",
      "Use this landing with other FPDCC Des Plaines sites for trip planning, and confirm craft rules — including the district’s stand-up paddleboard prohibition on FPDCC waterbodies — on the official boating page.",
    ],
    accessKinds: ["carry-in"],
    allowedCraft: ["canoe", "kayak"],
    restrictions: [
      "Stand-up paddleboards listed as prohibited on all FPDCC waterbodies",
    ],
    hasRentals: false,
    addressHint: "Milwaukee Ave & Winkleman Rd, Cook County, IL 60062",
    source: {
      name: "Forest Preserves of Cook County — Boating, Canoeing & Kayaking",
      url: FPDCC_BOATING,
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "hammel-woods-dupage-will",
    name: "Hammel Woods — DuPage River",
    county: "Will",
    agency: "will-fpdwc",
    locationLabel: "Hammel Woods, Shorewood",
    summary:
      "Will County Forest Preserve canoe/kayak access to the DuPage River at two published Shorewood put-ins — DuPage River Access and Route 59 Access.",
    overview: [
      "The Forest Preserve District of Will County lists Hammel Woods — DuPage River Access and Hammel Woods — Route 59 Access in Shorewood among canoe/kayak launches for local river access on the DuPage River.",
      "No launch pass is required at designated forest-preserve locations. Unless otherwise posted, canoes and kayaks may launch year-round except when ice is present; district boat launches close October 31. Paddleboards and float tubes are prohibited.",
    ],
    accessKinds: ["carry-in"],
    allowedCraft: ["canoe", "kayak"],
    restrictions: [
      "Paddleboards and float tubes prohibited",
      "No launching when ice is present",
    ],
    hasRentals: false,
    seasonalAccessNote:
      "Canoe/kayak launching year-round except ice; district boat launches close Oct. 31.",
    source: {
      name: "Forest Preserve District of Will County — Canoeing/Kayaking",
      url: WILL_PADDLING,
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "riverview-farmstead-dupage-will",
    standalonePage: false,
    redirectTo: "/lakes/dupage-river#riverview-farmstead",
    name: "Riverview Farmstead Preserve — DuPage River",
    county: "Will",
    agency: "will-fpdwc",
    locationLabel: "Riverview Farmstead Preserve, Naperville",
    summary:
      "Will County Forest Preserve canoe/kayak launch for DuPage River access in Naperville.",
    overview: [
      "Will County Forest Preserve lists Riverview Farmstead Preserve in Naperville among canoe/kayak launches for DuPage River access.",
      "District rules: no launch pass at designated locations; year-round canoe/kayak launching except ice unless otherwise posted; boat launches close October 31; paddleboards and float tubes prohibited.",
    ],
    accessKinds: ["carry-in"],
    allowedCraft: ["canoe", "kayak"],
    restrictions: [
      "Paddleboards and float tubes prohibited",
      "No launching when ice is present",
    ],
    hasRentals: false,
    seasonalAccessNote:
      "Canoe/kayak launching year-round except ice; district boat launches close Oct. 31.",
    source: {
      name: "Forest Preserve District of Will County — Canoeing/Kayaking",
      url: WILL_PADDLING,
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "mckinley-woods-frederick-will",
    standalonePage: false,
    redirectTo: "/lakes/des-plaines-river#fredericks-grove",
    name: "McKinley Woods — Frederick’s Grove",
    county: "Will",
    agency: "will-fpdwc",
    locationLabel: "McKinley Woods, Channahon",
    summary:
      "Will County Forest Preserve canoe/kayak access at Frederick’s Grove for the Des Plaines River and I&M Canal corridor.",
    overview: [
      "Will County Forest Preserve lists McKinley Woods — Frederick’s Grove in Channahon for canoe/kayak access to the Des Plaines River and I&M Canal.",
      "Confirm put-in details and district craft rules on the official canoeing/kayaking page — paddleboards and float tubes are prohibited, and ice closes launching.",
    ],
    accessKinds: ["carry-in"],
    allowedCraft: ["canoe", "kayak"],
    restrictions: [
      "Paddleboards and float tubes prohibited",
      "No launching when ice is present",
    ],
    hasRentals: false,
    seasonalAccessNote:
      "Canoe/kayak launching year-round except ice; district boat launches close Oct. 31.",
    source: {
      name: "Forest Preserve District of Will County — Canoeing/Kayaking",
      url: WILL_PADDLING,
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "mckinley-woods-kerry-sheridan-will",
    standalonePage: false,
    redirectTo: "/lakes/dupage-river#kerry-sheridan",
    name: "McKinley Woods — Kerry Sheridan Grove",
    county: "Will",
    agency: "will-fpdwc",
    locationLabel: "McKinley Woods, Channahon",
    summary:
      "Will County Forest Preserve canoe/kayak launch at Kerry Sheridan Grove for DuPage River access.",
    overview: [
      "Will County Forest Preserve lists McKinley Woods — Kerry Sheridan Grove in Channahon among canoe/kayak launches for DuPage River access.",
      "Use with Hammel Woods and Riverview Farmstead for DuPage River trip planning. Confirm ice, Oct. 31 boat-launch closure notes, and paddleboard prohibitions on the official paddling page.",
    ],
    accessKinds: ["carry-in"],
    allowedCraft: ["canoe", "kayak"],
    restrictions: [
      "Paddleboards and float tubes prohibited",
      "No launching when ice is present",
    ],
    hasRentals: false,
    seasonalAccessNote:
      "Canoe/kayak launching year-round except ice; district boat launches close Oct. 31.",
    source: {
      name: "Forest Preserve District of Will County — Canoeing/Kayaking",
      url: WILL_PADDLING,
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
];

// Merge expanded overviews / summaries for standalone detail pages.
for (const preserve of forestPreserveAccess) {
  const overview = PRESERVE_OVERVIEW_OVERRIDES[preserve.slug];
  if (overview) preserve.overview = overview;
  const summary = PRESERVE_SUMMARY_OVERRIDES[preserve.slug];
  if (summary) preserve.summary = summary;
}
