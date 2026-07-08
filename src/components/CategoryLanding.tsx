import Link from "next/link";
import type { CategoryPage } from "@/types";
import { getCategoryBySlug } from "@/data/categories";
import { getVendorsBySlugs } from "@/data/vendors";
import { AffiliateCTA } from "./AffiliateCTA";
import { BestForCards } from "./BestForCards";
import { FAQ } from "./FAQ";
import { FAQSchema } from "./FAQSchema";
import { FindBoatForm } from "./FindBoatForm";
import { VendorCard } from "./VendorCard";
import { EmailSignup } from "./EmailSignup";
import { siteConfig } from "@/config/site";
import { trackingAttrs } from "@/lib/tracking";

interface CategoryLandingProps {
  category: CategoryPage;
}

export function CategoryLanding({ category }: CategoryLandingProps) {
  const vendors = getVendorsBySlugs(category.vendors);
  const related = category.relatedSlugs
    .map((slug) => getCategoryBySlug(slug))
    .filter(Boolean);

  return (
    <>
      <FAQSchema faqs={category.faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: category.title,
            description: category.seoDescription,
            url: `${siteConfig.url}/${category.slug}`,
            areaServed: { "@type": "City", name: "Chicago" },
            provider: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
          }),
        }}
      />

      <section className="bg-gradient-to-br from-lake-blue to-sky-blue text-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">{category.headline}</h1>
          <p className="text-lg text-white/90 max-w-3xl leading-relaxed">{category.intro}</p>
          <div className="mt-6">
            <a
              href="#find-a-boat"
              className="inline-flex items-center px-6 py-3 bg-coral text-white font-bold rounded-full hover:bg-coral/90 transition-colors shadow-md"
            >
              Get Matched with a Boat →
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <BestForCards items={category.bestFor} />

        <AffiliateCTA
          partners={category.affiliates}
          title="Book Online — Compare Top Platforms"
          subtitle="Browse available boats and charters through our trusted affiliate partners. Boating Chicago may earn a commission at no extra cost to you."
        />

        <section id="find-a-boat">
          <FindBoatForm source={category.slug} />
        </section>

        {vendors.length > 0 ? (
          <section>
            <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
              Featured Local Listings
            </h2>
            <p className="text-gray-600 mb-6">
              Browse Chicago vendors on Boating Chicago — or submit the form above to get matched automatically.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendors.map((vendor) => (
                <VendorCard key={vendor.slug} vendor={vendor} />
              ))}
            </div>
          </section>
        ) : (
          <section className="bg-light-blue/50 rounded-3xl p-8 md:p-10 text-center">
            <h2 className="text-xl font-extrabold text-lake-blue mb-2">
              Local Vendor Listings
            </h2>
            <p className="text-gray-600 mb-4 max-w-lg mx-auto">
              We&apos;re onboarding Chicago boating partners. Use the form above to get matched, or book through our affiliate partners.
            </p>
            <Link
              href="/list-your-business"
              {...trackingAttrs.listBusinessClick}
              className="inline-flex text-sky-blue font-bold hover:underline"
            >
              List your boating business →
            </Link>
          </section>
        )}

        <FAQ faqs={category.faqs} />

        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-extrabold text-lake-blue mb-4">Related Chicago Boating Guides</h2>
            <div className="flex flex-wrap gap-3">
              {related.map(
                (cat) =>
                  cat && (
                    <Link
                      key={cat.slug}
                      href={`/${cat.slug}`}
                      className="px-4 py-2 bg-light-blue text-lake-blue font-semibold text-sm rounded-full hover:bg-sky-blue/20 transition-colors"
                    >
                      {cat.title}
                    </Link>
                  )
              )}
            </div>
          </section>
        )}

        <EmailSignup source={category.slug} />
      </div>
    </>
  );
}
