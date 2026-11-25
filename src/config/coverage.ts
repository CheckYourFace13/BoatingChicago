/**
 * Permanent editorial coverage for BoatingChicago.com.
 * Chicago/Chicagoland remain the primary audience; Lake Michigan is covered
 * in full; inland waters use an approximate driving-mile radius from downtown.
 */

/** Downtown Chicago reference for driving-distance planning (not a NAP). */
export const CHICAGO_CENTER = {
  lat: 41.8781,
  lng: -87.6298,
  label: "downtown Chicago",
} as const;

/**
 * Approximate driving-mile radius for inland lakes, rivers, forest preserves,
 * canals, and other non–Lake Michigan waters. Lake Michigan shoreline is NOT
 * limited by this radius.
 */
export const INLAND_DRIVING_MILES_APPROX = 400;

export const CHICAGOLAND_COUNTIES = [
  "Cook",
  "DuPage",
  "Lake",
  "Will",
  "Kane",
  "McHenry",
] as const;

export const COVERAGE_STATES = [
  "Illinois",
  "Wisconsin",
  "Indiana",
  "Michigan",
] as const;

/** Short phrase for heroes, footers, and schema-style copy. */
export const COVERAGE_SHORT =
  "Chicago & Chicagoland, all of Lake Michigan, and inland waters within about 400 driving miles";

/** Longer editorial description used in site metadata and llms.txt. */
/** No trailing period — callers add sentence punctuation. */
export const COVERAGE_LONG =
  "Chicago and Chicagoland (Cook, DuPage, Lake, Will, Kane, and McHenry counties), the entire Lake Michigan shoreline and harbors in Illinois, Wisconsin, Indiana, and Michigan, plus inland lakes, rivers, forest preserves, canals, and paddling waters within roughly 400 driving miles of downtown Chicago";

export const COVERAGE_HIERARCHY_NOTE =
  "Chicago and Chicagoland stay the primary audience. Coverage expands through northern Illinois, southeastern Wisconsin, northwest Indiana, and southwest Michigan, then to the full Lake Michigan shore and qualifying inland waters farther out.";
