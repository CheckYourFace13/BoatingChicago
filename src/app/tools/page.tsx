import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { ResourceCrossLinks } from "@/components/ResourceCrossLinks";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Boating Planning Tools | Float Plan & Trip Checklist",
    description:
      "Printable float-plan worksheet and trip checklist for Chicago-area recreational boaters, based on U.S. Coast Guard float-plan guidance. Nothing entered here is submitted to authorities.",
    path: "/tools",
  });
}

const TOOLS = [
  {
    href: "/tools/float-plan",
    title: "Float plan worksheet",
    blurb:
      "A printable plan you fill out and leave with a trusted contact before you leave the dock — not an online filing system.",
  },
  {
    href: "/tools/trip-checklist",
    title: "Pre-departure trip checklist",
    blurb:
      "A compact gear and paperwork checklist for day trips on Lake Michigan and inland waters near Chicago.",
  },
] as const;

export default function ToolsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
        ]}
      />
      <GeoHero
        eyebrow="Planning worksheets"
        title="Boating Planning Tools"
        intro="Small printable worksheets for recreational trips. Completing them on this site does not notify the Coast Guard or any agency — share a filled copy with someone ashore."
        links={[
          { label: "Boating weather →", href: "/weather" },
          { label: "Boat launches", href: "/boat-launches" },
          { label: "Guides", href: "/guides" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <ul className="grid gap-4 md:grid-cols-2">
          {TOOLS.map((tool) => (
            <li key={tool.href}>
              <Link
                href={tool.href}
                className="block h-full rounded-2xl border border-sky-blue/25 bg-white p-6 hover:border-sky-blue/50 hover:shadow-md transition-all"
              >
                <h2 className="text-xl font-extrabold text-lake-blue mb-2">
                  {tool.title}
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {tool.blurb}
                </p>
                <p className="mt-4 text-sm font-bold text-coral">Open →</p>
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-sm text-gray-600 max-w-3xl leading-relaxed">
          Guidance is adapted from public U.S. Coast Guard recreational boating
          safety materials on float plans and pre-departure checks. Always follow
          current federal, state, and local requirements for your vessel and
          waters.
        </p>

        <ResourceCrossLinks
          links={[
            { href: "/weather", label: "Weather" },
            { href: "/boat-launches", label: "Boat launches" },
            { href: "/marinas", label: "Marinas" },
            { href: "/spring-boat-launch-checklist-chicago", label: "Spring checklist guide" },
            { href: "/beginners-guide-boating-chicago", label: "Beginner’s guide" },
            { href: "/guides", label: "All guides" },
          ]}
        />
      </div>
    </>
  );
}
