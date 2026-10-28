import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { siteConfig } from "@/config/site";
import { affiliateDisclosure } from "@/data/affiliate-offers";
import { AMAZON_ASSOCIATE_DISCLOSURE } from "@/config/amazon";

export async function generateMetadata() {
  return buildManagedMetadata({
  title: "Affiliate Disclosure",
  description:
    "How Boating Chicago uses affiliate links, commissions, and partner relationships — transparent disclosure for readers and advertisers.",
  path: "/affiliate-disclosure",
});
}

export default function AffiliateDisclosurePage() {
  return (
    <LegalPage
      title="Affiliate Disclosure"
      description="How we earn commissions and what that means for you."
      path="/affiliate-disclosure"
    >
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p className="font-semibold text-lake-blue">{affiliateDisclosure}</p>
        <p className="font-semibold text-lake-blue">{AMAZON_ASSOCIATE_DISCLOSURE}</p>
        <p>
          {siteConfig.name} participates in affiliate marketing programs, including partners
          such as GetYourGuide, Viator, Amazon Associates, Commission Junction (Adrenaline and
          Peet&apos;s Coffee), Awin (including Boat Trader / Boats Group, Giraffe Tools, Piscifun,
          and BLUETTI), and Impact (including BrandsMart, KingCamp, Chipolo, and Best Choice
          Products). That means we may earn a commission if you click a partner link and complete
          a booking or purchase — at no additional cost to you.
        </p>
        <h2 className="text-xl font-extrabold text-lake-blue pt-2">What this covers</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Outbound links to third-party booking platforms (for example GetYourGuide and Viator)</li>
          <li>Featured experience cards and “book online” CTAs</li>
          <li>
            Amazon product and category links labeled as Amazon destinations (paid links). We do
            not sell, stock, or fulfill Amazon products.
          </li>
          <li>
            Adrenaline experience links via Commission Junction (paid links) for selected Chicago
            water experiences. Boarding, duration, cancellation, and pricing are set by Adrenaline
            and the operator — we do not invent those details.
          </li>
          <li>
            Boat Trader shopping links via Awin (paid links). We do not sell, broker, or list boats,
            and we do not guarantee pricing or inventory on Boat Trader.
          </li>
          <li>
            Giraffe Tools product links via Awin (paid links) for cleaning and maintenance tools. We
            do not invent manufacturer specifications, and high-pressure cleaning is not safe for
            every boat surface.
          </li>
          <li>
            Piscifun product links via Awin (paid links) for fishing gear and clothing. We do not
            invent prices, discounts, or manufacturer performance claims; availability and sizes are
            set by the seller.
          </li>
          <li>
            BLUETTI product links via Awin (paid links) for portable shore/backup power stations. We
            do not claim marine suitability, invent capacity or safety specs, or present these as
            emergency communications gear.
          </li>
          <li>
            Labeled “Advertisement — shopping partners” placements via Impact and Commission
            Junction. These are paid shopping links, not boat reviews, marine certifications, or
            inventory promises. Impression tags load only with the creative that is actually shown.
          </li>
        </ul>
        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Amazon Associates</h2>
        <p>
          {AMAZON_ASSOCIATE_DISCLOSURE} Amazon links use our Associates tracking ID and send you
          directly to Amazon.com. Product availability, pricing, ratings, and shipping terms are
          controlled by Amazon and can change; this site does not republish Amazon prices or
          review counts as its own.
        </p>
        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Editorial independence</h2>
        <p>
          Affiliate relationships do not change our commitment to clear labeling. We distinguish
          ticketed cruises and rentals from private charters, and we do not claim that ordinary
          public cruises are private boat rentals. We do not broker boats or manually match private
          charters. Gear recommendations are editorial suggestions for common Chicago boating needs,
          not sponsored product placements unless separately labeled.
        </p>
        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Advertising</h2>
        <p>
          We may display third-party advertisements (including Google AdSense) and, in the
          future, sponsored placements. Sponsored content will be labeled when used. Ads are
          separate from affiliate booking and Amazon product links.
        </p>
        <p>
          Questions?{" "}
          <Link href="/contact" className="text-sky-blue font-semibold hover:underline">
            Contact Us
          </Link>
          .
        </p>
      </div>
    </LegalPage>
  );
}
