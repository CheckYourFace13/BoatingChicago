/**
 * Approximate ZIP centroids for nearest-place discovery.
 * Coordinates are planning approximations for driving distance ranking —
 * not survey-grade locations. Unknown ZIPs are not guessed.
 */
export interface ZipCentroid {
  zip: string;
  lat: number;
  lng: number;
  label: string;
}

const ZIPS: ZipCentroid[] = [
  { zip: "60601", lat: 41.886, lng: -87.622, label: "Chicago Loop" },
  { zip: "60611", lat: 41.895, lng: -87.622, label: "Streeterville / Navy Pier" },
  { zip: "60614", lat: 41.922, lng: -87.65, label: "Lincoln Park" },
  { zip: "60657", lat: 41.939, lng: -87.656, label: "Lakeview" },
  { zip: "60613", lat: 41.954, lng: -87.655, label: "North Center / Wrigleyville" },
  { zip: "60640", lat: 41.972, lng: -87.66, label: "Uptown" },
  { zip: "60626", lat: 42.01, lng: -87.67, label: "Rogers Park" },
  { zip: "60605", lat: 41.867, lng: -87.623, label: "South Loop" },
  { zip: "60616", lat: 41.845, lng: -87.626, label: "Near South Side" },
  { zip: "60608", lat: 41.85, lng: -87.67, label: "Pilsen / Heart of Chicago" },
  { zip: "60647", lat: 41.921, lng: -87.701, label: "Logan Square" },
  { zip: "60622", lat: 41.903, lng: -87.678, label: "Wicker Park" },
  { zip: "60035", lat: 42.188, lng: -87.805, label: "Highland Park" },
  { zip: "60045", lat: 42.243, lng: -87.844, label: "Lake Forest" },
  { zip: "60085", lat: 42.371, lng: -87.833, label: "Waukegan" },
  { zip: "60099", lat: 42.473, lng: -87.822, label: "Zion" },
  { zip: "60031", lat: 42.344, lng: -87.927, label: "Gurnee" },
  { zip: "60030", lat: 42.337, lng: -88.005, label: "Grayslake" },
  { zip: "60073", lat: 42.376, lng: -88.092, label: "Round Lake" },
  { zip: "60002", lat: 42.474, lng: -88.09, label: "Antioch" },
  { zip: "53140", lat: 42.59, lng: -87.821, label: "Kenosha" },
  { zip: "53115", lat: 42.631, lng: -88.643, label: "Delavan" },
  { zip: "53147", lat: 42.592, lng: -88.433, label: "Lake Geneva" },
  { zip: "53202", lat: 43.045, lng: -87.897, label: "Milwaukee lakefront" },
  { zip: "46360", lat: 41.717, lng: -86.895, label: "Michigan City" },
  { zip: "46601", lat: 41.676, lng: -86.252, label: "South Bend" },
  { zip: "49085", lat: 42.107, lng: -86.484, label: "St. Joseph" },
  { zip: "49423", lat: 42.787, lng: -86.109, label: "Holland" },
  { zip: "49441", lat: 43.234, lng: -86.248, label: "Muskegon" },
  { zip: "60540", lat: 41.766, lng: -88.147, label: "Naperville" },
  { zip: "60187", lat: 41.866, lng: -88.107, label: "Wheaton" },
  { zip: "60515", lat: 41.795, lng: -87.973, label: "Downers Grove" },
  { zip: "60435", lat: 41.525, lng: -88.082, label: "Joliet" },
  { zip: "60115", lat: 41.931, lng: -88.75, label: "DeKalb" },
];

const BY_ZIP = new Map(ZIPS.map((z) => [z.zip, z]));

export function lookupZip(raw: string | undefined): ZipCentroid | null {
  if (!raw) return null;
  const zip = raw.replace(/\D/g, "").slice(0, 5);
  if (zip.length !== 5) return null;
  return BY_ZIP.get(zip) ?? null;
}

export function listedZipExamples(): ZipCentroid[] {
  return ZIPS;
}
