import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import {
  QualityDisclaimer,
  SourceLink,
} from "@/components/geo/SourceAttribution";
import { getMarinasByDestination, getPublishedDestinations } from "@/data/geo";
import { REGION_ORDER, amenityLabel, regionLabel } from "@/lib/geo-display";
import { buildMetadata } from "@/lib/seo";
import { ResourceCrossLinks } from "@/components/ResourceCrossLinks";

export const metadata = buildMetadata({
  title: "Marinas & Harbors Near Chicago | Verified Official Listings",
  description:
    "Chicago-area marinas and harbors on Lake Michigan and inland lakes, each listed from the operator's own official page with amenities confirmed by the source.",
  path: "/marinas",
});

export default function MarinasPage() {
  const destinations = getPublishedDestinations()
    .slice()
    .sort(
      (a, b) =>
        REGION_ORDER.indexOf(a.region) - REGION_ORDER.indexOf(b.region) ||
        (a.distanceFromChicagoMiles ?? Number.MAX_SAFE_INTEGER) -
          (b.distanceFromChicagoMiles ?? Number.MAX_SAFE_INTEGER),
    );

  const groups = destinations
    .map((destination) => ({
      destination,
      marinas: getMarinasByDestination(destination.slug),
    }))
    .filter((group) => group.marinas.length > 0);

  const total = groups.reduce((sum, group) => sum + group.marinas.length, 0);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Marinas", path: "/marinas" },
        ]}
      />

      <GeoHero
        eyebrow={`${total} verified marinas & harbors`}
        title="Marinas & Harbors Near Chicago"
        intro="Public and full-service marinas from the Chicago lakefront to Wisconsin, Indiana, and Michigan. Amenities come straight from each operator's official page — slip rates, fees, and hours stay on the source where they are kept current."
        links={[
          { label: "Destinations →", href: "/destinations" },
          { label: "Boat launches", href: "/boat-launches" },
          { label: "Lakes & waterways", href: "/lakes" },
          { label: "Boating weather", href: "/weather" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <QualityDisclaimer />

        {groups.map(({ destination, marinas }) => (
          <section key={destination.slug} id={destination.slug}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue">
                <Link
                  href={`/destinations/${destination.slug}`}
                  className="hover:underline"
                >
                  {destination.name}, {destination.state}
                </Link>
              </h2>
              <p className="text-sm text-gray-500">
                {regionLabel(destination.region)} · {destination.bodyOfWater}
              </p>
            </div>

            <ul className="space-y-4">
              {marinas.map((marina) => {
                const confirmed = marina.amenities.filter(
                  (a) => a.available === true,
                );
                return (
                  <li
                    key={marina.slug}
                    className="rounded-2xl border border-sky-blue/20 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-extrabold text-lake-blue mb-1">
                      <Link
                        href={`/marinas/${marina.slug}`}
                        className="hover:underline"
                      >
                        {marina.name}
                      </Link>
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {marina.summary}
                    </p>
                    {confirmed.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {confirmed.slice(0, 6).map((amenity) => (
                          <span
                            key={amenity.key}
                            className="text-xs font-semibold px-3 py-1 rounded-full bg-light-blue text-lake-blue"
                          >
                            {amenityLabel(amenity.key)}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <p className="text-sm">
                      <SourceLink source={marina.source} />
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        {groups.length === 0 ? (
          <p className="text-gray-700">
            No marinas are published yet. Check the{" "}
            <Link
              href="/destinations"
              className="font-semibold text-coral hover:underline"
            >
              destination guides
            </Link>{" "}
            for official harbor links.
          </p>
        ) : null}

        <ResourceCrossLinks
          links={[
            { href: "/weather", label: "Weather" },
            { href: "/boat-launches", label: "Boat launches" },
            { href: "/destinations", label: "Destinations" },
            { href: "/news", label: "News" },
            { href: "/guides", label: "Guides" },
            { href: "/events", label: "Events" },
          ]}
        />
      </div>
    </>
  );
}
