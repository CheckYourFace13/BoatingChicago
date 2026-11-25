import Link from "next/link";
import { GeoHero } from "@/components/geo/GeoHero";
import { buildMetadata } from "@/lib/seo";
import { getSearchIndex } from "@/lib/site-search-index";
import {
  SEARCH_TYPE_LABELS,
  SEARCH_TYPE_ORDER,
  groupByType,
  isSearchEntryType,
  searchEntries,
  type SearchEntryType,
} from "@/lib/site-search-core";

export const metadata = buildMetadata({
  title: "Search Launches, Marinas, Preserves, Lakes & Guides",
  description:
    "Search BoatingChicago's verified boat launches, marinas, forest preserves, lakes, destinations, and boating guides.",
  path: "/search",
  // Internal search results pages are thin by design — keep them out of the index.
  noIndex: true,
});

const MAX_QUERY_LENGTH = 100;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function searchHref(q: string, type?: SearchEntryType): string {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (type) params.set("type", type);
  const qs = params.toString();
  return qs ? `/search?${qs}` : "/search";
}

const BROWSE_LINKS: { href: string; label: string; type: SearchEntryType }[] = [
  { href: "/boat-launches", label: "Browse boat launches", type: "launch" },
  { href: "/marinas", label: "Browse marinas & harbors", type: "marina" },
  { href: "/forest-preserves", label: "Browse forest preserves", type: "preserve" },
  { href: "/lakes", label: "Browse lakes & waterways", type: "lake" },
  { href: "/destinations", label: "Browse destinations", type: "destination" },
  { href: "/guides", label: "Browse all guides", type: "guide" },
];

const SUGGESTED_QUERIES = [
  "Belmont",
  "kayak",
  "Fox River",
  "Waukegan",
  "winterization",
  "ramp",
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[]; type?: string | string[] }>;
}) {
  const params = await searchParams;
  const q = (first(params.q) ?? "").trim().slice(0, MAX_QUERY_LENGTH);
  const rawType = first(params.type);
  const type = isSearchEntryType(rawType) ? rawType : undefined;

  const index = getSearchIndex();
  const allResults = q ? searchEntries(index, q) : [];
  const shown = type ? allResults.filter((r) => r.t === type) : allResults;
  const groups = groupByType(shown);
  const countsByType = new Map<SearchEntryType, number>();
  for (const r of allResults) {
    countsByType.set(r.t, (countsByType.get(r.t) ?? 0) + 1);
  }

  return (
    <>
      <GeoHero
        eyebrow={`${index.length} launches, marinas, preserves, lakes, destinations & guides`}
        title={q ? `Search results for “${q}”` : "Search BoatingChicago"}
        intro="Find a verified boat launch, marina, forest-preserve landing, lake, destination, or guide. Every result links to an existing page — nothing here is a paid placement."
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <form action="/search" method="get" role="search" className="flex gap-2">
          <label htmlFor="search-page-q" className="sr-only">
            Search BoatingChicago
          </label>
          <input
            id="search-page-q"
            type="search"
            name="q"
            defaultValue={q}
            maxLength={MAX_QUERY_LENGTH}
            placeholder="Try “Belmont”, “kayak launch”, or “winterization”"
            autoComplete="off"
            className="min-w-0 flex-1 rounded-full border border-sky-blue/40 bg-white px-5 py-3 text-base text-lake-blue placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-blue"
          />
          <button
            type="submit"
            className="rounded-full bg-lake-blue px-6 py-3 text-sm font-bold text-white hover:bg-lake-blue/90"
          >
            Search
          </button>
        </form>

        {q ? (
          <>
            <nav
              aria-label="Filter results by type"
              className="flex flex-wrap gap-2"
            >
              <Link
                href={searchHref(q)}
                aria-current={!type ? "page" : undefined}
                className={
                  !type
                    ? "text-sm font-bold px-3 py-1.5 rounded-full bg-lake-blue text-white"
                    : "text-sm font-semibold px-3 py-1.5 rounded-full bg-light-blue text-lake-blue hover:bg-sky-blue/20"
                }
              >
                All ({allResults.length})
              </Link>
              {SEARCH_TYPE_ORDER.filter((t) => countsByType.has(t)).map((t) => (
                <Link
                  key={t}
                  href={searchHref(q, t)}
                  aria-current={type === t ? "page" : undefined}
                  className={
                    type === t
                      ? "text-sm font-bold px-3 py-1.5 rounded-full bg-coral text-white"
                      : "text-sm font-semibold px-3 py-1.5 rounded-full bg-white text-lake-blue border border-sky-blue/25 hover:bg-light-blue/60"
                  }
                >
                  {SEARCH_TYPE_LABELS[t].plural} ({countsByType.get(t)})
                </Link>
              ))}
            </nav>

            <p className="text-sm text-gray-600" role="status">
              {shown.length} result{shown.length === 1 ? "" : "s"} for “{q}”
              {type ? ` in ${SEARCH_TYPE_LABELS[type].plural.toLowerCase()}` : ""}
              .
            </p>

            {groups.map((group) => (
              <section key={group.type} aria-labelledby={`results-${group.type}`}>
                <h2
                  id={`results-${group.type}`}
                  className="text-xl font-extrabold text-lake-blue mb-3"
                >
                  {SEARCH_TYPE_LABELS[group.type].plural}
                </h2>
                <ul className="space-y-2">
                  {group.entries.map((entry) => (
                    <li key={`${entry.t}:${entry.h}`}>
                      <Link
                        href={entry.h}
                        className="block rounded-xl border border-sky-blue/20 bg-white px-4 py-3 shadow-sm hover:shadow-md hover:border-sky-blue/50 transition"
                      >
                        <span className="font-bold text-lake-blue">
                          {entry.n}
                        </span>
                        {entry.s ? (
                          <span className="block text-sm text-gray-600">
                            {entry.s}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            {shown.length === 0 ? (
              <div className="rounded-2xl border border-sky-blue/25 bg-light-blue/40 p-6 space-y-4">
                <h2 className="text-lg font-extrabold text-lake-blue">
                  No matches for “{q}”
                </h2>
                <p className="text-gray-700">
                  {type
                    ? `Nothing in ${SEARCH_TYPE_LABELS[type].plural.toLowerCase()} matched. `
                    : ""}
                  Check the spelling, try a shorter or more general word (for
                  example a harbor name, a city, or “kayak”), or browse a
                  section directly:
                </p>
                <ul className="flex flex-wrap gap-2">
                  {BROWSE_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-block text-sm font-semibold px-3 py-1.5 rounded-full bg-white text-lake-blue border border-sky-blue/25 hover:bg-light-blue/60"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </>
        ) : (
          <section className="space-y-6">
            <div>
              <h2 className="text-lg font-extrabold text-lake-blue mb-3">
                Popular searches
              </h2>
              <ul className="flex flex-wrap gap-2">
                {SUGGESTED_QUERIES.map((s) => (
                  <li key={s}>
                    <Link
                      href={searchHref(s)}
                      className="inline-block text-sm font-semibold px-3 py-1.5 rounded-full bg-light-blue text-lake-blue hover:bg-sky-blue/20"
                    >
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-lake-blue mb-3">
                Or browse by section
              </h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {BROWSE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block rounded-xl border border-sky-blue/20 bg-white px-4 py-3 font-semibold text-lake-blue hover:shadow-md"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
