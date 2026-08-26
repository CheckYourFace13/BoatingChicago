import type { BoatLaunch } from "@/types/geo";

const VERIFIED = "2026-08-25";

/**
 * Verified public launches only. Fees and detailed amenity lists belong on the cited official page.
 */
export const launches: BoatLaunch[] = [
  {
    slug: "lincoln-boat-launch-montrose-harbor",
    name: "Lincoln Boat Launch — Montrose Harbor",
    destinationSlug: "chicago",
    lakeSlug: "lake-michigan-chicago",
    summary:
      "Chicago Park District motorized boat launch at Montrose Harbor on the north lakefront.",
    overview: [
      "Montrose is a common trailer-in staging area for north-lakefront day trips, fishing runs, and Playpen weekends when you are not leaving from a seasonal slip. The launch sits inside the Montrose Harbor / Lincoln Park corridor, so expect summer beach and harbor traffic on peak Saturdays.",
      "Treat the Chicago Park District facility page as the source of truth for access rules, contact numbers, and any seasonal notices. Pair that with Chicago Harbors information for the surrounding basin and National Weather Service marine products before you hitch up.",
      "Nearby planning pages on BoatingChicago: the Chicago destination overview, Montrose Harbor marina listing, and live weather for the Chicago lakefront.",
    ],
    amenityNotes:
      "Listed on the Chicago Park District boat launches directory; contact phone published on the facility page.",
    source: {
      name: "Chicago Park District — Lincoln Boat Launch Montrose Harbor",
      url: "https://www.chicagoparkdistrict.com/parks-facilities/lincoln-boat-launch-montrose-harbor",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "burnham-boat-launch-burnham-harbor",
    name: "Burnham Boat Launch — Burnham Harbor",
    destinationSlug: "chicago",
    lakeSlug: "lake-michigan-chicago",
    summary:
      "Chicago Park District boat launch serving Burnham Harbor near Museum Campus.",
    overview: [
      "Burnham Harbor is the largest basin in the Chicago Harbors system and a frequent departure point for Museum Campus, downtown skyline, and nearshore Lake Michigan trips. The Park District lists a dedicated boat launch here; Chicago Harbors’ Burnham page also describes a multi-lane ramp with trailer parking — confirm both pages before you go.",
      "Because Burnham sits next to heavy park and event traffic, build extra time for weekends, fireworks nights, and special events. Always verify current marine conditions; this launch puts you onto open nearshore water quickly.",
      "Useful next reads: Burnham Harbor marina page, Chicago destination guide, and Chicago boating weather.",
    ],
    amenityNotes:
      "Chicago Harbors’ Burnham page also notes a 3-lane launch ramp with trailer parking at this harbor — confirm current access on CPD/Chicago Harbors pages.",
    source: {
      name: "Chicago Park District — Burnham Boat Launch Burnham Harbor",
      url: "https://www.chicagoparkdistrict.com/parks-facilities/burnham-boat-launch-burnham-harbor",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "waukegan-harbor-launch-ramps",
    name: "Waukegan Harbor Launch Ramps",
    destinationSlug: "waukegan",
    lakeSlug: "lake-michigan-chicago",
    summary:
      "Public launch ramps at Waukegan Harbor & Marina. Daily and season pass fees are published on the marina’s official launch page.",
    overview: [
      "Waukegan is the primary public Lake Michigan trailer access north of Chicago’s Park District system for many Illinois boaters. The marina’s official launch-ramps page is where daily and season pass pricing is published — do not rely on third-party reprints.",
      "Plan the drive and ramp queue for peak summer mornings. Once launched, treat NWS marine products for the Illinois nearshore and local harbor notices as mandatory checks before running north or south along the shore.",
      "Continue with the Waukegan destination page, Waukegan Harbor marina listing, and weather for Waukegan Harbor.",
    ],
    amenityNotes:
      "Official launch page publishes daily and season pass pricing — check that page for current amounts before you go.",
    source: {
      name: "Waukegan Harbor — Launch Ramps",
      url: "https://waukeganharbor.com/launch-ramps/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "chain-o-lakes-state-park-launch",
    name: "Chain O' Lakes State Park Boat Launch",
    destinationSlug: "chain-o-lakes",
    lakeSlug: "chain-o-lakes",
    summary:
      "Public launch at Chain O' Lakes State Park in Spring Grove. Fox Waterway Agency and IDNR materials describe park launching with separate waterway user-fee sticker requirements for boats on the chain.",
    overview: [
      "The Chain is an inland system — different rules than Lake Michigan. Fox Waterway Agency materials explain where public launching is available and remind boaters that waterway user fees/stickers can apply even when a park launch itself has no ramp fee.",
      "Confirm park hours, capacity, and any temporary closures on IDNR / Chain O' Lakes State Park channels, then confirm Fox Waterway requirements before you trailer up. Weekends fill early in midsummer.",
      "See also: Chain O' Lakes destination page, Chain O' Lakes lake overview, and inland weather for the Chain.",
    ],
    amenityNotes:
      "IDNR park materials state there is no charge to launch at the park; Fox Waterway Agency user fees/stickers still apply for boats using the chain. Confirm both before launching.",
    source: {
      name: "Fox Waterway Agency — Where can I launch?",
      url: "https://foxwaterway.com/faq-items/where-can-i-launch-my-boat/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "fontana-public-boat-launch",
    name: "Fontana Public Boat Launch",
    destinationSlug: "lake-geneva",
    lakeSlug: "geneva-lake",
    summary:
      "Village of Fontana public boat launch on Lake Avenue (Geneva Lake). Official village page publishes resident and non-resident fee tables and notes 24-hour ramp access with an honor box when unstaffed.",
    overview: [
      "Fontana’s municipal launch is one of the clearest official public access points on Geneva Lake for trailered boats. The village publishes resident vs non-resident fee tables and parking guidance — use that page for current dollars and lot rules.",
      "Geneva Lake is inland and busy in peak season; local ordinances, no-wake areas, and rental traffic matter as much as the ramp itself. Confirm conditions and crowding expectations before a holiday weekend.",
      "Pair with the Lake Geneva destination page, Geneva Lake overview, and Lake Geneva weather location.",
    ],
    amenityNotes:
      "Paid launch includes parking guidance for Lot No. 4 per village page. Fee schedule is on the official launch page — do not rely on third-party reprints.",
    source: {
      name: "Village of Fontana — Public Boat Launch",
      url: "https://vi.fontana.wi.gov/visit-fontana/launch/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "mckinley-marina-boat-launch",
    name: "McKinley Marina Boat Launch",
    destinationSlug: "milwaukee",
    lakeSlug: "lake-michigan-chicago",
    summary:
      "Public launch at Milwaukee County’s McKinley Marina. County Parks states launch permits also cover South Shore Park, Bender Park, and Riverfront launch sites.",
    overview: [
      "McKinley Marina is Milwaukee County Parks’ primary lakefront marina and a common public launch for boaters working the Milwaukee harbor and nearshore Lake Michigan. County Parks publishes launch-permit rules and notes that a permit can cover multiple county launch sites — verify the current list on the official page.",
      "Launching onto Lake Michigan from Milwaukee still requires the same marine-forecast discipline as Chicago: wind, waves, and small-craft products can change the day quickly.",
      "Continue with the Milwaukee destination page, McKinley Marina listing, and Milwaukee lakefront weather.",
    ],
    amenityNotes:
      "Launch permits required; launching without a pass can result in a ticket per County Parks. Confirm current daily/season permit details on the official marina page.",
    source: {
      name: "Milwaukee County Parks — McKinley Marina",
      url: "https://county.milwaukee.gov/EN/Parks/Explore/Lakefront/McKinley-Marina",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
];
