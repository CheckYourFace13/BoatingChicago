import {
  brandedOgImage,
  ogContentType,
  ogSize,
} from "@/lib/og-image";

export const alt = "Chicago and southern Lake Michigan marinas — Boating Chicago";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return brandedOgImage({
    title: "Chicago Marinas & Harbors",
    alt,
  });
}
