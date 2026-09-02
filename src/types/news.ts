export type NewsCategory =
  | "Chicago Boating"
  | "Lake Michigan"
  | "Safety"
  | "Events"
  | "Fishing"
  | "Harbors & Marinas"
  | "Wisconsin"
  | "Indiana"
  | "Great Lakes";

/** Story from RSS vs official on-water update (alerts, conditions, events). */
export type NewsItemKind = "story" | "official";

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
  kind: NewsItemKind;
}

export interface NewsFeedResult {
  fetchedAt: string;
  items: NewsItem[];
  /** Server-side only diagnostics — never render to visitors. */
  errors: string[];
  sourcesAttempted: string[];
  sourcesSucceeded: string[];
}
