import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import {
  LocalOnlyForm,
  PrintButton,
} from "@/components/tools/PrintableWorksheet";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Pre-Departure Trip Checklist | BoatingChicago",
    description:
      "Printable pre-departure checklist for recreational trips near Chicago — safety gear, paperwork, and conditions. Not submitted to authorities.",
    path: "/tools/trip-checklist",
  });
}

const SECTIONS: { title: string; items: string[] }[] = [
  {
    title: "People & plan",
    items: [
      "Shore contact has a float plan and expected return time",
      "Everyone knows who is responsible for the vessel",
      "Passenger count within the vessel’s rated capacity",
    ],
  },
  {
    title: "Safety equipment (USCG / state basics)",
    items: [
      "USCG-approved life jacket for each person (wear rules for children as required)",
      "Throwable flotation device (where required for your vessel)",
      "Visual distress signals appropriate for waters and time of day",
      "Fire extinguisher(s) charged and accessible (if required)",
      "Sound-producing device (horn/whistle)",
      "Navigation lights working if operating near dusk/night",
    ],
  },
  {
    title: "Paperwork & vessel readiness",
    items: [
      "Registration / documentation aboard",
      "Fuel, oil, and bilge checked; spare fuel plan if needed",
      "Battery, bilge pump, and radio/phone charged or working",
      "Weather and marine alerts reviewed before departure",
      "Local launch/marina fees, stickers, or permits confirmed with the operator",
    ],
  },
  {
    title: "Chicago-area trip notes",
    items: [
      "Lake Michigan vs inland rules verified for your destination",
      "Harbor no-wake and traffic expectations reviewed",
      "Alternate harbor or return plan if wind/waves build",
    ],
  },
];

export default function TripChecklistPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: "Trip checklist", path: "/tools/trip-checklist" },
        ]}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 md:py-14 print:py-4">
        <p className="text-sm font-bold uppercase tracking-wide text-coral mb-2 print:hidden">
          Planning worksheet
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-lake-blue mb-4">
          Pre-departure trip checklist
        </h1>
        <div className="space-y-3 text-gray-700 leading-relaxed mb-6">
          <p>
            Use this as a trip planning aid before you leave the ramp or slip.
            Requirements vary by vessel length, state, and waters — confirm
            current U.S. Coast Guard and Illinois / Wisconsin / Indiana rules for
            your boat.
          </p>
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm print:border-black print:bg-transparent">
            Checking boxes here does <strong>not</strong> file anything with an
            agency and does not certify the vessel as safe. Print a copy for your
            crew if useful.
          </p>
          <p className="text-sm">
            See also the editorial{" "}
            <Link
              href="/spring-boat-launch-checklist-chicago"
              className="font-semibold text-coral hover:underline"
            >
              spring boat launch checklist guide
            </Link>{" "}
            and{" "}
            <a
              href="https://www.uscgboating.org/"
              className="font-semibold text-coral hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              USCG boating safety
            </a>
            .
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-3 print:hidden">
          <PrintButton />
          <Link
            href="/tools/float-plan"
            className="inline-flex items-center px-5 py-2.5 border border-sky-blue/40 text-lake-blue font-bold rounded-full hover:bg-light-blue"
          >
            Float plan worksheet
          </Link>
        </div>

        <LocalOnlyForm ariaLabel="Trip checklist">
          {SECTIONS.map((section) => (
            <fieldset key={section.title} className="space-y-2">
              <legend className="text-lg font-extrabold text-lake-blue print:text-black">
                {section.title}
              </legend>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <label className="flex items-start gap-3 text-sm text-gray-800 print:text-black">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-sky-blue/40"
                      />
                      <span>{item}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
          ))}
        </LocalOnlyForm>

        <p className="mt-8 text-sm text-gray-600 print:hidden">
          <Link href="/tools" className="font-semibold text-coral hover:underline">
            ← All planning tools
          </Link>
          {" · "}
          <Link href="/weather" className="font-semibold text-coral hover:underline">
            Check conditions
          </Link>
        </p>
      </div>
    </>
  );
}
