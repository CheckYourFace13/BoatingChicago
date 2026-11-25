"use client";

import { useEffect } from "react";
import { PrintButton } from "@/components/tools/PrintableWorksheet";
import { trackAnalyticsEvent } from "@/lib/analytics";

export function ToolEngage({ tool }: { tool: string }) {
  useEffect(() => {
    trackAnalyticsEvent("tool_view", { tool });
  }, [tool]);
  return null;
}

export function ToolPrintBar({ tool }: { tool: string }) {
  return (
    <div className="mb-6 flex flex-wrap gap-3 print:hidden">
      <PrintButton />
      <button
        type="button"
        className="inline-flex items-center px-5 py-2.5 border border-sky-blue/40 text-lake-blue font-bold rounded-full hover:bg-light-blue"
        onClick={() => {
          trackAnalyticsEvent("tool_share", { tool });
          void navigator.clipboard?.writeText(window.location.href);
        }}
      >
        Copy page link
      </button>
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-lake-blue mb-1">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-gray-500">{hint}</span> : null}
    </label>
  );
}

export function NumberInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      inputMode="decimal"
      {...props}
      className="w-full rounded-xl border border-sky-blue/30 px-3 py-2.5 text-lake-blue"
    />
  );
}

export function ResultCard({
  title,
  items,
}: {
  title: string;
  items: { label: string; value: string }[];
}) {
  return (
    <div className="rounded-2xl border border-sky-blue/25 bg-light-blue/40 p-5">
      <p className="text-sm font-bold uppercase tracking-wide text-coral mb-3">{title}</p>
      <dl className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="text-xs uppercase tracking-wide text-gray-500">{item.label}</dt>
            <dd className="text-lg font-extrabold text-lake-blue">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
