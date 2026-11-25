"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { MapPoint, MapPointKind } from "@/lib/map-points";

// Leaflet touches `window`, so it is client-only and code-split: nothing is
// downloaded until the map scrolls near the viewport (or the user taps load).
const LaunchMapCanvas = dynamic(() => import("./LaunchMapCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-gray-500">
      Loading map…
    </div>
  ),
});

const KIND_META: Record<
  MapPointKind,
  { label: string; swatch: string; shape: string }
> = {
  "launch-area": {
    label: "Launch areas",
    swatch: "bg-lake-blue",
    shape: "rotate-45 rounded-[3px]",
  },
  marina: { label: "Marinas & harbors", swatch: "bg-coral", shape: "rounded-full" },
};

export function LazyLaunchMap({
  points,
  title,
  footnote,
  defaultKinds,
}: {
  points: MapPoint[];
  title: string;
  footnote?: string;
  defaultKinds?: MapPointKind[];
}) {
  const kindsPresent = (Object.keys(KIND_META) as MapPointKind[]).filter((k) =>
    points.some((p) => p.kind === k),
  );
  const [visibleKinds, setVisibleKinds] = useState<MapPointKind[]>(
    defaultKinds?.length ? defaultKinds : kindsPresent,
  );
  const [load, setLoad] = useState(false);
  const holderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = holderRef.current;
    if (!el || load) return;
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [load]);

  if (points.length === 0) return null;

  function toggleKind(kind: MapPointKind) {
    setVisibleKinds((current) =>
      current.includes(kind)
        ? current.filter((k) => k !== kind)
        : [...current, kind],
    );
  }

  const listPoints = points.filter((p) => visibleKinds.includes(p.kind));

  return (
    <section aria-label={title} className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-extrabold text-lake-blue">{title}</h2>
        {kindsPresent.length > 1 ? (
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Map layers"
          >
            {kindsPresent.map((kind) => {
              const on = visibleKinds.includes(kind);
              return (
                <button
                  key={kind}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleKind(kind)}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold border transition-colors ${
                    on
                      ? "bg-light-blue border-sky-blue/40 text-lake-blue"
                      : "bg-white border-gray-300 text-gray-500"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`inline-block h-3 w-3 ${KIND_META[kind].swatch} ${KIND_META[kind].shape} ${on ? "" : "opacity-40"}`}
                  />
                  {KIND_META[kind].label}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div
        ref={holderRef}
        className="relative h-[22rem] sm:h-[28rem] w-full overflow-hidden rounded-2xl border border-sky-blue/25 bg-light-blue/50"
      >
        {load ? (
          <LaunchMapCanvas
            points={points}
            visibleKinds={visibleKinds}
            label={title}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
            <p className="text-sm text-gray-600">
              Interactive map of {points.length} location
              {points.length === 1 ? "" : "s"} — loads when you scroll here.
            </p>
            <button
              type="button"
              onClick={() => setLoad(true)}
              className="rounded-full bg-lake-blue px-5 py-2.5 text-sm font-bold text-white hover:bg-lake-blue/90"
            >
              Load interactive map
            </button>
          </div>
        )}
      </div>

      {footnote ? (
        <p className="text-sm text-gray-600 leading-relaxed">{footnote}</p>
      ) : null}

      <details className="text-sm">
        <summary className="cursor-pointer font-semibold text-lake-blue">
          View map locations as a list ({listPoints.length})
        </summary>
        <ul className="mt-2 grid gap-1 sm:grid-cols-2">
          {listPoints.map((p) => (
            <li key={p.id}>
              <Link
                href={p.href}
                className="font-semibold text-coral hover:underline"
              >
                {p.title}
              </Link>{" "}
              <span className="text-gray-500">— {p.subtitle}</span>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
