import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import { guides } from "@/data/guides";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Chicago Boating Guides | Rentals, Charters, Marinas & Lake Michigan",
  description:
    "Every BoatingChicago guide in one place — boat rentals, yacht and fishing charters, the Playpen, marinas, fireworks cruises, safety, and Lake Michigan planning.",
  path: "/guides",
});

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
        intro="Long-form planning guides for boating in and around Chicago — how to rent, what a charter really costs, where to anchor, which harbor fits your boat, and how to read Lake Michigan before you go."
        links={[
          { label: "Destinations →", href: "/destinations" },
          { label: "Marinas", href: "/marinas" },
          { label: "Boat launches", href: "/boat-launches" },
          { label: "Boating weather", href: "/weather" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
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
      </div>
    </>
  );
}
