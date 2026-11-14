import type { Lake } from "@/types/geo";

const VERIFIED = "2026-08-25";

export const lakes: Lake[] = [
  {
    slug: "lake-michigan-chicago",
    name: "Lake Michigan (Chicago Shore)",
    region: "illinois",
    state: "IL",
    overview: [
      "Lake Michigan is the defining open-water body for Chicago boating. Along the Illinois shore, recreational access is concentrated in Chicago Park District harbors and launches, with additional public harbors at Waukegan and Winthrop Harbor (North Point Marina) continuing the western shore toward Wisconsin.",
      "Nearshore conditions can change quickly. Boaters should rely on National Weather Service marine forecasts and local observations rather than skyline appearance alone. Harbor season dates, slip rules, and launch listings are published by Chicago Harbors and the Chicago Park District.",
      "This lake entry groups Chicago-area Lake Michigan destinations for navigation and related-content linking. Individual destination pages carry harbor-specific official links and weather anchors.",
    ],
    officialLinks: [
      {
        name: "Chicago Harbors",
        url: "https://www.chicagoharbors.info/",
        lastVerified: VERIFIED,
      },
      {
        name: "Chicago Park District — Harbors",
        url: "https://www.chicagoparkdistrict.com/facilities/harbors",
        lastVerified: VERIFIED,
      },
      {
        name: "NWS Chicago — Marine Weather",
        url: "https://www.weather.gov/lot/marine",
        lastVerified: VERIFIED,
      },
    ],
    destinationSlugs: [
      "chicago",
      "waukegan",
      "winthrop-harbor",
      "kenosha",
      "racine",
      "milwaukee",
      "michigan-city",
      "new-buffalo",
    ],
    isPublished: true,
  },
  {
    slug: "chain-o-lakes",
    name: "Chain O' Lakes",
    region: "illinois",
    state: "IL",
    overview: [
      "The Chain O' Lakes is Illinois’ large interconnected natural-lake system in Lake and McHenry counties, linked by the Fox River. Chain O' Lakes State Park (IDNR) sits at the heart of public water-oriented recreation on the chain.",
      "Fox Waterway Agency (FWA) manages recreational use of the Chain and adjoining Fox River reaches. FWA states that all boats operating on the Chain O’ Lakes must display a current agency sticker, and publishes class-based user fees, temporary permits, and purchase options on its official sticker and fee-schedule pages — confirm current amounts there before you tow.",
      "For launching, FWA’s public guidance points boaters to Chain O’ Lakes State Park in Spring Grove as a free public launch and notes that many local marinas launch for a fee. Lake County Forest Preserves separately operates a public motorized launch (with a published fee) at Fox River Forest Preserve in Port Barrington. Verify park hours, stickers, and launch fees on each agency page the day you go.",
    ],
    officialLinks: [
      {
        name: "IDNR — Chain O' Lakes State Park",
        url: "https://dnr.illinois.gov/parks/park.chainolakes.html",
        lastVerified: VERIFIED,
      },
      {
        name: "Fox Waterway Agency",
        url: "https://foxwaterway.com/",
        lastVerified: "2026-11-14",
      },
      {
        name: "Fox Waterway Agency — Stickers",
        url: "https://foxwaterway.com/fwa-stickers/",
        lastVerified: "2026-11-14",
      },
      {
        name: "Fox Waterway Agency — User Fee Schedule",
        url: "https://foxwaterway.com/user-fee-schedule/",
        lastVerified: "2026-11-14",
      },
      {
        name: "Lake County Forest Preserves — Fox River Marina",
        url: "https://www.lcfpd.org/fox-river/",
        lastVerified: "2026-11-14",
      },
    ],
    destinationSlugs: ["chain-o-lakes"],
    isPublished: true,
  },
  {
    slug: "geneva-lake",
    name: "Geneva Lake",
    region: "wisconsin",
    state: "WI",
    overview: [
      "Geneva Lake is a deep inland lake in Walworth County, Wisconsin, commonly associated with the Lake Geneva area communities. Public boat access is managed by surrounding municipalities rather than a single lake authority.",
      "The Village of Fontana publishes official launch hours and fee schedules for its Lake Avenue public boat launch. Other shoreline communities maintain their own ramps and rules — always check the municipality that operates the launch you plan to use.",
    ],
    officialLinks: [
      {
        name: "Village of Fontana — Public Boat Launch",
        url: "https://vi.fontana.wi.gov/visit-fontana/launch/",
        lastVerified: VERIFIED,
      },
      {
        name: "Village of Williams Bay — Boat Launch & Beach",
        url: "https://www.williamsbay.org/1359/Boat-Launch-Beach",
        lastVerified: "2026-11-14",
      },
    ],
    destinationSlugs: ["lake-geneva"],
    isPublished: true,
  },
  {
    slug: "fox-river",
    name: "Fox River (Illinois)",
    region: "illinois",
    state: "IL",
    overview: [
      "The Fox River links the Chain O’ Lakes and continues south through Lake and McHenry counties as a managed recreational waterway. Fox Waterway Agency publishes maps, zone status, sticker requirements, and concern-reporting tools for the system — start there for current waterway rules.",
      "Public motorized access on the river includes the Lake County Forest Preserves Fox River Forest Preserve launch in Port Barrington (fee published by LCFPD; ramp hours and marina services are on that preserve page). Chain O’ Lakes State Park remains the free public launch FWA highlights for the broader system. Confirm stickers and fees on official pages before launching.",
      "This waterway page groups Fox River access tied to the Chain O’ Lakes destination. Individual launch pages carry the facility-level sources.",
    ],
    officialLinks: [
      {
        name: "Fox Waterway Agency",
        url: "https://foxwaterway.com/",
        lastVerified: "2026-11-14",
      },
      {
        name: "Fox Waterway Agency — Map",
        url: "https://foxwaterway.com/fwa-map/",
        lastVerified: "2026-11-14",
      },
      {
        name: "Lake County Forest Preserves — Fox River Marina",
        url: "https://www.lcfpd.org/fox-river/",
        lastVerified: "2026-11-14",
      },
      {
        name: "Lake County Forest Preserves — Paddling / Boat Launches",
        url: "https://www.lcfpd.org/things-to-do/recreation/boat-launches/",
        lastVerified: "2026-11-14",
      },
    ],
    destinationSlugs: ["chain-o-lakes"],
    isPublished: true,
  },
  {
    slug: "des-plaines-river",
    name: "Des Plaines River",
    region: "illinois",
    state: "IL",
    overview: [
      "The Des Plaines River is a primary paddling corridor through Cook and Will counties west and southwest of Chicago. Public canoe and kayak access is published by the Forest Preserves of Cook County (carry-in landings plus the Plank Road Meadow trailered launch at Riverside) and by the Forest Preserve District of Will County (Isle a la Cache and McKinley Woods — Frederick’s Grove).",
      "Cook County’s boating page lists Des Plaines River landings from Allison Woods south through Stony Ford, including Maywood Grove (home of the Greater Maywood Paddling Program) and accessible landings at Maywood Grove and Schuth’s Grove. District-wide flotation-device rules — including the stand-up paddleboard prohibition on FPDCC waterbodies — still apply. Will County lists canoe/kayak river access without a launch pass at designated preserves; paddleboards and float tubes are prohibited on district waters.",
      "River level, debris, and bridges change trip difficulty. Confirm current conditions and each landing’s launch type on the cited agency pages before you put in. Pair this waterway page with the forest-preserves hub and the inland paddling guide for county-by-county craft rules.",
    ],
    officialLinks: [
      {
        name: "Forest Preserves of Cook County — Boating, Canoeing & Kayaking",
        url: "https://fpdcc.com/things-to-do/boating-canoeing-kayaking/",
        lastVerified: "2026-11-14",
      },
      {
        name: "Forest Preserve District of Will County — Canoeing/Kayaking",
        url: "https://www.reconnectwithnature.org/activities/canoeing-kayaking",
        lastVerified: "2026-11-14",
      },
      {
        name: "Paddle Illinois Water Trails",
        url: "https://paddleillinoiswatertrails.org/",
        lastVerified: "2026-11-14",
      },
    ],
    destinationSlugs: ["chicago"],
    relatedPreserveSlugs: [
      "plank-road-meadow-des-plaines",
      "maywood-grove-des-plaines",
      "irving-park-road-canoe-landing",
      "schuths-grove-des-plaines",
      "allison-woods-des-plaines",
      "isle-a-la-cache-will",
      "mckinley-woods-frederick-will",
    ],
    isPublished: true,
  },
  {
    slug: "dupage-river",
    name: "DuPage River",
    region: "illinois",
    state: "IL",
    overview: [
      "The DuPage River offers suburban canoe and kayak trips in Will County’s forest-preserve system, with published put-ins at Hammel Woods (DuPage River Access and Route 59 Access in Shorewood), Riverview Farmstead Preserve in Naperville, and McKinley Woods — Kerry Sheridan Grove in Channahon.",
      "Will County’s canoeing/kayaking page states no launch pass is required at designated forest-preserve locations, and that unless otherwise posted canoes and kayaks may launch year-round except when ice is present. District boat launches close October 31. Swimming, wading, paddleboards, and float tubes are prohibited under district rules — persons must be entirely secured in watercraft.",
      "Upstream DuPage County forest-preserve waters are mostly inland lakes under a separate private-watercraft permit program (see Silver Lake at Blackwell and other DuPage sites on the forest-preserves hub). Use this waterway page for the river corridor itself, then confirm each Will County landing on the official paddling page before you go.",
    ],
    officialLinks: [
      {
        name: "Forest Preserve District of Will County — Canoeing/Kayaking",
        url: "https://www.reconnectwithnature.org/activities/canoeing-kayaking",
        lastVerified: "2026-11-14",
      },
      {
        name: "Forest Preserve District of DuPage County — Boating",
        url: "https://www.dupageforest.org/things-to-do/recreational-activities/boating",
        lastVerified: "2026-11-14",
      },
      {
        name: "Paddle Illinois Water Trails",
        url: "https://paddleillinoiswatertrails.org/",
        lastVerified: "2026-11-14",
      },
    ],
    destinationSlugs: ["chicago"],
    relatedPreserveSlugs: [
      "hammel-woods-dupage-will",
      "riverview-farmstead-dupage-will",
      "mckinley-woods-kerry-sheridan-will",
    ],
    isPublished: true,
  },
];
