/**
 * Config-driven advertiser registry for editorial pages.
 * A row stays dark until approval, this website, and a real network tracking URL are all set.
 * Nothing here is a commission, a rank, or a review.
 */

export type RegistryNetwork = "cj" | "impact";

export type ApprovalStatus = "unverified" | "approved" | "declined";

export type AdvertiserRecord = {
  id: string;
  network: RegistryNetwork;
  /** Network advertiser id. Null until the publisher supplies one. */
  advertiserId: string | null;
  name: string;
  approvalStatus: ApprovalStatus;
  /** Website keys allowed to show this advertiser. Empty until supplied. */
  permittedWebsites: string[];
  /** Article categories where the advertiser is relevant. */
  categories: string[];
  /** Phrases matched against the slug and named products. Short generic words are omitted. */
  keywords: string[];
  /** Publisher-supplied tracking URL. Null until supplied. */
  trackedDestination: string | null;
  disclosure: string;
  enabled: boolean;
};

/** Gambling and other excluded promotions. These ids cannot be activated. */
export const EXCLUDED_ADVERTISER_IDS = ["legendz"] as const;

const CJ_TRACKING_HOSTS = new Set([
  "anrdoezrs.net",
  "dpbolvw.net",
  "jdoqocy.com",
  "tkqlhce.com",
  "kqzyfj.com",
  "emjcd.com",
  "qksrv.net",
  "afcyhf.com",
  "ftjcfx.com",
  "lduhtrp.net",
  "tqlkg.com",
  "awltovhc.com",
]);

/**
 * Staged advertisers. Approval, website permission, and the tracking URL stay empty
 * until a person copies them from the network. Env vars with the same id can fill them
 * without a code change to the matcher.
 */
export const ADVERTISER_REGISTRY: AdvertiserRecord[] = [
  {
    id: "adrenaline",
    network: "cj",
    advertiserId: "4851771",
    name: "Adrenaline",
    approvalStatus: "approved",
    permittedWebsites: ["boatingchicago"],
    categories: [
      "dining-cruise",
      "sunset-cruise",
      "sailing",
      "chicago-experience",
      "romantic",
    ],
    keywords: [
      "dinner cruise",
      "sunset sail",
      "private sail",
      "navy pier",
      "burnham harbor",
    ],
    /**
     * Deep-linkable evergreen creative for website PID 101904027.
     * Product-level placements use partner-programs buildAdrenalineCjUrl instead.
     */
    trackedDestination:
      "https://www.tkqlhce.com/click-101904027-15734435?url=https%3A%2F%2Fwww.adrenaline365.com%2Fchicago%2F",
    disclosure:
      "Optional experience marketplace. Paid CJ link. Confirm boarding, duration, and cancellation on the merchant page — not a BoatingChicago review or rank.",
    enabled: true,
  },
  {
    id: "aliexpress",
    network: "cj",
    advertiserId: "7711902",
    name: "AliExpress",
    approvalStatus: "declined",
    permittedWebsites: [],
    categories: ["moving", "home-upgrades", "home-furniture", "office-school", "city-living", "kitchen-tools"],
    keywords: ["moving boxes", "furniture", "desk chair", "storage bins"],
    trackedDestination: null,
    disclosure: "Optional retailer. Paid CJ link. Not a product review or a price.",
    enabled: false,
  },
  {
    id: "dailysteals",
    network: "cj",
    advertiserId: null,
    name: "DailySteals",
    approvalStatus: "unverified",
    permittedWebsites: [],
    categories: ["moving", "home-upgrades", "home-furniture", "office-school", "kitchen-tools"],
    keywords: ["moving boxes", "furniture", "home office"],
    trackedDestination: null,
    disclosure: "Optional retailer. Paid CJ link. Not a product review or a price.",
    enabled: false,
  },
  {
    id: "lawdepot",
    network: "cj",
    advertiserId: null,
    name: "LawDepot",
    approvalStatus: "unverified",
    permittedWebsites: [],
    categories: ["tenants-leases", "landlord-documents"],
    keywords: ["lease agreement", "rental agreement", "document-checklist"],
    trackedDestination: null,
    disclosure: "Optional document service. Paid CJ link. It does not replace this site's own documents or software.",
    enabled: false,
  },
  {
    id: "chefs-deal",
    network: "cj",
    advertiserId: null,
    name: "Chef's Deal",
    approvalStatus: "unverified",
    permittedWebsites: [],
    categories: ["commercial-kitchen", "venue-equipment", "hospitality-equipment"],
    keywords: ["commercial kitchen", "restaurant equipment"],
    trackedDestination: null,
    disclosure: "Optional restaurant-supply retailer. Paid CJ link. Not a product review.",
    enabled: false,
  },
  {
    id: "peets-coffee",
    network: "cj",
    advertiserId: null,
    name: "Peet's Coffee",
    approvalStatus: "approved",
    permittedWebsites: ["boatingchicago"],
    categories: ["coffee", "brewing"],
    keywords: ["peets-coffee-shopping-only"],
    trackedDestination: "https://www.kqzyfj.com/click-101904027-13588852",
    disclosure:
      "Optional coffee retailer. Paid CJ link. Not a tasting note or a rank. Shown only in labeled shopping-partner ads.",
    enabled: false,
  },
  {
    id: "brandsmart",
    network: "impact",
    advertiserId: "52119",
    name: "BrandsMart",
    approvalStatus: "approved",
    permittedWebsites: ["boatingchicago"],
    categories: ["shopping"],
    keywords: [],
    trackedDestination: "https://brandsmartusa.sjv.io/X4AQjo",
    disclosure: "Optional retailer. Paid Impact link. Not a product review or a sale promise.",
    enabled: false,
  },
  {
    id: "kingcamp",
    network: "impact",
    advertiserId: "51925",
    name: "KingCamp",
    approvalStatus: "approved",
    permittedWebsites: ["boatingchicago"],
    categories: ["shopping", "outdoor"],
    keywords: [],
    trackedDestination:
      "https://kingcampoutdoorproductscompanyhklimited.sjv.io/vDkPrO",
    disclosure: "Optional outdoor retailer. Paid Impact link. Not a field test or marine rating.",
    enabled: false,
  },
  {
    id: "fender-audio",
    network: "impact",
    advertiserId: "57772",
    name: "Fender Audio",
    approvalStatus: "approved",
    permittedWebsites: ["boatingchicago"],
    categories: ["shopping", "audio"],
    keywords: [],
    trackedDestination: "https://fenderaudionorthamerica.sjv.io/4a0G9o",
    disclosure: "Optional audio retailer. Paid Impact link. Not a sound test.",
    enabled: false,
  },
  {
    id: "best-choice-products",
    network: "impact",
    advertiserId: "33479",
    name: "Best Choice Products",
    approvalStatus: "approved",
    permittedWebsites: ["boatingchicago"],
    categories: ["shopping"],
    keywords: [],
    trackedDestination: "https://bestchoiceproducts.sjv.io/k4EOrd",
    disclosure: "Optional gift and home retailer. Paid Impact link. Publisher-level offer.",
    enabled: false,
  },
  {
    id: "chipolo",
    network: "impact",
    advertiserId: "57274",
    name: "Chipolo",
    approvalStatus: "approved",
    permittedWebsites: ["boatingchicago"],
    categories: ["shopping"],
    keywords: [],
    trackedDestination: "https://chipolo.onepath.io/QYLjM3",
    disclosure: "Optional tracker retailer. Paid Impact link. Publisher-level offer.",
    enabled: false,
  },
  {
    id: "edifier",
    network: "impact",
    advertiserId: "57693",
    name: "Edifier",
    approvalStatus: "approved",
    permittedWebsites: ["boatingchicago"],
    categories: ["shopping", "audio"],
    keywords: [],
    trackedDestination: "https://edifier.pxf.io/MKzAMo",
    disclosure: "Optional audio retailer. Paid Impact link. Publisher-level offer. Not initially placed.",
    enabled: false,
  },
  {
    id: "lasko",
    network: "impact",
    advertiserId: "58854",
    name: "Lasko",
    approvalStatus: "approved",
    permittedWebsites: ["boatingchicago"],
    categories: ["shopping"],
    keywords: [],
    trackedDestination: "https://lasko.sjv.io/DWGyrj",
    disclosure: "Optional home-comfort retailer. Paid Impact link. Publisher-level offer. Not initially placed.",
    enabled: false,
  },
  {
    id: "philips-home-access",
    network: "impact",
    advertiserId: "52805",
    name: "Philips Home Access",
    approvalStatus: "approved",
    permittedWebsites: ["boatingchicago"],
    categories: ["shopping"],
    keywords: [],
    trackedDestination: "https://idlespacetechnologycompanycoltd.pxf.io/L0BKMM",
    disclosure: "Optional home-access retailer. Paid Impact link. Publisher-level offer. Not initially placed.",
    enabled: false,
  },
  {
    id: "ispring",
    network: "impact",
    advertiserId: "58134",
    name: "iSpring",
    approvalStatus: "approved",
    permittedWebsites: ["boatingchicago"],
    categories: ["shopping"],
    keywords: [],
    trackedDestination: "https://ispringwatersystems.onepath.io/R0qGMb",
    disclosure: "Optional water-systems retailer. Paid Impact link. Publisher-level offer. Not initially placed.",
    enabled: false,
  },
  {
    id: "secret-aardvark",
    network: "impact",
    advertiserId: "58473",
    name: "Secret Aardvark",
    approvalStatus: "approved",
    permittedWebsites: ["boatingchicago"],
    categories: ["shopping"],
    keywords: [],
    trackedDestination: "https://secretaardvarktradingco.pxf.io/PzEOxQ",
    disclosure: "Optional food retailer. Paid Impact link. Publisher-level offer. Not initially placed.",
    enabled: false,
  },
  {
    id: "visumpoint",
    network: "cj",
    advertiserId: null,
    name: "visumPOINT",
    approvalStatus: "unverified",
    permittedWebsites: [],
    categories: ["international-travel", "visas"],
    keywords: ["visa application", "travel visa"],
    trackedDestination: null,
    disclosure: "Optional visa-service link. Paid CJ link. Not immigration advice.",
    enabled: false,
  },
  {
    id: "aurzen",
    network: "cj",
    advertiserId: null,
    name: "Aurzen",
    approvalStatus: "unverified",
    permittedWebsites: [],
    categories: ["home-entertainment"],
    keywords: ["projector", "home theater"],
    trackedDestination: null,
    disclosure: "Optional projector retailer. Paid CJ link. Not a product review.",
    enabled: false,
  },
  {
    id: "click-and-grow",
    network: "cj",
    advertiserId: null,
    name: "Click & Grow",
    approvalStatus: "unverified",
    permittedWebsites: [],
    categories: ["indoor-gardening"],
    keywords: ["indoor herb", "smart garden"],
    trackedDestination: null,
    disclosure: "Optional indoor-garden retailer. Paid CJ link. Not a grow test.",
    enabled: false,
  },
  {
    id: "tuft-and-needle",
    network: "impact",
    advertiserId: null,
    name: "Tuft & Needle",
    approvalStatus: "unverified",
    permittedWebsites: [],
    categories: ["home-furniture"],
    keywords: ["mattress"],
    trackedDestination: null,
    disclosure: "Optional mattress retailer. Paid Impact link. Not a sleep test.",
    enabled: false,
  },
  {
    id: "hp-store",
    network: "cj",
    advertiserId: null,
    name: "HP Store",
    approvalStatus: "unverified",
    permittedWebsites: [],
    categories: ["technology", "office-school"],
    keywords: ["home printer", "laser printer"],
    trackedDestination: null,
    disclosure: "Optional printer retailer. Paid CJ link. Certification is not print quality.",
    enabled: false,
  },
];

function envKey(network: RegistryNetwork, id: string, field: string): string {
  return `${network.toUpperCase()}_${id.toUpperCase().replace(/[^A-Z0-9]+/g, "_")}_${field}`;
}

function envFlag(name: string): boolean | null {
  const raw = process.env[name];
  if (raw == null || raw.trim() === "") return null;
  return raw === "1" || raw.toLowerCase() === "true" || raw.toLowerCase() === "yes";
}

export function isExcludedAdvertiser(id: string, name = ""): boolean {
  const haystack = `${id} ${name}`.toLowerCase();
  if ((EXCLUDED_ADVERTISER_IDS as readonly string[]).includes(id.toLowerCase())) return true;
  return /legendz|casino|sportsbook|sports-bet|gambling|poker room/.test(haystack);
}

export function isValidTrackedDestination(network: RegistryNetwork, raw: string | null | undefined): boolean {
  const value = raw?.trim() ?? "";
  if (!value.startsWith("https://")) return false;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  if (network === "cj") {
    return CJ_TRACKING_HOSTS.has(host) && /\/click-|\/links\//.test(url.pathname);
  }
  return (
    host === "pxf.io" ||
    host.endsWith(".pxf.io") ||
    host === "sjv.io" ||
    host.endsWith(".sjv.io") ||
    host === "onepath.io" ||
    host.endsWith(".onepath.io")
  );
}

function approvalFromEnv(raw: string | undefined, fallback: ApprovalStatus): ApprovalStatus {
  const value = raw?.trim().toLowerCase();
  if (value === "approved" || value === "declined" || value === "unverified") return value;
  return fallback;
}

/** Registry plus optional env overlay. Missing env leaves the staged row unchanged. */
export function resolveAdvertisers(): AdvertiserRecord[] {
  return ADVERTISER_REGISTRY.filter((row) => !isExcludedAdvertiser(row.id, row.name)).map((row) => {
    const enabled = envFlag(envKey(row.network, row.id, "ENABLED"));
    const websites = process.env[envKey(row.network, row.id, "WEBSITES")]?.trim();
    const destination = process.env[envKey(row.network, row.id, "TRACKING_URL")]?.trim();
    const advertiserId = process.env[envKey(row.network, row.id, "ADVERTISER_ID")]?.trim();
    return {
      ...row,
      enabled: enabled == null ? row.enabled : enabled,
      approvalStatus: approvalFromEnv(process.env[envKey(row.network, row.id, "APPROVAL")], row.approvalStatus),
      permittedWebsites: websites
        ? websites.split(",").map((site) => site.trim().toLowerCase()).filter(Boolean)
        : row.permittedWebsites,
      trackedDestination: destination || row.trackedDestination,
      advertiserId: advertiserId || row.advertiserId,
    };
  });
}

export function isAdvertiserActive(row: AdvertiserRecord, website: string): boolean {
  if (isExcludedAdvertiser(row.id, row.name)) return false;
  if (!row.enabled || row.approvalStatus !== "approved") return false;
  if (!row.permittedWebsites.includes(website.trim().toLowerCase())) return false;
  return isValidTrackedDestination(row.network, row.trackedDestination);
}

export function hasActiveAdvertiser(website: string): boolean {
  return resolveAdvertisers().some((row) => isAdvertiserActive(row, website));
}

function haystackMatches(row: AdvertiserRecord, category: string, haystack: string): boolean {
  if (category && row.categories.includes(category)) return true;
  return row.keywords.some((keyword) => keyword.length >= 4 && haystack.includes(keyword.toLowerCase()));
}

/**
 * At most one relevant, active advertiser. Commission is not a sort key;
 * registry order is the tie break, and Amazon stays outside this list.
 */
export function matchAdvertisers(opts: {
  website: string;
  category?: string;
  productNames?: string[];
  text?: string;
}): AdvertiserRecord[] {
  const category = opts.category?.trim() ?? "";
  const haystack = [opts.text ?? "", category, ...(opts.productNames ?? [])].join(" ").toLowerCase();
  const match = resolveAdvertisers().find(
    (row) => isAdvertiserActive(row, opts.website) && haystackMatches(row, category, haystack),
  );
  return match ? [match] : [];
}

/** One match across the page's categories, then its text. Used by every editorial site. */
export function matchEditorialPage(opts: {
  website: string;
  categories?: string[];
  productNames?: string[];
  text?: string;
}): AdvertiserRecord[] {
  for (const category of opts.categories ?? []) {
    const hit = matchAdvertisers({
      website: opts.website,
      category,
      productNames: opts.productNames,
      text: opts.text,
    });
    if (hit.length > 0) return hit;
  }
  return matchAdvertisers({
    website: opts.website,
    productNames: opts.productNames,
    text: opts.text,
  });
}

export function toRecommendedLinks(rows: AdvertiserRecord[]): Array<{
  program: "cj" | "impact";
  merchant: string;
  label: string;
  href: string;
  note: string;
  linkKind: "cj_merchant" | "impact_merchant";
}> {
  return rows.flatMap((row) => {
    if (!row.trackedDestination) return [];
    const merchant = row.id.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 80);
    if (!merchant) return [];
    return [
      {
        program: row.network,
        merchant,
        label: row.name,
        href: row.trackedDestination,
        note: row.disclosure,
        linkKind: row.network === "impact" ? ("impact_merchant" as const) : ("cj_merchant" as const),
      },
    ];
  });
}
