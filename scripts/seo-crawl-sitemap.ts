/**
 * Crawl live sitemap URLs: status, redirect hops, basic robots/canonical signals.
 * Usage: npx tsx scripts/seo-crawl-sitemap.ts [--limit=N] [--base=https://boatingchicago.com]
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const base =
  process.argv.find((a) => a.startsWith("--base="))?.slice("--base=".length) ||
  process.env.SITE_URL ||
  "https://boatingchicago.com";
const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : 0;

type Row = {
  url: string;
  status: number;
  redirects: number;
  finalUrl: string;
  canonical: string | null;
  robots: string | null;
  title: string | null;
  h1: string | null;
  error?: string;
};

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "user-agent": "BoatingChicago-SEO-Crawl/1.0" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

function parseSitemapLocs(xml: string): string[] {
  const locs: string[] = [];
  const re = /<loc>\s*([^<]+)\s*<\/loc>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml))) {
    locs.push(m[1].trim());
  }
  return [...new Set(locs)];
}

function metaContent(html: string, name: string): string | null {
  const re = new RegExp(
    `<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']+)["']`,
    "i",
  );
  const m = html.match(re);
  if (m) return m[1];
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']${name}["']`,
    "i",
  );
  const m2 = html.match(re2);
  return m2?.[1] ?? null;
}

async function probe(url: string): Promise<Row> {
  try {
    let redirects = 0;
    let current = url;
    // Manual hop counting for clarity (max 5)
    for (let i = 0; i < 5; i++) {
      const res = await fetch(current, {
        redirect: "manual",
        headers: { "user-agent": "BoatingChicago-SEO-Crawl/1.0" },
      });
      if (res.status >= 300 && res.status < 400) {
        const loc = res.headers.get("location");
        if (!loc) {
          return {
            url,
            status: res.status,
            redirects,
            finalUrl: current,
            canonical: null,
            robots: null,
            title: null,
            h1: null,
            error: "redirect without location",
          };
        }
        current = new URL(loc, current).toString();
        redirects += 1;
        continue;
      }
      const html = await res.text();
      const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? null;
      const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]
        ?.replace(/<[^>]+>/g, "")
        .trim() ?? null;
      const canonical =
        html.match(
          /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
        )?.[1] ?? null;
      return {
        url,
        status: res.status,
        redirects,
        finalUrl: current,
        canonical,
        robots: metaContent(html, "robots"),
        title,
        h1,
      };
    }
    return {
      url,
      status: 0,
      redirects,
      finalUrl: current,
      canonical: null,
      robots: null,
      title: null,
      h1: null,
      error: "too many redirects",
    };
  } catch (err) {
    return {
      url,
      status: 0,
      redirects: 0,
      finalUrl: url,
      canonical: null,
      robots: null,
      title: null,
      h1: null,
      error: err instanceof Error ? err.message : "probe failed",
    };
  }
}

async function main() {
  const sitemapUrl = `${base.replace(/\/$/, "")}/sitemap.xml`;
  const xml = await fetchText(sitemapUrl);
  let urls = parseSitemapLocs(xml);
  if (limit > 0) urls = urls.slice(0, limit);

  const rows: Row[] = [];
  for (const url of urls) {
    const row = await probe(url);
    rows.push(row);
    const mark =
      row.status === 200 && row.redirects <= 1 && !row.error ? "ok" : "WARN";
    console.log(`${mark} ${row.status} hops=${row.redirects} ${url}`);
  }

  const bad = rows.filter(
    (r) => r.status !== 200 || r.redirects > 1 || Boolean(r.error),
  );
  const missingH1 = rows.filter((r) => r.status === 200 && !r.h1);
  const summary = {
    generatedAt: new Date().toISOString(),
    base,
    crawled: rows.length,
    badCount: bad.length,
    missingH1Count: missingH1.length,
    bad: bad.slice(0, 50),
    missingH1: missingH1.slice(0, 30).map((r) => r.url),
  };

  const out = join(process.cwd(), "data", "seo-crawl-latest.json");
  writeFileSync(out, JSON.stringify(summary, null, 2));
  console.log(`Wrote ${out}`);
  console.log(
    JSON.stringify(
      {
        crawled: summary.crawled,
        badCount: summary.badCount,
        missingH1Count: summary.missingH1Count,
      },
      null,
      2,
    ),
  );
  if (bad.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
