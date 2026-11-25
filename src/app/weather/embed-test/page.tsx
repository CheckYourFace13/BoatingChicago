import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { siteConfig } from "@/config/site";

export async function generateMetadata() {
  return buildManagedMetadata({
    title: "Conditions Embed Test Page",
    description:
      "Internal test harness that iframes the public BoatingChicago conditions embed card.",
    path: "/weather/embed-test",
    noIndex: true,
  });
}

/**
 * Unrelated-looking test page that embeds the conditions card in an iframe
 * (same-site preview). For third-party framing, use /weather/embed docs.
 */
export default function WeatherEmbedTestPage() {
  const src = `${siteConfig.url}/embed/conditions?location=chicago`;
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 space-y-6">
      <h1 className="text-2xl font-extrabold text-lake-blue">
        Embed test (noindex)
      </h1>
      <p className="text-sm text-gray-700">
        This page exists only to verify the iframe loads. It is not an editorial
        landing page.
      </p>
      <iframe
        title="BoatingChicago conditions embed test"
        src={src}
        width={360}
        height={320}
        loading="lazy"
        className="rounded-xl border border-sky-blue/30 bg-white max-w-full"
      />
      <p className="text-sm">
        Docs:{" "}
        <a href="/weather/embed" className="font-semibold text-sky-blue hover:underline">
          /weather/embed
        </a>
      </p>
    </div>
  );
}
