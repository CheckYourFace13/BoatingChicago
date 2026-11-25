import Link from "next/link";
import type { Destination } from "@/types/geo";
import type { Marina } from "@/types/geo";
import type { BoatLaunch } from "@/types/geo";
import type { CategoryPage, GuidePage } from "@/types";

/**
 * Compact planning strip: conditions → access → tools → local guides.
 * Does not invent safety conclusions from weather snapshots.
 */
export function PlanYourDay({
  destination,
  marinas,
  launches,
  guides,
  categories,
  showExperiences = false,
}: {
  destination: Destination;
  marinas: Marina[];
  launches: BoatLaunch[];
  guides: GuidePage[];
  categories: CategoryPage[];
  showExperiences?: boolean;
}) {
  const weatherHref = `/weather?location=${destination.weatherLocationId}`;
  const accessLinks = [
    ...marinas.slice(0, 2).map((m) => ({
      href: `/marinas/${m.slug}`,
      label: m.name,
    })),
    ...launches.slice(0, 2).map((l) => ({
      href: `/boat-launches/${l.slug}`,
      label: l.name,
    })),
  ];
  if (accessLinks.length === 0) {
    accessLinks.push(
      { href: "/marinas", label: "Marinas" },
      { href: "/boat-launches", label: "Launches" },
    );
  }

  const rows: { label: string; links: { href: string; label: string }[] }[] = [
    {
      label: "Conditions",
      links: [
        { href: weatherHref, label: "Local NOAA/NWS" },
        ...(destination.slug === "oshkosh" || destination.bodyOfWater.includes("Winnebago")
          ? [
              {
                href: "/lakes/lake-winnebago",
                label: "Lake Winnebago hub",
              },
              {
                href: `${weatherHref}#river-levels`,
                label: "USGS Winnebago / Fox gages",
              },
            ]
          : []),
        ...(destination.region === "wisconsin" &&
        (destination.slug === "door-county" ||
          destination.slug === "sturgeon-bay" ||
          destination.slug === "green-bay" ||
          destination.slug === "kewaunee")
          ? [
              {
                href: "/tools/fuel",
                label: "Fuel planner",
              },
              {
                href: "/tools/float-plan",
                label: "Float plan",
              },
            ]
          : []),
        { href: "/permits", label: "Rules & permits" },
      ],
    },
    {
      label: "Access",
      links: [
        ...accessLinks,
        { href: "/kayak-canoe-sup", label: "Kayak & SUP" },
      ],
    },
    {
      label: "Tools",
      links: [
        { href: "/tools/fuel", label: "Fuel" },
        { href: "/tools/trip-time", label: "Trip time" },
        { href: "/tools/trip-checklist", label: "Checklist" },
        { href: "/tools/float-plan", label: "Float plan" },
        { href: "/tools", label: "All 10 tools" },
      ],
    },
    {
      label: "Guides",
      links: [
        ...guides.slice(0, 2).map((g) => ({
          href: `/${g.slug}`,
          label: g.title,
        })),
        { href: "/tools/slip-compare", label: "Slip compare" },
        { href: "/guides", label: "All guides" },
      ],
    },
  ];

  if (showExperiences || categories.length > 0) {
    rows.push({
      label: "More",
      links: [
        ...categories.slice(0, 2).map((c) => ({
          href: `/${c.slug}`,
          label: c.title,
        })),
        ...(showExperiences
          ? [{ href: "#book-an-experience", label: "Bookable experiences" }]
          : []),
        { href: "/events", label: "Events" },
        { href: "/regions", label: "Regions" },
      ],
    });
  }

  return (
    <section
      id="plan-your-day"
      className="rounded-3xl border border-sky-blue/25 bg-gradient-to-br from-light-blue/50 via-white to-white p-5 md:p-6 scroll-mt-24"
    >
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-lake-blue">
            Plan a day in {destination.name}
          </h2>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Official conditions and access first. Calculators use numbers you
            enter — they do not invent routes or a safe-to-go rating.
          </p>
        </div>
        <Link
          href="/tools"
          className="text-sm font-bold text-coral hover:underline shrink-0"
        >
          Planning tools →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="rounded-xl border border-sky-blue/20 bg-white px-4 py-3"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-lake-blue/70 mb-2">
              {row.label}
            </p>
            <ul className="space-y-1">
              {row.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-lake-blue hover:text-coral hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
