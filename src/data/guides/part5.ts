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
          "Many Chicago Harbors and regional yards schedule haul-outs through October, with exact windows published by the operator. Align mechanic appointments with the day the boat becomes accessible on the hard. Leaving a raw-water engine unprotected through a cold snap after haul-out is a common expensive mistake.",
          "For storage choices and shrink wrap decisions, see our Chicago boat storage and shrink wrap guides. For ownership planning beyond winter, see the boat ownership hub.",
        ],
      },
      {
        heading: "Spring is part of winterizing",
        paragraphs: [
          "De-winterizing is not “just add fuel.” Impellers, anodes, zincs, bellows, and cooling integrity get attention during commissioning for a reason. Schedule spring service early — April shop calendars fill before the first warm weekend on the lake.",
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
      { label: "Chicago Boat Storage Guide", href: "/chicago-boat-storage-guide" },
      { label: "Shrink Wrap Guide", href: "/chicago-boat-shrink-wrap-guide" },
      { label: "Boat Ownership", href: "/boat-ownership" },
      { label: "Winter Storage Checklist", href: "/winter-boat-storage-chicago" },
    ],
    relatedSlugs: [
      "chicago-boat-storage-guide",
      "winter-boat-storage-chicago",
      "chicago-boat-shrink-wrap-guide",
      "chicago-boat-repair-guide",
      "boat-ownership",
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
          "According to the official Discover Boating Chicago Boat Show site (chicagoboatshow.com), the show is listed for February 3–7, 2027 at the Donald E. Stephens Convention & Conference Center, 5555 N. River Road, Rosemont, IL 60018. Published show hours on that site (as of our last check) include Wednesday 2 PM–8 PM, Thursday–Saturday windows through evening, and Sunday ending earlier — re-check the organizer page for ticket products and any schedule changes.",
          "The show moved away from McCormick Place; do not navigate to the old venue out of habit. Organizer contact details are published on the official about/FAQ pages.",
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
      "boat-ownership",
      "beginners-guide-boating-chicago",
      "chicago-boat-storage-guide",
      "chicago-marina-guide",
    ],
    showLeadForm: false,
  },
];
