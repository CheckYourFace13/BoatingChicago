import { buildMetadata } from "@/lib/seo";
import { FindBoatForm } from "@/components/FindBoatForm";

export const metadata = buildMetadata({
  title: "List Your Boating Business on Boating Chicago | Free & Featured Listings",
  description:
    "List your Chicago boat rental, yacht charter, fishing, marina, or boating service on Boating Chicago. Free basic listings, featured placements, sponsored spots, and lead access.",
  path: "/list-your-business",
});

const tiers = [
  {
    name: "Free Basic Listing",
    price: "Free",
    features: [
      "Business name, category & location",
      "Short description & contact info",
      "Listed on category pages",
      "Vendor profile page",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Featured Listing",
    price: "From $99/mo",
    features: [
      "Everything in Basic",
      "Featured badge on category pages",
      "Priority placement in search results",
      "Highlighted on homepage rotation",
      "Enhanced profile with photos",
    ],
    cta: "Go Featured",
    highlighted: true,
  },
  {
    name: "Sponsored Placement",
    price: "Custom",
    features: [
      "Everything in Featured",
      "Sponsored banner placements",
      "Category page top spot",
      "Seasonal promo features",
      "Dedicated account support",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
];

const benefits = [
  {
    icon: "📈",
    title: "Lead Access",
    description: "Receive qualified leads from our Find a Boat form — customers actively looking to book with your category and area.",
  },
  {
    icon: "🎯",
    title: "Seasonal Promotions",
    description: "Get featured during peak booking windows: Memorial Day, July 4th, Air & Water Show, Labor Day, and more.",
  },
  {
    icon: "🔍",
    title: "SEO Visibility",
    description: "Your listing appears on high-traffic Chicago boating landing pages optimized for search.",
  },
  {
    icon: "🤝",
    title: "Affiliate Integration",
    description: "Connect your existing Boatsetter, GetMyBoat, or direct booking links to drive more conversions.",
  },
];

export default function ListYourBusinessPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-lake-blue to-sky-blue text-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            List Your Boating Business on Boating Chicago
          </h1>
          <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
            Get in front of thousands of locals and visitors searching for Chicago boat rentals, charters, fishing trips, and boating services every month.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <section>
          <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-8 text-center">
            Listing Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-3xl p-8 flex flex-col ${
                  tier.highlighted
                    ? "bg-lake-blue text-white shadow-xl scale-105 border-2 border-sun-yellow"
                    : "bg-white border border-sky-blue/20 shadow-sm"
                }`}
              >
                <h3 className={`text-xl font-extrabold mb-1 ${tier.highlighted ? "text-sun-yellow" : "text-lake-blue"}`}>
                  {tier.name}
                </h3>
                <p className={`text-2xl font-extrabold mb-6 ${tier.highlighted ? "text-white" : "text-lake-blue"}`}>
                  {tier.price}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className={`flex gap-2 text-sm ${tier.highlighted ? "text-white/90" : "text-gray-600"}`}>
                      <span className="text-sun-yellow shrink-0">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#vendor-inquiry"
                  className={`inline-flex items-center justify-center px-5 py-3 font-bold rounded-full transition-colors ${
                    tier.highlighted
                      ? "bg-coral text-white hover:bg-coral/90"
                      : "bg-light-blue text-lake-blue hover:bg-sky-blue/20"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-8 text-center">
            Why List on Boating Chicago?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex gap-4 p-6 bg-white rounded-2xl border border-sky-blue/20 shadow-sm">
                <span className="text-3xl shrink-0">{benefit.icon}</span>
                <div>
                  <h3 className="font-extrabold text-lake-blue mb-1">{benefit.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="vendor-inquiry">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-lake-blue mb-2 text-center">
              Ready to Get Listed?
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Submit your info below and we&apos;ll set up your listing. For featured or sponsored placements, mention your preferred tier in the notes.
            </p>
            <FindBoatForm source="list-your-business" compact />
          </div>
        </section>
      </div>
    </>
  );
}
