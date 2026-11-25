import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import {
  QualityDisclaimer,
  SourceLink,
} from "@/components/geo/SourceAttribution";
import { getPublishedEvents } from "@/data/geo";
import { formatEventDates } from "@/lib/geo-display";
import { seasonalStatusLabel } from "@/lib/event-status";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { ResourceCrossLinks } from "@/components/ResourceCrossLinks";
import { buildEventSchema } from "@/lib/schema";

export const revalidate = 3600;

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Chicago Boating Season Calendar | Harbor Dates & Events",
    description:
      "Verified Chicago-area boating season dates, fireworks, and shows — each tied to the official agency or operator announcement.",
    path: "/calendar",
  });
}

export default function CalendarPage() {
  const events = getPublishedEvents().sort((a, b) =>
    a.startDate.localeCompare(b.startDate),
  );

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Season calendar", path: "/calendar" },
        ]}
      />
      {events.map((event) => (
        <script
          key={event.slug}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              buildEventSchema({
                name: event.title,
                description: event.summary,
                startDate: event.startDate,
                endDate: event.endDate,
                locationName: event.location,
                officialUrl: event.source.url,
                organizerName: event.source.name,
              }),
            ),
          }}
        />
      ))}
      <GeoHero
        eyebrow="Verified dates only"
        title="Chicago boating season calendar"
        intro="Harbor seasons, fireworks nights, and shows as published by the operator. If a date is not here, we have not verified it yet — check the source rather than assuming last year’s schedule."
        links={[
          { href: "/events", label: "Events list →" },
          { href: "/weather", label: "Conditions" },
          { href: "/marinas", label: "Marinas" },
          { href: "/permits", label: "Rules & permits" },
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 space-y-8">
        <QualityDisclaimer />
        <ol className="space-y-5">
          {events.map((event) => (
            <li
              key={event.slug}
              className="rounded-2xl border border-sky-blue/20 bg-white p-5"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-coral">
                {formatEventDates(event)}
                {seasonalStatusLabel(event)
                  ? ` · ${seasonalStatusLabel(event)}`
                  : ""}
              </p>
              <h2 className="text-lg font-extrabold text-lake-blue mt-1">
                {event.title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">{event.location}</p>
              <p className="text-gray-700 leading-relaxed">{event.summary}</p>
              <p className="text-sm mt-2">
                <SourceLink source={event.source} />
              </p>
            </li>
          ))}
        </ol>
        <p className="text-sm text-gray-600">
          The same dated items also appear on the{" "}
          <Link href="/events" className="font-semibold text-coral hover:underline">
            events
          </Link>{" "}
          page. This calendar view is for seasonal planning, not a ticket store.
        </p>
        <ResourceCrossLinks
          links={[
            { href: "/events", label: "Events" },
            { href: "/destinations/chicago", label: "Chicago destination" },
            { href: "/chicago-harbors-seasonal-slips-guide", label: "Harbor slips" },
            { href: "/weather", label: "Weather" },
            { href: "/tools", label: "Tools" },
          ]}
        />
      </div>
    </>
  );
}
