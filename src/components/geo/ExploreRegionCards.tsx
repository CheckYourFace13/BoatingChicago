import Link from "next/link";
import { getDestinationBySlug } from "@/data/geo";
import { HomepageTrackLink } from "@/components/HomepageTrackLink";

interface RegionCard {
  title: string;
  destinationSlug: string;
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
    title: "Chain O' Lakes",
    destinationSlug: "chain-o-lakes",
    blurb:
      "Illinois' interconnected natural lakes and Fox River channels, with state park access northwest of the city.",
    links: [{ label: "Chain O' Lakes waterway", href: "/lakes/chain-o-lakes" }],
  },
  {
    title: "Lake Geneva",
    destinationSlug: "lake-geneva",
    blurb:
      "Southern Wisconsin's deep inland lake, where each shoreline village publishes its own public launch rules.",
    links: [{ label: "Geneva Lake", href: "/lakes/geneva-lake" }],
  },
  {
    title: "North Shore — Waukegan & Winthrop Harbor",
    destinationSlug: "waukegan",
    blurb:
      "The northern Illinois Lake Michigan shore between Chicago and the Wisconsin line.",
    links: [
      { label: "Winthrop Harbor", href: "/destinations/winthrop-harbor" },
    ],
  },
  {
    title: "Kenosha & Racine",
    destinationSlug: "kenosha",
    blurb:
      "Southeastern Wisconsin harbors on the western shore run north of the Illinois line.",
    links: [{ label: "Racine", href: "/destinations/racine" }],
  },
  {
    title: "Milwaukee",
    destinationSlug: "milwaukee",
    blurb:
      "County and municipal lakefront harbors for boaters working the Milwaukee shoreline.",
  },
  {
    title: "Northwest Indiana — Michigan City",
    destinationSlug: "michigan-city",
    blurb:
      "South-shore Port Authority harbors within a fair-weather crossing of Chicago.",
  },
  {
    title: "Southwest Michigan — New Buffalo",
    destinationSlug: "new-buffalo",
    blurb:
      "Harbor Country's municipal transient marina opens the Michigan coast to visiting boaters.",
  },
];

export function ExploreRegionCards() {
  const cards = REGION_CARDS.filter(
    (card) => getDestinationBySlug(card.destinationSlug)?.isPublished,
  );

  if (!cards.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.destinationSlug}
          className="rounded-2xl border border-sky-blue/20 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="font-extrabold text-lake-blue text-lg mb-2">
            <HomepageTrackLink
              href={`/destinations/${card.destinationSlug}`}
              event="homepage_destination_click"
              params={{ destination: card.destinationSlug }}
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
              href={`/destinations/${card.destinationSlug}`}
              event="homepage_destination_click"
              params={{ destination: card.destinationSlug, cta: "guide" }}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-lake-blue text-white hover:bg-lake-blue/90 transition-colors"
            >
              Destination guide
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
      ))}
    </div>
  );
}
