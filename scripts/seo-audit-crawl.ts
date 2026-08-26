/**
 * One-shot SEO audit crawler for BoatingChicago sitemap URLs.
 * Usage: npx tsx scripts/seo-audit-crawl.ts
 */
import { promises as fs } from "fs";
import path from "path";

type AuditRow = {
  url: string;
  path: string;
  status: number;
  ok: boolean;
  title: string;
  description: string;
  canonical: string;
  h1Count: number;
  h1: string;
  wordApprox: number;
  hasBreadcrumbJsonLd: boolean;
  hasArticleJsonLd: boolean;
  hasOrgJsonLd: boolean;
  internalLinkCount: number;
  externalLinkCount: number;
  imageCount: number;
  imagesMissingAlt: number;
  error?: string;
};

function absPath(url: string): string {
  try {
    const u = new URL(url);
    return u.pathname.replace(/\/$/, "") || "/";
  } catch {
    return url;
  }
}

function extract(html: string, url: string): Omit<AuditRow, "url" | "path" | "status" | "ok" | "error"> {
  const title =
    html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g, " ").trim() ||
    "";
  const description =
    html.match(
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i
    )?.[1] ||
    html.match(
      /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i
    )?.[1] ||
    "";
  const canonical =
    html.match(
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i
    )?.[1] ||
    html.match(
      /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i
    )?.[1] ||
    "";

  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  const h1s = h1Matches.map((m) =>
    m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
  );

  const bodyText = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const wordApprox = bodyText.split(/\s+/).filter(Boolean).length;

  const hasBreadcrumbJsonLd =
    /BreadcrumbList/i.test(html) || /breadcrumb/i.test(html);
  const hasArticleJsonLd = /"@type"\s*:\s*"Article"/i.test(html);
  const hasOrgJsonLd =
    /"@type"\s*:\s*"Organization"/i.test(html) ||
    /"@type"\s*:\s*"WebSite"/i.test(html);

  const hrefs = [...html.matchAll(/href=["']([^"']+)["']/gi)].map((m) => m[1]);
  let internalLinkCount = 0;
  let externalLinkCount = 0;
  for (const href of hrefs) {
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:"))
      continue;
    if (
      href.startsWith("/") ||
      href.includes("boatingchicago.com") ||
      href.startsWith("https://boatingchicago.com")
    ) {
      internalLinkCount++;
    } else if (href.startsWith("http")) {
      externalLinkCount++;
    }
  }

  const imgs = [...html.matchAll(/<img\b([^>]*)>/gi)];
  let imagesMissingAlt = 0;
  for (const img of imgs) {
    const attrs = img[1];
    const alt = attrs.match(/alt=["']([^"']*)["']/i);
    if (!alt || alt[1].trim() === "") imagesMissingAlt++;
  }

  return {
    title,
    description,
    canonical,
    h1Count: h1s.length,
    h1: h1s[0] || "",
    wordApprox,
    hasBreadcrumbJsonLd,
    hasArticleJsonLd,
    hasOrgJsonLd,
    internalLinkCount,
    externalLinkCount,
    imageCount: imgs.length,
    imagesMissingAlt,
  };
}

async function fetchOne(url: string): Promise<AuditRow> {
  const p = absPath(url);
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "BoatingChicagoSEOAudit/1.0",
        Accept: "text/html",
      },
      redirect: "follow",
    });
    const html = await res.text();
    const base = extract(html, url);
    return {
      url,
      path: p,
      status: res.status,
      ok: res.ok,
      ...base,
    };
  } catch (err) {
    return {
      url,
      path: p,
      status: 0,
      ok: false,
      title: "",
      description: "",
      canonical: "",
      h1Count: 0,
      h1: "",
      wordApprox: 0,
      hasBreadcrumbJsonLd: false,
      hasArticleJsonLd: false,
      hasOrgJsonLd: false,
      internalLinkCount: 0,
      externalLinkCount: 0,
      imageCount: 0,
      imagesMissingAlt: 0,
      error: err instanceof Error ? err.message : "fetch failed",
    };
  }
}

async function mapPool<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx]);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker())
  );
  return results;
}

async function main() {
  const listPath = path.join(process.cwd(), "data", "sitemap-urls-audit.txt");
  const raw = await fs.readFile(listPath, "utf8");
  const urls = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  console.log(`Auditing ${urls.length} URLs...`);
  const rows = await mapPool(urls, 8, fetchOne);

  // Duplicate title / description detection
  const titleMap = new Map<string, string[]>();
  const descMap = new Map<string, string[]>();
  for (const r of rows) {
    if (r.title) {
      const list = titleMap.get(r.title) || [];
      list.push(r.path);
      titleMap.set(r.title, list);
    }
    if (r.description) {
      const list = descMap.get(r.description) || [];
      list.push(r.path);
      descMap.set(r.description, list);
    }
  }

  const enriched = rows.map((r) => {
    const dupTitle = (titleMap.get(r.title) || []).length > 1;
    const dupDesc = (descMap.get(r.description) || []).length > 1;
    const expectedCanon = `https://boatingchicago.com${r.path === "/" ? "" : r.path}`;
    const norm = (s: string) => s.replace(/\/$/, "") || "https://boatingchicago.com";
    const canonOk = !r.canonical || norm(r.canonical) === norm(expectedCanon);
    return {
      ...r,
      dupTitle,
      dupDesc,
      canonOk,
      thin: r.wordApprox > 0 && r.wordApprox < 350,
      missingH1: r.h1Count !== 1,
      missingDesc: !r.description,
      missingTitle: !r.title,
    };
  });

  const outDir = path.join(process.cwd(), "data");
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(
    path.join(outDir, "seo-audit-results.json"),
    JSON.stringify(enriched, null, 2),
    "utf8"
  );

  const issues = enriched.filter(
    (r) =>
      !r.ok ||
      r.missingH1 ||
      r.missingDesc ||
      r.missingTitle ||
      r.dupTitle ||
      r.dupDesc ||
      !r.canonOk ||
      r.thin ||
      r.imagesMissingAlt > 0
  );

  console.log(
    JSON.stringify(
      {
        total: enriched.length,
        ok: enriched.filter((r) => r.ok).length,
        non200: enriched.filter((r) => !r.ok).map((r) => ({ path: r.path, status: r.status })),
        thin: enriched.filter((r) => r.thin).map((r) => ({ path: r.path, words: r.wordApprox })),
        badH1: enriched.filter((r) => r.missingH1).map((r) => ({ path: r.path, h1Count: r.h1Count, h1: r.h1 })),
        dupTitles: [...titleMap.entries()]
          .filter(([, paths]) => paths.length > 1)
          .map(([title, paths]) => ({ title: title.slice(0, 80), paths })),
        dupDescs: [...descMap.entries()]
          .filter(([, paths]) => paths.length > 1)
          .map(([d, paths]) => ({ description: d.slice(0, 80), paths })),
        missingAlt: enriched
          .filter((r) => r.imagesMissingAlt > 0)
          .map((r) => ({ path: r.path, missing: r.imagesMissingAlt, imgs: r.imageCount })),
        issueCount: issues.length,
      },
      null,
      2
    )
  );
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
