import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { ResourceCrossLinks } from "@/components/ResourceCrossLinks";
import { TOOL_CATALOG, TOOL_GROUP_LABEL } from "@/lib/tools/catalog";
import { FavoritesList } from "@/components/geo/FavoriteButton";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Boating Planning Tools | Calculators, Float Plan & Checklists",
    description:
      "Free boating tools: fuel and trip-time calculators, ownership cost worksheets, slip comparison, float plan, and conversions. Inputs stay in your browser.",
    path: "/tools",
  });
}

const GROUPS = ["worksheets", "trip", "ownership", "reference"] as const;

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
        eyebrow="Free planning tools"
        title="Boating Planning Tools"
        intro="Original calculators and printable worksheets for recreational trips on Lake Michigan and inland waters near Chicago. Completing them does not notify the Coast Guard or any agency. None of the calculators invent fuel prices, slip fees, or a safe-to-go rating."
        links={[
          { label: "Boat launches →", href: "/boat-launches" },
          { label: "Kayak & SUP finder", href: "/kayak-canoe-sup" },
          { label: "Marinas", href: "/marinas" },
          { label: "Boating weather", href: "/weather" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        {GROUPS.map((group) => (
          <section key={group}>
            <h2 className="text-2xl font-extrabold text-lake-blue mb-4">
              {TOOL_GROUP_LABEL[group]}
            </h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {TOOL_CATALOG.filter((tool) => tool.group === group).map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="block h-full rounded-2xl border border-sky-blue/25 bg-white p-6 hover:border-sky-blue/50 hover:shadow-md transition-all"
                  >
                    <h3 className="text-xl font-extrabold text-lake-blue mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      {tool.blurb}
                    </p>
                    <p className="mt-4 text-sm font-bold text-coral">Open →</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="text-sm text-gray-600 max-w-3xl leading-relaxed">
          Worksheets are adapted from public U.S. Coast Guard recreational
          boating safety materials. Unit conversions follow NOAA’s published
          nautical-mile definition. Always follow current federal, state, and
          local requirements for your vessel and waters.
        </p>

        <section className="rounded-2xl border border-sky-blue/20 bg-white p-5">
          <h2 className="text-lg font-extrabold text-lake-blue mb-2">
            Saved in this browser
          </h2>
          <FavoritesList />
        </section>

        <ResourceCrossLinks
          links={[
            { href: "/weather", label: "Weather" },
            { href: "/boat-launches", label: "Boat launches" },
            { href: "/kayak-canoe-sup", label: "Kayak, canoe & SUP" },
            { href: "/permits", label: "Rules & permits" },
            { href: "/boat-financing-ownership-costs-chicago", label: "Ownership costs guide" },
            { href: "/chicago-area-inland-paddling-guide", label: "Inland paddling guide" },
            { href: "/guides", label: "All guides" },
          ]}
        />
      </div>
    </>
  );
}
