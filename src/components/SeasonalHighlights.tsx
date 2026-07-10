import Image from "next/image";
import Link from "next/link";
import { getActivePromos } from "@/data/seasonal-promos";
import { getSeasonalImage } from "@/data/images";
import { Reveal } from "./Reveal";

export function SeasonalHighlights() {
  const promos = getActivePromos();

  return (
    <section>
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
          Chicago Boating Season Highlights
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Peak weekends on Lake Michigan book out fast — lock in fireworks nights, Air &amp; Water Show
          views, and summer party weekends.
        </p>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {promos.map((promo, i) => {
          const image = getSeasonalImage(promo.id);
          return (
            <Reveal key={promo.id} delayMs={i * 70}>
              <Link
                href={promo.href}
                className="group relative block overflow-hidden rounded-2xl aspect-[5/4] shadow-sm hover:shadow-lg transition-shadow"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lake-blue/95 via-lake-blue/50 to-black/10" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-extrabold text-white text-lg mb-1.5 group-hover:text-sun-yellow transition-colors">
                    {promo.title}
                  </h3>
                  <p className="text-sm text-white/80 mb-3 line-clamp-2">{promo.description}</p>
                  <span className="text-sm font-bold text-coral group-hover:underline">
                    {promo.cta} →
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
