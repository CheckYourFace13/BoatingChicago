import type { Marina } from "@/types/geo";

const VERIFIED = "2026-11-25";

export const marinasExpansion: Marina[] = [
  {
    slug: "port-washington-municipal-marina",
    name: "Port Washington Municipal Marina",
    destinationSlug: "port-washington",
    summary:
      "City of Port Washington marina at 106 N. Lake Street — transient reservations, fuel, pump-out, and a six-lane launch listed on city marina pages.",
    officialWebsite: "https://www.portwashingtonwi.gov/departments/marina",
    phone: "(262) 284-6606",
    amenities: [
      { key: "transient-dockage", available: true, note: "Advance reservations (city)" },
      { key: "fuel", available: true, note: "Gasoline and diesel (city accommodations page)" },
      { key: "pump-out", available: true, note: "On the fuel pier (city)" },
      { key: "power", available: true, note: "30- and 50-amp slips (city)" },
      { key: "restrooms", available: true },
      { key: "showers", available: true },
      { key: "laundry", available: true },
      { key: "boat-launch", available: true, note: "Six-lane launch ramp (city)" },
      { key: "fish-cleaning", available: true },
    ],
    seasonalAccessNote:
      "City materials list the marina season as April 1–November 1. Confirm transient availability and courtesy-dock rules before arrival.",
    hoursNote:
      "Call (262) 284-6606. City pages list VHF 16 and 9 in season.",
    feesNote:
      "Transient, launch, and fuel pricing are published by the City of Port Washington. Use the marina rates page for current amounts.",
    source: {
      name: "City of Port Washington — Marina",
      url: "https://www.portwashingtonwi.gov/departments/marina",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "harbor-centre-marina-sheboygan",
    name: "Harbor Centre Marina",
    destinationSlug: "sheboygan",
    summary:
      "City of Sheboygan marina at 821 Broughton Drive beside Deland Park — transient reservation requests, fuel dock, and deep-water access listed by the city.",
    officialWebsite: "https://www.sheboyganwi.gov/330/Harbor-Centre-Marina",
    phone: "(920) 458-6665",
    amenities: [
      { key: "transient-dockage", available: true, note: "Online reservation requests (city)" },
      { key: "fuel", available: true, note: "89-octane gasoline and diesel (city)" },
      { key: "pump-out", available: true },
      { key: "power", available: true, note: "30- and 50-amp (city)" },
      { key: "wifi", available: true },
      { key: "laundry", available: true },
      { key: "restrooms", available: true },
    ],
    seasonalAccessNote:
      "Confirm Harbor Centre and Riverfront Marina seasonal hours and fuel-dock windows with guest services before arrival.",
    hoursNote:
      "Guest service desk: (920) 458-6665. Fuel and pump-out hours differ by marina — verify the day you need them.",
    feesNote:
      "Transient and fuel pricing come from the City of Sheboygan. Use the Harbor Centre page for current amounts.",
    source: {
      name: "City of Sheboygan — Harbor Centre Marina",
      url: "https://www.sheboyganwi.gov/330/Harbor-Centre-Marina",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "manitowoc-marina",
    name: "Manitowoc Marina",
    destinationSlug: "manitowoc",
    summary:
      "Full-service Lake Michigan marina at 425 Maritime Drive with deep-water floating slips and a six-lane launch ramp listed by the operator and Port of Manitowoc.",
    officialWebsite: "https://www.manitowoc-marina.com/",
    phone: "(920) 682-5117",
    amenities: [
      { key: "seasonal-mooring", available: true, note: "Deep-water floating slips (operator/Port)" },
      { key: "transient-dockage", available: true },
      { key: "boat-launch", available: true, note: "Six-lane ramp (operator)" },
      { key: "fuel", available: true, note: "Fuel dock referenced by operator" },
      { key: "restrooms", available: true },
      { key: "showers", available: true },
      { key: "laundry", available: true },
      { key: "winter-storage", available: true, note: "Indoor heated and outdoor (operator)" },
      { key: "service", available: true },
      { key: "ships-store", available: true },
    ],
    seasonalAccessNote:
      "Confirm seasonal and transient dockage directly with Manitowoc Marina. City short-term river docks are separate and limited to six hours at listed locations.",
    hoursNote:
      "Operator lists ship’s store hours that vary by day; call (920) 682-5117.",
    feesNote:
      "Slip, launch, and service fees are set by Manitowoc Marina. Use the operator site; we do not reprint amounts that change.",
    source: {
      name: "Manitowoc Marina",
      url: "https://www.manitowoc-marina.com/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "stone-harbor-marina-sturgeon-bay",
    name: "Stone Harbor Marina",
    destinationSlug: "sturgeon-bay",
    summary:
      "City of Sturgeon Bay 21-slip seasonal marina east of the Michigan Street Bridge — four-hour transient docking only on four designated slips.",
    officialWebsite: "https://www.sturgeonbaywi.org/community/marina.php",
    phone: "(920) 746-2912",
    amenities: [
      { key: "seasonal-mooring", available: true, note: "21 seasonal slips (city)" },
      {
        key: "transient-dockage",
        available: true,
        note: "Four slips, four-hour max, no overnight (city)",
      },
      { key: "power", available: true, note: "30-amp; three slips 50-amp (city)" },
      { key: "water", available: true },
      { key: "restrooms", available: true },
    ],
    seasonalAccessNote:
      "Seasonal slips are waitlisted through Parks & Recreation. Transient slips are first-come and explicitly day-use only.",
    hoursNote:
      "Parks office: (920) 746-2912, weekdays hours published on the marina page.",
    feesNote:
      "Seasonal slip and launch-pass pricing are published by the City of Sturgeon Bay. Confirm on city pages.",
    source: {
      name: "City of Sturgeon Bay — Marina",
      url: "https://www.sturgeonbaywi.org/community/marina.php",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "hammond-marina",
    name: "Hammond Marina",
    destinationSlug: "hammond",
    summary:
      "Thomas M. McDermott, Sr. Hammond Marina at 701 Casino Center Drive — Hammond Port Authority facility listing fuel, ship store, beach, and May 1–October 15 season.",
    officialWebsite: "https://www.hammondmarina.com/",
    phone: "(219) 659-7678",
    amenities: [
      { key: "seasonal-mooring", available: true },
      { key: "transient-dockage", available: null, note: "Confirm slip products with marina office" },
      { key: "fuel", available: true, note: "Fuel dock (marina site)" },
      { key: "ships-store", available: true, note: "Ship store & deli (marina site)" },
      { key: "winter-storage", available: true, note: "Winter storage page on marina site" },
    ],
    seasonalAccessNote:
      "Marina site lists a May 1–October 15 boating season. Confirm slip availability by phone before arrival.",
    hoursNote:
      "Marina office (219) 659-7678; security (219) 473-0591.",
    feesNote:
      "Slip and winter-storage pricing are published by Hammond Marina / Port Authority. Use the official site.",
    source: {
      name: "Hammond Marina",
      url: "https://www.hammondmarina.com/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "hartshorn-marina",
    name: "Hartshorn Marina",
    destinationSlug: "muskegon",
    summary:
      "City of Muskegon’s public marina on Muskegon Lake — seasonal slips and moorings, launch ramps, restrooms/showers, power and water, VHF 09, privately contracted operations.",
    officialWebsite: "https://www.hartshornmarina.com/",
    phone: "(231) 724-4100",
    amenities: [
      { key: "seasonal-mooring", available: true, note: "Slips and moorings (city/operator)" },
      { key: "boat-launch", available: true, note: "Launch ramps at marina (city)" },
      { key: "power-and-water", available: true },
      { key: "restrooms", available: true },
      { key: "showers", available: true },
      { key: "pump-out", available: true, note: "Pump-out cart on site (city)" },
    ],
    seasonalAccessNote:
      "City pages describe seasonal docking and moorings. Confirm operating dates with Hartshorn Marina / City of Muskegon.",
    hoursNote:
      "City DPW launch/marina supervisor contact via (231) 724-4100; operator site for slip desk hours.",
    feesNote:
      "City launch-pass schedule and Hartshorn operator 2026 slip/mooring rate pages list current amounts (daily/seasonal launch; seasonal slips; daily/weekly/monthly mooring). Confirm on muskegon-mi.gov launch-fees page and hartshornmarina.com slip-rates before arrival — do not rely on third-party copies.",
    source: {
      name: "City of Muskegon — Hartshorn Marina",
      url: "https://muskegon-mi.gov/parks/hartshorn-marina-2/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "ludington-municipal-marina",
    name: "Ludington Municipal Marina",
    destinationSlug: "ludington",
    summary:
      "City of Ludington marina on Pere Marquette Lake — seasonal and transient slips with State Waterways rates; phone reservations after April 15.",
    officialWebsite: "https://www.ludington.mi.us/220/Municipal-Marina/",
    phone: "(231) 843-9611",
    amenities: [
      { key: "seasonal-mooring", available: true },
      { key: "transient-dockage", available: true, note: "Phone reservations after April 15 (city FAQ)" },
      { key: "power", available: true, note: "30-amp; some 50-amp (city FAQ)" },
      { key: "water", available: true },
      { key: "fuel", available: true, note: "Fuel dock referenced in city recreation plan / marina materials" },
      { key: "pump-out", available: true },
      { key: "restrooms", available: true },
      { key: "showers", available: true },
      { key: "laundry", available: true },
      { key: "fish-cleaning", available: true },
    ],
    seasonalAccessNote:
      "City lists April 15–October 15. Transient reservations are not taken online or in the off-season per city FAQ.",
    hoursNote:
      "In-season desk (231) 843-9611; monitor VHF 09/16. Hours vary spring/fall — call ahead.",
    feesNote:
      "Seasonal and transient rates follow Michigan State Waterways Commission schedules published for the marina. Confirm with the marina office.",
    source: {
      name: "City of Ludington — Municipal Marina",
      url: "https://www.ludington.mi.us/220/Municipal-Marina/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "duncan-l-clinch-marina",
    name: "Duncan L. Clinch Marina",
    destinationSlug: "traverse-city",
    summary:
      "City of Traverse City marina on West Grand Traverse Bay — transient slips via Michigan DNR reservations, seasonal slips, fuel dock, and east-end launch ramp.",
    officialWebsite:
      "https://www.traversecitymi.gov/government/city-departments/duncan-l-clinch-marina/duncan-l-clinch-marina.html",
    phone: "(231) 922-4903",
    amenities: [
      { key: "seasonal-mooring", available: true },
      {
        key: "transient-dockage",
        available: true,
        note: "Reserve via Michigan DNR system (city)",
      },
      { key: "fuel", available: true, note: "Fuel dock with seasonal hours (city)" },
      { key: "boat-launch", available: true, note: "East end of marina (city)" },
      { key: "restrooms", available: null },
      { key: "power", available: null },
    ],
    seasonalAccessNote:
      "City rules list a general season of May 15–October 20. Boats may not dock when the marina is closed.",
    hoursNote:
      "Seasonal dockhouse (231) 922-4903; dockmaster (231) 922-4906. Fuel-dock hours vary by season on the city hours page.",
    feesNote:
      "Transient rates follow Michigan DNR State Waterways schedules. Launch fees for non-registered boats are on the city’s Launch Ramp Fees page.",
    source: {
      name: "City of Traverse City — Duncan L. Clinch Marina",
      url: "https://www.traversecitymi.gov/government/city-departments/duncan-l-clinch-marina/duncan-l-clinch-marina.html",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
];
