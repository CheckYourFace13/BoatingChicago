"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { TrackedLink } from "./TrackedLink";

type NavItem = { href: string; label: string; track?: boolean };
type NavGroup = { label: string; items: NavItem[] };

const exploreLinks: NavItem[] = [
  { href: "/destinations", label: "Destinations" },
  { href: "/lakes", label: "Lakes & Waterways" },
  { href: "/marinas", label: "Marinas" },
  { href: "/boat-launches", label: "Boat Launches" },
];

const conditionsLinks: NavItem[] = [
  { href: "/weather", label: "Weather & Lake Conditions" },
  { href: "/weather#alerts", label: "Marine Alerts" },
  { href: "/events", label: "Events" },
];

const thingsToDoLinks: NavItem[] = [
  { href: "/boat-rentals-chicago", label: "Boat Rentals" },
  { href: "/yacht-rentals-chicago", label: "Yacht Charters" },
  { href: "/party-boat-rentals-chicago", label: "Party Boats" },
  { href: "/fishing-charters-chicago", label: "Fishing" },
  { href: "/chicago-architecture-cruises", label: "Architecture Cruises" },
  { href: "/chicago-fireworks-cruises", label: "Fireworks Cruises" },
  { href: "/chicago-dining-cruises", label: "Dining Cruises" },
  { href: "/chicago-sailing-charters", label: "Sailing Charters" },
  { href: "/chicago-jet-ski-rentals", label: "Jet Ski Rentals" },
  { href: "/chicago-kayak-rentals", label: "Kayak Rentals" },
  { href: "/list-your-business", label: "List Your Business", track: true },
];

const desktopGroups: NavGroup[] = [
  { label: "Explore", items: exploreLinks },
  { label: "Conditions", items: conditionsLinks },
  { label: "Things To Do", items: thingsToDoLinks },
];

const topLinks: NavItem[] = [
  { href: "/news", label: "News" },
  { href: "/guides", label: "Guides" },
];

function Dropdown({
  label,
  items,
  open,
  setOpen,
}: {
  label: string;
  items: NavItem[];
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="px-3 py-2 text-sm font-semibold text-lake-blue/80 hover:text-lake-blue rounded-lg hover:bg-light-blue transition-colors"
        aria-expanded={open}
      >
        {label} ▾
      </button>
      {open && (
        <div className="absolute left-0 top-full pt-1 z-50">
          <div className="w-56 rounded-2xl border border-sky-blue/20 bg-white shadow-lg py-2">
            {items.map((link) =>
              link.track ? (
                <TrackedLink
                  key={link.href}
                  href={link.href}
                  track="list_business_click"
                  trackParams={{ page: "header" }}
                  className="block px-4 py-2.5 text-sm font-semibold text-lake-blue hover:bg-light-blue"
                >
                  {link.label}
                </TrackedLink>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2.5 text-sm font-semibold text-lake-blue hover:bg-light-blue"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-blue/20 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo size="md" />

          <nav className="hidden lg:flex items-center gap-1">
            {desktopGroups.slice(0, 2).map((group) => (
              <Dropdown
                key={group.label}
                label={group.label}
                items={group.items}
                open={openGroup === group.label}
                setOpen={(v) => setOpenGroup(v ? group.label : null)}
              />
            ))}
            {topLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-semibold text-lake-blue/80 hover:text-lake-blue rounded-lg hover:bg-light-blue transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Dropdown
              label="Things To Do"
              items={thingsToDoLinks}
              open={openGroup === "Things To Do"}
              setOpen={(v) => setOpenGroup(v ? "Things To Do" : null)}
            />
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/destinations"
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-lake-blue text-white font-bold text-sm rounded-full hover:bg-lake-blue/90 transition-all shadow-md"
            >
              Explore
            </Link>
            <Link
              href="/#find-a-boat"
              className="hidden md:inline-flex items-center px-4 py-2 text-sm font-semibold text-coral hover:underline"
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
            {[...desktopGroups.slice(0, 2)].map((group) => (
              <div key={group.label}>
                <p className="px-3 pt-3 pb-1 text-xs font-bold uppercase tracking-wide text-sky-blue">
                  {group.label}
                </p>
                {group.items.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2.5 text-sm font-semibold text-lake-blue rounded-lg hover:bg-light-blue"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
            <p className="px-3 pt-3 pb-1 text-xs font-bold uppercase tracking-wide text-sky-blue">
              News &amp; Guides
            </p>
            {topLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 text-sm font-semibold text-lake-blue rounded-lg hover:bg-light-blue"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div>
              <p className="px-3 pt-3 pb-1 text-xs font-bold uppercase tracking-wide text-sky-blue">
                Things To Do
              </p>
              {thingsToDoLinks.map((link) =>
                link.track ? (
                  <TrackedLink
                    key={link.href}
                    href={link.href}
                    track="list_business_click"
                    trackParams={{ page: "header_mobile" }}
                    className="block px-3 py-2.5 text-sm font-semibold text-lake-blue rounded-lg hover:bg-light-blue"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </TrackedLink>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2.5 text-sm font-semibold text-lake-blue rounded-lg hover:bg-light-blue"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
            <Link
              href="/destinations"
              className="block mx-3 mt-3 text-center px-5 py-3 bg-lake-blue text-white font-bold text-sm rounded-full"
              onClick={() => setOpen(false)}
            >
              Explore Destinations
            </Link>
            <Link
              href="/#find-a-boat"
              className="block mx-3 mt-2 text-center px-5 py-2.5 text-coral font-bold text-sm"
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
