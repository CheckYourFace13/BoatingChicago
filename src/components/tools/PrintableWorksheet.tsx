"use client";

import type { ReactNode } from "react";

export function PrintButton({ label = "Print / save PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center px-5 py-2.5 bg-coral text-white font-bold rounded-full hover:bg-coral/90 print:hidden"
    >
      {label}
    </button>
  );
}

/** Local-only worksheet — never posts; browser print/PDF only. */
export function LocalOnlyForm({
  children,
  ariaLabel,
}: {
  children: ReactNode;
  ariaLabel: string;
}) {
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => e.preventDefault()}
      aria-label={ariaLabel}
    >
      {children}
    </form>
  );
}
