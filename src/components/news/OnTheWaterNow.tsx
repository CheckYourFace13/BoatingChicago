import Link from "next/link";
import type { ChicagoWeatherPayload } from "@/types/weather";

/** Compact live conditions module for the news publication page. */
export function OnTheWaterNow({ weather }: { weather: ChicagoWeatherPayload }) {
  const alertCount = weather.alerts.length;
  const wind = weather.current?.windSpeedMph;
  const waves = weather.lake.waveHeightFt;
  const temp = weather.current?.temperatureF;

  return (
    <section className="rounded-2xl border border-sky-blue/25 bg-gradient-to-br from-lake-blue to-sky-blue text-white p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-sun-yellow mb-1">
            On the water now
          </p>
          <h2 className="text-xl md:text-2xl font-extrabold">
            Chicago conditions: {weather.rating.level}
          </h2>
        </div>
        <Link
          href="/weather"
          className="text-sm font-bold text-sun-yellow hover:underline shrink-0"
        >
          Full weather →
        </Link>
      </div>
      <p className="text-white/90 text-sm leading-relaxed mb-4 max-w-3xl">
        {weather.rating.reason} Informational only — always verify NOAA/NWS
        marine products before you cast off.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
        <div className="rounded-xl bg-white/10 px-3 py-2">
          <p className="text-white/70 text-xs uppercase tracking-wide">Wind</p>
          <p className="font-bold">
            {wind != null ? `${Math.round(wind)} mph` : "See weather"}
          </p>
        </div>
        <div className="rounded-xl bg-white/10 px-3 py-2">
          <p className="text-white/70 text-xs uppercase tracking-wide">Air</p>
          <p className="font-bold">
            {temp != null ? `${Math.round(temp)}°F` : "See weather"}
          </p>
        </div>
        <div className="rounded-xl bg-white/10 px-3 py-2">
          <p className="text-white/70 text-xs uppercase tracking-wide">Waves</p>
          <p className="font-bold">
            {waves != null ? `~${waves.toFixed(1)} ft` : "See weather"}
          </p>
        </div>
        <div className="rounded-xl bg-white/10 px-3 py-2">
          <p className="text-white/70 text-xs uppercase tracking-wide">Alerts</p>
          <p className="font-bold">
            {alertCount > 0 ? `${alertCount} active` : "None listed"}
          </p>
        </div>
      </div>
    </section>
  );
}
