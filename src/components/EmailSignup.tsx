"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState, type FormEvent } from "react";
import { siteImages } from "@/data/images";
import { trackEvent, trackingAttrs } from "@/lib/tracking";
import { SendFableFormEmbed } from "@/components/SendFableFormEmbed";

interface EmailSignupProps {
  source?: string;
  variant?: "inline" | "card";
}

type FormStatus = "idle" | "loading" | "success" | "duplicate" | "error";

/**
 * Chicago Boating Brief signup.
 * Primary: official SendFable embed (boatingchicago-newsletter).
 * Fallback: local /api/newsletter → MySQL + SendFable sync (no double-submit).
 */
export function EmailSignup({
  source = "homepage",
  variant = "card",
}: EmailSignupProps) {
  const [useFallback, setUseFallback] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleEmbedFailed = useCallback(() => {
    setUseFallback(true);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: `${source}:embed-fallback` }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        created?: boolean;
        alreadySubscribed?: boolean;
        success?: boolean;
      };

      if (!res.ok) {
        setErrorMsg(
          data.error ||
            (res.status === 429
              ? "Too many tries. Please wait a moment and try again."
              : "Something went wrong. Try again.")
        );
        setStatus("error");
        return;
      }

      trackEvent("newsletter_signup", {
        source,
        signup_page: source,
        signup_placement: variant === "inline" ? "inline" : "brief_card",
        provider: "local_fallback",
        already_subscribed: data.alreadySubscribed ? "yes" : "no",
      });

      setStatus(data.alreadySubscribed ? "duplicate" : "success");
      e.currentTarget.reset();
    } catch {
      setErrorMsg("Something went wrong. Try again.");
      setStatus("error");
    }
  }

  const privacyNote = (
    <p
      className={
        variant === "card"
          ? "text-white/85 text-xs sm:text-sm mt-4 max-w-md mx-auto leading-relaxed"
          : "text-gray-600 text-xs sm:text-sm mt-3 leading-relaxed"
      }
    >
      Free weekly Brief. Unsubscribe anytime.{" "}
      <Link
        href="/privacy"
        className={
          variant === "card"
            ? "underline font-semibold text-sun-yellow hover:text-white"
            : "underline font-semibold text-sky-blue hover:text-lake-blue"
        }
      >
        Privacy policy
      </Link>
      .
    </p>
  );

  if (status === "success" || status === "duplicate") {
    return (
      <div
        className={variant === "card" ? "text-center py-4" : ""}
        {...trackingAttrs.newsletterSignup}
      >
        <p
          className={
            variant === "card"
              ? "text-sun-yellow font-bold text-lg md:text-xl"
              : "text-lake-blue font-bold text-lg"
          }
          role="status"
        >
          {status === "duplicate"
            ? "You\u2019re already on the list."
            : "You\u2019re on the list. Watch your inbox for the next Chicago Boating Brief."}
        </p>
      </div>
    );
  }

  const fallbackForm = (
    <form
      onSubmit={handleSubmit}
      className={
        variant === "inline"
          ? "flex flex-col sm:flex-row gap-3"
          : "flex flex-col sm:flex-row gap-3 max-w-md mx-auto text-left"
      }
      noValidate
    >
      <div className="flex-1 w-full">
        <label
          htmlFor={`brief-email-${source}`}
          className={
            variant === "card"
              ? "block text-sm font-bold text-white mb-1.5"
              : "block text-sm font-bold text-lake-blue mb-1.5"
          }
        >
          Email *
        </label>
        <input
          id={`brief-email-${source}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="bc-field w-full"
          aria-label="Email for the Chicago Boating Brief"
        />
      </div>
      <div className={variant === "inline" ? "sm:self-end" : "sm:self-end"}>
        <button
          type="submit"
          disabled={status === "loading"}
          {...trackingAttrs.newsletterSignup}
          className="min-h-[48px] w-full sm:w-auto px-6 py-3 bg-sun-yellow text-lake-blue font-bold rounded-xl hover:bg-sun-yellow/90 transition-colors whitespace-nowrap disabled:opacity-60 text-base"
        >
          {status === "loading" ? "Joining…" : "Get the Brief"}
        </button>
      </div>
      {status === "error" && errorMsg ? (
        <p
          className="text-coral text-sm font-semibold w-full basis-full"
          role="alert"
        >
          {errorMsg}
        </p>
      ) : null}
    </form>
  );

  const body = useFallback ? (
    <div>
      <p
        className={
          variant === "card"
            ? "text-white/90 text-sm mb-3"
            : "text-gray-700 text-sm mb-3"
        }
        role="status"
      >
        Using backup signup — your address still joins the Chicago Boating Brief
        list.
      </p>
      {fallbackForm}
      {privacyNote}
    </div>
  ) : (
    <div>
      <SendFableFormEmbed
        source={source}
        placement={
          source === "subscribe-page"
            ? "subscribe"
            : variant === "inline"
              ? "inline"
              : "brief_card"
        }
        className={
          variant === "card"
            ? "sendfable-embed-host--on-dark max-w-md mx-auto text-left"
            : "sendfable-embed-host--on-light max-w-md"
        }
        onFailed={handleEmbedFailed}
      />
      {privacyNote}
    </div>
  );

  if (variant === "inline") {
    return <div className="w-full">{body}</div>;
  }

  return (
    <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 text-center">
      <Image
        src={siteImages.newsletterSunset.src}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 1120px"
        className="object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-lake-blue/80" />
      <div className="relative z-10">
        <p className="text-sun-yellow text-xs font-bold uppercase tracking-widest mb-2">
          Chicago Boating Brief
        </p>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">
          Know what&apos;s happening on the water.
        </h3>
        <p className="text-white/90 mb-6 max-w-xl mx-auto leading-relaxed text-base sm:text-lg px-1">
          Chicago boating conditions, marine alerts, weekend events, news and
          ideas — delivered to your inbox.
        </p>
        {body}
      </div>
    </div>
  );
}
