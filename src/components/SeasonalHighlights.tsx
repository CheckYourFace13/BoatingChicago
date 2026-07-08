import Link from "next/link";
import { getActivePromos } from "@/data/seasonal-promos";

export function SeasonalHighlights() {
  const promos = getActivePromos();

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
        Chicago Boating Season Highlights
      </h2>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Mark your calendar — these are the can&apos;t-miss moments on Lake Michigan every summer.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {promos.map((promo) => (
          <Link
            key={promo.id}
            href={promo.href}
            className="group p-6 bg-white rounded-2xl border border-sky-blue/20 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <span className="text-3xl mb-3 block">{promo.emoji}</span>
            <h3 className="font-extrabold text-lake-blue group-hover:text-sky-blue transition-colors mb-2">
              {promo.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{promo.description}</p>
            <span className="text-sm font-bold text-coral group-hover:underline">{promo.cta} →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
