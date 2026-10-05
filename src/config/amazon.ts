/**
 * Amazon Associates configuration for BoatingChicago.
 * Tracking ID must appear as tag= on every Special Link.
 */

export const AMAZON_ASSOCIATES_TAG = "boatingchicago-20";

export const AMAZON_ASSOCIATE_DISCLOSURE =
  "As an Amazon Associate I earn from qualifying purchases.";

const AMAZON_SEARCH_BASE = "https://www.amazon.com/s";

/** Build a tagged Amazon keyword-search Special Link. */
export function buildAmazonSearchUrl(keywords: string): string {
  const u = new URL(AMAZON_SEARCH_BASE);
  u.searchParams.set("k", keywords.trim());
  u.searchParams.set("tag", AMAZON_ASSOCIATES_TAG);
  return u.toString();
}

/**
 * Ensure any Amazon URL carries our Associates tag without
 * altering other query params. Does not cloak or redirect.
 */
export function withAmazonTag(url: string): string {
  try {
    const u = new URL(url);
    if (!/(^|\.)amazon\.(com|co\.uk|ca|de|fr|it|es|com\.mx|com\.br|in|co\.jp)$/i.test(u.hostname)) {
      return url;
    }
    u.searchParams.set("tag", AMAZON_ASSOCIATES_TAG);
    return u.toString();
  } catch {
    return url;
  }
}

export function assertAmazonTag(url: string): boolean {
  try {
    return new URL(url).searchParams.get("tag") === AMAZON_ASSOCIATES_TAG;
  } catch {
    return false;
  }
}
