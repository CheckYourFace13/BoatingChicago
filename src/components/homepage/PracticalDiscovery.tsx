import { HomepageTrackLink } from "@/components/HomepageTrackLink";

const ACTIONS = [
  {
    href: "/marinas",
    title: "Find a Marina",
    blurb: "Chicago harbors and southern Lake Michigan marinas with official links.",
  },
  {
    href: "/boat-launches",
    title: "Find a Boat Launch",
    blurb: "Public ramps for trailering — fees stay on the agency source page.",
  },
  {
    href: "/lakes",
    title: "Explore Lakes",
    blurb: "Open lake, inland chain, and Geneva Lake waterway overviews.",
  },
  {
    href: "/destinations",
    title: "Explore Harbors & Towns",
    blurb: "Destination guides from the Chicago lakefront to nearby coasts.",
  },
] as const;

export function PracticalDiscovery() {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
          Marinas, Launches &amp; Lakes
        </h2>
        <p className="text-gray-600 max-w-2xl">
          Practical boating information first — where to dock, launch, and which
          water you&apos;re actually using.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ACTIONS.map((item) => (
          <HomepageTrackLink
            key={item.href}
            href={item.href}
            event="homepage_resource_click"
            params={{ resource: item.title }}
            className="rounded-2xl bg-lake-blue text-white p-6 hover:bg-lake-blue/95 transition-colors"
          >
            <p className="text-xl font-extrabold mb-2">{item.title} →</p>
            <p className="text-white/85 text-sm leading-relaxed">{item.blurb}</p>
          </HomepageTrackLink>
        ))}
      </div>
    </section>
  );
}
