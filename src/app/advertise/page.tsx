import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ContactForm } from "@/components/ContactForm";
import { GeoHero } from "@/components/geo/GeoHero";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { siteConfig } from "@/config/site";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Advertise on Boating Chicago | Sponsored Local Boating Placements",
    description:
      "Sponsorship and featured placements for marinas, storage yards, detailers, dealers, charters, and marine services serving Chicago and southern Lake Michigan. Labeled Sponsored — no invented rates or traffic claims.",
    path: "/advertise",
  });
}

const products = [
  {
    name: "Featured marina or harbor",
    detail:
      "A labeled Sponsored / Featured Partner placement beside marina and destination planning pages in your geography.",
  },
  {
    name: "Featured storage or haul-out yard",
    detail:
      "Winter storage and haul-out businesses — labeled as a featured partner, not an editorial ranking of yards.",
  },
  {
    name: "Featured detailer or marine service",
    detail:
      "Mobile detailing, repair, and commissioning shops next to relevant ownership and maintenance guides.",
  },
  {
    name: "Featured dealer or broker introduction",
    detail:
      "A local dealer introduction on boat-ownership planning pages once we have a signed placement agreement.",
  },
  {
    name: "Featured charter or sailing school",
    detail:
      "Clearly marked sponsored placement next to experience or lesson guides. Bookable GetYourGuide and Viator cards stay separate affiliate inventory.",
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
        intro={`Readers come here to plan boating across ${siteConfig.coverage}. Paid placements are labeled Sponsored or Featured Partner. They do not change editorial harbor notes, safety guidance, or weather ratings.`}
        links={[
          { label: "Boat ownership guide", href: "/boat-ownership" },
          { label: "Marinas", href: "/marinas" },
          { label: "Winter guides", href: "/guides#winter-guides" },
          { label: "Contact", href: "/contact" },
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <section className="space-y-4 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-extrabold text-lake-blue">Who this is for</h2>
          <p>
            Marinas, storage yards, boat detailers, dealers, charter operators,
            sailing schools, and marine service shops that already serve boaters
            in this coverage area. We do not manually match customers to
            captains. A placement sends an interested reader to your site or
            booking page.
          </p>

          <h2 className="text-2xl font-extrabold text-lake-blue pt-2">
            Placement types
          </h2>
          <ul className="space-y-3">
            {products.map((item) => (
              <li
                key={item.name}
                className="rounded-2xl border border-sky-blue/20 bg-white p-4"
              >
                <p className="font-extrabold text-lake-blue">{item.name}</p>
                <p className="text-sm mt-1">{item.detail}</p>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-extrabold text-lake-blue pt-2">
            Geographic relevance
          </h2>
          <p>
            We prioritize businesses that serve Chicago and southern Lake
            Michigan boaters, plus nearby Wisconsin and Indiana waters covered
            on this site. National brands without local fulfillment are usually
            a poor fit unless they clearly help readers in this geography.
          </p>

          <h2 className="text-2xl font-extrabold text-lake-blue pt-2">
            Labeling &amp; editorial independence
          </h2>
          <p>
            Sponsored and Featured Partner modules are labeled. They do not
            rewrite safety guidance, alter weather ratings, or quietly replace
            directory facts. Affiliate booking cards (GetYourGuide, Viator) and
            Amazon / Awin product links remain separate, disclosed programs.
          </p>

          <p className="text-sm rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-950">
            We do not publish a public rate card, traffic guarantees, or
            invented advertiser results on this page. Tell us the placement you
            want and we will reply with fit and next steps. Payment is not
            collected on this site yet — paid checkout needs documented pricing,
            placement duration, fulfillment, and cancellation terms first.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold text-lake-blue mb-4">
            Sponsorship inquiry
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
