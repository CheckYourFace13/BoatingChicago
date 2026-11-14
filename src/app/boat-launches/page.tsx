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
import type { BoatLaunch } from "@/types/geo";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Public Boat Launches Near Chicago | Verified Ramp Finder",
    description:
      "Filter verified public boat launches near Chicago by waterbody and access type — Chicago Park District, inland lakes, rivers, and municipal ramps linked to official sources.",
    path: "/boat-launches",
  });
}

type WaterFilter = "all" | "lake-michigan" | "inland" | "river";
type AccessFilter = "all" | "trailered" | "carry-in" | "non-motorized" | "steps";

const RIVER_LAKE_SLUGS = new Set([
  "fox-river",
  "des-plaines-river",
  "dupage-river",
]);

const INLAND_LAKE_SLUGS = new Set(["chain-o-lakes", "geneva-lake"]);

const WATER_FILTERS: { id: WaterFilter; label: string }[] = [
  { id: "all", label: "All waters" },
  { id: "lake-michigan", label: "Lake Michigan" },
  { id: "inland", label: "Inland lakes" },
  { id: "river", label: "Rivers" },
];

const ACCESS_FILTERS: { id: AccessFilter; label: string }[] = [
  { id: "all", label: "Any access" },
  { id: "trailered", label: "Trailored" },
  { id: "carry-in", label: "Carry-in" },
  { id: "non-motorized", label: "Non-motorized only" },
  { id: "steps", label: "Steps / harbor steps" },
];

function matchesWater(launch: BoatLaunch, filter: WaterFilter): boolean {
  if (filter === "all") return true;
  if (filter === "lake-michigan") {
    return launch.lakeSlug === "lake-michigan-chicago";
  }
  if (filter === "inland") {
    return !!launch.lakeSlug && INLAND_LAKE_SLUGS.has(launch.lakeSlug);
  }
  if (filter === "river") {
    if (launch.lakeSlug && RIVER_LAKE_SLUGS.has(launch.lakeSlug)) return true;
    // Chicago River CPD sites are destination=chicago without a lakeSlug
    return launch.destinationSlug === "chicago" && !launch.lakeSlug;
  }
  return true;
}

function matchesAccess(launch: BoatLaunch, filter: AccessFilter): boolean {
  if (filter === "all") return true;
  if (filter === "non-motorized") {
    return launch.nonMotorizedOnly === true || launch.accessMode === "non-motorized";
  }
  if (filter === "trailered") return launch.accessMode === "trailered";
  if (filter === "carry-in") return launch.accessMode === "carry-in";
  if (filter === "steps") return launch.accessMode === "steps";
  return true;
}

function filterHref(water: WaterFilter, access: AccessFilter): string {
  const params = new URLSearchParams();
  if (water !== "all") params.set("water", water);
  if (access !== "all") params.set("access", access);
  const q = params.toString();
  return q ? `/boat-launches?${q}` : "/boat-launches";
}

function accessBadge(launch: BoatLaunch): string | null {
  if (launch.nonMotorizedOnly || launch.accessMode === "non-motorized") {
    return "Non-motorized only";
  }
  if (launch.accessMode === "trailered") return "Trailored";
  if (launch.accessMode === "carry-in") return "Carry-in";
  if (launch.accessMode === "steps") return "Steps access";
  return null;
}

export default async function BoatLaunchesPage({
  searchParams,
}: {
  searchParams: Promise<{ water?: string; access?: string }>;
}) {
  const params = await searchParams;
  const rawWater = params.water ?? "all";
  const rawAccess = params.access ?? "all";
  const water: WaterFilter = WATER_FILTERS.some((f) => f.id === rawWater)
    ? (rawWater as WaterFilter)
    : "all";
  const access: AccessFilter = ACCESS_FILTERS.some((f) => f.id === rawAccess)
    ? (rawAccess as AccessFilter)
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
      launches: getLaunchesByDestination(destination.slug).filter(
        (launch) =>
          matchesWater(launch, water) && matchesAccess(launch, access),
      ),
    }))
    .filter((group) => group.launches.length > 0);

  const totalPublished = getPublishedLaunches().length;
  const total = groups.reduce((sum, group) => sum + group.launches.length, 0);
  const taggedAccess = getPublishedLaunches().filter((l) => l.accessMode).length;

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
        title="Public Boat Launch Finder Near Chicago"
        intro="Filter verified ramps by waterbody and access type. Launch fees, permits, stickers, and seasonal open status are set by the operating agency — each listing links to the official page."
        links={[
          { label: "Forest preserves →", href: "/forest-preserves" },
          { label: "Inland paddling guide", href: "/chicago-area-inland-paddling-guide" },
          { label: "Lakes & waterways", href: "/lakes" },
          { label: "Boating weather", href: "/weather" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <QualityDisclaimer />

        <section className="max-w-3xl space-y-4 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-extrabold text-lake-blue">
            How this finder works
          </h2>
          <p>
            Every launch below is backed by a municipal, park-district, county,
            or state source. Cards show seasonal notes when the agency publishes
            them. Access-type filters only match launches where the official
            page clearly classifies the site ({taggedAccess} of {totalPublished}{" "}
            currently tagged) — use “Any access” to see the full verified set.
          </p>
          <p>
            Suburban forest-preserve lakes and Des Plaines / DuPage River
            landings (often electric-only or non-motorized, sometimes
            paddleboard-prohibited) live on the{" "}
            <Link
              href="/forest-preserves"
              className="font-semibold text-coral hover:underline"
            >
              forest-preserves hub
            </Link>
            . River waterway overviews:{" "}
            <Link
              href="/lakes/des-plaines-river"
              className="font-semibold text-coral hover:underline"
            >
              Des Plaines River
            </Link>
            ,{" "}
            <Link
              href="/lakes/dupage-river"
              className="font-semibold text-coral hover:underline"
            >
              DuPage River
            </Link>
            , and{" "}
            <Link
              href="/lakes/fox-river"
              className="font-semibold text-coral hover:underline"
            >
              Fox River
            </Link>
            . Chicago Park District’s full directory:{" "}
            <a
              href="https://www.chicagoparkdistrict.com/facilities/boat-launches"
              className="font-semibold text-coral hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              CPD boat launches
            </a>
            .
          </p>
        </section>

        <div className="space-y-4">
          <nav aria-label="Filter launches by waterbody" className="flex flex-wrap gap-2">
            {WATER_FILTERS.map((item) => {
              const active = item.id === water;
              return (
                <Link
                  key={item.id}
                  href={filterHref(item.id, access)}
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
          <nav aria-label="Filter launches by access type" className="flex flex-wrap gap-2">
            {ACCESS_FILTERS.map((item) => {
              const active = item.id === access;
              return (
                <Link
                  key={item.id}
                  href={filterHref(water, item.id)}
                  className={
                    active
                      ? "text-sm font-bold px-3 py-1.5 rounded-full bg-coral text-white"
                      : "text-sm font-semibold px-3 py-1.5 rounded-full bg-white text-lake-blue border border-sky-blue/25 hover:bg-light-blue/60 transition-colors"
                  }
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <p className="text-sm text-gray-600">
          Showing {total} of {totalPublished} verified launches
          {water !== "all"
            ? ` · ${WATER_FILTERS.find((f) => f.id === water)?.label}`
            : ""}
          {access !== "all"
            ? ` · ${ACCESS_FILTERS.find((f) => f.id === access)?.label}`
            : ""}
          .
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
                const badge = accessBadge(launch);
                return (
                  <li
                    key={launch.slug}
                    className="rounded-2xl border border-sky-blue/20 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <h3 className="text-lg font-extrabold text-lake-blue">
                        <Link
                          href={`/boat-launches/${launch.slug}`}
                          className="hover:underline"
                        >
                          {launch.name}
                        </Link>
                      </h3>
                      {badge ? (
                        <span className="text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-light-blue text-lake-blue">
                          {badge}
                        </span>
                      ) : null}
                    </div>
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
                    {launch.seasonalAccessNote ? (
                      <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                        <span className="font-semibold text-lake-blue">
                          Seasonal note:{" "}
                        </span>
                        {launch.seasonalAccessNote}
                      </p>
                    ) : null}
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
            No launches match these filters.{" "}
            <Link
              href="/boat-launches"
              className="font-semibold text-coral hover:underline"
            >
              Reset filters
            </Link>{" "}
            or browse{" "}
            <Link
              href="/forest-preserves"
              className="font-semibold text-coral hover:underline"
            >
              forest-preserve waters
            </Link>
            .
          </p>
        ) : null}

        <ResourceCrossLinks
          links={[
            { href: "/forest-preserves", label: "Forest preserves" },
            { href: "/chicago-area-inland-paddling-guide", label: "Inland paddling guide" },
            { href: "/lakes", label: "Lakes" },
            { href: "/destinations", label: "Destinations" },
            { href: "/weather", label: "Weather" },
            { href: "/tools/trip-checklist", label: "Trip checklist" },
          ]}
        />
      </div>
    </>
  );
}
