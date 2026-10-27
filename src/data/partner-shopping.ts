import {
  buildImpactClickUrl,
  isBrandsmartBlackFridayWindow,
} from "@/config/impact-programs";
import { CJ_WEBSITE_PID_BOATINGCHICAGO } from "@/config/partner-programs";

export type ShoppingNetwork = "impact" | "cj";

export type ShoppingOfferId =
  | "kingcamp-display"
  | "chipolo-display"
  | "brandsmart-bf"
  | "brandsmart-evergreen"
  | "best-choice-gift"
  | "peets-coffee";

export type ShoppingCreativeKind = "display" | "text";

export type ShoppingOffer = {
  id: ShoppingOfferId;
  network: ShoppingNetwork;
  merchant: string;
  merchantId: string;
  creativeId: string;
  label: string;
  cta: string;
  kind: ShoppingCreativeKind;
  clickBase: string;
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  impressionPixel?: string;
};

/**
 * Approved creatives that may appear on an explicit page allowlist.
 * Registry rows stay dark so editorial matching cannot auto-insert these.
 */
export const SHOPPING_OFFERS: Record<ShoppingOfferId, ShoppingOffer> = {
  "kingcamp-display": {
    id: "kingcamp-display",
    network: "impact",
    merchant: "kingcamp",
    merchantId: "51925",
    creativeId: "3897811",
    label: "KingCamp",
    cta: "Explore camping and outdoor gear",
    kind: "display",
    clickBase:
      "https://kingcampoutdoorproductscompanyhklimited.sjv.io/c/5817881/3897811/51925",
    imageSrc: "https://a.impactradius-go.com/display-ad/51925-3897811",
    imageWidth: 300,
    imageHeight: 250,
    imageAlt: "KingCamp outdoor gear advertisement",
    impressionPixel: "https://imp.pxf.io/i/5817881/3897811/51925",
  },
  "chipolo-display": {
    id: "chipolo-display",
    network: "impact",
    merchant: "chipolo",
    merchantId: "57274",
    creativeId: "4029912",
    label: "Chipolo",
    cta: "Explore item trackers",
    kind: "display",
    clickBase: "https://Chipolo.onepath.io/c/5817881/4029912/57274",
    imageSrc: "https://a.impactradius-go.com/display-ad/57274-4029912",
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Chipolo tracker advertisement",
    impressionPixel: "https://imp.pxf.io/i/5817881/4029912/57274",
  },
  "brandsmart-bf": {
    id: "brandsmart-bf",
    network: "impact",
    merchant: "brandsmart",
    merchantId: "52119",
    creativeId: "4097264",
    label: "BrandsMart",
    cta: "Explore electronics and home finds",
    kind: "display",
    clickBase: "https://brandsmartusa.sjv.io/c/5817881/4097264/52119",
    imageSrc: "https://a.impactradius-go.com/display-ad/52119-4097264",
    imageWidth: 300,
    imageHeight: 250,
    imageAlt: "BrandsMart advertisement",
    impressionPixel: "https://imp.pxf.io/i/5817881/4097264/52119",
  },
  "brandsmart-evergreen": {
    id: "brandsmart-evergreen",
    network: "impact",
    merchant: "brandsmart",
    merchantId: "52119",
    creativeId: "X4AQjo",
    label: "BrandsMart",
    cta: "Explore electronics and home finds",
    kind: "text",
    clickBase: "https://brandsmartusa.sjv.io/X4AQjo",
  },
  "best-choice-gift": {
    id: "best-choice-gift",
    network: "impact",
    merchant: "best-choice-products",
    merchantId: "33479",
    creativeId: "2888603",
    label: "Best Choice Products",
    cta: "Explore gifts and home finds",
    kind: "text",
    clickBase: "https://bestchoiceproducts.sjv.io/c/5817881/2888603/33479",
    impressionPixel: "https://imp.pxf.io/i/5817881/2888603/33479",
  },
  "peets-coffee": {
    id: "peets-coffee",
    network: "cj",
    merchant: "peets-coffee",
    merchantId: CJ_WEBSITE_PID_BOATINGCHICAGO,
    creativeId: "13588852",
    label: "Peet's Coffee",
    cta: "Find your perfect coffee.",
    kind: "text",
    clickBase: "https://www.kqzyfj.com/click-101904027-13588852",
  },
};

type PageSlotSpec =
  | { offerId: ShoppingOfferId; slotVariant: string }
  | { offerId: "brandsmart-window"; slotVariant: string };

/** Explicit public placements. One offer per page; no homepage booking stack. */
export const SHOPPING_PAGE_SLOTS: Record<string, PageSlotSpec[]> = {
  guides: [
    { offerId: "best-choice-gift", slotVariant: "bcp-gift" },
    { offerId: "chipolo-display", slotVariant: "chipolo-sq" },
    { offerId: "brandsmart-window", slotVariant: "brandsmart" },
    { offerId: "peets-coffee", slotVariant: "peets-text" },
  ],
  tools: [{ offerId: "kingcamp-display", slotVariant: "kingcamp-300" }],
  "chicago-kayak-rental-guide": [
    { offerId: "kingcamp-display", slotVariant: "kingcamp-300" },
  ],
};

export type ResolvedShoppingSlot = {
  offer: ShoppingOffer;
  pageKey: string;
  slotVariant: string;
  href: string;
};

export function resolveShoppingSlots(
  pageKey: string,
  from: Date = new Date(),
): ResolvedShoppingSlot[] {
  const specs = SHOPPING_PAGE_SLOTS[pageKey];
  if (!specs) return [];

  return specs.map((spec) => {
    const offerId =
      spec.offerId === "brandsmart-window"
        ? isBrandsmartBlackFridayWindow(from)
          ? "brandsmart-bf"
          : "brandsmart-evergreen"
        : spec.offerId;
    const offer = SHOPPING_OFFERS[offerId];
    const href =
      offer.network === "impact"
        ? buildImpactClickUrl(offer.clickBase, pageKey, spec.slotVariant)
        : offer.clickBase;
    return {
      offer,
      pageKey,
      slotVariant: spec.slotVariant,
      href,
    };
  });
}

export function listPlacedShoppingOffers(): ShoppingOffer[] {
  const ids = new Set<ShoppingOfferId>();
  for (const specs of Object.values(SHOPPING_PAGE_SLOTS)) {
    for (const spec of specs) {
      if (spec.offerId === "brandsmart-window") {
        ids.add("brandsmart-bf");
        ids.add("brandsmart-evergreen");
      } else {
        ids.add(spec.offerId);
      }
    }
  }
  return [...ids].map((id) => SHOPPING_OFFERS[id]);
}
