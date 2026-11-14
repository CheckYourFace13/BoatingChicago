import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import {
  QualityDisclaimer,
  SourceLink,
} from "@/components/geo/SourceAttribution";
import { getPublishedPreserveAccess } from "@/data/geo";
import {
  preserveAccessLabel,
  preserveCraftLabel,
} from "@/lib/geo-display";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { ResourceCrossLinks } from "@/components/ResourceCrossLinks";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Forest Preserve Boating Near Chicago | Cook County Lakes & Rivers",
    description:
      "Verified forest-preserve launches and rental waters near Chicago — Busse, Skokie Lagoons, Tampier, Maple, Saganashkee, and more — from official Cook County Forest Preserves sources.",
    path: "/forest-preserves",
  });
}

export default function ForestPreservesPage() {
  const sites = getPublishedPreserveAccess().slice().sort((a, b) => {
    if (a.hasRentals !== b.hasRentals) return a.hasRentals ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
  const rentalSites = sites.filter((s) => s.hasRentals);
  const launchOnly = sites.filter((s) => !s.hasRentals);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Forest preserves", path: "/forest-preserves" },
        ]}
      />

      <GeoHero
        eyebrow={`${sites.length} verified Cook County waters`}
        title="Forest Preserve Boating Near Chicago"
        intro="Suburban lakes and river landings managed by the Forest Preserves of Cook County — rentals where listed, launch-only sites elsewhere. Gasoline motors are prohibited on FPDCC lakes; confirm craft rules on the official page before you go."
        links={[
          { label: "Boat launches →", href: "/boat-launches" },
          { label: "Lakes & waterways", href: "/lakes" },
          { label: "Destinations", href: "/destinations" },
          { label: "Boating weather", href: "/weather" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <QualityDisclaimer />

        <section className="max-w-3xl space-y-4 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-extrabold text-lake-blue">
            How to use this hub
          </h2>
          <p>
            These pages summarize what the Forest Preserves of Cook County
            publishes about launches and rentals. We separate{" "}
            <strong className="font-semibold text-lake-blue">
              rental centers
            </strong>{" "}
            from{" "}
            <strong className="font-semibold text-lake-blue">
              launch-only sites
            </strong>{" "}
            so you do not trailer to Maple Lake expecting a public ramp for a
            private boat — FPDCC states private boats are prohibited there.
          </p>
          <p>
            District-wide rules from the official boating page: gasoline-powered
            boats are prohibited on all FPDCC lakes, and stand-up paddleboards
            are listed among prohibited flotation devices on all FPDCC
            waterbodies. Fees, hours, and seasonal closures change — use the
            cited source before you hitch up.
          </p>
          <p className="text-sm">
            Primary source:{" "}
            <a
              href="https://fpdcc.com/things-to-do/boating-canoeing-kayaking/"
              className="font-semibold text-coral hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Forest Preserves of Cook County — Boating, Canoeing &amp; Kayaking
            </a>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold text-lake-blue">
            Rental centers
          </h2>
          <p className="text-gray-700 max-w-3xl">
            FPDCC lists seasonal rentals at these locations. Call ahead —
            schedules vary mid-April through October.
          </p>
          <ul className="grid gap-4 md:grid-cols-2">
            {rentalSites.map((site) => (
              <li key={site.slug}>
                <Link
                  href={`/forest-preserves/${site.slug}`}
                  className="block h-full rounded-2xl border border-sky-blue/25 bg-white p-6 hover:border-sky-blue/50 hover:shadow-md transition-all"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-coral mb-2">
                    {site.county} County · Rentals
                  </p>
                  <h3 className="text-xl font-extrabold text-lake-blue mb-2">
                    {site.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {site.locationLabel}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    {site.summary}
                  </p>
                  <p className="text-sm font-bold text-coral">Details →</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold text-lake-blue">
            Launch-only sites
          </h2>
          <p className="text-gray-700 max-w-3xl">
            Bring your own allowed craft. Access types and allowed watercraft
            below match the FPDCC listing for each site.
          </p>
          <ul className="space-y-4">
            {launchOnly.map((site) => (
              <li
                key={site.slug}
                className="rounded-2xl border border-sky-blue/20 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-coral mb-1">
                      {site.county} County · Launch
                    </p>
                    <h3 className="text-xl font-extrabold text-lake-blue">
                      <Link
                        href={`/forest-preserves/${site.slug}`}
                        className="hover:underline"
                      >
                        {site.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {site.locationLabel}
                    </p>
                  </div>
                  <Link
                    href={`/forest-preserves/${site.slug}`}
                    className="text-sm font-bold text-coral hover:underline"
                  >
                    Open →
                  </Link>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {site.summary}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Access:{" "}
                  {site.accessKinds.map(preserveAccessLabel).join(" · ")}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  Listed craft:{" "}
                  {site.allowedCraft.map(preserveCraftLabel).join(", ")}
                </p>
                <p className="text-sm">
                  <SourceLink source={site.source} />
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="max-w-3xl rounded-2xl bg-light-blue/50 border border-sky-blue/20 p-6 space-y-2">
          <h2 className="text-lg font-extrabold text-lake-blue">
            More counties coming
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            This hub starts with Cook County because FPDCC publishes a clear
            public boating inventory. DuPage, Lake, Will, Kane, and McHenry
            preserve waters will be added as each district&apos;s official
            launch and rental pages are verified the same way — no thin
            placeholders.
          </p>
        </section>

        <ResourceCrossLinks
          links={[
            { href: "/boat-launches", label: "Lakefront & municipal launches" },
            { href: "/lakes", label: "Lakes & waterways" },
            { href: "/destinations", label: "Destinations" },
            { href: "/tools/trip-checklist", label: "Trip checklist" },
            { href: "/weather", label: "Weather" },
            { href: "/guides", label: "Guides" },
          ]}
        />
      </div>
    </>
  );
}
