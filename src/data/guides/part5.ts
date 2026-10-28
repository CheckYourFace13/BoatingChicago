import type { GuidePage } from "@/types";

/**
 * Winter / off-season ownership guides.
 * Procedures defer to manufacturer manuals and qualified marine service —
 * never present a single universal winterizing recipe for all boats.
 */
export const guidePart5: GuidePage[] = [
  {
    slug: "chicago-boat-winterizing-guide",
    title: "Winterizing a Boat for Chicago & Lake Michigan",
    seoTitle: "Winterizing a Boat in Chicago 2026 | Lake Michigan Freeze Prep",
    seoDescription:
      "How Chicago-area boaters plan winterization for Lake Michigan conditions — engines, systems, schedules, and when to use a marine mechanic. Defer to your manufacturer’s manual.",
    headline: "Winterizing a Boat for Chicago and Lake Michigan Conditions",
    intro:
      "Chicago winters freeze cooling systems, punish batteries, and punish poorly prepared engines. This guide explains what boaters typically plan for — and what must come from your engine manufacturer’s winterizing instructions or a qualified marine technician. It is not a universal step-by-step for every outboard, inboard, sterndrive, or sailboat system.",
    sections: [
      {
        heading: "Why Chicago winters are unforgiving",
        paragraphs: [
          "Southern Lake Michigan boaters face repeated freeze–thaw cycles, hard freezes, and long storage seasons. Water left in raw-water cooling passages, sea strainers, and related plumbing can expand and crack expensive parts. That risk is why haul-out and winterization are treated as a schedule item, not an optional polish.",
          "Treat National Weather Service forecasts and your yard’s haul-out calendar as planning inputs. Do not wait for the first hard freeze to book service — Chicago marine shops fill quickly in September and October.",
        ],
      },
      {
        heading: "Manufacturer instructions come first",
        paragraphs: [
          "Engine and drive winterization steps differ by brand, model year, cooling type, and whether the boat is stored in water or on the hard. Always follow the current owner’s manual and the engine manufacturer’s winterizing bulletin for your specific powerplant. If the manual and a yard’s “standard package” disagree, ask the yard to match the manufacturer’s procedure — not the other way around.",
          "BoatingChicago does not publish a single torque list, antifreeze mix, or fogging sequence for all boats. Incorrect antifreeze type, skipped impeller service, or fogging oil left incorrectly can create spring failures. When you are unsure, hire a marine mechanic who works on your engine family.",
        ],
      },
      {
        heading: "Typical planning checklist (not a procedure)",
        paragraphs: [
          "Owners usually coordinate haul-out timing, engine winterization (including cooling-system protection appropriate to the engine), fuel stabilization per manufacturer guidance, battery care, bilge dryness, and a weatherproof cover or shrink wrap for outdoor storage. Soft goods, canvas, and electronics may need separate storage or moisture control — again per equipment makers.",
          "Sailboats add standing-rigging and spar considerations; boats with generators, air conditioning, or complex freshwater systems need those loops addressed by someone who knows those systems. Document what was done, with dates and who performed the work — useful for spring commissioning and future buyers.",
        ],
      },
      {
        heading: "Timing around Chicago haul-out",
        paragraphs: [
          "Chicago Harbors’ published mooring season runs through October 31; yards and private marinas set their own haul-out windows. Align mechanic appointments with the day the boat becomes accessible on the hard. Leaving a raw-water engine unprotected through a cold snap after haul-out is a common expensive mistake.",
          "For storage choices and shrink wrap decisions, see our Chicago boat storage and shrink wrap guides. For ownership planning beyond winter, see the boat ownership hub.",
        ],
      },
      {
        heading: "Spring is part of winterizing",
        paragraphs: [
          "De-winterizing is not “just add fuel.” Manufacturer-directed commissioning and a qualified marine tech matter for cooling integrity and related systems. Schedule spring service early — April shop calendars fill before the first warm weekend on the lake. Use the spring boat launch checklist for registration, safety gear, launch access, and official conditions planning.",
        ],
      },
    ],
    comparisonTable: {
      caption: "Who should do which winterizing work",
      headers: ["Task area", "Owner DIY only if…", "Prefer a pro when…"],
      rows: [
        [
          "Engine / drive winterization",
          "You have the exact manufacturer procedure and tools",
          "Inboards, sterndrives, unfamiliar engines, or warranty concerns",
        ],
        [
          "Fuel system treatment",
          "Manual allows owner treatment and you can do it safely",
          "Complex tanks, ethanol issues, or unclear manufacturer guidance",
        ],
        [
          "Cover / shrink wrap",
          "You are trained and the yard allows DIY",
          "Outdoor storage, tall arches, or ventilation concerns",
        ],
        [
          "Battery care",
          "You can remove/maintain batteries per manufacturer guidance",
          "On-board charging systems you do not understand",
        ],
      ],
    },
    seasonalTips: [
      {
        season: "Late summer",
        tip: "Book haul-out and winterization appointments before Labor Day crowds hit the yards.",
      },
      {
        season: "Fall",
        tip: "Confirm antifreeze and fogging products match your engine maker’s current guidance — shelves change.",
      },
      {
        season: "Winter",
        tip: "If the boat is outdoors, inspect covers after major snow or ice; do not assume shrink wrap stays perfect all season.",
      },
      {
        season: "Late winter",
        tip: "Schedule spring commissioning before April rush.",
      },
    ],
    peopleAlsoAsk: [
      {
        question: "Can I winterize any Chicago boat the same way?",
        answer:
          "No. Procedures vary by engine and systems. Follow the manufacturer’s winterizing instructions for your specific equipment, or hire a qualified marine technician.",
      },
      {
        question: "When should Chicago boaters winterize?",
        answer:
          "Align with your yard’s haul-out window — often through October — and complete engine protection before hard freezes. Confirm dates with your marina or storage operator.",
      },
      {
        question: "Is DIY winterization safe?",
        answer:
          "Only if you have the correct manufacturer procedure, tools, and experience. Mistakes can crack engines. Many owners use a marine mechanic for engine work and handle softer tasks themselves.",
      },
    ],
    faqs: [
      {
        question: "Does BoatingChicago sell winterizing service?",
        answer:
          "No. We publish planning guidance and link to official sources and, where labeled, affiliate product or marketplace options. Hire local marine service directly.",
      },
      {
        question: "Where do I find official harbor haul-out information?",
        answer:
          "Start with Chicago Harbors (chicagoharbors.info) for Chicago Park District harbors, or your private marina’s published winter schedule.",
      },
    ],
    popularSearches: [
      { label: "Winterization hub", href: "/chicago-boat-winterization" },
      { label: "Chicago Boat Storage Guide", href: "/chicago-boat-storage-guide" },
      { label: "Shrink Wrap Guide", href: "/chicago-boat-shrink-wrap-guide" },
      { label: "Boat Ownership", href: "/boat-ownership" },
      { label: "Winter Storage Checklist", href: "/winter-boat-storage-chicago" },
    ],
    relatedSlugs: [
      "chicago-boat-winterization",
      "chicago-boat-storage-guide",
      "winter-boat-storage-chicago",
      "chicago-boat-shrink-wrap-guide",
      "spring-boat-launch-checklist-chicago",
      "chicago-boat-repair-guide",
    ],
    showLeadForm: false,
  },
  {
    slug: "chicago-boat-shrink-wrap-guide",
    title: "Boat Shrink Wrap in Chicago: Choices, Ventilation & Disposal",
    seoTitle: "Boat Shrink Wrap Chicago 2026 | Ventilation, Frames & Disposal",
    seoDescription:
      "What Chicago boaters should know about shrink wrap for winter storage — framing, ventilation, inspection after storms, and disposal. Confirm yard rules before DIY.",
    headline: "Shrink Wrap for Chicago Winter Storage: Practical Choices",
    intro:
      "Shrink wrap is common outdoor protection for boats stored through Chicago winters. Done well, it sheds snow and blocks UV; done poorly, it traps moisture or collapses under ice. This guide covers planning questions — not a DIY heat-gun tutorial.",
    sections: [
      {
        heading: "What shrink wrap is for",
        paragraphs: [
          "Professional shrink wrap typically uses a heat-shrink film over a support frame so water and snow shed instead of pooling on canvas or cockpit covers. Yards often include zipper doors for winter access. Ask what is included: framing, vents, door, tape quality, and whether the quote covers mid-winter repairs after storms.",
          "Indoor heated storage may not need shrink wrap. Outdoor rack or yard storage usually benefits from it in this climate. Confirm with your storage operator — some require professional wrap and prohibit DIY heat work on-site.",
        ],
      },
      {
        heading: "Ventilation and moisture",
        paragraphs: [
          "A sealed plastic cocoon without adequate ventilation can trap condensation, encouraging mildew on cushions and corrosion on metal. Professional installs commonly include vents and airflow paths. Do not “improve” a wrap by sealing every opening shut without understanding moisture management.",
          "Remove soft goods you care about when possible, or follow your detailer’s storage advice. Mildew remediation in spring is more expensive than careful fall prep.",
        ],
      },
      {
        heading: "Inspection after snow and ice",
        paragraphs: [
          "Heavy wet snow and ice storms can tear film or collapse light framing. If your boat is in outdoor storage you can access, inspect after major events and call the yard for repairs rather than improvising with random tarps that pond water.",
          "Document damage for the storage facility. Mid-winter wrap repairs are a normal line item in Chicago — ask about response time when you book fall wrap.",
        ],
      },
      {
        heading: "Disposal and recycling",
        paragraphs: [
          "Used shrink wrap is a disposal issue. Some yards recycle film; others require you to haul it. Ask before spring unwrap day so plastic does not end up as mixed landfill waste by default. Follow the facility’s rules — do not abandon film in harbor dumpsters that are not set up for it.",
          "Reuse is rarely appropriate for structural winter wraps; UV and heat cycles weaken film. Treat wrap as seasonal consumable infrastructure, not a multi-year tarp.",
        ],
      },
    ],
    comparisonTable: {
      caption: "Cover options at a glance",
      headers: ["Option", "Best when", "Watch-outs"],
      rows: [
        [
          "Professional shrink wrap",
          "Outdoor winter storage in Chicago",
          "Moisture if under-vented; storm damage",
        ],
        [
          "Fitted canvas / cover",
          "Short storage or indoor protection",
          "Pooling snow; UV aging of fabric",
        ],
        [
          "Indoor storage",
          "High-value boats / simpler cover needs",
          "Cost; reservation timing",
        ],
      ],
    },
    seasonalTips: [
      {
        season: "Fall",
        tip: "Book wrap with haul-out — do not leave an unprotected boat through the first ice event.",
      },
      {
        season: "Winter",
        tip: "Inspect after heavy snow; request yard repair for tears or collapsed frames.",
      },
      {
        season: "Spring",
        tip: "Ask how the yard handles film disposal or recycling before unwrap day.",
      },
    ],
    peopleAlsoAsk: [
      {
        question: "Is shrink wrap required in Chicago?",
        answer:
          "Not legally required for all boats, but it is strongly recommended for outdoor storage. Some yards require professional wrap — confirm with your facility.",
      },
      {
        question: "Can I shrink wrap my own boat?",
        answer:
          "Only where the storage site allows it and you have proper training and equipment. Improper heat work is a fire and damage risk. Many owners hire the yard.",
      },
    ],
    faqs: [
      {
        question: "Does shrink wrap replace winterization?",
        answer:
          "No. Shrink wrap protects the exterior. Engine and systems winterization is separate and must follow manufacturer guidance.",
      },
    ],
    popularSearches: [
      { label: "Winterizing Guide", href: "/chicago-boat-winterizing-guide" },
      { label: "Boat Storage Guide", href: "/chicago-boat-storage-guide" },
      { label: "Boat Ownership", href: "/boat-ownership" },
    ],
    relatedSlugs: [
      "chicago-boat-storage-guide",
      "winter-boat-storage-chicago",
      "chicago-boat-winterizing-guide",
      "spring-boat-launch-checklist-chicago",
      "chicago-boat-detailing-guide",
    ],
    showLeadForm: false,
  },
  {
    slug: "buying-a-boat-off-season-chicago",
    title: "Buying a Boat During the Chicago Off-Season",
    seoTitle: "Buying a Boat Off-Season in Chicago | Survey & Storage Tips",
    seoDescription:
      "Why some Chicago buyers shop for boats in fall and winter — surveys, storage, insurance, and Harbor constraints. Not a brokerage. Confirm listings on the seller’s terms.",
    headline: "Buying a Boat in the Chicago Off-Season",
    intro:
      "Fall and winter are when many used boats sit on the hard, making surveys and comparisons easier than a frantic June launch week. This guide covers planning — not sales pitches. BoatingChicago does not broker boats or guarantee listings.",
    sections: [
      {
        heading: "Why off-season shopping can help",
        paragraphs: [
          "Boats in storage are often easier to inspect thoroughly than boats in crowded summer slips. Buyers can compare multiple candidates, schedule a marine surveyor, and negotiate with storage and spring commissioning costs already in view.",
          "Trade-offs exist: you may pay for remaining winter storage, and you will not splash the boat until spring. Budget for survey, haul if needed, taxes/registration, insurance, and a slip or trailer plan before you fall in love with a hull.",
        ],
      },
      {
        heading: "Survey before you celebrate",
        paragraphs: [
          "A pre-purchase survey by an independent marine surveyor is still the practical way to separate a sound boat from an expensive surprise — especially after seasons of Lake Michigan use and freeze–thaw storage. Sea trials may wait until spring for hard-stored boats; ask the surveyor how they handle that sequence.",
          "Engine hour meters, service records, and winterization documentation matter. Missing history is information, not a bargain signal.",
        ],
      },
      {
        heading: "Local constraints: harbors, trailers, and insurance",
        paragraphs: [
          "A Chicago-area boat needs a place to live: Chicago Harbors seasonal arrangements, a North Shore or Indiana slip, or a trailer-plus-launch plan. Confirm waitlists and eligibility with the operator — we do not invent slip availability.",
          "Insurers may ask about storage location, experience, and equipment. Get a quote before closing. Membership towing products (for example BoatUS-style programs) are separate decisions; our BoatUS affiliate link stays inactive until approved.",
        ],
      },
      {
        heading: "Where people look for listings",
        paragraphs: [
          "Marketplaces such as Boat Trader are common discovery tools. When we link to Boat Trader it is a labeled affiliate relationship via Awin — we do not endorse a specific listing or guarantee price. Compare private sales, dealers, and broker listings carefully.",
          "For ownership costs after purchase, read the boat ownership guide and winter storage / winterizing guides so spring splash day is funded and scheduled.",
        ],
      },
    ],
    comparisonTable: {
      caption: "Off-season vs in-season buying",
      headers: ["Factor", "Off-season", "Peak summer"],
      rows: [
        ["Inspection access", "Often easier on the hard", "Busy docks; short visits"],
        ["Use immediately", "Usually wait for spring", "Possible same season"],
        ["Negotiation climate", "Often more patient", "FOMO-driven weekends"],
        ["Storage costs", "May assume remaining winter fees", "Already in water"],
      ],
    },
    seasonalTips: [
      {
        season: "Fall",
        tip: "Shop boats as they haul out — survey calendars fill when yards get busy.",
      },
      {
        season: "Winter",
        tip: "Use boat shows for education and dealer conversations; still get an independent survey on any serious candidate.",
      },
      {
        season: "Spring",
        tip: "Commissioning slots go early — buy with a splash plan, not hope.",
      },
    ],
    peopleAlsoAsk: [
      {
        question: "Is winter a good time to buy a boat in Chicago?",
        answer:
          "It can be, if you budget for storage, survey, and spring commissioning. You generally will not use the boat until the harbor season opens.",
      },
      {
        question: "Does BoatingChicago sell boats?",
        answer:
          "No. We publish planning guides and may link to labeled affiliate marketplaces. We do not broker private sales.",
      },
    ],
    faqs: [
      {
        question: "Should I skip a survey to save money?",
        answer:
          "That is rarely wise on used boats bound for Lake Michigan. Survey costs are small next to engine or structural surprises.",
      },
    ],
    popularSearches: [
      { label: "Boat Ownership", href: "/boat-ownership" },
      { label: "Chicago Boat Show Guide", href: "/chicago-boat-show-buyer-guide" },
      { label: "Winterizing", href: "/chicago-boat-winterizing-guide" },
      { label: "Marinas", href: "/marinas" },
    ],
    relatedSlugs: [
      "boat-ownership",
      "chicago-boat-show-buyer-guide",
      "chicago-boat-storage-guide",
      "chicago-boat-winterizing-guide",
      "beginners-guide-boating-chicago",
    ],
    showLeadForm: false,
  },
  {
    slug: "chicago-boat-show-buyer-guide",
    title: "Chicago Boat Show Buyer Prep & Questions",
    seoTitle: "Chicago Boat Show 2027 Buyer Guide | Rosemont Prep & Questions",
    seoDescription:
      "Prepare for the Discover Boating Chicago Boat Show — verified 2027 dates and Rosemont location from the organizer, plus buyer questions. Confirm tickets and hours on chicagoboatshow.com.",
    headline: "Chicago Boat Show: Buyer Preparation and Smart Questions",
    intro:
      "Boat shows are useful for comparing brands, sitting in cockpits, and talking with dealers — not for skipping surveys or ignoring Lake Michigan ownership costs. Dates and venue below are taken from the official Chicago Boat Show site; always re-confirm on chicagoboatshow.com before you travel.",
    sections: [
      {
        heading: "Verified show basics (confirm before you go)",
        paragraphs: [
          "According to the official Discover Boating Chicago Boat Show site (https://www.chicagoboatshow.com/), the show is listed for February 3–7, 2027 at the Donald E. Stephens Convention & Conference Center, 5555 N. River Road, Rosemont, IL 60018.",
          "Published show hours on that official page (re-check before you travel): Wednesday 2 PM–8 PM; Thursday 11 AM–8 PM; Friday 11 AM–8 PM; Saturday 10 AM–8 PM; Sunday 10 AM–5 PM. Ticket products and any schedule changes are controlled by the organizer — use chicagoboatshow.com, not secondary blogs.",
          "The show moved away from McCormick Place; do not navigate to the old venue out of habit. Organizer contact details are published on the official site.",
        ],
      },
      {
        heading: "How to use the show without overbuying",
        paragraphs: [
          "Decide your use case first: trailered day boat, pontoon for inland lakes, or a harbor-kept cruiser. Chicago Harbors access, winter storage, and tow vehicle capacity constrain real choices more than glossy booth lighting does.",
          "Collect brochures and card contacts, then sleep on major purchases. Deposit pressure is sales process — not a weather window. For used boats elsewhere, still budget an independent survey.",
        ],
      },
      {
        heading: "Questions worth asking every dealer",
        paragraphs: [
          "What is included in the quoted price (freight, prep, trailers, electronics packages)? What warranty applies in Illinois/Lake Michigan use? Who performs commissioning locally? What is the expected wait for the exact configuration you want?",
          "Ask about winterization expectations for that model, recommended storage, and insurance notes the dealer commonly hears from Chicago-area buyers. Write answers down — booth conversations blur together by Saturday afternoon.",
        ],
      },
      {
        heading: "After the show",
        paragraphs: [
          "Compare ownership costs using our boat ownership and off-season buying guides. If you pursue a used listing on a marketplace, remember affiliate links to Boat Trader are labeled paid relationships — not endorsements of a specific hull.",
          "Ticket prices, parking, and exhibitor lists change; use the official show site and app/guide materials the organizer publishes for the current year.",
        ],
      },
    ],
    comparisonTable: {
      caption: "Show floor vs careful purchase process",
      headers: ["Step", "At the show", "Before you commit"],
      rows: [
        ["Fit / layout", "Sit in boats; compare cockpits", "Match to your real crew and water"],
        ["Price talk", "Ask what is included", "Get written quotes; compare apples-to-apples"],
        ["Local support", "Ask who commissions nearby", "Confirm yard capacity for spring"],
        ["Used boats", "Education only at most booths", "Independent survey + sea trial plan"],
      ],
    },
    seasonalTips: [
      {
        season: "Before the show",
        tip: "Confirm dates, hours, and tickets on chicagoboatshow.com — not on outdated blogs.",
      },
      {
        season: "At the show",
        tip: "Photograph option stickers and write VIN/model notes for later comparison.",
      },
      {
        season: "After the show",
        tip: "Revisit storage and harbor plans before signing anything.",
      },
    ],
    peopleAlsoAsk: [
      {
        question: "When is the Chicago Boat Show in 2027?",
        answer:
          "The official Chicago Boat Show site lists February 3–7, 2027 in Rosemont. Re-confirm on chicagoboatshow.com before traveling.",
      },
      {
        question: "Where is the Chicago Boat Show now?",
        answer:
          "The organizer lists the Donald E. Stephens Convention & Conference Center in Rosemont, Illinois — not McCormick Place. Verify on the official site.",
      },
    ],
    faqs: [
      {
        question: "Does BoatingChicago sell tickets?",
        answer:
          "No. Buy tickets through the official show channels published by the organizer.",
      },
      {
        question: "Should I buy a boat at the show without a survey?",
        answer:
          "New-boat purchases follow dealer processes; used boats still deserve independent evaluation. Do not skip due diligence because a booth is busy.",
      },
    ],
    popularSearches: [
      { label: "Buying Off-Season", href: "/buying-a-boat-off-season-chicago" },
      { label: "Boat Ownership", href: "/boat-ownership" },
      { label: "Beginners Guide", href: "/beginners-guide-boating-chicago" },
      { label: "Marinas", href: "/marinas" },
    ],
    relatedSlugs: [
      "buying-a-boat-off-season-chicago",
      "beginners-guide-boating-chicago",
      "chicago-boat-storage-guide",
      "chicago-marina-guide",
      "spring-boat-launch-checklist-chicago",
    ],
    showLeadForm: false,
  },
  {
    slug: "spring-boat-launch-checklist-chicago",
    title: "Chicago Spring Boat Launch Checklist",
    seoTitle:
      "Chicago Spring Boat Launch Checklist | Lake Michigan Commissioning Prep",
    seoDescription:
      "A source-backed Chicago and Lake Michigan spring launch checklist — manufacturer-directed service, safety gear, registration, launch access, and official conditions. Not a universal DIY procedure.",
    headline: "Spring Boat Launch Checklist for Chicago & Lake Michigan",
    intro:
      "Getting a Chicago-area boat ready after winter is a planning sequence, not a single weekend DIY script. This checklist points owners to manufacturer instructions, qualified service, official registration and safety rules, public launch access, and National Weather Service conditions. It is not a universal mechanical procedure and it is not legal advice.",
    sections: [
      {
        heading: "1. Schedule manufacturer-directed commissioning",
        paragraphs: [
          "Engine, drive, generator, and systems commissioning steps differ by brand and model year. Start with the current owner’s manuals and the engine manufacturer’s commissioning / de-winterizing guidance for your specific powerplant. If a yard’s “spring package” differs from the manufacturer’s instructions, ask the yard to match the manufacturer — not the other way around.",
          "Book marine service early. Chicago-area shops fill before the first warm May weekend. Document what was inspected or serviced, with dates and who performed the work. BoatingChicago does not publish a single impeller, antifreeze, or fogging sequence for all boats.",
        ],
      },
      {
        heading: "2. Safety equipment before the first trip",
        paragraphs: [
          "Federal recreational-boat carriage requirements are published by the U.S. Coast Guard. Confirm life jackets that fit every person aboard, visual distress signals where required, sound-producing devices, fire extinguishers appropriate to the boat, and navigation lights that work — then re-check expiration dates on flares and extinguisher service tags.",
          "Official USCG recreational boating safety materials are the reference, not a blog checklist. Illinois also publishes boating safety-education and equipment expectations through the Illinois Department of Natural Resources. Replace anything that failed in storage before you trailer to a ramp.",
        ],
      },
      {
        heading: "3. Registration, titles, and paperwork",
        paragraphs: [
          "Illinois registration, titling, and related boating rules are published by the Illinois Department of Natural Resources (dnr.illinois.gov/boating.html). Confirm the boat’s registration is current, numbers/decals are displayed as required, and any trailer registration or tow-vehicle requirements in your state are satisfied before launch day.",
          "If the boat is principally used in Wisconsin, Indiana, or Michigan, follow that state’s registration and education rules. Do not treat this page as a substitute for the issuing agency’s current instructions.",
        ],
      },
      {
        heading: "4. Confirm launch or harbor access",
        paragraphs: [
          "Public ramps and harbor gates publish their own hours, fees, and seasonal rules. Use our boat launches and marinas directories to find the operator’s official page, then confirm access for the day you plan to splash — we do not reprint dollar amounts that go stale.",
          "If the boat wintered at a yard, confirm the operator’s spring launch window and any requirement that you be present. Coordinate slip assignment or trailer parking before the travel lift is scheduled.",
        ],
      },
      {
        heading: "5. Check official conditions — not a go/no-go app",
        paragraphs: [
          "Before you leave the yard or driveway, read National Weather Service marine products for your area (weather.gov and our /weather page, which links area forecasts). Area forecasts and nearshore products are not the same as a wind sensor at your exact ramp or harbor mouth.",
          "Our informational boating rating is never a safety clearance. If alerts or observations fail to load, treat conditions as unknown and verify on weather.gov — never assume “no alerts” means the lake is calm.",
        ],
      },
      {
        heading: "How this fits winter planning",
        paragraphs: [
          "Spring commissioning is easier when fall haul-out, winterization, and storage were documented. See the winter storage guide, winterizing guide, and the storage & haul-out directory for operator links confirmed from official sites.",
          "Ownership cost context — slips, insurance, and surveys — lives on the boat ownership hub. Affiliate shopping links elsewhere on the site are labeled paid relationships, not endorsements of a specific yard or hull.",
        ],
      },
    ],
    comparisonTable: {
      caption: "Spring launch planning checklist (Chicago-area)",
      headers: ["Focus", "What to confirm", "Where to confirm"],
      rows: [
        [
          "Systems / engine",
          "Commissioning steps for your model",
          "Manufacturer manuals + qualified marine service",
        ],
        [
          "Safety gear",
          "Carriage requirements and working equipment",
          "USCG recreational boating safety + IL DNR",
        ],
        [
          "Paperwork",
          "Current registration / education rules",
          "State DNR (IL, WI, IN, or MI as applicable)",
        ],
        [
          "Access",
          "Ramp/harbor hours, fees, launch window",
          "Operator official page via launches/marinas directories",
        ],
        [
          "Conditions",
          "Marine forecasts and alerts for the area",
          "weather.gov + BoatingChicago /weather area forecast",
        ],
      ],
    },
    seasonalTips: [
      {
        season: "Late winter",
        tip: "Book commissioning appointments before April shop calendars fill.",
      },
      {
        season: "Early spring",
        tip: "Confirm yard launch dates and ramp/harbor access on official operator pages.",
      },
      {
        season: "First trips",
        tip: "Re-check NWS marine products the morning you go — products change quickly.",
      },
      {
        season: "After splash",
        tip: "Keep service records with the boat; they help warranty claims and future buyers.",
      },
    ],
    peopleAlsoAsk: [
      {
        question: "When do Chicago boats typically launch in spring?",
        answer:
          "Many yards and harbors begin launching in a late-April to mid-May window depending on ice-out, weather, and operator schedules. Confirm dates with your storage yard or harbor — they are not fixed by this site.",
      },
      {
        question: "Is this a do-it-yourself winterization reverse checklist?",
        answer:
          "No. Mechanical steps must follow your manufacturer’s instructions or a qualified marine technician. This page is a planning checklist with official sources.",
      },
      {
        question: "Where do I check Illinois boat registration?",
        answer:
          "Use the Illinois Department of Natural Resources boating pages at dnr.illinois.gov/boating.html for current registration and related rules.",
      },
      {
        question: "Does BoatingChicago tell me if it is safe to go?",
        answer:
          "No. We surface NOAA/NWS products and an informational summary. Always verify marine forecasts and alerts on weather.gov before you boat.",
      },
    ],
    faqs: [
      {
        question: "Do I need a fishing license to launch my boat?",
        answer:
          "A boat launch does not require a fishing license by itself. Fishing in Illinois waters has separate license rules published by IL DNR. Confirm both launch access and fishing rules if you plan to fish.",
      },
      {
        question: "Can I use any public ramp listed on this site?",
        answer:
          "Only if the operating agency currently allows it. Use each launch’s official link for hours, fees, and seasonal closures — listings are planning aids, not permits.",
      },
      {
        question: "Where is the storage and haul-out directory?",
        answer:
          "See /storage for operators whose official websites confirm winter storage and/or haul-out services. Ask each operator for quotes and availability.",
      },
    ],
    popularSearches: [
      { label: "Storage & haul-out directory", href: "/storage" },
      { label: "Winter boat storage", href: "/winter-boat-storage-chicago" },
      { label: "Winterizing guide", href: "/chicago-boat-winterizing-guide" },
      { label: "Boat launches", href: "/boat-launches" },
      { label: "Boating weather", href: "/weather" },
      { label: "Boat ownership", href: "/boat-ownership" },
    ],
    relatedSlugs: [
      "winter-boat-storage-chicago",
      "chicago-boat-storage-guide",
      "chicago-boat-winterizing-guide",
      "chicago-boat-shrink-wrap-guide",
      "buying-a-boat-off-season-chicago",
      "essential-boating-gear-chicago",
    ],
    showLeadForm: false,
  },
  {
    slug: "chicago-boat-winterization",
    title: "Chicago Boat Winterization Hub",
    seoTitle: "Chicago Boat Winterization Hub 2026 | Storage, Haul-Out & Prep",
    seoDescription:
      "Concise Chicago winterization hub: harbor season versus yard haul-out dates, plus links to storage, winterizing, shrink wrap, and the haul-out directory.",
    headline: "Chicago Boat Winterization: One Page to Plan the Off-Season",
    intro:
      "This is a planning hub, not a universal winterizing recipe. Use it to line up haul-out, storage, engine work, and shrink wrap — then follow your manufacturer’s manual or a qualified marine technician for the boat itself.",
    sections: [
      {
        heading: "Harbor season is not your haul-out date",
        paragraphs: [
          "Chicago Harbors / Chicago Park District materials used on this site state the lakefront harbor season as May 1 through October 31. That is the published operating season for the public harbor program. It is not a claim that every harbor, slip, or related facility is operating or available on a given day, and it is not your storage yard’s pull date.",
          "Private marinas, boat yards, and dry-storage operators set their own haul-out windows, late-leaver rules, and indoor/outdoor contracts. Confirm those dates with the operator that will actually lift or store the boat. Chicago Harbors also publishes late-leaver and related fees on its official rates pages when a vessel stays past the program’s published season — read the current sheet rather than assuming last year’s terms.",
        ],
      },
      {
        heading: "What to schedule, in order",
        paragraphs: [
          "Book the lift or trailer slot first. Align engine and systems winterization with the day the boat becomes accessible on the hard — leaving raw-water systems unprotected through an early freeze is a common expensive mistake.",
          "Then decide outdoor cover versus shrink wrap versus indoor storage, and whether batteries, canvas, and electronics stay aboard. The linked guides below go deeper; this page does not repeat their procedures.",
        ],
      },
      {
        heading: "Official starting points",
        paragraphs: [
          "Chicago Harbors: chicagoharbors.info — season, slips, and published late-season fees. Illinois DNR boating pages cover registration and related rules. NOAA/NWS products on our weather page are planning inputs, not a go/no-go clearance.",
          "BoatingChicago does not take haul-out reservations or sell winterizing. Confirm current space and service dates with the operator.",
        ],
      },
    ],
    comparisonTable: {
      caption: "Which page to open next",
      headers: ["Need", "Open", "Do not expect"],
      rows: [
        [
          "Who can store or haul the boat",
          "/storage directory",
          "Live quotes or reserved space",
        ],
        [
          "How storage types differ",
          "Storage and winter-storage guides",
          "A single price for every yard",
        ],
        [
          "Engine and systems work",
          "Winterizing guide + your manual",
          "One DIY recipe for all engines",
        ],
        [
          "Cover / wrap decisions",
          "Shrink wrap guide",
          "A wrap that replaces winterization",
        ],
      ],
    },
    seasonalTips: [
      {
        season: "Late summer",
        tip: "Reserve haul-out and indoor space before September calendars fill.",
      },
      {
        season: "October",
        tip: "Harbor season through Oct 31 is not the same as your yard’s last lift day — confirm both.",
      },
      {
        season: "After haul-out",
        tip: "Finish engine protection before the first hard freeze, even if shrink wrap is scheduled later.",
      },
      {
        season: "Late winter",
        tip: "Book spring commissioning early; April shop slots go first.",
      },
    ],
    peopleAlsoAsk: [
      {
        question: "When does Chicago harbor season end?",
        answer:
          "Official Chicago Harbors materials cited on this site state May 1 through October 31. Confirm the current year on chicagoharbors.info. Those are published program dates, not a claim every facility is operating, and your yard’s haul-out date can be earlier.",
      },
      {
        question: "Is winterization the same as shrink wrap?",
        answer:
          "No. Shrink wrap protects the exterior. Engine and systems winterization is separate and must follow manufacturer guidance.",
      },
      {
        question: "Does BoatingChicago winterize boats?",
        answer:
          "No. We publish planning pages and a directory of operators whose official sites confirm storage or haul-out. Hire service directly.",
      },
    ],
    faqs: [
      {
        question: "Where do I start if I only have time for one page?",
        answer:
          "Use this hub, then open the storage directory for operator links and the winterizing guide for engine/systems planning.",
      },
      {
        question: "Are facility haul-out dates the same as harbor season?",
        answer:
          "Not necessarily. Harbor season is a Chicago Harbors program date range. Storage yards and private marinas publish their own lift and contract dates.",
      },
    ],
    popularSearches: [
      { label: "Storage & haul-out directory", href: "/storage" },
      { label: "Winterizing guide", href: "/chicago-boat-winterizing-guide" },
      { label: "Winter storage", href: "/winter-boat-storage-chicago" },
      { label: "Shrink wrap", href: "/chicago-boat-shrink-wrap-guide" },
      { label: "Spring launch checklist", href: "/spring-boat-launch-checklist-chicago" },
      { label: "Boat ownership", href: "/boat-ownership" },
    ],
    relatedSlugs: [
      "chicago-boat-winterizing-guide",
      "winter-boat-storage-chicago",
      "chicago-boat-storage-guide",
      "chicago-boat-shrink-wrap-guide",
      "spring-boat-launch-checklist-chicago",
      "chicago-transient-dockage",
    ],
    showLeadForm: false,
  },
  {
    slug: "chicago-transient-dockage",
    title: "Chicago Transient Dockage Guide",
    seoTitle: "Chicago Transient Dockage 2026 | Chicago Harbors Reservations",
    seoDescription:
      "How visiting boaters request Chicago Harbors transient dockage: official reservation rules, published 2026 daily rates, season dates, and what this site does not claim.",
    headline: "Transient Dockage at Chicago Harbors",
    intro:
      "Visiting boaters use Chicago Park District / Chicago Harbors facilities — not this website — to request a night or a few nights of dockage. The notes below were checked against official Chicago Harbors pages on October 27, 2026. Rates, minimum stays, and reservation windows change; confirm on chicagoharbors.info before you go. This page does not claim a slip is available.",
    sections: [
      {
        heading: "How to request a transient stay",
        paragraphs: [
          "Chicago Harbors’ official Transient Reservation Requests page states that transient docking is available by phone or in person at the harbor of your choice beginning May 15 at 8:00 a.m., depending on availability. Online reservation requests may be made beginning May 16 at 8:00 a.m.",
          "The online form is a request, not a confirmed booking. The official page says there is no guarantee a specific request will be honored; if they can accommodate it, they contact you. Online service is limited. A two- or three-day minimum stay may be required during holidays and special events.",
          "The same official page requires 24-hour notice to cancel; insufficient notice or a no-show is charged one night of stay. Transient dockage cannot be used for commercial purposes. Navy Pier hourly transient dockage is handled separately through Dockwa, per Chicago Harbors — use their current Dockwa instructions, not this site, for that location.",
        ],
      },
      {
        heading: "Season versus reservation start",
        paragraphs: [
          "Official Chicago Harbors materials used elsewhere on this site state the harbor season as May 1 through October 31. That is the published seasonal-mooring season. Transient reservation requests, on the official 2026 form page we checked, start later — May 15 in person/phone and May 16 online. Do not treat May 1 as the first day you can request a transient slip.",
          "The official daily-dockage page lists Montrose, Belmont, Diversey, DuSable, Monroe, Burnham, 31st Street, 59th Street, Jackson Inner, and Jackson Outer as harbors you can select. Spaces can be limited; they recommend reserving ahead.",
        ],
      },
      {
        heading: "Published daily transient rates (official, 2026 check)",
        paragraphs: [
          "The following daily transient figures appeared on both the Chicago Harbors Daily Dockage page and the Rates and Applications page when checked on October 27, 2026. They are per foot unless noted. Official footnotes: a 2- to 3-day minimum may apply for special events or holidays; star dock/mooring can and wall space have a 25-foot minimum; stalls have a 30-foot minimum. City tax and other surcharges may apply — the official sheets control.",
          "Star dock / mooring can: $1.50 per foot. Wall space: $2.00 per foot. Stalls at 31st Street, Belmont, Burnham, Diversey, DuSable, and Montrose: $3.50 per foot for 30–60 feet and $6.00 per foot for 61 feet and longer. Stalls at Jackson and 59th Street: $2.50 per foot (30–39), $2.75 (40–60), and $4.00 (61+).",
          "Published electric charges on those same pages: single 30 amp $10/day; twin 30 amp $20/day; single 50 amp $20/day; twin 50 amp $25/day; 100 amp $30/day.",
          "We are not reprinting seasonal slip fees or launch-ramp prices here. The official rates pages listed different launch-ramp dollar amounts on the same day we checked, so use chicagoharbors.info/rates-applications/ and the 2026 rate sheet PDF rather than any third-party recap. Seasonal mooring applications are a different process from transient requests.",
        ],
      },
    ],
    comparisonTable: {
      caption: "Official Chicago Harbors links",
      headers: ["Need", "Official page", "This site"],
      rows: [
        [
          "Request a stay",
          "chicagoharbors.info/forms/transient/",
          "Explains that it is a request, not a guarantee",
        ],
        [
          "Daily dockage overview",
          "chicagoharbors.info/daily-dockage/",
          "Summarizes published rates with a check date",
        ],
        [
          "Full fee sheet",
          "chicagoharbors.info/rates-applications/",
          "Does not reprint the entire seasonal sheet",
        ],
        [
          "Harbor character",
          "Individual harbor pages / our marina guides",
          "Not a substitute for harbor-office instructions",
        ],
      ],
    },
    seasonalTips: [
      {
        season: "Before May 15",
        tip: "Do not assume the online transient form is open — official 2026 copy started in-person/phone May 15 and online May 16.",
      },
      {
        season: "Summer weekends",
        tip: "Official pages say space can be limited; request ahead, especially downtown harbors.",
      },
      {
        season: "Holidays / events",
        tip: "Expect possible 2–3 day minimums. Some events use a separate reservation page on the official site.",
      },
      {
        season: "After October",
        tip: "Harbor season published as ending October 31; confirm late-season or haul-out options with the operator.",
      },
    ],
    peopleAlsoAsk: [
      {
        question: "How do I reserve a transient slip in Chicago?",
        answer:
          "Use Chicago Harbors’ official transient request form, or call/visit the harbor. The form is a request. Confirm on chicagoharbors.info/forms/transient/.",
      },
      {
        question: "What does Chicago Harbors charge for transient dockage?",
        answer:
          "As published on official pages checked October 27, 2026, typical stall rates were $3.50/ft (30–60 ft) or $6.00/ft (61+ ft) at most listed harbors, with lower stall rates at Jackson and 59th Street. Confirm live figures on the official rates pages.",
      },
      {
        question: "Does BoatingChicago book transient slips?",
        answer:
          "No. We do not take reservations or show live availability.",
      },
    ],
    faqs: [
      {
        question: "Is an online transient form a confirmed reservation?",
        answer:
          "No. Chicago Harbors states the form is only a request and they will contact you if they can accommodate it.",
      },
      {
        question: "Can I use a transient slip for a charter or rental business?",
        answer:
          "Official daily-dockage copy says transient dockage cannot be used for commercial purposes. Commercial permits are a separate official process.",
      },
      {
        question: "Where is Navy Pier hourly dockage reserved?",
        answer:
          "Chicago Harbors directs Navy Pier hourly transient dockage to Dockwa. Use their current official instructions.",
      },
    ],
    popularSearches: [
      { label: "Chicago marina guide", href: "/chicago-marina-guide" },
      { label: "Marinas directory", href: "/marinas" },
      { label: "Monroe Harbor", href: "/monroe-harbor-guide" },
      { label: "Burnham Harbor", href: "/burnham-harbor-guide" },
      { label: "Winterization hub", href: "/chicago-boat-winterization" },
      { label: "Boating weather", href: "/weather" },
    ],
    relatedSlugs: [
      "chicago-marina-guide",
      "monroe-harbor-guide",
      "burnham-harbor-guide",
      "dusable-harbor-guide",
      "lake-michigan-boating-guide",
      "chicago-boat-winterization",
    ],
    showLeadForm: false,
  },
];
