import Link from "next/link";
import type { Destination } from "@/types/geo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import { QualityDisclaimer } from "@/components/geo/SourceAttribution";
import { getDestinationBySlug, getPublishedLakes } from "@/data/geo";
import { regionLabel } from "@/lib/geo-display";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { ResourceCrossLinks } from "@/components/ResourceCrossLinks";

export async function generateMetadata() {
  return buildManagedMetadata({
  title: "Lakes & Waterways for Chicago-Area Boating",
  description:
    "Lake Michigan, Chain O’ Lakes, Geneva Lake, and Chicago-area rivers plus inland lakes within about 400 driving miles — Wisconsin, Illinois, Indiana, and Michigan guides with official launch and rules sources.",
  path: "/lakes",
});
}

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
        intro="Lake Michigan end-to-end, nearby inland lakes, the Fox, Des Plaines, and DuPage river corridors, and road-trip lakes within about 400 driving miles in Wisconsin, Illinois, Indiana, and Michigan each carry different access rules and hazards. Start here, then follow destinations, launches, and official agency pages."
        links={[
          { label: "Destinations →", href: "/destinations" },
          { label: "Forest preserves", href: "/forest-preserves" },
          { label: "Boat launches", href: "/boat-launches" },
          { label: "Inland paddling guide", href: "/chicago-area-inland-paddling-guide" },
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
            Each waterway page explains the water body Chicago-area boaters
            actually use, then links to destinations, municipal launches, and
            forest-preserve landings that sit on it. Operational details like
            fees and hours stay on the official agency pages we cite — we do not
            invent them.
          </p>
          <p>
            Beyond the Chicago area, the list now includes inland lakes and
            waterways within about 400 driving miles of downtown — such as
            Delavan Lake, Lake Koshkonong, Green Lake, Madison’s Lakes Mendota
            and Monona, and Lake Winnebago in Wisconsin; Lake Shelbyville,
            Clinton Lake, Lake Springfield, and the Illinois River at Starved
            Rock in Illinois; Lake Wawasee and Lake Maxinkuckee in Indiana; and
            Gull Lake in Michigan — with room to add more verified waters
            across the full coverage area. Driving distances in each guide are
            approximate, and launch rules, permits, and registration
            requirements differ by state and operator, so follow the official
            links on each page before you tow.
          </p>
          <p>
            Checking conditions before you go? Use the{" "}
            <Link href="/weather" className="font-semibold text-coral hover:underline">
              weather location selector
            </Link>{" "}
            for Chicago, the Chain, Lake Geneva, and Lake Michigan harbors.
            Looking for a town or harbor first? Start at{" "}
            <Link href="/destinations" className="font-semibold text-coral hover:underline">
              destinations
            </Link>
            . Preserve lakes and Des Plaines / DuPage River canoe landings are on
            the{" "}
            <Link
              href="/forest-preserves"
              className="font-semibold text-coral hover:underline"
            >
              forest-preserves hub
            </Link>
            ; filter municipal ramps with the{" "}
            <Link
              href="/boat-launches?water=river"
              className="font-semibold text-coral hover:underline"
            >
              rivers launch filter
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
            { href: "/forest-preserves", label: "Forest preserves" },
            { href: "/destinations", label: "Destinations" },
            { href: "/boat-launches", label: "Boat launches" },
            { href: "/marinas", label: "Marinas" },
            { href: "/guides", label: "Guides" },
          ]}
        />
      </div>
    </>
  );
}
