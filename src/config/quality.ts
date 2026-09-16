/**
 * Category slugs permanently redirected — keep out of sitemaps / IndexNow.
 * Destinations live in next.config.ts redirects.
 */
export const REDIRECTED_CATEGORY_SLUGS = new Set([
  "navy-pier-fireworks-boat-rentals",
  "boat-storage-chicago",
  "boat-detailing-chicago",
  "boat-repair-chicago",
  "chicago-marinas",
  "captains-for-hire-chicago",
]);

/** @deprecated Prefer REDIRECTED_CATEGORY_SLUGS — kept for any leftover callers. */
export const NOINDEX_CATEGORY_SLUGS = new Set<string>();

export function shouldIndexCategorySlug(slug: string): boolean {
  return !REDIRECTED_CATEGORY_SLUGS.has(slug);
}

/** Map retired thin category URLs → strongest equivalent resource. */
export const CATEGORY_REDIRECT_MAP: Record<string, string> = {
  "navy-pier-fireworks-boat-rentals": "/chicago-fireworks-cruises",
  "boat-storage-chicago": "/chicago-boat-storage-guide",
  "boat-detailing-chicago": "/chicago-boat-detailing-guide",
  "boat-repair-chicago": "/chicago-boat-repair-guide",
  "chicago-marinas": "/marinas",
  "captains-for-hire-chicago": "/yacht-rentals-chicago",
};
