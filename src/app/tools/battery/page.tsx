import { BatteryCalculator } from "@/components/tools/Calculators";
import { ToolArticle } from "@/components/tools/ToolArticle";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Boat Battery Runtime Estimator | BoatingChicago",
    description:
      "Estimate runtime from amp-hours, voltage, load watts, and usable capacity. Peukert effect, temperature, and inverter losses are not modeled.",
    path: "/tools/battery",
  });
}

export default function BatteryPage() {
  return (
    <ToolArticle
      title="Battery runtime estimator"
      path="/tools/battery"
      intro="Runtime hours ≈ (amp-hours × volts × usable fraction) ÷ load watts. Cold weather, old batteries, and inverters all reduce real runtime. This is a planning estimate for house loads, not a starting-battery health test."
      faqs={[
        {
          question: "Why start usable capacity at 50%?",
          answer:
            "Lead-acid banks are commonly not discharged fully. If your battery maker publishes a different usable range, type that percentage.",
        },
      ]}
      citations={[
        {
          name: "U.S. Coast Guard — navigation lights and electrical safety materials",
          url: "https://www.uscgboating.org/",
        },
      ]}
      related={[
        { href: "/tools/trip-checklist", label: "Trip checklist" },
        { href: "/chicago-boat-winterization", label: "Winterization" },
        { href: "/boat-ownership", label: "Boat ownership" },
      ]}
    >
      <BatteryCalculator />
    </ToolArticle>
  );
}
