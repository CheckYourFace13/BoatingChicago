import Link from "next/link";
import type { Destination } from "@/types/geo";
import type { Marina } from "@/types/geo";
import type { BoatLaunch } from "@/types/geo";
import type { CategoryPage, GuidePage } from "@/types";

/**
 * Planning module connecting weather → access → activities → bookable options.
 * Does not invent safety conclusions from our informational weather rating.
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
  const steps: {
    title: string;
    blurb: string;
    links: { href: string; label: string }[];
  }[] = [
    {
      title: "1. Check conditions",
      blurb:
        "Review live marine weather and official NOAA/NWS products before you go. Our site rating is informational only — official forecasts remain authoritative.",
      links: [
        { href: weatherHref, label: "Local marine weather →" },
        { href: "/weather", label: "Full weather hub →" },
      ],
    },
    {
      title: "2. Where to launch or dock",
      blurb:
        marinas.length || launches.length
          ? "Verified harbors and public launches for this area — amenity details and fees are confirmed on the official operator pages."
          : "Browse the regional marina and launch directories, then verify access rules with the operating agency.",
      links: [
        ...(marinas.slice(0, 3).map((m) => ({
          href: `/marinas/${m.slug}`,
          label: m.name,
        })) || []),
        ...(launches.slice(0, 2).map((l) => ({
          href: `/boat-launches/${l.slug}`,
          label: l.name,
        })) || []),
        ...(marinas.length === 0 && launches.length === 0
          ? [
              { href: "/marinas", label: "Marinas directory →" },
              { href: "/boat-launches", label: "Boat launches →" },
            ]
          : [
              { href: "/marinas", label: "All marinas →" },
              { href: "/boat-launches", label: "All launches →" },
            ]),
      ],
    },
    {
      title: "3. What to do",
      blurb:
        "Use destination highlights and local guides for planning context — not as a substitute for operator rules or marine forecasts.",
      links: [
        ...guides.slice(0, 3).map((g) => ({
          href: `/${g.slug}`,
          label: g.title,
        })),
        ...categories.slice(0, 2).map((c) => ({
          href: `/${c.slug}`,
          label: c.title,
        })),
        { href: "/guides", label: "All guides →" },
        { href: "/events", label: "Events →" },
      ],
    },
  ];

  if (showExperiences) {
    steps.push({
      title: "4. Book an experience (optional)",
      blurb:
        "Ticketed cruises and rentals from GetYourGuide or Viator when you want a ready-to-book outing. These are affiliate booking options — not BoatingChicago-operated trips.",
      links: [
        { href: "#book-an-experience", label: "Popular nearby experiences ↓" },
        { href: "/chicago-architecture-cruises", label: "Architecture cruises →" },
        { href: "/boat-rentals-chicago", label: "Rentals & charters hub →" },
      ],
    });
  }

  return (
    <section
      id="plan-your-day"
      className="rounded-3xl border border-sky-blue/25 bg-gradient-to-br from-light-blue/50 via-white to-white p-6 md:p-8 scroll-mt-24"
    >
      <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
        Plan Your Day in {destination.name}
      </h2>
      <p className="text-gray-600 max-w-3xl mb-6 leading-relaxed">
        A practical flow from conditions to access to activities — using pages
        already on BoatingChicago. Always verify fees, hours, and marine
        conditions with official sources before you cast off.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((step) => (
          <div
            key={step.title}
            className="rounded-2xl border border-sky-blue/20 bg-white p-5"
          >
            <h3 className="font-extrabold text-lake-blue mb-2">{step.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              {step.blurb}
            </p>
            <ul className="space-y-1.5">
              {step.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-coral hover:underline"
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
