import Link from "next/link";
import { Logo } from "./Logo";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-lake-blue via-sky-blue to-sky-blue/80 text-white">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 400">
          <path d="M0,200 C200,150 400,250 600,200 C800,150 1000,250 1200,200 L1200,400 L0,400 Z" fill="white" />
          <path d="M0,280 C300,240 500,320 800,280 C950,260 1100,300 1200,280 L1200,400 L0,400 Z" fill="white" opacity="0.5" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="mb-6">
            <Logo size="lg" variant="light" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Find the Best Boat Rentals, Yacht Charters &amp; Boating Experiences in Chicago
          </h1>

          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl">
            Lake Michigan. The Playpen. Navy Pier fireworks. Bachelorette parties, birthdays, corporate events, fishing charters, and captains — your complete Chicago boating guide starts here.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#find-a-boat"
              className="inline-flex items-center px-8 py-4 bg-coral text-white font-bold text-lg rounded-full hover:bg-coral/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Find a Boat →
            </Link>
            <Link
              href="/list-your-business"
              className="inline-flex items-center px-8 py-4 bg-white/15 backdrop-blur-sm text-white font-bold text-lg rounded-full border-2 border-white/30 hover:bg-white/25 transition-all"
            >
              List Your Boating Business
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
