import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import {
  getChicagoNews,
  getNewsItemBySlug,
} from "@/lib/news";
import { buildMetadata } from "@/lib/seo";
import { getChicagoWeather } from "@/lib/weather";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const weather = await getChicagoWeather();
  const feed = await getChicagoNews({ alerts: weather.alerts, weather });
  const item = getNewsItemBySlug(feed.items, slug);
  if (!item) {
    return buildMetadata({
      title: "News story",
      description: "Chicago boating news story",
      path: `/news/${slug}`,
      noIndex: true,
    });
  }
  return buildMetadata({
    title: item.headline,
    description: item.whyItMatters.slice(0, 155),
    path: `/news/${item.slug}`,
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const weather = await getChicagoWeather();
  const feed = await getChicagoNews({ alerts: weather.alerts, weather });
  const item = getNewsItemBySlug(feed.items, slug);
  if (!item) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.headline,
    datePublished: item.sourcePublishedAt || item.firstSeenAt,
    dateModified: item.firstSeenAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    description: item.whyItMatters,
    mainEntityOfPage: `${siteConfig.url}/news/${item.slug}`,
    isBasedOn: item.sourceUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "News", path: "/news" },
          { name: item.headline, path: `/news/${item.slug}` },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-coral mb-3">
          {item.category}
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-lake-blue mb-4">
          {item.headline}
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Source: {item.sourceName}
          {item.sourcePublishedAt
            ? ` · ${new Date(item.sourcePublishedAt).toLocaleString("en-US", {
                timeZone: "America/Chicago",
              })}`
            : null}
        </p>

        <div className="prose-legal space-y-4 text-gray-800 leading-relaxed mb-8">
          <p>{item.originalSummary}</p>
          <p>
            <strong>Why this matters to Chicago boaters:</strong>{" "}
            {item.whyItMatters}
          </p>
          <p className="text-sm text-gray-600">
            BoatingChicago provides original context for local boaters. We do
            not republish the full source article. Follow the link below for the
            original reporting.
          </p>
        </div>

        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-3 rounded-full bg-coral text-white font-bold hover:bg-coral/90"
        >
          Read the original story
        </a>

        {item.relatedBoatingChicagoPages.length ? (
          <div className="mt-10">
            <h2 className="text-lg font-extrabold text-lake-blue mb-3">
              Related guides
            </h2>
            <div className="flex flex-wrap gap-2">
              {item.relatedBoatingChicagoPages.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm font-semibold px-3 py-1.5 rounded-full bg-light-blue text-lake-blue"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <p className="mt-10">
          <Link href="/news" className="font-bold text-coral hover:underline">
            ← All Chicago boating news
          </Link>
        </p>
      </article>
    </>
  );
}
