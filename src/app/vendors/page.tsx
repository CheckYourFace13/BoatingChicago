import Image from "next/image";
import Link from "next/link";
import { getPublishedVendors } from "@/data/vendors";
import { VendorCard } from "@/components/VendorCard";
import { buildMetadata } from "@/lib/seo";
import { trackingAttrs } from "@/lib/tracking";
import { siteImages } from "@/data/images";

export const metadata = buildMetadata({
  title: "Chicago Boating Vendors | Local Boat Rental & Charter Directory",
  description:
    "Boating Chicago connects you with local boat rental companies, yacht charters, fishing captains, marinas, and service providers on Lake Michigan. Now accepting Chicago boating partners.",
  path: "/vendors",
});

const partnerCategories = [
  "Boat & Party Boat Rentals",
  "Yacht Charters",
  "Fishing Charters",
  "Captains for Hire",
  "Marinas & Harbors",
  "Detailing, Storage & Repair",
];

export default function VendorsPage() {
  const published = getPublishedVendors();

  return (
    <>
      <section className="relative min-h-[40vh] flex items-end overflow-hidden text-white">
        <Image
          src={siteImages.marinaSlips.src}
          alt={siteImages.marinaSlips.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover animate-ken-burns-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-lake-blue/90 via-lake-blue/70 to-lake-blue/40" />
        <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 animate-fade-up">
            Chicago Boating Vendor Directory
          </h1>
          <p className="text-white/90 max-w-2xl leading-relaxed animate-fade-up" style={{ animationDelay: "100ms" }}>
            Local boat rental companies, yacht charters, fishing captains, marinas, and service providers on Lake Michigan.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {published.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {published.map((vendor) => (
              <VendorCard key={vendor.slug} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-3xl border border-sky-blue/20 mb-12">
            <div className="absolute inset-0">
              <Image
                src={siteImages.partyBoat.src}
                alt=""
                fill
                sizes="100vw"
                className="object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-light-blue via-white/95 to-white" />
            </div>
            <div className="relative z-10 p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-3">
                Now Accepting Chicago Boating Partners
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
                We&apos;re onboarding boat rental companies, yacht charters, fishing operators, captains, marinas, and service providers across the Chicago lakefront.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto mb-8">
                {partnerCategories.map((label) => (
                  <div
                    key={label}
                    className="flex items-center justify-center p-3 bg-white rounded-xl border border-sky-blue/15 shadow-sm"
                  >
                    <span className="text-xs font-semibold text-lake-blue text-center leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/list-your-business"
                {...trackingAttrs.listBusinessClick}
                className="inline-flex items-center px-8 py-4 bg-coral text-white font-bold text-lg rounded-full hover:bg-coral/90 transition-colors shadow-md"
              >
                List Your Business →
              </Link>
            </div>
          </div>
        )}

        <div className="bg-lake-blue rounded-3xl p-8 md:p-10 text-center text-white">
          <h2 className="text-2xl font-extrabold mb-3">Own a Boating Business in Chicago?</h2>
          <p className="text-white/85 mb-6 max-w-lg mx-auto">
            Free basic listings, featured placements, sponsored spots, and direct lead access — built for operators who want more bookings on Lake Michigan.
          </p>
          <Link
            href="/list-your-business"
            {...trackingAttrs.listBusinessClick}
            className="inline-flex items-center px-6 py-3 bg-sun-yellow text-lake-blue font-bold rounded-full hover:bg-sun-yellow/90 transition-colors"
          >
            Get Listed on Boating Chicago →
          </Link>
        </div>
      </div>
    </>
  );
}
