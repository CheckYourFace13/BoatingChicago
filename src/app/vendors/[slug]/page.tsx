import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedVendorBySlug, getPublishedVendors } from "@/data/vendors";
import { getCategoryBySlug } from "@/data/categories";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { buildLocalBusinessSchema } from "@/lib/schema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FindBoatForm } from "@/components/FindBoatForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPublishedVendors().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const vendor = getPublishedVendorBySlug(slug);
  if (!vendor) return {};

  return buildMetadata({
    title: `${vendor.name} | ${vendor.category} in Chicago`,
    description: vendor.description,
    path: `/vendors/${slug}`,
  });
}

export default async function VendorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const vendor = getPublishedVendorBySlug(slug);

  if (!vendor) {
    notFound();
  }

  const category = getCategoryBySlug(vendor.categorySlug);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Vendors", path: "/vendors" },
          { name: vendor.name, path: `/vendors/${vendor.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildLocalBusinessSchema({
              name: vendor.name,
              description: vendor.description,
              url: `${siteConfig.url}/vendors/${vendor.slug}`,
              areaServed: vendor.location,
              priceRange: vendor.pricingRange,
            })
          ),
        }}
      />

      <section className="bg-gradient-to-br from-lake-blue to-sky-blue text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {vendor.featured && (
              <span className="px-3 py-1 bg-sun-yellow text-lake-blue text-xs font-bold rounded-full">
                Featured Listing
              </span>
            )}
            {vendor.sponsored && (
              <span className="px-3 py-1 bg-coral text-white text-xs font-bold rounded-full">
                Sponsored
              </span>
            )}
            <span className="px-3 py-1 bg-white/15 text-white text-xs font-bold rounded-full">
              {vendor.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{vendor.name}</h1>
          <p className="text-white/85 text-lg">📍 {vendor.location}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-extrabold text-lake-blue mb-3">About</h2>
              <p className="text-gray-600 leading-relaxed">{vendor.longDescription}</p>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-lake-blue mb-3">Services</h2>
              <div className="flex flex-wrap gap-2">
                {vendor.services.map((service) => (
                  <span
                    key={service}
                    className="px-3 py-1.5 bg-light-blue text-lake-blue text-sm font-semibold rounded-full"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-lake-blue mb-3">Areas Served</h2>
              <div className="flex flex-wrap gap-2">
                {vendor.areas.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {category && (
              <Link
                href={`/${category.slug}`}
                className="inline-flex text-sky-blue font-bold hover:underline"
              >
                ← Back to {category.title} guide
              </Link>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-sky-blue/20 shadow-sm p-6">
              <h3 className="font-extrabold text-lake-blue mb-4">Quick Info</h3>
              {vendor.capacity && (
                <div className="mb-3">
                  <span className="text-xs font-bold text-gray-500 uppercase">Capacity</span>
                  <p className="font-semibold text-lake-blue">{vendor.capacity}</p>
                </div>
              )}
              {vendor.pricingRange && (
                <div className="mb-3">
                  <span className="text-xs font-bold text-gray-500 uppercase">Pricing</span>
                  <p className="font-semibold text-lake-blue">{vendor.pricingRange}</p>
                </div>
              )}
              {vendor.phone && (
                <div className="mb-3">
                  <span className="text-xs font-bold text-gray-500 uppercase">Phone</span>
                  <p className="font-semibold text-lake-blue">{vendor.phone}</p>
                </div>
              )}
              <a
                href="#request-quote"
                className="mt-4 w-full inline-flex items-center justify-center px-5 py-3 bg-coral text-white font-bold rounded-full hover:bg-coral/90 transition-colors"
              >
                Request a Quote
              </a>
            </div>
          </div>
        </div>

        <div id="request-quote" className="mt-16 max-w-2xl mx-auto">
          <FindBoatForm source={`vendor-${vendor.slug}`} compact />
        </div>
      </div>
    </>
  );
}
