import Link from "next/link";
import { Logo } from "./Logo";
import { HeroSlideshow } from "./HeroSlideshow";
import { TrackedLink } from "./TrackedLink";

export function Hero() {
  return (
    <section className="relative min-h-[88vh] md:min-h-[92vh] flex items-end overflow-hidden text-white">
      <HeroSlideshow />

      <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 pt-28 md:pb-28 md:pt-32">
        <div className="max-w-3xl">
          <div className="mb-6 animate-fade-up" style={{ animationDelay: "60ms" }}>
            <Logo size="lg" variant="light" />
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.08] tracking-tight mb-5 animate-fade-up"
            style={{ animationDelay: "140ms" }}
          >
            Find the Best Boat Rentals, Yacht Charters &amp; Boating Experiences in Chicago
          </h1>

          <p
            className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            Lake Michigan sunsets, the Playpen, Navy Pier fireworks, bachelorette parties,
            birthdays, corporate events, fishing charters, and captains — Chicago&apos;s on-water
            guide built to get you booked.
          </p>

          <div
            className="flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: "340ms" }}
          >
            <Link
              href="#find-a-boat"
              className="inline-flex items-center px-8 py-4 bg-coral text-white font-bold text-lg rounded-full hover:bg-coral/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cta-pulse"
            >
              Find a Boat →
            </Link>
            <TrackedLink
              href="/list-your-business"
              track="list_business_click"
              trackParams={{ page: "homepage_hero" }}
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold text-lg rounded-full border border-white/35 hover:bg-white/20 transition-all"
            >
              List Your Boating Business
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
