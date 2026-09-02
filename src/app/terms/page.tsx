import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { disclaimer, siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "Terms of Service for BoatingChicago.com — rules for using our Chicago boating guides and site services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="Rules for using BoatingChicago.com."
      path="/terms"
    >
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p className="text-sm text-gray-500">Last updated: September 2, 2026</p>
        <p>
          By accessing {siteConfig.domain} (the &quot;Site&quot;), you agree to these Terms of
          Service. If you do not agree, please do not use the Site.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">What we are</h2>
        <p>{disclaimer}</p>
        <p>
          {siteConfig.name} publishes informational content and may link to third-party operators
          or booking platforms. We are not a party to contracts between you and boat operators,
          captains, or affiliate partners unless explicitly stated in writing.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Acceptable use</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Provide accurate information on forms</li>
          <li>Do not misuse the Site for spam, scraping abuse, or unlawful activity</li>
          <li>Do not attempt to disrupt or reverse-engineer the Site</li>
        </ul>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Contact form</h2>
        <p>
          Submitting the contact form authorizes us to use your details to respond to your
          message. We do not operate a boat-matching or charter-brokerage service.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Affiliate &amp; advertising links</h2>
        <p>
          Some links are affiliate or advertising relationships. See our{" "}
          <a href="/affiliate-disclosure" className="text-sky-blue font-semibold hover:underline">
            Affiliate Disclosure
          </a>
          . Third-party sites have their own terms.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Intellectual property</h2>
        <p>
          Site content, branding, and original guides are owned by {siteConfig.name} or its
          licensors. You may not copy or republish substantial content without permission.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Disclaimers</h2>
        <p>
          The Site is provided &quot;as is.&quot; To the fullest extent permitted by law, we
          disclaim warranties of merchantability, fitness for a particular purpose, and
          non-infringement. Boating involves inherent risks — always follow operator instructions
          and applicable laws.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {siteConfig.name} is not liable for indirect,
          incidental, special, consequential, or punitive damages, or for losses arising from
          bookings, on-water activities, or third-party services arranged through or referenced by
          the Site.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless {siteConfig.name} from claims arising out of
          your misuse of the Site or your interactions with third-party operators.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Governing law</h2>
        <p>
          These terms are governed by the laws of the State of Illinois, without regard to conflict
          of law principles. Venue for disputes lies in courts located in Cook County, Illinois,
          unless applicable law requires otherwise.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Changes</h2>
        <p>
          We may update these terms periodically. Continued use of the Site after changes
          constitutes acceptance of the revised terms.
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Contact</h2>
        <p>
          Questions about these terms:{" "}
          <Link href="/contact" className="text-sky-blue font-semibold hover:underline">
            Contact Us
          </Link>
          .
        </p>
      </div>
    </LegalPage>
  );
}
