import type { BoatLaunch } from "@/types/geo";

const VERIFIED = "2026-10-07";
const CPD_VERIFIED = "2026-11-14";

const CPD_FEES =
  "Launch fees, permits, and any residency distinctions are published by the Chicago Park District. Use the official facility page for current amounts — we do not reprint dollar figures that go stale.";
const CPD_SEASONAL =
  "Chicago Park District launch access follows seasonal facility schedules. Confirm current open status on the cited Park District facility page before you hitch up.";

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
    seasonalAccessNote:
      "Chicago Park District launch access follows seasonal facility schedules. Confirm current open status on the cited Park District facility page before you hitch up.",
    feesNote:
      "Launch fees, permits, and any residency distinctions are published by the operating agency. Use the official facility page for current amounts — we do not reprint dollar figures that go stale.",
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
    seasonalAccessNote:
      "Chicago Park District launch access follows seasonal facility schedules. Confirm current open status on the cited Park District facility page before you hitch up.",
    feesNote:
      "Launch fees, permits, and any residency distinctions are published by the operating agency. Use the official facility page for current amounts — we do not reprint dollar figures that go stale.",
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
    seasonalAccessNote:
      "Confirm seasonal ramp hours and weather closures on the cited official launch page before you go.",
    feesNote:
      "Daily, season-pass, and related fees — including resident vs nonresident distinctions when published — are defined by the operator. Check the official page for current amounts.",
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
    seasonalAccessNote:
      "Confirm seasonal ramp hours and weather closures on the cited official launch page before you go.",
    feesNote:
      "Daily, season-pass, and related fees — including resident vs nonresident distinctions when published — are defined by the operator. Check the official page for current amounts.",
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
    seasonalAccessNote:
      "Confirm seasonal ramp hours, ice/weather closures, and honor-box procedures on the Village of Fontana launch page before you go.",
    feesNote:
      "Resident and non-resident fee tables are published on the Village of Fontana public launch page. Use that page for current amounts — we do not reprint dollar figures that go stale.",
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
    seoTitle: "McKinley Marina Boat Launch | Milwaukee Permit Required",
    seoDescription:
      "Milwaukee County Parks public launch at McKinley Marina. A launch permit is required; County Parks states the same permit also covers South Shore Park, Bender Park, and Riverfront sites. Confirm current rules on the official page.",
    summary:
      "Public launch at Milwaukee County’s McKinley Marina. County Parks states a launch permit is required, and that permit also covers South Shore Park, Bender Park, and Riverfront launch sites.",
    overview: [
      "McKinley Marina is Milwaukee County Parks’ primary lakefront marina and a common public launch for boaters working the Milwaukee harbor and nearshore Lake Michigan. County Parks publishes launch-permit rules and notes that a permit can cover multiple county launch sites — verify the current list on the official page.",
      "Launching onto Lake Michigan from Milwaukee still requires the same marine-forecast discipline as Chicago: wind, waves, and small-craft products can change the day quickly.",
      "Continue with the Milwaukee destination page, McKinley Marina listing, and Milwaukee lakefront weather.",
    ],
    amenityNotes:
      "Launch permits required; launching without a pass can result in a ticket per County Parks. Confirm current daily/season permit details on the official marina page.",
    seasonalAccessNote:
      "Confirm seasonal ramp hours and weather closures on the cited official launch page before you go.",
    feesNote:
      "Daily, season-pass, and related fees — including resident vs nonresident distinctions when published — are defined by the operator. Check the official page for current amounts.",
    source: {
      name: "Milwaukee County Parks — McKinley Marina",
      url: "https://county.milwaukee.gov/EN/Parks/Explore/Lakefront/McKinley-Marina",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "burnham-boat-launch-31st-street-harbor",
    name: "Burnham Boat Launch — 31st Street Harbor",
    destinationSlug: "chicago",
    lakeSlug: "lake-michigan-chicago",
    summary:
      "Chicago Park District boat launch at 31st Street Harbor in Burnham Park on the south lakefront.",
    overview: [
      "The Park District lists this launch at 3155 S. Jean-Baptiste Pointe DuSable Lake Shore Drive inside Burnham Park, with a published contact phone on the facility page. It is a separate CPD listing from the Burnham Harbor launch farther north at Museum Campus.",
      "31st Street Harbor is part of the Chicago Harbors south-lakefront system — confirm basin rules and any seasonal notices on Chicago Harbors as well as the CPD facility page before you hitch up.",
      "Pair with the Chicago destination overview, Burnham Harbor marina listing when relevant, and Chicago lakefront weather.",
    ],
    amenityNotes:
      "Listed on the Chicago Park District boat launches directory; address and phone published on the facility page.",
    seasonalAccessNote: CPD_SEASONAL,
    feesNote: CPD_FEES,
    source: {
      name: "Chicago Park District — Burnham Boat Launch 31st Street Harbor",
      url: "https://www.chicagoparkdistrict.com/parks-facilities/burnham-boat-launch-31st-street-harbor",
      lastVerified: CPD_VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "lincoln-boat-launch-diversey-harbor",
    name: "Lincoln Boat Launch — Diversey Harbor",
    destinationSlug: "chicago",
    lakeSlug: "lake-michigan-chicago",
    summary:
      "Chicago Park District boat launch at Diversey Harbor in Lincoln Park on the north lakefront.",
    overview: [
      "CPD lists this launch at 2601 N. Cannon Drive inside Lincoln Park, with a published contact phone. The directory also lists separate Diversey Harbor Steps access — treat each facility page as its own source of truth.",
      "Diversey Harbor sits in a busy Lincoln Park corridor; build extra time for weekend beach and path traffic, and verify marine conditions before running onto Lake Michigan.",
      "Continue with the Chicago destination page, nearby north-harbor marina listings, and Chicago boating weather.",
    ],
    amenityNotes:
      "Listed on the Chicago Park District boat launches directory; address and phone published on the facility page.",
    seasonalAccessNote: CPD_SEASONAL,
    feesNote: CPD_FEES,
    source: {
      name: "Chicago Park District — Lincoln Boat Launch Diversey Harbor",
      url: "https://www.chicagoparkdistrict.com/parks-facilities/lincoln-boat-launch-diversey-harbor",
      lastVerified: CPD_VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "calumet-boat-launch-north",
    name: "Calumet Boat Launch — North",
    destinationSlug: "chicago",
    lakeSlug: "lake-michigan-chicago",
    summary:
      "Chicago Park District boat launch at Calumet Park on the far south lakefront (North listing).",
    overview: [
      "CPD publishes Calumet Boat Launch — North at 9801 S. Ave G in Calumet Park, with phone (312) 747-6039 on the facility page. A separate South listing shares the same park corridor — confirm which ramp you need on the official directory.",
      "Far-south lakefront access puts you onto Lake Michigan near the Calumet industrial waterfront. Verify NWS marine products and any harbor or channel notices before you go.",
      "See also: Chicago destination guide and Chicago lakefront weather.",
    ],
    amenityNotes:
      "Listed on the Chicago Park District boat launches directory; address and phone published on the facility page.",
    seasonalAccessNote: CPD_SEASONAL,
    feesNote: CPD_FEES,
    source: {
      name: "Chicago Park District — Calumet Boat Launch North",
      url: "https://www.chicagoparkdistrict.com/parks-facilities/calumet-boat-launch-north",
      lastVerified: CPD_VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "calumet-boat-launch-south",
    name: "Calumet Boat Launch — South",
    destinationSlug: "chicago",
    lakeSlug: "lake-michigan-chicago",
    summary:
      "Chicago Park District boat launch at Calumet Park on the far south lakefront (South listing).",
    overview: [
      "CPD publishes Calumet Boat Launch — South at 9801 S. Avenue G in Calumet Park, with phone (312) 747-6039. Use the South facility page when that is the ramp you intend — do not assume North and South are interchangeable without checking the directory.",
      "Confirm current open status and any temporary notices on the cited CPD page, then check marine weather for the Illinois nearshore.",
      "Related: Calumet North launch page, Chicago destination overview, weather hub.",
    ],
    amenityNotes:
      "Listed on the Chicago Park District boat launches directory; address and phone published on the facility page.",
    seasonalAccessNote: CPD_SEASONAL,
    feesNote: CPD_FEES,
    source: {
      name: "Chicago Park District — Calumet Boat Launch South",
      url: "https://www.chicagoparkdistrict.com/parks-facilities/calumet-boat-launch-south",
      lastVerified: CPD_VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "jackson-boat-launch-63rd-street-beach",
    name: "Jackson Boat Launch — 63rd Street Beach",
    destinationSlug: "chicago",
    lakeSlug: "lake-michigan-chicago",
    summary:
      "Chicago Park District boat launch at 63rd Street Beach in Jackson Park on the south lakefront.",
    overview: [
      "CPD lists this launch at 6300 S. Jean-Baptiste Pointe DuSable Lake Shore Drive in Jackson Park, with phone (773) 256-0903. The district directory also lists a separate Jackson Inner Harbor launch — confirm which facility matches your trip.",
      "63rd Street Beach is a busy south-lakefront park corridor in summer. Verify open status on the CPD page and marine conditions before launching onto Lake Michigan.",
      "Pair with the Chicago destination page and lakefront weather.",
    ],
    amenityNotes:
      "Listed on the Chicago Park District boat launches directory; address and phone published on the facility page.",
    seasonalAccessNote: CPD_SEASONAL,
    feesNote: CPD_FEES,
    source: {
      name: "Chicago Park District — Jackson Boat Launch 63rd Street Beach",
      url: "https://www.chicagoparkdistrict.com/parks-facilities/jackson-boat-launch-63rd-street-beach",
      lastVerified: CPD_VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "leone-beach-boat-launch",
    name: "Leone Beach Boat Launch",
    destinationSlug: "chicago",
    lakeSlug: "lake-michigan-chicago",
    summary:
      "Chicago Park District boat launch at Leone Beach Park on the far north lakefront near Touhy Avenue.",
    overview: [
      "CPD lists Leone Beach Boat Launch at 1222 W. Touhy Ave. in Leone Beach Park, with phone (773) 262-8605. It is one of the northernmost Park District lakefront launch listings in Chicago.",
      "Confirm current facility status on the CPD page before you tow, and check NWS marine products for the Illinois nearshore — far-north lakefront conditions can differ from downtown basins the same morning.",
      "Continue with the Chicago destination overview and weather hub.",
    ],
    amenityNotes:
      "Listed on the Chicago Park District boat launches directory; address and phone published on the facility page.",
    seasonalAccessNote: CPD_SEASONAL,
    feesNote: CPD_FEES,
    source: {
      name: "Chicago Park District — Leone Beach Boat Launch",
      url: "https://www.chicagoparkdistrict.com/parks-facilities/leone-beach-boat-launch",
      lastVerified: CPD_VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "rainbow-beach-boat-launch",
    name: "Rainbow Beach Boat Launch",
    destinationSlug: "chicago",
    lakeSlug: "lake-michigan-chicago",
    summary:
      "Chicago Park District boat launch at Rainbow Beach Park on the south lakefront.",
    overview: [
      "CPD lists Rainbow Beach Boat Launch at 3111 East 77th St. in Rainbow Beach Park, with phone (312) 745-1479. Treat the facility page as the source of truth for access and contact details.",
      "South-lakefront launches put you onto open nearshore water quickly — verify marine forecasts and any temporary park notices before you hitch up.",
      "See also: Chicago destination guide and Chicago boating weather.",
    ],
    amenityNotes:
      "Listed on the Chicago Park District boat launches directory; address and phone published on the facility page.",
    seasonalAccessNote: CPD_SEASONAL,
    feesNote: CPD_FEES,
    source: {
      name: "Chicago Park District — Rainbow Beach Boat Launch",
      url: "https://www.chicagoparkdistrict.com/parks-facilities/rainbow-beach-boat-launch",
      lastVerified: CPD_VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "northerly-island-boat-launch-12th-street-beach",
    name: "Northerly Island Boat Launch — 12th Street Beach",
    destinationSlug: "chicago",
    lakeSlug: "lake-michigan-chicago",
    summary:
      "Chicago Park District boat launch at 12th Street Beach on Northerly Island near Museum Campus.",
    overview: [
      "CPD lists this launch at 1521 S. Linn White Dr. in Northerly Island Park, with phone (312) 745-2910. It sits in the Museum Campus / Northerly Island corridor south of Adler Planetarium.",
      "Expect park and event traffic on peak weekends. Confirm open status on the CPD facility page and check marine weather before launching onto Lake Michigan.",
      "Related: Burnham Harbor launch and marina pages, Chicago destination overview, weather hub.",
    ],
    amenityNotes:
      "Listed on the Chicago Park District boat launches directory; address and phone published on the facility page.",
    seasonalAccessNote: CPD_SEASONAL,
    feesNote: CPD_FEES,
    source: {
      name: "Chicago Park District — Northerly Island Boat Launch 12th Street Beach",
      url: "https://www.chicagoparkdistrict.com/parks-facilities/northerly-island-boat-launch-12th-street-beach",
      lastVerified: CPD_VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "clark-richard-boat-launch",
    name: "Clark (Richard) Boat Launch",
    destinationSlug: "chicago",
    summary:
      "Chicago Park District boat launch at Clark Park on the North Branch of the Chicago River (not a Lake Michigan lakefront ramp).",
    overview: [
      "CPD lists Clark (Richard) Boat Launch at 3400 N. Rockwell St. inside Clark Park. The district’s boat-launches directory covers both Lake Michigan and Chicago River sites — this one is a river access listing.",
      "River rules, traffic, and hazards differ from open Lake Michigan. Confirm current access on the CPD facility page and use river-appropriate planning before you go.",
      "For suburban paddling lakes with electric-only rules, see the forest-preserve hub; for lakefront ramps, use the Lake Michigan filter on the launches index.",
    ],
    amenityNotes:
      "Listed on the Chicago Park District boat launches directory; address published on the facility page.",
    seasonalAccessNote: CPD_SEASONAL,
    feesNote: CPD_FEES,
    source: {
      name: "Chicago Park District — Clark (Richard) Boat Launch",
      url: "https://www.chicagoparkdistrict.com/parks-facilities/clark-richard-boat-launch",
      lastVerified: CPD_VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "ping-tom-boat-launch",
    name: "Ping Tom Boat Launch",
    destinationSlug: "chicago",
    summary:
      "Chicago Park District launch at Ping Tom Memorial Park on the South Branch — CPD states it is for kayaks and non-motorized boats.",
    overview: [
      "CPD lists Ping Tom Boat Launch at 200–322 West 18th Street in Tom (Ping) Memorial Park. The facility page description states it is for kayaks and non-motorized boats — do not trailer a motorized craft here expecting a Lake Michigan-style ramp.",
      "Confirm current access on the CPD page before you go. For trailered Lake Michigan launches, use the lakefront listings on this site or the official CPD boat-launches directory.",
      "Paddlers planning suburban preserve waters can also start at the forest-preserve hub.",
    ],
    amenityNotes:
      "CPD facility description states: for kayaks and non-motorized boats. Address published on the facility page.",
    seasonalAccessNote: CPD_SEASONAL,
    feesNote: CPD_FEES,
    source: {
      name: "Chicago Park District — Ping Tom Boat Launch",
      url: "https://www.chicagoparkdistrict.com/parks-facilities/ping-tom-boat-launch",
      lastVerified: CPD_VERIFIED,
    },
    isPublished: true,
  },
];
