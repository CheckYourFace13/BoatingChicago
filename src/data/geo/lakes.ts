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
      "Fox Waterway Agency publishes access guidance for boaters on the waterway, including confirmation that Chain O' Lakes State Park offers a free public launch while agency user-fee stickers apply to boats using the chain. Verify current sticker and park rules before launching.",
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
        lastVerified: VERIFIED,
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
      "Draft placeholder for Fox River corridor coverage beyond the Chain O' Lakes state park focus. The Fox River connects portions of the Chain and continues as a managed waterway under Fox Waterway Agency jurisdiction in relevant reaches.",
      "This lake/waterway entry is unpublished until we add verified destination and launch records with official municipal or agency sources.",
    ],
    officialLinks: [
      {
        name: "Fox Waterway Agency",
        url: "https://foxwaterway.com/",
        lastVerified: VERIFIED,
      },
    ],
    destinationSlugs: ["chain-o-lakes"],
    isPublished: false,
  },
];
