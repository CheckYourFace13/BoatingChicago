import { HomepageTrackLink } from "@/components/HomepageTrackLink";
import type { ChicagoWeatherPayload } from "@/types/weather";

export function HomepageWeatherFeature({
  weather,
}: {
  weather: ChicagoWeatherPayload;
}) {
  const current = weather.current;
  const dayHigh = weather.daily.find((d) => d.isDaytime);
  const night = weather.daily.find((d) => !d.isDaytime);
  const wind =
    current?.windSpeedMph ?? weather.hourly[0]?.windSpeedMph ?? null;
  const gust = current?.windGustMph ?? weather.hourly[0]?.windGustMph ?? null;
  const alert = weather.alerts.find((a) => a.isMarine);
  const brief =
    dayHigh?.shortForecast ||
    weather.hourly[0]?.shortForecast ||
    current?.description ||
    weather.rating.reason;

  return (
    <section className="rounded-3xl overflow-hidden border border-sky-blue/20 bg-gradient-to-br from-lake-blue via-lake-blue to-sky-blue text-white">
      <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <p className="text-sun-yellow font-bold text-xs tracking-widest uppercase mb-2">
            Chicago · Lake Michigan
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
            Weather &amp; Lake Conditions
          </h2>
          <p className="text-white/85 leading-relaxed mb-6 max-w-xl">
            Informational boating conditions from NOAA/NWS sources — always
            verify marine products before you cast off.
          </p>
          <div className="inline-flex items-center gap-3 rounded-2xl bg-white/10 border border-white/20 px-5 py-4 mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-white/70">
              Boating
            </span>
            <span className="text-2xl font-extrabold text-sun-yellow">
              {weather.rating.level}
            </span>
          </div>
          <HomepageTrackLink
            href="/weather"
            event="homepage_weather_click"
            params={{ placement: "weather_feature" }}
            className="inline-flex items-center px-6 py-3 bg-sun-yellow text-lake-blue font-bold rounded-full hover:bg-sun-yellow/90 transition-colors"
          >
            Full Boating Weather &amp; Lake Conditions →
          </HomepageTrackLink>
        </div>

        <div className="grid grid-cols-2 gap-3 content-start">
          <Metric
            label="Now"
            value={
              current?.temperatureF != null ? `${current.temperatureF}°F` : "—"
            }
          />
          <Metric
            label="High / Low"
            value={
              dayHigh?.temperatureF != null
                ? `${dayHigh.temperatureF}°${
                    night?.temperatureF != null ? ` / ${night.temperatureF}°` : ""
                  }`
                : "—"
            }
          />
          <Metric
            label="Wind"
            value={
              wind != null
                ? `${current?.windDirectionCardinal || weather.hourly[0]?.windDirection || ""} ${wind} mph`.trim()
                : "—"
            }
          />
          <Metric
            label="Gusts"
            value={gust != null ? `${gust} mph` : "—"}
          />
          <Metric
            label="Waves"
            value={
              weather.lake.waveHeightFt != null
                ? `${weather.lake.waveHeightFt} ft`
                : "Not available"
            }
          />
          <Metric
            label="Marine alerts"
            value={alert ? alert.event : "None active"}
          />
          <div className="col-span-2 rounded-2xl bg-white/10 border border-white/15 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">
              Near-term
            </p>
            <p className="text-sm text-white/90 leading-relaxed line-clamp-3">
              {brief}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
      <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">
        {label}
      </p>
      <p className="font-extrabold text-white text-sm sm:text-base leading-snug">
        {value}
      </p>
    </div>
  );
}
