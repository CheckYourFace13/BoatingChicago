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
import type { PreserveWaterAccess } from "@/types/geo";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Forest Preserve Boating Near Chicago | Cook & Lake County Waters",
    description:
      "Verified forest-preserve launches and rental waters near Chicago — Cook County FPDCC lakes and Lake County paddling sites — from official forest-preserve sources.",
    path: "/forest-preserves",
  });
}

const COUNTY_ORDER = ["Cook", "Lake"];

function groupByCounty(sites: PreserveWaterAccess[]) {
  const map = new Map<string, PreserveWaterAccess[]>();
  for (const site of sites) {
    const list = map.get(site.county) ?? [];
    list.push(site);
    map.set(site.county, list);
  }
  const ordered = COUNTY_ORDER.filter((c) => map.has(c)).map((county) => ({
    county,
    sites: (map.get(county) ?? []).slice().sort((a, b) => {
      if (a.hasRentals !== b.hasRentals) return a.hasRentals ? -1 : 1;
      return a.name.localeCompare(b.name);
    }),
  }));
  for (const [county, list] of map) {
    if (!COUNTY_ORDER.includes(county)) {
      ordered.push({
        county,
        sites: list.slice().sort((a, b) => a.name.localeCompare(b.name)),
      });
    }
  }
  return ordered;
}

export default function ForestPreservesPage() {
  const sites = getPublishedPreserveAccess();
  const byCounty = groupByCounty(sites);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Forest preserves", path: "/forest-preserves" },
        ]}
      />

      <GeoHero
        eyebrow={`${sites.length} verified preserve waters`}
        title="Forest Preserve Boating Near Chicago"
        intro="Suburban lakes and river landings managed by county forest-preserve districts — Cook County rentals and launches, plus Lake County paddling lakes. Agency rules differ by district; confirm craft limits on the official page before you go."
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
            These pages summarize what each forest-preserve district publishes
            about launches and rentals. Rules are not interchangeable: Cook
            County FPDCC prohibits gasoline motors on its lakes and lists
            stand-up paddleboards among prohibited flotation devices on FPDCC
            waterbodies, while Lake County Forest Preserves allows cartop /
            non-motorized craft (including paddleboards) and electric trolling
            motors on its inland lakes.
          </p>
          <p>
            Fees, hours, and seasonal closures change — use the cited source
            before you hitch up. For Fox River motorized launching in Lake
            County, see the{" "}
            <Link
              href="/boat-launches/fox-river-forest-preserve-launch"
              className="font-semibold text-coral hover:underline"
            >
              Fox River Forest Preserve launch
            </Link>{" "}
            (fee required) on the public launches index.
          </p>
        </section>

        {byCounty.map(({ county, sites: countySites }) => {
          const rentalSites = countySites.filter((s) => s.hasRentals);
          const launchOnly = countySites.filter((s) => !s.hasRentals);
          return (
            <section key={county} className="space-y-8" id={county.toLowerCase()}>
              <h2 className="text-3xl font-extrabold text-lake-blue">
                {county} County
              </h2>

              {rentalSites.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-extrabold text-lake-blue">
                    Rental centers
                  </h3>
                  <ul className="grid gap-4 md:grid-cols-2">
                    {rentalSites.map((site) => (
                      <li key={site.slug}>
                        <Link
                          href={`/forest-preserves/${site.slug}`}
                          className="block h-full rounded-2xl border border-sky-blue/25 bg-white p-6 hover:border-sky-blue/50 hover:shadow-md transition-all"
                        >
                          <p className="text-xs font-bold uppercase tracking-widest text-coral mb-2">
                            Rentals
                          </p>
                          <h4 className="text-xl font-extrabold text-lake-blue mb-2">
                            {site.name}
                          </h4>
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
                </div>
              ) : null}

              {launchOnly.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-extrabold text-lake-blue">
                    Launch sites
                  </h3>
                  <ul className="space-y-4">
                    {launchOnly.map((site) => (
                      <li
                        key={site.slug}
                        className="rounded-2xl border border-sky-blue/20 bg-white p-6 shadow-sm"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                          <div>
                            <h4 className="text-xl font-extrabold text-lake-blue">
                              <Link
                                href={`/forest-preserves/${site.slug}`}
                                className="hover:underline"
                              >
                                {site.name}
                              </Link>
                            </h4>
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
                </div>
              ) : null}
            </section>
          );
        })}

        <section className="max-w-3xl rounded-2xl bg-light-blue/50 border border-sky-blue/20 p-6 space-y-2">
          <h2 className="text-lg font-extrabold text-lake-blue">
            More counties coming
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            DuPage, Will, Kane, and McHenry preserve waters will be added as each
            district&apos;s official launch and rental pages are verified the
            same way — no thin placeholders.
          </p>
        </section>

        <ResourceCrossLinks
          links={[
            { href: "/boat-launches", label: "Lakefront & municipal launches" },
            { href: "/lakes", label: "Lakes & waterways" },
            { href: "/destinations/chain-o-lakes", label: "Chain O' Lakes" },
            { href: "/destinations", label: "Destinations" },
            { href: "/tools/trip-checklist", label: "Trip checklist" },
            { href: "/weather", label: "Weather" },
          ]}
        />
      </div>
    </>
  );
}
