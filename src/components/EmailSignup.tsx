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

export function EmailSignup({ source = "homepage", variant = "card" }: EmailSignupProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      if (!res.ok) throw new Error("Failed to subscribe");
      trackEvent("newsletter_signup", { source });
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={variant === "card" ? "text-center py-4" : ""}
        {...trackingAttrs.newsletterSignup}
      >
        <p className="text-sun-yellow font-bold text-lg">You&apos;re on the list</p>
        <p className="text-white/80 text-sm mt-1">
          We&apos;ll email the Chicago Boating Brief when it launches — no messages yet.
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
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-full border-0 outline-none text-gray-800"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          {...trackingAttrs.newsletterSignup}
          className="px-6 py-3 bg-sun-yellow text-lake-blue font-bold rounded-full hover:bg-sun-yellow/90 transition-colors whitespace-nowrap disabled:opacity-60"
        >
          {status === "loading" ? "..." : "Join Brief"}
        </button>
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
          Free waitlist · No email yet
        </p>
        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
          Chicago Boating Brief
        </h3>
        <p className="text-white/90 mb-4 max-w-xl mx-auto leading-relaxed">
          Be first in line for a practical brief covering weekend lake
          conditions, marine alerts, boating weather, events, news, and
          southern Lake Michigan destination ideas — built for Chicago boaters.
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
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-full border-0 outline-none text-gray-800"
            aria-label="Email for Chicago Boating Brief waitlist"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            {...trackingAttrs.newsletterSignup}
            className="px-6 py-3 bg-sun-yellow text-lake-blue font-bold rounded-full hover:bg-sun-yellow/90 transition-colors whitespace-nowrap disabled:opacity-60"
          >
            {status === "loading" ? "..." : "Join the waitlist"}
          </button>
        </form>
        {status === "error" && (
          <p className="text-coral mt-3 text-sm font-semibold">Something went wrong. Try again.</p>
        )}
      </div>
    </div>
  );
}
