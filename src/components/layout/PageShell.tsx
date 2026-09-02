import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
  leftRail?: ReactNode;
  rightRail?: ReactNode;
  /** When false, render a single centered column (default true when rails provided). */
  enableRails?: boolean;
  className?: string;
}

/**
 * Publication-width shell: centered ~1120px main column with optional
 * side rails on xl+ viewports. Rails collapse entirely on tablet/mobile.
 */
export function PageShell({
  children,
  leftRail,
  rightRail,
  enableRails = Boolean(leftRail || rightRail),
  className = "",
}: PageShellProps) {
  if (!enableRails) {
    return (
      <div
        className={`mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8 ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="xl:grid xl:grid-cols-[200px_minmax(0,1120px)_200px] xl:gap-8 xl:justify-center 2xl:grid-cols-[220px_minmax(0,1120px)_220px]">
        <aside className="hidden xl:block min-w-0">{leftRail}</aside>
        <div className="min-w-0 max-w-[1120px] mx-auto xl:mx-0 w-full">
          {children}
        </div>
        <aside className="hidden xl:block min-w-0">{rightRail}</aside>
      </div>
    </div>
  );
}
