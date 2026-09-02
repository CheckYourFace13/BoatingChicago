import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "About Boating Chicago",
  description:
    "BoatingChicago.com publishes original Chicago boating content, local guides, and Lake Michigan experiences — weather, harbors, launches, news, and curated water activities.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <LegalPage
      title="About Boating Chicago"
      description="Original Chicago boating guides, local information, and Lake Michigan experiences."
      path="/about"
    >
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          <strong className="text-lake-blue">{siteConfig.name}</strong> is Chicago&apos;s
          local digital guide to boating on Lake Michigan and the Chicago River. We publish
          original content — category guides, seasonal tips, experience overviews, and local
          information — so visitors and residents can plan with clearer context around weather,
          harbors, launches, news, events, rentals, and cruises.
        </p>
        <p>
          We are an information resource. We do not broker boats, employ captains, or manually
          match private charters. When relevant, we highlight instant-booking experiences from
          trusted affiliate partners and future vendor listings.
        </p>
        <h2 className="text-xl font-extrabold text-lake-blue pt-2">What we publish</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Original boating guides and Chicago-focused content</li>
          <li>Live weather, lake conditions, and marine alerts</li>
          <li>Destination, marina, launch, and lake directories</li>
          <li>News, events, and practical planning resources</li>
          <li>Curated ticketed experiences via affiliate partners</li>
        </ul>
        <h2 className="text-xl font-extrabold text-lake-blue pt-2">How we make money</h2>
        <p>
          Boating Chicago may earn commissions when you book through affiliate links. That never
          changes the price you pay for a listed experience. See our{" "}
          <a href="/affiliate-disclosure" className="text-sky-blue font-semibold hover:underline">
            Affiliate Disclosure
          </a>{" "}
          for details.
        </p>
        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Contact</h2>
        <p>
          Questions, partnerships, or listing inquiries: visit our{" "}
          <a href="/contact" className="text-sky-blue font-semibold hover:underline">
            Contact
          </a>{" "}
          page.
        </p>
      </div>
    </LegalPage>
  );
}
