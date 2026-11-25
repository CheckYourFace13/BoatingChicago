import { OwnershipCalculator } from "@/components/tools/Calculators";
import { ToolArticle } from "@/components/tools/ToolArticle";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Boat Ownership Cost Calculator | BoatingChicago",
    description:
      "Combine a standard amortizing loan payment with marina, winter storage, insurance, maintenance, and fuel costs you enter. No invented Chicago market prices.",
    path: "/tools/ownership-cost",
  });
}

export default function OwnershipToolPage() {
  return (
    <ToolArticle
      title="Boat ownership cost calculator"
      path="/tools/ownership-cost"
      intro="Leave operating lines at zero until you have a written quote. The loan line uses a standard amortizing payment from the principal, APR, and term you type. This is not a lender offer or tax advice."
      faqs={[
        {
          question: "Where do Chicago slip and storage numbers come from?",
          answer:
            "From you. Chicago Harbors and private yards publish their own schedules. We do not reprint dollar amounts that go stale. Use the ownership cost guide and marina directory to find the operator page, then paste the quote here.",
        },
        {
          question: "What if I pay cash?",
          answer: "Set the down payment equal to the purchase price. The monthly loan payment becomes zero.",
        },
      ]}
      citations={[
        {
          name: "Consumer Financial Protection Bureau — loans",
          url: "https://www.consumerfinance.gov/consumer-tools/credit-loans/",
        },
        {
          name: "Chicago Harbors — rates and applications",
          url: "https://www.chicagoharbors.info/",
        },
      ]}
      related={[
        { href: "/boat-financing-ownership-costs-chicago", label: "Ownership cost guide" },
        { href: "/boat-ownership", label: "Boat ownership hub" },
        { href: "/tools/slip-compare", label: "Compare slip quotes" },
        { href: "/marinas", label: "Marinas" },
        { href: "/storage", label: "Storage directory" },
      ]}
    >
      <OwnershipCalculator />
    </ToolArticle>
  );
}
