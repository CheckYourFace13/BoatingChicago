import { ConversionCalculator } from "@/components/tools/Calculators";
import { ToolArticle } from "@/components/tools/ToolArticle";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Knots, MPH & Nautical Mile Converter | BoatingChicago",
    description:
      "Convert knots, miles per hour, nautical miles, and statute miles using NOAA’s published factors.",
    path: "/tools/conversions",
  });
}

export default function ConversionsPage() {
  return (
    <ToolArticle
      title="Speed and distance conversions"
      path="/tools/conversions"
      intro="A knot is one nautical mile per hour. NOAA states a nautical mile is 1,852 meters, or about 1.15078 statute miles. Use this when a chart, GPS, or road map mix units."
      faqs={[
        {
          question: "Why not 1.15 exactly?",
          answer:
            "1.15078 is the conventional conversion from the international nautical mile. Rounding to 1.15 is fine for rough talk; this tool keeps the extra digits.",
        },
      ]}
      citations={[
        {
          name: "NOAA — how long is a nautical mile?",
          url: "https://oceanservice.noaa.gov/facts/nauticalmile_knot.html",
        },
      ]}
      related={[
        { href: "/tools/trip-time", label: "Trip time" },
        { href: "/tools/fuel", label: "Fuel calculator" },
        { href: "/weather", label: "Weather" },
      ]}
    >
      <ConversionCalculator />
    </ToolArticle>
  );
}
