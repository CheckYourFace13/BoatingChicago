import Link from "next/link";
import { Logo } from "./Logo";
import { disclaimer, siteConfig } from "@/config/site";

const popularSearches = [
  { href: "/boat-rentals-chicago", label: "Boat Rentals Chicago" },
  { href: "/yacht-rentals-chicago", label: "Yacht Rentals Chicago" },
  { href: "/party-boat-rentals-chicago", label: "Party Boat Rentals" },
  { href: "/chicago-playpen-boat-rentals", label: "Playpen Boat Rentals" },
  { href: "/navy-pier-fireworks-boat-rentals", label: "Fireworks Boat Rentals" },
  { href: "/bachelorette-boat-rentals-chicago", label: "Bachelorette Boat Parties" },
];

const categories = [
  { href: "/birthday-boat-rentals-chicago", label: "Birthday Boat Rentals" },
  { href: "/corporate-yacht-charters-chicago", label: "Corporate Yacht Charters" },
  { href: "/air-and-water-show-boat-rentals", label: "Air & Water Show Boats" },
  { href: "/fishing-charters-chicago", label: "Fishing Charters" },
  { href: "/captains-for-hire-chicago", label: "Captains for Hire" },
  { href: "/chicago-marinas", label: "Chicago Marinas" },
  { href: "/boat-storage-chicago", label: "Boat Storage" },
  { href: "/boat-detailing-chicago", label: "Boat Detailing" },
  { href: "/boat-repair-chicago", label: "Boat Repair" },
];

const experienceLinks = [
  { href: "/chicago-architecture-cruises", label: "Architecture Cruises" },
  { href: "/chicago-fireworks-cruises", label: "Fireworks Cruises" },
  { href: "/chicago-dining-cruises", label: "Dining Cruises" },
  { href: "/chicago-tiki-cruises", label: "Tiki Cruises" },
  { href: "/chicago-jet-ski-rentals", label: "Jet Ski Rentals" },
  { href: "/chicago-kayak-rentals", label: "Kayak Rentals" },
];

const vendorLinks = [
  { href: "/vendors", label: "Browse Vendors" },
  { href: "/list-your-business", label: "List Your Business" },
  { href: "/#find-a-boat", label: "Request a Quote" },
];

export function Footer() {
  return (
    <footer className="bg-lake-blue text-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Logo className="mb-4" />
            <p className="text-sky-blue/90 text-sm leading-relaxed mb-4">
              Chicago&apos;s local guide to boat rentals, yacht charters, party boats, and everything Lake Michigan.
            </p>
            <Link
              href="/#find-a-boat"
              className="inline-flex items-center px-5 py-2.5 bg-sun-yellow text-lake-blue font-bold text-sm rounded-full hover:bg-sun-yellow/90 transition-colors"
            >
              Find a Boat
            </Link>
          </div>

          <div>
            <h3 className="font-bold text-sun-yellow mb-4">Popular Searches</h3>
            <ul className="space-y-2">
              {popularSearches.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sun-yellow mb-4">Boating Categories</h3>
            <ul className="space-y-2">
              {categories.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-bold text-sun-yellow mb-4 mt-8">Experiences</h3>
            <ul className="space-y-2">
              {experienceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sun-yellow mb-4">For Vendors</h3>
            <ul className="space-y-2 mb-6">
              {vendorLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-sm text-white/70">
              Questions?{" "}
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-sky-blue hover:underline">
                {siteConfig.contactEmail}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10">
          <p className="text-xs text-white/60 leading-relaxed mb-4">{disclaimer}</p>
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
