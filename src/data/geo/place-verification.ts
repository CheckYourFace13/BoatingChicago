/**
 * Public place facts for schema only.
 * Coordinates and postal fragments come from OpenStreetMap place features
 * (harbour/marina) retrieved 2026-09-24 via Nominatim. Incomplete street
 * fragments are omitted. Destinations with no matching feature are omitted.
 */
export interface VerifiedPlace {
  streetAddress?: string;
  addressLocality: string;
  addressRegion: string;
  postalCode?: string;
  lat: number;
  lng: number;
  sourceName: string;
  sourceUrl: string;
}

const OSM = "OpenStreetMap (Nominatim), 2026-09-24";

export const verifiedMarinaPlaces: Record<string, VerifiedPlace> = {
  "belmont-harbor": {
    addressLocality: "Chicago",
    addressRegion: "IL",
    postalCode: "60613",
    lat: 41.9438712,
    lng: -87.6381292,
    sourceName: OSM,
    sourceUrl: "https://www.openstreetmap.org/search?query=Belmont%20Harbor%20Chicago",
  },
  "burnham-harbor": {
    streetAddress: "1559 South Lake Shore Drive",
    addressLocality: "Chicago",
    addressRegion: "IL",
    postalCode: "60605",
    lat: 41.8604202,
    lng: -87.6116779,
    sourceName: OSM,
    sourceUrl: "https://www.openstreetmap.org/search?query=Burnham%20Harbor%20Chicago",
  },
  "monroe-harbor": {
    addressLocality: "Chicago",
    addressRegion: "IL",
    lat: 41.8760733,
    lng: -87.6132288,
    sourceName: OSM,
    sourceUrl: "https://www.openstreetmap.org/search?query=Monroe%20Harbor%20Chicago",
  },
  "dusable-harbor": {
    addressLocality: "Chicago",
    addressRegion: "IL",
    lat: 41.8857244,
    lng: -87.6114615,
    sourceName: OSM,
    sourceUrl: "https://www.openstreetmap.org/search?query=DuSable%20Harbor%20Chicago",
  },
  "montrose-harbor": {
    addressLocality: "Chicago",
    addressRegion: "IL",
    postalCode: "60613",
    lat: 41.961065,
    lng: -87.6392345,
    sourceName: OSM,
    sourceUrl: "https://www.openstreetmap.org/search?query=Montrose%20Harbor%20Chicago",
  },
  "31st-street-harbor": {
    addressLocality: "Chicago",
    addressRegion: "IL",
    lat: 41.8360301,
    lng: -87.6033841,
    sourceName: OSM,
    sourceUrl: "https://www.openstreetmap.org/search?query=31st%20Street%20Harbor%20Chicago",
  },
  "waukegan-harbor-marina": {
    streetAddress: "East Madison Street",
    addressLocality: "Waukegan",
    addressRegion: "IL",
    postalCode: "60085",
    lat: 42.3586993,
    lng: -87.8220217,
    sourceName: OSM,
    sourceUrl: "https://www.openstreetmap.org/search?query=Waukegan%20Harbor%20Marina",
  },
  "north-point-marina": {
    addressLocality: "Winthrop Harbor",
    addressRegion: "IL",
    postalCode: "60096",
    lat: 42.4764182,
    lng: -87.8063318,
    sourceName: OSM,
    sourceUrl: "https://www.openstreetmap.org/search?query=North%20Point%20Marina%20Winthrop%20Harbor",
  },
  "mckinley-marina": {
    streetAddress: "1750 North Lincoln Memorial Drive",
    addressLocality: "Milwaukee",
    addressRegion: "WI",
    postalCode: "53202",
    lat: 43.0488246,
    lng: -87.8848679,
    sourceName: OSM,
    sourceUrl: "https://www.openstreetmap.org/search?query=McKinley%20Marina%20Milwaukee",
  },
  "washington-park-marina": {
    streetAddress: "Lake Shore Drive",
    addressLocality: "Michigan City",
    addressRegion: "IN",
    postalCode: "46360",
    lat: 41.7259296,
    lng: -86.9065249,
    sourceName: OSM,
    sourceUrl: "https://www.openstreetmap.org/search?query=Washington%20Park%20Marina%20Michigan%20City",
  },
};
