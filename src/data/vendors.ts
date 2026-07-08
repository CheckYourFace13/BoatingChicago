import type { Vendor } from "@/types";

export const vendors: Vendor[] = [
  {
    slug: "sample-chicago-party-boat-partner",
    name: "Sample Chicago Party Boat Partner",
    category: "Party Boat Rentals",
    categorySlug: "party-boat-rentals-chicago",
    location: "Chicago Harbor, Near Playpen",
    description:
      "Placeholder listing for large party boats perfect for groups of 20–50 on Lake Michigan. Great for birthdays, bachelor/bachelorette parties, and summer celebrations.",
    longDescription:
      "This is a sample vendor listing for demonstration purposes. Sample Chicago Party Boat Partner offers spacious party boats with sound systems, coolers, and captains available. Ideal for anchoring at the Playpen, cruising past the skyline, or catching Navy Pier fireworks from the water. Replace this listing with real vendor data when onboarding partners.",
    capacity: "20–50 guests",
    pricingRange: "$800–$2,500+ / half day",
    featured: true,
    sponsored: true,
    isPublished: false,
    phone: "(312) 555-0101",
    website: "https://example.com",
    services: ["Party boats", "Captain included", "BYOB options", "Playpen trips"],
    areas: ["Monroe Harbor", "Burnham Harbor", "Playpen"],
  },
  {
    slug: "sample-chicago-yacht-partner",
    name: "Sample Chicago Yacht Partner",
    category: "Yacht Charters",
    categorySlug: "yacht-rentals-chicago",
    location: "DuSable Harbor & Chicago River",
    description:
      "Placeholder luxury yacht charter listing for corporate events, celebrations, and upscale Lake Michigan cruises with professional crew.",
    longDescription:
      "Sample Chicago Yacht Partner represents the type of premium yacht charter listing you'll feature on Boating Chicago. Expect climate-controlled cabins, catering options, and stunning skyline views. This placeholder helps you preview the vendor page layout before signing real charter companies.",
    capacity: "10–40 guests",
    pricingRange: "$1,200–$5,000+ / charter",
    featured: true,
    sponsored: false,
    isPublished: false,
    phone: "(312) 555-0102",
    website: "https://example.com",
    services: ["Luxury yachts", "Corporate events", "Catering", "Sunset cruises"],
    areas: ["DuSable Harbor", "Chicago River", "Lake Michigan"],
  },
  {
    slug: "sample-chicago-fishing-partner",
    name: "Sample Chicago Fishing Partner",
    category: "Fishing Charters",
    categorySlug: "fishing-charters-chicago",
    location: "Burnham Harbor",
    description:
      "Placeholder fishing charter listing for salmon, trout, and perch trips on Lake Michigan with experienced local captains.",
    longDescription:
      "Sample Chicago Fishing Partner showcases how fishing charter listings appear on the site. Half-day and full-day trips, all gear included, family-friendly options available. Swap in real charter operators when ready to monetize lead referrals and featured placements.",
    capacity: "1–6 anglers",
    pricingRange: "$400–$900 / trip",
    featured: false,
    sponsored: false,
    isPublished: false,
    phone: "(312) 555-0103",
    website: "https://example.com",
    services: ["Salmon fishing", "Perch trips", "All gear included", "Half & full day"],
    areas: ["Burnham Harbor", "31st Street Harbor"],
  },
  {
    slug: "sample-chicago-captain-partner",
    name: "Sample Chicago Captain Partner",
    category: "Captains for Hire",
    categorySlug: "captains-for-hire-chicago",
    location: "Greater Chicago Area",
    description:
      "Placeholder USCG-licensed captain service for bareboat rentals, deliveries, and private vessel operations on Lake Michigan.",
    longDescription:
      "Sample Chicago Captain Partner demonstrates captain-for-hire listings. Licensed captains available for your rental boat, corporate outing, or special event. Ideal for visitors who want a local expert at the helm without chartering a full vessel.",
    capacity: "Any vessel size",
    pricingRange: "$75–$150 / hour",
    featured: false,
    sponsored: false,
    isPublished: false,
    phone: "(312) 555-0104",
    website: "https://example.com",
    services: ["USCG licensed", "Bareboat captain", "Event captain", "Training"],
    areas: ["All Chicago harbors"],
  },
  {
    slug: "sample-chicago-marina-partner",
    name: "Sample Chicago Marina Partner",
    category: "Marinas",
    categorySlug: "chicago-marinas",
    location: "Montrose Harbor",
    description:
      "Placeholder marina listing with transient slips, fuel, and boater amenities on Chicago's lakefront.",
    longDescription:
      "Sample Chicago Marina Partner is a demonstration listing for marina and harbor services. Features transient slip availability, pump-out, and easy access to Lake Michigan. Replace with real marina partners for referral fees and sponsored listings.",
    capacity: "Slips for vessels up to 45 ft",
    pricingRange: "Seasonal & transient rates vary",
    featured: false,
    sponsored: true,
    isPublished: false,
    phone: "(312) 555-0105",
    website: "https://example.com",
    services: ["Transient slips", "Fuel dock", "Pump-out", "Winter storage"],
    areas: ["Montrose Harbor"],
  },
  {
    slug: "sample-chicago-detailing-partner",
    name: "Sample Chicago Detailing Partner",
    category: "Boat Detailing & Service",
    categorySlug: "boat-detailing-chicago",
    location: "Mobile — All Chicago Harbors",
    description:
      "Placeholder mobile boat detailing, wash, wax, and maintenance service for Chicago boat owners.",
    longDescription:
      "Sample Chicago Detailing Partner shows how service vendors appear on Boating Chicago. Full detail packages, bottom cleaning, and seasonal prep available at your slip or on the hard. Monetize through featured listings and lead referrals to local service providers.",
    capacity: "All vessel sizes",
    pricingRange: "$150–$800+ depending on service",
    featured: false,
    sponsored: false,
    isPublished: false,
    phone: "(312) 555-0106",
    website: "https://example.com",
    services: ["Detailing", "Bottom cleaning", "Winterization", "Repair referrals"],
    areas: ["All Chicago harbors", "North Shore"],
  },
];

export function getVendorBySlug(slug: string): Vendor | undefined {
  return vendors.find((v) => v.slug === slug);
}

export function getPublishedVendorBySlug(slug: string): Vendor | undefined {
  return vendors.find((v) => v.slug === slug && v.isPublished);
}

export function getPublishedVendors(): Vendor[] {
  return vendors.filter((v) => v.isPublished);
}

export function getVendorsByCategory(categorySlug: string): Vendor[] {
  return vendors.filter((v) => v.categorySlug === categorySlug && v.isPublished);
}

export function getFeaturedVendors(): Vendor[] {
  return vendors.filter((v) => v.featured && v.isPublished);
}

export function getVendorsBySlugs(slugs: string[]): Vendor[] {
  return slugs
    .map((slug) => getPublishedVendorBySlug(slug))
    .filter((v): v is Vendor => v !== undefined);
}
