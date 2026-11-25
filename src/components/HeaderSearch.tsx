"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  SEARCH_TYPE_LABELS,
  searchEntries,
  type SearchEntry,
} from "@/lib/site-search-core";

const MAX_SUGGESTIONS = 8;

/**
 * Header search: a toggle button (desktop + mobile) that opens a panel under
 * the header. The panel is a plain GET form to /search, so it works without
 * JavaScript; the compact JSON index is fetched lazily on first open to power
 * instant suggestions.
 */
export function HeaderSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const loadingRef = useRef(false);
  const listId = useId();

  const suggestions = useMemo(
    () =>
      index && query.trim()
        ? searchEntries(index, query, { limit: MAX_SUGGESTIONS })
        : [],
    [index, query],
  );

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function loadIndex() {
    if (index || loadingRef.current) return;
    loadingRef.current = true;
    fetch("/api/search-index")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("bad"))))
      .then((data: SearchEntry[]) => setIndex(data))
      .catch(() => setLoadFailed(true))
      .finally(() => {
        loadingRef.current = false;
      });
  }

  function toggle() {
    const next = !open;
    setOpen(next);
    if (next) loadIndex();
  }

  function close() {
    setOpen(false);
    setActive(-1);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    const q = query.trim();
    event.preventDefault();
    if (active >= 0 && suggestions[active]) {
      router.push(suggestions[active].h);
    } else {
      router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
    }
    close();
  }

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (suggestions.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    }
  }

  const trimmed = query.trim();

  return (
    <div ref={wrapperRef}>
      <button
        type="button"
        onClick={toggle}
        aria-label="Search the site"
        aria-expanded={open}
        aria-controls={`${listId}-panel`}
        className="p-2 rounded-lg text-lake-blue hover:bg-light-blue"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
          />
        </svg>
      </button>

      {open && (
        <div
          id={`${listId}-panel`}
          className="absolute inset-x-0 top-full z-50 border-b border-sky-blue/20 bg-white shadow-lg lg:inset-x-auto lg:right-8 lg:w-[28rem] lg:rounded-b-2xl lg:border lg:border-t-0"
        >
          <div className="px-4 py-3 sm:px-6 lg:px-4">
            <form action="/search" method="get" role="search" onSubmit={onSubmit}>
              <label htmlFor={`${listId}-input`} className="sr-only">
                Search launches, marinas, preserves, lakes, destinations and
                guides
              </label>
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  id={`${listId}-input`}
                  type="search"
                  name="q"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(-1);
                  }}
                  onFocus={loadIndex}
                  onKeyDown={onInputKeyDown}
                  maxLength={100}
                  autoComplete="off"
                  placeholder="Search launches, marinas, guides…"
                  role="combobox"
                  aria-expanded={suggestions.length > 0}
                  aria-controls={listId}
                  aria-autocomplete="list"
                  aria-activedescendant={
                    active >= 0 ? `${listId}-opt-${active}` : undefined
                  }
                  className="min-w-0 flex-1 rounded-full border border-sky-blue/40 px-4 py-2.5 text-base text-lake-blue placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-blue"
                />
                <button
                  type="submit"
                  className="rounded-full bg-lake-blue px-5 py-2.5 text-sm font-bold text-white hover:bg-lake-blue/90"
                >
                  Search
                </button>
              </div>
            </form>

            <ul
              id={listId}
              role="listbox"
              aria-label="Search suggestions"
              className="mt-2 max-h-[60vh] overflow-y-auto"
            >
              {suggestions.map((entry, i) => (
                <li
                  key={`${entry.t}:${entry.h}`}
                  id={`${listId}-opt-${i}`}
                  role="option"
                  aria-selected={i === active}
                >
                  <Link
                    href={entry.h}
                    onClick={close}
                    className={`flex items-baseline justify-between gap-3 rounded-lg px-3 py-2 hover:bg-light-blue ${
                      i === active ? "bg-light-blue" : ""
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-lake-blue">
                        {entry.n}
                      </span>
                      {entry.s ? (
                        <span className="block truncate text-xs text-gray-500">
                          {entry.s}
                        </span>
                      ) : null}
                    </span>
                    <span className="shrink-0 text-[11px] font-bold uppercase tracking-wide text-coral">
                      {SEARCH_TYPE_LABELS[entry.t].singular}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {trimmed && index && suggestions.length === 0 ? (
              <p className="mt-2 px-3 text-sm text-gray-600">
                No quick matches for “{trimmed}”.
              </p>
            ) : null}
            {loadFailed ? (
              <p className="mt-2 px-3 text-sm text-gray-600">
                Suggestions are unavailable — press Search for full results.
              </p>
            ) : null}
            <div className="mt-2 flex items-center justify-between px-3 text-sm">
              <Link
                href={trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search"}
                onClick={close}
                className="font-semibold text-coral hover:underline"
              >
                {trimmed ? "See all results →" : "Open full search →"}
              </Link>
              <span className="text-xs text-gray-400">Esc to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
