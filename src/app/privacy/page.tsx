import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for BoatingChicago.com — how we collect, use, and protect information from visitors, leads, and newsletter subscribers.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How Boating Chicago collects, uses, and protects your information."
      path="/privacy"
    >
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p className="text-sm text-gray-500">Last updated: July 12, 2026</p>
        <p>
          This Privacy Policy describes how {siteConfig.name} (&quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;) handles information when you visit {siteConfig.domain}, submit forms, or
          interact with our content and partners.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Information we collect</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Contact and lead details</strong> you submit (name, email, phone, trip
            preferences) via Find a Boat or similar forms
          </li>
          <li>
            <strong>Newsletter emails</strong> when you subscribe
          </li>
          <li>
            <strong>Vendor inquiries</strong> related to listing your business
          </li>
          <li>
            <strong>Usage data</strong> such as pages viewed, approximate location derived from IP,
            device/browser type, and referral URLs — collected via analytics tools when enabled
          </li>
        </ul>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">How we use information</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>To match you with local boating operators and respond to requests</li>
          <li>To send newsletters or updates you opted into</li>
          <li>To improve site content, performance, and user experience</li>
          <li>To measure traffic and conversions (including affiliate clicks) with analytics</li>
          <li>To display relevant advertising when AdSense or similar services are enabled</li>
        </ul>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Sharing</h2>
        <p>
          We may share lead information with relevant Chicago-area boating vendors so they can
          respond to your request. We may also use service providers for email delivery, hosting,
          analytics (such as Google Analytics), and advertising (such as Google AdSense). We do
          not sell personal information as a standalone consumer data product.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Cookies &amp; tracking</h2>
        <p>
          We and our partners may use cookies and similar technologies for analytics, affiliate
          attribution, and advertising. Google Analytics and Google AdSense, when configured, may
          set their own cookies subject to Google&apos;s policies. You can control cookies through
          your browser settings.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Third-party links</h2>
        <p>
          Booking links may send you to partner sites (for example GetYourGuide or Viator). Their
          privacy practices are governed by their own policies.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Data retention</h2>
        <p>
          We retain lead and newsletter records as long as needed to provide matching services,
          comply with legal obligations, and operate the business, then delete or anonymize when
          no longer required.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Your choices</h2>
        <p>
          To request access, correction, or deletion of personal information we hold, or to
          unsubscribe from marketing emails, contact{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="text-sky-blue font-semibold hover:underline"
          >
            {siteConfig.contactEmail}
          </a>
          .
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Children</h2>
        <p>
          The site is not directed at children under 13, and we do not knowingly collect personal
          information from children under 13.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Changes</h2>
        <p>
          We may update this policy from time to time. The &quot;Last updated&quot; date at the top
          reflects the latest revision.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Contact</h2>
        <p>
          Privacy questions:{" "}
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
