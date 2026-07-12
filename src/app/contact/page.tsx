import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "Contact Boating Chicago",
  description:
    "Contact Boating Chicago for boating questions, vendor partnerships, listing inquiries, and general support.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <LegalPage
      title="Contact"
      description="Reach the Boating Chicago team for questions, partnerships, and listing support."
      path="/contact"
    >
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          We&apos;re happy to help with general questions about Chicago boating, partnership
          opportunities, vendor listings, and site feedback.
        </p>
        <div className="rounded-2xl border border-sky-blue/25 bg-light-blue/40 p-6 not-prose">
          <h2 className="text-lg font-extrabold text-lake-blue mb-2">Email</h2>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="text-sky-blue font-bold text-lg hover:underline"
          >
            {siteConfig.contactEmail}
          </a>
          <p className="text-sm text-gray-600 mt-3">
            For private boat, yacht, or captain matching, use{" "}
            <a href="/#find-a-boat" className="text-sky-blue font-semibold hover:underline">
              Find a Boat
            </a>{" "}
            on the homepage — that&apos;s the fastest path for trip requests.
          </p>
        </div>
        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Vendors &amp; operators</h2>
        <p>
          To list your Chicago boating business, visit{" "}
          <a href="/list-your-business" className="text-sky-blue font-semibold hover:underline">
            List Your Business
          </a>
          .
        </p>
        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Response time</h2>
        <p>
          We typically respond within 1–2 business days. Trip-matching lead requests are routed
          separately and are usually reviewed within about 24 hours during peak season.
        </p>
      </div>
    </LegalPage>
  );
}
