"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "bc-favorites-v1";

type FavoriteKind = "destination" | "lake" | "marina" | "launch";

export interface FavoriteItem {
  kind: FavoriteKind;
  slug: string;
  name: string;
  href: string;
  savedAt: string;
}

function readFavorites(): FavoriteItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as FavoriteItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeFavorites(items: FavoriteItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, 80)));
}

/**
 * Browser-local favorites — no account, no server storage.
 */
export function FavoriteButton({
  kind,
  slug,
  name,
  href,
}: {
  kind: FavoriteKind;
  slug: string;
  name: string;
  href: string;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(readFavorites().some((f) => f.kind === kind && f.slug === slug));
  }, [kind, slug]);

  function toggle() {
    const current = readFavorites();
    const exists = current.some((f) => f.kind === kind && f.slug === slug);
    const next = exists
      ? current.filter((f) => !(f.kind === kind && f.slug === slug))
      : [
          ...current,
          {
            kind,
            slug,
            name,
            href,
            savedAt: new Date().toISOString(),
          },
        ];
    writeFavorites(next);
    setSaved(!exists);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`text-sm font-semibold px-3 py-1.5 rounded-full border transition-colors ${
        saved
          ? "bg-lake-blue text-white border-lake-blue"
          : "bg-white text-lake-blue border-sky-blue/40 hover:bg-light-blue"
      }`}
      aria-pressed={saved}
    >
      {saved ? "Saved locally" : "Save for later"}
    </button>
  );
}

export function FavoritesList() {
  const [items, setItems] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    setItems(readFavorites());
  }, []);

  if (items.length === 0) {
    return (
      <p className="text-sm text-gray-600">
        No local favorites yet. Use “Save for later” on destination, lake,
        marina, or launch pages — stored only in this browser.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={`${item.kind}:${item.slug}`}>
          <a
            href={item.href}
            className="font-semibold text-lake-blue hover:underline"
          >
            {item.name}
          </a>
          <span className="text-xs text-gray-500 ml-2">{item.kind}</span>
        </li>
      ))}
    </ul>
  );
}
