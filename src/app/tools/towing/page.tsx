import { TowingCalculator } from "@/components/tools/Calculators";
import { ToolArticle } from "@/components/tools/ToolArticle";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Trailer Tongue Weight Planner | BoatingChicago",
    description:
      "A 10–15% planning band of gross trailer weight. Not a hitch class, axle rating, or substitute for the trailer’s certification label.",
    path: "/tools/towing",
  });
}

export default function TowingPage() {
  return (
    <ToolArticle
      title="Trailer tongue-weight planning band"
      path="/tools/towing"
      intro="Many trailer and towing references describe tongue weight as about 10 to 15 percent of gross trailer weight for a conventional bumper-pull trailer. Stay inside your hitch, receiver, and vehicle ratings. Weigh the loaded trailer when it matters."
      faqs={[
        {
          question: "Does this tell me if my SUV can tow the boat?",
          answer:
            "No. Compare the loaded trailer to the tow vehicle’s published ratings and the hitch class. This only sketches a tongue-weight band.",
        },
      ]}
      citations={[
        {
          name: "NHTSA — towing and trailers",
          url: "https://www.nhtsa.gov/road-safety/towing",
        },
      ]}
      related={[
        { href: "/boat-launches", label: "Boat launches" },
        { href: "/tools/trip-checklist", label: "Trip checklist" },
        { href: "/boat-ownership", label: "Boat ownership" },
      ]}
    >
      <TowingCalculator />
    </ToolArticle>
  );
}
