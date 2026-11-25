import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { siteConfig } from "@/config/site";

export async function generateMetadata() {
  return buildManagedMetadata({
  title: "About Boating Chicago",
  description:
    "BoatingChicago.com is an original information resource for Chicago, all of Lake Michigan, and inland waters within about 400 driving miles — weather, harbors, launches, news, guides, and curated experiences.",
  path: "/about",
});
}

export default function AboutPage() {
  return (
    <LegalPage
      title="About Boating Chicago"
      description="Who publishes BoatingChicago and how we approach local boating information."
      path="/about"
    >
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          <strong className="text-lake-blue">{siteConfig.name}</strong> (
          {siteConfig.domain}) is an original digital information resource for
          recreational boaters in {siteConfig.coverage}. We publish practical planning pages — weather context,
          marina and launch directories with official sources, destination guides,
          news summaries, and events — so locals and visitors can plan with clearer
          context.
        </p>
        <p>
          We are not a boat broker, marina operator, or charter matching service.
          We do not employ captains or sell tickets ourselves. When we highlight
          bookable experiences, they are clearly labeled affiliate options from
          partners such as GetYourGuide and Viator.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">
          How we source information
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Facility facts come from official agency databases and operator pages
            (municipal harbors, state DNR access sites, park districts, USACE where
            applicable). Each listing links to those sources with a checked date when
            available.
          </li>
          <li>
            Weather and lake observations cite NOAA/NWS and NDBC products with
            timestamps. Informational condition groupings are never a clearance to
            boat.
          </li>
          <li>
            Fees, hours, and amenities stay on the operator page when amounts change
            often. Unknown amenities stay unknown — absence of a claim is not proof a
            service is unavailable.
          </li>
          <li>
            News items are short original summaries with a link to the source — not
            republished articles. Content is written for BoatingChicago, not scraped
            wholesale from other publishers.
          </li>
          <li>
            We do not claim first-hand visits, a named human newsroom, or credentials
            we do not have. Corrections are welcome via the{" "}
            <Link href="/contact" className="text-sky-blue font-semibold hover:underline">
              Contact
            </Link>{" "}
            form with a source URL when possible.
          </li>
        </ul>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">What we publish</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Live weather, lake conditions, and marine alerts</li>
          <li>Destination, marina, launch, and lake directories</li>
          <li>Original guides and planning resources</li>
          <li>Boating news and seasonal events</li>
          <li>Clearly labeled bookable experiences via affiliate partners</li>
        </ul>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">How we make money</h2>
        <p>
          Boating Chicago may earn commissions when you book through affiliate links.
          That never changes the price you pay for a listed experience. See our{" "}
          <Link href="/affiliate-disclosure" className="text-sky-blue font-semibold hover:underline">
            Affiliate Disclosure
          </Link>
          .
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Contact</h2>
        <p>
          Corrections, partnerships, or press inquiries: use the{" "}
          <Link href="/contact" className="text-sky-blue font-semibold hover:underline">
            Contact
          </Link>{" "}
          form. We do not publish a public email address on the site.
        </p>
      </div>
    </LegalPage>
  );
}
