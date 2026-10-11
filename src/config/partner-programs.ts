/**
 * Membership / marketplace partner programs.
 * BoatUS remains env-gated until approved.
 * Awin advertisers (Boats Group / Boat Trader, Giraffe Tools) use approved tracking IDs.
 */

function approvedUrl(value: string | undefined): string | null {
  const url = value?.trim();
  if (!url || !/^https:\/\//i.test(url)) return null;
  return url;
}

/** Set BOATUS_AFFILIATE_URL only after BoatUS approves BoatingChicago. */
export function getBoatUsAffiliateUrl(): string | null {
  return approvedUrl(process.env.BOATUS_AFFILIATE_URL);
}

/** Shared Awin publisher / affiliate ID for BoatingChicago. */
export const AWIN_PUBLISHER_ID = "3112962";

const AWIN_CLICK_BASE = "https://www.awin1.com/awclick.php";

/** Safe clickref: lowercase alphanumeric + dashes only; no PII. */
export function sanitizeAwinClickref(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

export interface AwinClickParams {
  gid: string;
  mid: string;
  linkid: string;
  clickref: string;
  awinaffid?: string;
}

/**
 * Build an Awin click URL. Always routes through awin1.com.
 * Never link directly to the merchant storefront for attributed traffic.
 */
export function buildAwinClickUrl(params: AwinClickParams): string {
  const ref = sanitizeAwinClickref(params.clickref);
  const u = new URL(AWIN_CLICK_BASE);
  u.searchParams.set("gid", params.gid);
  u.searchParams.set("mid", params.mid);
  u.searchParams.set("awinaffid", params.awinaffid || AWIN_PUBLISHER_ID);
  u.searchParams.set("linkid", params.linkid);
  if (ref) u.searchParams.set("clickref", ref);
  return u.toString();
}

/** Approved Awin / Boats Group (Boat Trader) tracking constants. */
export const BOATS_GROUP_AWIN = {
  gid: "597605",
  mid: "124170",
  awinaffid: AWIN_PUBLISHER_ID,
  linkid: "4695412",
  merchant: "boats-group",
  brand: "boat-trader",
  destinationHost: "www.boattrader.com",
} as const;

/**
 * Build an Awin deep link for Boat Trader.
 * Always routes through awin1.com — never link directly to BoatTrader.com.
 */
export function buildBoatsGroupAwinUrl(clickref: string): string {
  return buildAwinClickUrl({
    gid: BOATS_GROUP_AWIN.gid,
    mid: BOATS_GROUP_AWIN.mid,
    linkid: BOATS_GROUP_AWIN.linkid,
    clickref,
    awinaffid: BOATS_GROUP_AWIN.awinaffid,
  });
}

/** @deprecated Prefer buildBoatsGroupAwinUrl(clickref) for placement-aware links. */
export function getBoatsGroupAffiliateUrl(): string | null {
  return buildBoatsGroupAwinUrl("default");
}

export function isBoatsGroupAwinUrl(url: string): boolean {
  try {
    const u = new URL(url);
    if (u.hostname !== "www.awin1.com" && u.hostname !== "awin1.com") {
      return false;
    }
    return (
      u.searchParams.get("mid") === BOATS_GROUP_AWIN.mid &&
      u.searchParams.get("awinaffid") === BOATS_GROUP_AWIN.awinaffid &&
      u.searchParams.get("linkid") === BOATS_GROUP_AWIN.linkid &&
      u.searchParams.get("gid") === BOATS_GROUP_AWIN.gid
    );
  } catch {
    return false;
  }
}

/** Giraffe Tools product keys for Awin creatives. */
export type GiraffeToolsProduct = "hose-reel" | "pressure-washer";

export const GIRAFFE_TOOLS_AWIN = {
  mid: "76248",
  awinaffid: AWIN_PUBLISHER_ID,
  merchant: "giraffe-tools",
  brand: "giraffe-tools",
  products: {
    "hose-reel": {
      product: "hose-reel",
      gid: "522825",
      linkid: "4002162",
      label: "Shop Giraffe Tools Hose Reels",
      shortName: "Giraffe Tools hose reels",
    },
    "pressure-washer": {
      product: "pressure-washer",
      gid: "526061",
      linkid: "4002166",
      label: "See the Grandfalls Pressure Washer PRO",
      shortName: "Grandfalls Pressure Washer PRO",
    },
  },
} as const;

export function buildGiraffeToolsAwinUrl(
  product: GiraffeToolsProduct,
  clickref: string
): string {
  const creative = GIRAFFE_TOOLS_AWIN.products[product];
  return buildAwinClickUrl({
    gid: creative.gid,
    mid: GIRAFFE_TOOLS_AWIN.mid,
    linkid: creative.linkid,
    clickref,
    awinaffid: GIRAFFE_TOOLS_AWIN.awinaffid,
  });
}

export function isGiraffeToolsAwinUrl(
  url: string,
  product?: GiraffeToolsProduct
): boolean {
  try {
    const u = new URL(url);
    if (u.hostname !== "www.awin1.com" && u.hostname !== "awin1.com") {
      return false;
    }
    if (
      u.searchParams.get("mid") !== GIRAFFE_TOOLS_AWIN.mid ||
      u.searchParams.get("awinaffid") !== GIRAFFE_TOOLS_AWIN.awinaffid
    ) {
      return false;
    }
    if (!product) return true;
    const creative = GIRAFFE_TOOLS_AWIN.products[product];
    return (
      u.searchParams.get("gid") === creative.gid &&
      u.searchParams.get("linkid") === creative.linkid
    );
  } catch {
    return false;
  }
}

/** Piscifun product keys for approved Awin creatives (mid 89509). */
export type PiscifunProduct = "carbon-x-reel" | "fishing-jacket";

/**
 * Verified 2026-10-11:
 * - carbon-x-reel creative (gid 522760 / linkid 4878626) redirects to the
 *   Carbon X ultralight spinning reel PDP (not a generic sale landing page).
 * - fishing-jacket creative (gid 610836 / linkid 4846768) redirects to the
 *   3-layer waterproof fly fishing wading jacket PDP; store listing showed
 *   Lake Green & Dark Blue in S–3XL in stock at verification time.
 */
export const PISCIFUN_AWIN = {
  mid: "89509",
  awinaffid: AWIN_PUBLISHER_ID,
  merchant: "piscifun",
  brand: "piscifun",
  products: {
    "carbon-x-reel": {
      product: "carbon-x-reel" as const,
      gid: "522760",
      linkid: "4878626",
      label: "View Carbon X spinning reel",
      shortName: "Piscifun Carbon X spinning reel",
      destinationPath: "/products/piscifun-carbon-x-lightest-carbon-spinning-reel",
    },
    "fishing-jacket": {
      product: "fishing-jacket" as const,
      gid: "610836",
      linkid: "4846768",
      label: "View fishing jacket",
      shortName: "Piscifun 3-layer fishing jacket",
      destinationPath:
        "/products/3-layer-waterproof-fly-fishing-wading-jacket",
    },
  },
} as const;

export function buildPiscifunAwinUrl(
  product: PiscifunProduct,
  clickref: string
): string {
  const creative = PISCIFUN_AWIN.products[product];
  return buildAwinClickUrl({
    gid: creative.gid,
    mid: PISCIFUN_AWIN.mid,
    linkid: creative.linkid,
    clickref,
    awinaffid: PISCIFUN_AWIN.awinaffid,
  });
}

export function isPiscifunAwinUrl(
  url: string,
  product?: PiscifunProduct
): boolean {
  try {
    const u = new URL(url);
    if (u.hostname !== "www.awin1.com" && u.hostname !== "awin1.com") {
      return false;
    }
    if (
      u.searchParams.get("mid") !== PISCIFUN_AWIN.mid ||
      u.searchParams.get("awinaffid") !== PISCIFUN_AWIN.awinaffid
    ) {
      return false;
    }
    if (!product) return true;
    const creative = PISCIFUN_AWIN.products[product];
    return (
      u.searchParams.get("gid") === creative.gid &&
      u.searchParams.get("linkid") === creative.linkid
    );
  } catch {
    return false;
  }
}
