import Link from "next/link";
import { getBoatUsAffiliateUrl } from "@/config/partner-programs";

/**
 * Renders nothing until an approved BoatUS URL is configured.
 * Event boat_us_click is defined for later; it does not fire while hidden.
 */
export function BoatUsMembershipNote() {
  const url = getBoatUsAffiliateUrl();
  if (!url) return null;

  return (
    <p className="text-sm text-gray-700 leading-relaxed">
      BoatingChicago may earn a membership commission if you join BoatUS through
      our link.{" "}
      <a
        href={url}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        className="font-semibold text-coral hover:underline"
      >
        Learn about BoatUS membership
      </a>
      .
    </p>
  );
}

export function OwnershipNextLinks() {
  return (
    <ul className="flex flex-wrap gap-2">
      {[
        ["/marinas", "Marinas & harbors"],
        ["/boat-launches", "Public launches"],
        ["/chicago-boat-storage-guide", "Winter storage guide"],
        ["/lake-michigan-boating-guide", "Lake Michigan guide"],
        ["/beginners-guide-boating-chicago", "Beginner guide"],
        ["/weather", "Marine weather"],
        ["/destinations/chicago", "Boating in Chicago"],
      ].map(([href, label]) => (
        <li key={href}>
          <Link
            href={href}
            className="inline-flex min-h-[44px] items-center px-4 py-2 bg-white border border-sky-blue/30 text-lake-blue font-semibold text-sm rounded-full hover:bg-light-blue"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
