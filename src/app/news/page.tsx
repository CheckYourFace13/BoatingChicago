import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ChicagoBoatingBrief } from "@/components/BoatingBrief";
import { NewsList } from "@/components/news/NewsCard";
import { getChicagoNews, getSeasonalTip } from "@/lib/news";
import { buildMetadata } from "@/lib/seo";
import { getChicagoWeather } from "@/lib/weather";
import type { NewsCategory } from "@/types/news";

export const revalidate = 10800;

export const metadata = buildMetadata({
  title: "Chicago Boating News",
  description:
    "Source-cited Chicago boating news for Lake Michigan boaters — safety alerts, harbor updates, events, and fishing notes with links to original reporting.",
  path: "/news",
});

const CATEGORIES: NewsCategory[] = [
  "Chicago Boating",
  "Lake Michigan",
  "Safety",
  "Events",
  "Fishing",
  "Harbors & Marinas",
];

export default async function NewsPage() {
  const weather = await getChicagoWeather();
  const feed = await getChicagoNews({ alerts: weather.alerts });
  const tip = getSeasonalTip();
  const featured = feed.items.filter((i) => i.isFeatured).slice(0, 4);
  const rest = feed.items.filter((i) => !featured.some((f) => f.id === i.id));

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "News", path: "/news" },
        ]}
      />

      <section className="relative bg-gradient-to-br from-lake-blue via-lake-blue to-sky-blue text-white">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <p className="text-sun-yellow font-bold text-sm tracking-widest uppercase mb-3">
            Source-cited updates
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Chicago Boating News
          </h1>
          <p className="text-white/90 text-lg max-w-3xl leading-relaxed">
            Headlines from allowlisted official and reputable sources, with
            original BoatingChicago context and a link to read the original
            story. We do not republish full articles.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
            <Link href="/weather" className="text-sun-yellow hover:underline">
              Boating weather →
            </Link>
            <Link
              href="/navy-pier-fireworks-boat-rentals"
              className="text-white/90 hover:underline"
            >
              Fireworks boats
            </Link>
            <Link
              href="/air-and-water-show-boat-rentals"
              className="text-white/90 hover:underline"
            >
              Air &amp; Water Show
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        <ChicagoBoatingBrief weather={weather} news={feed.items} tip={tip} />

        <section>
          <h2 className="text-2xl font-extrabold text-lake-blue mb-4">
            Browse by topic
          </h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <a
                key={c}
                href={`#${c.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="text-sm font-semibold px-3 py-1.5 rounded-full bg-light-blue text-lake-blue hover:bg-sky-blue/20"
              >
                {c}
              </a>
            ))}
          </div>
        </section>

        {featured.length ? (
          <section>
            <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-4">
              Safety &amp; featured
            </h2>
            <NewsList items={featured} />
          </section>
        ) : null}

        <section>
          <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-4">
            Latest
          </h2>
          <NewsList items={rest.slice(0, 20)} />
        </section>

        {CATEGORIES.map((category) => {
          const items = feed.items
            .filter((i) => i.category === category)
            .slice(0, 6);
          if (!items.length) return null;
          const id = category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return (
            <section key={category} id={id}>
              <h2 className="text-2xl font-extrabold text-lake-blue mb-4">
                {category}
              </h2>
              <NewsList items={items} />
            </section>
          );
        })}

        <section className="rounded-2xl border border-sky-blue/20 bg-light-blue/50 p-5 text-sm text-gray-700">
          <h2 className="font-extrabold text-lake-blue mb-2">About this feed</h2>
          <p className="mb-2">
            Sources attempted: {feed.sourcesAttempted.join(", ") || "none"}.
            Updated approximately every few hours from allowlisted RSS/official
            feeds. Low-value items stay on this page as cards; only stronger
            stories get a standalone URL.
          </p>
          {feed.errors.length ? (
            <p className="text-amber-800">
              Some feeds were unavailable: {feed.errors.join(" · ")}
            </p>
          ) : null}
        </section>
      </div>
    </>
  );
}
