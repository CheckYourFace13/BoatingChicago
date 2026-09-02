import Link from "next/link";
import { Logo } from "./Logo";
import { disclaimer, siteConfig } from "@/config/site";

const exploreLinks = [
  { href: "/destinations", label: "Destinations" },
  { href: "/lakes", label: "Lakes & Waterways" },
  { href: "/marinas", label: "Marinas" },
  { href: "/boat-launches", label: "Boat Launches" },
  { href: "/weather", label: "Weather" },
  { href: "/news", label: "News" },
  { href: "/events", label: "Events" },
  { href: "/guides", label: "Guides" },
];

const thingsToDoLinks = [
  { href: "/boat-rentals-chicago", label: "Boat Rentals" },
  { href: "/yacht-rentals-chicago", label: "Yacht Charters" },
  { href: "/chicago-architecture-cruises", label: "Cruises" },
  { href: "/chicago-jet-ski-rentals", label: "Jet Skis" },
  { href: "/chicago-kayak-rentals", label: "Kayaks" },
  { href: "/chicago-sailing-charters", label: "Sailing" },
  { href: "/fishing-charters-chicago", label: "Fishing" },
  { href: "/vendors", label: "Vendors" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact Us" },
  { href: "/list-your-business", label: "List Your Business" },
  { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="bg-lake-blue text-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo className="mb-3" />
            <p className="text-sky-blue/90 text-sm leading-relaxed mb-4">
              Chicago and southern Lake Michigan boating information — weather,
              harbors, launches, news, and guides.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 bg-sun-yellow text-lake-blue font-bold text-sm rounded-full hover:bg-sun-yellow/90 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          <div>
            <h3 className="font-bold text-sun-yellow mb-3">Explore</h3>
            <ul className="space-y-1.5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sun-yellow mb-3">Things To Do</h3>
            <ul className="space-y-1.5">
              {thingsToDoLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sun-yellow mb-3">Company</h3>
            <ul className="space-y-1.5 mb-4">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-xs text-white/60 leading-relaxed mb-3">{disclaimer}</p>
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
