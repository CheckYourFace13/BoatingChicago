import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ChicagoBoatingBrief } from "@/components/BoatingBrief";
import { PageShell } from "@/components/layout/PageShell";
import { SideRail } from "@/components/layout/SideRail";
import { NewsCard, NewsList } from "@/components/news/NewsCard";
import { OnTheWaterNow } from "@/components/news/OnTheWaterNow";
import {
  DEFAULT_LEFT_RAIL_MODULES,
  DEFAULT_RIGHT_RAIL_MODULES,
} from "@/config/rails";
import {
  getChicagoNews,
  getOfficialItems,
  getSeasonalTip,
  getStoryItems,
} from "@/lib/news";
import { buildMetadata } from "@/lib/seo";
import { getChicagoWeather } from "@/lib/weather";
import type { NewsCategory } from "@/types/news";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Chicago & Lake Michigan Boating News",
  description:
    "Chicago and southern Lake Michigan boating news — marine alerts, harbor updates, fishing notes, and Great Lakes coverage with links to original sources.",
  path: "/news",
});

const CATEGORIES: NewsCategory[] = [
  "Chicago Boating",
  "Lake Michigan",
  "Safety",
  "Fishing",
  "Harbors & Marinas",
  "Events",
  "Wisconsin",
  "Indiana",
  "Great Lakes",
];

export default async function NewsPage() {
  const weather = await getChicagoWeather();
  const feed = await getChicagoNews({ alerts: weather.alerts, weather });
  const tip = getSeasonalTip();

  const stories = getStoryItems(feed.items);
  const official = getOfficialItems(feed.items);

  const featured =
    stories.find((i) => i.isFeatured) ||
    stories[0] ||
    official.find((i) => i.isFeatured) ||
    official[0] ||
    null;

  const latest = stories
    .filter((i) => !featured || i.id !== featured.id)
    .slice(0, 12);

  const safetyOfficial = official.filter((i) => i.category === "Safety");
  const otherOfficial = official.filter((i) => i.category !== "Safety");

  const categoriesWithItems = CATEGORIES.filter((c) =>
    stories.some((i) => i.category === c)
  );

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "News", path: "/news" },
        ]}
      />

      <section className="relative bg-gradient-to-br from-lake-blue via-lake-blue to-sky-blue text-white">
        <div className="relative mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8 py-14 md:py-16">
          <p className="text-sun-yellow font-bold text-sm tracking-widest uppercase mb-3">
            Chicago · Southern Lake Michigan
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 max-w-4xl">
            Chicago &amp; Lake Michigan Boating News
          </h1>
          <p className="text-white/90 text-lg max-w-3xl leading-relaxed">
            Source-cited updates for boaters — marine weather, harbors, fishing,
            and Great Lakes coverage. We summarize headlines with original
            BoatingChicago context and always link to the original story.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
            <Link href="/weather" className="text-sun-yellow hover:underline">
              Boating weather →
            </Link>
            <Link href="/events" className="text-white/90 hover:underline">
              Events
            </Link>
            <Link href="/guides" className="text-white/90 hover:underline">
              Guides
            </Link>
            <Link href="/destinations" className="text-white/90 hover:underline">
              Destinations
            </Link>
          </div>
        </div>
      </section>

      <PageShell
        className="py-12 md:py-14"
        leftRail={
          <SideRail modules={DEFAULT_LEFT_RAIL_MODULES} weather={weather} />
        }
        rightRail={
          <SideRail
            modules={DEFAULT_RIGHT_RAIL_MODULES}
            weather={weather}
            stickyFirst={false}
          />
        }
      >
        <div className="space-y-12">
          <OnTheWaterNow weather={weather} />

          <ChicagoBoatingBrief weather={weather} news={feed.items} tip={tip} />

          {categoriesWithItems.length ? (
            <section>
              <h2 className="text-lg font-extrabold text-lake-blue mb-3">
                Topics
              </h2>
              <div className="flex flex-wrap gap-2">
                {categoriesWithItems.map((c) => (
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
          ) : null}

          {featured ? (
            <section>
              <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-4">
                Featured
              </h2>
              <NewsCard item={featured} featured />
            </section>
          ) : null}

          <section>
            <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-4">
              Latest boating news
            </h2>
            {latest.length ? (
              <NewsList items={latest} />
            ) : (
              <p className="text-gray-600">
                Fresh third-party headlines will appear here as sources publish.
                Official on-water updates are listed below.
              </p>
            )}
          </section>

          {safetyOfficial.length ? (
            <section>
              <h2 className="text-2xl font-extrabold text-lake-blue mb-2">
                Marine &amp; safety updates
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Official conditions and alerts — separate from news reporting.
              </p>
              <NewsList items={safetyOfficial} />
            </section>
          ) : null}

          {otherOfficial.length ? (
            <section>
              <h2 className="text-2xl font-extrabold text-lake-blue mb-2">
                Harbor, lake &amp; event updates
              </h2>
              <NewsList items={otherOfficial} />
            </section>
          ) : null}

          {CATEGORIES.map((category) => {
            const items = stories
              .filter((i) => i.category === category)
              .filter((i) => !featured || i.id !== featured.id)
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

          <section className="rounded-2xl border border-sky-blue/20 bg-light-blue/40 p-5 text-sm text-gray-700">
            <h2 className="font-extrabold text-lake-blue mb-2">
              About BoatingChicago News
            </h2>
            <p>
              We aggregate allowlisted official and reputable RSS/Atom feeds,
              write original short context for local boaters, and link out to
              the source. We do not republish full articles. Coverage refreshes
              about hourly. Thin external headlines stay as cards on this page —
              only stronger stories earn a standalone URL.
            </p>
          </section>
        </div>
      </PageShell>
    </>
  );
}
