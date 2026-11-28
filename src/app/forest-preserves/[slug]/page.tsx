import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import {
  SourceAttribution,
  SourceLink,
} from "@/components/geo/SourceAttribution";
import {
  getAllPublishedPreserveSlugs,
  getPreserveAccessBySlug,
  getPublishedPreserveAccess,
} from "@/data/geo";
import {
  preserveAccessLabel,
  preserveCraftLabel,
} from "@/lib/geo-display";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { EmailSignup } from "@/components/EmailSignup";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPublishedPreserveSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const site = getPreserveAccessBySlug(slug);
  if (!site || !site.isPublished) return {};
  return buildManagedMetadata({
    title: `${site.name} | Forest Preserve Boating`,
    description: site.summary,
    path: `/forest-preserves/${site.slug}`,
  });
}

export default async function PreserveAccessPage({ params }: PageProps) {
  const { slug } = await params;
  const site = getPreserveAccessBySlug(slug);
  if (!site || !site.isPublished) notFound();

  const siblings = getPublishedPreserveAccess()
    .filter(
      (p) =>
        p.slug !== site.slug &&
        p.county === site.county &&
        p.standalonePage !== false,
    )
    .slice(0, 6);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Forest preserves", path: "/forest-preserves" },
          { name: site.name, path: `/forest-preserves/${site.slug}` },
        ]}
      />

      <GeoHero
        eyebrow={`${site.county} County forest preserve`}
        title={site.name}
        intro={site.summary}
        links={[
          { label: "All forest-preserve waters →", href: "/forest-preserves" },
          { label: "Boat launches", href: "/boat-launches" },
          { label: "Weather", href: "/weather" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <section className="max-w-3xl space-y-4">
          {site.overview.map((para, i) => (
            <p key={`${site.slug}-p-${i}`} className="text-gray-700 leading-relaxed">
              {para}
            </p>
          ))}
        </section>

        <section className="grid gap-6 md:grid-cols-2 max-w-4xl">
          <div className="rounded-2xl border border-sky-blue/20 bg-white p-6">
            <h2 className="text-lg font-extrabold text-lake-blue mb-3">
              Access type
            </h2>
            <ul className="space-y-2 text-gray-700 text-sm">
              {site.accessKinds.map((kind) => (
                <li key={kind}>• {preserveAccessLabel(kind)}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              {site.hasRentals
                ? "Rentals listed by the agency at this site."
                : "No agency rental center listed here — launch-only."}
            </p>
          </div>
          <div className="rounded-2xl border border-sky-blue/20 bg-white p-6">
            <h2 className="text-lg font-extrabold text-lake-blue mb-3">
              Listed craft
            </h2>
            <ul className="space-y-2 text-gray-700 text-sm">
              {site.allowedCraft.map((craft) => (
                <li key={craft}>• {preserveCraftLabel(craft)}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="max-w-3xl space-y-3">
          <h2 className="text-2xl font-extrabold text-lake-blue">
            Restrictions to confirm
          </h2>
          <ul className="space-y-2 text-gray-700">
            {site.restrictions.map((rule) => (
              <li key={rule} className="leading-relaxed">
                • {rule}
              </li>
            ))}
          </ul>
        </section>

        {site.hasRentals && site.rentalNotes ? (
          <section className="max-w-3xl space-y-3">
            <h2 className="text-2xl font-extrabold text-lake-blue">
              Rentals
            </h2>
            <p className="text-gray-700 leading-relaxed">{site.rentalNotes}</p>
          </section>
        ) : null}

        {site.slug === "keystone-landing-mchenry" ? (
          <section className="max-w-3xl space-y-6">
            <h2 className="text-2xl font-extrabold text-lake-blue">
              Nippersink Creek landings
            </h2>
            <div
              id="pioneer-landing"
              className="rounded-2xl border border-sky-blue/20 bg-white p-5 scroll-mt-24"
            >
              <h3 className="text-lg font-extrabold text-lake-blue mb-2">
                Pioneer Road Canoe Landing
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                McHenry County Conservation District lists Pioneer Road as a
                canoe/kayak landing on Nippersink Creek. Use it with Keystone and
                Nippersink Canoe Base for multi-landing trips. Confirm water
                levels before you go — MCCD closes all Nippersink launches when
                USGS flow is above 750 cfs or 7 feet.
              </p>
            </div>
            <div
              id="nippersink-canoe-base"
              className="rounded-2xl border border-sky-blue/20 bg-white p-5 scroll-mt-24"
            >
              <h3 className="text-lg font-extrabold text-lake-blue mb-2">
                Nippersink Canoe Base
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                MCCD lists Nippersink Canoe Base among the creek’s canoe/kayak
                put-ins. Tubing and flotation devices are prohibited on Nippersink
                Creek. Paddling is at your own risk; confirm high-water closures
                and site hours (sunrise to sunset) on the official MCCD pages.
              </p>
            </div>
          </section>
        ) : null}

        {(site.seasonalAccessNote || site.phone || site.addressHint) && (
          <section className="max-w-3xl space-y-3 rounded-2xl bg-light-blue/40 border border-sky-blue/20 p-6">
            <h2 className="text-xl font-extrabold text-lake-blue">
              Practical details
            </h2>
            {site.addressHint ? (
              <p className="text-gray-700 text-sm">
                <span className="font-semibold text-lake-blue">Address hint: </span>
                {site.addressHint}
              </p>
            ) : null}
            {site.phone ? (
              <p className="text-gray-700 text-sm">
                <span className="font-semibold text-lake-blue">Phone: </span>
                {site.phone}
              </p>
            ) : null}
            {site.seasonalAccessNote ? (
              <p className="text-gray-700 text-sm leading-relaxed">
                {site.seasonalAccessNote}
              </p>
            ) : null}
          </section>
        )}

        <SourceAttribution
          source={site.source}
          title="Official source"
          note="Confirm craft rules, hours, fees, and seasonal notices on the linked agency page before you go — we do not invent operational details."
        />
        {site.relatedSources?.length ? (
          <ul className="text-sm space-y-1">
            {site.relatedSources.map((src) => (
              <li key={src.url}>
                Also: <SourceLink source={src} />
              </li>
            ))}
          </ul>
        ) : null}

        {siblings.length > 0 ? (
          <section>
            <h2 className="text-2xl font-extrabold text-lake-blue mb-4">
              Other {site.county} County preserve waters
            </h2>
            <div className="flex flex-wrap gap-3">
              {siblings.map((sibling) => (
                <Link
                  key={sibling.slug}
                  href={`/forest-preserves/${sibling.slug}`}
                  className="px-4 py-2 bg-light-blue text-lake-blue font-semibold text-sm rounded-full hover:bg-sky-blue/20 transition-colors"
                >
                  {sibling.name}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <EmailSignup source={`forest-preserve:${site.slug}`} />

        <p>
          <Link
            href="/forest-preserves"
            className="font-bold text-coral hover:underline"
          >
            ← All forest-preserve waters
          </Link>
        </p>
      </div>
    </>
  );
}
