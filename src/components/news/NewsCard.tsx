"use client";

import Link from "next/link";
import { trackAnalyticsEvent } from "@/lib/analytics";
import type { NewsItem } from "@/types/news";

export function NewsCard({
  item,
  compact = false,
  featured = false,
}: {
  item: NewsItem;
  compact?: boolean;
  featured?: boolean;
}) {
  const related = item.relatedBoatingChicagoPages.slice(0, compact ? 2 : 5);

  return (
    <article
      className={`rounded-2xl border border-sky-blue/20 bg-white shadow-sm ${
        featured ? "p-6 md:p-8" : compact ? "p-4" : "p-5"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <p className="text-xs font-bold uppercase tracking-widest text-coral">
          {item.category}
        </p>
        {item.kind === "official" ? (
          <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-light-blue text-lake-blue">
            Official update
          </span>
        ) : null}
      </div>
      <h3
        className={`font-extrabold text-lake-blue mb-2 leading-snug ${
          featured ? "text-2xl md:text-3xl" : compact ? "text-base" : "text-xl"
        }`}
      >
        {item.qualifiesForArticlePage ? (
          <Link
            href={`/news/${item.slug}`}
            className="hover:underline"
            onClick={() =>
              trackAnalyticsEvent("news_story_click", {
                slug: item.slug,
                source: item.sourceDomain,
              })
            }
          >
            {item.headline}
          </Link>
        ) : (
          item.headline
        )}
      </h3>
      {!compact ? (
        <p
          className={`text-gray-700 leading-relaxed mb-3 ${
            featured ? "text-base md:text-lg" : "text-sm"
          }`}
        >
          {item.originalSummary}
        </p>
      ) : null}
      <p className="text-xs text-gray-500 mb-3">
        <span className="font-semibold text-gray-600">{item.sourceName}</span>
        {item.sourcePublishedAt
          ? ` · ${new Date(item.sourcePublishedAt).toLocaleDateString("en-US", {
              timeZone: "America/Chicago",
            })}`
          : null}
      </p>
      <a
        href={item.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-bold text-coral hover:underline"
        onClick={() =>
          trackAnalyticsEvent("news_source_click", {
            source: item.sourceDomain,
            slug: item.slug,
          })
        }
      >
        Read at {item.sourceName} →
      </a>
      {related.length ? (
        <div className={`mt-4 ${compact ? "" : ""}`}>
          {!compact ? (
            <p className="text-[11px] font-bold uppercase tracking-widest text-lake-blue/60 mb-2">
              Related Boating Resources
            </p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {related.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  compact
                    ? "text-xs font-semibold text-sky-blue hover:underline"
                    : "text-xs font-semibold px-3 py-1.5 rounded-full bg-light-blue text-lake-blue hover:bg-sky-blue/20"
                }
              >
                {l.label}
                {compact ? " →" : ""}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}

export function NewsList({
  items,
  compact = false,
}: {
  items: NewsItem[];
  compact?: boolean;
}) {
  if (!items.length) {
    return (
      <p className="text-gray-600">
        No stories in this section right now. See{" "}
        <Link href="/weather" className="font-semibold text-lake-blue underline">
          boating weather
        </Link>{" "}
        for live conditions and official alerts.
      </p>
    );
  }
  return (
    <div className={`grid gap-4 ${compact ? "" : "md:grid-cols-2"}`}>
      {items.map((item) => (
        <NewsCard key={item.id} item={item} compact={compact} />
      ))}
    </div>
  );
}
