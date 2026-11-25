import Link from "next/link";
import { getDestinationBySlug } from "@/data/geo";
import { HomepageTrackLink } from "@/components/HomepageTrackLink";

interface RegionCard {
  title: string;
  destinationSlug?: string;
  href?: string;
  blurb: string;
  links?: { label: string; href: string }[];
}

const REGION_CARDS: RegionCard[] = [
  {
    title: "Chicago Lakefront",
    destinationSlug: "chicago",
    blurb:
      "Park District harbors, downtown slips, and public launches along fourteen miles of Lake Michigan shoreline.",
    links: [
      { label: "Marinas", href: "/marinas" },
      { label: "Boat launches", href: "/boat-launches" },
    ],
  },
  {
    title: "Browse by region",
    href: "/regions",
    blurb:
      "Chicago & Chicagoland, Wisconsin and Michigan Lake Michigan shores, Indiana south shore, inland waters, and the full lake.",
    links: [{ label: "All regions", href: "/regions" }],
  },
  {
    title: "Chain O' Lakes",
    destinationSlug: "chain-o-lakes",
    blurb:
      "Illinois' interconnected natural lakes and Fox River channels, with state park access northwest of the city.",
    links: [{ label: "Chain O' Lakes waterway", href: "/lakes/chain-o-lakes" }],
  },
  {
    title: "Door County & Green Bay",
    destinationSlug: "door-county",
    blurb:
      "Sturgeon Bay city launches, Green Bay Metro ramp, and peninsula planning for Wisconsin’s northern Lake Michigan arm.",
    links: [
      { label: "Sturgeon Bay", href: "/destinations/sturgeon-bay" },
      { label: "Green Bay", href: "/destinations/green-bay" },
    ],
  },
  {
    title: "Milwaukee to Manitowoc",
    destinationSlug: "milwaukee",
    blurb:
      "Western Lake Michigan harbors from Milwaukee through Port Washington, Sheboygan, and Manitowoc.",
    links: [
      { label: "Sheboygan", href: "/destinations/sheboygan" },
      { label: "Manitowoc", href: "/destinations/manitowoc" },
    ],
  },
  {
    title: "Hammond & Michigan City",
    destinationSlug: "hammond",
    blurb:
      "Indiana’s south shore — Hammond Marina’s short water run from Chicago and Michigan City Port Authority harbors.",
    links: [{ label: "Michigan City", href: "/destinations/michigan-city" }],
  },
  {
    title: "Southwest Michigan",
    destinationSlug: "new-buffalo",
    blurb:
      "Harbor Country through Grand Haven — New Buffalo, St. Joseph, South Haven, Saugatuck, Holland, and Grand Haven.",
    links: [{ label: "Grand Haven", href: "/destinations/grand-haven" }],
  },
  {
    title: "Muskegon to Traverse City",
    destinationSlug: "muskegon",
    blurb:
      "Muskegon Lake, Ludington’s Pere Marquette harbor, and Clinch Marina on Grand Traverse Bay.",
    links: [
      { label: "Ludington", href: "/destinations/ludington" },
      { label: "Traverse City", href: "/destinations/traverse-city" },
    ],
  },
];

export function ExploreRegionCards() {
  const cards = REGION_CARDS.filter((card) => {
    if (card.href) return true;
    return (
      !!card.destinationSlug &&
      !!getDestinationBySlug(card.destinationSlug)?.isPublished
    );
  });

  if (!cards.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const primaryHref =
          card.href ?? `/destinations/${card.destinationSlug}`;
        const trackKey = card.destinationSlug ?? "regions";
        return (
          <div
            key={primaryHref}
            className="rounded-2xl border border-sky-blue/20 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-extrabold text-lake-blue text-lg mb-2">
              <HomepageTrackLink
                href={primaryHref}
                event="homepage_destination_click"
                params={{ destination: trackKey }}
                className="hover:underline"
              >
                {card.title}
              </HomepageTrackLink>
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {card.blurb}
            </p>
            <div className="flex flex-wrap gap-2">
              <HomepageTrackLink
                href={primaryHref}
                event="homepage_destination_click"
                params={{ destination: trackKey, cta: "guide" }}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-lake-blue text-white hover:bg-lake-blue/90 transition-colors"
              >
                {card.href ? "Region hub" : "Destination guide"}
              </HomepageTrackLink>
              {card.links?.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-light-blue text-lake-blue hover:bg-sky-blue/20 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
