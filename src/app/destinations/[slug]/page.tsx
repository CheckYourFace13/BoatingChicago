import Link from "next/link";
import { notFound } from "next/navigation";
import type { CategoryPage, GuidePage } from "@/types";
import type { Destination } from "@/types/geo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import {
  QualityDisclaimer,
  SourceLink,
  SourceLinkList,
} from "@/components/geo/SourceAttribution";
import { getCategoryBySlug } from "@/data/categories";
import {
  getAllPublishedDestinationSlugs,
  getDestinationBySlug,
  getLaunchesByDestination,
  getMarinasByDestination,
} from "@/data/geo";
import { getGuideBySlug } from "@/data/guides";
import { getWeatherLocationById } from "@/config/weather-locations";
import { getLakesForDestination, regionLabel } from "@/lib/geo-display";
import { PopularOnTheWater } from "@/components/PopularOnTheWater";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPublishedDestinationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination || !destination.isPublished) return {};

  return buildMetadata({
    title: `Boating in ${destination.name}, ${destination.state} | Marinas, Launches & Conditions`,
    description: destination.summary.slice(0, 155),
    path: `/destinations/${destination.slug}`,
  });
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination || !destination.isPublished) notFound();

  const marinas = getMarinasByDestination(destination.slug);
  const launches = getLaunchesByDestination(destination.slug);
  const lakes = getLakesForDestination(destination.slug);
  const weatherLocation = getWeatherLocationById(destination.weatherLocationId);

  const nearby = (destination.nearbyDestinationSlugs ?? [])
    .map((s) => getDestinationBySlug(s))
    .filter(
      (d): d is Destination =>
        d !== undefined && d.isPublished && d.slug !== destination.slug,
    );

  const relatedGuides = (destination.relatedGuideSlugs ?? [])
    .map((s) => getGuideBySlug(s))
    .filter((g): g is GuidePage => g !== undefined);

  const relatedCategories = (destination.relatedCategorySlugs ?? [])
    .map((s) => getCategoryBySlug(s))
    .filter((c): c is CategoryPage => c !== undefined);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
          { name: destination.name, path: `/destinations/${destination.slug}` },
        ]}
      />

      <GeoHero
        eyebrow={`${destination.bodyOfWater} · ${regionLabel(destination.region)}`}
        title={`Boating in ${destination.name}, ${destination.state}`}
        intro={destination.summary}
        links={[
          {
            label: weatherLocation
              ? `${weatherLocation.label} weather →`
              : "Boating weather →",
            href: `/weather?location=${destination.weatherLocationId}`,
          },
          { label: "All destinations", href: "/destinations" },
          ...(marinas.length ? [{ label: "Marinas", href: "/marinas" }] : []),
          ...(launches.length
            ? [{ label: "Boat launches", href: "/boat-launches" }]
            : []),
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="rounded-xl bg-white border border-sky-blue/20 p-4">
            <p className="font-bold text-lake-blue mb-1">Body of water</p>
            <p className="text-gray-700">{destination.bodyOfWater}</p>
          </div>
          <div className="rounded-xl bg-white border border-sky-blue/20 p-4">
            <p className="font-bold text-lake-blue mb-1">Region</p>
            <p className="text-gray-700">
              {regionLabel(destination.region)} ({destination.state})
            </p>
          </div>
          <div className="rounded-xl bg-white border border-sky-blue/20 p-4">
            <p className="font-bold text-lake-blue mb-1">From Chicago</p>
            <p className="text-gray-700">
              {typeof destination.distanceFromChicagoMiles === "number"
                ? destination.distanceFromChicagoMiles === 0
                  ? "Home port"
                  : `About ${destination.distanceFromChicagoMiles} miles`
                : "Not published"}
            </p>
          </div>
          <div className="rounded-xl bg-white border border-sky-blue/20 p-4">
            <p className="font-bold text-lake-blue mb-1">Marine weather</p>
            <Link
              href={`/weather?location=${destination.weatherLocationId}`}
              className="font-semibold text-coral hover:underline"
            >
              {weatherLocation?.label ?? "Chicago lakefront"} →
            </Link>
          </div>
        </section>

        <article className="space-y-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue">
            Overview
          </h2>
          {destination.overview.map((paragraph, i) => (
            <p key={i} className="text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </article>

        {destination.highlights.length > 0 ? (
          <section>
            <h2 className="text-2xl font-extrabold text-lake-blue mb-4">
              What defines boating here
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {destination.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-2xl bg-light-blue/50 border border-sky-blue/20 p-4 text-gray-700"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {marinas.length > 0 ? (
          <section>
            <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-4">
              Marinas and harbors
            </h2>
            <ul className="space-y-4">
              {marinas.map((marina) => (
                <li
                  key={marina.slug}
                  className="rounded-2xl border border-sky-blue/20 bg-white p-5"
                >
                  <h3 className="text-lg font-extrabold text-lake-blue mb-1">
                    <Link
                      href={`/marinas/${marina.slug}`}
                      className="hover:underline"
                    >
                      {marina.name}
                    </Link>
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    {marina.summary}
                  </p>
                  <p className="text-sm">
                    <SourceLink source={marina.source} />
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {launches.length > 0 ? (
          <section>
            <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-4">
              Public boat launches
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

        {lakes.length > 0 ? (
          <section>
            <h2 className="text-2xl font-extrabold text-lake-blue mb-4">
              Lakes and waterways
            </h2>
            <div className="flex flex-wrap gap-3">
              {lakes.map((lake) => (
                <Link
                  key={lake.slug}
                  href={`/lakes/${lake.slug}`}
                  className="px-4 py-2 bg-light-blue text-lake-blue font-semibold text-sm rounded-full hover:bg-sky-blue/20 transition-colors"
                >
                  {lake.name}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <SourceLinkList
          sources={destination.officialLinks}
          title="Official sources"
          description="Harbor rules, season dates, fees, and amenity lists change. These are the agencies and operators that publish the current details."
        />

        {nearby.length > 0 ? (
          <section>
            <h2 className="text-2xl font-extrabold text-lake-blue mb-4">
              Nearby destinations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {nearby.map((item) => (
                <Link
                  key={item.slug}
                  href={`/destinations/${item.slug}`}
                  className="rounded-2xl border border-sky-blue/20 bg-white p-4 hover:shadow-md transition-shadow"
                >
                  <p className="font-extrabold text-lake-blue mb-1">
                    {item.name}, {item.state}
                  </p>
                  <p className="text-sm text-gray-600">{item.bodyOfWater}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {relatedGuides.length > 0 || relatedCategories.length > 0 ? (
          <section>
            <h2 className="text-2xl font-extrabold text-lake-blue mb-4">
              Related Chicago boating reading
            </h2>
            <div className="flex flex-wrap gap-3">
              {relatedCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className="px-4 py-2 bg-light-blue text-lake-blue font-semibold text-sm rounded-full hover:bg-sky-blue/20 transition-colors"
                >
                  {category.title}
                </Link>
              ))}
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/${guide.slug}`}
                  className="px-4 py-2 bg-light-blue text-lake-blue font-semibold text-sm rounded-full hover:bg-sky-blue/20 transition-colors"
                >
                  {guide.title}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {destination.slug === "chicago" ? (
          <PopularOnTheWater
            title="Popular nearby on the water"
            subtitle="Popular cruises, charters and on-the-water experiences you can book online."
            pageSlug="destinations-chicago"
            limit={4}
            placement="destination_contextual"
            section="recommended_experiences"
          />
        ) : null}

        <QualityDisclaimer />

        <p>
          <Link
            href="/destinations"
            className="font-bold text-coral hover:underline"
          >
            ← All boating destinations
          </Link>
        </p>
      </div>
    </>
  );
}
