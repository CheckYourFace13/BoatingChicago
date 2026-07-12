"use client";

import { useState, type FormEvent } from "react";
import { FormDisclaimer } from "./FormDisclaimer";
import { trackEvent, trackingAttrs } from "@/lib/tracking";

interface FindBoatFormProps {
  source?: string;
  compact?: boolean;
}

export function FindBoatForm({ source = "homepage", compact = false }: FindBoatFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Something went wrong");
      }

      trackEvent("lead_form_submit", { source });
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to submit");
    }
  }

  if (status === "success") {
    return (
      <div
        className="bg-white rounded-3xl p-8 md:p-10 text-center shadow-xl border border-sky-blue/20"
        {...trackingAttrs.leadFormSubmit}
      >
        <div className="text-sm font-bold tracking-widest uppercase text-sky-blue mb-3">Request received</div>
        <h3 className="text-2xl font-extrabold text-lake-blue mb-2">You&apos;re All Set!</h3>
        <p className="text-gray-600 mb-6">
          We received your request and will match you with the best Chicago boating options. Expect to hear back within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sky-blue font-bold hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-blue focus:ring-2 focus:ring-sky-blue/20 outline-none transition-all text-gray-800";
  const labelClass = "block text-sm font-semibold text-lake-blue mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-3xl shadow-xl border border-sky-blue/20 ${compact ? "p-6" : "p-8 md:p-10"}`}
    >
      {!compact && (
        <div className="mb-6">
          <h3 className="text-2xl font-extrabold text-lake-blue mb-1">Find a Boat</h3>
          <p className="text-gray-600">Tell us what you need — we&apos;ll match you with the best options.</p>
        </div>
      )}

      <div className={`grid grid-cols-1 ${compact ? "gap-4" : "md:grid-cols-2 gap-5"}`}>
        <div>
          <label htmlFor="name" className={labelClass}>Name *</label>
          <input id="name" name="name" type="text" required className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email *</label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="you@email.com" />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone *</label>
          <input id="phone" name="phone" type="tel" required className={inputClass} placeholder="(312) 555-0100" />
        </div>
        <div>
          <label htmlFor="date" className={labelClass}>Preferred Date *</label>
          <input id="date" name="date" type="date" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="groupSize" className={labelClass}>Group Size *</label>
          <select id="groupSize" name="groupSize" required className={inputClass}>
            <option value="">Select...</option>
            <option value="1-6">1–6 people</option>
            <option value="7-15">7–15 people</option>
            <option value="16-30">16–30 people</option>
            <option value="31-50">31–50 people</option>
            <option value="50+">50+ people</option>
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelClass}>Budget Range</label>
          <select id="budget" name="budget" className={inputClass}>
            <option value="">Select...</option>
            <option value="under-500">Under $500</option>
            <option value="500-1000">$500 – $1,000</option>
            <option value="1000-2500">$1,000 – $2,500</option>
            <option value="2500-5000">$2,500 – $5,000</option>
            <option value="5000+">$5,000+</option>
          </select>
        </div>
        <div>
          <label htmlFor="eventType" className={labelClass}>Type of Event *</label>
          <select id="eventType" name="eventType" required className={inputClass}>
            <option value="">Select...</option>
            <option value="casual-cruise">Casual cruise</option>
            <option value="party">Party / celebration</option>
            <option value="bachelorette">Bachelorette party</option>
            <option value="birthday">Birthday</option>
            <option value="corporate">Corporate event</option>
            <option value="fireworks">Fireworks viewing</option>
            <option value="air-show">Air & Water Show</option>
            <option value="fishing">Fishing trip</option>
            <option value="playpen">Playpen day</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="preferredArea" className={labelClass}>Preferred Area / Harbor</label>
          <select id="preferredArea" name="preferredArea" className={inputClass}>
            <option value="">No preference</option>
            <option value="monroe">Monroe Harbor</option>
            <option value="burnham">Burnham Harbor</option>
            <option value="31st">31st Street Harbor</option>
            <option value="montrose">Montrose Harbor</option>
            <option value="dusable">DuSable Harbor</option>
            <option value="playpen">The Playpen</option>
            <option value="river">Chicago River</option>
          </select>
        </div>
        <div>
          <label htmlFor="needCaptain" className={labelClass}>Need a Captain?</label>
          <select id="needCaptain" name="needCaptain" className={inputClass}>
            <option value="yes">Yes, captain required</option>
            <option value="no">No, I have a license</option>
            <option value="unsure">Not sure</option>
          </select>
        </div>
        <div className={compact ? "" : "md:col-span-2"}>
          <label htmlFor="notes" className={labelClass}>Additional Notes</label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className={inputClass}
            placeholder="Anything else we should know?"
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-coral text-sm font-semibold">{errorMsg}</p>
      )}

      <FormDisclaimer />

      <button
        type="submit"
        disabled={status === "loading"}
        {...trackingAttrs.leadFormSubmit}
        className="mt-4 w-full py-4 bg-coral text-white font-bold text-lg rounded-full hover:bg-coral/90 transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Submitting..." : "Find My Boat →"}
      </button>
    </form>
  );
}
