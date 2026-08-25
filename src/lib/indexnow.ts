import { siteConfig } from "@/config/site";
import { INDEXNOW_ENDPOINT, INDEXNOW_KEY } from "@/config/indexnow";
import { getAllCategorySlugs } from "@/data/categories";
import { getAllGuideSlugs } from "@/data/guides";
import { getPublishedVendors } from "@/data/vendors";

export function getIndexNowKeyLocation(): string {
  const base = siteConfig.url.replace(/\/$/, "");
  return `${base}/${INDEXNOW_KEY}.txt`;
}

/** All publicly indexable URLs currently in the sitemap. */
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
    ...staticPaths.map((path) => `${base}${path}`),
    ...getAllCategorySlugs().map((slug) => `${base}/${slug}`),
    ...getAllGuideSlugs().map((slug) => `${base}/${slug}`),
    ...getPublishedVendors().map((v) => `${base}/vendors/${v.slug}`),
  ];

  return [...new Set(urls)];
}

export interface IndexNowSubmitResult {
  ok: boolean;
  status: number;
  submitted: number;
  message: string;
}

/**
 * Submit one or more URLs to IndexNow (shared with Bing and partners).
 * Batches of up to 10,000 are allowed; we chunk at 1,000 for safety.
 */
export async function submitUrlsToIndexNow(
  urls: string[]
): Promise<IndexNowSubmitResult> {
  const unique = [...new Set(urls.filter(Boolean))];
  if (unique.length === 0) {
    return { ok: false, status: 400, submitted: 0, message: "No URLs provided" };
  }

  const host = new URL(siteConfig.url).host;
  const keyLocation = getIndexNowKeyLocation();
  const chunkSize = 1000;
  let lastStatus = 0;

  for (let i = 0; i < unique.length; i += chunkSize) {
    const urlList = unique.slice(i, i + chunkSize);
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
    // 200 / 202 are success; 204 also accepted by some engines
    if (![200, 202, 204].includes(res.status)) {
      const body = await res.text().catch(() => "");
      return {
        ok: false,
        status: res.status,
        submitted: i,
        message: body || `IndexNow request failed with status ${res.status}`,
      };
    }
  }

  return {
    ok: true,
    status: lastStatus,
    submitted: unique.length,
    message: `Submitted ${unique.length} URL(s) to IndexNow`,
  };
}
