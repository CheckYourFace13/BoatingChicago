import Link from "next/link";
import { getPublishedStorageFacilities } from "@/data/geo";
import { SourceLink } from "@/components/geo/SourceAttribution";

/**
 * Verified storage operator comparison for the educational storage guide.
 * Never invents prices, ratings, waitlists, or availability.
 */
export function StorageProviderCompare() {
  const facilities = getPublishedStorageFacilities();

  return (
    <section className="space-y-4">
      <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue">
        Chicago-area storage providers (verified directory)
      </h2>
      <p className="text-gray-700 leading-relaxed max-w-4xl">
        Searchers looking for “boat storage Chicago” usually need operator pages
        for indoor vs outdoor options, haul-out, and contracts — not just
        general advice. The rows below come from each operator’s official
        storage page. Fees, waitlists, and boat-size limits change; confirm on
        the linked source. Full directory:{" "}
        <Link href="/storage" className="font-semibold text-sky-blue hover:underline">
          /storage
        </Link>
        .
      </p>

      <div className="overflow-x-auto rounded-2xl border border-sky-blue/20 bg-white shadow-sm">
        <table className="min-w-full text-sm text-left">
          <caption className="sr-only">
            Verified Chicago-area boat storage operators with official links
          </caption>
          <thead className="bg-lake-blue text-white">
            <tr>
              <th className="px-4 py-3 font-semibold">Operator</th>
              <th className="px-4 py-3 font-semibold">Location</th>
              <th className="px-4 py-3 font-semibold">Confirmed services</th>
              <th className="px-4 py-3 font-semibold">Official source</th>
            </tr>
          </thead>
          <tbody>
            {facilities.map((facility, i) => (
              <tr
                key={facility.slug}
                className={i % 2 === 0 ? "bg-white" : "bg-light-blue/30"}
              >
                <td className="px-4 py-3 font-semibold text-lake-blue align-top">
                  {facility.name}
                </td>
                <td className="px-4 py-3 text-gray-700 align-top">
                  {facility.location}
                </td>
                <td className="px-4 py-3 text-gray-700 align-top">
                  <ul className="list-disc pl-4 space-y-1">
                    {facility.confirmedServices.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 align-top">
                  <SourceLink source={facility.source} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 max-w-4xl">
        Absence of a service in this table is not proof the yard lacks it —
        only that we have not confirmed it on the cited page. Related planning:{" "}
        <Link
          href="/chicago-boat-winterization"
          className="font-semibold text-sky-blue hover:underline"
        >
          winterization hub
        </Link>
        ,{" "}
        <Link
          href="/chicago-boat-shrink-wrap-guide"
          className="font-semibold text-sky-blue hover:underline"
        >
          shrink-wrap guide
        </Link>
        ,{" "}
        <Link
          href="/tools/ownership-cost"
          className="font-semibold text-sky-blue hover:underline"
        >
          ownership cost worksheet
        </Link>
        .
      </p>
    </section>
  );
}
