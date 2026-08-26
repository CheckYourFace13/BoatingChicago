import { HomepageTrackLink } from "@/components/HomepageTrackLink";
import type { NewsItem } from "@/types/news";

function formatDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Chicago",
  });
}

export function HomepageNewsFeature({ news }: { news: NewsItem[] }) {
  const items = news.slice(0, 6);

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
            Latest Boating News
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Source-cited updates for Chicago and southern Lake Michigan boaters —
            original summaries, never full-article copies.
          </p>
        </div>
        <HomepageTrackLink
          href="/news"
          event="homepage_news_click"
          params={{ placement: "news_feature" }}
          className="font-bold text-coral hover:underline shrink-0"
        >
          All Chicago &amp; Lake Michigan Boating News →
        </HomepageTrackLink>
      </div>

      {items.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-sky-blue/20 bg-white p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide text-sky-blue mb-2">
                <span>{item.sourceName}</span>
                {item.sourcePublishedAt ? (
                  <>
                    <span className="text-sky-blue/40">·</span>
                    <span>{formatDate(item.sourcePublishedAt)}</span>
                  </>
                ) : null}
              </div>
              <h3 className="font-extrabold text-lake-blue text-lg mb-2 leading-snug">
                <HomepageTrackLink
                  href={
                    item.qualifiesForArticlePage
                      ? `/news/${item.slug}`
                      : item.sourceUrl
                  }
                  event="homepage_news_click"
                  params={{ story: item.slug, placement: "news_card" }}
                  className="hover:underline"
                >
                  {item.headline}
                </HomepageTrackLink>
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-2 line-clamp-3">
                {item.originalSummary}
              </p>
              {item.whyItMatters ? (
                <p className="text-sm text-gray-600 leading-relaxed">
                  <span className="font-bold text-lake-blue">Why it matters: </span>
                  {item.whyItMatters}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">
          News will appear here as allowlisted feeds publish relevant items.
        </p>
      )}
    </section>
  );
}
