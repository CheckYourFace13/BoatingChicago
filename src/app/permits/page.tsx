import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import { QualityDisclaimer } from "@/components/geo/SourceAttribution";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { ResourceCrossLinks } from "@/components/ResourceCrossLinks";
import { PERMIT_SOURCES } from "@/lib/permits";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Boating Rules & Permits | Illinois, Wisconsin, Indiana, Michigan",
    description:
      "Official agency hubs for boat registration, safety certificates, and waterway stickers covering Illinois, Wisconsin, Indiana, and Michigan waters near Chicago.",
    path: "/permits",
  });
}

export default function PermitsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Rules & permits", path: "/permits" },
        ]}
      />
      <GeoHero
        eyebrow="Official agency pages"
        title="Rules, registration, and permits"
        intro="State and waterway-agency rules change. These are the current official hubs we use when writing destination pages — not a substitute for the live page the day you launch."
        links={[
          { href: "/boat-launches", label: "Boat launches →" },
          { href: "/kayak-canoe-sup", label: "Kayak & SUP finder" },
          { href: "/illinois-boating-safety-certificate", label: "Illinois safety certificate" },
          { href: "/lakes", label: "Lakes & waterways" },
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 space-y-8">
        <QualityDisclaimer />
        <ul className="space-y-5">
          {PERMIT_SOURCES.map((item) => (
            <li
              key={item.url}
              className="rounded-2xl border border-sky-blue/20 bg-white p-5"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-coral">
                {item.state}
              </p>
              <h2 className="text-lg font-extrabold text-lake-blue mt-1">
                <a
                  href={item.url}
                  className="hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {item.title}
                </a>
              </h2>
              <p className="text-sm text-gray-500 mb-2">{item.agency}</p>
              <p className="text-gray-700 leading-relaxed">{item.blurb}</p>
              <p className="text-xs text-gray-500 mt-2">
                Last checked {item.lastChecked}. Confirm the live agency page.
              </p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-600 leading-relaxed">
          Local launch permits (Madison lake access, Fox Waterway stickers,
          village ramps, forest-preserve watercraft permits) are documented on
          each launch and preserve listing. We do not reprint dollar amounts.
        </p>
        <p className="text-sm">
          <Link href="/tools/ownership-cost" className="font-semibold text-coral hover:underline">
            Ownership cost calculator →
          </Link>
        </p>
        <ResourceCrossLinks
          links={[
            { href: "/boat-launches", label: "Launches" },
            { href: "/kayak-canoe-sup", label: "Kayak & SUP" },
            { href: "/marinas", label: "Marinas" },
            { href: "/calendar", label: "Season calendar" },
            { href: "/guides", label: "Guides" },
          ]}
        />
      </div>
    </>
  );
}
