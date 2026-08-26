import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import {
  QualityDisclaimer,
  SourceLink,
} from "@/components/geo/SourceAttribution";
import {
  getLaunchesByDestination,
  getPublishedDestinations,
} from "@/data/geo";
import { REGION_ORDER, regionLabel } from "@/lib/geo-display";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Public Boat Launches Near Chicago | Verified Ramp Listings",
  description:
    "Public boat launch ramps around Chicago — Lake Michigan, the Chain O' Lakes, and Geneva Lake — listed from official park district, state, and municipal sources.",
  path: "/boat-launches",
});

export default function BoatLaunchesPage() {
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
      launches: getLaunchesByDestination(destination.slug),
    }))
    .filter((group) => group.launches.length > 0);

  const total = groups.reduce((sum, group) => sum + group.launches.length, 0);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Boat launches", path: "/boat-launches" },
        ]}
      />

      <GeoHero
        eyebrow={`${total} verified public launches`}
        title="Public Boat Launches Near Chicago"
        intro="Trailer-in access from the Chicago lakefront to Wisconsin and the Fox River chain. Launch fees, permits, and stickers are set by the operating agency — we link you to the page that publishes them."
        links={[
          { label: "Destinations →", href: "/destinations" },
          { label: "Marinas", href: "/marinas" },
          { label: "Lakes & waterways", href: "/lakes" },
          { label: "Boating weather", href: "/weather" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <QualityDisclaimer />

        {groups.map(({ destination, launches }) => (
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
              {launches.map((launch) => (
                <li
                  key={launch.slug}
                  className="rounded-2xl border border-sky-blue/20 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
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
        ))}

        {groups.length === 0 ? (
          <p className="text-gray-700">
            No launches are published yet. Check the{" "}
            <Link
              href="/destinations"
              className="font-semibold text-coral hover:underline"
            >
              destination guides
            </Link>{" "}
            for official access links.
          </p>
        ) : null}
      </div>
    </>
  );
}
