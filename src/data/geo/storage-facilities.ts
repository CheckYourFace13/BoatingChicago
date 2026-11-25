import type { StorageFacility } from "@/types/geo";

/** Last day these official storage pages were re-checked for this directory. */
const VERIFIED = "2026-11-25";

/**
 * Chicago-area winter storage and haul-out operators with official-site confirmation.
 * Free editorial directory — not a marketplace, ranking, or paid listing.
 * Ask each operator for current quotes, contracts, and availability.
 */
export const storageFacilities: StorageFacility[] = [
  {
    slug: "chicago-harbors-winter-storage",
    name: "Chicago Harbors Winter Storage",
    location: "Chicago, IL — 31st Street Harbor and Montrose Harbor",
    serviceArea:
      "Chicago Harbors slip holders and boaters arranging lakefront winter storage through Chicago Harbors / Westrec",
    summary:
      "Official Chicago Harbors winter storage page lists winter boat storage at 31st Street Harbor (indoor heated and outdoor) and Montrose Harbor (outdoor), with haul-out typically in October and launching beginning in April. Storage packages described on that page include haul-out, launching, and blocking/standing (or owner cradle/trailer options).",
    confirmedServices: [
      "Winter storage (31st Street indoor heated & outdoor; Montrose outdoor)",
      "Haul-out and spring launching",
      "Blocking / standing (or owner cradle/trailer options)",
      "Approved winter-service vendor program (listed on the official page)",
    ],
    officialWebsite: "https://www.chicagoharbors.info/winter-storage/",
    source: {
      name: "Chicago Harbors — Winter Storage",
      url: "https://www.chicagoharbors.info/winter-storage/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "crowleys-yacht-yard-lakeside",
    name: "Crowley's Yacht Yard Lakeside",
    location: "3434 East 95th Street, Chicago, IL (Calumet River)",
    serviceArea:
      "Chicago south lakefront / Calumet River access to Lake Michigan",
    summary:
      "Operator storage page describes indoor and outdoor yard storage at a Chicago Calumet River facility with travel lifts, crane capacity, deep-water docks, and 24-hour guard service. Haul and load-out services are described on the yard’s haul page; confirm current capabilities with the yard.",
    confirmedServices: [
      "Indoor and outdoor boat storage",
      "Marine travel lifts and crane (per operator storage/haul pages)",
      "Haul / load-out coordination (per operator haul page)",
      "Ship’s store and yard access options (per operator)",
    ],
    officialWebsite: "https://crowleys.com/storage",
    source: {
      name: "Crowley's Yacht Yard — Storage",
      url: "https://crowleys.com/storage",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "larsen-marine-waukegan",
    name: "Larsen Marine",
    location: "625 E Sea Horse Drive, Waukegan, IL",
    serviceArea: "Waukegan Harbor area / northern Illinois Lake Michigan",
    summary:
      "Official storage page describes winter storage packages that include haul-out, hull bottom pressure wash, and spring launch, plus mast storage, dry stack, and trailer storage options. The operator asks customers to call for pricing and availability.",
    confirmedServices: [
      "Winter storage (haul-out, bottom wash, and spring launch included per storage page)",
      "Indoor mast storage and other mast options",
      "Dry stack and trailer storage (per storage page)",
      "Onsite service and ship’s store",
    ],
    officialWebsite: "https://larsenmarine.com/storage/",
    source: {
      name: "Larsen Marine — Storage",
      url: "https://larsenmarine.com/storage/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "southport-marina-kenosha",
    name: "Southport Marina",
    location: "21 56th Street, Kenosha, WI (Harbor Park)",
    serviceArea: "Kenosha Harbor Park / southern Wisconsin Lake Michigan",
    summary:
      "Official slip-rentals page describes heated indoor winter storage and outdoor storage capacity, and the marina site lists a travel lift and mechanical service. Contact the marina for current rates and space — we do not publish quotes.",
    confirmedServices: [
      "Heated indoor winter storage",
      "Outdoor winter storage",
      "Travel lift (listed among marina amenities)",
      "Mechanical service (listed among marina amenities)",
    ],
    officialWebsite: "https://www.spmarina.net/slip-rentals",
    source: {
      name: "Southport Marina — Slip Rentals / Winter Storage",
      url: "https://www.spmarina.net/slip-rentals",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "chicago-yacht-works-calumet",
    name: "Chicago Yacht Works",
    location: "13620 S. Hoxie Avenue, Chicago, IL (Calumet River)",
    serviceArea:
      "Calumet River / south Chicago access toward Lake Michigan via Thomas O’Brien Locks",
    summary:
      "Official storage page describes heated indoor storage (including rack options) and outdoor storage at a Calumet River yard with travel lifts and security cameras. The operator publishes seasonal pricing structures on that page and notes indoor requests may be waitlisted — confirm current rates, deposits, and space directly with the yard.",
    confirmedServices: [
      "Heated indoor storage (building and rack options described on operator page)",
      "Outdoor storage",
      "Haul / power-wash placement described on operator storage page",
      "Travel lifts (operator lists multiple lifts including a large south-side capacity)",
    ],
    officialWebsite: "https://www.chicagoyachtworks.com/storage/",
    source: {
      name: "Chicago Yacht Works — Storage",
      url: "https://www.chicagoyachtworks.com/storage/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "bay-marine-chicago-waukegan",
    name: "Bay Marine Chicago",
    location: "3 East Madison Street, Waukegan, IL",
    serviceArea: "Waukegan / northern Illinois Lake Michigan service & storage",
    summary:
      "Official storage page describes indoor heated and outdoor storage, haul-out capability stated up to 80 tons, shrink-wrapping, winter access during business hours, and in-season storage/launch programs. The operator asks customers to contact them for storage, haul-out, and winterizing pricing — we do not republish quotes.",
    confirmedServices: [
      "Indoor heated storage",
      "Outdoor storage with shrink-wrapping (per operator page)",
      "Haul-out / launch coordination",
      "On-site service while stored (per operator page)",
    ],
    officialWebsite: "https://www.baymarinechicago.com/storage/",
    source: {
      name: "Bay Marine Chicago — Storage",
      url: "https://www.baymarinechicago.com/storage/",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
  {
    slug: "pier-11-marina-chicago",
    name: "Pier 11 Marina",
    location: "826 E 138th Street, Chicago, IL",
    serviceArea: "Southeast Chicago / Calumet area Lake Michigan access",
    summary:
      "Official storage page describes outdoor yard storage with a 60-ton lift and heated indoor storage partnered via Paoli Storage in Rockford for qualifying trailered boats under a stated height limit. As of the 2026-11-25 check, the operator’s page stated winter storage 2026–27 was full unless the boat is on a trailer — treat that as a dated snapshot and reconfirm with the marina.",
    confirmedServices: [
      "Outdoor winter storage (operator asks callers for pricing)",
      "Heated indoor option via partner facility for qualifying trailered boats (per operator page)",
      "Travel lift capacity listed at 60 tons",
      "Wet slips described separately on the same operator site",
    ],
    officialWebsite: "https://www.pier11marina.com/storage",
    source: {
      name: "Pier 11 Marina — Storage",
      url: "https://www.pier11marina.com/storage",
      lastVerified: VERIFIED,
    },
    isPublished: true,
  },
];
