import type { PreserveWaterAccess } from "@/types/geo";

/** Checked against official county forest-preserve boating / paddling pages. */
const VERIFIED = "2026-11-14";

const FPDCC_BOATING =
  "https://fpdcc.com/things-to-do/boating-canoeing-kayaking/";

const LCFPD_PADDLING =
  "https://www.lcfpd.org/things-to-do/recreation/boat-launches/";

const DUPAGE_BOATING =
  "https://www.dupageforest.org/things-to-do/recreational-activities/boating";

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
];
