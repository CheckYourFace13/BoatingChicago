import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import { SourceAttribution } from "@/components/geo/SourceAttribution";
import {
  getAllPublishedLaunchSlugs,
  getDestinationBySlug,
  getLakeBySlug,
  getLaunchBySlug,
  getLaunchesByDestination,
  getMarinasByDestination,
} from "@/data/geo";
import { getWeatherLocationById } from "@/config/weather-locations";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPublishedLaunchSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const launch = getLaunchBySlug(slug);
  if (!launch || !launch.isPublished) return {};

  return buildMetadata({
    title: `${launch.name} | Public Boat Launch Access`,
    description: launch.summary.slice(0, 155),
    path: `/boat-launches/${launch.slug}`,
  });
}

export default async function BoatLaunchPage({ params }: PageProps) {
  const { slug } = await params;
  const launch = getLaunchBySlug(slug);
  if (!launch || !launch.isPublished) notFound();

  const destination = getDestinationBySlug(launch.destinationSlug);
  const publishedDestination =
    destination && destination.isPublished ? destination : undefined;

  const lake = launch.lakeSlug ? getLakeBySlug(launch.lakeSlug) : undefined;
  const publishedLake = lake && lake.isPublished ? lake : undefined;

  const siblings = getLaunchesByDestination(launch.destinationSlug).filter(
    (l) => l.slug !== launch.slug,
  );
  const marinas = getMarinasByDestination(launch.destinationSlug);
  const weatherLocation = publishedDestination
    ? getWeatherLocationById(publishedDestination.weatherLocationId)
    : undefined;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Boat launches", path: "/boat-launches" },
          { name: launch.name, path: `/boat-launches/${launch.slug}` },
        ]}
      />

      <GeoHero
        eyebrow={
          publishedDestination
            ? `${publishedDestination.name}, ${publishedDestination.state} · public launch`
            : "Public boat launch"
        }
        title={launch.name}
        intro={launch.summary}
        links={[
          ...(publishedDestination
            ? [
                {
                  label: `Boating in ${publishedDestination.name} →`,
                  href: `/destinations/${publishedDestination.slug}`,
                },
                {
                  label: `${weatherLocation?.label ?? "Marine"} weather`,
                  href: `/weather?location=${publishedDestination.weatherLocationId}`,
                },
              ]
            : [{ label: "All boat launches →", href: "/boat-launches" }]),
          ...(publishedLake
            ? [{ label: publishedLake.name, href: `/lakes/${publishedLake.slug}` }]
            : []),
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        {launch.overview && launch.overview.length > 0 ? (
          <section className="max-w-3xl space-y-4">
            <h2 className="text-2xl font-extrabold text-lake-blue">
              Planning notes
            </h2>
            {launch.overview.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </section>
        ) : null}

        {launch.amenityNotes ? (
          <section className="max-w-3xl">
            <h2 className="text-2xl font-extrabold text-lake-blue mb-3">
              What the official source says
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {launch.amenityNotes}
            </p>
          </section>
        ) : null}

        <section className="rounded-2xl bg-lake-blue text-white p-6 md:p-8">
          <h2 className="text-xl font-extrabold mb-2">
            Launch fees and permits
          </h2>
          <p className="text-white/90 leading-relaxed max-w-3xl">
            Ramp fees, season passes, and waterway stickers are set by the
            operating agency and change between seasons. We link to the page
            that publishes the current amounts rather than repeating numbers
            that may already be out of date.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
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
          <div className="rounded-xl bg-white border border-sky-blue/20 p-4">
            <p className="font-bold text-lake-blue mb-1">Water</p>
            {publishedLake ? (
              <Link
                href={`/lakes/${publishedLake.slug}`}
                className="font-semibold text-coral hover:underline"
              >
                {publishedLake.name}
              </Link>
            ) : (
              <p className="text-gray-600">
                {publishedDestination?.bodyOfWater ?? "Not published"}
              </p>
            )}
          </div>
          <div className="rounded-xl bg-white border border-sky-blue/20 p-4">
            <p className="font-bold text-lake-blue mb-1">Before you tow</p>
            {publishedDestination ? (
              <Link
                href={`/weather?location=${publishedDestination.weatherLocationId}`}
                className="font-semibold text-coral hover:underline"
              >
                Check marine conditions →
              </Link>
            ) : (
              <Link
                href="/weather"
                className="font-semibold text-coral hover:underline"
              >
                Check marine conditions →
              </Link>
            )}
          </div>
        </section>

        {siblings.length > 0 ? (
          <section>
            <h2 className="text-2xl font-extrabold text-lake-blue mb-4">
              Other launches at this destination
            </h2>
            <div className="flex flex-wrap gap-3">
              {siblings.map((sibling) => (
                <Link
                  key={sibling.slug}
                  href={`/boat-launches/${sibling.slug}`}
                  className="px-4 py-2 bg-light-blue text-lake-blue font-semibold text-sm rounded-full hover:bg-sky-blue/20 transition-colors"
                >
                  {sibling.name}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {marinas.length > 0 ? (
          <section>
            <h2 className="text-2xl font-extrabold text-lake-blue mb-4">
              Marinas at this destination
            </h2>
            <div className="flex flex-wrap gap-3">
              {marinas.map((marina) => (
                <Link
                  key={marina.slug}
                  href={`/marinas/${marina.slug}`}
                  className="px-4 py-2 bg-light-blue text-lake-blue font-semibold text-sm rounded-full hover:bg-sky-blue/20 transition-colors"
                >
                  {marina.name}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <SourceAttribution source={launch.source} />

        <p>
          <Link
            href="/boat-launches"
            className="font-bold text-coral hover:underline"
          >
            ← All public boat launches
          </Link>
        </p>
      </div>
    </>
  );
}
