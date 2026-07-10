"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { heroSlideshow, siteImages } from "@/data/images";

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const slides = heroSlideshow.map((key) => siteImages[key]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${i === index ? "animate-ken-burns" : ""}`}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-lake-blue/92 via-lake-blue/60 to-lake-blue/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-lake-blue/85 via-transparent to-black/30" />

      {/* Soft moving water shimmer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 overflow-hidden opacity-50">
        <div className="absolute inset-0 wave-layer wave-layer-a" />
        <div className="absolute inset-0 wave-layer wave-layer-b" />
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? "w-8 bg-sun-yellow" : "w-2.5 bg-white/45 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
