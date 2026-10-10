/**
 * SendFable hosted-form embed helpers.
 * Official script: https://sendfable.com/embed/form.js
 * Markup: <div data-sendfable-form="{slug}"></div>
 *
 * The script mounts on DOMContentLoaded only and exposes no remount API.
 * We load a single script node, then re-execute that cached script when a new
 * host appears after client-side navigation (after clearing data-sendfable-ready).
 */

export const SENDFABLE_FORM_SLUG = "boatingchicago-newsletter";
export const SENDFABLE_EMBED_SCRIPT =
  "https://sendfable.com/embed/form.js";

const SCRIPT_ATTR = "data-sendfable-embed";

let loadPromise: Promise<void> | null = null;

function existingScript(): HTMLScriptElement | null {
  return document.querySelector<HTMLScriptElement>(`script[${SCRIPT_ATTR}]`);
}

function injectScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SENDFABLE_EMBED_SCRIPT;
    script.async = true;
    script.setAttribute(SCRIPT_ATTR, "1");
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("SendFable embed script failed to load"));
    document.body.appendChild(script);
  });
}

/** Ensure the official embed script is present. */
export function loadSendfableEmbedScript(): Promise<void> {
  if (typeof document === "undefined") {
    return Promise.reject(new Error("no document"));
  }
  if (loadPromise) return loadPromise;

  const existing = existingScript();
  if (existing) {
    loadPromise = Promise.resolve();
    return loadPromise;
  }

  loadPromise = injectScript().catch((err) => {
    loadPromise = null;
    throw err;
  });
  return loadPromise;
}

/**
 * Mount any hosts that are not yet marked ready.
 * Replaces the single loader script node so the official IIFE runs again.
 */
export async function remountSendfableForms(): Promise<void> {
  await loadSendfableEmbedScript();

  const pending = document.querySelectorAll(
    "[data-sendfable-form]:not([data-sendfable-ready])"
  );
  if (pending.length === 0) return;

  existingScript()?.remove();
  loadPromise = null;
  await injectScript().then(() => {
    loadPromise = Promise.resolve();
  });
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
    text.includes("check your email")
  );
}

export async function waitForHostForm(
  el: HTMLElement,
  timeoutMs = 12000
): Promise<"ready" | "unavailable" | "timeout"> {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (hostHasForm(el)) return "ready";
    if (hostShowsUnavailable(el)) return "unavailable";
    await new Promise((r) => setTimeout(r, 150));
  }
  return hostHasForm(el) ? "ready" : "timeout";
}
