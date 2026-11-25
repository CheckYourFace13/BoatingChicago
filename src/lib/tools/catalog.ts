export interface ToolCatalogEntry {
  href: string;
  title: string;
  blurb: string;
  group: "worksheets" | "trip" | "ownership" | "reference";
}

export const TOOL_CATALOG: ToolCatalogEntry[] = [
  {
    href: "/tools/float-plan",
    title: "Float plan worksheet",
    blurb:
      "A printable plan you fill out, leave with a trusted contact, update if plans change, and close when you return — not an online filing system.",
    group: "worksheets",
  },
  {
    href: "/tools/trip-checklist",
    title: "Pre-departure trip checklist",
    blurb:
      "A compact gear and paperwork checklist for day trips on Lake Michigan and inland waters near Chicago.",
    group: "worksheets",
  },
  {
    href: "/tools/fuel",
    title: "Boat trip fuel & cost calculator",
    blurb:
      "Estimate underway time, gallons burned, and fuel spend from a charted nautical-mile distance, speed, and your measured gallons per hour.",
    group: "trip",
  },
  {
    href: "/tools/trip-time",
    title: "Trip time & distance calculator",
    blurb:
      "Convert a chart-derived route distance and cruising speed into underway time. Straight-line map distance is not a safe navigable route.",
    group: "trip",
  },
  {
    href: "/tools/ownership-cost",
    title: "Boat ownership cost calculator",
    blurb:
      "Combine a loan payment with marina, storage, insurance, maintenance, and fuel you enter — no invented market prices.",
    group: "ownership",
  },
  {
    href: "/tools/slip-compare",
    title: "Marina / slip / storage quote comparison",
    blurb:
      "Line up seasonal quotes you collected, including per-foot rates and add-ons, without treating our directory as a price list.",
    group: "ownership",
  },
  {
    href: "/tools/anchor-scope",
    title: "Anchor scope planner",
    blurb:
      "Apply a published scope ratio to depth plus freeboard. Conditions, bottom, and your ground tackle still decide what is adequate.",
    group: "reference",
  },
  {
    href: "/tools/conversions",
    title: "Speed & distance conversions",
    blurb: "Knots, miles per hour, nautical miles, and statute miles using standard conversion factors.",
    group: "reference",
  },
  {
    href: "/tools/towing",
    title: "Trailer tongue-weight band",
    blurb:
      "A 10–15% planning band of gross trailer weight — not a hitch rating or a substitute for the trailer plate.",
    group: "reference",
  },
  {
    href: "/tools/battery",
    title: "Battery runtime estimator",
    blurb:
      "Usable watt-hours divided by load watts. Peukert effect, temperature, and inverter losses are not modeled.",
    group: "reference",
  },
];

export const TOOL_GROUP_LABEL: Record<ToolCatalogEntry["group"], string> = {
  worksheets: "Printable worksheets",
  trip: "Trip planning",
  ownership: "Ownership & quotes",
  reference: "Onboard reference",
};
