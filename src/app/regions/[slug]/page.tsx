import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import { QualityDisclaimer } from "@/components/geo/SourceAttribution";
import {
  getAllGeoHubSlugs,
  getGeoHubBySlug,
} from "@/config/geo-hierarchy";
import {
  getLaunchesByDestination,
  getMarinasByDestination,
} from "@/data/geo";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import {
  getHubDestinations,
  getHubLakes,
  getHubLaunchCount,
  getHubMarinaCount,
} from "@/lib/geo-registry";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllGeoHubSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const hub = getGeoHubBySlug(slug);
  if (!hub) return {};
  return buildManagedMetadata({
    title: `${hub.name} Boating Guide | Launches, Marinas & Destinations`,
    description: hub.summary.slice(0, 155),
    path: `/regions/${hub.slug}`,
  });
}

export default async function RegionHubPage({ params }: PageProps) {
  const { slug } = await params;
  const hub = getGeoHubBySlug(slug);
  if (!hub) notFound();

  const destinations = getHubDestinations(hub.id);
  const lakes = getHubLakes(hub.id);
  const marinaCount = getHubMarinaCount(hub.id);
  const launchCount = getHubLaunchCount(hub.id);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Regions", path: "/regions" },
          { name: hub.name, path: `/regions/${hub.slug}` },
        ]}
      />

      <GeoHero
        eyebrow={hub.shortName}
        title={hub.name}
        intro={hub.intro}
        links={[
          { label: "All regions →", href: "/regions" },
          { label: "Destinations", href: "/destinations" },
          { label: "Boat launches", href: "/boat-launches" },
          { label: "Marinas", href: "/marinas" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <QualityDisclaimer />

        <p className="text-sm text-gray-600">
          Published in this hub: {destinations.length} destinations ·{" "}
          {lakes.length} lake/waterway pages · {marinaCount} marinas ·{" "}
          {launchCount} launches. Incomplete research stays off this index —
          we do not publish thin village pages without verified facilities.
        </p>

        <section>
          <h2 className="text-2xl font-extrabold text-lake-blue mb-4">
            Destinations
          </h2>
          {destinations.length === 0 ? (
            <p className="text-gray-700">
              No destination guides published in this hub yet. Check linked
              lake pages and the research queue as coverage expands.
            </p>
          ) : (
            <ul className="space-y-4">
              {destinations.map((destination) => {
                const marinas = getMarinasByDestination(destination.slug);
                const launches = getLaunchesByDestination(destination.slug);
                return (
                  <li
                    key={destination.slug}
                    className="rounded-xl border border-sky-blue/15 bg-white p-5"
                  >
                    <h3 className="text-lg font-extrabold text-lake-blue">
                      <Link
                        href={`/destinations/${destination.slug}`}
                        className="hover:underline"
                      >
                        {destination.name}, {destination.state}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {destination.bodyOfWater}
                      {typeof destination.distanceFromChicagoMiles === "number"
                        ? ` · ~${destination.distanceFromChicagoMiles} driving miles from Chicago`
                        : null}
                    </p>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                      {destination.summary}
                    </p>
                    <p className="text-xs text-gray-500 mt-3">
                      {marinas.length} marina{marinas.length === 1 ? "" : "s"} ·{" "}
                      {launches.length} launch
                      {launches.length === 1 ? "" : "es"}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {lakes.length > 0 ? (
          <section>
            <h2 className="text-2xl font-extrabold text-lake-blue mb-4">
              Lakes & waterways
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {lakes.map((lake) => (
                <li key={lake.slug}>
                  <Link
                    href={`/lakes/${lake.slug}`}
                    className="block rounded-xl border border-sky-blue/15 bg-white px-4 py-3 font-semibold text-lake-blue hover:bg-light-blue/40"
                  >
                    {lake.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="rounded-2xl bg-light-blue/40 p-6">
          <h2 className="text-xl font-extrabold text-lake-blue mb-2">
            Plan the trip
          </h2>
          <p className="text-gray-700 mb-4">
            Choose a destination, open its verified launches and marinas, check
            the linked weather anchor, then use fuel and checklist tools with
            your own vessel numbers.
          </p>
          <div className="flex flex-wrap gap-3 text-sm font-semibold">
            <Link href="/tools" className="text-lake-blue hover:underline">
              Planning tools →
            </Link>
            <Link href="/weather" className="text-lake-blue hover:underline">
              Weather →
            </Link>
            <Link href="/permits" className="text-lake-blue hover:underline">
              Rules & permits →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
