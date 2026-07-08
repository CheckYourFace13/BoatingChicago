export const siteConfig = {
  name: "Boating Chicago",
  domain: "boatingchicago.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://boatingchicago.com",
  tagline: "Chicago's #1 Local Boating Guide",
  description:
    "Find the best boat rentals, yacht charters, party boats, fishing charters, and captains on Lake Michigan. Your trusted local guide for Chicago boating.",
  contactEmail: process.env.CONTACT_EMAIL || "hello@boatingchicago.com",
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
  "Boating Chicago is a local guide and referral site. We do not operate boats, employ captains, or guarantee availability, pricing, licensing, insurance, safety, or legal compliance. Always verify details directly with the provider before booking.";

export const formDisclaimer =
  "Boating Chicago is a local guide and referral website. We do not own boats, operate charters, employ captains, or guarantee availability, pricing, safety, or licensing. By submitting this form, you agree to be contacted about boating options. Always confirm all details directly with the provider before booking.";
