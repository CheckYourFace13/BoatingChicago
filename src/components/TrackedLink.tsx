"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent } from "@/lib/tracking";

type LinkProps = ComponentProps<typeof Link>;

interface TrackedLinkProps extends LinkProps {
  track?: "list_business_click" | "affiliate_click";
  trackParams?: Record<string, string>;
}

/** Link that fires a named analytics event on click. */
export function TrackedLink({
  track,
  trackParams,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      {...(track === "list_business_click"
        ? { "data-track": "list_business_click" as const }
        : {})}
      onClick={(e) => {
        if (track === "list_business_click") {
          trackEvent("list_business_click", trackParams);
        } else if (track === "affiliate_click") {
          trackEvent("affiliate_click", trackParams);
        }
        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}
