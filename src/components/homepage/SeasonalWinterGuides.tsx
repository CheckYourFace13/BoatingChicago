import Link from "next/link";
import {
  getGuideBySlug,
  SPRING_GUIDE_SLUGS,
  WINTER_GUIDE_SLUGS,
} from "@/data/guides";
import { HomepageTrackLink } from "@/components/HomepageTrackLink";
import { getBoatingSeason, isHaulOutPlanningWindow } from "@/lib/season";

/**
 * Compact seasonal strip — does not expand homepage hero or add cards clutter.
 * Spring: commissioning checklist. Peak: omit (hero already points to weather/marinas).
 * Winter: storage / winterizing collection.
 */
export function SeasonalWinterGuides() {
  const season = getBoatingSeason();
  const haulOut = isHaulOutPlanningWindow();
  if (season === "peak" && !haulOut) return null;

  const isSpring = season === "spring";
  const slugs = isSpring ? SPRING_GUIDE_SLUGS : WINTER_GUIDE_SLUGS;
  const guides = slugs.map((slug) => {
    const guide = getGuideBySlug(slug);
    return {
      href: `/${slug}`,
      label: guide?.title || slug,
    };
  });

  const heading = isSpring
    ? "Spring commissioning"
    : haulOut && season === "peak"
      ? "Haul-out planning"
      : "Winter & Off-Season Guides";
  const blurb = isSpring
    ? "Registration, safety gear, launch access, and conditions planning before the first warm weekend."
    : haulOut && season === "peak"
      ? "Chicago Harbors’ published season still runs through October 31; yards set their own haul-out dates. Start with the winterization hub, then confirm your operator."
      : "Storage, winterizing, shrink wrap, off-season buying, and boat-show prep — for owners planning through Chicago winters.";
  const hubHref = isSpring
    ? "/guides"
    : "/chicago-boat-winterization";
  const hubLabel = isSpring ? "All guides →" : "Winterization hub →";
  const hubEvent = isSpring ? "spring-guides" : "winterization-hub";

  return (
    <section aria-labelledby="seasonal-guides-heading">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
        <div>
          <h2
            id="seasonal-guides-heading"
            className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2"
          >
            {heading}
          </h2>
          <p className="text-gray-600 max-w-2xl text-sm md:text-base">{blurb}</p>
        </div>
        <HomepageTrackLink
          href={hubHref}
          event="homepage_resource_click"
          params={{ resource: hubEvent }}
          className="font-bold text-coral hover:underline shrink-0"
        >
          {hubLabel}
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
        {isSpring ? (
          <Link
            href="/tools"
            className="px-4 py-2.5 bg-white border border-sky-blue/30 text-lake-blue font-semibold text-sm rounded-full hover:bg-light-blue transition-colors"
          >
            Planning tools
          </Link>
        ) : (
          <Link
            href="/storage"
            className="px-4 py-2.5 bg-white border border-sky-blue/30 text-lake-blue font-semibold text-sm rounded-full hover:bg-light-blue transition-colors"
          >
            Storage directory
          </Link>
        )}
      </div>
    </section>
  );
}
