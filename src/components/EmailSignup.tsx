"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { siteImages } from "@/data/images";
import { trackEvent, trackingAttrs } from "@/lib/tracking";

interface EmailSignupProps {
  source?: string;
  variant?: "inline" | "card";
}

type FormStatus = "idle" | "loading" | "success" | "duplicate" | "error";

export function EmailSignup({ source = "homepage", variant = "card" }: EmailSignupProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
        body: JSON.stringify({ email, source }),
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

      // GA4: never send email / PII — only page and placement context
      trackEvent("newsletter_signup", {
        source,
        signup_page: source,
        signup_placement: variant === "inline" ? "inline" : "brief_card",
        already_subscribed: data.alreadySubscribed ? "yes" : "no",
      });

      setStatus(data.alreadySubscribed ? "duplicate" : "success");
      e.currentTarget.reset();
    } catch {
      setErrorMsg("Something went wrong. Try again.");
      setStatus("error");
    }
  }

  if (status === "success" || status === "duplicate") {
    return (
      <div
        className={variant === "card" ? "text-center py-4" : ""}
        {...trackingAttrs.newsletterSignup}
      >
        <p className="text-sun-yellow font-bold text-lg md:text-xl">
          {status === "duplicate"
            ? "You\u2019re already on the list."
            : "You\u2019re on the list. Watch your inbox for the next Chicago Boating Brief."}
        </p>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          className="flex-1 min-h-[48px] px-4 py-3 rounded-full border-0 outline-none text-gray-800 text-base"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          {...trackingAttrs.newsletterSignup}
          className="min-h-[48px] px-6 py-3 bg-sun-yellow text-lake-blue font-bold rounded-full hover:bg-sun-yellow/90 transition-colors whitespace-nowrap disabled:opacity-60 text-base"
        >
          {status === "loading" ? "..." : "Get the Brief"}
        </button>
        {status === "error" && errorMsg ? (
          <p className="text-coral text-sm font-semibold sm:col-span-2 w-full">{errorMsg}</p>
        ) : null}
      </form>
    );
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Your email address"
            className="flex-1 min-h-[48px] px-4 py-3 rounded-full border-0 outline-none text-gray-800 text-base"
            aria-label="Email for the Chicago Boating Brief"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            {...trackingAttrs.newsletterSignup}
            className="min-h-[48px] px-6 py-3 bg-sun-yellow text-lake-blue font-bold rounded-full hover:bg-sun-yellow/90 transition-colors whitespace-nowrap disabled:opacity-60 text-base"
          >
            {status === "loading" ? "..." : "Get the Brief"}
          </button>
        </form>
        {status === "error" && errorMsg ? (
          <p className="text-coral mt-3 text-sm font-semibold">{errorMsg}</p>
        ) : null}
      </div>
    </div>
  );
}
