import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="text-6xl mb-4">🚤</div>
      <h1 className="text-3xl font-extrabold text-lake-blue mb-3">Page Not Found</h1>
      <p className="text-gray-600 mb-8">
        Looks like this page drifted off course. Let&apos;s get you back on the water.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 bg-coral text-white font-bold rounded-full hover:bg-coral/90 transition-colors"
      >
        Back to Home →
      </Link>
    </div>
  );
}
