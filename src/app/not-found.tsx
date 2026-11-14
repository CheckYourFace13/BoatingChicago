import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Boating Chicago",
  description:
    "This page could not be found. Return to Boating Chicago for weather, launches, harbors, and guides.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-3xl font-extrabold text-lake-blue mb-3">Page Not Found</h1>
      <p className="text-gray-600 mb-8">
        Looks like this page drifted off course. Let&apos;s get you back on the water.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-coral text-white font-bold rounded-full hover:bg-coral/90 transition-colors"
        >
          Back to Home →
        </Link>
        <Link
          href="/boat-launches"
          className="inline-flex items-center px-6 py-3 border border-lake-blue/30 text-lake-blue font-bold rounded-full hover:bg-light-blue/50 transition-colors"
        >
          Boat launches
        </Link>
        <Link
          href="/guides"
          className="inline-flex items-center px-6 py-3 border border-lake-blue/30 text-lake-blue font-bold rounded-full hover:bg-light-blue/50 transition-colors"
        >
          Guides
        </Link>
      </div>
    </div>
  );
}
