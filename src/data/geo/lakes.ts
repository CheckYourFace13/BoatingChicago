import type { Lake, SourceRef } from "@/types/geo";

const VERIFIED = "2026-08-25";
const INLAND_VERIFIED = "2026-11-18";

const WI_BOAT_REGISTRATION: SourceRef = {
  name: "Wisconsin DNR — Boat registration & operating requirements",
  url: "https://dnr.wisconsin.gov/permits/registrations/boat/BeforeYouOperate.html",
  lastVerified: INLAND_VERIFIED,
};

const WI_AIS_TRANSPORT: SourceRef = {
  name: "Wisconsin DNR — Boat transportation & aquatic invasive species laws",
  url: "https://dnr.wisconsin.gov/topic/Invasives/boat",
  lastVerified: INLAND_VERIFIED,
};

const IL_WATERCRAFT_REGISTRATION: SourceRef = {
  name: "IDNR — Watercraft registration FAQ",
  url: "https://dnr.illinois.gov/boating/watercraft-frequently-asked-questions.html",
  lastVerified: INLAND_VERIFIED,
};

export const lakes: Lake[] = [
  {
    slug: "lake-michigan-chicago",
    name: "Lake Michigan",
    region: "illinois",
    state: "IL",
    overview: [
      "Lake Michigan is the defining open-water body for BoatingChicago coverage — the full shoreline across Illinois, Wisconsin, Indiana, and Michigan, not just the Chicago lakefront. Chicago Park District harbors and launches remain the primary local hub; Waukegan and Winthrop Harbor continue the Illinois shore toward Wisconsin, with published destination guides continuing around the lake through Green Bay, Door County, and Michigan’s west coast to Traverse City.",
      "Nearshore conditions can change quickly. Boaters should rely on National Weather Service marine forecasts and local observations for the harbor they are actually using rather than skyline appearance alone. Harbor season dates, slip rules, and launch listings come from each operator’s official pages.",
      "This lake entry groups published Lake Michigan destinations for navigation and related-content linking. Individual destination pages carry harbor-specific official links and weather anchors. Driving miles on those pages are trailer-planning figures; NOAA water-route distances are cited separately when available.",
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
      "port-washington",
      "sheboygan",
      "manitowoc",
      "green-bay",
      "sturgeon-bay",
      "door-county",
      "michigan-city",
      "hammond",
      "new-buffalo",
      "st-joseph",
      "south-haven",
      "saugatuck",
      "holland",
      "grand-haven",
      "muskegon",
      "ludington",
      "traverse-city",
      "egg-harbor",
      "sister-bay",
      "baileys-harbor",
      "washington-island",
      "charlevoix",
      "petoskey",
      "mackinaw-city",
      "beaver-island",
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
    relatedPreserveSlugs: ["fox-river-shores-kane", "jon-j-duerr-kane", "fabyan-kane"],
    isPublished: true,
  },
  {
    slug: "des-plaines-river",
    name: "Des Plaines River",
    region: "illinois",
    state: "IL",
    overview: [
      "The Des Plaines River is a primary paddling corridor through Cook and Will counties west and southwest of Chicago. Public canoe and kayak access is published by the Forest Preserves of Cook County (carry-in landings plus the Plank Road Meadow trailered launch at Riverside) and by the Forest Preserve District of Will County (Isle a la Cache and McKinley Woods — Frederick’s Grove).",
      "Cook County’s boating page lists Des Plaines River landings from Allison Woods (Milwaukee Ave & Winkleman Rd) south through Stony Ford, including Irving Park Road Canoe Landing in Schiller Park, Northwestern Woods in Des Plaines, Maywood Grove (home of the Greater Maywood Paddling Program), Schuth’s Grove near Riverside, Columbia Woods, Dam No. 2 Woods, and the Plank Road Meadow trailered launch at Ogden Ave east of 1st Ave. FPDCC lists Maywood Grove and Schuth’s Grove among accessible canoe landings with accessible parking and a paved path to a stable landing surface.",
      "District-wide flotation-device rules — including the stand-up paddleboard prohibition on FPDCC waterbodies — still apply on Cook County preserve waters. Will County lists canoe/kayak river access without a launch pass at Isle a la Cache (Romeoville) and McKinley Woods — Frederick’s Grove (Channahon, Des Plaines River and I&M Canal); paddleboards and float tubes are prohibited on Will County forest-preserve waters, and district boat launches close October 31.",
      "River level, debris, and bridges change trip difficulty. Confirm current conditions and each landing’s launch type on the cited agency pages before you put in. Standalone planning pages remain for Plank Road Meadow, Maywood Grove, and Isle a la Cache; other Cook/Will landings on this corridor are summarized here and on the forest-preserves hub so you can compare put-ins without thin duplicate pages.",
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
      "Hammel Woods is the corridor’s primary dual-access stop (two published Shorewood put-ins on the same preserve). Riverview Farmstead and Kerry Sheridan Grove extend trip options upstream and downstream; treat each landing’s parking and bank conditions as site-specific and confirm on the official Will County paddling page the day you go.",
      "Upstream DuPage County forest-preserve waters are mostly inland lakes under a separate private-watercraft permit program (see Silver Lake at Blackwell and other DuPage sites on the forest-preserves hub). Use this waterway page for the river corridor itself; Hammel Woods keeps a standalone planning page, while Riverview and Kerry Sheridan are listed here to avoid thin duplicate pages.",
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
  // ---------------------------------------------------------------------------
  // Inland lakes and waterways within roughly 400 driving miles (expand as verified).
  // Driving distances are approximate from downtown Chicago; confirm your route.
  // ---------------------------------------------------------------------------
  {
    slug: "delavan-lake",
    name: "Delavan Lake",
    region: "wisconsin",
    state: "WI",
    overview: [
      "Delavan Lake is a Walworth County, Wisconsin, lake roughly 90 driving miles northwest of downtown Chicago, just across the state line. The Wisconsin DNR lake profile lists it at 1,906 acres with a maximum depth of 52 feet, and notes public boat landings and a public beach. Fish the DNR lists include panfish, musky, largemouth and smallmouth bass, northern pike, and walleye.",
      "The DNR lists four public boat landings on Delavan Lake: access at the end of Blue Gill Court, access off State Highway 50, a Shore Road access, and 400 Inlet Shore Drive. The Town of Delavan operates the main Delavan Community Park launch at 1220 South Shore Drive (corner of Highway 50 and South Shore Drive). The town publishes its launch season as April 1 through October 31, says the gate house is not staffed in winter, and welcomes ice fishing off the park in winter. Parking fees for launch vehicles and overnight parking are posted on the town’s Delavan Lake page — check it before you tow rather than relying on a figure here.",
      "Local rules matter on Delavan Lake. The DNR’s lake page points out that boating ordinances stricter than state law can apply and that the only sure way to know is to read the sign posted at the public landing; it also lists three local lake organizations (the Delavan Lake Improvement Association, the Delavan Lake Sanitary District, and the Town of Delavan Lake Commission) as DNR contacts. Wisconsin requires registration for motorized boats (including electric trolling motors) and for sailboats over 12 feet, though a boat registered in another state may use Wisconsin waters for under 60 consecutive days. Operators born on or after January 1, 1989 need a boating safety certificate or an accepted out-of-state equivalent.",
      "Wisconsin’s aquatic-invasive-species rules apply at every landing: inspect and remove plants and animals, drain all water from the boat, motor, and live wells, and never move live fish away from a waterbody. The DNR lists zebra mussels and Eurasian water-milfoil among the invasive species recorded in Delavan Lake, so clean-drain-dry habits matter both arriving and leaving. If you are weighing day-trip options, compare Delavan with nearby Geneva Lake and the Chain O’ Lakes before you commit to a trailer day.",
    ],
    officialLinks: [
      {
        name: "Wisconsin DNR — Delavan Lake (boat landings)",
        url: "https://apps.dnr.wi.gov/lakes/lakepages/LakeDetail.aspx?page=boating&wbic=793600",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "Wisconsin DNR — Delavan Lake overview & facts",
        url: "https://apps.dnr.wi.gov/lakes/lakepages/LakeDetail.aspx?wbic=793600",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "Town of Delavan — Delavan Lake launch hours & fees",
        url: "https://www.townofdelavan.com/delavan-lake/",
        lastVerified: INLAND_VERIFIED,
      },
      WI_BOAT_REGISTRATION,
      WI_AIS_TRANSPORT,
    ],
    destinationSlugs: [],
    isPublished: true,
  },
  {
    slug: "lake-koshkonong",
    name: "Lake Koshkonong",
    region: "wisconsin",
    state: "WI",
    overview: [
      "Lake Koshkonong is a large, shallow Rock River impoundment in south-central Wisconsin, roughly 130 driving miles from downtown Chicago. The Wisconsin DNR lake profile gives it about 10,595 acres across Jefferson, Dane, and Rock counties, with a maximum depth of just 7 feet and a mean depth of 5 feet. The DNR lists musky, panfish, largemouth and smallmouth bass, northern pike, walleye, and catfish, and describes water clarity as very low.",
      "The DNR lists four public boat landings: access at the Koshkonong Wildlife Area on Vinnie Haha Road, access at the end of Bingham Road, an access near North Charley Bluff Road, and an unnamed Lake Koshkonong access. The DNR’s Koshkonong Wildlife Area page describes a launch to the lake at the north end of Vinnie Haha Road off Mounds Road, and a separate Rock River launch off the west end of Groeller Road. The wildlife-area page notes no bathrooms and no campground there, and that one of its lots is seasonal and closed for access in winter.",
      "Because the lake is so shallow, plan around depth and wind rather than horsepower: check landing signs and lake-district notices for local ordinances, run conservatively in unfamiliar areas, and expect conditions to change when the wind builds across a wide, shallow basin. The Rock-Koshkonong Lake District and the Rock River-Koshkonong Association are the local lake organizations the DNR lists as contacts for lake-management questions.",
      "Standard Wisconsin rules apply: registration for motorized boats (including electric trolling motors), boating-safety certification for operators born on or after January 1, 1989, and the state’s clean-drain requirements for aquatic invasive species. The DNR lists curly-leaf pondweed and zebra mussels in the lake. If you plan to hunt or paddle the adjacent marsh, read the DNR wildlife-area page first, and confirm each landing’s status on the day you go.",
    ],
    officialLinks: [
      {
        name: "Wisconsin DNR — Lake Koshkonong (boat landings)",
        url: "https://apps.dnr.wi.gov/lakes/lakepages/LakeDetail.aspx?page=boating&wbic=808700",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "Wisconsin DNR — Lake Koshkonong facts & figures",
        url: "https://apps.dnr.wi.gov/lakes/lakepages/LakeDetail.aspx?page=facts&wbic=808700",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "Wisconsin DNR — Koshkonong Wildlife Area",
        url: "https://dnr.wisconsin.gov/topic/Lands/WildlifeAreas/kosh",
        lastVerified: INLAND_VERIFIED,
      },
      WI_BOAT_REGISTRATION,
      WI_AIS_TRANSPORT,
    ],
    destinationSlugs: [],
    isPublished: true,
  },
  {
    slug: "green-lake-wisconsin",
    name: "Green Lake (Wisconsin)",
    region: "wisconsin",
    state: "WI",
    overview: [
      "Green Lake in Green Lake County, Wisconsin, is roughly 185 to 190 driving miles from downtown Chicago. The Wisconsin DNR lake profile lists it at 7,920 acres with a maximum depth of 236 feet, public boat landings, and public beaches, and lists panfish, largemouth and smallmouth bass, northern pike, trout, walleye, and catfish among its fish. The DNR describes the water as moderately clear.",
      "The DNR lists eight public boat landings: Hattie Sherwood Park, Deacon Mills Park (near Park Drive), Beyers Cove, Horners Landing (near Homer Road), Canal Street, County Park Access (Dodge Memorial Park), Duering’s Landing (near Klaver Street), and Sunset Park. Operators differ. The City of Green Lake sells launch passes for its Park Drive, Canal Street, and Hattie Sherwood launches (daily and seasonal options, with resident and non-resident seasonal pricing posted on the city page). Green Lake County sells daily and annual permits for its county-owned launches, including Dodge Memorial County Park on County Road K and Sunset Park on County Road A.",
      "The county’s boat-launch ordinance spells out rules worth knowing before you arrive: a permit is required to launch at county-owned facilities, the permit must be displayed inside the driver’s-side windshield, and power loading (using the boat’s own power to load or unload from the trailer) is prohibited at county launches. Daily permits are sold at the self-registration kiosks at the Dodge Memorial and Sunset Park launches; annual permits are sold through the county treasurer. Because fees are revised by ordinance, confirm current amounts on the county and city pages.",
      "Standard Wisconsin rules apply on the lake — boat registration for motorized craft, boating-safety certification for operators born on or after January 1, 1989, and clean-drain AIS requirements at every landing. The DNR notes that local ordinances stricter than state law may apply and are posted at landings. Check the National Weather Service forecast for the area before towing the distance, and confirm current permit amounts on the county and city pages.",
    ],
    officialLinks: [
      {
        name: "Wisconsin DNR — Green Lake (boat landings)",
        url: "https://apps.dnr.wi.gov/lakes/lakepages/LakeDetail.aspx?page=boating&wbic=146100",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "Wisconsin DNR — Green Lake overview",
        url: "https://apps.dnr.wi.gov/lakes/lakepages/LakeDetail.aspx?wbic=146100",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "City of Green Lake — Boat Launch passes",
        url: "https://cityofgreenlake.com/boat-launch/",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "Green Lake County Treasurer — Boat Launch Permits",
        url: "https://www.greenlakecountywi.gov/departments/treasurer/",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "Green Lake County Code — Boat Launch User Fees (Article IV)",
        url: "https://ecode360.com/14348404",
        lastVerified: INLAND_VERIFIED,
      },
      WI_BOAT_REGISTRATION,
      WI_AIS_TRANSPORT,
    ],
    destinationSlugs: [],
    isPublished: true,
  },
  {
    slug: "lake-mendota-madison",
    name: "Lake Mendota (Madison)",
    region: "wisconsin",
    state: "WI",
    overview: [
      "Lake Mendota is the largest of Madison’s Yahara River chain lakes, roughly 150 driving miles northwest of downtown Chicago. Public launching is concentrated at City of Madison parks. The city’s boat-launch page lists four Lake Mendota launches: Marshall Park (2101 Allen Blvd.), Spring Harbor Park (5218 Lake Mendota Dr.), Tenney Park (1601 Sherman Ave.), and Warner Park (1201 Woodward Dr.). Marshall Park has three piers, one of them year-round, and Spring Harbor Park has a year-round pier.",
      "The most important planning detail is the Lake Access Permit. The city states a daily or annual permit is required year-round to launch a motorboat, sailboat, iceboat, canoe, kayak, or ATV at the Madison launches on Lakes Mendota and Monona, and the permit is also valid at designated Dane County launch sites. Permits cannot be bought at the launch — buy online or call the city’s number published on the page, and display the permit inside the driver’s-side windshield. Fees and permit dates are posted by the city and change by year, so confirm them before you travel.",
      "Dane County Parks adds that a permit is required to use or park at all Madison, Monona, and Dane County improved launch sites even if you are not launching a boat, while canoe/kayak launches that are not improved launch sites generally do not need one. Free sanitary boat pump-out stations operate May through October (weather permitting), including one at Tenney Lock on Lake Mendota. The city also notes that seasonal piers are removed in the fall, so late-season availability depends on weather and pier conditions.",
      "Wisconsin’s statewide rules apply: motorized boat registration (out-of-state boats may use Wisconsin waters under 60 consecutive days), boating-safety certification for operators born on or after January 1, 1989, and AIS drain-and-inspect requirements at the landing. Mendota connects to Lake Monona through the Yahara River and Tenney Lock; read the companion Lake Monona guide if you plan to run both. Verify launch status, piers, and permit rules on the city page the day you go.",
    ],
    officialLinks: [
      {
        name: "City of Madison Parks — Boat Launches & Lake Access Permit",
        url: "https://www.cityofmadison.com/parks/find-a-park/water/boat-launches",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "Dane County Parks — Boat Launch Sites",
        url: "https://www.danecountyparks.com/recreation/lake-access-boating/boat-launch-sites",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "Dane County Parks — Lake Access and Boating",
        url: "https://www.danecountyparks.com/recreation/lake-access-boating",
        lastVerified: INLAND_VERIFIED,
      },
      WI_BOAT_REGISTRATION,
      WI_AIS_TRANSPORT,
    ],
    destinationSlugs: [],
    isPublished: true,
  },
  {
    slug: "lake-monona-madison",
    name: "Lake Monona (Madison)",
    region: "wisconsin",
    state: "WI",
    overview: [
      "Lake Monona is Madison’s downtown-adjacent chain lake, roughly 150 driving miles northwest of downtown Chicago, linked to Lake Mendota by the Yahara River. The City of Madison lists three public Lake Monona launches: Law Park (410 S. Blair St.), Olbrich Park (3401 Atwood Ave.), and Olin Park (1156 Olin-Turville Ct.). The City of Monona’s lake-access map also lists Monona municipal launch sites (Tonyawatha Trail Park, Winnequah Park, and Lottes Park), and Dane County lists additional improved launches on the Yahara chain.",
      "Each launch has its own quirks that the city documents. Law Park has no trailer parking and limited standard parking. Olbrich Park reaches Lake Monona from the mouth of Starkweather Creek; the city advises boaters to use caution in the narrowed channel and suggests considering Olin, Tonyawatha, or Winnequah as alternates. Olin Park has four piers. A year-round Lake Access Permit is required at the Madison launches (and valid at designated Dane County sites), and it cannot be purchased at the launch — buy ahead using the city’s online system or phone number.",
      "Paddlers have more flexibility: Dane County Parks says no permit is needed to paddle county waters unless you use a permit-required improved launch, and it operates canoe/kayak launches without a permit on many Capitol Water Trails. The county also lists free sanitary boat pump-out stations (May through October, weather permitting) on the Yahara River between Bridge Street and Monona Drive. The city notes the Upper Yahara above Highway 113 is a designated slow/no-wake at all times.",
      "Wisconsin registration, boating-safety certification, and AIS drain-and-inspect rules apply on Monona. If you plan to run both Monona and Mendota, read the Lake Mendota guide as well, and confirm piers, permits, and any closure notices on the city and county pages before you tow.",
    ],
    officialLinks: [
      {
        name: "City of Madison Parks — Boat Launches & Lake Access Permit",
        url: "https://www.cityofmadison.com/parks/find-a-park/water/boat-launches",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "City of Madison Parks — Olbrich Park",
        url: "https://www.cityofmadison.com/parks/find-a-park/olbrich",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "City of Monona — Lake Access launch map",
        url: "https://www.mymonona.com/DocumentCenter/View/2924/LakeAccess_Map?bidId=",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "Dane County Parks — Lake Access and Boating",
        url: "https://www.danecountyparks.com/recreation/lake-access-boating",
        lastVerified: INLAND_VERIFIED,
      },
      WI_BOAT_REGISTRATION,
      WI_AIS_TRANSPORT,
    ],
    destinationSlugs: [],
    isPublished: true,
  },
  {
    slug: "lake-winnebago",
    name: "Lake Winnebago",
    region: "wisconsin",
    state: "WI",
    overview: [
      "Lake Winnebago is Wisconsin’s largest inland lake, roughly 170 to 190 driving miles north of Chicago depending on whether you head for Fond du Lac at the south end or Oshkosh and Neenah to the west. The Wisconsin DNR lists it at about 131,939 acres across Calumet, Winnebago, and Fond du Lac counties, with a maximum depth of only 21 feet and 20 boat landings. The DNR also lists local boating ordinances here, including slow-no-wake areas, swimming areas, and waterway markers — see the DNR lake page and landing signs.",
      "Launch access is run by the surrounding cities and counties. The City of Fond du Lac operates the Lakeside Park Marina launch (two lanes with concrete pads), Lakeside Park West (twelve launch lanes), and the Harbor View Drive launch, and publishes daily and annual permit fees. Fond du Lac County’s Columbia Park offers six launches and parking for 100 cars and trailers. Calumet County Parks operates three east-shore harbors (Calumet County Park Harbor, Stockbridge Harbor, and Brothertown Harbor), each with multiple launch lanes and a pay station. The City of Oshkosh lists six launches — Rainbow, Menominee, William Steiger, Mill Street, Fugleberg, and 24th Avenue — and requires a daily or annual pass for any trailered boat.",
      "Fond du Lac’s city marina is the clearest official marina source: Lakeside Park Marina has 232 slips on eight docks, a harbormaster, transient and seasonal slips, a pump-out station, and fuel, according to the city page. A Tri-County season permit published by Winnebago, Calumet, and Fond du Lac counties works at county-owned Lake Winnebago launches in all three counties only — it is not valid at city-run launches, so match the permit to the launch operator.",
      "Winnebago’s size and shallow depth deserve respect. Travel Wisconsin cautions that shallow unmarked reefs and sand bars can be hazardous near shore and around islands and that weather can change rapidly. The DNR’s fishing regulations for the Winnebago chain include special rules (for example, lake sturgeon fishing is listed as closed and bag limits are chain-wide), so anglers should read the current DNR regulation page rather than rely on a summary. Wisconsin registration, boating-safety certification, and AIS drain-and-inspect rules apply, and the DNR lists multiple invasive species in the lake — clean, drain, and dry between waters.",
    ],
    officialLinks: [
      {
        name: "Wisconsin DNR — Lake Winnebago facts & figures",
        url: "https://apps.dnr.wi.gov/lakes/lakepages/LakeDetail.aspx?page=facts&wbic=131100",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "Wisconsin DNR — Lake Winnebago fishing regulations",
        url: "https://apps.dnr.wi.gov/fisheriesmanagement/Public/LakeRegulation/Details?WBIC=131100&WBIC_NAME=Lake+Winnebago",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "City of Fond du Lac — Boating (Lakeside Park & marina)",
        url: "https://www.fdl.wi.gov/parks/boating/",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "Fond du Lac County — Boating (Columbia Park)",
        url: "https://www.fdlco.wi.gov/departments/departments-n-z/parks-trails/boating",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "Calumet County — Boating (Lake Winnebago harbors)",
        url: "https://www.co.calumet.wi.us/624/Boating",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "Winnebago County — Permit Fees (daily & Tri-County)",
        url: "https://www.winnebagocountywi.gov/927/Permit-Fees",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "City of Oshkosh — Boat Launches & Mooring",
        url: "https://www.oshkoshwi.gov/Parks/BoatLaunchesMooring.aspx",
        lastVerified: INLAND_VERIFIED,
      },
      WI_BOAT_REGISTRATION,
      WI_AIS_TRANSPORT,
    ],
    destinationSlugs: ["fond-du-lac", "oshkosh"],
    isPublished: true,
  },
  {
    slug: "shabbona-lake",
    name: "Shabbona Lake",
    region: "illinois",
    state: "IL",
    overview: [
      "Shabbona Lake State Recreation Area in DeKalb County is an Illinois DNR inland reservoir roughly 70 driving miles west of downtown Chicago. IDNR park materials describe camping, fishing, and a boat launch; the park brochure states the entire lake is no-wake.",
      "Confirm park entry, launch status, and seasonal notices on the IDNR Shabbona Lake pages and site map before you trailer. Motor and flotation rules on Illinois state-park waters can differ from forest-preserve lakes — read the current brochure rather than assuming gasoline motors are unrestricted.",
      "Driving miles are for trailer planning only. This is not a Lake Michigan harbor.",
    ],
    officialLinks: [
      {
        name: "IDNR — Shabbona Lake State Recreation Area",
        url: "https://dnr.illinois.gov/parks/park.shabbonalake.html",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "IDNR — Shabbona Lake brochure (PDF)",
        url: "https://dnr.illinois.gov/content/dam/soi/en/web/dnr/parks/documents/shabbona-lake-sp-brochure.pdf",
        lastVerified: INLAND_VERIFIED,
      },
    ],
    destinationSlugs: ["shabbona-lake"],
    isPublished: true,
  },
  {
    slug: "lake-shelbyville",
    name: "Lake Shelbyville",
    region: "illinois",
    state: "IL",
    overview: [
      "Lake Shelbyville is a large U.S. Army Corps of Engineers reservoir in Shelby and Moultrie counties, central Illinois, roughly 190 driving miles south of Chicago. Illinois DNR describes the Wolf Creek State Park and Eagle Creek State Recreation Area sites, facing each other across the central part of the lake, as part of 11,100 acres of water with 250 miles of shoreline suited to boat fishing, water skiing, pontoon boating, and windsurfing. IDNR’s Wolf Creek brochure says the sites have a four-lane launching ramp.",
      "Public ramps are spread among Corps and state sites. The Corps St. Louis District boating page lists ramps at Coon Creek, Dam West, Forrest W. “Bo” Wood, Lithia Springs, Lone Point, Opossum Creek, Whitley Creek, Wilborn Creek, Coal Shaft, Johnson’s Bluff, Bruce East, Eagle Creek, Wolf Creek, Bethany Access, and Strickland/Fishhook, with a launch fee posted for several Corps ramps and courtesy docks seasonal (closed in winter months). Fees and facility status change, so confirm on the Corps page before you go.",
      "Three marinas are named by the Corps: Findlay Marina (mid-lake, with boat repairs, rentals, and seasonal slips), Lithia Springs Marina (south end, with slips, pump-out, a dock store, and fishing guide service), and Sullivan Marina and Campground (north end). The Corps says the marinas offer boat rental and guide service; IDNR’s brochure likewise notes rental boats and motors are available from private marinas on the lake. Pricing is set by the marinas, not by BoatingChicago.",
      "The Corps publishes a rafting policy that matters on holiday weekends: up to five boats may raft without a special use permit, larger rafts of up to 20 boats need a free special use permit requested in advance, drones need a separate permit, and life-jacket and spacing requirements apply. Illinois registration applies to powered boats, and the Illinois boating-safety certificate requirement applies to operators of motorboats over 10 horsepower who were born on or after January 1, 1998. Temporary fall hunt closures can shut recreation areas and some ramps — check the Corps and IDNR closure pages before you tow in late autumn.",
    ],
    officialLinks: [
      {
        name: "U.S. Army Corps of Engineers — Lake Shelbyville Boating",
        url: "https://www.mvs.usace.army.mil/Missions/Recreation/Lake-Shelbyville/Recreation/Boating/",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "U.S. Army Corps of Engineers — Lake Shelbyville Plan Your Visit",
        url: "https://www.mvs.usace.army.mil/Missions/Recreation/Lake-Shelbyville/Recreation/Plan-Your-Visit/",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "IDNR — Wolf Creek State Park (Lake Shelbyville)",
        url: "https://dnr.illinois.gov/parks/park.wolfcreek.html",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "IDNR — Wolf Creek State Park brochure",
        url: "https://dnr.illinois.gov/content/dam/soi/en/web/dnr/publications/documents/00000570.pdf",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "IDNR — Current site closures",
        url: "https://dnr.illinois.gov/closures/currentclosuresofdnrsitesandareas.html",
        lastVerified: INLAND_VERIFIED,
      },
      IL_WATERCRAFT_REGISTRATION,
    ],
    destinationSlugs: [],
    isPublished: true,
  },
  {
    slug: "clinton-lake",
    name: "Clinton Lake",
    region: "illinois",
    state: "IL",
    overview: [
      "Clinton Lake in DeWitt County, central Illinois, is roughly 140 driving miles south of Chicago. The Illinois DNR manages Clinton Lake State Recreation Area around a 4,900-acre lake that serves as the cooling lake for the Clinton power station. IDNR describes it as a busy boating lake for motorboats big and small, with sailing also popular, and as a strong crappie, catfish, striped bass, and walleye fishery.",
      "IDNR’s boating guidance is unusually specific. The lake’s main basin has no horsepower limitation, but the upper arms are no-wake areas and portions are restricted to electric trolling motors only; the North Fork Canoe Access Area is electric-motor-only. The entire lake north of the Route 54 bridge is posted no-wake, and the area in front of the power plant from the Route 54 bridge to a line of buoys roughly one mile south is permanently closed to all boat traffic. IDNR says there are six public boat ramps and one canoe launch, and IDNR’s access guide describes Mascoutin, West Side, North Fork, Weldon, and Parnell among the launch areas.",
      "IDNR’s access-area guide states there are no launching fees at ramps operated by the Department of Natural Resources, and that fishing tournaments need a free permit applied for through iFish Illinois. A full-service marina on Marina Road is privately operated, not run by IDNR, so contact it directly for slips, fuel, or services. IDNR’s park page says the swimming beach is open Memorial Day weekend through Labor Day weekend.",
      "The brochure also warns that when the wind rises the lake can be very rough and that small watercraft should stay in the North Fork area of Salt Creek on rough days. Illinois registration is required for powered boats (including trolling motors); the boating-safety certificate requirement applies to operators of motorboats over 10 horsepower born on or after January 1, 1998. Because the lake has restricted and closed zones tied to the power station, read the posted bulletin boards at major access areas and the current IDNR brochure before you launch.",
    ],
    officialLinks: [
      {
        name: "IDNR — Clinton Lake State Recreation Area",
        url: "https://dnr.illinois.gov/parks/park.clintonlake.html",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "IDNR — Clinton Lake State Recreation Area brochure",
        url: "https://dnr.illinois.gov/content/dam/soi/en/web/dnr/publications/documents/00000092.pdf",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "IDNR — Clinton Lake Access Areas and Fishing Guide",
        url: "https://dnr.illinois.gov/content/dam/soi/en/web/dnr/publications/documents/00000177.pdf",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "iFish Illinois — Clinton Lake",
        url: "https://ifishillinois.org/Waterbodies/Details/e1f1dc02-fbc8-442c-b91a-bfd2e6191822",
        lastVerified: INLAND_VERIFIED,
      },
      IL_WATERCRAFT_REGISTRATION,
    ],
    destinationSlugs: [],
    isPublished: true,
  },
  {
    slug: "lake-springfield",
    name: "Lake Springfield",
    region: "illinois",
    state: "IL",
    overview: [
      "Lake Springfield is the City Water, Light and Power (CWLP) reservoir on Springfield’s south side, roughly 200 driving miles south of Chicago. CWLP states boats allowed on the lake include canoes, motorboats, pontoons, rowboats, and sailboats, and that personal watercraft are also allowed. Motorized surfboards (E-Foils or LiftFoils) have not been permitted as personal watercraft since March 10, 2023, and boats are not permitted in the vicinity of Spaulding Dam, where a line of “no boat” buoys marks the limit.",
      "The key planning step is a Lake Springfield watercraft license in addition to Illinois registration. CWLP says all watercraft used, kept, or stored on the lake must be registered and licensed with both the City of Springfield and the State of Illinois; licenses run April 1 through March 31, applicants must supply boat length and motor horsepower, and CWLP asks you to allow one to two weeks for processing. Short-term P1 (24-hour) and P2 (60-hour) special permits exist for visitors, with limits on how many P1 permits one watercraft may receive per year. Fees depend on class, horsepower, and residency, so check the CWLP boating and registration pages for the current table.",
      "CWLP’s lake map lists public launching ramps at Lindsay Bridge, the Sailboat Launch, Spaulding Dam, Center Park Harbor, Lake Springfield Marina, and Marine Point (sailboats and small craft). CWLP’s rules set a top speed of 35 mph, reduce the maximum to 15 mph from sunset to sunrise, and require 5 mph within 200 feet of the shoreline or under bridges, with no-wake speed within 200 feet of a public ramp or bridge. Craft with masts higher than 35 feet may be used or kept only in the central basin.",
      "Licensing locations and hours change — the Lindsay Bridge licensing station is described as planned for Saturdays but best confirmed by phone — so do not plan a same-day launch without checking. For Chicago-area boaters, Lake Springfield is a long trip but a straightforward one on I-55; combine it with the licensing paperwork up front, and confirm the state’s boating-safety and registration rules (powered boats must be registered with Illinois DNR; operators of motorboats over 10 horsepower born on or after January 1, 1998 need a boating-safety certificate).",
    ],
    officialLinks: [
      {
        name: "CWLP — Lake Springfield Boating",
        url: "https://cwlp.com/LakesParksHome/LakesParksInformation/Boating.aspx",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "CWLP — Lake Springfield Boating Rules",
        url: "https://www.cwlp.com/LakesParksHome/LakesParksInformation/BoatingRules.aspx",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "CWLP — Lake Springfield Map (public launching ramps)",
        url: "https://www.cwlp.com/LakesParksHome/LakesParksDocuments/LakeMap2024Page2.pdf",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "CWLP — 2026 Watercraft Registration Application",
        url: "https://www.cwlp.com/LakesParksHome/LakesParksDocuments/Watercraft%20Registration%202026.pdf",
        lastVerified: INLAND_VERIFIED,
      },
      IL_WATERCRAFT_REGISTRATION,
    ],
    destinationSlugs: [],
    isPublished: true,
  },
  {
    slug: "illinois-river-starved-rock",
    name: "Illinois River (Starved Rock)",
    region: "illinois",
    state: "IL",
    overview: [
      "The Illinois River at Starved Rock State Park near Utica, in LaSalle County, is roughly 90 to 100 driving miles southwest of downtown Chicago. Illinois DNR says boats may be launched from the west end of the park, off Route 178 at the west entrance, where there is a ramp and parking lot but no docks. IDNR also notes you may bring your own kayaks and canoes and launch from Lone Point shelter on Route 71 on the park’s east end.",
      "Rentals and tours are run by concessionaires, not IDNR. IDNR’s park Q&A says Kayak Starved Rock manages all kayak rentals and tours out of Lone Point Shelter and tells visitors to call that business for hours and reservations. IDNR’s brochure adds that boat rides on the Eagle 1 are reserved through Starved Rock Lodge and that rides and kayak rentals are offered from May through October. Treat those as seasonal concessions — confirm availability before you drive.",
      "River-specific safety matters here. IDNR’s brochure states boats are not allowed within 600 feet of the dam because of strong currents and powerful undertows, and says no one should attempt to wade or swim in the river, canyon creeks, or from any park shoreline. IDNR also warns that the lower area near the boat ramp can close to parking and picnicking when the Illinois River floods, so check the park page and closure signs; picnic tables are not set out until mid-May depending on flooding.",
      "Anglers need a valid Illinois fishing license; IDNR lists fishing from the area west of the visitor center along the seawall and at Lone Point. The park posts seasonal hunting-season closures for parts of the broader complex (including the campground and some nature preserves) during deer seasons, and trail work may limit access in 2026, so read the current IDNR park page before a fall or winter visit. Illinois registration applies to powered boats; unpowered canoes, kayaks, and paddleboards do not need Illinois registration.",
    ],
    officialLinks: [
      {
        name: "IDNR — Starved Rock State Park",
        url: "https://dnr.illinois.gov/parks/park.starvedrock.html",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "IDNR — Starved Rock Common Questions & Answers",
        url: "https://dnr.illinois.gov/content/dam/soi/en/web/dnr/parks/documents/starvedrock-common-park-qa.pdf",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "IDNR — Starved Rock State Park brochure",
        url: "https://dnr.illinois.gov/content/dam/soi/en/web/dnr/publications/documents/00000005.pdf",
        lastVerified: INLAND_VERIFIED,
      },
      IL_WATERCRAFT_REGISTRATION,
    ],
    destinationSlugs: [],
    isPublished: true,
  },
  {
    slug: "lake-wawasee",
    name: "Lake Wawasee",
    region: "indiana",
    state: "IN",
    overview: [
      "Lake Wawasee near Syracuse in Kosciusko County, northern Indiana, is roughly 140 driving miles east-southeast of downtown Chicago. The Indiana DNR’s public-access program is the best official starting point for where you can launch.",
      "Indiana DNR’s Where to Fish interactive map lists public access sites compiled by the DNR, and IDNR cautions that site locations are approximate and that users should make sure sites are open to the public before launching. In IDNR’s public-access data, the Lake Wawasee site is a DNR fishing and boating access with a boat ramp, with directions given as four miles south of Syracuse on SR 13 and then two miles east on Old Road 8 (CR 1000N). The same data records restrooms, a courtesy dock, and a fishing pier, and records no fee. Treat those details as a starting point and verify them on the map or by calling the DNR contact before you tow.",
      "For Illinois boaters, Indiana’s registration rules are a common surprise. The Indiana BMV states all watercraft operating on Indiana waterways must be registered and display valid decals unless exempt; non-motorized canoes, rowboats, and paddleboats are exempt, while a watercraft registered in another state and used in Indiana for a combined total of not more than 60 consecutive days during a calendar year is exempt under Indiana law. Indiana Conservation Officers enforce boating rules, and the DNR points boaters to the Handbook of Indiana Boating Laws and Responsibilities.",
      "Lake-specific speed zones, quiet-hour rules, and marina services are set by Indiana DNR, local officials, and private operators; BoatingChicago does not list private marina or rental pricing for Wawasee because no single official source covers it. Use the DNR’s Lake Depth Maps and fishing guide to plan, and check weather and wind before towing a long distance.",
    ],
    officialLinks: [
      {
        name: "Indiana DNR — Where to Fish (public access sites map)",
        url: "https://www.in.gov/dnr/fish-and-wildlife/fishing/where-to-fish-interactive-map",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "Indiana BMV — Watercraft Registration",
        url: "https://www.in.gov/bmv/registration-plates/boat-registration/",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "Indiana DNR — Boating Education & Safety",
        url: "https://www.in.gov/dnr/law-enforcement/education/boating-education-and-safety/",
        lastVerified: INLAND_VERIFIED,
      },
    ],
    destinationSlugs: [],
    isPublished: true,
  },
  {
    slug: "lake-maxinkuckee",
    name: "Lake Maxinkuckee",
    region: "indiana",
    state: "IN",
    seoTitle: "Lake Maxinkuckee Boating — Culver Access, Fishing & DNR Sources",
    seoDescription:
      "Lake Maxinkuckee near Culver, Indiana: public ramp access, 2020 DNR survey facts, fishing species, AIS notes, rentals, and Indiana registration rules for Chicago-area day trips.",
    coordinates: { lat: 41.19666, lng: -86.41645 },
    lakeFacts: [
      { label: "Surface area", value: "1,854 acres", asOf: "2020 Indiana DNR survey" },
      { label: "Maximum depth", value: "88 feet", asOf: "2020 Indiana DNR survey" },
      { label: "Public access", value: "Public access ramp", asOf: "2020 Indiana DNR survey" },
      {
        label: "Outboard motor restrictions (survey)",
        value: "None recorded",
        asOf: "2020 Indiana DNR survey",
      },
      {
        label: "Listed fishing species (survey)",
        value: "Bluegill, rock bass, smallmouth bass, walleye, yellow perch",
        asOf: "2020 Indiana DNR survey",
      },
      {
        label: "Starry stonewort",
        value: "Documented at 18% of vegetation sample sites",
        asOf: "2020 Indiana DNR survey",
      },
    ],
    overview: [
      "Lake Maxinkuckee at Culver in Marshall County, northern Indiana, is roughly 100 driving miles southeast of downtown Chicago — one of the closest large Indiana inland lakes for a Chicago-area day trip. The Culver Visitor Center describes more than 1,800 acres for boating, skiing, kayaking, and paddle boarding, with a public access point on the west / southwest shore.",
      "Indiana DNR’s June 2020 General Fish Survey listed 1,854 acres, 88-foot maximum depth, a public access ramp, and no special outboard motor restrictions in that survey document. Survey “best fishing” species included bluegill, rock bass, smallmouth bass, walleye, and yellow perch. Starry stonewort was documented for the first time on that survey (about 18% of sample sites). Those figures describe the 2020 survey — not a live conditions report. Confirm current rules, access status, and AIS guidance before you launch.",
      "Indiana DNR public-access data lists Lake Maxinkuckee access site record 197 near Culver (Tri-County Fish & Wildlife Area): concrete ramp, restrooms, courtesy dock, and fishing pier, with no fee recorded in that dataset. The Culver Visitor Center places the public launch on the southwest side and says trailers can park at the water-tower lot off Lakeshore Drive behind Papa’s. IDNR notes access coordinates are approximate — verify the site is open before you tow.",
      "If you are not trailering your own boat, the Culver Visitor Center points to Culver Marina and the Culver Park Department for paddleboards/kayaks (park inventory is first come, first served at the beach concession during beach hours), pontoon rentals via Culver Marina reservations, and names Culver Marina, Culver’s Portside Marina, and Jeff’s PWC & Marine. Prices and availability are set by those operators — contact them directly.",
      "Because starry stonewort appears in the 2020 survey, treat Maxinkuckee like any Indiana inland water for aquatic invasive species: clean, drain, and dry boats, trailers, and gear. Follow current Indiana DNR guidance and the regional AIS rules summarized on BoatingChicago’s aquatic invasive species page. Illinois-registered craft: Indiana BMV registration applies on Indiana waters unless an exemption fits — non-motorized canoes, rowboats, and paddleboats are exempt, and out-of-state registered craft have a limited consecutive-day exemption (confirm the current BMV wording). Indiana Conservation Officers enforce boating rules; review the DNR boating handbook and check weather before you go.",
    ],
    faqs: [
      {
        question: "How big and deep is Lake Maxinkuckee?",
        answer:
          "Indiana DNR’s 2020 General Fish Survey listed 1,854 acres and an 88-foot maximum depth. Treat those as survey findings from that year, not a substitute for current charts or local knowledge.",
      },
      {
        question: "Where is the public boat launch?",
        answer:
          "Indiana DNR lists public access site record 197 (Tri-County Fish & Wildlife Area) with a concrete ramp, restrooms, courtesy dock, and fishing pier. The Culver Visitor Center describes the public launch on the southwest side of the lake and trailer parking at the water-tower lot off Lakeshore Drive behind Papa’s. Confirm the site is open before arrival — DNR access locations are approximate.",
      },
      {
        question: "Are there special outboard motor restrictions?",
        answer:
          "The 2020 Indiana DNR survey recorded no special outboard motor restrictions. Rules can change — verify current Indiana DNR and local ordinances before you launch.",
      },
      {
        question: "What fish did the DNR survey highlight?",
        answer:
          "The 2020 survey’s listed fishing species included bluegill, rock bass, smallmouth bass, walleye, and yellow perch. Indiana fishing licenses and seasons still apply — check current DNR regulations.",
      },
      {
        question: "Do Illinois boaters need Indiana registration?",
        answer:
          "The Indiana BMV requires watercraft on Indiana waterways to be registered unless exempt. Non-motorized canoes, rowboats, and paddleboats are exempt. Craft registered in another state may qualify for a limited consecutive-day exemption — read the current BMV watercraft registration page before you trailer across the state line.",
      },
    ],
    officialLinks: [
      {
        name: "Indiana DNR — Lake Maxinkuckee 2020 General Fish Survey (PDF)",
        url: "https://www.in.gov/dnr/fish-and-wildlife/files/fmp/fw-LakeMaxinkuckee_Marshall_FMR_2020.pdf",
        lastVerified: "2026-11-28",
      },
      {
        name: "Indiana DNR — Where to Fish (public access / contour map tools)",
        url: "https://www.in.gov/dnr/fish-and-wildlife/fishing/where-to-fish-interactive-map",
        lastVerified: "2026-11-28",
      },
      {
        name: "Culver Visitor Center — Outdoor Adventures (Lake Maxinkuckee)",
        url: "https://www.findculver.com/outdoor-adventures",
        lastVerified: "2026-11-28",
      },
      {
        name: "Indiana BMV — Watercraft Registration",
        url: "https://www.in.gov/bmv/registration-plates/boat-registration/",
        lastVerified: "2026-11-28",
      },
      {
        name: "Indiana DNR — Boating Education & Safety",
        url: "https://www.in.gov/dnr/law-enforcement/education/boating-education-and-safety/",
        lastVerified: "2026-11-28",
      },
    ],
    destinationSlugs: [],
    isPublished: true,
  },
  {
    slug: "gull-lake-michigan",
    name: "Gull Lake (Michigan)",
    region: "michigan",
    state: "MI",
    overview: [
      "Gull Lake in Barry and Kalamazoo counties, southwest Michigan, is roughly 160 to 170 driving miles east-northeast of downtown Chicago. Prairieville Township’s parks page lists the lake at about 2,050 acres and describes it as an all-sport lake with largemouth and smallmouth bass, perch, northern pike, lake trout, and winter smelt. Michigan DNR’s fishing materials add that Gull Lake is stocked with lake trout and is a designated Type E trout lake, so anglers should consult the Michigan Fishing Guide’s inland trout and salmon lake regulations.",
      "The public launch most visitors use is Prairieville Township’s Gull Lake Park at 15475 S. M-43 in Hickory Corners on the north shore. The township lists hours of 6 a.m. to 11 p.m., 365 days a year, 70 trailer-parking spaces and 20 vehicle-only spaces, public restrooms, and a swim area. Michigan DNR’s publication for the site notes access through a pay-to-park gate. The township posts daily entry fees by vehicle type (with and without a trailer) and annual resident, non-resident, and commercial passes; those amounts change, so read the township page before you go.",
      "Michigan’s boating-law basics apply. The Michigan DNR states all watercraft, unless exempt, must be registered with the Michigan Department of State and display a registration decal. Michigan’s invasive-species law requires you to remove aquatic plants from boats, equipment, and trailers before placing them in the water, and before trailering to remove drain plugs, drain bilges and live wells, and ensure the boat and trailer are free of aquatic organisms; violations are a state civil infraction with fines up to $100. Michigan’s Boating Facility Finder lists access sites and local watercraft controls.",
      "No single official page covers marinas or rentals on Gull Lake, so BoatingChicago does not list them. Check wind and weather before launching at the north-shore ramp, and call the township if you need annual-pass or gate details.",
    ],
    officialLinks: [
      {
        name: "Prairieville Township — Parks (Gull Lake Park)",
        url: "https://prairievilletwp-mi.gov/parks/",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "Michigan DNR — Gull Lake access site brochure",
        url: "https://www2.dnr.state.mi.us/publications/pdfs/arcgisonline/storymaps/fish_troutTrails/PDFs/TT2015044.pdf",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "Michigan DNR — Boating (Boating Facility Finder)",
        url: "https://www.michigan.gov/dnr/things-to-do/boating",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "Michigan DNR — Boating rules and regulations",
        url: "https://www.michigan.gov/dnr/things-to-do/boating/rules-and-regs",
        lastVerified: INLAND_VERIFIED,
      },
      {
        name: "Michigan — Invasive Species: Boaters and Anglers",
        url: "https://www.michigan.gov/invasives/take-action/boaters-and-anglers",
        lastVerified: INLAND_VERIFIED,
      },
    ],
    destinationSlugs: [],
    isPublished: true,
  },
  {
    slug: "pewaukee-lake",
    name: "Pewaukee Lake",
    region: "wisconsin",
    state: "WI",
    overview: [
      "Pewaukee Lake in Waukesha County is roughly 100 to 110 driving miles north of downtown Chicago. The Wisconsin DNR lists it at about 2,437 acres with a maximum depth of 45 feet and three public boat landings: the Village launch off Park Avenue, the Lakeview Boulevard access near CTH SS, and the Naga-Waukee Park access at the west end of the lake.",
      "Village of Pewaukee Parks & Recreation manages Laimon Family Lakeside Park (129 Park Avenue), including a public boat launch and gas sales; the village page publishes per-launch and seasonal launch fees and notes seasonal slip rentals with a waiting list. Confirm current dollar amounts on the village marina page before you tow — we do not invent rates.",
      "Waukesha County Parks requires a Lake Access Annual Membership or Daily Permit for vehicles entering fee lake-access sites that include Pewaukee Lake (Naga-Waukee Park west-end access). County materials describe plate-scanner verification and list shared membership coverage with other county lake-access sites. Park hours for Naga-Waukee are published as sunrise to 10 p.m.",
      "Wisconsin registration, boating-safety certification where required, and AIS drain-and-inspect rules apply. Check landing signs for local ordinances that may be stricter than state law.",
    ],
    officialLinks: [
      {
        name: "Wisconsin DNR — Pewaukee Lake (boating / landings)",
        url: "https://apps.dnr.wi.gov/lakes/lakepages/LakeDetail.aspx?page=boating&wbic=772000",
        lastVerified: "2026-11-25",
      },
      {
        name: "Village of Pewaukee — Laimon Park (Marina)",
        url: "https://www.cityofpewaukee.us/649/Laimon-Park-Marina",
        lastVerified: "2026-11-25",
      },
      {
        name: "Waukesha County — Boating and Lake Access",
        url: "https://www.waukeshacounty.gov/parks-and-land-use/parks-and-recreation/parks-and-trails/boating-and-lake-access/",
        lastVerified: "2026-11-25",
      },
      {
        name: "Waukesha County — Naga-Waukee Park",
        url: "https://www.waukeshacounty.gov/parks-and-land-use/parks-and-recreation/parks-and-trails/naga-waukee-park/",
        lastVerified: "2026-11-25",
      },
      WI_BOAT_REGISTRATION,
      WI_AIS_TRANSPORT,
    ],
    destinationSlugs: [],
    isPublished: true,
  },
  {
    slug: "gun-lake-michigan",
    name: "Gun Lake (Barry / Allegan Counties, Michigan)",
    region: "michigan",
    state: "MI",
    overview: [
      "Gun Lake in Barry and Allegan counties, southwest Michigan, is a large inland recreation lake roughly 170 to 180 driving miles from downtown Chicago. Do not confuse it with other Michigan waters that share the Gun Lake name (for example Mason County).",
      "Public access includes Gun Lake County Park near Orangeville (county-managed ramp with multiple lanes and trailer parking listed in Michigan DNR Boating Access Site data) and launches associated with Yankee Springs Recreation Area / state park materials. Michigan’s Recreation Passport commonly applies at DNR and many county fee sites — confirm the managing agency and fee status before you tow; we do not invent passport prices.",
      "Local watercraft controls on Gun Lake include slow-no-wake areas in channels and named canal segments published through Michigan DNR boating-rules mapping. Night-operation and channel rules can change — read posted signs and current DNR local watercraft controls.",
      "Michigan registration and invasive-species clean-drain-dry rules apply. Use Michigan DNR’s Boating Facility Finder for lane counts, closures, and site status rather than third-party summaries alone.",
    ],
    officialLinks: [
      {
        name: "Michigan DNR — Boating (Boating Facility Finder)",
        url: "https://www.michigan.gov/dnr/things-to-do/boating",
        lastVerified: "2026-11-25",
      },
      {
        name: "Michigan DNR — Boating rules and regulations",
        url: "https://www.michigan.gov/dnr/things-to-do/boating/rules-and-regs",
        lastVerified: "2026-11-25",
      },
      {
        name: "Michigan — Invasive Species: Boaters and Anglers",
        url: "https://www.michigan.gov/invasives/take-action/boaters-and-anglers",
        lastVerified: "2026-11-25",
      },
    ],
    destinationSlugs: [],
    isPublished: true,
  },
  {
    slug: "paw-paw-lake-michigan",
    name: "Paw Paw Lake (Berrien County, Michigan)",
    region: "michigan",
    state: "MI",
    overview: [
      "Paw Paw Lake in Berrien County, southwest Michigan, is an inland lake roughly 100 driving miles from downtown Chicago. Do not confuse it with other Michigan waters that share similar names.",
      "Michigan DNR Boating Access Site materials describe public launches including Paw Paw Lake East (near Watervliet; two lanes, trailer parking) and Paw Paw Lake West (near Coloma; one lane, trailer parking). Hours are commonly listed around 4 a.m. to 11 p.m. — confirm on the Michigan Boating Facility Finder before you tow.",
      "Michigan Recreation Passport requirements apply for motor-vehicle entry at DNR boating access sites. Passport prices change; use the official DNR Recreation Passport page rather than memorized dollar amounts.",
      "Michigan registration and clean-drain-dry invasive-species rules apply. Use Michigan DNR Boating Facility Finder for closures and site status.",
    ],
    officialLinks: [
      {
        name: "Michigan DNR — Boating (Boating Facility Finder)",
        url: "https://www.michigan.gov/dnr/things-to-do/boating",
        lastVerified: "2026-11-25",
      },
      {
        name: "Michigan DNR — Recreation Passport",
        url: "https://www.michigan.gov/dnr/buy-and-apply/rec-pp",
        lastVerified: "2026-11-25",
      },
      {
        name: "Michigan DNR — Boating rules and regulations",
        url: "https://www.michigan.gov/dnr/things-to-do/boating/rules-and-regs",
        lastVerified: "2026-11-25",
      },
    ],
    destinationSlugs: [],
    isPublished: true,
  },
  {
    slug: "tippecanoe-lake-indiana",
    name: "Tippecanoe Lake (Indiana)",
    region: "indiana",
    state: "IN",
    overview: [
      "Tippecanoe Lake in Kosciusko County, northern Indiana, is roughly 140–160 driving miles from downtown Chicago. Indiana DNR lake materials describe a deep inland lake with public access directed through connected water rather than a dedicated Tippecanoe shoreline state ramp.",
      "Indiana DNR access guidance for Tippecanoe points boaters to the Grassy Creek public access (near North Webster / Armstrong Road area) on connected water. Larger craft may be limited by bridges or channel clearance — verify on site and with current DNR fishing-access materials before assuming every trailered boat can reach the main lake basin.",
      "Because primary public access is indirect, BoatingChicago keeps Tippecanoe as a lake guide with official context rather than inventing a shoreline municipal marina network. Private resort ramps are not listed here without stable operator pages.",
      "Indiana registration and invasive-species rules apply. Confirm access status through Indiana DNR fishing access / lake pages before you tow.",
    ],
    officialLinks: [
      {
        name: "Indiana DNR — Fishing / lake resources",
        url: "https://www.in.gov/dnr/fish-and-wildlife/fishing/",
        lastVerified: "2026-11-25",
      },
      {
        name: "Lilly Center for Lakes & Streams — Lake Tippecanoe (access note)",
        url: "https://lakes.grace.edu/lake/lake-tippecanoe/",
        lastVerified: "2026-11-25",
      },
    ],
    destinationSlugs: [],
    isPublished: true,
  },
];
