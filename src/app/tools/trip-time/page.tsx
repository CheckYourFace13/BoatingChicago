import { TripTimeCalculator } from "@/components/tools/Calculators";
import { ToolArticle } from "@/components/tools/ToolArticle";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Boat Trip Time Calculator | BoatingChicago",
    description:
      "Turn a chart-derived nautical-mile route and cruising speed into underway time. Straight-line distance is not treated as a safe navigable route.",
    path: "/tools/trip-time",
  });
}

export default function TripTimePage() {
  return (
    <ToolArticle
      title="Boat trip time and distance calculator"
      path="/tools/trip-time"
      intro="Time = charted distance ÷ speed through the water, plus any extra minutes you add for locks or no-wake. A straight line on a web map is not a channel. Always navigate from official charts and live conditions."
      faqs={[
        {
          question: "Can I use driving miles from Chicago?",
          answer:
            "Not for this tool. Convert statute miles to nautical miles first, and only after you have a water route. Road miles to a ramp belong on a different plan.",
        },
      ]}
      citations={[
        {
          name: "NOAA — nautical mile and knot",
          url: "https://oceanservice.noaa.gov/facts/nauticalmile_knot.html",
        },
        {
          name: "NOAA Office of Coast Survey charts",
          url: "https://www.charts.noaa.gov/",
        },
      ]}
      related={[
        { href: "/tools/fuel", label: "Fuel calculator" },
        { href: "/tools/conversions", label: "Unit conversions" },
        { href: "/destinations", label: "Destinations" },
        { href: "/weather", label: "Weather" },
      ]}
    >
      <TripTimeCalculator />
    </ToolArticle>
  );
}
