"use client";

import { useEffect, useRef, useState } from "react";
import {
  SENDFABLE_FORM_SLUG,
  hostHasForm,
  hostShowsSuccess,
  hostShowsUnavailable,
  remountSendfableForms,
} from "@/lib/sendfable-embed";
import { trackEvent } from "@/lib/tracking";

type EmbedStatus = "loading" | "ready" | "failed";

/**
 * Official SendFable hosted form embed for the Chicago Boating Brief.
 * Falls back via onFailed when the script or form cannot load.
 */
export function SendFableFormEmbed({
  source,
  placement,
  className = "",
  onFailed,
}: {
  source: string;
  placement: "inline" | "brief_card" | "subscribe";
  className?: string;
  onFailed?: () => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const trackedRef = useRef(false);
  const onFailedRef = useRef(onFailed);
  const [status, setStatus] = useState<EmbedStatus>("loading");

  useEffect(() => {
    onFailedRef.current = onFailed;
  }, [onFailed]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let observer: MutationObserver | null = null;
    let timeoutId = 0;

    host.replaceChildren();
    host.removeAttribute("data-sendfable-ready");
    host.setAttribute("data-sendfable-form", SENDFABLE_FORM_SLUG);

    const markFailed = () => {
      if (cancelled) return;
      setStatus("failed");
      onFailedRef.current?.();
    };

    const watchSuccess = () => {
      observer = new MutationObserver(() => {
        if (!hostShowsSuccess(host) || trackedRef.current) return;
        trackedRef.current = true;
        trackEvent("newsletter_signup", {
          source,
          signup_page: source,
          signup_placement: placement,
          provider: "sendfable_embed",
          already_subscribed: "unknown",
        });
      });
      observer.observe(host, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    };

    (async () => {
      try {
        await remountSendfableForms();
        if (cancelled) return;

        // Give the official mount a moment to fetch form JSON and paint.
        const started = Date.now();
        while (Date.now() - started < 8000) {
          if (cancelled) return;
          if (hostHasForm(host)) {
            setStatus("ready");
            watchSuccess();
            return;
          }
          if (hostShowsUnavailable(host)) {
            markFailed();
            return;
          }
          await new Promise((r) => setTimeout(r, 150));
        }
        markFailed();
      } catch {
        markFailed();
      }
    })();

    timeoutId = window.setTimeout(() => {
      if (!cancelled && !hostHasForm(host)) markFailed();
    }, 9000);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      observer?.disconnect();
      host.replaceChildren();
      host.removeAttribute("data-sendfable-ready");
    };
  }, [source, placement]);

  return (
    <div className={className}>
      {status === "loading" ? (
        <p className="text-sm font-semibold opacity-80 mb-3" role="status">
          Loading signup form…
        </p>
      ) : null}
      <div
        ref={hostRef}
        data-sendfable-form={SENDFABLE_FORM_SLUG}
        className="sendfable-embed-host"
        // Official embed also reads data-theme; form default is inherit.
        data-theme="inherit"
      />
      {status === "failed" ? (
        <p className="sr-only" role="alert">
          SendFable form failed to load; using backup signup.
        </p>
      ) : null}
    </div>
  );
}
