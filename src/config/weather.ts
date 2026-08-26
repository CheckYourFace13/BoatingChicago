/**
 * Chicago / Lake Michigan weather configuration (free NOAA/NWS sources only).
 */

export const WEATHER_USER_AGENT =
  "BoatingChicago.com weather (chris@boatingchicago.com)";

/** Downtown Chicago — used for NWS grid + sunrise */
export const CHICAGO_LAT = 41.8781;
export const CHICAGO_LON = -87.6298;

/** Cached NWS grid for Chicago (LOT office). Refreshed via /points if needed. */
export const NWS_GRID = {
  office: "LOT",
  gridX: 76,
  gridY: 73,
} as const;

/** Preferred ASOS station for current conditions (Midway). */
export const NWS_OBS_STATION = "KMDW";

/**
 * Nearshore Lake Michigan IL marine zones + Cook County.
 * Used for active alerts relevant to boaters.
 */
export const NWS_ALERT_ZONES = [
  "LMZ740",
  "LMZ741",
  "LMZ742",
  "LMZ743",
  "LMZ744",
  "LMZ745",
  "ILZ014",
] as const;

/** NDBC buoy south of Chicago — wave height when available. */
export const NDBC_BUOY_ID = "45174";

/** Revalidate weather payloads ~15 minutes. */
export const WEATHER_REVALIDATE_SECONDS = 900;

export const WEATHER_FETCH_TIMEOUT_MS = 8000;

/** Informational boating rating thresholds (mph / feet). Not an official NWS rating. */
export const BOATING_RATING_THRESHOLDS = {
  /** Sustained wind (mph) */
  windCautionMph: 15,
  windPoorMph: 25,
  /** Gusts (mph) */
  gustCautionMph: 20,
  gustPoorMph: 30,
  /** Significant wave height (ft) */
  waveCautionFt: 2,
  wavePoorFt: 4,
  /** Precip probability % that contributes to Caution when thunderstorm language present */
  precipCautionPct: 40,
} as const;
