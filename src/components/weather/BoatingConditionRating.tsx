"use client";

import { useEffect } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";
import type { BoatingConditionRating } from "@/types/weather";

const styles: Record<
  BoatingConditionRating["level"],
  { bg: string; border: string; label: string }
> = {
  Good: {
    bg: "bg-emerald-50",
    border: "border-emerald-300",
    label: "text-emerald-800",
  },
  Caution: {
    bg: "bg-amber-50",
    border: "border-amber-300",
    label: "text-amber-900",
  },
  Poor: {
    bg: "bg-red-50",
    border: "border-red-300",
    label: "text-red-900",
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
        Boating conditions summary
      </p>
      <p className={`text-3xl font-extrabold ${s.label} mb-2`}>{rating.level}</p>
      <p className="text-gray-800 leading-relaxed mb-4">{rating.reason}</p>
      <ul className="text-sm text-gray-700 space-y-1 mb-4 list-disc pl-5">
        {rating.factors.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <p className="text-xs text-gray-600 leading-relaxed border-t border-black/5 pt-3">
        Boating conditions can change quickly. This rating is informational only
        and is not a substitute for official NOAA/NWS marine forecasts, local
        regulations, or the judgment of a qualified captain.
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
