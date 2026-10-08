import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import { guides, WINTER_GUIDE_SLUGS, getGuideBySlug } from "@/data/guides";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { ResourceCrossLinks } from "@/components/ResourceCrossLinks";

export async function generateMetadata() {
  return buildManagedMetadata({
  title: "Chicago Boating Guides | Rentals, Charters, Marinas & Lake Michigan",
  description:
    "Every BoatingChicago guide in one place — boat rentals, yacht and fishing charters, the Playpen, marinas, fireworks cruises, safety, and Lake Michigan planning.",
  path: "/guides",
});
}

export default function GuidesPage() {
  const sorted = guides
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title, "en-US"));

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
        ]}
      />

      <GeoHero
        eyebrow={`${sorted.length} Chicago boating guides`}
        title="Chicago Boating Guides"
        intro="Long-form planning guides for Chicago, southern Lake Michigan, and nearby Wisconsin and Indiana water — how to get on the water, which harbor fits a trip, and how to read conditions before you go."
        links={[
          { label: "Destinations →", href: "/destinations" },
          { label: "Marinas", href: "/marinas" },
          { label: "Boat launches", href: "/boat-launches" },
          { label: "Boating weather", href: "/weather" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <section
          id="winter-guides"
          className="rounded-2xl border border-sky-blue/25 bg-light-blue/30 p-5 sm:p-6"
        >
          <h2 className="text-xl font-extrabold text-lake-blue mb-2">
            Winter &amp; off-season collection
          </h2>
          <p className="text-sm text-gray-700 mb-4 max-w-3xl">
            Storage, winterizing, shrink wrap, buying off-season, and boat-show
            prep. Procedures defer to manufacturer manuals and qualified service
            where engines and systems are involved.
          </p>
          <ul className="flex flex-wrap gap-2">
            {WINTER_GUIDE_SLUGS.map((slug) => {
              const g = getGuideBySlug(slug);
              if (!g) return null;
              return (
                <li key={slug}>
                  <Link
                    href={`/${slug}`}
                    className="inline-flex min-h-[44px] items-center px-4 py-2 bg-white border border-sky-blue/30 text-lake-blue font-semibold text-sm rounded-full hover:bg-white/90"
                  >
                    {g.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/${guide.slug}`}
                className="flex h-full flex-col rounded-2xl border border-sky-blue/20 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <h2 className="font-extrabold text-lake-blue text-lg mb-2">
                  {guide.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                  {guide.seoDescription || guide.intro}
                </p>
                <span className="mt-4 text-sm font-semibold text-coral">
                  Read the guide →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <ResourceCrossLinks
          links={[
            { href: "/weather", label: "Weather" },
            { href: "/news", label: "News" },
            { href: "/destinations", label: "Destinations" },
            { href: "/marinas", label: "Marinas" },
            { href: "/boat-launches", label: "Boat launches" },
            { href: "/events", label: "Events" },
            { href: "/lakes", label: "Lakes" },
          ]}
        />
      </div>
    </>
  );
}
