import Image from "next/image";
import Link from "next/link";
import { homepageCategories } from "@/data/categories";
import { getCategoryImage } from "@/data/images";
import { Reveal } from "./Reveal";

export function PopularCategories() {
  return (
    <section>
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
          Popular Boating Categories
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Party boats, yacht charters, fishing trips, fireworks cruises — pick a lane and get on the lake.
        </p>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {homepageCategories.map((cat, i) => {
          const image = getCategoryImage(cat.slug);
          return (
            <Reveal key={cat.slug} delayMs={i * 60}>
              <Link
                href={`/${cat.slug}`}
                className="group relative block overflow-hidden rounded-2xl aspect-[4/5] shadow-sm hover:shadow-xl transition-shadow"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lake-blue/95 via-lake-blue/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-extrabold text-white text-lg mb-1 group-hover:text-sun-yellow transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-white/80 leading-snug">{cat.description}</p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
