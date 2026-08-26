"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent, type TrackEventName } from "@/lib/tracking";

export function HomepageTrackLink({
  href,
  event,
  params,
  className,
  children,
}: {
  href: string;
  event: TrackEventName;
  params?: Record<string, string>;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackEvent(event, params)}
    >
      {children}
    </Link>
  );
}
