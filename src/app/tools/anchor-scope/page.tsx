import { AnchorCalculator } from "@/components/tools/Calculators";
import { ToolArticle } from "@/components/tools/ToolArticle";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Anchor Scope Planner | BoatingChicago",
    description:
      "Apply a published scope ratio to water depth plus bow height. Conditions, bottom type, and your ground tackle still decide what is adequate.",
    path: "/tools/anchor-scope",
  });
}

export default function AnchorPage() {
  return (
    <ToolArticle
      title="Anchor scope planner"
      path="/tools/anchor-scope"
      intro="Scope is rode length divided by the vertical distance from the bow to the bottom (depth plus freeboard). Recreational guidance commonly cites about 7:1 for typical conditions and less in settled, protected water. This planner does not inspect your anchor, rode, or holding ground."
      faqs={[
        {
          question: "Is 7:1 required?",
          answer:
            "No. It is a common planning ratio in public recreational materials. Storms, current, short rode, and poor bottom all change what you actually need.",
        },
      ]}
      citations={[
        {
          name: "U.S. Coast Guard — recreational boating safety",
          url: "https://www.uscgboating.org/",
        },
      ]}
      related={[
        { href: "/tools/trip-checklist", label: "Trip checklist" },
        { href: "/weather", label: "Weather" },
        { href: "/lakes", label: "Lakes & waterways" },
      ]}
    >
      <AnchorCalculator />
    </ToolArticle>
  );
}
