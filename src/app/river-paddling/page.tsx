import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import { QualityDisclaimer, SourceLink } from "@/components/geo/SourceAttribution";
import { getLakeBySlug, getPublishedLaunches } from "@/data/geo";
import { getLaunchesByLake } from "@/lib/geo-display";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { ResourceCrossLinks } from "@/components/ResourceCrossLinks";

const RIVER_SECTIONS = [
  {
    lakeSlug: "fox-river",
    title: "Fox River (Illinois)",
    summary:
      "Northern Illinois Fox River paddling and fishing access. Use Illinois DNR and county forest-preserve pages for put-ins; USGS gauges show stage, not trip safety.",
    usgs: "https://waterdata.usgs.gov/il/nwis/uv?site_no=05552500",
  },
  {
    lakeSlug: "des-plaines-river",
    title: "Des Plaines River",
    summary:
      "Forest-preserve and municipal landings along the Des Plaines corridor. Confirm carry-in rules and seasonal closures with the operating agency before you go.",
    usgs: "https://waterdata.usgs.gov/monitoring-location/05532500/",
  },
  {
    lakeSlug: "dupage-river",
    title: "DuPage River",
    summary:
      "DuPage County forest-preserve and park district access for non-motorized craft. Distances between landings are only stated when an agency publishes them.",
    usgs: "https://waterdata.usgs.gov/il/nwis/uv?site_no=05540250",
  },
] as const;

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "River Paddling Planner | Fox, Des Plaines & DuPage Access",
    description:
      "Put-in and take-out oriented river paddling planner for Chicago-area rivers with USGS gauge links, access notes, and official sources — no invented currents or trip times.",
    path: "/river-paddling",
  });
}

export default function RiverPaddlingPlannerPage() {
  const allLaunches = getPublishedLaunches();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "River paddling planner", path: "/river-paddling" },
        ]}
      />

      <GeoHero
        eyebrow="Chicago-area rivers · source-backed access"
        title="River paddling planner"
        intro="Choose a river section, review verified launches near that waterway, and open the USGS gauge for current stage. We do not calculate current, passage time, or route suitability from unsupported data."
        links={[
          { label: "Kayak & SUP finder →", href: "/kayak-canoe-sup" },
          { label: "Inland paddling guide", href: "/chicago-area-inland-paddling-guide" },
          { label: "Forest preserves", href: "/forest-preserves" },
          { label: "Boat launches", href: "/boat-launches?water=river" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <QualityDisclaimer />

        <p className="text-sm text-gray-700 max-w-3xl leading-relaxed">
          Gauge readings are observations, not go/no-go advice. High water,
          debris, and local ordinances can close a stretch even when a number
          looks routine. Always check the operating agency the day you paddle.
        </p>

        {RIVER_SECTIONS.map((section) => {
          const lake = getLakeBySlug(section.lakeSlug);
          const launches = lake
            ? getLaunchesByLake(section.lakeSlug)
            : allLaunches.filter((l) => l.lakeSlug === section.lakeSlug);

          return (
            <section
              key={section.lakeSlug}
              className="rounded-2xl border border-sky-blue/20 bg-white p-6 space-y-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl font-extrabold text-lake-blue">
                  {section.title}
                </h2>
                {lake?.isPublished ? (
                  <Link
                    href={`/lakes/${lake.slug}`}
                    className="text-sm font-semibold text-sky-blue hover:underline"
                  >
                    Full waterway page →
                  </Link>
                ) : null}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {section.summary}
              </p>
              <p className="text-sm">
                <a
                  href={section.usgs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sky-blue hover:underline"
                >
                  USGS gauge / monitoring page
                </a>
              </p>

              {launches.length > 0 ? (
                <ul className="grid gap-2 sm:grid-cols-2 text-sm">
                  {launches.map((launch) => (
                    <li key={launch.slug}>
                      <Link
                        href={`/boat-launches/${launch.slug}`}
                        className="font-semibold text-lake-blue hover:underline"
                      >
                        {launch.name}
                      </Link>
                      {launch.accessMode ? (
                        <span className="text-gray-500"> · {launch.accessMode}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-600">
                  No published launches are linked to this waterway yet — see the
                  kayak finder and forest-preserve directory for nearby access.
                </p>
              )}

              {lake?.officialLinks?.[0] ? (
                <SourceLink source={lake.officialLinks[0]} />
              ) : null}
            </section>
          );
        })}

        <ResourceCrossLinks
          links={[
            {
              href: "/aquatic-invasive-species-boater-rules",
              label: "AIS / clean-drain-dry",
            },
            { href: "/fishing-licenses-great-lakes-states", label: "Fishing licenses" },
            { href: "/weather", label: "Weather & conditions" },
            { href: "/tools/trip-checklist", label: "Trip checklist" },
          ]}
        />
      </div>
    </>
  );
}
