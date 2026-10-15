import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import { QualityDisclaimer } from "@/components/geo/SourceAttribution";
import { MarinaAmenityFilters } from "@/components/geo/MarinaAmenityFilters";
import { getMarinasByDestination, getPublishedDestinations } from "@/data/geo";
import { REGION_ORDER } from "@/lib/geo-display";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { ResourceCrossLinks } from "@/components/ResourceCrossLinks";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Marinas & Harbors Near Chicago | Verified Official Listings",
    description:
      "Chicago-area marinas and harbors on Lake Michigan and inland lakes, each listed from the operator's own official page with amenities confirmed by the source.",
    path: "/marinas",
  });
}

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
          { label: "Storage & haul-out", href: "/storage" },
          { label: "Area weather forecast", href: "/weather" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <QualityDisclaimer />

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
        ) : (
          <MarinaAmenityFilters groups={groups} />
        )}

        <ResourceCrossLinks
          links={[
            { href: "/boat-ownership", label: "Boat ownership" },
            { href: "/weather", label: "Weather" },
            { href: "/boat-launches", label: "Boat launches" },
            { href: "/destinations", label: "Destinations" },
            { href: "/tools", label: "Planning tools" },
            { href: "/news", label: "News" },
            { href: "/guides", label: "Guides" },
            { href: "/events", label: "Events" },
          ]}
        />
      </div>
    </>
  );
}
