import type { Marina } from "@/types/geo";

const VERIFIED = "2026-10-07";

/**
 * Published marinas with clear official websites only.
 * Amenities use available: null when not confirmed on the cited source.
 * Do not invent fees, slip counts, or hours here — link to the source.
 * seasonalAccessNote / hoursNote / feesNote must be harbor-specific — never
 * paste the same Chicago Harbors disclaimer onto non-Chicago operators.
 */
export const marinas: Marina[] = [
  {
    slug: "belmont-harbor",
    name: "Belmont Harbor",
    destinationSlug: "chicago",
    summary:
      "Lincoln Park harbor on Chicago’s north lakefront, known for sailing activity and proximity to Belmont Harbor Beach. Confirm slip, mooring, and guest rules on the official Chicago Harbors site before you plan overnight dockage.",
    officialWebsite: "https://www.chicagoharbors.info/harbors/",
    phone: "(312) 742-7673",
    amenities: [
      { key: "seasonal-mooring", available: true, note: "Seasonal moorings via Chicago Harbors" },
      { key: "fuel", available: null },
      { key: "pump-out", available: null },
      { key: "restrooms", available: null },
    ],
    seasonalAccessNote:
      "Belmont is part of the Chicago Harbors seasonal system. Use the Chicago Harbors calendar for the published mooring season and any guest-dock windows before planning an overnight at this Lincoln Park basin.",
    hoursNote:
      "Belmont Harbor office contact is (312) 742-7673. Staffed hours change with the season — call before you arrive rather than assuming daytime desk coverage.",
    feesNote:
      "Belmont slip and mooring fees are set by Chicago Harbors and can differ by residency and product type. Check the official harbors listing for current amounts; we do not reprint dollar figures.",
    source: {
      name: "Chicago Harbors — Harbors",
      url: "https://www.chicagoharbors.info/harbors/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "burnham-harbor",
    name: "Burnham Harbor",
    destinationSlug: "chicago",
    summary:
      "Largest harbor in the Chicago Harbors system on Museum Campus. Official harbor page lists fuel dock, complimentary pump-out, laundry, harbor store, transient dockage, and a multi-lane launch ramp.",
    officialWebsite: "https://www.chicagoharbors.info/harbors/burnham/",
    phone: "(312) 747-7009",
    amenities: [
      { key: "seasonal-mooring", available: true },
      { key: "fuel", available: true, note: "Fuel dock with gas and diesel (per harbor page)" },
      { key: "pump-out", available: true, note: "Complimentary pump-out (per harbor page)" },
      { key: "laundry", available: true },
      { key: "harbor-store", available: true },
      { key: "transient-dockage", available: true },
      { key: "boat-launch", available: true, note: "3-lane launch ramp (per harbor page)" },
      { key: "power-and-water", available: true, note: "Slips have power and water (per harbor page)" },
    ],
    seasonalAccessNote:
      "Burnham’s seasonal mooring and guest dockage follow Chicago Harbors’ published harbor season. Confirm launch-ramp and transient availability for your date on the Burnham harbor page before trailering to Museum Campus.",
    hoursNote:
      "Burnham Harbor desk: (312) 747-7009. Fuel dock, pump-out, store, and office hours are seasonal — verify on the Burnham page or by phone before you need services.",
    feesNote:
      "Burnham transient, seasonal, fuel, and launch fees are published by Chicago Harbors. Use the Burnham harbor page for current amounts; this guide does not reprint rates.",
    source: {
      name: "Chicago Harbors — Burnham",
      url: "https://www.chicagoharbors.info/harbors/burnham/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "monroe-harbor",
    name: "Monroe Harbor",
    destinationSlug: "chicago",
    summary:
      "Downtown mooring-can harbor at the foot of the Loop skyline — a classic Chicago overnight and day-stop setting. Fuel and pump-out are not confirmed on the overview page we cite; verify services on Chicago Harbors before you arrive.",
    officialWebsite: "https://www.chicagoharbors.info/harbors/",
    phone: "(312) 742-7643",
    amenities: [
      { key: "seasonal-mooring", available: true, note: "Mooring cans featured on harbors overview" },
      { key: "fuel", available: null },
      { key: "pump-out", available: null },
    ],
    seasonalAccessNote:
      "Monroe’s mooring-can program runs under Chicago Harbors’ seasonal schedule. Confirm can assignments, guest rules, and tender expectations for downtown approaches before you plan to hold overnight under the skyline.",
    hoursNote:
      "Monroe Harbor contact: (312) 742-7643. Do not assume fuel or pump-out at this basin — those services are unconfirmed on the overview we cite; call ahead for any service needs.",
    feesNote:
      "Monroe mooring fees are Chicago Harbors products. Check the official harbors listing for current pricing; we do not reprint dollar amounts.",
    source: {
      name: "Chicago Harbors — Harbors",
      url: "https://www.chicagoharbors.info/harbors/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "dusable-harbor",
    name: "DuSable Harbor",
    destinationSlug: "chicago",
    summary:
      "Slips close to Randolph Street and the downtown lakefront trail — convenient for Loop visitors who need a harbor base near Millennium Park. Confirm transient and seasonal options with Chicago Harbors; amenities beyond seasonal mooring remain unverified on our cited overview.",
    officialWebsite: "https://www.chicagoharbors.info/harbors/",
    phone: "(312) 742-3577",
    amenities: [
      { key: "seasonal-mooring", available: true },
      { key: "fuel", available: null },
      { key: "pump-out", available: null },
    ],
    seasonalAccessNote:
      "DuSable slips sit in the Chicago Harbors seasonal system near Randolph Street. Confirm whether your stay is seasonal or guest dockage and what downtown approach/no-wake rules apply for your arrival window.",
    hoursNote:
      "DuSable Harbor contact: (312) 742-3577. Beyond seasonal mooring, fuel and pump-out are not verified on the overview we cite — ask the harbor office what is available the day you arrive.",
    feesNote:
      "DuSable rates are published by Chicago Harbors. Use the official listing for current slip or guest fees rather than cached third-party numbers.",
    source: {
      name: "Chicago Harbors — Harbors",
      url: "https://www.chicagoharbors.info/harbors/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "montrose-harbor",
    name: "Montrose Harbor",
    destinationSlug: "chicago",
    summary:
      "North lakefront harbor beside Montrose Beach — a practical base for North Side day trips and fishing runs. Chicago Park District lists the Lincoln Boat Launch at Montrose Harbor; confirm launch fees and harbor rules on the official sources linked on this page.",
    officialWebsite: "https://www.chicagoharbors.info/harbors/",
    phone: "(312) 742-7527",
    amenities: [
      { key: "seasonal-mooring", available: true },
      { key: "fuel", available: null },
      { key: "pump-out", available: null },
      { key: "boat-launch", available: true, note: "Lincoln Boat Launch — Montrose Harbor listed by CPD" },
    ],
    seasonalAccessNote:
      "Montrose combines Chicago Harbors seasonal mooring with the Chicago Park District Lincoln Boat Launch at the same complex. Confirm harbor season dates and launch operating status separately before a trailer trip to Montrose Beach.",
    hoursNote:
      "Montrose Harbor desk: (312) 742-7527. Launch and harbor office hours can differ — check CPD launch information and the harbor phone for the same day you plan to use either.",
    feesNote:
      "Harbor mooring fees come from Chicago Harbors; launch fees follow Chicago Park District rules for Lincoln Boat Launch. Confirm each fee on the cited official sources.",
    source: {
      name: "Chicago Harbors — Harbors",
      url: "https://www.chicagoharbors.info/harbors/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "31st-street-harbor",
    name: "31st Street Harbor",
    destinationSlug: "chicago",
    summary:
      "South lakefront Chicago Harbors facility with slips the official overview describes as including metered electric, seasonal water, and internet access — useful planning context for south-side boaters. Confirm current rates and guest access on Chicago Harbors before arrival.",
    officialWebsite: "https://www.chicagoharbors.info/harbors/",
    phone: "(312) 225-6464",
    amenities: [
      { key: "seasonal-mooring", available: true },
      { key: "power", available: true, note: "Metered electric (per harbors overview)" },
      { key: "water", available: true, note: "Water with seasonal charge (per harbors overview)" },
      { key: "wifi", available: true, note: "Internet access (per harbors overview)" },
      { key: "fuel", available: null },
      { key: "pump-out", available: null },
    ],
    seasonalAccessNote:
      "31st Street Harbor follows Chicago Harbors’ seasonal calendar. Metered electric, seasonal water, and internet access are described on the harbors overview — confirm which utilities are live for your slip or guest stay.",
    hoursNote:
      "31st Street Harbor contact: (312) 225-6464. Fuel and pump-out are not verified on the overview we cite; call if you need those services before south-lakefront arrival.",
    feesNote:
      "Slip fees and any seasonal water/electric charges are Chicago Harbors products. Check the official harbors listing for current amounts.",
    source: {
      name: "Chicago Harbors — Harbors",
      url: "https://www.chicagoharbors.info/harbors/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "waukegan-harbor-marina",
    name: "Waukegan Harbor & Marina",
    destinationSlug: "waukegan",
    summary:
      "Public marina owned by the Waukegan Port District. Official site describes fuel pier, free pump-outs, launch ramps, washrooms/showers, laundry, fish cleaning stations, Wi-Fi, and 24-hour security.",
    officialWebsite: "https://waukeganharbor.com/",
    phone: "(847) 244-3133",
    amenities: [
      { key: "fuel", available: true },
      { key: "pump-out", available: true, note: "Free pump-outs (per marina site)" },
      { key: "boat-launch", available: true },
      { key: "restrooms", available: true },
      { key: "showers", available: true },
      { key: "laundry", available: true },
      { key: "fish-cleaning", available: true },
      { key: "wifi", available: true },
      { key: "security", available: true, note: "24-hour security (per marina site)" },
    ],
    seasonalAccessNote:
      "Waukegan Port District sets its own seasonal dockage and launch calendar — this is not a Chicago Harbors facility. Confirm current season dates and ramp access on waukeganharbor.com before an overnight or trailer trip.",
    hoursNote:
      "Waukegan Harbor & Marina: (847) 244-3133. Fuel pier, free pump-outs, and launch ramps are listed on the Port District site; verify desk and fuel hours for your arrival day.",
    feesNote:
      "Transient, seasonal, launch, and fuel prices are published by the Waukegan Port District. Use the marina website for current amounts.",
    source: {
      name: "Waukegan Harbor & Marina",
      url: "https://waukeganharbor.com/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "north-point-marina",
    name: "North Point Marina",
    destinationSlug: "winthrop-harbor",
    summary:
      "Illinois DNR North Point Marina State Recreation Area in Winthrop Harbor — IDNR describes a protected floating-dock system of 1,500 slips adjacent to Illinois Beach State Park.",
    officialWebsite: "https://dnr.illinois.gov/parks/park.northpointmarina.html",
    phone: "(847) 746-2845",
    amenities: [
      { key: "seasonal-mooring", available: true, note: "1,500 slips, 30–60 ft (per IDNR)" },
      {
        key: "power-and-water",
        available: true,
        note: "Electricity and water included in one-price slip rental (per IDNR about page)",
      },
      { key: "wifi", available: true, note: "Per IDNR about page" },
      { key: "pump-out", available: true, note: "Sanitary pump-outs (per IDNR about page)" },
      { key: "restrooms", available: true },
      { key: "showers", available: true },
      { key: "security", available: true, note: "24-hour security (per IDNR about page)" },
      { key: "parking", available: true, note: "Restricted parking (per IDNR about page)" },
    ],
    seasonalAccessNote:
      "North Point is an Illinois DNR State Recreation Area marina. Confirm IDNR seasonal dockage, gate access, and winter layup rules on the official park page before planning a Winthrop Harbor stay next to Illinois Beach State Park.",
    hoursNote:
      "North Point Marina: (847) 746-2845. IDNR describes electricity/water in one-price slip rental, sanitary pump-outs, Wi-Fi, and 24-hour security — verify office hours and gate access for your arrival.",
    feesNote:
      "Slip and related fees are set by Illinois DNR for North Point Marina. Check the IDNR park page for current pricing and any resident/nonresident distinctions.",
    source: {
      name: "IDNR — North Point Marina State Recreation Area",
      url: "https://dnr.illinois.gov/parks/park.northpointmarina.html",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "southport-marina",
    name: "Southport Marina",
    destinationSlug: "kenosha",
    summary:
      "Full-service marina in Kenosha’s Harbor Park. Official site lists slip rentals, service, winter storage, and downtown lakefront access.",
    officialWebsite: "https://spmarina.net/",
    phone: "(262) 657-5565",
    amenities: [
      { key: "seasonal-mooring", available: true, note: "Slips for boats from 30' to 80'+ (per marina site)" },
      { key: "service", available: true },
      { key: "winter-storage", available: true },
      { key: "fuel", available: null },
      { key: "pump-out", available: null },
    ],
    seasonalAccessNote:
      "Southport Marina in Kenosha Harbor Park publishes its own seasonal slip and winter-storage calendar. Confirm dockage dates and downtown Harbor Park access on spmarina.net before you commit to a Kenosha overnight.",
    hoursNote:
      "Southport Marina: (262) 657-5565. The site lists slip rentals, service, and winter storage; fuel and pump-out are not confirmed in our verified notes — ask the marina if you need those services.",
    feesNote:
      "Slip, service, and storage pricing come from Southport Marina. Use the official site for current amounts.",
    source: {
      name: "Southport Marina",
      url: "https://spmarina.net/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "reefpoint-marina",
    name: "Reefpoint Marina",
    destinationSlug: "racine",
    summary:
      "Racine County–owned lakefront marina at Len Ziolkowski Harbor Park, with a dedicated marina website for amenities and slip information.",
    officialWebsite: "https://reefpointmarina.org/",
    phone: "(262) 633-7171",
    amenities: [
      { key: "seasonal-mooring", available: true },
      { key: "pool", available: true, note: "Heated pool (per marina site)" },
      { key: "dog-friendly", available: true, note: "Dog-friendly areas (per marina site)" },
      { key: "fuel", available: null },
      { key: "pump-out", available: null },
    ],
    seasonalAccessNote:
      "Reefpoint is Racine County’s marina at Len Ziolkowski Harbor Park. Confirm seasonal slip availability and park access rules on reefpointmarina.org before a Racine overnight.",
    hoursNote:
      "Reefpoint Marina: (262) 633-7171. The marina site lists a heated pool and dog-friendly areas; fuel and pump-out remain unverified in our notes — call if those services matter for your trip.",
    feesNote:
      "Slip and amenity fees are published by Reefpoint Marina / Racine County. Check the marina website for current pricing.",
    source: {
      name: "Reefpoint Marina",
      url: "https://reefpointmarina.org/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "mckinley-marina",
    name: "McKinley Marina",
    destinationSlug: "milwaukee",
    summary:
      "Milwaukee County’s public lakefront marina. County Parks pages describe floating docks, fuel docks with pump-out, ships store, restrooms/showers, and launch permits covering multiple county sites.",
    officialWebsite:
      "https://county.milwaukee.gov/EN/Parks/Explore/Lakefront/McKinley-Marina",
    phone: "(414) 273-5224",
    amenities: [
      { key: "seasonal-mooring", available: true, note: "655 slips (per Milwaukee County Parks)" },
      { key: "fuel", available: true },
      { key: "pump-out", available: true },
      { key: "ships-store", available: true },
      { key: "restrooms", available: true },
      { key: "showers", available: true },
      { key: "boat-launch", available: true, note: "Launch permits required (per County Parks)" },
      { key: "power-and-water", available: true },
      { key: "parking", available: true },
      { key: "security", available: true },
    ],
    seasonalAccessNote:
      "McKinley Marina is a Milwaukee County Parks facility with 655 slips listed by the county. Confirm seasonal dockage and county launch-permit rules before a Milwaukee lakefront arrival.",
    hoursNote:
      "McKinley Marina: (414) 273-5224. County Parks describe fuel with pump-out, ships store, and restrooms/showers — verify fuel dock and office hours for the day you need them.",
    feesNote:
      "Slip, fuel, and launch-permit fees are Milwaukee County Parks products. Use the County Parks McKinley page for current amounts.",
    source: {
      name: "Milwaukee County Parks — McKinley Marina",
      url: "https://county.milwaukee.gov/EN/Parks/Explore/Lakefront/McKinley-Marina",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "washington-park-marina",
    name: "Washington Park Marina",
    destinationSlug: "michigan-city",
    summary:
      "Flagship wet-slip marina of the Michigan City Port Authority. Official services pages list fuel dock, pump-out with fuel purchase, bathhouses, laundry, and fish cleaning facilities.",
    officialWebsite: "https://www.mcmarina.org/",
    phone: "(219) 872-1712",
    amenities: [
      { key: "seasonal-mooring", available: true },
      { key: "transient-dockage", available: true },
      { key: "fuel", available: true, note: "Diesel and alcohol-free gasoline (per MCPA services page)" },
      {
        key: "pump-out",
        available: true,
        note: "Free pump-out with fuel purchase (per MCPA services page)",
      },
      { key: "restrooms", available: true, note: "Air-conditioned bathhouses (per MCPA)" },
      { key: "showers", available: true },
      { key: "laundry", available: true },
      { key: "fish-cleaning", available: true },
      { key: "wifi", available: null },
    ],
    seasonalAccessNote:
      "Washington Park Marina is the Michigan City Port Authority flagship wet-slip basin. Confirm seasonal and transient dockage windows on mcmarina.org before a Michigan City overnight.",
    hoursNote:
      "Washington Park Marina: (219) 872-1712. MCPA lists diesel and alcohol-free gasoline, free pump-out with fuel purchase, bathhouses, laundry, and fish cleaning — verify fuel-dock hours before you depend on them.",
    feesNote:
      "Transient, seasonal, and fuel pricing come from the Michigan City Port Authority. Use mcmarina.org for current amounts.",
    source: {
      name: "Michigan City Port Authority",
      url: "https://www.mcmarina.org/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "new-buffalo-municipal-marina",
    name: "New Buffalo Municipal Marina",
    destinationSlug: "new-buffalo",
    summary:
      "City of New Buffalo transient marina at 100 W. Water Street. Official city page lists guest slips, VHF 9/16 monitoring, shore power, water, and bathrooms with showers.",
    officialWebsite: "https://cityofnewbuffalomi.gov/municipal-marina/",
    phone: "(269) 469-3574",
    amenities: [
      { key: "transient-dockage", available: true, note: "30 guest slips (per city page)" },
      { key: "power", available: true, note: "30 or 50 amp shore power (per city page)" },
      { key: "water", available: true },
      { key: "restrooms", available: true },
      { key: "showers", available: true },
      { key: "fuel", available: null },
      { key: "pump-out", available: null },
    ],
    seasonalAccessNote:
      "New Buffalo Municipal Marina is a city transient facility with 30 guest slips listed on the city page. Confirm seasonal operating dates and slip availability before a stop at 100 W. Water Street.",
    hoursNote:
      "New Buffalo Municipal Marina: (269) 469-3574. The city lists VHF 9/16 monitoring, 30/50 amp shore power, water, and bathrooms with showers; fuel and pump-out are not confirmed on the page we cite.",
    feesNote:
      "Guest-slip fees are published by the City of New Buffalo. Check the municipal marina page for current rates.",
    source: {
      name: "City of New Buffalo — Municipal Marina",
      url: "https://cityofnewbuffalomi.gov/municipal-marina/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
];
