import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ExploreRegionCards } from "./ExploreRegionCards";

export function RegionalDiscovery() {
  return (
    <section>
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
          Explore Boating Around Chicago
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Harbors, launches, and lakes within reach of the city — from the
          Chicago lakefront to Wisconsin, Indiana, and southwest Michigan. Every
          listing links back to the official source.
        </p>
      </Reveal>

      <Reveal>
        <ExploreRegionCards />
      </Reveal>

      <div className="mt-6 flex flex-wrap gap-3">
        {[
          { href: "/destinations", label: "All destinations" },
          { href: "/marinas", label: "Marinas" },
          { href: "/boat-launches", label: "Boat launches" },
          { href: "/lakes", label: "Lakes & waterways" },
          { href: "/events", label: "Events" },
        ].map((link) => (
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
