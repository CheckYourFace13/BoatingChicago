"use client";

import { useState, type FormEvent } from "react";
import { trackEvent, trackingAttrs } from "@/lib/tracking";

interface EmailSignupProps {
  source?: string;
  variant?: "inline" | "card";
}

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
        <p className="text-sun-yellow font-bold text-lg">You&apos;re in! 🎉</p>
        <p className="text-white/80 text-sm mt-1">Chicago boating deals heading your way.</p>
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
          {status === "loading" ? "..." : "Get Deals"}
        </button>
      </form>
    );
  }

  return (
    <div className="bg-gradient-to-r from-lake-blue to-sky-blue rounded-3xl p-8 md:p-10 text-center">
      <div className="text-4xl mb-3">📬</div>
      <h3 className="text-2xl font-extrabold text-white mb-2">Get Chicago Boating Deals</h3>
      <p className="text-white/85 mb-6 max-w-md mx-auto">
        Seasonal discounts, last-minute availability, and insider tips — straight to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
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
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-coral mt-3 text-sm font-semibold">Something went wrong. Try again.</p>
      )}
    </div>
  );
}
