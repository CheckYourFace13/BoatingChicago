"use client";

import { useState, type FormEvent } from "react";

const SUBJECTS = [
  "General Question",
  "Business / Partnership",
  "Advertising / Sponsorship",
  "Website Correction",
  "Other",
] as const;

export function ContactForm({
  defaultSubject,
}: {
  defaultSubject?: (typeof SUBJECTS)[number];
} = {}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots fill this; humans never see it
    if (String(data.get("company_website") || "").trim()) {
      setStatus("success");
      form.reset();
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(json.error || "Failed to send");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-sky-blue/25 bg-light-blue/40 p-6">
        <p className="font-extrabold text-lake-blue text-lg mb-1">Message sent</p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Thanks for reaching out. We usually respond within 1–2 business days.
        </p>
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
          className="w-full px-4 py-3 rounded-xl border border-sky-blue/30 outline-none focus:border-sky-blue"
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
          className="w-full px-4 py-3 rounded-xl border border-sky-blue/30 outline-none focus:border-sky-blue"
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
          className="w-full px-4 py-3 rounded-xl border border-sky-blue/30 outline-none focus:border-sky-blue bg-white"
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
          className="w-full px-4 py-3 rounded-xl border border-sky-blue/30 outline-none focus:border-sky-blue resize-y"
        />
      </div>

      <p className="text-sm text-gray-600">
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
        <p className="text-sm font-semibold text-coral">{errorMsg}</p>
      ) : null}
    </form>
  );
}
