import Link from "next/link";
import { homepageCategories } from "@/data/categories";

export function PopularCategories() {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
        Popular Boating Categories
      </h2>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Whatever your vibe — party boat, luxury yacht, fishing trip, or fireworks cruise — we&apos;ve got you covered.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {homepageCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/${cat.slug}`}
            className="group p-6 bg-white rounded-2xl border border-sky-blue/20 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <span className="text-3xl mb-3 block">{cat.icon}</span>
            <h3 className="font-extrabold text-lake-blue group-hover:text-sky-blue transition-colors mb-1">
              {cat.title}
            </h3>
            <p className="text-sm text-gray-600">{cat.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
