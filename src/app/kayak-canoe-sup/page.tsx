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
import {
  PADDLE_KIND_FILTERS,
  matchesPaddleKind,
  paddleHref,
  parsePaddleKind,
} from "@/lib/paddle-filters";
import type { PreserveWaterAccess } from "@/types/geo";

function preserveHref(site: PreserveWaterAccess): string {
  if (site.standalonePage === false && site.redirectTo) return site.redirectTo;
  return `/forest-preserves/${site.slug}`;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string; county?: string }>;
}) {
  const params = await searchParams;
  const filtered = parsePaddleKind(params.kind) !== "all" || Boolean(params.county);
  return buildManagedMetadata({
    title: "Kayak, Canoe & SUP Near Chicago | Forest Preserves & Inland Waters",
    description:
      "Find verified kayak, canoe, SUP, pedal-boat, and rental waters across Chicagoland and inland waters within about 400 driving miles — forest preserves, lakes, and rivers with official sources.",
    path: "/kayak-canoe-sup",
    noIndex: filtered,
  });
}

export default async function KayakCanoeSupPage({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string; county?: string }>;
}) {
  const params = await searchParams;
  const kind = parsePaddleKind(params.kind);
  const county = params.county?.trim() || "all";
  const sites = getPublishedPreserveAccess().filter((site) => {
    if (county !== "all" && site.county.toLowerCase() !== county.toLowerCase()) {
      return false;
    }
    return matchesPaddleKind(site, kind);
  });
  const counties = Array.from(
    new Set(getPublishedPreserveAccess().map((s) => s.county)),
  ).sort();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Kayak, canoe & SUP", path: "/kayak-canoe-sup" },
        ]}
      />
      <GeoHero
        eyebrow="Paddling discovery"
        title="Kayak, canoe, SUP, and pedal-boat waters near Chicago"
        intro="County forest-preserve and conservation-district sites verified from official pages. Motor, SUP, and rental rules differ by district — unknown stays unknown. Powerboat ramps live on the launch finder."
        links={[
          { label: "Forest-preserve hub →", href: "/forest-preserves" },
          { label: "Inland paddling guide", href: "/chicago-area-inland-paddling-guide" },
          { label: "Boat launches", href: "/boat-launches?access=carry-in" },
          { label: "River levels", href: "/weather#river-levels" },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <QualityDisclaimer />
        <nav aria-label="Filter paddle sites" className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {PADDLE_KIND_FILTERS.map((item) => (
              <Link
                key={item.id}
                href={paddleHref(item.id, county)}
                className={
                  item.id === kind
                    ? "text-sm font-bold px-3 py-1.5 rounded-full bg-lake-blue text-white"
                    : "text-sm font-semibold px-3 py-1.5 rounded-full bg-white text-lake-blue border border-sky-blue/25"
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={paddleHref(kind, "all")}
              className={
                county === "all"
                  ? "text-sm font-bold px-3 py-1.5 rounded-full bg-coral text-white"
                  : "text-sm font-semibold px-3 py-1.5 rounded-full bg-white text-lake-blue border border-sky-blue/25"
              }
            >
              All counties
            </Link>
            {counties.map((c) => (
              <Link
                key={c}
                href={paddleHref(kind, c)}
                className={
                  county.toLowerCase() === c.toLowerCase()
                    ? "text-sm font-bold px-3 py-1.5 rounded-full bg-coral text-white"
                    : "text-sm font-semibold px-3 py-1.5 rounded-full bg-white text-lake-blue border border-sky-blue/25"
                }
              >
                {c}
              </Link>
            ))}
          </div>
        </nav>
        <p className="text-sm text-gray-600">
          Showing {sites.length} verified preserve waters. Filtered views are
          shareable and not indexed as extra pages.
        </p>
        <ul className="grid gap-4 md:grid-cols-2">
          {sites.map((site) => (
            <li
              key={site.slug}
              className="rounded-2xl border border-sky-blue/20 bg-white p-5"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-coral mb-1">
                {site.county} County
                {site.hasRentals ? " · Rentals published" : ""}
              </p>
              <h2 className="text-lg font-extrabold text-lake-blue mb-1">
                <Link href={preserveHref(site)} className="hover:underline">
                  {site.name}
                </Link>
              </h2>
              <p className="text-sm text-gray-500 mb-2">{site.locationLabel}</p>
              <p className="text-gray-700 text-sm leading-relaxed mb-2">{site.summary}</p>
              <p className="text-sm text-gray-600">
                Access: {site.accessKinds.map(preserveAccessLabel).join(" · ")}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Listed craft: {site.allowedCraft.map(preserveCraftLabel).join(", ")}
              </p>
              {site.rentalNotes ? (
                <p className="text-sm text-gray-600 mb-2">{site.rentalNotes}</p>
              ) : null}
              <p className="text-sm">
                <SourceLink source={site.source} />
              </p>
            </li>
          ))}
        </ul>
        <ResourceCrossLinks
          links={[
            { href: "/forest-preserves", label: "Forest preserves" },
            { href: "/chicago-area-inland-paddling-guide", label: "Paddling guide" },
            { href: "/boat-launches?access=non-motorized", label: "Non-motorized launches" },
            { href: "/lakes/des-plaines-river", label: "Des Plaines River" },
            { href: "/permits", label: "Rules & permits" },
            { href: "/tools/trip-checklist", label: "Trip checklist" },
            { href: "/weather", label: "Weather & river levels" },
          ]}
        />
      </div>
    </>
  );
}
