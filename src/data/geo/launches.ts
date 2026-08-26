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
