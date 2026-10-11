import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import {
  QualityDisclaimer,
  SourceLink,
} from "@/components/geo/SourceAttribution";
import { getPublishedStorageFacilities } from "@/data/geo";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { ResourceCrossLinks } from "@/components/ResourceCrossLinks";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Chicago Boat Storage & Haul-Out Directory | Verified Operators",
    description:
      "Chicago-area winter storage and haul-out operators confirmed from each yard’s official website — services, locations, and source links. Ask operators for current quotes and availability.",
    path: "/storage",
  });
}

export default function StorageDirectoryPage() {
  const facilities = getPublishedStorageFacilities();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Storage & haul-out", path: "/storage" },
        ]}
      />

      <GeoHero
        eyebrow={`${facilities.length} verified storage & haul-out operators`}
        title="Chicago-Area Boat Storage & Haul-Out"
        intro="An editorial directory of operators whose official websites confirm winter storage and/or haul-out services for southern Lake Michigan boaters. This is not a ranking, marketplace, or paid partner list — ask each operator for current contracts, quotes, and space."
        links={[
          { label: "Winter storage guide →", href: "/winter-boat-storage-chicago" },
          { label: "Spring launch checklist", href: "/spring-boat-launch-checklist-chicago" },
          { label: "Marinas", href: "/marinas" },
          { label: "Boat ownership", href: "/boat-ownership" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <QualityDisclaimer />

        <p className="text-sm text-gray-700 max-w-3xl leading-relaxed">
          We do not invent prices, availability, reviews, photos, or endorsements.
          Service wording below tracks what each operator published on the linked
          page on the verification date. Rates and yard capacity change — contact
          the operator before you plan haul-out.
        </p>

        <ul className="space-y-5">
          {facilities.map((facility) => (
            <li
              key={facility.slug}
              className="rounded-2xl border border-sky-blue/20 bg-white p-5 sm:p-6 shadow-sm"
            >
              <h2 className="text-xl font-extrabold text-lake-blue mb-1">
                {facility.name}
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-semibold text-lake-blue">Location: </span>
                {facility.location}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-semibold text-lake-blue">Service area: </span>
                {facility.serviceArea}
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {facility.summary}
              </p>
              <div className="mb-4">
                <h3 className="text-sm font-bold text-lake-blue mb-2">
                  Confirmed on the official site
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  {facility.confirmedServices.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mb-4">
                Ask the operator for current quotes, contracts, and availability —
                BoatingChicago does not take reservations or publish rates.
              </p>
              <p className="text-sm text-gray-700">
                <a
                  href={facility.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-coral hover:underline"
                >
                  Official website →
                </a>
                <span className="text-gray-500"> · </span>
                <SourceLink source={facility.source} />
              </p>
            </li>
          ))}
        </ul>

        <section className="max-w-3xl space-y-3">
          <h2 className="text-2xl font-extrabold text-lake-blue">
            Planning context
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Pair this directory with the{" "}
            <Link
              href="/winter-boat-storage-chicago"
              className="font-semibold text-coral hover:underline"
            >
              winter storage guide
            </Link>
            ,{" "}
            <Link
              href="/chicago-boat-winterizing-guide"
              className="font-semibold text-coral hover:underline"
            >
              winterizing guide
            </Link>
            , and{" "}
            <Link
              href="/spring-boat-launch-checklist-chicago"
              className="font-semibold text-coral hover:underline"
            >
              spring launch checklist
            </Link>
            . Manufacturer manuals and qualified marine service still govern
            engine and systems work.
          </p>
        </section>

        <ResourceCrossLinks
          links={[
            { href: "/marinas", label: "Marinas" },
            { href: "/boat-launches", label: "Boat launches" },
            { href: "/boat-ownership", label: "Boat ownership" },
            { href: "/guides", label: "Guides" },
            { href: "/weather", label: "Weather" },
            { href: "/advertise", label: "Advertise" },
          ]}
        />
      </div>
    </>
  );
}
