import Link from "next/link";
import { homepageCategories } from "@/data/categories";

export function FeaturedExperiences() {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
        Popular Chicago Boating Experiences
      </h2>
      <p className="text-gray-600 mb-8 max-w-2xl">
        From Playpen party boats to Navy Pier fireworks cruises — explore our Chicago boating guides and book through trusted partners.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {homepageCategories.slice(0, 4).map((cat) => (
          <Link
            key={cat.slug}
            href={`/${cat.slug}`}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-lake-blue to-sky-blue p-6 text-white hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            <span className="text-3xl mb-3 block">{cat.icon}</span>
            <h3 className="text-lg font-extrabold mb-1 group-hover:text-sun-yellow transition-colors">
              {cat.title}
            </h3>
            <p className="text-white/80 text-sm">{cat.description}</p>
          </Link>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link
          href="/boat-rentals-chicago"
          className="inline-flex items-center text-sky-blue font-bold hover:underline"
        >
          Explore all boating guides →
        </Link>
      </div>
    </section>
  );
}
