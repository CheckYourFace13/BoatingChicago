import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import {
  LocalOnlyForm,
  PrintButton,
} from "@/components/tools/PrintableWorksheet";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Printable Float Plan Worksheet | BoatingChicago",
    description:
      "Printable float-plan worksheet for recreational boaters. Fill it out, leave a copy with a trusted contact, and check in when you return. Nothing on this page is submitted to authorities.",
    path: "/tools/float-plan",
  });
}

const FIELDS = [
  ["Vessel name / registration", "Make / length / color"],
  ["Departure point & time", "Planned route / destination"],
  ["Expected return point & time", "Number of people aboard"],
  ["Radio / phone aboard", "Shore contact name & phone"],
  ["Vehicle / trailer description & location", "Other notes"],
] as const;

export default function FloatPlanPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: "Float plan", path: "/tools/float-plan" },
        ]}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 md:py-14 print:py-4 print:max-w-none">
        <p className="text-sm font-bold uppercase tracking-wide text-coral mb-2 print:hidden">
          Planning worksheet
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-lake-blue mb-4">
          Float plan worksheet
        </h1>
        <div className="space-y-3 text-gray-700 leading-relaxed mb-6 print:text-black">
          <p>
            A float plan is information you leave with a{" "}
            <strong>trusted person ashore</strong> before you get underway. If
            you do not check in when expected, that person can contact the Coast
            Guard or local responders with useful details.
          </p>
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm print:border-black print:bg-transparent">
            Completing this page does <strong>not</strong> submit your plan to
            the U.S. Coast Guard, BoatingChicago, or any authority. Print or copy
            the filled fields and give them to your shore contact. Do not put
            sensitive personal data into web forms that upload anywhere — these
            fields stay in your browser until you print.
          </p>
          <p className="text-sm">
            Adapted from public U.S. Coast Guard recreational float-plan
            guidance (
            <a
              href="https://www.uscgboating.org/"
              className="font-semibold text-coral hover:underline print:text-black print:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              uscgboating.org
            </a>
            ). Always follow current requirements for your vessel and waters.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-3 print:hidden">
          <PrintButton />
          <Link
            href="/tools/trip-checklist"
            className="inline-flex items-center px-5 py-2.5 border border-sky-blue/40 text-lake-blue font-bold rounded-full hover:bg-light-blue"
          >
            Trip checklist
          </Link>
        </div>

        <LocalOnlyForm ariaLabel="Float plan worksheet fields">
          {FIELDS.map(([left, right]) => (
            <div
              key={left}
              className="grid gap-3 sm:grid-cols-2 print:grid-cols-2"
            >
              <label className="block text-sm">
                <span className="font-semibold text-lake-blue print:text-black">
                  {left}
                </span>
                <textarea
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-sky-blue/30 px-3 py-2 text-sm print:border-black print:rounded-none"
                  autoComplete="off"
                />
              </label>
              <label className="block text-sm">
                <span className="font-semibold text-lake-blue print:text-black">
                  {right}
                </span>
                <textarea
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-sky-blue/30 px-3 py-2 text-sm print:border-black print:rounded-none"
                  autoComplete="off"
                />
              </label>
            </div>
          ))}
          <p className="text-xs text-gray-500 print:text-black">
            Check in with your shore contact when you return. If plans change,
            update them before your expected return time.
          </p>
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
