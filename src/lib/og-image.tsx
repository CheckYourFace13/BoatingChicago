import { ImageResponse } from "next/og";
import { colors, siteConfig } from "@/config/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

function truncateTitle(title: string, max = 88): string {
  const trimmed = title.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1).trimEnd()}…`;
}

export function brandedOgImage({
  title,
  eyebrow = siteConfig.name,
  footer = siteConfig.tagline,
}: {
  title: string;
  eyebrow?: string;
  footer?: string;
  alt?: string;
}) {
  const displayTitle = truncateTitle(title);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: colors.lakeBlue,
          color: colors.white,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 18,
            background: colors.coral,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px 56px 88px",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: colors.skyBlue,
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                width: 72,
                height: 6,
                background: colors.sunYellow,
                borderRadius: 4,
              }}
            />
            <div
              style={{
                fontSize: displayTitle.length > 52 ? 54 : 64,
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: -1,
                maxWidth: 980,
              }}
            >
              {displayTitle}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              fontSize: 24,
              color: colors.lightBlue,
            }}
          >
            <span>{footer}</span>
            <span style={{ color: colors.sunYellow, fontWeight: 700 }}>
              {siteConfig.domain}
            </span>
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
