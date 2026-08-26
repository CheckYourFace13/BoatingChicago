import type { SourceRef } from "@/types/geo";
import { formatLastVerified } from "@/lib/geo-display";

export const QUALITY_DISCLAIMER =
  "Verified from official sources; operational details change — always confirm with the linked source.";

export function QualityDisclaimer({ className = "" }: { className?: string }) {
  return (
    <p
      className={`rounded-2xl border border-sky-blue/20 bg-light-blue/50 p-4 text-sm text-gray-700 ${className}`}
    >
      <span className="font-bold text-lake-blue">Before you go: </span>
      {QUALITY_DISCLAIMER}
    </p>
  );
}

export function SourceLink({ source }: { source: SourceRef }) {
  const verified = formatLastVerified(source.lastVerified);
  return (
    <>
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-lake-blue hover:underline"
      >
        {source.name}
      </a>
      {verified ? (
        <span className="text-gray-500"> · verified {verified}</span>
      ) : null}
    </>
  );
}

/** Single-source footer block for marina, launch, and event records. */
export function SourceAttribution({
  source,
  title = "Source",
  note,
}: {
  source: SourceRef;
  title?: string;
  note?: string;
}) {
  return (
    <section className="rounded-2xl border border-sky-blue/20 bg-light-blue/60 p-5 text-sm text-gray-700">
      <h2 className="font-extrabold text-lake-blue mb-2">{title}</h2>
      <p className="mb-2">
        <SourceLink source={source} />
      </p>
      <p>{note ?? QUALITY_DISCLAIMER}</p>
    </section>
  );
}

export function SourceLinkList({
  sources,
  title = "Official links",
  description,
}: {
  sources: SourceRef[];
  title?: string;
  description?: string;
}) {
  if (!sources.length) return null;
  return (
    <section>
      <h2 className="text-2xl font-extrabold text-lake-blue mb-3">{title}</h2>
      {description ? (
        <p className="text-gray-600 mb-4 max-w-3xl">{description}</p>
      ) : null}
      <ul className="space-y-2 text-sm">
        {sources.map((source) => (
          <li
            key={source.url}
            className="rounded-xl border border-sky-blue/20 bg-white px-4 py-3"
          >
            <SourceLink source={source} />
          </li>
        ))}
      </ul>
    </section>
  );
}
