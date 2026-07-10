import Image from "next/image";
import { sceneryBand, siteImages } from "@/data/images";
import { Reveal } from "./Reveal";

const captions = [
  "Chicago skyline from the water",
  "Summer parties on Lake Michigan",
  "Fishing charters at sunrise",
  "Yacht decks at sunset",
];

export function SceneryBand() {
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden bg-lake-blue">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <Reveal>
          <p className="text-sun-yellow font-bold text-sm tracking-widest uppercase mb-3">
            Life on Lake Michigan
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-8 max-w-xl">
            Real Chicago summers — sunsets, skyline views, and boats packed with friends.
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {sceneryBand.map((key, i) => {
            const img = siteImages[key];
            return (
              <Reveal key={key} delayMs={i * 90}>
                <figure className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm font-semibold leading-snug">
                    {captions[i]}
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
