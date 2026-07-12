import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "About Boating Chicago",
  description:
    "BoatingChicago.com publishes original Chicago boating content, local guides, and Lake Michigan experiences — helping visitors and locals find boats, charters, and water activities.",
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
          information — so visitors and residents can plan boat rentals, yacht charters, party
          boats, fishing trips, sailing, cruises, and related water activities with clearer
          context.
        </p>
        <p>
          Our pages cover private charter matching through Find a Boat, plus instant-booking
          experiences from trusted affiliate partners when they fit the trip. We also help
          local boating businesses get discovered through vendor listings and lead referrals.
        </p>
        <h2 className="text-xl font-extrabold text-lake-blue pt-2">What we publish</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Original boating guides and Chicago-focused SEO content</li>
          <li>Local information about seasons, events, and on-water experiences</li>
          <li>Comparisons of private charters vs ticketed cruises and rentals</li>
          <li>Curated booking options and referral matching for private boats</li>
        </ul>
        <h2 className="text-xl font-extrabold text-lake-blue pt-2">How we make money</h2>
        <p>
          Boating Chicago may earn commissions when you book through affiliate links, and we
          may receive lead fees when we connect you with local operators. That never changes
          the price you pay for a listed experience. See our{" "}
          <a href="/affiliate-disclosure" className="text-sky-blue font-semibold hover:underline">
            Affiliate Disclosure
          </a>{" "}
          for details.
        </p>
        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Contact</h2>
        <p>
          Questions, partnerships, or listing inquiries:{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="text-sky-blue font-semibold hover:underline"
          >
            {siteConfig.contactEmail}
          </a>{" "}
          or visit our{" "}
          <a href="/contact" className="text-sky-blue font-semibold hover:underline">
            Contact
          </a>{" "}
          page.
        </p>
      </div>
    </LegalPage>
  );
}
