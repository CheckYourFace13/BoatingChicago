import { siteConfig } from "@/config/site";
import {
  brandedOgImage,
  ogContentType,
  ogSize,
} from "@/lib/og-image";

export const alt = `${siteConfig.name} — Chicago and southern Lake Michigan boating guide`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return brandedOgImage({
    title: "Chicago & Southern Lake Michigan Boating Guide",
    alt,
  });
}
