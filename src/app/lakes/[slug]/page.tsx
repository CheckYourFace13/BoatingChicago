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
} from "@/data/geo";
import { getLaunchesByLake, regionLabel } from "@/lib/geo-display";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPublishedLakeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const lake = getLakeBySlug(slug);
  if (!lake || !lake.isPublished) return {};

  return buildMetadata({
    title: `${lake.name} Boating — Access, Destinations & Official Sources`,
    description: lake.overview[0]?.slice(0, 155) ?? `${lake.name} boating access and destinations.`,
    path: `/lakes/${lake.slug}`,
  });
}

export default async function LakePage({ params }: PageProps) {
  const { slug } = await params;
  const lake = getLakeBySlug(slug);
  if (!lake || !lake.isPublished) notFound();

  const destinations = lake.destinationSlugs
    .map((s) => getDestinationBySlug(s))
    .filter((d): d is Destination => d !== undefined && d.isPublished);

  const launches = getLaunchesByLake(lake.slug);

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
          { label: "Destinations", href: "/destinations" },
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
            <h2 className="text-2xl font-extrabold text-lake-blue mb-4">
              Public launches on this water
            </h2>
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
