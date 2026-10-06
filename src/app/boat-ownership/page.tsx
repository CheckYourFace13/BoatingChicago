import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GeoHero } from "@/components/geo/GeoHero";
import {
  BoatUsMembershipNote,
  OwnershipNextLinks,
} from "@/components/ownership/OwnershipLinks";
import { BoatTraderShopCta } from "@/components/ownership/BoatTraderShopCta";
import { AmazonRecommendedGear } from "@/components/AmazonRecommendedGear";
import { getAmazonGearPlacementForPath } from "@/data/amazon-gear";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { siteConfig } from "@/config/site";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Boat Ownership Around Chicago | Storage, Harbors & Planning",
    description:
      "What Chicago-area boaters should plan for after deciding to own a boat — harbors, trailering, winter storage, insurance, surveys, and official registration resources.",
    path: "/boat-ownership",
  });
}

export default function BoatOwnershipPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Boat Ownership", path: "/boat-ownership" },
        ]}
      />
      <GeoHero
        eyebrow={siteConfig.coverage}
        title="Boat Ownership Around Chicago"
        intro="An editorial planning guide for people who want their own boat on southern Lake Michigan or a nearby inland lake. This is not a marketplace, a loan offer, or legal advice."
        links={[
          { label: "Marinas", href: "/marinas" },
          { label: "Boat launches", href: "/boat-launches" },
          { label: "Winter storage guide", href: "/chicago-boat-storage-guide" },
          { label: "Advertise a business", href: "/advertise" },
        ]}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-gray-700 leading-relaxed">
        <p className="text-sm rounded-2xl border border-sky-blue/25 bg-light-blue/40 p-4">
          Figures such as slip rates, insurance premiums, and loan terms change
          by season and by boat. Confirm them with the marina, insurer, lender,
          or state agency. Nothing here is a quote.
        </p>

        <section>
          <h2 className="text-2xl font-extrabold text-lake-blue mb-3">
            New versus used
          </h2>
          <p>
            A new boat starts with a known warranty and a dealer relationship.
            A used boat can fit a first season for less cash up front, but the
            useful cost is the survey, the engine hours, and what the seller
            did not mention. On Lake Michigan, hulls, canvas, and electrical
            systems see cold winters and summer chop. A marine survey before you
            pay is the practical way to separate a sound used boat from an
            expensive surprise.
          </p>
          <div className="mt-5">
            <BoatTraderShopCta
              clickref="boat-ownership"
              placement="boat-ownership"
              pageSlug="/boat-ownership"
              section="new_versus_used"
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-lake-blue mb-3">
            Boat types that fit how people actually use this water
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Pontoons and deck boats</strong> match inland lakes such
              as the Chain O&apos;Lakes and many day trips where calm water and
              passenger space matter more than speed.
            </li>
            <li>
              <strong>Runabouts and bowriders</strong> are the common trailer
              boat for a launch ramp and a Lake Michigan nearshore afternoon
              when the forecast is mild.
            </li>
            <li>
              <strong>Sailboats</strong> fit harbors with a sailing fleet —
              including several Chicago Park District harbors — and need a slip
              or a club arrangement more often than a trailer.
            </li>
            <li>
              <strong>Cruisers</strong> need real dockage, haul-out, and winter
              storage. They are a different budget from a trailerable boat even
              when the purchase price looks similar.
            </li>
          </ul>
          <p className="mt-3">
            Start with the{" "}
            <Link href="/lake-michigan-boating-guide" className="font-semibold text-coral hover:underline">
              Lake Michigan boating guide
            </Link>{" "}
            before you match a boat to open-lake conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-lake-blue mb-3">
            Where owners keep a boat
          </h2>
          <p>
            Chicago&apos;s seasonal moorings run through the Chicago Harbors /
            Park District system. Other owners keep boats at North Shore and
            Wisconsin harbors, Indiana ports such as Michigan City, or on a
            trailer at home and use a public launch. Fees, waitlists, and guest
            rules are published by the operator, not by BoatingChicago.
          </p>
          <p className="mt-3">
            Use the{" "}
            <Link href="/marinas" className="font-semibold text-coral hover:underline">
              marinas directory
            </Link>{" "}
            and{" "}
            <Link href="/boat-launches" className="font-semibold text-coral hover:underline">
              launch directory
            </Link>{" "}
            to compare a slip versus trailering. If you mostly day-trip and do
            not need a slip, a launch plus trailer storage is often the simpler
            path.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-lake-blue mb-3">
            Winter, insurance, and towing
          </h2>
          <p>
            Boats that stay in the region need a winter plan: shrink-wrap or
            indoor storage, engine winterization, and a haul-out date the yard
            will actually keep. Our{" "}
            <Link href="/chicago-boat-storage-guide" className="font-semibold text-coral hover:underline">
              Chicago boat storage guide
            </Link>{" "}
            covers the planning questions. Insurance and on-water towing are
            separate contracts from the marina. Membership organizations such
            as BoatUS sell towing and membership products; compare the contract,
            the service area, and the boat you actually own.
          </p>
          <div className="mt-3">
            <BoatUsMembershipNote />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-lake-blue mb-3">
            Survey, financing, and registration
          </h2>
          <p>
            A pre-purchase survey is a paid inspection by a marine surveyor, not
            a seller&apos;s walkthrough. Financing is a loan against a
            depreciating asset; the monthly payment is only one part of
            ownership next to the slip, storage, insurance, and fuel. Illinois
            registration and safety-education rules are published by the
            Illinois Department of Natural Resources. Wisconsin, Indiana, and
            Michigan boats follow those states&apos; rules if the boat is
            principally used there.
          </p>
          <p className="mt-3">
            <a
              href="https://dnr.illinois.gov/boating.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-coral hover:underline"
            >
              Illinois DNR boating resources
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-lake-blue mb-3">
            Selling or trading later
          </h2>
          <p>
            When you sell, marketplaces such as Boat Trader, boats.com, and
            YachtWorld are common places buyers look. BoatingChicago does not
            list inventory or broker sales. Use the same ownership checklist in
            reverse: survey paperwork, storage history, and a clear location
            where a buyer can see the boat.
          </p>
        </section>

        {(() => {
          const amazonPlacement = getAmazonGearPlacementForPath("/boat-ownership");
          return amazonPlacement ? (
            <AmazonRecommendedGear
              placement={amazonPlacement}
              analyticsPlacement="ownership_amazon_gear"
            />
          ) : null;
        })()}

        <section>
          <h2 className="text-2xl font-extrabold text-lake-blue mb-3">
            Keep planning on this site
          </h2>
          <OwnershipNextLinks />
        </section>
      </div>
    </>
  );
}
