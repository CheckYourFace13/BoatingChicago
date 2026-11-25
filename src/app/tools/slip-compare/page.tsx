import { SlipCompareCalculator } from "@/components/tools/Calculators";
import { ToolArticle } from "@/components/tools/ToolArticle";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Compare Marina Slip & Storage Quotes | BoatingChicago",
    description:
      "Line up seasonal marina, slip, and storage quotes you collected, including per-foot rates, season length, and add-on charges.",
    path: "/tools/slip-compare",
  });
}

export default function SlipComparePage() {
  return (
    <ToolArticle
      title="Marina, slip, and storage quote comparison"
      path="/tools/slip-compare"
      intro="Enter the quotes you actually received. Directory amenity chips are not prices. Confirm live rates on the operator’s page before you sign."
      faqs={[
        {
          question: "Should I compare a six-month harbor season to a seven-month inland slip?",
          answer:
            "Use the months-covered field so the monthly equivalent is honest. A cheaper season total can still cost more per month if it covers fewer months.",
        },
      ]}
      citations={[
        {
          name: "Chicago Harbors",
          url: "https://www.chicagoharbors.info/",
        },
      ]}
      related={[
        { href: "/marinas", label: "Marina directory" },
        { href: "/chicago-harbors-seasonal-slips-guide", label: "Harbor slips guide" },
        { href: "/tools/ownership-cost", label: "Ownership cost calculator" },
        { href: "/storage", label: "Storage" },
      ]}
    >
      <SlipCompareCalculator />
    </ToolArticle>
  );
}
