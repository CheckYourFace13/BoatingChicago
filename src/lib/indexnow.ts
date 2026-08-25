import { siteConfig } from "@/config/site";
import { INDEXNOW_ENDPOINT, INDEXNOW_KEY } from "@/config/indexnow";
import { getAllCategorySlugs } from "@/data/categories";
import { getPublishedVendors } from "@/data/vendors";
import { promises as fs } from "fs";
import path from "path";

export function getIndexNowKeyLocation(): string {
  const base = siteConfig.url.replace(/\/$/, "");
  return `${base}/${INDEXNOW_KEY}.txt`;
}

/** All publicly indexable URLs currently known to this codebase (sitemap source). */
export function getAllIndexableUrls(): string[] {
  const base = siteConfig.url.replace(/\/$/, "");

  const staticPaths = [
    "",
    "/vendors",
    "/list-your-business",
    "/about",
    "/contact",
    "/affiliate-disclosure",
    "/privacy",
    "/terms",
  ];

  const urls = [
    ...staticPaths.map((p) => `${base}${p}`),
    ...getAllCategorySlugs().map((slug) => `${base}/${slug}`),
    ...getPublishedVendors().map((v) => `${base}/vendors/${v.slug}`),
  ];

  return [...new Set(urls)];
}

/** Fetch the live production sitemap URL list (source of truth for sweeps). */
export async function fetchLiveSitemapUrls(
  sitemapUrl = `${siteConfig.url.replace(/\/$/, "")}/sitemap.xml`
): Promise<string[]> {
  const res = await fetch(sitemapUrl, {
    headers: { Accept: "application/xml,text/xml,*/*" },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap (${res.status}): ${sitemapUrl}`);
  }
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) =>
    m[1].trim()
  );
  return [...new Set(urls)];
}

export interface IndexNowKeyVerification {
  ok: boolean;
  status: number;
  body: string;
  expected: string;
  url: string;
}

export async function verifyIndexNowKeyFile(): Promise<IndexNowKeyVerification> {
  const url = getIndexNowKeyLocation();
  try {
    const res = await fetch(url, { cache: "no-store" });
    const body = (await res.text()).replace(/^\uFEFF/, "").trim();
    return {
      ok: res.status === 200 && body === INDEXNOW_KEY,
      status: res.status,
      body,
      expected: INDEXNOW_KEY,
      url,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      body: err instanceof Error ? err.message : "fetch failed",
      expected: INDEXNOW_KEY,
      url,
    };
  }
}

export interface IndexNowSubmitResult {
  ok: boolean;
  status: number;
  submitted: number;
  skipped: number;
  rejected: string[];
  message: string;
  keyVerified?: boolean;
}

const DEFAULT_DEDUPE_MS = 24 * 60 * 60 * 1000; // 24h

interface DedupeState {
  /** url -> last submitted epoch ms */
  lastSubmitted: Record<string, number>;
  lastSweepAt?: number;
}

function statePath(): string {
  return path.join(process.cwd(), "data", "indexnow-state.json");
}

async function readDedupeState(): Promise<DedupeState> {
  try {
    const raw = await fs.readFile(statePath(), "utf8");
    const parsed = JSON.parse(raw) as DedupeState;
    return {
      lastSubmitted: parsed.lastSubmitted || {},
      lastSweepAt: parsed.lastSweepAt,
    };
  } catch {
    return { lastSubmitted: {} };
  }
}

async function writeDedupeState(state: DedupeState): Promise<void> {
  const dir = path.dirname(statePath());
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(statePath(), JSON.stringify(state, null, 2), "utf8");
}

/**
 * Submit URLs to IndexNow. Skips URLs submitted within dedupeWindowMs
 * to avoid excessive duplicate pings.
 */
export async function submitUrlsToIndexNow(
  urls: string[],
  options?: {
    dedupeWindowMs?: number;
    skipDedupe?: boolean;
    requireLiveKey?: boolean;
    markSweep?: boolean;
  }
): Promise<IndexNowSubmitResult> {
  const unique = [...new Set(urls.filter(Boolean))];
  if (unique.length === 0) {
    return {
      ok: false,
      status: 400,
      submitted: 0,
      skipped: 0,
      rejected: [],
      message: "No URLs provided",
    };
  }

  let keyVerified: boolean | undefined;
  if (options?.requireLiveKey !== false) {
    const keyCheck = await verifyIndexNowKeyFile();
    keyVerified = keyCheck.ok;
    if (!keyCheck.ok) {
      return {
        ok: false,
        status: keyCheck.status || 403,
        submitted: 0,
        skipped: 0,
        rejected: [],
        message: `IndexNow key verification failed at ${keyCheck.url} (HTTP ${keyCheck.status}, body="${keyCheck.body.slice(0, 80)}")`,
        keyVerified: false,
      };
    }
  }

  const dedupeWindow = options?.dedupeWindowMs ?? DEFAULT_DEDUPE_MS;
  const now = Date.now();
  const state = options?.skipDedupe ? { lastSubmitted: {} } : await readDedupeState();

  const toSubmit = options?.skipDedupe
    ? unique
    : unique.filter((url) => {
        const last = state.lastSubmitted[url];
        return !last || now - last >= dedupeWindow;
      });

  const skipped = unique.length - toSubmit.length;
  if (toSubmit.length === 0) {
    return {
      ok: true,
      status: 200,
      submitted: 0,
      skipped,
      rejected: [],
      message: `All ${unique.length} URL(s) were submitted recently; skipped duplicates`,
      keyVerified,
    };
  }

  const host = new URL(siteConfig.url).host;
  const keyLocation = getIndexNowKeyLocation();
  const chunkSize = 1000;
  let lastStatus = 0;
  const rejected: string[] = [];

  for (let i = 0; i < toSubmit.length; i += chunkSize) {
    const urlList = toSubmit.slice(i, i + chunkSize);
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation,
        urlList,
      }),
    });

    lastStatus = res.status;
    if (![200, 202, 204].includes(res.status)) {
      const body = await res.text().catch(() => "");
      return {
        ok: false,
        status: res.status,
        submitted: i,
        skipped,
        rejected: urlList,
        message: body || `IndexNow request failed with status ${res.status}`,
        keyVerified,
      };
    }

    for (const url of urlList) {
      state.lastSubmitted[url] = now;
    }
  }

  if (options?.markSweep) {
    state.lastSweepAt = now;
  }

  // Prune entries older than 30 days
  const pruneBefore = now - 30 * 24 * 60 * 60 * 1000;
  for (const [url, ts] of Object.entries(state.lastSubmitted)) {
    if (ts < pruneBefore) delete state.lastSubmitted[url];
  }

  try {
    await writeDedupeState(state);
  } catch {
    // Non-fatal on read-only hosts
  }

  return {
    ok: true,
    status: lastStatus,
    submitted: toSubmit.length,
    skipped,
    rejected,
    message: `Submitted ${toSubmit.length} URL(s) to IndexNow (${skipped} skipped as recent duplicates)`,
    keyVerified,
  };
}

/** Notify IndexNow of specific changed pages (server-side only). */
export async function notifyIndexNowUrls(urls: string[]): Promise<IndexNowSubmitResult> {
  return submitUrlsToIndexNow(urls, { requireLiveKey: true });
}

/** Full sitemap reconciliation sweep. */
export async function sweepIndexNowFromLiveSitemap(): Promise<IndexNowSubmitResult> {
  const urls = await fetchLiveSitemapUrls();
  return submitUrlsToIndexNow(urls, {
    requireLiveKey: true,
    markSweep: true,
    // Weekly sweeps may re-ping everything once per week
    dedupeWindowMs: 6 * 24 * 60 * 60 * 1000,
  });
}
