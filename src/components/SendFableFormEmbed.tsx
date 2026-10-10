"use client";

import { useEffect, useRef, useState } from "react";
import {
  SENDFABLE_FORM_SLUG,
  hostShowsSuccess,
  remountSendfableForms,
  waitForHostForm,
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

    const resetHost = () => {
      host.replaceChildren();
      host.removeAttribute("data-sendfable-ready");
      host.setAttribute("data-sendfable-form", SENDFABLE_FORM_SLUG);
    };

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

    const attemptMount = async (): Promise<"ready" | "unavailable" | "timeout"> => {
      resetHost();
      await remountSendfableForms();
      if (cancelled) return "timeout";
      return waitForHostForm(host, 10000);
    };

    (async () => {
      try {
        let result = await attemptMount();
        if (cancelled) return;

        // One retry for transient CDN / rate-limit / SPA remount races
        if (result !== "ready") {
          await new Promise((r) => setTimeout(r, 600));
          if (cancelled) return;
          result = await attemptMount();
        }

        if (cancelled) return;
        if (result === "ready") {
          setStatus("ready");
          watchSuccess();
          return;
        }
        markFailed();
      } catch {
        markFailed();
      }
    })();

    return () => {
      cancelled = true;
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
