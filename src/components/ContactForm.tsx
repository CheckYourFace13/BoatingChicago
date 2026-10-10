"use client";

import { useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/tracking";

const SUBJECTS = [
  "General Question",
  "Business / Partnership",
  "Advertising / Sponsorship",
  "Website Correction",
  "Other",
] as const;

type NewsletterApi = {
  optedIn: boolean;
  enrolled?: boolean;
  alreadySubscribed?: boolean;
  syncStatus?: string;
  error?: string;
};

export function ContactForm({
  defaultSubject,
  placement = "contact",
}: {
  defaultSubject?: (typeof SUBJECTS)[number];
  placement?: string;
} = {}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [delivered, setDelivered] = useState<boolean | null>(null);
  const [newsletter, setNewsletter] = useState<NewsletterApi | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    setDelivered(null);
    setNewsletter(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots fill this; humans never see it
    if (String(data.get("company_website") || "").trim()) {
      setStatus("success");
      setDelivered(true);
      form.reset();
      return;
    }

    const subject = String(data.get("subject") || "");
    const briefOptIn = data.get("briefOptIn") === "on";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          briefOptIn,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        delivered?: boolean;
        newsletter?: NewsletterApi;
      };
      if (!res.ok) {
        throw new Error(json.error || "Failed to send");
      }
      if (subject === "Advertising / Sponsorship" || placement === "advertise") {
        trackEvent("advertise_interest", { page: placement, subject });
      }
      if (briefOptIn) {
        trackEvent("newsletter_signup", {
          source: "contact-form",
          signup_page: placement,
          signup_placement: "contact_opt_in",
          provider: "contact_api",
          already_subscribed: json.newsletter?.alreadySubscribed ? "yes" : "no",
        });
      }
      setDelivered(Boolean(json.delivered));
      setNewsletter(json.newsletter || { optedIn: briefOptIn });
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    const briefNote = !newsletter?.optedIn
      ? null
      : newsletter.enrolled && newsletter.syncStatus === "synced"
        ? newsletter.alreadySubscribed
          ? "You’re already on the Chicago Boating Brief list — we did not create a duplicate signup."
          : "You’re also signed up for the Chicago Boating Brief."
        : newsletter.enrolled
          ? "Your Brief signup was saved and will finish syncing shortly."
          : "Your message was received, but Brief signup could not be completed right now.";

    return (
      <div className="rounded-2xl border border-sky-blue/25 bg-light-blue/40 p-6 space-y-2">
        <p className="font-extrabold text-lake-blue text-lg mb-1">Message sent</p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Thanks for reaching out. We usually respond within 1–2 business days.
        </p>
        {delivered === false ? (
          <p className="text-sm font-semibold text-coral" role="status">
            Your message was accepted on the site, but owner-inbox delivery could
            not be confirmed. Please try again or email us directly if urgent.
          </p>
        ) : null}
        {briefNote ? (
          <p className="text-sm text-gray-700" role="status">
            {briefNote}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-4" noValidate>
      {/* Honeypot field — hidden from users */}
      <div className="absolute -left-[9999px] opacity-0 h-0 overflow-hidden" aria-hidden>
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>

      <div>
        <label htmlFor="contact-name" className="block text-sm font-bold text-lake-blue mb-1">
          Name *
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          maxLength={120}
          autoComplete="name"
          className="bc-field"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-bold text-lake-blue mb-1">
          Email *
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          className="bc-field"
        />
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-bold text-lake-blue mb-1">
          Subject *
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          defaultValue={defaultSubject || ""}
          className="bc-field"
        >
          {!defaultSubject ? (
            <option value="" disabled>
              Select a subject
            </option>
          ) : null}
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-bold text-lake-blue mb-1">
          Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          maxLength={4000}
          className="bc-field"
        />
      </div>

      <label
        htmlFor="contact-brief-opt-in"
        className="flex gap-3 items-start rounded-xl border border-sky-blue/30 bg-white p-3 cursor-pointer"
      >
        <input
          id="contact-brief-opt-in"
          name="briefOptIn"
          type="checkbox"
          value="on"
          className="bc-check mt-0.5"
        />
        <span className="text-sm text-gray-800 leading-snug">
          <span className="font-bold text-lake-blue">
            Send me the Chicago Boating Brief.
          </span>{" "}
          Optional weekly email. Leave unchecked to send your message only —
          we will not enroll you.
        </span>
      </label>

      <p className="text-sm text-gray-700">
        We usually respond within 1–2 business days.
      </p>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 bg-coral text-white font-bold rounded-full hover:bg-coral/90 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>

      {status === "error" ? (
        <p className="text-sm font-semibold text-coral" role="alert">
          {errorMsg}
        </p>
      ) : null}
    </form>
  );
}
