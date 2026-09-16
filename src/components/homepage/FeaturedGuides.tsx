import Link from "next/link";
import { getGuideBySlug } from "@/data/guides";
import { HomepageTrackLink } from "@/components/HomepageTrackLink";

const FEATURED_GUIDE_SLUGS = [
  "beginners-guide-boating-chicago",
  "chicago-marina-guide",
  "chicago-playpen-guide",
  "lake-michigan-boating-guide",
  "chicago-boating-faq",
  "chicago-fireworks-cruise-guide",
] as const;

const FALLBACK_LABELS: Record<string, string> = {
  "beginners-guide-boating-chicago": "Chicago Boating Guide",
  "chicago-marina-guide": "Chicago Harbor Guide",
  "chicago-playpen-guide": "Playpen Guide",
  "lake-michigan-boating-guide": "Lake Michigan Guide",
  "chicago-boating-faq": "Boating FAQ / Safety",
  "chicago-fireworks-cruise-guide": "Fireworks by Boat",
};

export function FeaturedGuides() {
  const guides = FEATURED_GUIDE_SLUGS.map((slug) => {
    const guide = getGuideBySlug(slug);
    return {
      href: `/${slug}`,
      label: guide?.title || FALLBACK_LABELS[slug] || slug,
    };
  });

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
            Essential Boating Guides
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Evergreen local guides for harbors, the Playpen, Lake Michigan, and
            getting started around Chicago.
          </p>
        </div>
        <HomepageTrackLink
          href="/guides"
          event="homepage_resource_click"
          params={{ resource: "guides-hub" }}
          className="font-bold text-coral hover:underline shrink-0"
        >
          All guides →
        </HomepageTrackLink>
      </div>
      <div className="flex flex-wrap gap-3">
        {guides.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="px-4 py-2.5 bg-white border border-sky-blue/30 text-lake-blue font-semibold text-sm rounded-full hover:bg-light-blue transition-colors"
          >
            {guide.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
