import Link from "next/link";
import { Logo } from "./Logo";
import { HeroSlideshow } from "./HeroSlideshow";

export function Hero() {
  return (
    <section className="relative min-h-[78vh] md:min-h-[84vh] flex items-end overflow-hidden text-white">
      <HeroSlideshow />

      <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-24 md:pb-24 md:pt-28">
        <div className="max-w-3xl">
          <div className="mb-6 animate-fade-up" style={{ animationDelay: "60ms" }}>
            <Logo size="lg" variant="light" />
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.08] tracking-tight mb-5 animate-fade-up"
            style={{ animationDelay: "140ms" }}
          >
            Your Guide to Boating Chicago &amp; Southern Lake Michigan
          </h1>

          <p
            className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            Live weather and lake conditions, boating news and events, destinations,
            marinas, boat launches, lakes, and practical guides — with rentals and
            charters when you&apos;re ready to cast off.
          </p>

          <div
            className="flex flex-wrap gap-3 sm:gap-4 animate-fade-up"
            style={{ animationDelay: "340ms" }}
          >
            <Link
              href="#explore-regions"
              className="inline-flex items-center px-7 py-3.5 bg-coral text-white font-bold text-base sm:text-lg rounded-full hover:bg-coral/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Explore Boating →
            </Link>
            <Link
              href="/weather"
              className="inline-flex items-center px-7 py-3.5 bg-white/15 backdrop-blur-md text-white font-bold text-base sm:text-lg rounded-full border border-white/40 hover:bg-white/25 transition-all"
            >
              Check Conditions
            </Link>
            <Link
              href="#find-a-boat"
              className="inline-flex items-center px-5 py-3.5 text-white/90 font-semibold text-sm sm:text-base underline-offset-4 hover:underline"
            >
              Find a Boat
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
