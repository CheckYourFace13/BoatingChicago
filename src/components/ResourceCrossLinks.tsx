import Link from "next/link";

/** Compact cross-link strip for geo/resource hub pages. */
export function ResourceCrossLinks({
  title = "Continue exploring",
  links,
}: {
  title?: string;
  links: { href: string; label: string }[];
}) {
  if (!links.length) return null;
  return (
    <section className="rounded-2xl border border-sky-blue/20 bg-light-blue/40 p-5">
      <h2 className="text-lg font-extrabold text-lake-blue mb-3">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-sm font-semibold px-3 py-1.5 rounded-full bg-white text-lake-blue border border-sky-blue/20 hover:bg-sky-blue/10"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
