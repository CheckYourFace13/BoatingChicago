import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ResourceCrossLinks } from "@/components/ResourceCrossLinks";
import { buildFAQSchema } from "@/lib/schema";
import type { CategoryFAQ } from "@/types";

export function ToolArticle({
  title,
  path,
  intro,
  children,
  faqs,
  citations,
  related,
}: {
  title: string;
  path: string;
  intro: string;
  children: React.ReactNode;
  faqs: CategoryFAQ[];
  citations: { name: string; url: string }[];
  related: { href: string; label: string }[];
}) {
  const faqSchema = buildFAQSchema(faqs);
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: title, path },
        ]}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 md:py-14 print:py-4">
        <p className="text-sm font-bold uppercase tracking-wide text-coral mb-2 print:hidden">
          Planning tool
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-lake-blue mb-4">{title}</h1>
        <p className="text-gray-700 leading-relaxed mb-6">{intro}</p>
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm mb-8 print:border-black print:bg-transparent">
          Numbers stay in your browser. Nothing is submitted to BoatingChicago.
          Results are planning arithmetic, not navigation, engineering, or
          financial advice.
        </p>
        {children}
        {faqs.length > 0 ? (
          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-extrabold text-lake-blue">Questions</h2>
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-bold text-lake-blue">{faq.question}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </section>
        ) : null}
        {citations.length > 0 ? (
          <section className="mt-10">
            <h2 className="text-lg font-extrabold text-lake-blue mb-2">Sources</h2>
            <ul className="space-y-1 text-sm">
              {citations.map((c) => (
                <li key={c.url}>
                  <a
                    href={c.url}
                    className="font-semibold text-coral hover:underline"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <p className="mt-8 text-sm">
          <Link href="/tools" className="font-semibold text-coral hover:underline">
            All planning tools →
          </Link>
        </p>
        <div className="mt-8">
          <ResourceCrossLinks links={related} />
        </div>
      </div>
    </>
  );
}
