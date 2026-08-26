import Link from "next/link";

export interface ResourceLink {
  href: string;
  label: string;
}

/** Priority category → useful internal resources (geo, conditions, guides). */
export const CATEGORY_RESOURCE_LINKS: Record<string, ResourceLink[]> = {
  "boat-rentals-chicago": [
    { href: "/destinations/chicago", label: "Boating in Chicago" },
    { href: "/weather", label: "Boating weather" },
    { href: "/marinas", label: "Marinas directory" },
    { href: "/boat-launches", label: "Boat launches" },
    { href: "/chicago-playpen-guide", label: "Playpen guide" },
    { href: "/lake-michigan-boating-guide", label: "Lake Michigan guide" },
  ],
  "yacht-rentals-chicago": [
    { href: "/destinations/chicago", label: "Boating in Chicago" },
    { href: "/marinas", label: "Marinas directory" },
    { href: "/weather", label: "Boating weather" },
    { href: "/chicago-marina-guide", label: "Chicago marina guide" },
    { href: "/guides", label: "All guides" },
  ],
  "party-boat-rentals-chicago": [
    { href: "/chicago-playpen-guide", label: "Playpen guide" },
    { href: "/destinations/chicago", label: "Boating in Chicago" },
    { href: "/navy-pier-fireworks-boat-rentals", label: "Fireworks boats" },
    { href: "/weather", label: "Boating weather" },
    { href: "/events", label: "Boating events" },
  ],
  "chicago-playpen-boat-rentals": [
    { href: "/chicago-playpen-guide", label: "Complete Playpen guide" },
    { href: "/destinations/chicago", label: "Boating in Chicago" },
    { href: "/weather", label: "Lake conditions" },
    { href: "/party-boat-rentals-chicago", label: "Party boat rentals" },
    { href: "/marinas", label: "Marinas" },
  ],
  "navy-pier-fireworks-boat-rentals": [
    { href: "/chicago-fireworks-cruise-guide", label: "Fireworks cruise guide" },
    { href: "/events", label: "Events calendar" },
    { href: "/destinations/chicago", label: "Boating in Chicago" },
    { href: "/weather", label: "Boating weather" },
    { href: "/marinas", label: "Marinas" },
  ],
  "air-and-water-show-boat-rentals": [
    { href: "/chicago-air-and-water-show-boats", label: "Air & Water Show guide" },
    { href: "/events", label: "Events" },
    { href: "/destinations/chicago", label: "Boating in Chicago" },
    { href: "/weather", label: "Boating weather" },
    { href: "/news", label: "Boating news" },
  ],
  "fishing-charters-chicago": [
    { href: "/chicago-fishing-guide", label: "Chicago fishing guide" },
    { href: "/destinations/chicago", label: "Boating in Chicago" },
    { href: "/weather", label: "Lake conditions" },
    { href: "/boat-launches", label: "Boat launches" },
    { href: "/news", label: "Boating news" },
  ],
  "captains-for-hire-chicago": [
    { href: "/boat-rentals-chicago", label: "Boat rentals" },
    { href: "/yacht-rentals-chicago", label: "Yacht charters" },
    { href: "/destinations/chicago", label: "Boating in Chicago" },
    { href: "/weather", label: "Boating weather" },
    { href: "/beginners-guide-boating-chicago", label: "Beginner’s guide" },
  ],
  "chicago-marinas": [
    { href: "/marinas", label: "Marinas directory" },
    { href: "/chicago-marina-guide", label: "Harbor-by-harbor guide" },
    { href: "/boat-launches", label: "Boat launches" },
    { href: "/destinations/chicago", label: "Boating in Chicago" },
    { href: "/weather", label: "Boating weather" },
  ],
};

interface ExploreResourcesProps {
  title?: string;
  description?: string;
  links: ResourceLink[];
}

export function ExploreResources({
  title = "Useful local resources",
  description = "Conditions, destinations, and guides that pair with this page.",
  links,
}: ExploreResourcesProps) {
  if (!links.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-extrabold text-lake-blue mb-2">{title}</h2>
      <p className="text-gray-600 mb-4 text-sm max-w-2xl">{description}</p>
      <div className="flex flex-wrap gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-4 py-2 bg-white border border-sky-blue/30 text-lake-blue font-semibold text-sm rounded-full hover:bg-light-blue transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
