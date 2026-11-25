/**
 * Weather location anchors for destination pages.
 * Coordinates target harbor / lakefront centers.
 * Marine zones are NWS nearshore UGCs from weather.gov/marine/greatlakestext.
 * Buoy IDs are NOAA NDBC stations chosen for regional relevance — never invent readings.
 */

export type MarineForecastOffice = "LOT" | "MKX" | "GRB" | "GRR" | "APX" | "IWX";

export interface NearshoreZoneRef {
  /** UGC e.g. LMZ741 */
  id: string;
  /** Official nearshore zone name (abbreviated for UI) */
  name: string;
}

export interface WeatherLocation {
  id: string;
  label: string;
  lat: number;
  lon: number;
  /** Nearest NWS/ASOS observation station ICAO id, if known */
  nwsStation?: string;
  /**
   * Active-alert zones for this harbor (nearshore LMZ + optional land zones).
   * When set, alerts use the zone query instead of a bare point query.
   */
  alertZones?: string[];
  /** Primary nearshore marine zone for labels and forecast links */
  nearshoreZone?: NearshoreZoneRef;
  /** WFO that issues the Coastal Waters Forecast (CWF) for this shore */
  marineOffice?: MarineForecastOffice;
  /** Regional NDBC buoy — omit for inland lakes */
  ndbcBuoyId?: string;
  /** Short provenance note for which waters the buoy represents */
  ndbcBuoyLabel?: string;
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
    alertZones: [
      "LMZ740",
      "LMZ741",
      "LMZ742",
      "LMZ743",
      "LMZ744",
      "LMZ745",
      "ILZ014",
    ],
    nearshoreZone: {
      id: "LMZ741",
      name: "Wilmette Harbor to Northerly Island, IL",
    },
    marineOffice: "LOT",
    ndbcBuoyId: "45174",
    ndbcBuoyLabel: "Chicago nearshore Lake Michigan (NDBC 45174)",
  },
  {
    id: "waukegan",
    label: "Waukegan Harbor",
    lat: 42.361,
    lon: -87.813,
    nwsStation: "KUGN",
    alertZones: ["LMZ740", "LMZ646"],
    nearshoreZone: {
      id: "LMZ740",
      name: "Winthrop Harbor to Wilmette Harbor, IL",
    },
    marineOffice: "LOT",
    ndbcBuoyId: "45174",
    ndbcBuoyLabel: "Chicago nearshore Lake Michigan (NDBC 45174)",
  },
  {
    id: "winthrop-harbor",
    label: "Winthrop Harbor / North Point Marina",
    lat: 42.482,
    lon: -87.806,
    nwsStation: "KUGN",
    alertZones: ["LMZ740", "LMZ646"],
    nearshoreZone: {
      id: "LMZ740",
      name: "Winthrop Harbor to Wilmette Harbor, IL",
    },
    marineOffice: "LOT",
    ndbcBuoyId: "45174",
    ndbcBuoyLabel: "Chicago nearshore Lake Michigan (NDBC 45174)",
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
    alertZones: ["LMZ646"],
    nearshoreZone: {
      id: "LMZ646",
      name: "Wind Point, WI to Winthrop Harbor, IL",
    },
    marineOffice: "MKX",
    ndbcBuoyId: "45007",
    ndbcBuoyLabel: "Southern Lake Michigan mid-lake (NDBC 45007, ESE of Milwaukee)",
  },
  {
    id: "racine",
    label: "Racine Harbor",
    lat: 42.727,
    lon: -87.777,
    nwsStation: "KRAC",
    alertZones: ["LMZ645", "LMZ646"],
    nearshoreZone: {
      id: "LMZ645",
      name: "North Point Light to Wind Point, WI",
    },
    marineOffice: "MKX",
    ndbcBuoyId: "45007",
    ndbcBuoyLabel: "Southern Lake Michigan mid-lake (NDBC 45007, ESE of Milwaukee)",
  },
  {
    id: "milwaukee",
    label: "Milwaukee Lakefront",
    lat: 43.039,
    lon: -87.895,
    nwsStation: "KMKE",
    alertZones: ["LMZ644", "LMZ645"],
    nearshoreZone: {
      id: "LMZ644",
      name: "Port Washington to North Point Light, WI",
    },
    marineOffice: "MKX",
    ndbcBuoyId: "45007",
    ndbcBuoyLabel: "Southern Lake Michigan mid-lake (NDBC 45007, ESE of Milwaukee)",
  },
  {
    id: "port-washington",
    label: "Port Washington Harbor (WI)",
    lat: 43.375,
    lon: -87.865,
    alertZones: ["LMZ644", "LMZ643"],
    nearshoreZone: {
      id: "LMZ644",
      name: "Port Washington to North Point Light, WI",
    },
    marineOffice: "MKX",
    ndbcBuoyId: "45007",
    ndbcBuoyLabel: "Southern Lake Michigan mid-lake (NDBC 45007, ESE of Milwaukee)",
  },
  {
    id: "sheboygan",
    label: "Sheboygan Harbor (WI)",
    lat: 43.752,
    lon: -87.701,
    alertZones: ["LMZ643", "LMZ543"],
    nearshoreZone: {
      id: "LMZ643",
      name: "Sheboygan to Port Washington, WI",
    },
    marineOffice: "MKX",
    ndbcBuoyId: "45007",
    ndbcBuoyLabel: "Southern Lake Michigan mid-lake (NDBC 45007, ESE of Milwaukee)",
  },
  {
    id: "manitowoc",
    label: "Manitowoc Harbor (WI)",
    lat: 44.092,
    lon: -87.655,
    alertZones: ["LMZ543", "LMZ542"],
    nearshoreZone: {
      id: "LMZ543",
      name: "Two Rivers to Sheboygan, WI",
    },
    marineOffice: "GRB",
    ndbcBuoyId: "45007",
    ndbcBuoyLabel: "Southern/central Lake Michigan (NDBC 45007) — not a Manitowoc harbor buoy",
  },
  {
    id: "green-bay",
    label: "Green Bay / Fox River mouth (WI)",
    lat: 44.529,
    lon: -88.005,
    alertZones: ["LMZ522", "LMZ521"],
    nearshoreZone: {
      id: "LMZ522",
      name: "Green Bay south of Oconto–Little Sturgeon Bay line",
    },
    marineOffice: "GRB",
    ndbcBuoyId: "45014",
    ndbcBuoyLabel: "Central Green Bay (NDBC 45014) when reporting",
  },
  {
    id: "sturgeon-bay",
    label: "Sturgeon Bay / Door County (WI)",
    lat: 44.834,
    lon: -87.377,
    alertZones: ["LMZ541", "LMZ522", "LMZ542"],
    nearshoreZone: {
      id: "LMZ541",
      name: "Rock Island Passage to Sturgeon Bay, WI",
    },
    marineOffice: "GRB",
    ndbcBuoyId: "45014",
    ndbcBuoyLabel: "Central Green Bay (NDBC 45014) when reporting — open-lake Door County may differ",
  },
  {
    id: "hammond",
    label: "Hammond Marina (IN)",
    lat: 41.698,
    lon: -87.511,
    alertZones: ["LMZ743", "LMZ744", "LMZ742"],
    nearshoreZone: {
      id: "LMZ743",
      name: "Calumet Harbor to Gary, IN",
    },
    marineOffice: "LOT",
    ndbcBuoyId: "45174",
    ndbcBuoyLabel: "Chicago nearshore Lake Michigan (NDBC 45174)",
  },
  {
    id: "michigan-city",
    label: "Michigan City Harbor",
    lat: 41.722,
    lon: -86.906,
    nwsStation: "KMGC",
    alertZones: ["LMZ745", "LMZ046"],
    nearshoreZone: {
      id: "LMZ745",
      name: "Burns Harbor to Michigan City, IN",
    },
    marineOffice: "LOT",
    ndbcBuoyId: "45174",
    ndbcBuoyLabel: "Chicago nearshore Lake Michigan (NDBC 45174)",
  },
  {
    id: "new-buffalo",
    label: "New Buffalo Harbor",
    lat: 41.794,
    lon: -86.744,
    nwsStation: "KMGC",
    alertZones: ["LMZ043", "LMZ046"],
    nearshoreZone: {
      id: "LMZ043",
      name: "New Buffalo, MI to St. Joseph, MI",
    },
    marineOffice: "IWX",
    ndbcBuoyId: "45174",
    ndbcBuoyLabel: "Southern Lake Michigan nearshore reference (NDBC 45174)",
  },
  {
    id: "st-joseph",
    label: "St. Joseph Harbor (MI)",
    lat: 42.108,
    lon: -86.49,
    alertZones: ["LMZ043", "LMZ844"],
    nearshoreZone: {
      id: "LMZ844",
      name: "St. Joseph to South Haven, MI",
    },
    marineOffice: "IWX",
    ndbcBuoyId: "45007",
    ndbcBuoyLabel: "Southern Lake Michigan mid-lake (NDBC 45007)",
  },
  {
    id: "south-haven",
    label: "South Haven Harbor (MI)",
    lat: 42.403,
    lon: -86.277,
    alertZones: ["LMZ844", "LMZ845"],
    nearshoreZone: {
      id: "LMZ845",
      name: "South Haven to Holland, MI",
    },
    marineOffice: "GRR",
    ndbcBuoyId: "45007",
    ndbcBuoyLabel: "Southern Lake Michigan mid-lake (NDBC 45007)",
  },
  {
    id: "saugatuck",
    label: "Saugatuck Harbor (MI)",
    lat: 42.655,
    lon: -86.209,
    alertZones: ["LMZ845", "LMZ846"],
    nearshoreZone: {
      id: "LMZ845",
      name: "South Haven to Holland, MI",
    },
    marineOffice: "GRR",
    ndbcBuoyId: "45007",
    ndbcBuoyLabel: "Southern Lake Michigan mid-lake (NDBC 45007)",
  },
  {
    id: "holland",
    label: "Holland / Lake Macatawa (MI)",
    lat: 42.775,
    lon: -86.2,
    alertZones: ["LMZ846", "LMZ845"],
    nearshoreZone: {
      id: "LMZ846",
      name: "Holland to Grand Haven, MI",
    },
    marineOffice: "GRR",
    ndbcBuoyId: "45007",
    ndbcBuoyLabel: "Southern Lake Michigan mid-lake (NDBC 45007)",
  },
  {
    id: "grand-haven",
    label: "Grand Haven Harbor (MI)",
    lat: 43.059,
    lon: -86.241,
    alertZones: ["LMZ846", "LMZ847"],
    nearshoreZone: {
      id: "LMZ847",
      name: "Grand Haven to Whitehall, MI",
    },
    marineOffice: "GRR",
    ndbcBuoyId: "45007",
    ndbcBuoyLabel: "Southern Lake Michigan mid-lake (NDBC 45007)",
  },
  {
    id: "muskegon",
    label: "Muskegon Lake / Harbor (MI)",
    lat: 43.231,
    lon: -86.27,
    alertZones: ["LMZ847", "LMZ848"],
    nearshoreZone: {
      id: "LMZ847",
      name: "Grand Haven to Whitehall, MI",
    },
    marineOffice: "GRR",
    ndbcBuoyId: "45024",
    ndbcBuoyLabel: "Ludington-area Lake Michigan (NDBC 45024) when reporting",
  },
  {
    id: "ludington",
    label: "Ludington Harbor (MI)",
    lat: 43.953,
    lon: -86.452,
    alertZones: ["LMZ848", "LMZ849"],
    nearshoreZone: {
      id: "LMZ849",
      name: "Pentwater to Manistee, MI",
    },
    marineOffice: "GRR",
    ndbcBuoyId: "45024",
    ndbcBuoyLabel: "Ludington Lake Michigan (NDBC 45024) when reporting",
  },
  {
    id: "traverse-city",
    label: "Traverse City / Grand Traverse Bay (MI)",
    lat: 44.763,
    lon: -85.622,
    alertZones: ["LMZ323", "LMZ344"],
    nearshoreZone: {
      id: "LMZ323",
      name: "Grand Traverse Bay south of Grand Traverse Light–Norwood line",
    },
    marineOffice: "APX",
    ndbcBuoyId: "45022",
    ndbcBuoyLabel: "Little Traverse Bay (NDBC 45022) when reporting — not West Arm harbor docks",
  },
  {
    id: "charlevoix",
    label: "Charlevoix / Round Lake (MI)",
    lat: 45.318,
    lon: -85.258,
    alertZones: ["LMZ342", "LMZ323"],
    nearshoreZone: {
      id: "LMZ342",
      name: "Norwood MI to 5 NM west of Mackinac Bridge including Little Traverse Bay",
    },
    marineOffice: "APX",
    ndbcBuoyId: "45022",
    ndbcBuoyLabel: "Little Traverse Bay (NDBC 45022) when reporting — regional, not Round Lake docks",
  },
  {
    id: "petoskey",
    label: "Petoskey / Little Traverse Bay (MI)",
    lat: 45.374,
    lon: -84.955,
    alertZones: ["LMZ342"],
    nearshoreZone: {
      id: "LMZ342",
      name: "Norwood MI to 5 NM west of Mackinac Bridge including Little Traverse Bay",
    },
    marineOffice: "APX",
    ndbcBuoyId: "45022",
    ndbcBuoyLabel: "Little Traverse Bay (NDBC 45022) when reporting",
  },
  {
    id: "mackinaw-city",
    label: "Mackinaw City / Straits of Mackinac (MI)",
    lat: 45.777,
    lon: -84.728,
    alertZones: ["LMZ342", "LMZ341", "LHZ345"],
    nearshoreZone: {
      id: "LMZ342",
      name: "Norwood MI to 5 NM west of Mackinac Bridge including Little Traverse Bay",
    },
    marineOffice: "APX",
    ndbcBuoyId: "45022",
    ndbcBuoyLabel: "Northern Lake Michigan reference (NDBC 45022) when reporting — Straits products (LHZ345) can differ",
  },
  {
    id: "beaver-island",
    label: "Beaver Island / St. James (MI)",
    lat: 45.746,
    lon: -85.508,
    alertZones: ["LMZ341", "LMZ342"],
    nearshoreZone: {
      id: "LMZ341",
      name: "Seul Choix Point to 5 NM west of Mackinac Bridge",
    },
    marineOffice: "APX",
    ndbcBuoyId: "45022",
    ndbcBuoyLabel: "Northern Lake Michigan reference (NDBC 45022) — island conditions can differ",
  },
  {
    id: "washington-island",
    label: "Washington Island / Door County (WI)",
    lat: 45.377,
    lon: -86.892,
    alertZones: ["LMZ521", "LMZ541", "LMZ542"],
    nearshoreZone: {
      id: "LMZ541",
      name: "Rock Island Passage to Sturgeon Bay, WI",
    },
    marineOffice: "GRB",
    ndbcBuoyId: "45014",
    ndbcBuoyLabel: "Central Green Bay (NDBC 45014) when reporting — open Porte des Morts can differ",
  },
  {
    id: "fond-du-lac",
    label: "Fond du Lac / Lake Winnebago (WI)",
    lat: 43.777,
    lon: -88.439,
    nwsStation: "KFLD",
  },
  {
    id: "shabbona-lake",
    label: "Shabbona Lake (IL)",
    lat: 41.754,
    lon: -88.875,
  },
];

export function getWeatherLocationById(
  id: string,
): WeatherLocation | undefined {
  return weatherLocations.find((loc) => loc.id === id);
}

export function listWeatherLocations(): WeatherLocation[] {
  return weatherLocations;
}

/** Public NWS nearshore forecast page for a marine zone UGC. */
export function nearshoreZoneForecastUrl(zoneId: string): string {
  return `https://forecast.weather.gov/shortday.php?zone=${encodeURIComponent(zoneId)}`;
}

export function marineOfficeProductUrl(office: MarineForecastOffice): string {
  return `https://api.weather.gov/products?location=${office}&type=CWF&limit=1`;
}
