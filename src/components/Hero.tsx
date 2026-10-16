import Link from "next/link";
import { BrandPeriod } from "./BrandPeriod";
import { Logo } from "./Logo";
import { HeroSlideshow } from "./HeroSlideshow";
import { getSeasonalHeroCopy } from "@/lib/season";

export function Hero() {
  const seasonal = getSeasonalHeroCopy();

  return (
    <section className="relative min-h-[52vh] md:min-h-[58vh] flex items-end overflow-hidden text-white">
      <HeroSlideshow />

      <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 pt-20 md:pb-14 md:pt-24">
        <div className="max-w-3xl">
          <div className="mb-4 animate-fade-up" style={{ animationDelay: "60ms" }}>
            <Logo size="lg" variant="light" />
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold leading-[1.08] tracking-tight mb-4 animate-fade-up"
            style={{ animationDelay: "140ms" }}
          >
            Your Guide to Boating Chicago &amp; Southern Lake Michigan
            <BrandPeriod />
          </h1>

          <p
            className="text-base md:text-lg text-white/90 leading-relaxed mb-6 max-w-2xl animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            {seasonal.supporting}
          </p>

          <div
            className="flex flex-wrap gap-3 sm:gap-4 animate-fade-up"
            style={{ animationDelay: "340ms" }}
          >
            <Link
              href={seasonal.primaryCta.href}
              className="inline-flex items-center px-6 py-3 bg-coral text-white font-bold text-base rounded-full hover:bg-coral/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {seasonal.primaryCta.label}
            </Link>
            <Link
              href={seasonal.secondaryCta.href}
              className="inline-flex items-center px-6 py-3 bg-white/15 backdrop-blur-md text-white font-bold text-base rounded-full border border-white/40 hover:bg-white/25 transition-all"
            >
              {seasonal.secondaryCta.label}
            </Link>
            <Link
              href="#explore-boating"
              className="inline-flex items-center px-4 py-2.5 text-white/90 font-semibold text-sm sm:text-base underline-offset-4 hover:underline"
            >
              Explore resources
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
