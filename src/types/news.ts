export type NewsCategory =
  | "Chicago Boating"
  | "Lake Michigan"
  | "Safety"
  | "Events"
  | "Fishing"
  | "Harbors & Marinas";

export interface NewsSourceConfig {
  id: string;
  name: string;
  domain: string;
  feedUrl: string;
  defaultCategory: NewsCategory;
  /** If set, item must match at least one keyword (case-insensitive) to publish. */
  includeKeywords?: string[];
  /** Drop items matching these keywords. */
  excludeKeywords?: string[];
  enabled: boolean;
}

export interface NewsItem {
  id: string;
  slug: string;
  headline: string;
  sourceName: string;
  sourceUrl: string;
  sourceDomain: string;
  sourcePublishedAt: string | null;
  firstSeenAt: string;
  category: NewsCategory;
  originalSummary: string;
  whyItMatters: string;
  relatedBoatingChicagoPages: { href: string; label: string }[];
  imageUrl: string | null;
  isPublished: boolean;
  isFeatured: boolean;
  /** Enough original context for a standalone /news/[slug] page */
  qualifiesForArticlePage: boolean;
}

export interface NewsFeedResult {
  fetchedAt: string;
  items: NewsItem[];
  errors: string[];
  sourcesAttempted: string[];
}
