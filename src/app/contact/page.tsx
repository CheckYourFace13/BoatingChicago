import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { ContactForm } from "@/components/ContactForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Boating Chicago",
  description:
    "Contact Boating Chicago for boating questions, partnerships, advertising, and website corrections.",
  path: "/contact",
});

const quickLinks = [
  { href: "/list-your-business", label: "List your business" },
  { href: "/weather", label: "Boating weather" },
  { href: "/news", label: "Boating news" },
  { href: "/destinations/chicago", label: "Boating in Chicago" },
  { href: "/guides", label: "Guides hub" },
  { href: "/boat-rentals-chicago", label: "Boat rentals" },
  { href: "/marinas", label: "Marinas directory" },
  { href: "/boat-launches", label: "Boat launches" },
];

export default function ContactPage() {
  return (
    <LegalPage
      title="Contact"
      description="Send a message to the Boating Chicago team. We usually respond within 1–2 business days."
      path="/contact"
    >
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <p>
          Boating Chicago is an information resource for Chicago and southern Lake
          Michigan boaters. Use this form for questions, partnerships, advertising,
          or corrections — we do not broker boats or manually match private charters.
        </p>

        <div className="not-prose max-w-xl relative">
          <ContactForm />
        </div>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">
          What to contact us about
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Corrections to destination, marina, or launch pages (include the official source URL)</li>
          <li>Vendor partnership and listing questions</li>
          <li>Advertising / sponsorship inquiries</li>
          <li>Press / media inquiries about BoatingChicago</li>
          <li>General site feedback</li>
        </ul>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Vendors &amp; operators</h2>
        <p>
          To list your Chicago boating business, visit{" "}
          <Link href="/list-your-business" className="text-sky-blue font-semibold hover:underline">
            List Your Business
          </Link>
          .
        </p>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Quick links</h2>
        <ul className="not-prose flex flex-wrap gap-2">
          {quickLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex px-3 py-1.5 rounded-full bg-light-blue text-lake-blue text-sm font-semibold hover:bg-sky-blue/20"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </LegalPage>
  );
}
