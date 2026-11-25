import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import { QualityDisclaimer } from "@/components/geo/SourceAttribution";
import {
  getDestinationBySlug,
  getPublishedMarinas,
} from "@/data/geo";
import { hasConfirmedAmenity } from "@/lib/marina-filters";
import { REGION_ORDER } from "@/lib/geo-display";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { ResourceCrossLinks } from "@/components/ResourceCrossLinks";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Lake Michigan Fuel Docks | Verified Marina Fuel Availability",
    description:
      "Marinas where the operator’s official page confirms fuel service. Prices and hours stay on the operator site — we never invent fuel pricing.",
    path: "/fuel-docks",
  });
}

export default function FuelDocksPage() {
  const rows = getPublishedMarinas()
    .filter((m) => hasConfirmedAmenity(m, "fuel"))
    .map((marina) => {
      const destination = getDestinationBySlug(marina.destinationSlug);
      return { marina, destination };
    })
    .filter((r) => r.destination?.isPublished)
    .sort(
      (a, b) =>
        REGION_ORDER.indexOf(a.destination!.region) -
          REGION_ORDER.indexOf(b.destination!.region) ||
        a.marina.name.localeCompare(b.marina.name),
    );

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Fuel docks", path: "/fuel-docks" },
        ]}
      />

      <GeoHero
        eyebrow={`${rows.length} marinas with confirmed fuel`}
        title="Fuel docks across our coverage area"
        intro="Only marinas whose cited operator page confirms fuel are listed. Pump grades, prices, and dock hours change — confirm on the official marina page before you depend on a stop. Unknown fuel status is never shown as “no fuel.”"
        links={[
          { label: "Marinas with fuel filter →", href: "/marinas?amenity=fuel" },
          { label: "Transient slips", href: "/transient-slips" },
          { label: "Fuel cost calculator", href: "/tools/fuel" },
          { label: "All marinas", href: "/marinas" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <QualityDisclaimer />

        <p className="text-sm text-gray-700 max-w-3xl leading-relaxed">
          This directory does not scrape competitor prices. When we lack a dated
          operator price, availability is shown as confirmed fuel service only —
          not a price quote.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-sky-blue/20 bg-white">
          <table className="min-w-full text-sm">
            <caption className="sr-only">
              Marinas with operator-confirmed fuel docks
            </caption>
            <thead className="bg-light-blue/60 text-left text-lake-blue">
              <tr>
                <th className="px-4 py-3 font-bold">Marina</th>
                <th className="px-4 py-3 font-bold">Destination</th>
                <th className="px-4 py-3 font-bold">State</th>
                <th className="px-4 py-3 font-bold">Official source</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ marina, destination }) => (
                <tr
                  key={marina.slug}
                  className="border-t border-sky-blue/15 align-top"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/marinas/${marina.slug}`}
                      className="font-semibold text-lake-blue hover:underline"
                    >
                      {marina.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {destination ? (
                      <Link
                        href={`/destinations/${destination.slug}`}
                        className="hover:underline"
                      >
                        {destination.name}
                      </Link>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {destination?.state ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={marina.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-blue font-semibold hover:underline"
                    >
                      Operator page
                    </a>
                    {marina.source.lastVerified ? (
                      <span className="block text-xs text-gray-500">
                        Checked {marina.source.lastVerified}
                      </span>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ResourceCrossLinks
          links={[
            { href: "/marinas?amenity=pump-out", label: "Pump-out confirmed" },
            { href: "/storage", label: "Storage & haul-out" },
            { href: "/tools", label: "Planning tools" },
            { href: "/weather", label: "Boating weather" },
          ]}
        />
      </div>
    </>
  );
}
