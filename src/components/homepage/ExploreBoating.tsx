import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ExploreRegionCards } from "@/components/geo/ExploreRegionCards";

const HUB_LINKS = [
  { href: "/destinations", label: "Destinations" },
  { href: "/lakes", label: "Lakes & waterways" },
  { href: "/marinas", label: "Marinas" },
  { href: "/boat-launches", label: "Boat launches" },
];

/** Combined destinations / lakes / marinas / launches discovery for the homepage. */
export function ExploreBoating() {
  return (
    <section id="explore-boating">
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
          Explore Boating
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl">
          Destinations, lakes, marinas, and launches around Chicago and southern
          Lake Michigan — every listing links back to official sources.
        </p>
      </Reveal>

      <Reveal>
        <ExploreRegionCards />
      </Reveal>

      <div className="mt-6 flex flex-wrap gap-3">
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
    </section>
  );
}
