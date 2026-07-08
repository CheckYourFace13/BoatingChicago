"use client";

import Link from "next/link";
import { trackingAttrs } from "@/lib/tracking";

export function VendorSignupCTA() {
  return (
    <section className="bg-gradient-to-br from-sun-yellow/20 to-coral/10 rounded-3xl p-8 md:p-12 border border-sun-yellow/30">
      <div className="max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-3">
          Own a Boating Business in Chicago?
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Get found by thousands of locals and visitors searching for Chicago boat rentals, charters, and services. We&apos;re now accepting boating partners — free basic listings, featured placements, and direct lead access available.
        </p>
        <Link
          href="/list-your-business"
          {...trackingAttrs.listBusinessClick}
          className="inline-flex items-center px-6 py-3 bg-lake-blue text-white font-bold rounded-full hover:bg-lake-blue/90 transition-colors shadow-md"
        >
          List Your Business →
        </Link>
      </div>
    </section>
  );
}
