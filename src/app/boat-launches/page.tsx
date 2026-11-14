import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import {
  QualityDisclaimer,
  SourceLink,
} from "@/components/geo/SourceAttribution";
import {
  getLakeBySlug,
  getLaunchesByDestination,
  getPublishedDestinations,
  getPublishedLaunches,
} from "@/data/geo";
import { REGION_ORDER, regionLabel } from "@/lib/geo-display";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { ResourceCrossLinks } from "@/components/ResourceCrossLinks";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Public Boat Launches Near Chicago | Verified Ramp Listings",
    description:
      "Public boat launch ramps around Chicago — Chicago Park District lakefront and river sites, the Chain O' Lakes, Geneva Lake, and more — listed from official park district, state, and municipal sources.",
    path: "/boat-launches",
  });
}

type WaterFilter = "all" | "lake-michigan" | "inland" | "river";

const FILTERS: { id: WaterFilter; label: string }[] = [
  { id: "all", label: "All waters" },
  { id: "lake-michigan", label: "Lake Michigan" },
  { id: "inland", label: "Inland lakes" },
  { id: "river", label: "Chicago River" },
];

function matchesFilter(
  launch: { lakeSlug?: string; destinationSlug: string },
  filter: WaterFilter,
): boolean {
  if (filter === "all") return true;
  if (filter === "lake-michigan") {
    return launch.lakeSlug === "lake-michigan-chicago";
  }
  if (filter === "inland") {
    return (
      launch.lakeSlug === "chain-o-lakes" ||
      launch.lakeSlug === "geneva-lake" ||
      launch.lakeSlug === "fox-river"
    );
  }
  // River / non-lakefront Chicago Park District sites: Chicago destination, no lakeSlug
  return launch.destinationSlug === "chicago" && !launch.lakeSlug;
}

function filterHref(id: WaterFilter): string {
  return id === "all" ? "/boat-launches" : `/boat-launches?water=${id}`;
}

export default async function BoatLaunchesPage({
  searchParams,
}: {
  searchParams: Promise<{ water?: string }>;
}) {
  const params = await searchParams;
  const raw = params.water ?? "all";
  const filter: WaterFilter = FILTERS.some((f) => f.id === raw)
    ? (raw as WaterFilter)
    : "all";

  const destinations = getPublishedDestinations()
    .slice()
    .sort(
      (a, b) =>
        REGION_ORDER.indexOf(a.region) - REGION_ORDER.indexOf(b.region) ||
        (a.distanceFromChicagoMiles ?? Number.MAX_SAFE_INTEGER) -
          (b.distanceFromChicagoMiles ?? Number.MAX_SAFE_INTEGER),
    );

  const groups = destinations
    .map((destination) => ({
      destination,
      launches: getLaunchesByDestination(destination.slug).filter((launch) =>
        matchesFilter(launch, filter),
      ),
    }))
    .filter((group) => group.launches.length > 0);

  const totalPublished = getPublishedLaunches().length;
  const total = groups.reduce((sum, group) => sum + group.launches.length, 0);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Boat launches", path: "/boat-launches" },
        ]}
      />

      <GeoHero
        eyebrow={`${totalPublished} verified public launches`}
        title="Public Boat Launches Near Chicago"
        intro="Trailer-in and carry-in access from the Chicago lakefront and river to Wisconsin and the Fox River chain. Launch fees, permits, and stickers are set by the operating agency — we link you to the page that publishes them."
        links={[
          { label: "Destinations →", href: "/destinations" },
          { label: "Forest preserves", href: "/forest-preserves" },
          { label: "Lakes & waterways", href: "/lakes" },
          { label: "Boating weather", href: "/weather" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <QualityDisclaimer />

        <section className="max-w-3xl space-y-4 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-extrabold text-lake-blue">
            Finding a ramp near Chicago
          </h2>
          <p>
            Public launches below are verified against municipal, park-district,
            county, or state sources. We publish a launch page only when that
            official listing exists — incomplete tips stay out of the index.
          </p>
          <p>
            Chicago Park District publishes a full{" "}
            <a
              href="https://www.chicagoparkdistrict.com/facilities/boat-launches"
              className="font-semibold text-coral hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              boat-launches directory
            </a>{" "}
            covering Lake Michigan and Chicago River sites. Suburban forest-preserve
            waters (often electric-only) live on the{" "}
            <Link
              href="/forest-preserves"
              className="font-semibold text-coral hover:underline"
            >
              forest-preserves hub
            </Link>
            .
          </p>
          <p>
            Before you tow: confirm fees and stickers on the linked source,
            check{" "}
            <Link href="/weather" className="font-semibold text-coral hover:underline">
              marine weather
            </Link>
            , and read the matching{" "}
            <Link href="/destinations" className="font-semibold text-coral hover:underline">
              destination
            </Link>{" "}
            page for harbor context. Lake Michigan ramps, river landings, and
            inland-chain ramps follow different agencies and rules.
          </p>
        </section>

        <nav
          aria-label="Filter launches by waterbody"
          className="flex flex-wrap gap-2"
        >
          {FILTERS.map((item) => {
            const active = item.id === filter;
            return (
              <Link
                key={item.id}
                href={filterHref(item.id)}
                className={
                  active
                    ? "text-sm font-bold px-3 py-1.5 rounded-full bg-lake-blue text-white"
                    : "text-sm font-semibold px-3 py-1.5 rounded-full bg-light-blue text-lake-blue hover:bg-sky-blue/20 transition-colors"
                }
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <p className="text-sm text-gray-600">
          Showing {total} of {totalPublished} verified launches
          {filter !== "all" ? ` · ${FILTERS.find((f) => f.id === filter)?.label}` : ""}.
        </p>

        {groups.map(({ destination, launches }) => (
          <section key={destination.slug} id={destination.slug}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue">
                <Link
                  href={`/destinations/${destination.slug}`}
                  className="hover:underline"
                >
                  {destination.name}, {destination.state}
                </Link>
              </h2>
              <p className="text-sm text-gray-500">
                {regionLabel(destination.region)} · {destination.bodyOfWater}
              </p>
            </div>

            <ul className="space-y-4">
              {launches.map((launch) => {
                const lake = launch.lakeSlug
                  ? getLakeBySlug(launch.lakeSlug)
                  : undefined;
                return (
                  <li
                    key={launch.slug}
                    className="rounded-2xl border border-sky-blue/20 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-extrabold text-lake-blue mb-1">
                      <Link
                        href={`/boat-launches/${launch.slug}`}
                        className="hover:underline"
                      >
                        {launch.name}
                      </Link>
                    </h3>
                    {lake?.isPublished ? (
                      <p className="text-xs font-bold uppercase tracking-widest text-coral mb-2">
                        <Link
                          href={`/lakes/${lake.slug}`}
                          className="hover:underline"
                        >
                          {lake.name}
                        </Link>
                      </p>
                    ) : launch.destinationSlug === "chicago" &&
                      !launch.lakeSlug ? (
                      <p className="text-xs font-bold uppercase tracking-widest text-coral mb-2">
                        Chicago River / inland park access
                      </p>
                    ) : null}
                    <p className="text-gray-700 leading-relaxed mb-2">
                      {launch.summary}
                    </p>
                    <p className="text-sm">
                      <SourceLink source={launch.source} />
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        {groups.length === 0 ? (
          <p className="text-gray-700">
            No launches match this filter.{" "}
            <Link
              href="/boat-launches"
              className="font-semibold text-coral hover:underline"
            >
              Show all launches
            </Link>{" "}
            or check the{" "}
            <Link
              href="/destinations"
              className="font-semibold text-coral hover:underline"
            >
              destination guides
            </Link>{" "}
            for official access links.
          </p>
        ) : null}

        <ResourceCrossLinks
          links={[
            { href: "/weather", label: "Weather" },
            { href: "/forest-preserves", label: "Forest preserves" },
            { href: "/marinas", label: "Marinas" },
            { href: "/destinations", label: "Destinations" },
            { href: "/lakes", label: "Lakes" },
            { href: "/guides", label: "Guides" },
          ]}
        />
      </div>
    </>
  );
}
