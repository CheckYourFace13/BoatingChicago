import {
  brandedOgImage,
  ogContentType,
  ogSize,
} from "@/lib/og-image";

export const alt = "Chicago-area boating destinations — Boating Chicago";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return brandedOgImage({
    title: "Boating Destinations Near Chicago",
    alt,
  });
}
