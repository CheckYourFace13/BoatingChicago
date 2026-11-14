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
];
