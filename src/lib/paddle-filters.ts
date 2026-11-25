import type { PreserveWaterAccess } from "@/types/geo";

export type PaddleKindFilter = "all" | "rentals" | "carry-in" | "trailered" | "pedal";
export type PaddleCountyFilter = "all" | string;

export const PADDLE_KIND_FILTERS: { id: PaddleKindFilter; label: string }[] = [
  { id: "all", label: "All sites" },
  { id: "rentals", label: "Published rentals" },
  { id: "carry-in", label: "Carry-in / cartop" },
  { id: "trailered", label: "Trailered launch" },
  { id: "pedal", label: "Pedal boats listed" },
];

export function parsePaddleKind(raw: string | undefined): PaddleKindFilter {
  return PADDLE_KIND_FILTERS.some((f) => f.id === raw)
    ? (raw as PaddleKindFilter)
    : "all";
}

export function matchesPaddleKind(
  site: PreserveWaterAccess,
  kind: PaddleKindFilter,
): boolean {
  if (kind === "all") return true;
  if (kind === "rentals") return site.hasRentals;
  if (kind === "carry-in") return site.accessKinds.includes("carry-in");
  if (kind === "trailered") return site.accessKinds.includes("trailered-launch");
  if (kind === "pedal") return site.allowedCraft.includes("paddle-boat");
  return true;
}

export function paddleHref(kind: PaddleKindFilter, county: string): string {
  const params = new URLSearchParams();
  if (kind !== "all") params.set("kind", kind);
  if (county !== "all") params.set("county", county);
  const q = params.toString();
  return q ? `/kayak-canoe-sup?${q}` : "/kayak-canoe-sup";
}
