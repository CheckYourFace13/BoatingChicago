import Link from "next/link";
import type { ChicagoWeatherPayload } from "@/types/weather";

/**
 * Contextual explore links after weather content.
 * Informational only — no manufactured safety claims or trip advice.
 */
export function WeatherExploreLinks({
  weather,
}: {
  weather: ChicagoWeatherPayload;
}) {
  const hasAlerts = weather.alerts.length > 0;
  const level = weather.rating.level;

  const primary = [
    { href: "/news", label: "Boating news" },
    { href: "/marinas", label: "Marinas" },
    { href: "/boat-launches", label: "Boat launches" },
    { href: "/destinations", label: "Destinations" },
  ];

  const secondary: { href: string; label: string }[] = [
    { href: "/guides", label: "Boating guides" },
    { href: "/events", label: "Events" },
    { href: "/lakes/lake-michigan-chicago", label: "Lake Michigan" },
  ];

  if (hasAlerts) {
    secondary.unshift({ href: "#marine-alerts", label: "Marine alerts on this page" });
  }

  if (level === "Good") {
    secondary.push({ href: "/destinations/chicago", label: "Boating in Chicago" });
  }

  return (
    <section className="rounded-2xl border border-sky-blue/20 bg-white p-5 md:p-6">
      <h2 className="text-xl font-extrabold text-lake-blue mb-2">
        Explore while you check conditions
      </h2>
      <p className="text-sm text-gray-600 mb-4 max-w-2xl leading-relaxed">
        Use these resources alongside the official forecast above. They are
        planning links — not recommendations based on today&apos;s rating.
      </p>
      <div className="flex flex-wrap gap-2 mb-3">
        {primary.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-sm font-semibold px-3 py-2 rounded-full bg-light-blue text-lake-blue hover:bg-sky-blue/20"
          >
            {l.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {secondary.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-sm font-semibold text-coral hover:underline px-1"
          >
            {l.label} →
          </Link>
        ))}
      </div>
    </section>
  );
}
