import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ExploreRegionCards } from "@/components/geo/ExploreRegionCards";

const HUB_LINKS = [
  { href: "/destinations", label: "Destinations" },
  { href: "/lakes", label: "Lakes & waterways" },
  { href: "/marinas", label: "Marinas" },
  { href: "/boat-launches", label: "Boat launches" },
];

const PLAN_DAY_DESTINATIONS = [
  { href: "/destinations/chicago", label: "Chicago" },
  { href: "/destinations/lake-geneva", label: "Lake Geneva" },
  { href: "/destinations/chain-o-lakes", label: "Chain O'Lakes" },
  { href: "/destinations/waukegan", label: "Waukegan" },
  { href: "/destinations/winthrop-harbor", label: "Winthrop Harbor" },
  { href: "/destinations/kenosha", label: "Kenosha" },
  { href: "/destinations/racine", label: "Racine" },
  { href: "/destinations/milwaukee", label: "Milwaukee" },
  { href: "/destinations/michigan-city", label: "Michigan City" },
  { href: "/destinations/new-buffalo", label: "New Buffalo" },
];

/** Combined destinations / lakes / marinas / launches discovery for the homepage. */
export function ExploreBoating() {
  return (
    <section id="explore-boating">
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
          Explore Boating &amp; Plan a Day
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl">
          Destinations, lakes, marinas, and launches around Chicago and southern
          Lake Michigan — with Plan Your Day flows on each destination page.
        </p>
      </Reveal>

      <Reveal>
        <ExploreRegionCards />
      </Reveal>

      <div className="mt-6">
        <p className="text-sm font-bold text-lake-blue mb-3">
          Plan a boating day
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {PLAN_DAY_DESTINATIONS.map((link) => (
            <Link
              key={link.href}
              href={`${link.href}#plan-your-day`}
              className="px-3 py-1.5 bg-white border border-sky-blue/30 text-lake-blue font-semibold text-sm rounded-full hover:bg-light-blue transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {HUB_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 bg-light-blue text-lake-blue font-semibold text-sm rounded-full hover:bg-sky-blue/20 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
