/**
 * Category slugs that remain reachable but should not be indexed until they
 * have independent useful content (real listings / unique editorial value).
 */
export const NOINDEX_CATEGORY_SLUGS = new Set([
  "boat-storage-chicago",
  "boat-detailing-chicago",
  "boat-repair-chicago",
  "chicago-marinas",
  "captains-for-hire-chicago",
]);

/** Slugs redirected elsewhere — keep out of sitemap generators. */
export const REDIRECTED_CATEGORY_SLUGS = new Set([
  "navy-pier-fireworks-boat-rentals",
]);

export function shouldIndexCategorySlug(slug: string): boolean {
  return !NOINDEX_CATEGORY_SLUGS.has(slug) && !REDIRECTED_CATEGORY_SLUGS.has(slug);
}
