import type { ReactNode } from "react";
import Link from "next/link";
import type { RailModuleId } from "@/config/rails";
import { isRailAdSlotEnabled } from "@/config/rails";
import { getPublishedDestinations, getPublishedEvents } from "@/data/geo";
import type { ChicagoWeatherPayload } from "@/types/weather";

function RailCard({
  title,
  children,
  sticky = false,
}: {
  title: string;
  children: ReactNode;
  sticky?: boolean;
}) {
  return (
    <section
      className={`rounded-2xl border border-sky-blue/20 bg-white p-4 shadow-sm ${
        sticky ? "xl:sticky xl:top-24" : ""
      }`}
    >
      <h2 className="text-xs font-extrabold uppercase tracking-[0.14em] text-lake-blue/70 mb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}

function WeatherNowModule({ weather }: { weather: ChicagoWeatherPayload }) {
  return (
    <RailCard title="Weather Now" sticky>
      <p className="text-2xl font-extrabold text-lake-blue mb-1">
        {weather.rating.level}
      </p>
      <p className="text-sm text-gray-600 leading-relaxed mb-3">
        {weather.rating.reason}
      </p>
      {weather.current?.windSpeedMph != null ? (
        <p className="text-sm text-gray-700 mb-3">
          Wind ~{Math.round(weather.current.windSpeedMph)} mph
          {weather.current.temperatureF != null
            ? ` · ${Math.round(weather.current.temperatureF)}°F`
            : ""}
        </p>
      ) : null}
      <Link
        href="/weather"
        className="text-sm font-bold text-coral hover:underline"
      >
        Full weather →
      </Link>
    </RailCard>
  );
}

function MarineAlertsModule({ weather }: { weather: ChicagoWeatherPayload }) {
  const alerts = weather.alerts.slice(0, 3);
  if (!alerts.length) return null;
  return (
    <RailCard title="Marine Alerts">
      <ul className="space-y-2">
        {alerts.map((a) => (
          <li key={a.id} className="text-sm">
            <a
              href={a.sourceUrl.startsWith("http") ? a.sourceUrl : "/weather"}
              target={a.sourceUrl.startsWith("http") ? "_blank" : undefined}
              rel={
                a.sourceUrl.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="font-semibold text-lake-blue hover:underline"
            >
              {a.event}
            </a>
          </li>
        ))}
      </ul>
      <Link
        href="/weather"
        className="inline-block mt-3 text-sm font-bold text-coral hover:underline"
      >
        All alerts →
      </Link>
    </RailCard>
  );
}

function PopularGuidesModule() {
  const links = [
    { href: "/lake-michigan-boating-guide", label: "Lake Michigan guide" },
    { href: "/chicago-architecture-cruise-guide", label: "Architecture cruises" },
    { href: "/chicago-playpen-guide", label: "Playpen guide" },
    { href: "/chicago-marina-guide", label: "Chicago marinas" },
  ];
  return (
    <RailCard title="Popular Guides">
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm font-semibold text-lake-blue hover:underline"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </RailCard>
  );
}

function UpcomingEventsModule() {
  const events = getPublishedEvents().slice(0, 4);
  if (!events.length) return null;
  return (
    <RailCard title="Upcoming Events">
      <ul className="space-y-2">
        {events.map((e) => (
          <li key={e.slug} className="text-sm text-gray-700">
            <Link href="/events" className="font-semibold text-lake-blue hover:underline">
              {e.title}
            </Link>
          </li>
        ))}
      </ul>
    </RailCard>
  );
}

function DestinationsModule() {
  const destinations = getPublishedDestinations().slice(0, 5);
  return (
    <RailCard title="Popular Destinations">
      <ul className="space-y-2">
        {destinations.map((d) => (
          <li key={d.slug}>
            <Link
              href={`/destinations/${d.slug}`}
              className="text-sm font-semibold text-lake-blue hover:underline"
            >
              {d.name}
            </Link>
          </li>
        ))}
      </ul>
    </RailCard>
  );
}

function ExploreLakeModule() {
  return (
    <RailCard title="Explore Lake Michigan">
      <ul className="space-y-2 text-sm">
        <li>
          <Link href="/lakes/lake-michigan-chicago" className="font-semibold text-lake-blue hover:underline">
            Lake Michigan overview
          </Link>
        </li>
        <li>
          <Link href="/marinas" className="font-semibold text-lake-blue hover:underline">
            Marinas
          </Link>
        </li>
        <li>
          <Link href="/boat-launches" className="font-semibold text-lake-blue hover:underline">
            Boat launches
          </Link>
        </li>
        <li>
          <Link href="/destinations" className="font-semibold text-lake-blue hover:underline">
            Destinations
          </Link>
        </li>
      </ul>
    </RailCard>
  );
}

function NewsletterModule() {
  return (
    <RailCard title="Boating Brief">
      <p className="text-sm text-gray-600 mb-3 leading-relaxed">
        Get conditions and Chicago boating updates in your inbox.
      </p>
      <Link
        href="/#find-a-boat"
        className="text-sm font-bold text-coral hover:underline"
      >
        Join the Brief waitlist on the homepage →
      </Link>
    </RailCard>
  );
}

function FindBoatModule() {
  return (
    <RailCard title="Need a Boat?">
      <p className="text-sm text-gray-600 mb-3 leading-relaxed">
        Match with local rentals and captains — or browse ticketed experiences.
      </p>
      <Link
        href="/#find-a-boat"
        className="inline-flex text-sm font-bold text-coral hover:underline"
      >
        Find a Boat →
      </Link>
    </RailCard>
  );
}

/** Disabled ad placeholder — never shows fake ads. */
function AdSlotModule({ slot }: { slot: "desktop_left_rail" | "desktop_right_rail" }) {
  if (!isRailAdSlotEnabled(slot)) return null;
  return (
    <RailCard title="Sponsored">
      <p className="text-xs text-gray-500">Advertisement</p>
    </RailCard>
  );
}

export function SideRail({
  modules,
  weather,
  stickyFirst = true,
}: {
  modules: RailModuleId[];
  weather?: ChicagoWeatherPayload | null;
  stickyFirst?: boolean;
}) {
  const nodes: ReactNode[] = [];

  for (const mod of modules) {
    if (mod === "weather_now" && weather) {
      nodes.push(
        <WeatherNowModule key={mod} weather={weather} />
      );
      continue;
    }
    if (mod === "marine_alerts" && weather) {
      const el = <MarineAlertsModule key={mod} weather={weather} />;
      if (el) nodes.push(el);
      continue;
    }
    if (mod === "popular_guides") {
      nodes.push(<PopularGuidesModule key={mod} />);
      continue;
    }
    if (mod === "upcoming_events") {
      const el = <UpcomingEventsModule key={mod} />;
      if (el) nodes.push(el);
      continue;
    }
    if (mod === "popular_destinations") {
      nodes.push(<DestinationsModule key={mod} />);
      continue;
    }
    if (mod === "explore_lake_michigan") {
      nodes.push(<ExploreLakeModule key={mod} />);
      continue;
    }
    if (mod === "newsletter") {
      nodes.push(<NewsletterModule key={mod} />);
      continue;
    }
    if (mod === "find_a_boat") {
      nodes.push(<FindBoatModule key={mod} />);
      continue;
    }
    if (mod === "ad_slot") {
      // Intentionally no-op unless rail ads enabled
      nodes.push(
        <AdSlotModule key={mod} slot="desktop_right_rail" />
      );
    }
  }

  if (!nodes.length) return null;

  // Only first card sticky when requested — avoid fighting sticky elements
  const withSticky = stickyFirst
    ? nodes.map((node, i) =>
        i === 0 ? node : node
      )
    : nodes;

  return <div className="space-y-5">{withSticky}</div>;
}
