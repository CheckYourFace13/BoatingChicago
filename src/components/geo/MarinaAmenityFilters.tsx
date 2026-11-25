import Link from "next/link";
import type { Destination, Marina } from "@/types/geo";
import { amenityLabel, regionLabel } from "@/lib/geo-display";
import { SourceLink } from "@/components/geo/SourceAttribution";
import {
  MARINA_FILTER_AMENITIES,
  MARINA_STATE_FILTERS,
  marinaFilterHref,
  type MarinaFilterAmenity,
  type MarinaStateFilter,
  type WaterKindFilter,
} from "@/lib/marina-filters";

type Group = {
  destination: Destination;
  marinas: Marina[];
};

function Chip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`text-sm font-semibold px-3 py-1.5 rounded-full border transition-colors ${
        active
          ? "bg-lake-blue text-white border-lake-blue"
          : "bg-white text-lake-blue border-sky-blue/30 hover:bg-light-blue"
      }`}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

/**
 * Shareable amenity filters. Unknown amenities never match — only available === true.
 */
export function MarinaAmenityFilters({
  groups,
  water,
  amenity,
  state = "all",
  totalCount,
}: {
  groups: Group[];
  water: WaterKindFilter;
  amenity: MarinaFilterAmenity | null;
  state?: MarinaStateFilter;
  totalCount: number;
}) {
  const visibleCount = groups.reduce((n, g) => n + g.marinas.length, 0);

  return (
    <div className="space-y-10">
      <section
        aria-label="Filter marinas by confirmed amenities"
        className="rounded-2xl border border-sky-blue/20 bg-white p-4 md:p-5"
      >
        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
          Filters show only amenities{" "}
          <strong className="font-semibold text-lake-blue">
            confirmed on the operator&apos;s page
          </strong>
          . Unknown stays hidden — not “no.” Filtered views are shareable and
          not indexed as separate pages.
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          <Chip
            href={marinaFilterHref(water, null, state)}
            active={amenity === null}
          >
            Any amenity
          </Chip>
          {MARINA_FILTER_AMENITIES.map((key) => (
            <Chip
              key={key}
              href={marinaFilterHref(
                water,
                amenity === key ? null : key,
                state,
              )}
              active={amenity === key}
            >
              {amenityLabel(key)}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {MARINA_STATE_FILTERS.map((item) => (
            <Chip
              key={item.id}
              href={marinaFilterHref(water, amenity, item.id)}
              active={state === item.id}
            >
              {item.label}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip
            href={marinaFilterHref("all", amenity, state)}
            active={water === "all"}
          >
            All waters
          </Chip>
          <Chip
            href={marinaFilterHref("lake-michigan", amenity, state)}
            active={water === "lake-michigan"}
          >
            Lake Michigan
          </Chip>
          <Chip
            href={marinaFilterHref("inland", amenity, state)}
            active={water === "inland"}
          >
            Inland lakes / chain
          </Chip>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Showing {visibleCount} of {totalCount} verified marinas
          {amenity ? ` with confirmed ${amenityLabel(amenity).toLowerCase()}` : ""}
          {water === "lake-michigan"
            ? " on Lake Michigan"
            : water === "inland"
              ? " on inland lakes or the Fox River chain"
              : ""}
          .
        </p>
      </section>

      {groups.length === 0 ? (
        <p className="text-gray-600">
          No marinas match these confirmed filters.{" "}
          <Link href="/marinas" className="font-semibold text-coral hover:underline">
            Clear filters
          </Link>{" "}
          or check the operator source — many amenities remain unknown in our
          directory.
        </p>
      ) : (
        groups.map(({ destination, marinas }) => (
          <section key={destination.slug} id={destination.slug}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue">
                <Link
                  href={`/destinations/${destination.slug}`}
                  className="hover:underline"
                >
                  {destination.name}, {destination.state}
                </Link>
              </h2>
              <p className="text-sm text-gray-500">
                {regionLabel(destination.region)} · {destination.bodyOfWater}
              </p>
            </div>

            <ul className="space-y-4">
              {marinas.map((marina) => {
                const confirmed = marina.amenities.filter((a) => a.available === true);
                return (
                  <li
                    key={marina.slug}
                    className="rounded-2xl border border-sky-blue/20 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-extrabold text-lake-blue mb-1">
                      <Link href={`/marinas/${marina.slug}`} className="hover:underline">
                        {marina.name}
                      </Link>
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-3">{marina.summary}</p>
                    {confirmed.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {confirmed.slice(0, 8).map((a) => (
                          <span
                            key={a.key}
                            className="text-xs font-semibold px-3 py-1 rounded-full bg-light-blue text-lake-blue"
                          >
                            {amenityLabel(a.key)}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    {marina.feesNote ? (
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-semibold text-lake-blue">Fees: </span>
                        {marina.feesNote}
                      </p>
                    ) : null}
                    {marina.seasonalAccessNote ? (
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-semibold text-lake-blue">Season: </span>
                        {marina.seasonalAccessNote}
                      </p>
                    ) : null}
                    <p className="text-sm">
                      <SourceLink source={marina.source} />
                      {marina.officialWebsite ? (
                        <>
                          {" · "}
                          <a
                            href={marina.officialWebsite}
                            className="font-semibold text-coral hover:underline"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            Operator site
                          </a>
                        </>
                      ) : null}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
