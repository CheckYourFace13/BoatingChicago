"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Destination, Marina } from "@/types/geo";
import { amenityLabel, regionLabel } from "@/lib/geo-display";
import { SourceLink } from "@/components/geo/SourceAttribution";

/** Only amenities with enough confirmed-true rows to make a useful filter. */
export const MARINA_FILTER_AMENITIES = [
  "fuel",
  "pump-out",
  "transient-dockage",
  "boat-launch",
] as const;

export type MarinaFilterAmenity = (typeof MARINA_FILTER_AMENITIES)[number];

export type WaterKindFilter = "all" | "lake-michigan" | "inland";

type Group = {
  destination: Destination;
  marinas: Marina[];
};

function hasConfirmedAmenity(marina: Marina, key: MarinaFilterAmenity): boolean {
  return marina.amenities.some((a) => a.key === key && a.available === true);
}

function waterKind(destination: Destination): "lake-michigan" | "inland" {
  return /lake michigan/i.test(destination.bodyOfWater)
    ? "lake-michigan"
    : "inland";
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`text-sm font-semibold px-3 py-1.5 rounded-full border transition-colors ${
        active
          ? "bg-lake-blue text-white border-lake-blue"
          : "bg-white text-lake-blue border-sky-blue/30 hover:bg-light-blue"
      }`}
    >
      {children}
    </button>
  );
}

/**
 * Compact client filters for operator-confirmed marina amenities.
 * Unknown amenities never match — only available === true.
 */
export function MarinaAmenityFilters({ groups }: { groups: Group[] }) {
  const [amenity, setAmenity] = useState<MarinaFilterAmenity | null>(null);
  const [water, setWater] = useState<WaterKindFilter>("all");

  const filtered = useMemo(() => {
    return groups
      .map(({ destination, marinas }) => {
        if (water !== "all" && waterKind(destination) !== water) {
          return { destination, marinas: [] as Marina[] };
        }
        const next = amenity
          ? marinas.filter((m) => hasConfirmedAmenity(m, amenity))
          : marinas;
        return { destination, marinas: next };
      })
      .filter((g) => g.marinas.length > 0);
  }, [groups, amenity, water]);

  const visibleCount = filtered.reduce((n, g) => n + g.marinas.length, 0);
  const totalCount = groups.reduce((n, g) => n + g.marinas.length, 0);

  return (
    <div className="space-y-10">
      <section
        aria-label="Filter marinas by confirmed amenities"
        className="rounded-2xl border border-sky-blue/20 bg-white p-4 md:p-5"
      >
        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
          Filters show only amenities{" "}
          <strong className="font-semibold text-lake-blue">confirmed on the operator&apos;s page</strong>
          . Unknown stays hidden — not “no.” On-site amenity chips are not nearby-service claims.
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          <FilterChip
            active={amenity === null}
            onClick={() => setAmenity(null)}
          >
            Any amenity
          </FilterChip>
          {MARINA_FILTER_AMENITIES.map((key) => (
            <FilterChip
              key={key}
              active={amenity === key}
              onClick={() => setAmenity(amenity === key ? null : key)}
            >
              {amenityLabel(key)}
            </FilterChip>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={water === "all"}
            onClick={() => setWater("all")}
          >
            All waters
          </FilterChip>
          <FilterChip
            active={water === "lake-michigan"}
            onClick={() => setWater("lake-michigan")}
          >
            Lake Michigan
          </FilterChip>
          <FilterChip
            active={water === "inland"}
            onClick={() => setWater("inland")}
          >
            Inland lakes / chain
          </FilterChip>
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

      {filtered.length === 0 ? (
        <p className="text-gray-600">
          No marinas match these confirmed filters. Clear a filter or check the
          operator source — many amenities remain unknown in our directory.
        </p>
      ) : (
        filtered.map(({ destination, marinas }) => (
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
                const confirmed = marina.amenities.filter(
                  (a) => a.available === true,
                );
                return (
                  <li
                    key={marina.slug}
                    className="rounded-2xl border border-sky-blue/20 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-extrabold text-lake-blue mb-1">
                      <Link
                        href={`/marinas/${marina.slug}`}
                        className="hover:underline"
                      >
                        {marina.name}
                      </Link>
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {marina.summary}
                    </p>
                    {confirmed.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {confirmed.slice(0, 6).map((a) => (
                          <span
                            key={a.key}
                            className="text-xs font-semibold px-3 py-1 rounded-full bg-light-blue text-lake-blue"
                          >
                            {amenityLabel(a.key)}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <p className="text-sm">
                      <SourceLink source={marina.source} />
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
