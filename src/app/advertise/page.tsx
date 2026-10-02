import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ContactForm } from "@/components/ContactForm";
import { GeoHero } from "@/components/geo/GeoHero";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { siteConfig } from "@/config/site";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Advertise on Boating Chicago | Sponsored Local Boating Placements",
    description:
      "Sponsorship and featured placements for marinas, storage yards, dealers, charters, sailing schools, and marine services that serve Chicago and southern Lake Michigan boaters.",
    path: "/advertise",
  });
}

const products = [
  {
    name: "Featured marina or harbor",
    detail: "A labeled placement beside our marina and destination planning pages.",
  },
  {
    name: "Featured storage or service",
    detail: "Winter storage, haul-out, detailing, or repair — labeled as a featured partner, not an editorial ranking.",
  },
  {
    name: "Featured dealer",
    detail: "A local dealer introduction on boat-ownership planning pages once we have a real partner agreement.",
  },
  {
    name: "Featured charter or sailing school",
    detail: "Clearly marked sponsored placement next to experience or lesson guides. Bookable GetYourGuide and Viator cards stay separate.",
  },
];

export default function AdvertisePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Advertise", path: "/advertise" },
        ]}
      />
      <GeoHero
        eyebrow="For local boating businesses"
        title="Advertise on Boating Chicago"
        intro={`Readers come here to plan boating across ${siteConfig.coverage}. Paid placements are labeled Sponsored or Featured Partner. They do not change editorial harbor notes or weather guidance.`}
        links={[
          { label: "Boat ownership guide", href: "/boat-ownership" },
          { label: "Marinas", href: "/marinas" },
          { label: "Contact", href: "/contact" },
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <section className="space-y-4 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-extrabold text-lake-blue">Who this is for</h2>
          <p>
            Marinas, storage yards, boat dealers, charter operators, sailing
            schools, and marine service shops that already serve boaters in
            this coverage area. We do not manually match customers to captains.
            A placement sends an interested reader to your site or booking page.
          </p>
          <h2 className="text-2xl font-extrabold text-lake-blue pt-2">
            Placement ideas
          </h2>
          <ul className="space-y-3">
            {products.map((item) => (
              <li key={item.name} className="rounded-2xl border border-sky-blue/20 bg-white p-4">
                <p className="font-extrabold text-lake-blue">{item.name}</p>
                <p className="text-sm mt-1">{item.detail}</p>
              </li>
            ))}
          </ul>
          <p className="text-sm">
            We do not publish a public rate card yet. Tell us the placement
            you want and we will reply with whether it fits. Payment is not
            collected on this site.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold text-lake-blue mb-4">
            Tell us about your business
          </h2>
          <ContactForm
            defaultSubject="Advertising / Sponsorship"
            placement="advertise"
          />
        </section>
      </div>
    </>
  );
}
