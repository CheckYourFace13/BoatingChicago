import Link from "next/link";
import type { EventCategory } from "@/types/geo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import {
  QualityDisclaimer,
  SourceLink,
} from "@/components/geo/SourceAttribution";
import { getPublishedEvents } from "@/data/geo";
import { formatEventDates } from "@/lib/geo-display";
import { buildMetadata } from "@/lib/seo";
import { ResourceCrossLinks } from "@/components/ResourceCrossLinks";

/** Expired events drop off the list, so refresh the static render hourly. */
export const revalidate = 3600;

const CATEGORY_LABELS: Record<EventCategory, string> = {
  "air-show": "Air show",
  fireworks: "Fireworks",
  festival: "Festival",
  race: "Race",
  seasonal: "Season dates",
  other: "On the water",
};

export const metadata = buildMetadata({
  title: "Chicago Boating Events & Season Dates",
  description:
    "Upcoming Chicago-area boating events and harbor season dates — lakefront shows, fireworks nights, and marina seasons — each linked to the official schedule.",
  path: "/events",
});

export default function EventsPage() {
  const events = getPublishedEvents().sort((a, b) =>
    a.startDate.localeCompare(b.startDate),
  );

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Events", path: "/events" },
        ]}
      />

      <GeoHero
        eyebrow="On the water this season"
        title="Chicago Boating Events & Season Dates"
        intro="Lakefront events boaters plan around, plus published harbor and marina season windows. Dates come from the organizer or agency — confirm on the official page before you build a trip around one."
        links={[
          { label: "Boating weather →", href: "/weather" },
          { label: "Boating news", href: "/news" },
          { label: "Destinations", href: "/destinations" },
          { label: "Marinas", href: "/marinas" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <QualityDisclaimer />

        {events.length > 0 ? (
          <ul className="space-y-4">
            {events.map((event) => (
              <li
                key={event.slug}
                className="rounded-2xl border border-sky-blue/20 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-coral">
                    {CATEGORY_LABELS[event.category]}
                  </span>
                  <span className="text-sm font-semibold text-lake-blue">
                    {formatEventDates(event)}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-lake-blue mb-1">
                  {event.title}
                </h2>
                <p className="text-sm text-gray-500 mb-3">{event.location}</p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {event.summary}
                </p>
                <p className="text-sm">
                  <SourceLink source={event.source} />
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">
            No upcoming events are published right now. Next season&apos;s
            schedules post through the winter — check{" "}
            <Link
              href="/news"
              className="font-semibold text-coral hover:underline"
            >
              Chicago boating news
            </Link>{" "}
            in the meantime.
          </p>
        )}

        <section className="rounded-2xl bg-lake-blue text-white p-6 md:p-8">
          <h2 className="text-xl font-extrabold mb-2">
            Planning a boat around an event
          </h2>
          <p className="text-white/90 leading-relaxed max-w-3xl mb-4">
            Fireworks nights and show weekends draw heavy traffic on the water
            and in the harbors. Book early, confirm the schedule on the official
            page, and check the marine forecast the morning of — a good event
            date is not automatically a good boating day.
          </p>
          <div className="flex flex-wrap gap-3 text-sm font-semibold">
            <Link href="/weather" className="text-sun-yellow hover:underline">
              Lake Michigan conditions →
            </Link>
            <Link
              href="/chicago-fireworks-cruise-guide"
              className="text-white/90 hover:underline"
            >
              Fireworks cruise guide
            </Link>
            <Link
              href="/chicago-air-and-water-show-boats"
              className="text-white/90 hover:underline"
            >
              Air &amp; Water Show boats
            </Link>
          </div>
        </section>

        <ResourceCrossLinks
          links={[
            { href: "/weather", label: "Weather" },
            { href: "/news", label: "News" },
            { href: "/destinations", label: "Destinations" },
            { href: "/marinas", label: "Marinas" },
            { href: "/boat-launches", label: "Boat launches" },
            { href: "/guides", label: "Guides" },
          ]}
        />
      </div>
    </>
  );
}
