import { Hero } from "@/components/Hero";
import { PopularCategories } from "@/components/PopularCategories";
import { FeaturedExperiences } from "@/components/FeaturedExperiences";
import { WhyBoatingChicago } from "@/components/WhyBoatingChicago";
import { SeasonalHighlights } from "@/components/SeasonalHighlights";
import { EmailSignup } from "@/components/EmailSignup";
import { VendorSignupCTA } from "@/components/VendorSignupCTA";
import { FindBoatForm } from "@/components/FindBoatForm";
import { AffiliateOfferGrid } from "@/components/AffiliateOfferGrid";
import { SceneryBand } from "@/components/SceneryBand";
import { getHomepageOffers } from "@/data/affiliate-offers";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Boating Chicago | Boat Rentals, Yacht Charters & Lake Michigan Experiences",
  description:
    "Find the best boat rentals, yacht charters, party boats, fishing charters, and captains in Chicago on Lake Michigan. Book cruises, jet skis, and kayak experiences — or get matched for a private boat.",
  path: "/",
});

export default function HomePage() {
  const homepageOffers = getHomepageOffers();

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        <PopularCategories />
        <FeaturedExperiences />

        <AffiliateOfferGrid
          title="Book Chicago Boating Experiences"
          subtitle="Ticketed cruises, jet ski rentals, and kayak adventures you can book online — architecture tours, fireworks cruises, and more. These are not private boat rentals; for private charters use Find a Boat below."
          offers={homepageOffers}
          pageSlug="homepage"
        />
      </div>

      <SceneryBand />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        <section id="find-a-boat">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-3">
                Need a Private Boat, Yacht, or Captain?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                GetYourGuide covers ticketed cruises and water experiences. For private boat rentals, yacht charters, party boats, fishing charters, and captains, tell us what you need — we&apos;ll match you with local options, usually within 24 hours.
              </p>
            </div>
            <FindBoatForm source="homepage" />
          </div>
        </section>

        <WhyBoatingChicago />
        <SeasonalHighlights />
        <EmailSignup source="homepage" />
        <VendorSignupCTA />
      </div>
    </>
  );
}
