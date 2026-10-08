import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { EmailSignup } from "@/components/EmailSignup";
import { GeoHero } from "@/components/geo/GeoHero";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { siteConfig } from "@/config/site";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Subscribe to the Chicago Boating Brief",
    description:
      "Get the weekly Chicago Boating Brief — weather context, marine alerts when present, events, and useful local guides. Free signup via BoatingChicago.",
    path: "/subscribe",
  });
}

export default function SubscribePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Subscribe", path: "/subscribe" },
        ]}
      />
      <GeoHero
        eyebrow={siteConfig.name}
        title="Chicago Boating Brief"
        intro="A free weekly email for boaters planning around Chicago and southern Lake Michigan — conditions context, alerts when the feed has them, events, and guide picks. Not a broker. Not a marketplace."
        links={[
          { label: "Weather", href: "/weather" },
          { label: "Guides", href: "/guides" },
          { label: "Privacy", href: "/privacy" },
        ]}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <section className="space-y-4 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-extrabold text-lake-blue">
            What you get
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A Thursday Brief aimed at America/Chicago — weather and alert
              context drawn from NOAA/NWS products when available
            </li>
            <li>Upcoming events and useful guide links for planning</li>
            <li>
              Occasional product or experience links that are clearly labeled as
              affiliate / paid links
            </li>
          </ul>
          <p className="text-sm text-gray-600">
            We store your address in our durable subscriber list and sync it to
            the Chicago Boating Brief audience in SendFable. We do not sell your
            email. Unsubscribe anytime from any Brief. See our{" "}
            <Link
              href="/privacy"
              className="font-semibold text-sky-blue hover:underline"
            >
              privacy policy
            </Link>{" "}
            and{" "}
            <Link
              href="/affiliate-disclosure"
              className="font-semibold text-sky-blue hover:underline"
            >
              affiliate disclosure
            </Link>
            .
          </p>
        </section>

        <section id="signup">
          <EmailSignup source="subscribe-page" />
        </section>

        <section className="rounded-2xl border border-sky-blue/25 bg-light-blue/30 p-5 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-lg font-extrabold text-lake-blue mb-2">
            Already subscribed?
          </h2>
          <p>
            Use the unsubscribe link in any Brief to leave the list. If you
            resubscribe later, local status updates — SendFable suppression rules
            still apply where required. Questions?{" "}
            <Link
              href="/contact"
              className="font-semibold text-sky-blue hover:underline"
            >
              Contact us
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  );
}
