import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import { QualityDisclaimer } from "@/components/geo/SourceAttribution";
import {
  getLaunchesByDestination,
  getMarinasByDestination,
  getPublishedDestinations,
} from "@/data/geo";
import { REGION_ORDER, regionLabel } from "@/lib/geo-display";
import { buildMetadata } from "@/lib/seo";
import { ResourceCrossLinks } from "@/components/ResourceCrossLinks";

export const metadata = buildMetadata({
  title: "Boating Destinations Near Chicago | Harbors, Lakes & Launch Towns",
  description:
    "Boating destinations within reach of Chicago — Lake Michigan harbors in Illinois, Wisconsin, Indiana, and Michigan plus inland lakes, each with official sources and marine weather links.",
  path: "/destinations",
});

export default function DestinationsPage() {
  const destinations = getPublishedDestinations();

  const grouped = REGION_ORDER.map((region) => ({
    region,
    items: destinations
      .filter((d) => d.region === region)
      .sort(
        (a, b) =>
          (a.distanceFromChicagoMiles ?? Number.MAX_SAFE_INTEGER) -
          (b.distanceFromChicagoMiles ?? Number.MAX_SAFE_INTEGER),
      ),
  })).filter((group) => group.items.length > 0);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
        ]}
      />

      <GeoHero
        eyebrow="Lake Michigan & inland lakes"
        title="Boating Destinations Near Chicago"
        intro="Harbor towns, launch communities, and inland lakes within a day's reach of Chicago. Each destination collects official harbor and park sources, verified marinas and launches, and a marine weather anchor."
        links={[
          { label: "Marinas →", href: "/marinas" },
          { label: "Boat launches", href: "/boat-launches" },
          { label: "Lakes & waterways", href: "/lakes" },
          { label: "Boating weather", href: "/weather" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <QualityDisclaimer />

        <nav className="flex flex-wrap gap-2">
          {grouped.map((group) => (
            <a
              key={group.region}
              href={`#${group.region}`}
              className="text-sm font-semibold px-3 py-1.5 rounded-full bg-light-blue text-lake-blue hover:bg-sky-blue/20 transition-colors"
            >
              {regionLabel(group.region)}
            </a>
          ))}
        </nav>

        {grouped.map((group) => (
          <section key={group.region} id={group.region}>
            <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-4">
              {regionLabel(group.region)}
            </h2>
            <ul className="space-y-4">
              {group.items.map((destination) => {
                const marinaCount = getMarinasByDestination(
                  destination.slug,
                ).length;
                const launchCount = getLaunchesByDestination(
                  destination.slug,
                ).length;

                return (
                  <li
                    key={destination.slug}
                    className="rounded-2xl border border-sky-blue/20 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <h3 className="text-xl font-extrabold text-lake-blue">
                        <Link
                          href={`/destinations/${destination.slug}`}
                          className="hover:underline"
                        >
                          {destination.name}, {destination.state}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500">
                        {destination.bodyOfWater}
                        {typeof destination.distanceFromChicagoMiles ===
                          "number" && destination.distanceFromChicagoMiles > 0
                          ? ` · about ${destination.distanceFromChicagoMiles} miles from Chicago`
                          : ""}
                      </p>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {destination.summary}
                    </p>
                    <div className="flex flex-wrap gap-3 text-sm font-semibold">
                      <Link
                        href={`/destinations/${destination.slug}`}
                        className="text-coral hover:underline"
                      >
                        Destination guide →
                      </Link>
                      {marinaCount > 0 ? (
                        <span className="text-gray-500">
                          {marinaCount} verified{" "}
                          {marinaCount === 1 ? "marina" : "marinas"}
                        </span>
                      ) : null}
                      {launchCount > 0 ? (
                        <span className="text-gray-500">
                          {launchCount} verified{" "}
                          {launchCount === 1 ? "launch" : "launches"}
                        </span>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <ResourceCrossLinks
          links={[
            { href: "/weather", label: "Weather" },
            { href: "/marinas", label: "Marinas" },
            { href: "/boat-launches", label: "Boat launches" },
            { href: "/lakes", label: "Lakes" },
            { href: "/news", label: "News" },
            { href: "/guides", label: "Guides" },
            { href: "/events", label: "Events" },
          ]}
        />
      </div>
    </>
  );
}
