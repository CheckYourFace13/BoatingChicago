import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { siteConfig } from "@/config/site";

export async function generateMetadata() {
  return buildManagedMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for BoatingChicago.com — how we collect, use, and protect information from visitors, contact forms, and newsletter subscribers.",
  path: "/privacy",
});
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How Boating Chicago collects, uses, and protects your information."
      path="/privacy"
    >
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p className="text-sm text-gray-500">Last updated: October 27, 2026</p>
        <p>
          This Privacy Policy describes how {siteConfig.name} (&quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;) handles information when you visit {siteConfig.domain}, submit forms, or
          interact with our content and partners.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Information we collect</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Contact details</strong> you submit (name, email, subject, message) via our
            contact form
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
          <li>To respond to contact and partnership requests</li>
          <li>To send newsletters or updates you opted into</li>
          <li>To improve site content, performance, and user experience</li>
          <li>To measure traffic and conversions (including affiliate clicks) with analytics</li>
          <li>To display relevant advertising when AdSense or similar services are enabled</li>
        </ul>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Sharing</h2>
        <p>
          We may use service providers for email delivery, hosting, analytics (such as Google
          Analytics), and advertising (such as Google AdSense). We do not sell personal information
          as a standalone consumer data product.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Cookies &amp; tracking</h2>
        <p>
          Essential cookies or local storage keep the site working (for example remembering your
          optional-cookie choice). Google Analytics, labeled shopping-partner ads, and Impact
          impression tags are optional. They stay off until you accept them in the cookie banner
          or Cookie settings. Rejecting them does not block weather, guides, booking links,
          contact, or the newsletter form.
        </p>
        <p>
          Google&apos;s EU user consent policy and Consent Mode v2 apply to end users in the EEA
          (and, for some publisher advertising products, the UK and Switzerland). We do not run a
          Google-certified IAB CMP such as Funding Choices, and this site does not look up your
          country at the edge. Optional tags therefore stay denied for every visitor until you
          choose. That is not a certified-CMP or AdSense-approval claim. If display ads are later
          turned on for EEA traffic, a certified CMP would still be required for that product.
        </p>
        <p>
          Google and other third-party vendors may use cookies to serve ads based on your prior
          visits to this site or other websites after you allow advertising cookies. You can
          review or turn off ad personalization in{" "}
          <a
            href="https://adssettings.google.com"
            className="text-sky-blue font-semibold hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google&apos;s Ad Settings / My Ad Center
          </a>
          . Browser settings also let you block or delete cookies.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Third-party links</h2>
        <p>
          Booking links may send you to partner sites (for example GetYourGuide or Viator). Their
          privacy practices are governed by their own policies.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Data retention</h2>
        <p>
          We retain contact and newsletter records as long as needed to respond to requests,
          comply with legal obligations, and operate the business, then delete or anonymize when
          no longer required.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Your choices</h2>
        <p>
          To request access, correction, or deletion of personal information we hold, or to
          unsubscribe from marketing emails, use our{" "}
          <Link href="/contact" className="text-sky-blue font-semibold hover:underline">
            Contact
          </Link>{" "}
          form.
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
          Privacy questions: use our{" "}
          <Link href="/contact" className="text-sky-blue font-semibold hover:underline">
            Contact
          </Link>{" "}
          form.
        </p>
      </div>
    </LegalPage>
  );
}
