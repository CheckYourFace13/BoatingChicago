"use client";

import Link from "next/link";
import { useState } from "react";
import { allowsAdvertising, allowsAnalytics } from "@/lib/consent";
import { useConsent } from "./ConsentProvider";

export function CookieConsent() {
  const { state, settingsOpen, setConsent, closeSettings } = useConsent();
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const [customize, setCustomize] = useState(false);

  const showBanner = !state.decided || settingsOpen;
  if (!showBanner) return null;

  const applyCustom = () => {
    setConsent({
      analytics: customize ? analytics : allowsAnalytics(state),
      advertising: customize ? advertising : allowsAdvertising(state),
    });
    setCustomize(false);
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-5"
      role="dialog"
      aria-modal="false"
      aria-labelledby="bc-consent-title"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-sky-blue/30 bg-white p-4 sm:p-5 shadow-lg">
        <h2
          id="bc-consent-title"
          className="text-base font-extrabold text-lake-blue mb-2"
        >
          Optional cookies
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          Weather, guides, bookings, contact, and the newsletter work without
          extra cookies. Google Analytics and labeled shopping-partner ads
          (including Impact impression tags) load only if you allow them. This
          site does not use a Google-certified CMP.{" "}
          <Link href="/privacy" className="font-semibold text-sky-blue hover:underline">
            Privacy policy
          </Link>
          .
        </p>

        {customize || settingsOpen ? (
          <fieldset className="mb-4 space-y-2 text-sm text-gray-800">
            <legend className="sr-only">Optional cookie categories</legend>
            <label className="flex items-start gap-2 min-h-[44px]">
              <input
                type="checkbox"
                className="mt-1"
                checked={customize ? analytics : state.analytics}
                onChange={(e) => {
                  setCustomize(true);
                  setAnalytics(e.target.checked);
                }}
              />
              <span>
                <span className="font-semibold">Analytics</span> — Google Analytics
                page views and click measurement. No advertising cookies from this
                choice alone.
              </span>
            </label>
            <label className="flex items-start gap-2 min-h-[44px]">
              <input
                type="checkbox"
                className="mt-1"
                checked={customize ? advertising : state.advertising}
                onChange={(e) => {
                  setCustomize(true);
                  setAdvertising(e.target.checked);
                }}
              />
              <span>
                <span className="font-semibold">Advertising</span> — shopping-partner
                creatives and Impact impression pixels. AdSense display units stay
                off unless separately enabled.
              </span>
            </label>
          </fieldset>
        ) : null}

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-lake-blue px-4 text-sm font-bold text-white hover:bg-lake-blue/90"
            onClick={() => setConsent({ analytics: true, advertising: true })}
          >
            Accept optional cookies
          </button>
          <button
            type="button"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-lake-blue/30 px-4 text-sm font-bold text-lake-blue hover:bg-light-blue/50"
            onClick={() => setConsent({ analytics: false, advertising: false })}
          >
            Reject optional cookies
          </button>
          {customize || settingsOpen ? (
            <button
              type="button"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full px-4 text-sm font-bold text-coral hover:underline"
              onClick={applyCustom}
            >
              Save choices
            </button>
          ) : (
            <button
              type="button"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full px-4 text-sm font-bold text-coral hover:underline"
              onClick={() => {
                setCustomize(true);
                setAnalytics(state.analytics);
                setAdvertising(state.advertising);
              }}
            >
              Customize
            </button>
          )}
          {settingsOpen ? (
            <button
              type="button"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full px-4 text-sm font-semibold text-gray-600 hover:underline"
              onClick={closeSettings}
            >
              Close
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  const { openSettings } = useConsent();
  return (
    <button
      type="button"
      onClick={openSettings}
      className={className}
    >
      Cookie settings
    </button>
  );
}
