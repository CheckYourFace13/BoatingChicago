import {
  NEWS_CATEGORY_RELATED,
  NEWS_FETCH_TIMEOUT_MS,
  NEWS_REVALIDATE_SECONDS,
  NEWS_SOURCES,
  NEWS_USER_AGENT,
  SEASONAL_BOATING_TIPS,
} from "@/config/news";
import { getPublishedEvents } from "@/data/geo";
import type {
  NewsCategory,
  NewsFeedResult,
  NewsItem,
  NewsSourceConfig,
} from "@/types/news";
import type { ChicagoWeatherPayload, WeatherAlert } from "@/types/weather";
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
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
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
    t.includes("sturgeon") ||
    t.includes("charter")
  ) {
    return "Fishing";
  }
  if (
    t.includes("harbor") ||
    t.includes("marina") ||
    t.includes("dock") ||
    t.includes("slip") ||
    t.includes("boat launch")
  ) {
    return "Harbors & Marinas";
  }
  if (
    t.includes("warning") ||
    t.includes("advisory") ||
    t.includes("coast guard") ||
    t.includes("rescue") ||
    t.includes("safety") ||
    t.includes("heat") ||
    t.includes("small craft") ||
    t.includes("gale") ||
    t.includes("rip current")
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
  if (
    t.includes("milwaukee") ||
    t.includes("kenosha") ||
    t.includes("racine") ||
    t.includes("sheboygan") ||
    t.includes("wisconsin")
  ) {
    return "Wisconsin";
  }
  if (
    t.includes("michigan city") ||
    t.includes("new buffalo") ||
    t.includes("indiana")
  ) {
    return "Indiana";
  }
  if (t.includes("great lakes") && !t.includes("chicago")) {
    return "Great Lakes";
  }
  if (t.includes("lake michigan") || t.includes("great lakes")) {
    return "Lake Michigan";
  }
  if (t.includes("chicago") || t.includes("navy pier") || t.includes("riverwalk")) {
    return "Chicago Boating";
  }
  return source.defaultCategory;
}

/**
 * Original short summary — does not copy article body.
 * Uses only headline + source attribution.
 */
function buildOriginalSummary(sourceName: string, headline: string): string {
  return `${sourceName} published an update titled “${headline}.” BoatingChicago summarizes source headlines for local boaters and always links to the original story — we do not republish full articles.`;
}

function buildWhyItMatters(category: NewsCategory, headline: string): string {
  const t = headline.toLowerCase();
  if (category === "Safety" || /warning|advisory|storm|wind|wave|heat|rescue/.test(t)) {
    return "Safety implications for recreational boaters on Lake Michigan — check the official marine forecast and active NOAA/NWS alerts before departure.";
  }
  if (category === "Harbors & Marinas" || /harbor|marina|dock|launch/.test(t)) {
    return "May affect harbor access, marina operations, or launch planning for Chicago-area boaters.";
  }
  if (category === "Events" || /fireworks|air and water|festival/.test(t)) {
    return "Event timing and crowd conditions can change on-water plans for fireworks, Air & Water Show viewing, and harbor traffic.";
  }
  if (category === "Fishing" || /fish|salmon|trout|sturgeon/.test(t)) {
    return "Relevant to fishing conditions, regulations, or charter planning out of Chicago and nearby Lake Michigan ports.";
  }
  if (category === "Wisconsin" || category === "Indiana") {
    return "Useful context for boaters traveling the southern Lake Michigan shoreline and nearby destinations.";
  }
  if (category === "Lake Michigan" || category === "Great Lakes") {
    return "Broader Lake Michigan / Great Lakes conditions or policy that can influence recreational boating near Chicago.";
  }
  return "Seasonal relevance for Chicago boaters planning trips on Lake Michigan.";
}

function relatedPages(category: NewsCategory, headline: string) {
  const base = [...(NEWS_CATEGORY_RELATED[category] || [])];
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
  const seen = new Set<string>();
  return base
    .filter((l) => {
      if (seen.has(l.href)) return false;
      seen.add(l.href);
      return true;
    })
    .slice(0, 4);
}

interface RawFeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: string | null;
}

function resolveRelativeLink(link: string, feedUrl: string): string {
  const cleaned = stripHtml(link).trim();
  if (!cleaned) return "";
  if (/^https?:\/\//i.test(cleaned)) return cleaned;
  if (cleaned.startsWith("//")) return `https:${cleaned}`;
  try {
    if (cleaned.startsWith("/")) {
      if (cleaned.startsWith("/lot/") || cleaned.startsWith("/mkx/")) {
        return `https://www.weather.gov${cleaned}`;
      }
      return new URL(cleaned, feedUrl).toString();
    }
    return new URL(cleaned, feedUrl).toString();
  } catch {
    return cleaned;
  }
}

function parseRssItems(xml: string, feedUrl: string): RawFeedItem[] {
  const items: RawFeedItem[] = [];
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  for (const block of blocks) {
    const title =
      block.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i)?.[1] ||
      block.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ||
      "";
    let link =
      block.match(/<link><!\[CDATA\[([\s\S]*?)\]\]><\/link>/i)?.[1] ||
      block.match(/<link>([\s\S]*?)<\/link>/i)?.[1] ||
      "";
    const guid =
      block.match(/<guid[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/guid>/i)?.[1] ||
      block.match(/<guid[^>]*>([\s\S]*?)<\/guid>/i)?.[1] ||
      "";
    if (!stripHtml(link).trim() && guid) {
      link = guid;
    }
    const description =
      block.match(
        /<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/i
      )?.[1] ||
      block.match(/<description>([\s\S]*?)<\/description>/i)?.[1] ||
      "";
    const pubDate =
      block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1]?.trim() || null;
    const cleanTitle = stripHtml(title);
    const cleanLink = resolveRelativeLink(link, feedUrl);
    if (!cleanTitle || !cleanLink) continue;
    items.push({
      title: cleanTitle,
      link: cleanLink,
      description: stripHtml(description).slice(0, 500),
      pubDate,
    });
  }
  return items;
}

function parseAtomEntries(xml: string, feedUrl: string): RawFeedItem[] {
  const items: RawFeedItem[] = [];
  const blocks = xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
  for (const block of blocks) {
    const title =
      block.match(/<title[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i)?.[1] ||
      block.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ||
      "";
    const linkHref =
      block.match(/<link[^>]*href=["']([^"']+)["'][^>]*>/i)?.[1] ||
      block.match(/<link[^>]*>([\s\S]*?)<\/link>/i)?.[1] ||
      "";
    const id =
      block.match(/<id>([\s\S]*?)<\/id>/i)?.[1] ||
      "";
    const description =
      block.match(/<summary[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/summary>/i)?.[1] ||
      block.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i)?.[1] ||
      block.match(/<content[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/content>/i)?.[1] ||
      block.match(/<content[^>]*>([\s\S]*?)<\/content>/i)?.[1] ||
      "";
    const pubDate =
      block.match(/<updated>([\s\S]*?)<\/updated>/i)?.[1]?.trim() ||
      block.match(/<published>([\s\S]*?)<\/published>/i)?.[1]?.trim() ||
      null;
    const cleanTitle = stripHtml(title);
    const cleanLink = resolveRelativeLink(linkHref || id, feedUrl);
    if (!cleanTitle || !cleanLink) continue;
    // Skip CAP feed channel title entry
    if (/^current watches, warnings/i.test(cleanTitle)) continue;
    items.push({
      title: cleanTitle,
      link: cleanLink,
      description: stripHtml(description).slice(0, 500),
      pubDate,
    });
  }
  return items;
}

function parseFeedItems(xml: string, feedUrl: string): RawFeedItem[] {
  if (/<entry[\s>]/i.test(xml)) {
    return parseAtomEntries(xml, feedUrl);
  }
  return parseRssItems(xml, feedUrl);
}

async function fetchFeedXml(url: string): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), NEWS_FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": NEWS_USER_AGENT,
        Accept:
          "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
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

function logFeedFailure(sourceId: string, err: unknown): void {
  const message = err instanceof Error ? err.message : "feed failed";
  console.error(`[news] feed failed source=${sourceId} error=${message}`);
}

function toNewsItem(
  source: NewsSourceConfig,
  raw: RawFeedItem,
  firstSeenAt: string
): NewsItem | null {
  const haystack = `${raw.title} ${raw.description}`;
  if (!matchesKeywords(haystack, source.includeKeywords, source.excludeKeywords)) {
    return null;
  }

  const category = inferCategory(source, raw.title, raw.description);
  const id = hashId(raw.link);
  const publishedIso = raw.pubDate ? new Date(raw.pubDate).toISOString() : null;
  const summary = buildOriginalSummary(source.name, raw.title);
  const why = buildWhyItMatters(category, raw.title);

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
    sourcePublishedAt:
      publishedIso && !Number.isNaN(Date.parse(publishedIso))
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
    kind: "story",
  };
}

/** Convert active NOAA/NWS alerts into Safety cards (official source). */
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
      qualifiesForArticlePage: false,
      kind: "official" as const,
    };
  });
}

/** Official on-water updates when RSS is thin — never fake news stories. */
export function buildOfficialOnWaterUpdates(
  weather: ChicagoWeatherPayload | null | undefined,
  firstSeenAt = new Date().toISOString()
): NewsItem[] {
  const items: NewsItem[] = [];
  if (!weather) return items;

  const rating = weather.rating;
  if (rating) {
    const headline = `Chicago boating conditions: ${rating.level}`;
    const id = hashId(`official-rating:${weather.fetchedAt.slice(0, 13)}`);
    items.push({
      id,
      slug: `${slugify(headline)}-${id.slice(0, 8)}`,
      headline,
      sourceName: "BoatingChicago Weather",
      sourceUrl: "https://boatingchicago.com/weather",
      sourceDomain: "boatingchicago.com",
      sourcePublishedAt: weather.fetchedAt,
      firstSeenAt,
      category: "Safety",
      originalSummary: `${rating.reason} This is an informational conditions summary based on NOAA/NWS data — not a guarantee of safety.`,
      whyItMatters:
        "Use this alongside the official nearshore marine forecast before you leave the dock.",
      relatedBoatingChicagoPages: relatedPages("Safety", headline),
      imageUrl: null,
      isPublished: true,
      isFeatured: rating.level !== "Good",
      qualifiesForArticlePage: false,
      kind: "official",
    });
  }

  if (weather.current?.windSpeedMph != null) {
    const wind = weather.current.windSpeedMph;
    const gust = weather.current.windGustMph;
    const headline = `Observed wind near Chicago: ${Math.round(wind)} mph${
      gust != null ? ` (gusts ${Math.round(gust)} mph)` : ""
    }`;
    const id = hashId(`official-wind:${weather.fetchedAt.slice(0, 13)}`);
    items.push({
      id,
      slug: `${slugify(headline)}-${id.slice(0, 8)}`,
      headline,
      sourceName: "NOAA / NWS observations",
      sourceUrl: "https://boatingchicago.com/weather",
      sourceDomain: "weather.gov",
      sourcePublishedAt: weather.current.observedAt || weather.fetchedAt,
      firstSeenAt,
      category: "Lake Michigan",
      originalSummary:
        "Latest observed wind from official weather sources used on our weather page. Always verify the marine forecast for open-water decisions.",
      whyItMatters:
        "Wind over Lake Michigan builds chop faster than the same breeze feels downtown.",
      relatedBoatingChicagoPages: relatedPages("Lake Michigan", headline),
      imageUrl: null,
      isPublished: true,
      isFeatured: false,
      qualifiesForArticlePage: false,
      kind: "official",
    });
  }

  if (weather.lake.waveHeightFt != null || weather.lake.waterTempF != null) {
    const parts: string[] = [];
    if (weather.lake.waterTempF != null) {
      parts.push(`water ~${Math.round(weather.lake.waterTempF)}°F`);
    }
    if (weather.lake.waveHeightFt != null) {
      parts.push(`waves ~${weather.lake.waveHeightFt.toFixed(1)} ft`);
    }
    const headline = `Lake Michigan nearshore update: ${parts.join(", ")}`;
    const id = hashId(`official-lake:${weather.fetchedAt.slice(0, 13)}`);
    items.push({
      id,
      slug: `${slugify(headline)}-${id.slice(0, 8)}`,
      headline,
      sourceName: "NOAA buoy / lake observations",
      sourceUrl: "https://boatingchicago.com/weather",
      sourceDomain: "noaa.gov",
      sourcePublishedAt: weather.lake.observedAt || weather.fetchedAt,
      firstSeenAt,
      category: "Lake Michigan",
      originalSummary:
        "Observed lake conditions summarized for Chicago-area boaters. Values can change quickly — confirm on the weather page and official buoy products.",
      whyItMatters:
        "Water temperature and wave height are core inputs for trip planning and cold-water safety.",
      relatedBoatingChicagoPages: relatedPages("Lake Michigan", headline),
      imageUrl: null,
      isPublished: true,
      isFeatured: false,
      qualifiesForArticlePage: false,
      kind: "official",
    });
  }

  const events = getPublishedEvents().slice(0, 4);
  for (const event of events) {
    const headline = `Upcoming: ${event.title}`;
    const id = hashId(`official-event:${event.slug}`);
    items.push({
      id,
      slug: `${slugify(headline)}-${id.slice(0, 8)}`,
      headline,
      sourceName: "BoatingChicago Events",
      sourceUrl: `https://boatingchicago.com/events`,
      sourceDomain: "boatingchicago.com",
      sourcePublishedAt: event.startDate || firstSeenAt,
      firstSeenAt,
      category: "Events",
      originalSummary:
        event.summary ||
        `${event.title} is listed on our Chicago-area boating events calendar.`,
      whyItMatters:
        "Event weekends often mean denser harbor traffic and earlier dock demand.",
      relatedBoatingChicagoPages: [
        { href: "/events", label: "Events" },
        { href: "/weather", label: "Boating Weather" },
      ],
      imageUrl: null,
      isPublished: true,
      isFeatured: false,
      qualifiesForArticlePage: false,
      kind: "official",
    });
  }

  return items;
}

export async function getChicagoNews(options?: {
  alerts?: WeatherAlert[];
  weather?: ChicagoWeatherPayload | null;
}): Promise<NewsFeedResult> {
  const fetchedAt = new Date().toISOString();
  const errors: string[] = [];
  const sourcesAttempted: string[] = [];
  const sourcesSucceeded: string[] = [];
  const byUrl = new Map<string, NewsItem>();

  for (const source of NEWS_SOURCES.filter((s) => s.enabled)) {
    sourcesAttempted.push(source.id);
    try {
      const xml = await fetchFeedXml(source.feedUrl);
      const rawItems = parseFeedItems(xml, source.feedUrl);
      const matched: NewsItem[] = [];
      for (const raw of rawItems) {
        const item = toNewsItem(source, raw, fetchedAt);
        if (!item) continue;
        matched.push(item);
      }
      for (const item of matched.slice(0, 8)) {
        if (!byUrl.has(item.sourceUrl)) {
          byUrl.set(item.sourceUrl, item);
        }
      }
      sourcesSucceeded.push(source.id);
      if (matched.length === 0 && rawItems.length > 0) {
        console.info(
          `[news] source=${source.id} fetched=${rawItems.length} matched=0 (filters)`
        );
      }
    } catch (err) {
      logFeedFailure(source.id, err);
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

  // Always enrich with official on-water updates (conditions + events)
  for (const official of buildOfficialOnWaterUpdates(options?.weather, fetchedAt)) {
    if (!byUrl.has(official.sourceUrl + official.id)) {
      byUrl.set(official.sourceUrl + official.id, official);
    }
  }

  const items = [...byUrl.values()]
    .filter((i) => i.isPublished)
    .sort((a, b) => {
      const at = a.sourcePublishedAt || a.firstSeenAt;
      const bt = b.sourcePublishedAt || b.firstSeenAt;
      return bt.localeCompare(at);
    });

  return {
    fetchedAt,
    items,
    errors,
    sourcesAttempted,
    sourcesSucceeded,
  };
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

export function getStoryItems(items: NewsItem[]): NewsItem[] {
  return items.filter((i) => i.kind === "story");
}

export function getOfficialItems(items: NewsItem[]): NewsItem[] {
  return items.filter((i) => i.kind === "official");
}

export { NEWS_REVALIDATE_SECONDS };
