import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { siteConfig } from "@/config/site";
import { DEFAULT_WEATHER_LOCATION_ID } from "@/config/weather-locations";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Embed BoatingChicago Marine Conditions Card",
    description:
      "Copy a free, no-tracking iframe snippet for location-specific NWS/NOAA observations with timestamps and a no-safety-clearance disclaimer.",
    path: "/weather/embed",
  });
}

const snippet = `<iframe
  title="BoatingChicago conditions"
  src="${siteConfig.url}/embed/conditions?location=${DEFAULT_WEATHER_LOCATION_ID}"
  width="360"
  height="320"
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  style="border:0;border-radius:12px;max-width:100%;"
></iframe>`;

export default function WeatherEmbedDocsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Weather", path: "/weather" },
          { name: "Embed card", path: "/weather/embed" },
        ]}
      />

      <GeoHero
        eyebrow="Free embed · no tracking · no ads"
        title="Embeddable marine conditions card"
        intro="Clubs, marinas, and local sites can show a BoatingChicago-branded snapshot of official observations. The card is informational only — it never issues a safe/unsafe rating and always links back to the full weather page."
        links={[
          { label: "Full weather page →", href: "/weather" },
          { label: "Live card preview", href: "/weather/embed-test" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 space-y-8 text-gray-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-lake-blue">What it shows</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Location label from BoatingChicago weather anchors</li>
            <li>Air temperature and wind from NWS station observations when available</li>
            <li>Wave height / water temperature from NOAA NDBC when available</li>
            <li>Observation and card-build timestamps (America/Chicago)</li>
            <li>Honest fallbacks when feeds are stale or unavailable</li>
            <li>Prominent link to the matching /weather page</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-lake-blue">Copy this snippet</h2>
          <p className="text-sm">
            Change the <code className="text-lake-blue">location</code> query
            parameter to any supported weather location id (for example{" "}
            <code className="text-lake-blue">milwaukee</code>,{" "}
            <code className="text-lake-blue">traverse-city</code>). Unknown ids
            fall back to Chicago.
          </p>
          <pre className="overflow-x-auto rounded-2xl border border-sky-blue/20 bg-white p-4 text-xs text-lake-blue whitespace-pre-wrap">
            {snippet}
          </pre>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-lake-blue">Rules of use</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Do not strip the BoatingChicago branding or the full-weather link.</li>
            <li>Do not present the card as a go/no-go or safety clearance.</li>
            <li>No API key required. No personal data collection in the card.</li>
            <li>Cached for short intervals; always check official NWS products before going out.</li>
          </ul>
        </section>
      </div>
    </>
  );
}
