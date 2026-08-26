import { HomepageTrackLink } from "@/components/HomepageTrackLink";

const TOOLS = [
  {
    href: "/lakes",
    label: "Lakes",
    blurb: "Lake Michigan, the Chain, Geneva Lake, and inland waterways.",
  },
  {
    href: "/marinas",
    label: "Marinas",
    blurb: "Verified harbors with official sources and amenity notes.",
  },
  {
    href: "/boat-launches",
    label: "Boat Launches",
    blurb: "Public ramps near Chicago with agency links for fees.",
  },
  {
    href: "/destinations",
    label: "Destinations",
    blurb: "Harbor towns and lakes within reach of the city.",
  },
  {
    href: "/weather",
    label: "Weather",
    blurb: "Live conditions for Chicago and southern Lake Michigan.",
  },
  {
    href: "/news",
    label: "News",
    blurb: "Source-cited updates that matter to local boaters.",
  },
  {
    href: "/events",
    label: "Events",
    blurb: "Fireworks, harbor season, shows, and seasonal dates.",
  },
  {
    href: "/guides",
    label: "Guides",
    blurb: "Evergreen how-to and harbor guides for the region.",
  },
] as const;

export function BoatingResourceTools() {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
          Boating Resources
        </h2>
        <p className="text-gray-600 max-w-2xl">
          The primary tools on BoatingChicago — start here when you need facts,
          conditions, or a place to go.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {TOOLS.map((tool) => (
          <HomepageTrackLink
            key={tool.href}
            href={tool.href}
            event="homepage_resource_click"
            params={{ resource: tool.label.toLowerCase() }}
            className="rounded-2xl border border-sky-blue/25 bg-white p-4 sm:p-5 hover:border-sky-blue/50 hover:shadow-md transition-all group"
          >
            <p className="font-extrabold text-lake-blue group-hover:text-coral transition-colors mb-1">
              {tool.label}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {tool.blurb}
            </p>
          </HomepageTrackLink>
        ))}
      </div>
    </section>
  );
}
