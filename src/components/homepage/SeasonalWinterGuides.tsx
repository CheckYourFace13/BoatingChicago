import Link from "next/link";
import { getGuideBySlug, WINTER_GUIDE_SLUGS } from "@/data/guides";
import { HomepageTrackLink } from "@/components/HomepageTrackLink";

/**
 * Compact seasonal strip — does not expand homepage hero or add cards clutter.
 */
export function SeasonalWinterGuides() {
  const guides = WINTER_GUIDE_SLUGS.map((slug) => {
    const guide = getGuideBySlug(slug);
    return {
      href: `/${slug}`,
      label: guide?.title || slug,
    };
  });

  return (
    <section aria-labelledby="winter-guides-heading">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
        <div>
          <h2
            id="winter-guides-heading"
            className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2"
          >
            Winter &amp; Off-Season Guides
          </h2>
          <p className="text-gray-600 max-w-2xl text-sm md:text-base">
            Storage, winterizing, shrink wrap, off-season buying, and boat-show
            prep — for owners planning through Chicago winters.
          </p>
        </div>
        <HomepageTrackLink
          href="/guides#winter-guides"
          event="homepage_resource_click"
          params={{ resource: "winter-guides" }}
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
