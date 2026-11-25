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
    title: "Transient Slips & Guest Dockage | Lake Michigan & Inland",
    description:
      "Marinas with operator-confirmed transient or guest dockage across Chicago, Lake Michigan, and inland coverage. Book only through official reservation links — we do not invent inventory.",
    path: "/transient-slips",
  });
}

export default function TransientSlipsPage() {
  const rows = getPublishedMarinas()
    .filter((m) => hasConfirmedAmenity(m, "transient-dockage"))
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
          { name: "Transient slips", path: "/transient-slips" },
        ]}
      />

      <GeoHero
        eyebrow={`${rows.length} marinas with confirmed transient dockage`}
        title="Transient slips and guest docks"
        intro="Listings appear only when the marina’s cited official page confirms transient or guest dockage. Slip length, power, water, and nightly rates belong on the operator or Michigan DNR reservation system — BoatingChicago never invents bookable inventory."
        links={[
          {
            label: "Marinas · transient filter →",
            href: "/marinas?amenity=transient-dockage",
          },
          {
            label: "Chicago Harbors daily dockage",
            href: "/chicago-transient-dockage",
          },
          { label: "Fuel docks", href: "/fuel-docks" },
          { label: "Plan with tools", href: "/tools" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <QualityDisclaimer />

        <p className="text-sm text-gray-700 max-w-3xl leading-relaxed">
          Michigan municipal harbors often use the Michigan DNR reservation
          system; Wisconsin and Illinois operators usually publish their own
          guest-dock contacts. Always open the official link in the table before
          you leave the dock.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-sky-blue/20 bg-white">
          <table className="min-w-full text-sm">
            <caption className="sr-only">
              Marinas with operator-confirmed transient dockage
            </caption>
            <thead className="bg-light-blue/60 text-left text-lake-blue">
              <tr>
                <th className="px-4 py-3 font-bold">Marina</th>
                <th className="px-4 py-3 font-bold">Destination</th>
                <th className="px-4 py-3 font-bold">Notes from source</th>
                <th className="px-4 py-3 font-bold">Reserve / confirm</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ marina, destination }) => {
                const transientNote = marina.amenities.find(
                  (a) => a.key === "transient-dockage" && a.available === true,
                )?.note;
                return (
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
                        <>
                          <Link
                            href={`/destinations/${destination.slug}`}
                            className="hover:underline"
                          >
                            {destination.name}
                          </Link>
                          <span className="text-gray-500">
                            {" "}
                            · {destination.state}
                          </span>
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {transientNote ||
                        marina.feesNote ||
                        marina.seasonalAccessNote ||
                        "See operator page for length limits, power, and rates."}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={marina.officialWebsite || marina.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-blue font-semibold hover:underline"
                      >
                        Official page
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <ResourceCrossLinks
          links={[
            { href: "/fuel-docks", label: "Fuel docks" },
            { href: "/boat-launches", label: "Boat launches" },
            { href: "/weather", label: "Local conditions" },
            { href: "/advertise", label: "Marina sponsorship" },
          ]}
        />
      </div>
    </>
  );
}
