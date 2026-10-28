import {
  brandedOgImage,
  ogContentType,
  ogSize,
} from "@/lib/og-image";

export const alt = "Chicago boat storage and haul-out directory — Boating Chicago";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return brandedOgImage({
    title: "Chicago Boat Storage & Haul-Out",
    alt,
  });
}
