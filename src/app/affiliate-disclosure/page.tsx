import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { affiliateDisclosure } from "@/data/affiliate-offers";

export const metadata = buildMetadata({
  title: "Affiliate Disclosure",
  description:
    "How Boating Chicago uses affiliate links, commissions, and partner relationships — transparent disclosure for readers and advertisers.",
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  return (
    <LegalPage
      title="Affiliate Disclosure"
      description="How we earn commissions and what that means for you."
      path="/affiliate-disclosure"
    >
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p className="font-semibold text-lake-blue">{affiliateDisclosure}</p>
        <p>
          {siteConfig.name} participates in affiliate marketing programs, including partners
          such as GetYourGuide and Viator. That means we may earn a commission if you click a
          partner link and complete a booking or purchase — at no additional cost to you.
        </p>
        <h2 className="text-xl font-extrabold text-lake-blue pt-2">What this covers</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Outbound links to third-party booking platforms</li>
          <li>Featured experience cards and “book online” CTAs</li>
          <li>Lead referrals to local operators when applicable</li>
        </ul>
        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Editorial independence</h2>
        <p>
          Affiliate relationships do not change our commitment to clear labeling. We distinguish
          ticketed cruises and rentals from private charter matching, and we do not claim that
          ordinary public cruises are private boat rentals.
        </p>
        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Advertising</h2>
        <p>
          We may display third-party advertisements (including Google AdSense) and, in the
          future, sponsored placements. Sponsored content will be labeled when used. Ads are
          separate from affiliate booking links.
        </p>
        <p>
          Questions?{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="text-sky-blue font-semibold hover:underline"
          >
            {siteConfig.contactEmail}
          </a>
        </p>
      </div>
    </LegalPage>
  );
}
