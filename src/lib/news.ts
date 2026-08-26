import {
  NEWS_CATEGORY_RELATED,
  NEWS_FETCH_TIMEOUT_MS,
  NEWS_REVALIDATE_SECONDS,
  NEWS_SOURCES,
  NEWS_USER_AGENT,
  SEASONAL_BOATING_TIPS,
} from "@/config/news";
import type {
  NewsCategory,
  NewsFeedResult,
  NewsItem,
  NewsSourceConfig,
} from "@/types/news";
import type { WeatherAlert } from "@/types/weather";
import { createHash } from "crypto";

function stripHtml(input: string): string {
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function hashId(sourceUrl: string): string {
  return createHash("sha256").update(sourceUrl).digest("hex").slice(0, 16);
}

function domainFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "unknown";
  }
}

function matchesKeywords(
  text: string,
  include?: string[],
  exclude?: string[]
): boolean {
  const t = text.toLowerCase();
  if (exclude?.some((k) => t.includes(k.toLowerCase()))) return false;
  if (!include?.length) return true;
  return include.some((k) => t.includes(k.toLowerCase()));
}

function inferCategory(
  source: NewsSourceConfig,
  title: string,
  summary: string
): NewsCategory {
  const t = `${title} ${summary}`.toLowerCase();
  if (
    t.includes("fish") ||
    t.includes("salmon") ||
    t.includes("trout") ||
    t.includes("charter")
  ) {
    return "Fishing";
  }
  if (
    t.includes("harbor") ||
    t.includes("marina") ||
    t.includes("dock") ||
    t.includes("slip")
  ) {
    return "Harbors & Marinas";
  }
  if (
    t.includes("warning") ||
    t.includes("advisory") ||
    t.includes("coast guard") ||
    t.includes("rescue") ||
    t.includes("safety")
  ) {
    return "Safety";
  }
  if (
    t.includes("air and water") ||
    t.includes("fireworks") ||
    t.includes("festival") ||
    t.includes("event")
  ) {
    return "Events";
  }
  if (t.includes("lake michigan") || t.includes("great lakes")) {
    return "Lake Michigan";
  }
  return source.defaultCategory;
}

/**
 * Original short summary — does not copy article body.
 * Uses only headline + source attribution.
 */
function buildOriginalSummary(
  sourceName: string,
  headline: string
): string {
  return `${sourceName} published an update titled “${headline}.” BoatingChicago summarizes source headlines for local boaters and always links to the original story — we do not republish full articles.`;
}

function buildWhyItMatters(category: NewsCategory, headline: string): string {
  const t = headline.toLowerCase();
  if (category === "Safety" || /warning|advisory|storm|wind|wave/.test(t)) {
    return "Safety implications for recreational boaters on Lake Michigan — check the official marine forecast and active NOAA/NWS alerts before departure.";
  }
  if (category === "Harbors & Marinas" || /harbor|marina|dock/.test(t)) {
    return "May affect harbor access, marina operations, or launch planning for Chicago boaters.";
  }
  if (category === "Events" || /fireworks|air and water|festival/.test(t)) {
    return "Event timing and crowd conditions can change on-water plans for fireworks, Air & Water Show viewing, and harbor traffic.";
  }
  if (category === "Fishing" || /fish|salmon|trout/.test(t)) {
    return "Relevant to fishing conditions, regulations, or charter planning out of Chicago and nearby Lake Michigan ports.";
  }
  if (category === "Lake Michigan") {
    return "Broader Lake Michigan conditions or policy that can influence recreational boating near Chicago.";
  }
  return "Seasonal relevance for Chicago boaters planning trips on Lake Michigan.";
}

function relatedPages(category: NewsCategory, headline: string) {
  const base = [...NEWS_CATEGORY_RELATED[category]];
  const t = headline.toLowerCase();
  if (t.includes("firework")) {
    base.unshift({
      href: "/chicago-fireworks-cruises",
      label: "Fireworks Cruises",
    });
  }
  if (t.includes("air and water") || t.includes("air & water")) {
    base.unshift({
      href: "/air-and-water-show-boat-rentals",
      label: "Air & Water Show Boats",
    });
  }
  if (t.includes("playpen")) {
    base.unshift({
      href: "/chicago-playpen-boat-rentals",
      label: "Playpen Boat Rentals",
    });
  }
  if (t.includes("yacht") || t.includes("party")) {
    base.push({ href: "/yacht-rentals-chicago", label: "Yacht Rentals" });
    base.push({
      href: "/party-boat-rentals-chicago",
      label: "Party Boat Rentals",
    });
  }
  // Dedupe by href
  const seen = new Set<string>();
  return base.filter((l) => {
    if (seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  }).slice(0, 4);
}

function parseRssItems(xml: string): {
  title: string;
  link: string;
  description: string;
  pubDate: string | null;
}[] {
  const items: {
    title: string;
    link: string;
    description: string;
    pubDate: string | null;
  }[] = [];
  const itemRegex = /<item[\s\S]*?<\/item>/gi;
  const blocks = xml.match(itemRegex) || [];
  for (const block of blocks) {
    const title =
      block.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i)?.[1] ||
      block.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ||
      "";
    const link =
      block.match(/<link><!\[CDATA\[([\s\S]*?)\]\]><\/link>/i)?.[1] ||
      block.match(/<link>([\s\S]*?)<\/link>/i)?.[1] ||
      "";
    const description =
      block.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/i)?.[1] ||
      block.match(/<description>([\s\S]*?)<\/description>/i)?.[1] ||
      "";
    const pubDate =
      block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1]?.trim() || null;
    const cleanTitle = stripHtml(title);
    const cleanLink = stripHtml(link).trim();
    if (!cleanTitle || !cleanLink) continue;
    items.push({
      title: cleanTitle,
      link: cleanLink,
      description: stripHtml(description).slice(0, 280),
      pubDate,
    });
  }
  return items;
}

async function fetchFeedXml(url: string): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), NEWS_FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": NEWS_USER_AGENT,
        Accept: "application/rss+xml,application/xml,text/xml,*/*",
      },
      signal: controller.signal,
      next: { revalidate: NEWS_REVALIDATE_SECONDS },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

function toNewsItem(
  source: NewsSourceConfig,
  raw: { title: string; link: string; description: string; pubDate: string | null },
  firstSeenAt: string
): NewsItem | null {
  const haystack = `${raw.title} ${raw.description}`;
  if (!matchesKeywords(haystack, source.includeKeywords, source.excludeKeywords)) {
    return null;
  }

  const category = inferCategory(source, raw.title, raw.description);
  const id = hashId(raw.link);
  const publishedIso = raw.pubDate
    ? new Date(raw.pubDate).toISOString()
    : null;
  const summary = buildOriginalSummary(source.name, raw.title);
  const why = buildWhyItMatters(category, raw.title);

  // Standalone pages only when we have a clear local boating angle + solid headline
  const qualifiesForArticlePage =
    raw.title.length >= 40 &&
    (category === "Safety" ||
      category === "Harbors & Marinas" ||
      category === "Events" ||
      /chicago|harbor|marina|lake michigan|boat|marine/i.test(raw.title));

  return {
    id,
    slug: `${slugify(raw.title)}-${id.slice(0, 8)}`,
    headline: raw.title,
    sourceName: source.name,
    sourceUrl: raw.link,
    sourceDomain: domainFromUrl(raw.link) || source.domain,
    sourcePublishedAt: publishedIso && !Number.isNaN(Date.parse(publishedIso))
      ? publishedIso
      : null,
    firstSeenAt,
    category,
    originalSummary: summary,
    whyItMatters: why,
    relatedBoatingChicagoPages: relatedPages(category, raw.title),
    imageUrl: null,
    isPublished: true,
    isFeatured: category === "Safety",
    qualifiesForArticlePage,
  };
}

/** Convert active NOAA/NWS alerts into Safety news cards (official source). */
export function newsFromWeatherAlerts(
  alerts: WeatherAlert[],
  firstSeenAt = new Date().toISOString()
): NewsItem[] {
  return alerts.slice(0, 8).map((a) => {
    const sourceUrl = a.sourceUrl.startsWith("http")
      ? a.sourceUrl
      : "https://www.weather.gov/lot";
    const id = hashId(`nws-alert:${a.id}`);
    const headline = a.headline || a.event;
    return {
      id,
      slug: `${slugify(a.event)}-${id.slice(0, 8)}`,
      headline,
      sourceName: "National Weather Service",
      sourceUrl,
      sourceDomain: "weather.gov",
      sourcePublishedAt: a.onset,
      firstSeenAt,
      category: "Safety" as const,
      originalSummary: buildOriginalSummary("National Weather Service", headline),
      whyItMatters: buildWhyItMatters("Safety", headline),
      relatedBoatingChicagoPages: relatedPages("Safety", headline),
      imageUrl: null,
      isPublished: true,
      isFeatured: true,
      qualifiesForArticlePage: false, // keep alerts on /news cards + /weather
    };
  });
}

export async function getChicagoNews(options?: {
  alerts?: WeatherAlert[];
}): Promise<NewsFeedResult> {
  const fetchedAt = new Date().toISOString();
  const errors: string[] = [];
  const sourcesAttempted: string[] = [];
  const byUrl = new Map<string, NewsItem>();

  for (const source of NEWS_SOURCES.filter((s) => s.enabled)) {
    sourcesAttempted.push(source.id);
    try {
      const xml = await fetchFeedXml(source.feedUrl);
      const rawItems = parseRssItems(xml);
      for (const raw of rawItems) {
        const item = toNewsItem(source, raw, fetchedAt);
        if (!item) continue;
        if (!byUrl.has(item.sourceUrl)) {
          byUrl.set(item.sourceUrl, item);
        }
      }
    } catch (err) {
      errors.push(
        `${source.id}: ${err instanceof Error ? err.message : "feed failed"}`
      );
    }
  }

  for (const alertItem of newsFromWeatherAlerts(options?.alerts || [], fetchedAt)) {
    if (!byUrl.has(alertItem.sourceUrl)) {
      byUrl.set(alertItem.sourceUrl, alertItem);
    }
  }

  const items = [...byUrl.values()]
    .filter((i) => i.isPublished)
    .sort((a, b) => {
      const at = a.sourcePublishedAt || a.firstSeenAt;
      const bt = b.sourcePublishedAt || b.firstSeenAt;
      return bt.localeCompare(at);
    });

  return { fetchedAt, items, errors, sourcesAttempted };
}

export function getNewsItemBySlug(
  items: NewsItem[],
  slug: string
): NewsItem | undefined {
  return items.find((i) => i.slug === slug && i.qualifiesForArticlePage);
}

export function getSeasonalTip(date = new Date()): string {
  const idx = date.getUTCDate() % SEASONAL_BOATING_TIPS.length;
  return SEASONAL_BOATING_TIPS[idx];
}

export { NEWS_REVALIDATE_SECONDS };
