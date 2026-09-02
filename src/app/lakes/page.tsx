import Link from "next/link";
import type { Destination } from "@/types/geo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import { QualityDisclaimer } from "@/components/geo/SourceAttribution";
import { getDestinationBySlug, getPublishedLakes } from "@/data/geo";
import { regionLabel } from "@/lib/geo-display";
import { buildMetadata } from "@/lib/seo";
import { ResourceCrossLinks } from "@/components/ResourceCrossLinks";

export const metadata = buildMetadata({
  title: "Lakes & Waterways for Chicago-Area Boating",
  description:
    "Lake Michigan, the Chain O' Lakes, and Geneva Lake — the waterways Chicago-area boaters use, with official agency sources and the destinations that sit on each one.",
  path: "/lakes",
});

export default function LakesPage() {
  const lakes = getPublishedLakes();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Lakes", path: "/lakes" },
        ]}
      />

      <GeoHero
        eyebrow="Where Chicago boaters go"
        title="Lakes & Waterways"
        intro="Open Lake Michigan, the Fox River chain, and southern Wisconsin's inland lakes each carry different access rules and different hazards. Start here, then follow the destination pages for harbor-level detail."
        links={[
          { label: "Destinations →", href: "/destinations" },
          { label: "Boat launches", href: "/boat-launches" },
          { label: "Marinas", href: "/marinas" },
          { label: "Boating weather", href: "/weather" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <QualityDisclaimer />

        <section className="max-w-3xl space-y-4 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-extrabold text-lake-blue">
            How to use these waterway pages
          </h2>
          <p>
            Each lake page explains the water body Chicago-area boaters actually
            use, then links to the destinations, marinas, and launches that sit
            on it. Operational details like fees and hours stay on the official
            agency pages we cite — we do not invent them.
          </p>
          <p>
            Checking conditions before you go? Use the{" "}
            <Link href="/weather" className="font-semibold text-coral hover:underline">
              weather location selector
            </Link>{" "}
            for Chicago, the Chain, Lake Geneva, and southern Lake Michigan
            harbors. Looking for a town or harbor first? Start at{" "}
            <Link href="/destinations" className="font-semibold text-coral hover:underline">
              destinations
            </Link>
            .
          </p>
        </section>

        <ul className="space-y-6">
          {lakes.map((lake) => {
            const destinations = lake.destinationSlugs
              .map((slug) => getDestinationBySlug(slug))
              .filter((d): d is Destination => d !== undefined && d.isPublished);

            return (
              <li
                key={lake.slug}
                className="rounded-2xl border border-sky-blue/20 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h2 className="text-xl md:text-2xl font-extrabold text-lake-blue">
                    <Link href={`/lakes/${lake.slug}`} className="hover:underline">
                      {lake.name}
                    </Link>
                  </h2>
                  <p className="text-sm text-gray-500">
                    {regionLabel(lake.region)} ({lake.state})
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {lake.overview[0]}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/lakes/${lake.slug}`}
                    className="text-sm font-semibold text-coral hover:underline mr-2"
                  >
                    Waterway details →
                  </Link>
                  {destinations.map((destination) => (
                    <Link
                      key={destination.slug}
                      href={`/destinations/${destination.slug}`}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full bg-light-blue text-lake-blue hover:bg-sky-blue/20 transition-colors"
                    >
                      {destination.name}
                    </Link>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>

        <ResourceCrossLinks
          links={[
            { href: "/weather", label: "Weather" },
            { href: "/destinations", label: "Destinations" },
            { href: "/marinas", label: "Marinas" },
            { href: "/boat-launches", label: "Boat launches" },
            { href: "/news", label: "News" },
            { href: "/guides", label: "Guides" },
          ]}
        />
      </div>
    </>
  );
}
