/**
 * Membership / marketplace partner programs.
 * BoatUS remains env-gated until approved.
 * Boats Group (Boat Trader via Awin) is live with approved tracking IDs.
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

/** Approved Awin / Boats Group (Boat Trader) tracking constants. */
export const BOATS_GROUP_AWIN = {
  /** Awin group / creative grouping */
  gid: "597605",
  /** Boats Group merchant ID */
  mid: "124170",
  /** BoatingChicago publisher / affiliate ID */
  awinaffid: "3112962",
  /** Primary text creative ID */
  linkid: "4695412",
  merchant: "boats-group",
  brand: "boat-trader",
  destinationHost: "www.boattrader.com",
} as const;

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

/**
 * Build an Awin deep link for Boat Trader.
 * Always routes through awin1.com — never link directly to BoatTrader.com.
 */
export function buildBoatsGroupAwinUrl(clickref: string): string {
  const ref = sanitizeAwinClickref(clickref);
  const u = new URL(AWIN_CLICK_BASE);
  u.searchParams.set("gid", BOATS_GROUP_AWIN.gid);
  u.searchParams.set("mid", BOATS_GROUP_AWIN.mid);
  u.searchParams.set("awinaffid", BOATS_GROUP_AWIN.awinaffid);
  u.searchParams.set("linkid", BOATS_GROUP_AWIN.linkid);
  if (ref) u.searchParams.set("clickref", ref);
  return u.toString();
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
