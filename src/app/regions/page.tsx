import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import { QualityDisclaimer } from "@/components/geo/SourceAttribution";
import { ResourceCrossLinks } from "@/components/ResourceCrossLinks";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import {
  getHubDestinations,
  getHubLaunchCount,
  getHubMarinaCount,
  listGeoHubs,
} from "@/lib/geo-registry";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Boating Regions Near Chicago | Lake Michigan & Inland",
    description:
      "Browse by region: Chicago & Chicagoland, Illinois inland waters, Wisconsin and Michigan shores, Indiana south shore, and the full Lake Michigan shoreline.",
    path: "/regions",
  });
}

export default function RegionsPage() {
  const hubs = listGeoHubs();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Regions", path: "/regions" },
        ]}
      />

      <GeoHero
        eyebrow="Geographic navigation"
        title="Boating Regions"
        intro="Chicago and Chicagoland stay the primary audience. Use these hubs to move outward along Lake Michigan and inland waters within about 400 driving miles — without diluting existing Chicago harbor, launch, and guide URLs. Driving miles are for trailering; water-route distances are labeled separately when NOAA or an operator publishes them."
        links={[
          { label: "Destinations →", href: "/destinations" },
          { label: "Lakes & waterways", href: "/lakes" },
          { label: "Boat launches", href: "/boat-launches" },
          { label: "Marinas", href: "/marinas" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <QualityDisclaimer />

        <ul className="space-y-5">
          {hubs.map((hub) => {
            const destinations = getHubDestinations(hub.id);
            const marinaCount = getHubMarinaCount(hub.id);
            const launchCount = getHubLaunchCount(hub.id);
            return (
              <li
                key={hub.id}
                className="rounded-2xl border border-sky-blue/20 bg-white p-6 shadow-sm"
              >
                <h2 className="text-xl md:text-2xl font-extrabold text-lake-blue mb-2">
                  <Link
                    href={`/regions/${hub.slug}`}
                    className="hover:underline"
                  >
                    {hub.name}
                  </Link>
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {hub.summary}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  {destinations.length} destination
                  {destinations.length === 1 ? "" : "s"}
                  {" · "}
                  {marinaCount} marina{marinaCount === 1 ? "" : "s"}
                  {" · "}
                  {launchCount} launch{launchCount === 1 ? "" : "es"}
                </p>
                <Link
                  href={`/regions/${hub.slug}`}
                  className="text-sm font-semibold text-lake-blue hover:underline"
                >
                  Open region guide →
                </Link>
              </li>
            );
          })}
        </ul>

        <ResourceCrossLinks
          links={[
            { label: "Planning tools", href: "/tools" },
            { label: "Kayak, canoe & SUP", href: "/kayak-canoe-sup" },
            { label: "Weather", href: "/weather" },
          ]}
        />
      </div>
    </>
  );
}
