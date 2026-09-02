"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/tracking";
import type { ConditionsTickerItem } from "@/lib/conditions-ticker";

interface ConditionsTickerProps {
  items: ConditionsTickerItem[];
}

function TickerSegment({
  items,
  onItemClick,
}: {
  items: ConditionsTickerItem[];
  onItemClick: (item: ConditionsTickerItem) => void;
}) {
  return (
    <div className="flex items-center shrink-0" aria-hidden>
      {items.map((item, index) => (
        <span key={`${item.id}-${index}`} className="flex items-center shrink-0">
          {index > 0 ? (
            <span className="px-3 text-sky-blue/50 select-none" aria-hidden>
              •
            </span>
          ) : null}
          <Link
            href={item.href}
            onClick={() => onItemClick(item)}
            className={`whitespace-nowrap text-[11px] sm:text-xs font-bold tracking-wide uppercase transition-colors hover:text-sun-yellow ${
              item.kind === "alert" && item.label.startsWith("ALERT")
                ? "text-coral"
                : item.kind === "rating"
                  ? "text-sun-yellow"
                  : "text-white/95"
            }`}
          >
            {item.label}
          </Link>
        </span>
      ))}
      <span className="px-3 text-sky-blue/50 select-none" aria-hidden>
        •
      </span>
    </div>
  );
}

/**
 * Live marine conditions wire. CSS marquee with pause on hover/touch
 * and a static list for prefers-reduced-motion.
 */
export function ConditionsTicker({ items }: ConditionsTickerProps) {
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (!items.length) return null;

  function handleClick(item: ConditionsTickerItem) {
    trackEvent("weather_ticker_click", {
      item_id: item.id,
      kind: item.kind,
      href: item.href,
    });
  }

  return (
    <div
      className="conditions-ticker border-b border-sky-blue/25 bg-lake-blue text-white"
      style={{ height: 36 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-4 h-full flex items-center gap-2">
        <span className="shrink-0 text-[10px] sm:text-[11px] font-extrabold tracking-[0.16em] uppercase text-sun-yellow px-2.5 py-1 rounded-md bg-white/10">
          Live
        </span>

        {reducedMotion ? (
          <div
            className="flex-1 overflow-x-auto scrollbar-none"
            role="region"
            aria-label="Live boating conditions"
          >
            <div className="flex items-center min-w-max py-1">
              {items.map((item, index) => (
                <span key={item.id} className="flex items-center">
                  {index > 0 ? (
                    <span className="px-3 text-sky-blue/50" aria-hidden>
                      •
                    </span>
                  ) : null}
                  <Link
                    href={item.href}
                    onClick={() => handleClick(item)}
                    className={`whitespace-nowrap text-[11px] sm:text-xs font-bold tracking-wide uppercase hover:text-sun-yellow ${
                      item.kind === "alert" && item.label.startsWith("ALERT")
                        ? "text-coral"
                        : item.kind === "rating"
                          ? "text-sun-yellow"
                          : "text-white/95"
                    }`}
                  >
                    {item.label}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="flex-1 overflow-hidden"
            role="region"
            aria-label="Live boating conditions scrolling feed"
          >
            <div
              className={`conditions-ticker-track ${paused ? "is-paused" : ""}`}
            >
              <TickerSegment items={items} onItemClick={handleClick} />
              <TickerSegment items={items} onItemClick={handleClick} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
