/**
 * Weather location anchors for destination pages.
 * Coordinates target harbor / lakefront centers; NWS stations are nearest ASOS when known.
 */

export interface WeatherLocation {
  id: string;
  label: string;
  lat: number;
  lon: number;
  /** Nearest NWS/ASOS observation station ICAO id, if known */
  nwsStation?: string;
}

/** Fallback location for /weather when no (or an unknown) location is requested. */
export const DEFAULT_WEATHER_LOCATION_ID = "chicago";

export const weatherLocations: WeatherLocation[] = [
  {
    id: "chicago",
    label: "Chicago Lakefront",
    lat: 41.882,
    lon: -87.615,
    nwsStation: "KMDW",
  },
  {
    id: "waukegan",
    label: "Waukegan Harbor",
    lat: 42.361,
    lon: -87.813,
    nwsStation: "KUGN",
  },
  {
    id: "winthrop-harbor",
    label: "Winthrop Harbor / North Point Marina",
    lat: 42.482,
    lon: -87.806,
    nwsStation: "KUGN",
  },
  {
    id: "lake-geneva",
    label: "Geneva Lake (Lake Geneva, WI)",
    lat: 42.592,
    lon: -88.433,
    nwsStation: "KBUU",
  },
  {
    id: "chain-o-lakes",
    label: "Chain O' Lakes",
    lat: 42.398,
    lon: -88.183,
    nwsStation: "KUGN",
  },
  {
    id: "kenosha",
    label: "Kenosha Harbor",
    lat: 42.584,
    lon: -87.813,
    nwsStation: "KENW",
  },
  {
    id: "racine",
    label: "Racine Harbor",
    lat: 42.727,
    lon: -87.777,
    nwsStation: "KRAC",
  },
  {
    id: "milwaukee",
    label: "Milwaukee Lakefront",
    lat: 43.039,
    lon: -87.895,
    nwsStation: "KMKE",
  },
  {
    id: "michigan-city",
    label: "Michigan City Harbor",
    lat: 41.722,
    lon: -86.906,
    nwsStation: "KMGC",
  },
  {
    id: "new-buffalo",
    label: "New Buffalo Harbor",
    lat: 41.794,
    lon: -86.744,
    nwsStation: "KMGC",
  },
];

export function getWeatherLocationById(
  id: string,
): WeatherLocation | undefined {
  return weatherLocations.find((loc) => loc.id === id);
}
