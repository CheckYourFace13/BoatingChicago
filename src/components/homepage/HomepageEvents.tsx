import Link from "next/link";
import type { EventItem } from "@/types/geo";

export function HomepageEvents({ events }: { events: EventItem[] }) {
  const list = events.slice(0, 3);

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
            Upcoming Boating Events
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Seasonal harbor dates and lakefront events with official source links.
            Expired events are filtered out automatically.
          </p>
        </div>
        <Link href="/events" className="font-bold text-coral hover:underline shrink-0">
          All events →
        </Link>
      </div>

      {list.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {list.map((event) => (
            <article
              key={event.slug}
              className="rounded-2xl border border-sky-blue/20 bg-white p-5"
            >
              <p className="text-xs font-bold text-sky-blue mb-2">
                {event.startDate}
                {event.endDate && event.endDate !== event.startDate
                  ? ` – ${event.endDate}`
                  : ""}
              </p>
              <h3 className="font-extrabold text-lake-blue mb-2">{event.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-4 mb-3">
                {event.summary}
              </p>
              <a
                href={event.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-coral hover:underline"
              >
                {event.source.name} →
              </a>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">
          No upcoming curated events on the calendar right now.
        </p>
      )}
    </section>
  );
}
