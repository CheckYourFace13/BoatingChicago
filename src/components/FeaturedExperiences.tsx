import Image from "next/image";
import Link from "next/link";
import { homepageCategories } from "@/data/categories";
import { getFeaturedImage } from "@/data/images";
import { Reveal } from "./Reveal";

export function FeaturedExperiences() {
  const featured = homepageCategories.slice(0, 4);

  return (
    <section>
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
          Popular Chicago Boating Experiences
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl">
          From Playpen afternoons to Navy Pier fireworks nights — explore the guides locals and visitors book most.
        </p>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {featured.map((cat, i) => {
          const image = getFeaturedImage(cat.slug);
          return (
            <Reveal key={cat.slug} delayMs={i * 80}>
              <Link
                href={`/${cat.slug}`}
                className="group relative flex min-h-[240px] overflow-hidden rounded-3xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-lake-blue/90 via-lake-blue/55 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end p-7 md:p-8 max-w-md">
                  <span className="text-xs font-bold tracking-widest uppercase text-sun-yellow mb-2">
                    Featured guide
                  </span>
                  <h3 className="text-2xl font-extrabold text-white mb-2 group-hover:text-sun-yellow transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-white/85 text-sm mb-4">{cat.description}</p>
                  <span className="text-sm font-bold text-white/95 group-hover:underline">
                    Explore →
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
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
