import Link from "next/link";
import { notFound } from "next/navigation";
import { getManagedFeed } from "@/lib/gravyblock-managed";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 60;
export const metadata = buildMetadata({
  title: "Boating Insights",
  description: "Practical planning notes for boating in Chicago and on southern Lake Michigan.",
  path: "/insights",
});

export default async function InsightsIndex() {
  const items = (await getManagedFeed())?.items ?? [];
  if (items.length === 0) notFound();
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Boating Insights</h1>
      <ul className="mt-8 space-y-4">
        {items.map((i) => (
          <li key={i.slug}>
            <Link href={`/insights/${i.slug}`} className="text-lg font-semibold text-sky-800 hover:underline">
              {i.title}
            </Link>
            {i.description ? <p className="text-sm text-slate-600">{i.description}</p> : null}
          </li>
        ))}
      </ul>
    </main>
  );
}
