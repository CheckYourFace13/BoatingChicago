"use client";

import { useEffect } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";
import type { BoatingConditionRating } from "@/types/weather";

const styles: Record<
  BoatingConditionRating["level"],
  { bg: string; border: string; label: string; headline: string; badge: string }
> = {
  Good: {
    bg: "bg-slate-50",
    border: "border-sky-blue/40",
    label: "text-lake-blue",
    headline: "Lower observed winds & waves",
    badge: "Snapshot: quieter observations",
  },
  Caution: {
    bg: "bg-amber-50",
    border: "border-amber-300",
    label: "text-amber-900",
    headline: "Elevated or incomplete observations",
    badge: "Snapshot: elevated / incomplete",
  },
  Poor: {
    bg: "bg-red-50",
    border: "border-red-300",
    label: "text-red-900",
    headline: "High observations or marine warning",
    badge: "Snapshot: high / warning factors",
  },
};

export function BoatingConditionRatingCard({
  rating,
}: {
  rating: BoatingConditionRating;
}) {
  const s = styles[rating.level];
  return (
    <div className={`rounded-2xl border ${s.border} ${s.bg} p-6`}>
      <p className="text-xs font-bold uppercase tracking-widest text-lake-blue/70 mb-2">
        {s.badge} · not a go/no-go decision
      </p>
      <p className={`text-2xl md:text-3xl font-extrabold ${s.label} mb-2`}>
        {s.headline}
      </p>
      <p className="text-gray-800 leading-relaxed mb-4">{rating.reason}</p>
      <ul className="text-sm text-gray-700 space-y-1 mb-4 list-disc pl-5">
        {rating.factors.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <p className="text-xs text-gray-600 leading-relaxed border-t border-black/5 pt-3">
        Read the official observations, nearshore zone forecast, alerts, and
        timestamps on this page before anything else. A quieter snapshot does
        not mean it is safe to boat — conditions, vessel, and skipper judgment
        still govern.
      </p>
    </div>
  );
}

export function WeatherPageViewTracker() {
  useEffect(() => {
    trackAnalyticsEvent("weather_page_view");
  }, []);
  return null;
}

export function BoatingBriefViewTracker() {
  useEffect(() => {
    trackAnalyticsEvent("boating_brief_view");
  }, []);
  return null;
}
