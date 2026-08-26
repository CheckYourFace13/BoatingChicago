import type { MarinaAmenity } from "@/types/geo";
import { amenityLabel } from "@/lib/geo-display";

/**
 * Renders only amenities confirmed on the cited source.
 * Unconfirmed entries (available: null) are listed separately as unknown —
 * never as a "no".
 */
export function AmenityTable({
  amenities,
  sourceName,
}: {
  amenities: MarinaAmenity[];
  sourceName: string;
}) {
  const confirmed = amenities.filter((a) => a.available !== null);
  const unknown = amenities.filter((a) => a.available === null);

  if (!confirmed.length && !unknown.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-extrabold text-lake-blue mb-3">Amenities</h2>
      <p className="text-gray-600 mb-4 max-w-3xl">
        Only amenities stated on {sourceName} are listed here. Anything the
        source does not state is marked unknown rather than guessed.
      </p>

      {confirmed.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-sky-blue/20 shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-lake-blue text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Amenity</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {confirmed.map((amenity, i) => (
                <tr
                  key={amenity.key}
                  className={i % 2 === 0 ? "bg-white" : "bg-light-blue/30"}
                >
                  <td className="px-4 py-3 font-semibold text-lake-blue">
                    {amenityLabel(amenity.key)}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {amenity.available ? "Available" : "Not available"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {amenity.note ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {unknown.length > 0 ? (
        <p className="mt-4 text-sm text-gray-600">
          <span className="font-semibold text-lake-blue">
            Not confirmed on the source:{" "}
          </span>
          {unknown.map((a) => amenityLabel(a.key)).join(", ")}. Check with the
          marina directly.
        </p>
      ) : null}
    </section>
  );
}
