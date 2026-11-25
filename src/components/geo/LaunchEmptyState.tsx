import Link from "next/link";
import type { BoatLaunch } from "@/types/geo";
import {
  accessLabel,
  filterHref,
  getAlternateOptions,
  waterLabel,
  type AccessFilter,
  type WaterFilter,
} from "@/lib/launch-filters";

function Chip({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-lake-blue border border-sky-blue/30 hover:bg-light-blue/70"
    >
      {children}
    </Link>
  );
}

/**
 * Shown when the waterbody + access filters match no published launch.
 * Explains which filters are active, offers one-click ways to relax each,
 * and routes to adjacent verified resources instead of a dead end.
 */
export function LaunchEmptyState({
  launches,
  water,
  access,
}: {
  launches: BoatLaunch[];
  water: WaterFilter;
  access: AccessFilter;
}) {
  const { keepWater, keepAccess } = getAlternateOptions(launches, water, access);
  const taggedAccess = launches.filter((l) => l.accessMode).length;
  const activeBoth = water !== "all" && access !== "all";

  return (
    <section
      aria-labelledby="launch-empty-title"
      className="rounded-2xl border border-sky-blue/30 bg-light-blue/40 p-6 sm:p-8 space-y-6"
    >
      <div className="space-y-2">
        <h2
          id="launch-empty-title"
          className="text-2xl font-extrabold text-lake-blue"
        >
          No verified launches match these filters
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {activeBoth
            ? `None of our ${launches.length} verified launches are both on ${waterLabel(water)} and tagged “${accessLabel(access)}”.`
            : water !== "all"
              ? `We don’t have a verified launch listed on ${waterLabel(water)} yet.`
              : `None of our verified launches are tagged “${accessLabel(access)}”.`}{" "}
          Access tags are only applied when the operating agency’s page
          classifies the ramp ({taggedAccess} of {launches.length} are tagged),
          so an untagged ramp can still serve that craft — open its listing and
          check the official page.
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-bold uppercase tracking-wide text-coral">
          Your filters
        </p>
        <div className="flex flex-wrap gap-2">
          {water !== "all" ? (
            <Chip href={filterHref("all", access)}>
              Waterbody: {waterLabel(water)} <span aria-hidden="true">✕</span>
              <span className="sr-only">remove waterbody filter</span>
            </Chip>
          ) : null}
          {access !== "all" ? (
            <Chip href={filterHref(water, "all")}>
              Access: {accessLabel(access)} <span aria-hidden="true">✕</span>
              <span className="sr-only">remove access filter</span>
            </Chip>
          ) : null}
          <Link
            href="/boat-launches"
            className="inline-flex items-center rounded-full bg-lake-blue px-3 py-1.5 text-sm font-bold text-white hover:bg-lake-blue/90"
          >
            Show all {launches.length} launches
          </Link>
        </div>
      </div>

      {keepWater.length > 0 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold uppercase tracking-wide text-coral">
            Same waterbody, different access
          </p>
          <div className="flex flex-wrap gap-2">
            {keepWater.map((opt) => (
              <Chip key={opt.href} href={opt.href}>
                {opt.label} ({opt.count})
              </Chip>
            ))}
          </div>
        </div>
      ) : null}

      {keepAccess.length > 0 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold uppercase tracking-wide text-coral">
            Same access, different waterbody
          </p>
          <div className="flex flex-wrap gap-2">
            {keepAccess.map((opt) => (
              <Chip key={opt.href} href={opt.href}>
                {opt.label} ({opt.count})
              </Chip>
            ))}
          </div>
        </div>
      ) : null}

      <div className="space-y-2">
        <p className="text-sm font-bold uppercase tracking-wide text-coral">
          Other places to look
        </p>
        <ul className="grid gap-2 text-sm sm:grid-cols-2">
          <li>
            <Link
              href="/forest-preserves"
              className="font-semibold text-coral hover:underline"
            >
              Forest-preserve landings
            </Link>{" "}
            — electric-only and carry-in lakes and rivers.
          </li>
          <li>
            <Link
              href="/marinas"
              className="font-semibold text-coral hover:underline"
            >
              Marinas &amp; harbors
            </Link>{" "}
            — some list a launch ramp as a confirmed amenity.
          </li>
          <li>
            <Link
              href="/lakes"
              className="font-semibold text-coral hover:underline"
            >
              Lakes &amp; waterways
            </Link>{" "}
            — waterway overviews with official links.
          </li>
          <li>
            <Link
              href="/search?q=launch"
              className="font-semibold text-coral hover:underline"
            >
              Search the site
            </Link>{" "}
            — launches, preserves, and guides in one place.
          </li>
          <li>
            <a
              href="https://www.chicagoparkdistrict.com/facilities/boat-launches"
              className="font-semibold text-coral hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chicago Park District launch directory
            </a>{" "}
            — the agency’s own full list.
          </li>
          <li>
            <Link
              href="/chicago-area-inland-paddling-guide"
              className="font-semibold text-coral hover:underline"
            >
              Inland paddling guide
            </Link>{" "}
            — where to put in without a trailer.
          </li>
        </ul>
      </div>
    </section>
  );
}
