import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "Contact Boating Chicago",
  description:
    "Contact Boating Chicago for boating questions, vendor partnerships, listing inquiries, and general support.",
  path: "/contact",
});

const quickLinks = [
  { href: "/#find-a-boat", label: "Find a Boat (trip matching)" },
  { href: "/list-your-business", label: "List your business" },
  { href: "/weather", label: "Boating weather" },
  { href: "/news", label: "Boating news" },
  { href: "/destinations/chicago", label: "Boating in Chicago" },
  { href: "/guides", label: "Guides hub" },
  { href: "/marinas", label: "Marinas directory" },
  { href: "/boat-launches", label: "Boat launches" },
];

export default function ContactPage() {
  return (
    <LegalPage
      title="Contact"
      description="Reach the Boating Chicago team for questions, partnerships, and listing support."
      path="/contact"
    >
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          We help Chicago and southern Lake Michigan boaters find rentals,
          charters, harbors, launches, weather, and local know-how. Use the
          paths below so your note reaches the right workflow quickly.
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
            <Link href="/#find-a-boat" className="text-sky-blue font-semibold hover:underline">
              Find a Boat
            </Link>{" "}
            on the homepage — that is the fastest path for trip requests.
          </p>
        </div>

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">
          What to contact us about
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Corrections to destination, marina, or launch pages (include the official source URL)</li>
          <li>Vendor partnership and listing questions</li>
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

        <h2 className="text-xl font-extrabold text-lake-blue pt-2">Response time</h2>
        <p>
          We typically respond within 1–2 business days. Trip-matching lead requests are routed
          separately and are usually reviewed within about 24 hours during peak season.
        </p>
      </div>
    </LegalPage>
  );
}
