import Link from "next/link";
import type { Vendor } from "@/types";

interface VendorCardProps {
  vendor: Vendor;
}

export function VendorCard({ vendor }: VendorCardProps) {
  return (
    <article className="relative bg-white rounded-2xl border border-sky-blue/20 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 overflow-hidden flex flex-col">
      {vendor.featured && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-sun-yellow text-lake-blue text-xs font-bold rounded-full">
          Featured
        </div>
      )}
      {vendor.sponsored && !vendor.featured && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-coral text-white text-xs font-bold rounded-full">
          Sponsored
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <span className="text-xs font-bold text-sky-blue uppercase tracking-wide mb-2">
          {vendor.category}
        </span>
        <h3 className="text-lg font-extrabold text-lake-blue mb-1">
          <Link href={`/vendors/${vendor.slug}`} className="hover:text-sky-blue transition-colors">
            {vendor.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-500 mb-3">📍 {vendor.location}</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{vendor.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {vendor.capacity && (
            <span className="text-xs px-2.5 py-1 bg-light-blue text-lake-blue rounded-full font-semibold">
              {vendor.capacity}
            </span>
          )}
          {vendor.pricingRange && (
            <span className="text-xs px-2.5 py-1 bg-light-blue text-lake-blue rounded-full font-semibold">
              {vendor.pricingRange}
            </span>
          )}
        </div>

        <Link
          href={`/vendors/${vendor.slug}`}
          className="inline-flex items-center justify-center px-5 py-2.5 bg-lake-blue text-white font-bold text-sm rounded-full hover:bg-lake-blue/90 transition-colors"
        >
          View Listing →
        </Link>
      </div>
    </article>
  );
}
