import { siteConfig } from "@/config/site";
import {
  brandedOgImage,
  ogContentType,
  ogSize,
} from "@/lib/og-image";

export const alt = `${siteConfig.name} — Chicago, Lake Michigan, and nearby waters`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return brandedOgImage({
    title: "Chicago, Lake Michigan & Nearby Waters",
    alt,
  });
}
