import { FuelCalculator } from "@/components/tools/Calculators";
import { ToolArticle } from "@/components/tools/ToolArticle";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Boat Trip Fuel & Cost Calculator | BoatingChicago",
    description:
      "Estimate underway time, gallons burned, reserve to keep aboard, and fuel cost from a charted nautical-mile distance, knots, and your measured gallons per hour.",
    path: "/tools/fuel",
  });
}

export default function FuelToolPage() {
  return (
    <ToolArticle
      title="Boat trip fuel and cost calculator"
      path="/tools/fuel"
      intro="Use a measured chart distance, the speed you actually run, and gallons per hour from your engine log. Consumed fuel is what the trip burns; fuel needed aboard is burn plus the reserve you choose. This is not a tank gauge or a safe-to-go rating."
      faqs={[
        {
          question: "Why nautical miles instead of driving miles?",
          answer:
            "Marine charts and GPS routes for boats are in nautical miles. One nautical mile is 1.15078 statute miles. Convert first if you only have a road-map distance — and remember a road distance is not a boat route.",
        },
        {
          question: "Does round trip include current or weather?",
          answer:
            "No. Round trip only doubles the distance you entered. Head seas, current, and idle time are not modeled. Add extra GPH or extra hours if you know they apply.",
        },
      ]}
      citations={[
        {
          name: "NOAA — nautical mile",
          url: "https://oceanservice.noaa.gov/facts/nauticalmile_knot.html",
        },
        {
          name: "U.S. Coast Guard recreational boating safety",
          url: "https://www.uscgboating.org/",
        },
      ]}
      related={[
        { href: "/tools/trip-time", label: "Trip time calculator" },
        { href: "/weather", label: "Lake conditions" },
        { href: "/boat-launches", label: "Boat launches" },
        { href: "/marinas", label: "Marinas" },
        { href: "/boat-financing-ownership-costs-chicago", label: "Ownership cost guide" },
      ]}
    >
      <FuelCalculator />
    </ToolArticle>
  );
}
