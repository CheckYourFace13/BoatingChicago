import type { ChicagoWeatherPayload } from "@/types/weather";
import { formatMph, formatTemp } from "@/lib/weather";

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-white/80 border border-sky-blue/20 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-lake-blue/60 mb-1">
        {label}
      </p>
      <p className="text-lg font-extrabold text-lake-blue">{value}</p>
    </div>
  );
}

export function CurrentBoatingConditions({
  weather,
}: {
  weather: ChicagoWeatherPayload;
}) {
  const c = weather.current;
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
        Current conditions
      </h2>
      <p className="text-gray-600 mb-6 max-w-3xl">
        Observed near Chicago for recreational boaters. Lake conditions can differ
        from downtown air readings — always cross-check the nearshore marine
        forecast before you leave the harbor.
      </p>
      {!c ? (
        <p className="text-gray-600">
          Current observation is not currently available from source.
        </p>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">
            {c.stationName || c.stationId}
            {c.observedAt
              ? ` · Observed ${new Date(c.observedAt).toLocaleString("en-US", {
                  timeZone: "America/Chicago",
                })}`
              : null}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Metric label="Air temp" value={formatTemp(c.temperatureF)} />
            <Metric label="Feels like" value={formatTemp(c.feelsLikeF)} />
            <Metric
              label="Conditions"
              value={c.description || "Not currently available from source"}
            />
            <Metric label="Wind" value={formatMph(c.windSpeedMph)} />
            <Metric
              label="Wind direction"
              value={
                c.windDirectionCardinal ||
                "Not currently available from source"
              }
            />
            <Metric label="Gusts" value={formatMph(c.windGustMph)} />
            <Metric
              label="Humidity"
              value={
                c.humidityPct == null
                  ? "Not currently available from source"
                  : `${c.humidityPct}%`
              }
            />
            <Metric
              label="Visibility"
              value={
                c.visibilityMiles == null
                  ? "Not currently available from source"
                  : `${c.visibilityMiles} mi`
              }
            />
          </div>
        </>
      )}
    </section>
  );
}

export function LakeConditions({ weather }: { weather: ChicagoWeatherPayload }) {
  const lake = weather.lake;
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
        Lake Michigan nearshore
      </h2>
      <p className="text-gray-600 mb-6 max-w-3xl">
        Wave and water readings come from NOAA buoy data when the station reports
        them. Missing values mean the buoy did not report that field — we never
        invent lake numbers.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Metric
          label="Water temperature"
          value={
            lake.waterTempF == null
              ? "Not currently available from source"
              : `${lake.waterTempF}°F`
          }
        />
        <Metric
          label="Wave height"
          value={
            lake.waveHeightFt == null
              ? "Not currently available from source"
              : `~${lake.waveHeightFt} ft`
          }
        />
        <Metric
          label="Buoy"
          value={lake.buoyId || "Not currently available from source"}
        />
      </div>
      {lake.notes ? (
        <p className="text-sm text-gray-500 mt-3">{lake.notes}</p>
      ) : null}
    </section>
  );
}

export function HourlyBoatingForecast({
  weather,
}: {
  weather: ChicagoWeatherPayload;
}) {
  if (!weather.hourly.length) {
    return (
      <section>
        <h2 className="text-2xl font-extrabold text-lake-blue mb-2">
          Hourly forecast
        </h2>
        <p className="text-gray-600">
          Not currently available from source.
        </p>
      </section>
    );
  }
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
        Next 24 hours
      </h2>
      <p className="text-gray-600 mb-6">
        NWS hourly grid forecast for Chicago. Watch wind shifts and thunderstorm
        chances before afternoon lake trips.
      </p>
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="flex gap-3 min-w-max pb-2">
          {weather.hourly.map((h) => (
            <div
              key={h.startTime}
              className="w-28 shrink-0 rounded-xl border border-sky-blue/20 bg-white p-3"
            >
              <p className="text-xs font-bold text-lake-blue/70 mb-2">
                {new Date(h.startTime).toLocaleTimeString("en-US", {
                  timeZone: "America/Chicago",
                  hour: "numeric",
                })}
              </p>
              <p className="text-xl font-extrabold text-lake-blue mb-1">
                {h.temperatureF == null ? "—" : `${h.temperatureF}°`}
              </p>
              <p className="text-xs text-gray-600 leading-snug mb-2 line-clamp-3">
                {h.shortForecast || "—"}
              </p>
              <p className="text-xs text-gray-500">
                Wind {h.windSpeedMph ?? "—"} mph
                {h.precipProbabilityPct != null
                  ? ` · ${h.precipProbabilityPct}%`
                  : ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SevenDayForecast({
  weather,
}: {
  weather: ChicagoWeatherPayload;
}) {
  if (!weather.daily.length) {
    return (
      <section>
        <h2 className="text-2xl font-extrabold text-lake-blue mb-2">
          7-day forecast
        </h2>
        <p className="text-gray-600">Not currently available from source.</p>
      </section>
    );
  }
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
        7-day outlook
      </h2>
      <div className="space-y-3">
        {weather.daily.map((d) => (
          <div
            key={`${d.name}-${d.startTime}`}
            className="rounded-xl border border-sky-blue/20 bg-white p-4 md:flex md:items-start md:justify-between gap-4"
          >
            <div className="md:w-40 shrink-0">
              <p className="font-extrabold text-lake-blue">{d.name}</p>
              <p className="text-2xl font-extrabold text-sky-blue">
                {d.temperatureF == null ? "—" : `${d.temperatureF}°F`}
              </p>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 mb-1">
                {d.shortForecast}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {d.detailedForecast}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Wind {d.windDirection || ""} {d.windSpeed || "—"}
                {d.precipProbabilityPct != null
                  ? ` · Precip ${d.precipProbabilityPct}%`
                  : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
