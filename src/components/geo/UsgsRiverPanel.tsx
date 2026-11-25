import type { UsgsReading } from "@/lib/usgs";

export function UsgsRiverPanel({
  readings,
  title = "USGS river observations",
}: {
  readings: UsgsReading[];
  title?: string;
}) {
  if (readings.length === 0) return null;
  return (
    <section className="rounded-2xl border border-sky-blue/25 bg-white p-5 md:p-6">
      <h2 className="text-xl md:text-2xl font-extrabold text-lake-blue mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        Instantaneous gage height from the U.S. Geological Survey. These are
        river observations, not a safe-to-paddle rating. Readings older than six
        hours are not shown as current.
      </p>
      <ul className="space-y-3">
        {readings.map((r) => (
          <li key={r.gauge.site} className="border-t border-sky-blue/15 pt-3 first:border-0 first:pt-0">
            <p className="font-extrabold text-lake-blue">{r.gauge.name}</p>
            <p className="text-sm text-gray-600">{r.gauge.waterway}</p>
            {r.value != null && r.observedAt && !r.stale ? (
              <p className="text-lg font-extrabold text-lake-blue mt-1">
                {r.value} {r.gauge.unitLabel}
                <span className="block text-xs font-semibold text-gray-500">
                  Observed{" "}
                  {new Date(r.observedAt).toLocaleString("en-US", {
                    timeZone: "America/Chicago",
                  })}
                </span>
              </p>
            ) : (
              <p className="text-sm text-amber-800 mt-1">
                {r.error || "Not currently available from USGS."}
              </p>
            )}
            <p className="text-sm mt-1">
              <a
                href={r.gauge.sourceUrl}
                className="font-semibold text-coral hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                USGS monitoring location {r.gauge.site}
              </a>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
