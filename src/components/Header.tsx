"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { trackingAttrs } from "@/lib/tracking";

const navLinks = [
  { href: "/boat-rentals-chicago", label: "Boat Rentals" },
  { href: "/yacht-rentals-chicago", label: "Yacht Charters" },
  { href: "/party-boat-rentals-chicago", label: "Party Boats" },
  { href: "/fishing-charters-chicago", label: "Fishing" },
  { href: "/vendors", label: "Vendors" },
  { href: "/list-your-business", label: "List Your Business", track: true },
];

const experienceLinks = [
  { href: "/chicago-architecture-cruises", label: "Architecture Cruises" },
  { href: "/chicago-fireworks-cruises", label: "Fireworks Cruises" },
  { href: "/chicago-dining-cruises", label: "Dining Cruises" },
  { href: "/chicago-tiki-cruises", label: "Tiki Cruises" },
  { href: "/chicago-sailing-charters", label: "Sailing Charters" },
  { href: "/chicago-sunset-cruises", label: "Sunset Cruises" },
  { href: "/chicago-jet-ski-rentals", label: "Jet Ski Rentals" },
  { href: "/chicago-kayak-rentals", label: "Kayak Rentals" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [experiencesOpen, setExperiencesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-blue/20 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo size="md" />

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-semibold text-lake-blue/80 hover:text-lake-blue rounded-lg hover:bg-light-blue transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setExperiencesOpen(true)}
              onMouseLeave={() => setExperiencesOpen(false)}
            >
              <button
                type="button"
                className="px-3 py-2 text-sm font-semibold text-lake-blue/80 hover:text-lake-blue rounded-lg hover:bg-light-blue transition-colors"
                aria-expanded={experiencesOpen}
              >
                Experiences ▾
              </button>
              {experiencesOpen && (
                <div className="absolute left-0 top-full pt-1 z-50">
                  <div className="w-56 rounded-2xl border border-sky-blue/20 bg-white shadow-lg py-2">
                    {experienceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2.5 text-sm font-semibold text-lake-blue hover:bg-light-blue"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                {...(link.track ? trackingAttrs.listBusinessClick : {})}
                className="px-3 py-2 text-sm font-semibold text-lake-blue/80 hover:text-lake-blue rounded-lg hover:bg-light-blue transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/#find-a-boat"
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-coral text-white font-bold text-sm rounded-full hover:bg-coral/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Find a Boat
            </Link>

            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-lake-blue hover:bg-light-blue"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav className="lg:hidden pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                {...(link.track ? trackingAttrs.listBusinessClick : {})}
                className="block px-3 py-2.5 text-sm font-semibold text-lake-blue rounded-lg hover:bg-light-blue"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <p className="px-3 pt-3 pb-1 text-xs font-bold uppercase tracking-wide text-sky-blue">
              Experiences
            </p>
            {experienceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 text-sm font-semibold text-lake-blue rounded-lg hover:bg-light-blue"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#find-a-boat"
              className="block mt-2 text-center px-5 py-2.5 bg-coral text-white font-bold text-sm rounded-full"
              onClick={() => setOpen(false)}
            >
              Find a Boat
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
