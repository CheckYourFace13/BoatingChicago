/**
 * Impact Radius publisher utilities for BoatingChicago.
 * Publisher 5817881 · property 8959149.
 *
 * Registering an advertiser here or in the editorial registry does not
 * display it. Public placements live in src/data/partner-shopping.ts.
 */

export const IMPACT_PUBLISHER_ID = "5817881";
export const IMPACT_PROPERTY_ID = "8959149";

const IMPACT_HOSTS = [
  "pxf.io",
  "sjv.io",
  "onepath.io",
] as const;

export function isImpactTrackingHost(hostname: string): boolean {
  const host = hostname.replace(/^www\./, "").toLowerCase();
  return IMPACT_HOSTS.some((base) => host === base || host.endsWith(`.${base}`));
}

/** Safe Impact subId: lowercase alphanumeric + dashes; no PII. */
export function sanitizeImpactSubId(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

/**
 * Attach Impact subIds without dropping existing query params or changing
 * the tracking path / destination.
 * subId1=bc · subId2=PAGE_KEY · subId3=SLOT_VARIANT
 */
export function buildImpactClickUrl(
  destination: string,
  pageKey: string,
  slotVariant: string,
): string {
  const u = new URL(destination);
  if (!isImpactTrackingHost(u.hostname)) {
    throw new Error(`Not an Impact tracking host: ${u.hostname}`);
  }
  u.searchParams.set("subId1", "bc");
  u.searchParams.set("subId2", sanitizeImpactSubId(pageKey));
  u.searchParams.set("subId3", sanitizeImpactSubId(slotVariant));
  return u.toString();
}

export const BRANDSMART_BF_START_CT = {
  year: 2026,
  month: 10,
  day: 28,
} as const;
export const BRANDSMART_BF_END_EXCLUSIVE_CT = {
  year: 2026,
  month: 11,
  day: 29,
} as const;

function chicagoWallParts(from: Date): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
} {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hourCycle: "h23",
  }).formatToParts(from);
  const num = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value);
  return {
    year: num("year"),
    month: num("month"),
    day: num("day"),
    hour: num("hour"),
    minute: num("minute"),
    second: num("second"),
  };
}

function wallKey(p: {
  year: number;
  month: number;
  day: number;
  hour?: number;
  minute?: number;
  second?: number;
}): number {
  return (
    p.year * 1e10 +
    p.month * 1e8 +
    p.day * 1e6 +
    (p.hour ?? 0) * 1e4 +
    (p.minute ?? 0) * 100 +
    (p.second ?? 0)
  );
}

/**
 * BrandsMart Black Friday creative: Oct 28 00:00 through before Nov 29 00:00,
 * 2026, America/Chicago. Inclusive start, exclusive end. DST-safe via wall clock.
 */
export function isBrandsmartBlackFridayWindow(from: Date = new Date()): boolean {
  const now = wallKey(chicagoWallParts(from));
  const start = wallKey({ ...BRANDSMART_BF_START_CT, hour: 0, minute: 0, second: 0 });
  const end = wallKey({
    ...BRANDSMART_BF_END_EXCLUSIVE_CT,
    hour: 0,
    minute: 0,
    second: 0,
  });
  return now >= start && now < end;
}
