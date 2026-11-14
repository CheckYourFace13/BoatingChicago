export const siteConfig = {
  name: "Boating Chicago",
  domain: "boatingchicago.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://boatingchicago.com",
  tagline: "Your guide to boating Chicago & nearby waters",
  description:
    "Free recreational boating and paddling information for Chicago, the suburbs, southern Lake Michigan, and waters within roughly 250 driving miles — weather, harbors, launches, forest-preserve lakes, news, and guides.",
  /** Editorial coverage, not a service area or NAP. */
  coverage:
    "Chicago, suburban forest-preserve lakes, southern Lake Michigan, nearby Wisconsin and Indiana destinations, and selected inland waters within roughly 250 driving miles of Chicago.",
  /** Public contact path only — never put recipient emails in client-visible config. */
  contactPath: "/contact",
  social: {
    instagram: "https://instagram.com/boatingchicago",
    facebook: "https://facebook.com/boatingchicago",
  },
} as const;

export const colors = {
  lakeBlue: "#0B3D6B",
  skyBlue: "#4DA6E8",
  sunYellow: "#FFD23F",
  white: "#FFFFFF",
  coral: "#FF6B4A",
  lightBlue: "#E8F4FD",
} as const;

export const disclaimer =
  "Boating Chicago is a local information guide. We do not operate boats, employ captains, broker charters, or guarantee availability, pricing, licensing, insurance, safety, or legal compliance. Always verify details directly with the provider before booking.";

export const formDisclaimer =
  "Boating Chicago is a local information guide. We do not own boats, operate charters, employ captains, or guarantee availability, pricing, safety, or licensing. Always confirm all details directly with the provider before booking.";
