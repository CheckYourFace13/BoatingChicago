"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { siteImages } from "@/data/images";
import { trackEvent, trackingAttrs } from "@/lib/tracking";

interface EmailSignupProps {
  source?: string;
  variant?: "inline" | "card";
}

const BRIEF_TOPICS = [
  "Weekend lake conditions",
  "Marine alerts",
  "Boating weather",
  "Events on the water",
  "Chicago boating news",
  "Destination ideas",
] as const;

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
        <p className="text-sun-yellow font-bold text-lg">
          {status === "duplicate"
            ? "You\u2019re already on the list"
            : "You\u2019re on the list"}
        </p>
        <p className="text-white/80 text-sm mt-1">
          We&apos;ll email the Chicago Boating Brief when an issue is ready — no
          fixed schedule promised yet.
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
          placeholder="Enter your email"
          className="flex-1 min-h-[48px] px-4 py-3 rounded-full border-0 outline-none text-gray-800"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          {...trackingAttrs.newsletterSignup}
          className="min-h-[48px] px-6 py-3 bg-sun-yellow text-lake-blue font-bold rounded-full hover:bg-sun-yellow/90 transition-colors whitespace-nowrap disabled:opacity-60"
        >
          {status === "loading" ? "..." : "Join Brief"}
        </button>
        {status === "error" && errorMsg ? (
          <p className="text-coral text-sm font-semibold sm:col-span-2 w-full">{errorMsg}</p>
        ) : null}
      </form>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl p-8 md:p-10 text-center">
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
        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
          Weekend conditions, alerts, and destination ideas
        </h3>
        <p className="text-white/90 mb-4 max-w-xl mx-auto leading-relaxed">
          Weekend lake conditions, marine alerts, events, boating news, and
          destination ideas. Join free. We email when an issue is ready — we
          do not promise a fixed schedule yet.
        </p>
        <ul className="flex flex-wrap justify-center gap-2 mb-6 max-w-xl mx-auto">
          {BRIEF_TOPICS.map((topic) => (
            <li
              key={topic}
              className="px-3 py-1.5 rounded-full bg-white/15 text-white text-xs font-semibold"
            >
              {topic}
            </li>
          ))}
        </ul>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Enter your email"
            className="flex-1 min-h-[48px] px-4 py-3 rounded-full border-0 outline-none text-gray-800"
            aria-label="Email for the Chicago Boating Brief"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            {...trackingAttrs.newsletterSignup}
            className="min-h-[48px] px-6 py-3 bg-sun-yellow text-lake-blue font-bold rounded-full hover:bg-sun-yellow/90 transition-colors whitespace-nowrap disabled:opacity-60"
          >
            {status === "loading" ? "..." : "Join free"}
          </button>
        </form>
        {status === "error" && errorMsg ? (
          <p className="text-coral mt-3 text-sm font-semibold">{errorMsg}</p>
        ) : null}
      </div>
    </div>
  );
}
