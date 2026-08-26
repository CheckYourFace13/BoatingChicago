"use client";

import Link from "next/link";
import { trackAnalyticsEvent } from "@/lib/analytics";
import type { NewsItem } from "@/types/news";

export function NewsCard({
  item,
  compact = false,
}: {
  item: NewsItem;
  compact?: boolean;
}) {
  return (
    <article
      className={`rounded-2xl border border-sky-blue/20 bg-white ${
        compact ? "p-4" : "p-5"
      }`}
    >
      <p className="text-xs font-bold uppercase tracking-widest text-coral mb-2">
        {item.category}
      </p>
      <h3
        className={`font-extrabold text-lake-blue mb-2 ${
          compact ? "text-base" : "text-xl"
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
        <>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            {item.originalSummary}
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            <span className="font-semibold text-lake-blue">
              Why this matters to Chicago boaters:{" "}
            </span>
            {item.whyItMatters}
          </p>
        </>
      ) : null}
      <p className="text-xs text-gray-500 mb-3">
        {item.sourceName}
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
        Read the original story →
      </a>
      {!compact && item.relatedBoatingChicagoPages.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.relatedBoatingChicagoPages.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-light-blue text-lake-blue hover:bg-sky-blue/20"
            >
              {l.label}
            </Link>
          ))}
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
        No matching allowlisted news items are available right now. Check back
        after the next refresh, or see{" "}
        <Link href="/weather" className="font-semibold text-lake-blue underline">
          boating weather
        </Link>{" "}
        for live alerts.
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
