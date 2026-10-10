/**
 * SendFable hosted-form embed helpers.
 * Official script: https://sendfable.com/embed/form.js
 * Markup: <div data-sendfable-form="{slug}"></div>
 *
 * The script mounts on DOMContentLoaded only and exposes no remount API.
 * We load it once, then re-execute the same cached script when a new host
 * appears after client-side navigation (clears data-sendfable-ready first).
 */

export const SENDFABLE_FORM_SLUG = "boatingchicago-newsletter";
export const SENDFABLE_EMBED_SCRIPT =
  "https://sendfable.com/embed/form.js";

const SCRIPT_ATTR = "data-sendfable-embed";

let loadPromise: Promise<void> | null = null;

function existingScript(): HTMLScriptElement | null {
  return document.querySelector<HTMLScriptElement>(`script[${SCRIPT_ATTR}]`);
}

/** Ensure the official embed script is present (first load only creates it). */
export function loadSendfableEmbedScript(): Promise<void> {
  if (typeof document === "undefined") {
    return Promise.reject(new Error("no document"));
  }
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const existing = existingScript();
    if (existing) {
      // Already injected — resolve on next tick so callers can remount.
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = SENDFABLE_EMBED_SCRIPT;
    script.async = true;
    script.setAttribute(SCRIPT_ATTR, "1");
    script.onload = () => resolve();
    script.onerror = () => {
      loadPromise = null;
      reject(new Error("SendFable embed script failed to load"));
    };
    document.body.appendChild(script);
  });

  return loadPromise;
}

/**
 * Remount forms that are not yet marked ready.
 * Re-appends a fresh script node so the official IIFE runs again
 * (dynamically inserted scripts execute even when cached).
 * Keeps a single logical loader: previous loader node is replaced, not stacked.
 */
export async function remountSendfableForms(): Promise<void> {
  await loadSendfableEmbedScript();

  const pending = document.querySelectorAll(
    "[data-sendfable-form]:not([data-sendfable-ready])"
  );
  if (pending.length === 0) return;

  const prev = existingScript();
  prev?.remove();
  loadPromise = null;
  await loadSendfableEmbedScript();
}

export function hostHasForm(el: HTMLElement): boolean {
  return Boolean(el.querySelector("form.sendfable-form"));
}

export function hostShowsUnavailable(el: HTMLElement): boolean {
  const text = (el.textContent || "").toLowerCase();
  return (
    text.includes("unavailable") ||
    text.includes("not accepting submissions")
  );
}

export function hostShowsSuccess(el: HTMLElement): boolean {
  const text = (el.textContent || "").toLowerCase();
  return (
    text.includes("thanks for joining") ||
    text.includes("you're subscribed") ||
    text.includes("you’re subscribed") ||
    text.includes("check your email") ||
    text.includes("already")
  );
}
