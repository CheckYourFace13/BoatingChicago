import {
  brandedOgImage,
  ogContentType,
  ogSize,
} from "@/lib/og-image";

export const alt = "Chicago boating events and season dates — Boating Chicago";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return brandedOgImage({
    title: "Chicago Boating Events & Season Dates",
    alt,
  });
}
