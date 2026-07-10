export type AffiliatePartner =
  | "getyourguide"
  | "boatsetter"
  | "getmyboat"
  | "fishingbooker"
  | "viator"
  | "custom";

export interface AffiliateLink {
  partner: AffiliatePartner;
  label: string;
  url: string;
  description: string;
  /** Only enabled partners produce booking CTAs */
  enabled: boolean;
}

const env = (key: string, fallback: string) =>
  process.env[key] || fallback;

export const GETYOURGUIDE_PARTNER_ID = "HISQ5ML";

export const affiliateLinks: Record<AffiliatePartner, AffiliateLink> = {
  getyourguide: {
    partner: "getyourguide",
    label: "GetYourGuide",
    url: env(
      "NEXT_PUBLIC_AFFILIATE_GETYOURGUIDE",
      `https://www.getyourguide.com/chicago-l225/?partner_id=${GETYOURGUIDE_PARTNER_ID}&utm_medium=online_publisher&cmp=Boating`
    ),
    description: "Book Chicago cruises, tours, jet ski & kayak experiences",
    enabled: true,
  },
  boatsetter: {
    partner: "boatsetter",
    label: "Boatsetter",
    url: env(
      "NEXT_PUBLIC_AFFILIATE_BOATSETTER",
      "https://www.boatsetter.com/boat-rentals/chicago-il?utm_source=boatingchicago&utm_medium=affiliate"
    ),
    description: "Browse peer-to-peer boat rentals on Lake Michigan",
    enabled: false,
  },
  getmyboat: {
    partner: "getmyboat",
    label: "GetMyBoat",
    url: env(
      "NEXT_PUBLIC_AFFILIATE_GETMYBOAT",
      "https://www.getmyboat.com/boat-rentals/Chicago--IL--United-States/?utm_source=boatingchicago&utm_medium=affiliate"
    ),
    description: "Compare captained and bareboat rentals in Chicago",
    enabled: false,
  },
  fishingbooker: {
    partner: "fishingbooker",
    label: "FishingBooker",
    url: env(
      "NEXT_PUBLIC_AFFILIATE_FISHINGBOOKER",
      "https://fishingbooker.com/destinations/us-il-chicago?utm_source=boatingchicago&utm_medium=affiliate"
    ),
    description: "Book fishing charters with local Chicago captains",
    enabled: false,
  },
  viator: {
    partner: "viator",
    label: "Viator",
    url: env(
      "NEXT_PUBLIC_AFFILIATE_VIATOR",
      "https://www.viator.com/Chicago-attractions/Chicago-River/d673-a1219?pid=P00309183&mcid=42383&medium=link"
    ),
    description: "Chicago cruises, sailing charters, kayaking & experiences",
    enabled: true,
  },
  custom: {
    partner: "custom",
    label: "Custom Partner",
    url: env(
      "NEXT_PUBLIC_AFFILIATE_CUSTOM",
      "https://boatingchicago.com/#find-a-boat"
    ),
    description: "Book through our preferred Chicago boating partner",
    enabled: false,
  },
};

/** Returns only enabled affiliate partners — never blank/dead CTAs */
export function getAffiliateLinksForCategory(
  partners: AffiliatePartner[]
): AffiliateLink[] {
  return partners
    .map((p) => affiliateLinks[p])
    .filter((link) => link.enabled);
}

export function getActiveAffiliatePartners(): AffiliateLink[] {
  return Object.values(affiliateLinks).filter((link) => link.enabled);
}
