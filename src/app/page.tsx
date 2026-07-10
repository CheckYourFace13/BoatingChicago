import { Hero } from "@/components/Hero";
import { PopularCategories } from "@/components/PopularCategories";
import { FeaturedExperiences } from "@/components/FeaturedExperiences";
import { WhyBoatingChicago } from "@/components/WhyBoatingChicago";
import { SeasonalHighlights } from "@/components/SeasonalHighlights";
import { EmailSignup } from "@/components/EmailSignup";
import { VendorSignupCTA } from "@/components/VendorSignupCTA";
import { FindBoatForm } from "@/components/FindBoatForm";
import { AffiliateCTA } from "@/components/AffiliateCTA";
import { SceneryBand } from "@/components/SceneryBand";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Boating Chicago | Boat Rentals, Yacht Charters & Lake Michigan Experiences",
  description:
    "Find the best boat rentals, yacht charters, party boats, fishing charters, and captains in Chicago on Lake Michigan. Book through trusted partners or get matched fast.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        <PopularCategories />
        <FeaturedExperiences />
      </div>

      <SceneryBand />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        <section id="find-a-boat">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-3">
                Ready to Get on the Water?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Fill out the form and we&apos;ll match you with the best Chicago boat rentals, charters, and captains for your date, group size, and budget. Most requests get a response within 24 hours.
              </p>
              <AffiliateCTA
                partners={["boatsetter", "getmyboat"]}
                variant="compact"
              />
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
