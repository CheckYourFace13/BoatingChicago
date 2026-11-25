import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import { QualityDisclaimer } from "@/components/geo/SourceAttribution";
import { MarinaAmenityFilters } from "@/components/geo/MarinaAmenityFilters";
import { LazyLaunchMap } from "@/components/geo/LazyLaunchMap";
import {
  getDestinationBySlug,
  getMarinasByDestination,
  getPublishedDestinations,
  getPublishedMarinas,
} from "@/data/geo";
import { buildMarinaPoints } from "@/lib/map-points";
import { REGION_ORDER } from "@/lib/geo-display";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { ResourceCrossLinks } from "@/components/ResourceCrossLinks";
import {
  hasConfirmedAmenity,
  marinaFiltersActive,
  parseMarinaAmenity,
  parseWaterKind,
  waterKind,
} from "@/lib/marina-filters";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ water?: string; amenity?: string }>;
}) {
  const params = await searchParams;
  const water = parseWaterKind(params.water);
  const amenity = parseMarinaAmenity(params.amenity);
  const filtered = marinaFiltersActive(water, amenity);
  return buildManagedMetadata({
    title: "Marinas & Harbors Near Chicago | Verified Official Listings",
    description:
      "Chicago-area marinas and harbors on Lake Michigan and inland lakes, each listed from the operator's own official page with amenities confirmed by the source.",
    path: "/marinas",
    noIndex: filtered,
  });
}

export default async function MarinasPage({
  searchParams,
}: {
  searchParams: Promise<{ water?: string; amenity?: string }>;
}) {
  const params = await searchParams;
  const water = parseWaterKind(params.water);
  const amenity = parseMarinaAmenity(params.amenity);

  const destinations = getPublishedDestinations()
    .slice()
    .sort(
      (a, b) =>
        REGION_ORDER.indexOf(a.region) - REGION_ORDER.indexOf(b.region) ||
        (a.distanceFromChicagoMiles ?? Number.MAX_SAFE_INTEGER) -
          (b.distanceFromChicagoMiles ?? Number.MAX_SAFE_INTEGER),
    );

  const allGroups = destinations
    .map((destination) => ({
      destination,
      marinas: getMarinasByDestination(destination.slug),
    }))
    .filter((group) => group.marinas.length > 0);

  const total = allGroups.reduce((sum, group) => sum + group.marinas.length, 0);

  const groups = allGroups
    .map(({ destination, marinas }) => {
      if (water !== "all" && waterKind(destination) !== water) {
        return { destination, marinas: [] };
      }
      const next = amenity
        ? marinas.filter((m) => hasConfirmedAmenity(m, amenity))
        : marinas;
      return { destination, marinas: next };
    })
    .filter((g) => g.marinas.length > 0);

  const { points: marinaPoints, unmapped } = buildMarinaPoints(
    getPublishedMarinas(),
    (slug) => {
      const d = getDestinationBySlug(slug);
      return d ? `${d.name}, ${d.state}` : undefined;
    },
  );
  const unmappedNote =
    unmapped.length > 0
      ? ` ${unmapped.length} listing${unmapped.length === 1 ? "" : "s"} without a verified coordinate ${unmapped.length === 1 ? "is" : "are"} not pinned but still listed below.`
      : "";

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
        intro="Public and full-service marinas from the Chicago lakefront to Wisconsin, Indiana, and Michigan. Amenities come straight from each operator's official page — slip rates, fees, and hours stay on the source where they are kept current. Compare quotes you collect in the slip calculator."
        links={[
          { label: "Destinations →", href: "/destinations" },
          { label: "Boat launches", href: "/boat-launches" },
          { label: "Compare quotes", href: "/tools/slip-compare" },
          { label: "Storage & haul-out", href: "/storage" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <QualityDisclaimer />

        {marinaPoints.length > 0 ? (
          <LazyLaunchMap
            title="Marina map"
            points={marinaPoints}
            footnote={`Pins use verified OpenStreetMap coordinates and link to each marina listing.${unmappedNote}`}
          />
        ) : null}

        {allGroups.length === 0 ? (
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
          <MarinaAmenityFilters
            groups={groups}
            water={water}
            amenity={amenity}
            totalCount={total}
          />
        )}

        <ResourceCrossLinks
          links={[
            { href: "/boat-ownership", label: "Boat ownership" },
            { href: "/tools/ownership-cost", label: "Ownership cost calculator" },
            { href: "/chicago-harbors-seasonal-slips-guide", label: "Harbor slips & waitlists" },
            { href: "/chicago-transient-dockage", label: "Transient dockage" },
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
