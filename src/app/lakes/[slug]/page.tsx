import Link from "next/link";
import { notFound } from "next/navigation";
import type { Destination } from "@/types/geo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import {
  QualityDisclaimer,
  SourceLink,
  SourceLinkList,
} from "@/components/geo/SourceAttribution";
import {
  getAllPublishedLakeSlugs,
  getDestinationBySlug,
  getLakeBySlug,
  getPreserveAccessBySlug,
} from "@/data/geo";
import { getLaunchesByLake, regionLabel } from "@/lib/geo-display";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import type { PreserveWaterAccess } from "@/types/geo";
import { getUsgsReadings } from "@/lib/usgs";
import { UsgsRiverPanel } from "@/components/geo/UsgsRiverPanel";

const RIVER_LAKE_SLUGS = new Set([
  "fox-river",
  "des-plaines-river",
  "dupage-river",
]);

function waterFilterForLake(slug: string): string {
  if (slug === "lake-michigan-chicago") return "lake-michigan";
  if (slug === "chain-o-lakes" || slug === "geneva-lake") return "inland";
  if (RIVER_LAKE_SLUGS.has(slug)) return "river";
  return "all";
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;
export const revalidate = 1800;

export function generateStaticParams() {
  return getAllPublishedLakeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const lake = getLakeBySlug(slug);
  if (!lake || !lake.isPublished) return {};

  return buildManagedMetadata({
    title: `${lake.name} Boating — Launches, Rules & Official Sources`,
    description: lake.overview[0]?.slice(0, 155) ?? `${lake.name} boating access and destinations.`,
    path: `/lakes/${lake.slug}`,
  });
}

export default async function LakePage({ params }: PageProps) {
  const { slug } = await params;
  const lake = getLakeBySlug(slug);
  if (!lake || !lake.isPublished) notFound();
  const riverReadings = await getUsgsReadings(lake.slug);

  const destinations = lake.destinationSlugs
    .map((s) => getDestinationBySlug(s))
    .filter((d): d is Destination => d !== undefined && d.isPublished);

  const launches = getLaunchesByLake(lake.slug);
  const relatedPreserves = (lake.relatedPreserveSlugs ?? [])
    .map((s) => getPreserveAccessBySlug(s))
    .filter(
      (p): p is PreserveWaterAccess =>
        p !== undefined && p.isPublished,
    );

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Lakes", path: "/lakes" },
          { name: lake.name, path: `/lakes/${lake.slug}` },
        ]}
      />

      <GeoHero
        eyebrow={`${regionLabel(lake.region)} · ${lake.state}`}
        title={lake.name}
        intro={lake.overview[0] ?? ""}
        links={[
          { label: "All lakes & waterways →", href: "/lakes" },
          ...(waterFilterForLake(lake.slug) !== "all"
            ? [
                {
                  label: "Launches on this water",
                  href: `/boat-launches?water=${waterFilterForLake(lake.slug)}`,
                },
              ]
            : []),
          { label: "Kayak & SUP finder", href: "/kayak-canoe-sup" },
          { label: "Forest preserves", href: "/forest-preserves" },
          { label: "Inland paddling guide", href: "/chicago-area-inland-paddling-guide" },
          { label: "Boating weather", href: "/weather" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        <article className="space-y-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue">
            About this waterway
          </h2>
          {lake.overview.map((paragraph, i) => (
            <p key={i} className="text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </article>

        {destinations.length > 0 ? (
          <section>
            <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-4">
              Destinations on {lake.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {destinations.map((destination) => (
                <Link
                  key={destination.slug}
                  href={`/destinations/${destination.slug}`}
                  className="rounded-2xl border border-sky-blue/20 bg-white p-5 hover:shadow-md transition-shadow"
                >
                  <p className="font-extrabold text-lake-blue mb-1">
                    {destination.name}, {destination.state}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {destination.summary}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {launches.length > 0 ? (
          <section>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
              <h2 className="text-2xl font-extrabold text-lake-blue">
                Public launches on this water
              </h2>
              <Link
                href={`/boat-launches?water=${waterFilterForLake(lake.slug)}`}
                className="text-sm font-bold text-coral hover:underline"
              >
                Filtered launch finder →
              </Link>
            </div>
            <ul className="space-y-4">
              {launches.map((launch) => (
                <li
                  key={launch.slug}
                  className="rounded-2xl border border-sky-blue/20 bg-white p-5"
                >
                  <h3 className="text-lg font-extrabold text-lake-blue mb-1">
                    <Link
                      href={`/boat-launches/${launch.slug}`}
                      className="hover:underline"
                    >
                      {launch.name}
                    </Link>
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    {launch.summary}
                  </p>
                  <p className="text-sm">
                    <SourceLink source={launch.source} />
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {relatedPreserves.length > 0 ? (
          <section>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
              <h2 className="text-2xl font-extrabold text-lake-blue">
                Forest-preserve access on this water
              </h2>
              <Link
                href="/forest-preserves"
                className="text-sm font-bold text-coral hover:underline"
              >
                All preserves →
              </Link>
            </div>
            <ul className="space-y-4">
              {relatedPreserves.map((site) => {
                const anchor =
                  site.redirectTo?.startsWith(`/lakes/${lake.slug}#`)
                    ? site.redirectTo.split("#")[1]
                    : undefined;
                const href =
                  site.standalonePage === false && site.redirectTo
                    ? site.redirectTo
                    : `/forest-preserves/${site.slug}`;
                return (
                  <li
                    key={site.slug}
                    id={anchor}
                    className="rounded-2xl border border-sky-blue/20 bg-white p-5 scroll-mt-24"
                  >
                    <h3 className="text-lg font-extrabold text-lake-blue mb-1">
                      <Link href={href} className="hover:underline">
                        {site.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {site.county} County · {site.locationLabel}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-2">
                      {site.summary}
                    </p>
                    <p className="text-sm">
                      <SourceLink source={site.source} />
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {riverReadings.length > 0 ? (
          <UsgsRiverPanel
            readings={riverReadings}
            title={`USGS observations · ${lake.name}`}
          />
        ) : null}

        <SourceLinkList
          sources={lake.officialLinks}
          title="Official sources"
          description="Access rules, stickers, permits, and season dates are published by the agencies and municipalities below."
        />

        <QualityDisclaimer />

        <p>
          <Link href="/lakes" className="font-bold text-coral hover:underline">
            ← All lakes &amp; waterways
          </Link>
        </p>
      </div>
    </>
  );
}
