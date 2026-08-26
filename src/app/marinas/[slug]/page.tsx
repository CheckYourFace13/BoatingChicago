import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { AmenityTable } from "@/components/geo/AmenityTable";
import { GeoHero } from "@/components/geo/GeoHero";
import { SourceAttribution } from "@/components/geo/SourceAttribution";
import {
  getAllPublishedMarinaSlugs,
  getDestinationBySlug,
  getLaunchesByDestination,
  getMarinaBySlug,
  getMarinasByDestination,
} from "@/data/geo";
import { getWeatherLocationById } from "@/config/weather-locations";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPublishedMarinaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const marina = getMarinaBySlug(slug);
  if (!marina || !marina.isPublished) return {};

  return buildMetadata({
    title: `${marina.name} | Amenities, Contact & Official Source`,
    description: marina.summary.slice(0, 155),
    path: `/marinas/${marina.slug}`,
  });
}

export default async function MarinaPage({ params }: PageProps) {
  const { slug } = await params;
  const marina = getMarinaBySlug(slug);
  if (!marina || !marina.isPublished) notFound();

  const destination = getDestinationBySlug(marina.destinationSlug);
  const publishedDestination =
    destination && destination.isPublished ? destination : undefined;

  const siblings = getMarinasByDestination(marina.destinationSlug).filter(
    (m) => m.slug !== marina.slug,
  );
  const launches = getLaunchesByDestination(marina.destinationSlug);
  const weatherLocation = publishedDestination
    ? getWeatherLocationById(publishedDestination.weatherLocationId)
    : undefined;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Marinas", path: "/marinas" },
          { name: marina.name, path: `/marinas/${marina.slug}` },
        ]}
      />

      <GeoHero
        eyebrow={
          publishedDestination
            ? `${publishedDestination.name}, ${publishedDestination.state} · ${publishedDestination.bodyOfWater}`
            : "Marina"
        }
        title={marina.name}
        intro={marina.summary}
        links={[
          ...(publishedDestination
            ? [
                {
                  label: `Boating in ${publishedDestination.name} →`,
                  href: `/destinations/${publishedDestination.slug}`,
                },
              ]
            : [{ label: "All marinas →", href: "/marinas" }]),
          ...(publishedDestination
            ? [
                {
                  label: `${weatherLocation?.label ?? "Marine"} weather`,
                  href: `/weather?location=${publishedDestination.weatherLocationId}`,
                },
              ]
            : []),
          { label: "Boat launches", href: "/boat-launches" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="rounded-xl bg-white border border-sky-blue/20 p-4">
            <p className="font-bold text-lake-blue mb-1">Official website</p>
            {marina.officialWebsite ? (
              <a
                href={marina.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-coral hover:underline break-words"
              >
                Visit the marina site
              </a>
            ) : (
              <p className="text-gray-600">Not published</p>
            )}
          </div>
          <div className="rounded-xl bg-white border border-sky-blue/20 p-4">
            <p className="font-bold text-lake-blue mb-1">Phone</p>
            {marina.phone ? (
              <a
                href={`tel:${marina.phone.replace(/[^\d+]/g, "")}`}
                className="font-semibold text-coral hover:underline"
              >
                {marina.phone}
              </a>
            ) : (
              <p className="text-gray-600">Not published</p>
            )}
          </div>
          <div className="rounded-xl bg-white border border-sky-blue/20 p-4">
            <p className="font-bold text-lake-blue mb-1">Destination</p>
            {publishedDestination ? (
              <Link
                href={`/destinations/${publishedDestination.slug}`}
                className="font-semibold text-coral hover:underline"
              >
                {publishedDestination.name}, {publishedDestination.state}
              </Link>
            ) : (
              <p className="text-gray-600">Not published</p>
            )}
          </div>
        </section>

        <AmenityTable
          amenities={marina.amenities}
          sourceName={marina.source.name}
        />

        <section className="rounded-2xl bg-lake-blue text-white p-6 md:p-8">
          <h2 className="text-xl font-extrabold mb-2">
            Slip rates, fees, and hours
          </h2>
          <p className="text-white/90 leading-relaxed max-w-3xl">
            We do not reprint pricing, season dates, or operating hours — those
            change and go stale fast. Use the marina&apos;s official page and
            phone number above for anything you are booking or budgeting around.
          </p>
        </section>

        {siblings.length > 0 ? (
          <section>
            <h2 className="text-2xl font-extrabold text-lake-blue mb-4">
              Other marinas at this destination
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {siblings.map((sibling) => (
                <Link
                  key={sibling.slug}
                  href={`/marinas/${sibling.slug}`}
                  className="rounded-2xl border border-sky-blue/20 bg-white p-5 hover:shadow-md transition-shadow"
                >
                  <p className="font-extrabold text-lake-blue mb-1">
                    {sibling.name}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {sibling.summary}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {launches.length > 0 ? (
          <section>
            <h2 className="text-2xl font-extrabold text-lake-blue mb-4">
              Public launches nearby
            </h2>
            <div className="flex flex-wrap gap-3">
              {launches.map((launch) => (
                <Link
                  key={launch.slug}
                  href={`/boat-launches/${launch.slug}`}
                  className="px-4 py-2 bg-light-blue text-lake-blue font-semibold text-sm rounded-full hover:bg-sky-blue/20 transition-colors"
                >
                  {launch.name}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <SourceAttribution source={marina.source} />

        <p>
          <Link href="/marinas" className="font-bold text-coral hover:underline">
            ← All marinas &amp; harbors
          </Link>
        </p>
      </div>
    </>
  );
}
