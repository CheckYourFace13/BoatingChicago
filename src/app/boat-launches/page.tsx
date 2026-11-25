import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import {
  QualityDisclaimer,
  SourceLink,
} from "@/components/geo/SourceAttribution";
import {
  getDestinationBySlug,
  getLakeBySlug,
  getLaunchesByDestination,
  getPublishedDestinations,
  getPublishedLaunches,
  getPublishedMarinas,
} from "@/data/geo";
import { LaunchEmptyState } from "@/components/geo/LaunchEmptyState";
import { LazyLaunchMap } from "@/components/geo/LazyLaunchMap";
import { REGION_ORDER, regionLabel } from "@/lib/geo-display";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import {
  ACCESS_FILTERS,
  WATER_FILTERS,
  accessLabel,
  filterHref,
  filterLaunches,
  parseAccessFilter,
  parseWaterFilter,
  waterLabel,
} from "@/lib/launch-filters";
import { buildLaunchAreaPoints, buildMarinaPoints } from "@/lib/map-points";
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

function accessBadge(launch: BoatLaunch): string | null {
  if (launch.nonMotorizedOnly || launch.accessMode === "non-motorized") {
    return "Non-motorized only";
  }
  if (launch.accessMode === "trailered") return "Trailered";
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
  const water = parseWaterFilter(params.water);
  const access = parseAccessFilter(params.access);

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
      launches: filterLaunches(
        getLaunchesByDestination(destination.slug),
        water,
        access,
      ),
    }))
    .filter((group) => group.launches.length > 0);

  const allLaunches = getPublishedLaunches();
  const totalPublished = allLaunches.length;
  const total = groups.reduce((sum, group) => sum + group.launches.length, 0);
  const taggedAccess = allLaunches.filter((l) => l.accessMode).length;

  // Map pins follow the active filters. Launches have no per-ramp coordinates,
  // so they are shown as destination-level "area" pins; marinas use the
  // verified OpenStreetMap coordinates and only appear for Lake Michigan views.
  const launchPoints = buildLaunchAreaPoints(groups);
  const showMarinas = water === "all" || water === "lake-michigan";
  const marinaPoints = showMarinas
    ? buildMarinaPoints(
        getPublishedMarinas(),
        (slug) => {
          const d = getDestinationBySlug(slug);
          return d ? `${d.name}, ${d.state}` : undefined;
        },
      ).points
    : [];
  const mapPoints = [...launchPoints, ...marinaPoints];

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
            ? ` · ${waterLabel(water)}`
            : ""}
          {access !== "all"
            ? ` · ${accessLabel(access)}`
            : ""}
          .
        </p>

        {groups.length === 0 ? (
          <LaunchEmptyState launches={allLaunches} water={water} access={access} />
        ) : (
          <LazyLaunchMap
            title="Launch & marina map"
            points={mapPoints}
            defaultKinds={["launch-area", "marina"]}
            footnote="Launch pins are area markers at each destination’s published coordinates — open a pin to jump to the exact launch listing and official source. Marina pins use verified OpenStreetMap coordinates. Launch pins follow your filters above."
          />
        )}

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
