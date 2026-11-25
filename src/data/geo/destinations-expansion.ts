import type { Destination } from "@/types/geo";

/** Verified 2026-11-25 against cited municipal / agency pages. */
const VERIFIED = "2026-11-25";

/**
 * Lake Michigan depth expansion — Green Bay / Door County / WI north shore,
 * Indiana Hammond, and western / northern Michigan harbors.
 * Merge with core destinations via src/data/geo/index.ts.
 */
export const destinationsExpansion: Destination[] = [
  {
    slug: "manitowoc",
    name: "Manitowoc",
    region: "wisconsin",
    state: "WI",
    bodyOfWater: "Lake Michigan",
    summary:
      "A Lake Michigan harbor city north of Sheboygan where Manitowoc Marina operates deep-water slips and a six-lane launch ramp under City of Manitowoc harbor oversight.",
    overview: [
      "Manitowoc sits on Wisconsin’s western Lake Michigan shore between Sheboygan and Two Rivers / Kewaunee. Recreational boaters mainly use the small-boat harbor around Maritime Drive, where Manitowoc Marina provides seasonal and transient dockage plus a public launch ramp that also serves as a gateway to the Manitowoc River.",
      "Planning distances: the driving distance from downtown Chicago is about 165 miles for trailer boaters. That figure is road distance only — not a navigable Lake Michigan route. Continue north from Sheboygan only when marine forecasts and daylight support an open-lake or harbor-hopping day.",
      "The City of Manitowoc’s Docks & Harbor page describes short-term municipal docks on the Manitowoc River (six-hour maximum at listed locations; no overnight on the City Hall tie-up) and directs overnight or full-service needs to Manitowoc Marina at 920-682-5117. The Port of Manitowoc lists Manitowoc Marina with deep-water floating slips, fuel, pump-out context via the marina operator, and a six-lane launch ramp.",
      "Manitowoc Marina’s launch-ramp page lists a six-lane ramp with complimentary truck-and-trailer parking when you buy a launch pass, daily and seasonal pass amounts, and hours for the ship’s store. Confirm current fees, fuel dock hours, and transient availability directly with the marina before you tow — we do not treat third-party reprints as current.",
      "This is exposed Lake Michigan once you clear the breakwater. Use the Manitowoc weather anchor on BoatingChicago for the nearest NWS point forecast; pair it with official harbor contacts rather than assuming Chicago marine zones apply here.",
    ],
    highlights: [
      "Manitowoc Marina — deep-water slips and six-lane launch (operator pages)",
      "City short-term river docks (six-hour max at listed sites)",
      "Launch pass required at the marina ramp — amounts on marina page",
      "~165 driving miles from Chicago (trailer planning only)",
    ],
    officialLinks: [
      {
        name: "City of Manitowoc — Docks & Harbor",
        url: "https://www.manitowoc.org/363/Docks-Harbor",
        lastVerified: VERIFIED,
      },
      {
        name: "Manitowoc Marina",
        url: "https://www.manitowoc-marina.com/",
        lastVerified: VERIFIED,
      },
      {
        name: "Manitowoc Marina — Launch Ramp",
        url: "https://www.manitowoc-marina.com/launch-ramp/",
        lastVerified: VERIFIED,
      },
      {
        name: "Port of Manitowoc — Manitowoc Marina",
        url: "https://portofmanitowoc.com/port-businesses/manitowoc-marina/",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "manitowoc",
    coordinates: { lat: 44.092, lng: -87.655 },
    distanceFromChicagoMiles: 165,
    isPublished: true,
    nearbyDestinationSlugs: ["sheboygan", "port-washington", "green-bay", "sturgeon-bay"],
  },
  {
    slug: "green-bay",
    name: "Green Bay",
    region: "wisconsin",
    state: "WI",
    bodyOfWater: "Green Bay / Lake Michigan",
    summary:
      "Fox River mouth access to lower Green Bay — City of Green Bay Metro Boat Launch with ten lanes, plus free kayak/canoe landings listed by the city.",
    overview: [
      "Green Bay is the large western arm of Lake Michigan. Most Chicago-area visitors who trailer here are aiming for the Fox River mouth and lower bay, not an open-lake crossing from Illinois. The City of Green Bay operates the Metro Boat Launch at 102 Bay Beach Road with a large multi-lane ramp complex at the river’s mouth.",
      "Planning distances: about 205 driving miles from downtown Chicago. That is trailer/road distance only. Water distances across Lake Michigan or up the west shore are a separate planning problem and must come from charts and NOAA distance tables — we do not invent a “Chicago to Green Bay” navigable shortcut.",
      "The city’s Metro Boat Launch facility page lists in-season daily and annual launch fees (VenTek pay station), notes when docks are installed or winterized, and states that annual passes also work at listed Brown County, De Pere, and Wrightstown launches for the calendar year purchased. Confirm current dollar amounts and dock status on that page the week you travel.",
      "Separate kayak and canoe launches downtown, at Porlier Pier, Olde Main East River, and the Shipyard are listed as open seven days a week with no launch fee. Several are described as ADA accessible. These are river/harbor paddling accesses — not substitutes for checking bay wave and wind conditions before leaving protected water.",
      "Private marinas near the river mouth (including facilities marketed as South Bay Marina) may offer seasonal or transient slips and fuel; verify operator websites and phone numbers before counting on overnight dockage. BoatingChicago’s Green Bay weather anchor resolves the nearest NWS point forecast for the harbor area.",
    ],
    highlights: [
      "Metro Boat Launch — 102 Bay Beach Road (City of Green Bay)",
      "Ten-lane motorboat ramp with published daily/annual fees",
      "Free city kayak/canoe launches listed downtown and on the East River",
      "~205 driving miles from Chicago (trailer planning only)",
    ],
    officialLinks: [
      {
        name: "City of Green Bay — Metro Boat Launch",
        url: "https://www.greenbaywi.gov/Facilities/Facility/Details/Green-Bay-Metro-Boat-Launch-88",
        lastVerified: VERIFIED,
      },
      {
        name: "Brown County Parks",
        url: "https://www.browncountywi.gov/community/parks/",
        lastVerified: VERIFIED,
      },
      {
        name: "USGS — Fox River at Oil Tank Depot, Green Bay (040851385)",
        url: "https://waterdata.usgs.gov/monitoring-location/040851385/",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "green-bay",
    coordinates: { lat: 44.529, lng: -88.005 },
    distanceFromChicagoMiles: 205,
    isPublished: true,
    nearbyDestinationSlugs: ["sturgeon-bay", "door-county", "oshkosh", "menominee", "sheboygan"],
  },
  {
    slug: "sturgeon-bay",
    name: "Sturgeon Bay",
    region: "wisconsin",
    state: "WI",
    bodyOfWater: "Sturgeon Bay / Green Bay / Lake Michigan",
    summary:
      "Door County’s canal city — Sawyer Park’s six-lane launch, Sunset Park ramps, and Stone Harbor Marina seasonal slips published by the City of Sturgeon Bay.",
    overview: [
      "Sturgeon Bay is the working gateway to Door County: a canal and bay system that connects Green Bay waters to Lake Michigan. Trailer boaters and cruisers both use city ramps and the small municipal marina rather than treating every Door County village as a separate launch town.",
      "Planning distances: about 230 driving miles from downtown Chicago. Driving miles are for trailering; open-lake or bay water routes are chart work and are not reprinted here as invented tracks.",
      "The City of Sturgeon Bay Parks & Recreation boat-launches page describes Sawyer Park Boat Launch (intersection of Neenah and East Oak) as a six-lane ramp with restrooms/showers, fish cleaning stations, dockmaster building, lighted trailer parking, and two-hour transient docking. Sunset Park Launching Ramp at 747 North 3rd Avenue has two ramps and a lighted parking lot with no transient docking. Daily and seasonal launch passes are sold at Sawyer Park (kiosk/dockmaster/envelopes) or the Park & Recreation Department; the city publishes resident and non-resident seasonal amounts — confirm them on the official page before you go.",
      "Stone Harbor Marina (city-managed, east side of the Michigan Street Bridge) has 21 seasonal slips with power and water. Four slips allow four-hour transient docking on a first-come basis; the city states no overnight docking on those transient slips. Call 920-746-2912 for waitlist and marina details.",
      "Wisconsin DNR lake pages list additional landings in the Sturgeon Bay / Green Bay area (including Potawatomi State Park access). Use DNR and city pages together, and expect Door County Parks permits at county park launches elsewhere on the peninsula — see the Door County destination hub for peninsula context.",
    ],
    highlights: [
      "Sawyer Park — six-lane launch with showers and fish cleaning",
      "Sunset Park — two-lane launch, no transient docks",
      "Stone Harbor Marina — 21 seasonal slips; 4-hour transient only",
      "~230 driving miles from Chicago (trailer planning only)",
    ],
    officialLinks: [
      {
        name: "City of Sturgeon Bay — Boat Launches",
        url: "https://www.sturgeonbaywi.org/departments/parks___recreation/boat_launches.php",
        lastVerified: VERIFIED,
      },
      {
        name: "City of Sturgeon Bay — Marina",
        url: "https://www.sturgeonbaywi.org/community/marina.php",
        lastVerified: VERIFIED,
      },
      {
        name: "Wisconsin DNR — Sturgeon Bay boating",
        url: "https://apps.dnr.wi.gov/lakes/lakepages/LakeDetail.aspx?page=boating&wbic=88",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "sturgeon-bay",
    coordinates: { lat: 44.834, lng: -87.377 },
    distanceFromChicagoMiles: 230,
    isPublished: true,
    nearbyDestinationSlugs: ["door-county", "green-bay", "manitowoc"],
  },
  {
    slug: "door-county",
    name: "Door County",
    region: "wisconsin",
    state: "WI",
    bodyOfWater: "Green Bay / Lake Michigan",
    summary:
      "Peninsula hub for Door County boating — use Sturgeon Bay city facilities as the verified municipal core, then confirm county park launches and village marinas on official operator pages.",
    overview: [
      "Door County is a peninsula between Green Bay and Lake Michigan, with villages from Sturgeon Bay north through Egg Harbor, Fish Creek, Ephraim, Sister Bay, Baileys Harbor, and out to Washington Island. Exposure changes by shore: the Green Bay side is often more protected than the open Lake Michigan shore, but neither is “safe by reputation” — check the local marine forecast every trip.",
      "Planning distances: Sturgeon Bay is about 230 driving miles from Chicago; northern peninsula towns add more road miles. Those are trailer distances. Crossing the lake or running the peninsula by water requires charts and is not something BoatingChicago invents as a route.",
      "For verified municipal detail, start with the Sturgeon Bay destination page (Sawyer Park, Sunset Park, Stone Harbor Marina). Many other peninsula launches sit in Door County parks or private marinas. Tourism directories (including Destination Door County’s boat-launches list) name county parks such as George K. Pinney, Robert M. Carmody, Chaudoir’s Dock, Frank E. Murphy, Lily Bay, and Sugar Creek and note that county launch permits apply at those parks — confirm permits, fees, and open status with Door County Parks (dcparks@co.door.wi.us / 920-746-9959 as published on that directory) before you tow.",
      "Do not expect overnight transient dockage at every village. Stone Harbor’s city marina explicitly limits transient slips to four hours. Private marinas and yacht clubs along the peninsula publish their own seasonal and transient rules — link only from operator sites when you need a slip.",
      "This page is a planning hub, not a thin page for every village name. When a municipality publishes enough distinct launch and marina detail, it gets its own destination guide (Sturgeon Bay first). Egg Harbor, Fish Creek, Ephraim, Sister Bay, Baileys Harbor, and Washington Island remain research targets until each has verified facility depth.",
    ],
    highlights: [
      "Peninsula between Green Bay and open Lake Michigan",
      "Sturgeon Bay city launches and Stone Harbor Marina (verified)",
      "County park launches require Door County permits (confirm with Parks)",
      "Village marinas — use operator pages; no invented availability",
    ],
    officialLinks: [
      {
        name: "City of Sturgeon Bay — Boat Launches",
        url: "https://www.sturgeonbaywi.org/departments/parks___recreation/boat_launches.php",
        lastVerified: VERIFIED,
      },
      {
        name: "Destination Door County — Boat Launches directory",
        url: "https://www.doorcounty.com/experience/boating-sailing-paddling/boat-launches/",
        lastVerified: VERIFIED,
      },
      {
        name: "Wisconsin DNR — Sturgeon Bay boating",
        url: "https://apps.dnr.wi.gov/lakes/lakepages/LakeDetail.aspx?page=boating&wbic=88",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "sturgeon-bay",
    coordinates: { lat: 45.05, lng: -87.28 },
    distanceFromChicagoMiles: 245,
    isPublished: true,
    nearbyDestinationSlugs: ["sturgeon-bay", "green-bay", "manitowoc"],
  },
  {
    slug: "hammond",
    name: "Hammond",
    region: "indiana",
    state: "IN",
    bodyOfWater: "Lake Michigan",
    summary:
      "South-shore Lake Michigan marina closest to Chicago by water — Hammond Port Authority’s Thomas M. McDermott, Sr. Hammond Marina with a published May 1–October 15 season.",
    overview: [
      "Hammond sits on Indiana’s Lake Michigan shore just southeast of Chicago. For many Chicago boaters it is a short water run rather than a long trailer day: the marina’s own site states it is 12 nautical miles from downtown Chicago. That figure is the marina’s published water distance — not a driving-mile claim.",
      "Driving distance from downtown Chicago is roughly 25 miles depending on route. Use driving miles for trailering and the marina’s 12 nm figure for water planning; do not mix them.",
      "The Thomas M. McDermott, Sr. Hammond Marina at 701 Casino Center Drive is operated with the Hammond Port Authority. The official marina site lists fuel dock, ship store & deli, beach access, winter storage information, Clean Marina status, and a boating season of May 1–October 15. Call 219-659-7678 for slip information and confirm services for your date — we do not invent transient availability.",
      "Indiana DNR Lake Michigan fishing guidance notes that launch and entrance fees are common at Indiana shore ramps from Michigan City west to Hammond. Pair Hammond Marina planning with Michigan City Port Authority pages when you are comparing south-shore options.",
      "Industrial shoreline, breakwalls, and shipping traffic are part of this coast. Check NWS marine products for the Chicago nearshore / Indiana shore before leaving the basin.",
    ],
    highlights: [
      "Hammond Marina — 701 Casino Center Drive (Port Authority)",
      "Marina-published 12 nm to downtown Chicago",
      "Season listed May 1–October 15 on marina site",
      "Fuel dock and winter storage pages on official site",
    ],
    officialLinks: [
      {
        name: "Hammond Marina",
        url: "https://www.hammondmarina.com/",
        lastVerified: VERIFIED,
      },
      {
        name: "IDEM — Find an Indiana Marina",
        url: "https://www.in.gov/idem/lakemichigan/resources/find-an-indiana-marina",
        lastVerified: VERIFIED,
      },
      {
        name: "Indiana DNR — Lake Michigan shoreline fishing overview (PDF)",
        url: "https://www.in.gov/dnr/fish-and-wildlife/files/fw-fishing_lake_michigan.pdf",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "hammond",
    coordinates: { lat: 41.698, lng: -87.511 },
    distanceFromChicagoMiles: 25,
    isPublished: true,
    nearbyDestinationSlugs: ["chicago", "michigan-city", "new-buffalo"],
  },
  {
    slug: "muskegon",
    name: "Muskegon",
    region: "michigan",
    state: "MI",
    bodyOfWater: "Muskegon Lake / Lake Michigan",
    summary:
      "West Michigan harbor city where Muskegon Lake connects to Lake Michigan — City launch ramps (up to 30′) and Hartshorn Municipal Marina slips and moorings.",
    overview: [
      "Muskegon is built around Muskegon Lake, a large drowned-river-mouth lake with a dredged channel to Lake Michigan. Most trailer launching happens on the lake side; clearing the channel puts you on open Lake Michigan. Treat channel and pier-head conditions as their own hazard in onshore seas.",
      "Planning distances: about 190 driving miles from downtown Chicago. That is road distance for trailering. Water distance from Chicago is a multi-day Lake Michigan passage for most recreational boats and is not summarized here as a casual day trip.",
      "The City of Muskegon’s Launch Ramps and Marina page lists four city ramps on Muskegon Lake that accommodate boats up to 30 feet on single or double-axle trailers: Fisherman’s Landing (501 E. Western Ave., four ramps plus camping amenities), Hartshorn Launch Ramp (1050 W Western Ave.), Grand Trunk (2090 Lakeshore Dr., two ramps), and Jaycees / Cottage Grove (2912 Lakeshore Dr., closest city ramp to Lake Michigan). Passes are required year-round; daily and annual amounts and discount rules are published on that page — confirm before you tow.",
      "Hartshorn Marina is the city’s public marina on Muskegon Lake (Division and Western / 920 W Western Ave.). City materials describe seasonal docking, moorings, launch ramps, restrooms/showers, power and water, VHF 09, and a pump-out cart. Operations are privately contracted; use hartshornmarina.com and the city parks pages for current slip and launch details.",
      "Michigan DNR’s Central Lake Michigan unit page also lists Snug Harbor access inside Muskegon State Park and shore-fishing sites along the Lake Michigan channel. State park rules and Recreation Passport requirements apply at park sites.",
    ],
    highlights: [
      "Four city Muskegon Lake ramps (≤30′ boats per city)",
      "Hartshorn Municipal Marina — slips, moorings, launch",
      "Channel to Lake Michigan — check pier-head conditions",
      "~190 driving miles from Chicago (trailer planning only)",
    ],
    officialLinks: [
      {
        name: "City of Muskegon — Launch Ramps and Marina",
        url: "https://muskegon-mi.gov/city-services/public-works/launch-ramps-and-marina/",
        lastVerified: VERIFIED,
      },
      {
        name: "City of Muskegon — Hartshorn Marina",
        url: "https://muskegon-mi.gov/parks/hartshorn-marina-2/",
        lastVerified: VERIFIED,
      },
      {
        name: "Hartshorn Marina (operator)",
        url: "https://www.hartshornmarina.com/",
        lastVerified: VERIFIED,
      },
      {
        name: "Michigan DNR — Central Lake Michigan access notes",
        url: "https://www.michigan.gov/dnr/managing-resources/fisheries/units/c-michigan",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "muskegon",
    coordinates: { lat: 43.231, lng: -86.27 },
    distanceFromChicagoMiles: 190,
    isPublished: true,
    nearbyDestinationSlugs: ["grand-haven", "holland", "ludington"],
  },
  {
    slug: "ludington",
    name: "Ludington",
    region: "michigan",
    state: "MI",
    bodyOfWater: "Pere Marquette Lake / Lake Michigan",
    summary:
      "Pere Marquette Lake harbor with City of Ludington Municipal Marina and Harbor View Marina, plus the Loomis Street multi-lane Lake Michigan launch.",
    overview: [
      "Ludington’s recreational harbor sits on Pere Marquette Lake, connected to Lake Michigan by a short channel. The City of Ludington operates Ludington Municipal Marina and Harbor View Marina with a published season of April 15–October 15 and VHF monitoring on channels 09 and 16.",
      "Planning distances: about 250 driving miles from downtown Chicago. Use that for trailering only. Water passages from southern Lake Michigan are overnight or multi-day for most recreational boats.",
      "City marina FAQs describe Ludington Municipal Marina on Pere Marquette Lake (Loomis and William Streets area) with seasonal and transient slips, floating and permanent piers, and broadside dockage for larger vessels. Transient and seasonal rates follow Michigan State Waterways Commission schedules. Reservations are by phone after April 15 (231-843-9611 for LMM); the city states transient reservations are not taken online or in the off-season. Confirm depths with the marina office — the FAQ notes about 7 feet at the entrance at the time of publication.",
      "The Loomis Street Boat Ramps at the west end of Ludington Avenue provide direct Lake Michigan access: the city lists four docks allowing eight launching ramps, restrooms, a fish cleaning station, and parking, with daily payment at a parking kiosk and seasonal resident/non-resident rates. Another public launch is noted on Pere Marquette Lake off Washington Avenue — confirm both on city pages.",
      "Harbor View Marina (400 South Rath Avenue area) is also city-managed. Call the published marina numbers for which basin fits your trip. Outside the piers, Lake Michigan here is open water with ferry and commercial traffic in the approaches — use local marine forecasts.",
    ],
    highlights: [
      "Ludington Municipal Marina — seasonal/transient slips (city)",
      "Harbor View Marina — city-managed basin on Pere Marquette Lake",
      "Loomis Street — eight Lake Michigan launch lanes",
      "~250 driving miles from Chicago (trailer planning only)",
    ],
    officialLinks: [
      {
        name: "City of Ludington — Municipal Marina",
        url: "https://www.ludington.mi.us/220/Municipal-Marina/",
        lastVerified: VERIFIED,
      },
      {
        name: "City of Ludington — Boat Ramps",
        url: "https://www.ludington.mi.us/396/Boat-Ramps",
        lastVerified: VERIFIED,
      },
      {
        name: "Michigan DNR — Boating",
        url: "https://www.michigan.gov/dnr/things-to-do/boating",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "ludington",
    coordinates: { lat: 43.953, lng: -86.452 },
    distanceFromChicagoMiles: 250,
    isPublished: true,
    nearbyDestinationSlugs: ["muskegon", "grand-haven", "traverse-city"],
  },
  {
    slug: "traverse-city",
    name: "Traverse City",
    region: "michigan",
    state: "MI",
    bodyOfWater: "Grand Traverse Bay / Lake Michigan",
    summary:
      "Grand Traverse Bay municipal harbor — City of Traverse City’s Duncan L. Clinch Marina with transient slips via Michigan DNR reservations and a published launch ramp at the marina’s east end.",
    overview: [
      "Traverse City sits at the head of the West Arm of Grand Traverse Bay, a large northern Lake Michigan embayment. Boating here is bay and nearshore work with different fetch than the open eastern Lake Michigan shore, but strong north winds still build steep seas in the bay.",
      "Planning distances: about 320 driving miles from downtown Chicago — still inside BoatingChicago’s approximate 400 driving-mile inland/trailer planning radius, and well within full Lake Michigan shoreline coverage. Driving miles are not water miles.",
      "Duncan L. Clinch Marina (111 E. Grandview Parkway) is owned by the City of Traverse City and operated under Michigan State Waterways Commission policies. The city lists transient slips, seasonal slips, Boardman River slips, a fuel dock with seasonal hours, and a boat launch at the east end of the marina. Transient reservations go through the Michigan DNR system (midnrreservations.com or 800-447-2757); unreserved slips are first-come. The published operating season is generally May 15–October 20.",
      "Launch fees for boats not registered at the marina are published on the city’s Launch Ramp Fees page (daily, seasonal, commercial, and senior seasonal). Trailers must stay attached to a vehicle; overnight trailer parking in the marina area is prohibited. Metered vehicle-with-trailer spaces and off-site trailer parking rules are on the Rules & Regulations page — read them before you tow into Clinch Park.",
      "Pair Clinch Marina planning with the Traverse City weather anchor. This guide does not invent “safe to boat” calls for Grand Traverse Bay.",
    ],
    highlights: [
      "Duncan L. Clinch Marina — city / State Waterways facility",
      "Transient reservations via Michigan DNR system",
      "East-end launch ramp with published fees",
      "~320 driving miles from Chicago (trailer planning only)",
    ],
    officialLinks: [
      {
        name: "City of Traverse City — Duncan L. Clinch Marina",
        url: "https://www.traversecitymi.gov/government/city-departments/duncan-l-clinch-marina/duncan-l-clinch-marina.html",
        lastVerified: VERIFIED,
      },
      {
        name: "Clinch Marina — Rules & Regulations",
        url: "https://www.traversecitymi.gov/government/city-departments/duncan-l-clinch-marina/rules-and-regulations.html",
        lastVerified: VERIFIED,
      },
      {
        name: "Clinch Marina — Launch Ramp Fees",
        url: "https://www.traversecitymi.gov/government/city-departments/duncan-l-clinch-marina/launch-ramp-fees.html",
        lastVerified: VERIFIED,
      },
      {
        name: "Michigan DNR — Boating reservations",
        url: "https://www.michigan.gov/dnr/things-to-do/boating",
        lastVerified: VERIFIED,
      },
    ],
    relatedGuideSlugs: ["lake-michigan-boating-guide"],
    weatherLocationId: "traverse-city",
    coordinates: { lat: 44.763, lng: -85.622 },
    distanceFromChicagoMiles: 320,
    isPublished: true,
    nearbyDestinationSlugs: ["ludington", "muskegon", "grand-haven"],
  },
];
