export interface PermitSource {
  state: string;
  title: string;
  blurb: string;
  url: string;
  agency: string;
  lastChecked: string;
}

/** Official agency hubs only — never a substitute for the live page. */
export const PERMIT_SOURCES: PermitSource[] = [
  {
    state: "Illinois",
    title: "Watercraft registration & boating safety",
    blurb:
      "IDNR publishes registration, titles, and the Illinois boating-safety certificate requirement for motorboat operators born on or after January 1, 1998.",
    url: "https://dnr.illinois.gov/boating.html",
    agency: "Illinois Department of Natural Resources",
    lastChecked: "2026-11-25",
  },
  {
    state: "Illinois",
    title: "Fox Waterway Agency stickers",
    blurb:
      "FWA states boats on the Chain O’ Lakes must display a current agency sticker and publishes class-based fees and temporary permits.",
    url: "https://foxwaterway.com/",
    agency: "Fox Waterway Agency",
    lastChecked: "2026-11-25",
  },
  {
    state: "Wisconsin",
    title: "Boat registration and before you operate",
    blurb:
      "Wisconsin DNR covers motorized registration, AIS drain-and-inspect rules, and boating-safety certification for operators born on or after January 1, 1989.",
    url: "https://dnr.wisconsin.gov/permits/registrations/boat/BeforeYouOperate.html",
    agency: "Wisconsin Department of Natural Resources",
    lastChecked: "2026-11-25",
  },
  {
    state: "Indiana",
    title: "Boating and watercraft",
    blurb:
      "Indiana DNR publishes watercraft registration, public-access sites, and statewide operating rules. Confirm ramp status before you tow.",
    url: "https://www.in.gov/dnr/outdoor-recreation/boating/",
    agency: "Indiana Department of Natural Resources",
    lastChecked: "2026-11-25",
  },
  {
    state: "Michigan",
    title: "Boating programs",
    blurb:
      "Michigan.gov / DNR boating pages cover registration, safety, and public-access information for Lake Michigan ports in this directory.",
    url: "https://www.michigan.gov/dnr/things-to-do/boating",
    agency: "Michigan Department of Natural Resources",
    lastChecked: "2026-11-25",
  },
];
