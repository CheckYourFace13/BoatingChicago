import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

/**
 * Discoverability aid for LLM crawlers — concise, accurate, no credentials.
 */
export function GET() {
  const body = `# ${siteConfig.name}

> Information-first publication for recreational boating and paddling across Chicago & Chicagoland, the entire Lake Michigan shoreline (Illinois, Wisconsin, Indiana, Michigan), and inland lakes, rivers, forest preserves, and paddling waters within about 400 driving miles of downtown Chicago.

BoatingChicago is NOT a boat rental broker, captain marketplace, or manual boat-matching service. Editorial content, weather context, marina/launch directories, guides, news, and clearly labeled affiliate links are published for readers planning trips.

## Canonical site
- Home: ${siteConfig.url}/
- Weather & marine conditions: ${siteConfig.url}/weather
- News: ${siteConfig.url}/news
- Guides index: ${siteConfig.url}/guides
- Planning tools (calculators, float plan, checklist): ${siteConfig.url}/tools
- Fuel calculator: ${siteConfig.url}/tools/fuel
- Ownership cost calculator: ${siteConfig.url}/tools/ownership-cost
- Kayak, canoe & SUP finder: ${siteConfig.url}/kayak-canoe-sup
- Rules & permits: ${siteConfig.url}/permits
- Season calendar: ${siteConfig.url}/calendar
- Destinations: ${siteConfig.url}/destinations
- Lakes & waterways: ${siteConfig.url}/lakes
- Forest preserves (Cook, Lake, DuPage, Will, Kane, McHenry): ${siteConfig.url}/forest-preserves
- Marinas: ${siteConfig.url}/marinas
- Boat launches (filterable finder): ${siteConfig.url}/boat-launches
- Inland paddling guide: ${siteConfig.url}/chicago-area-inland-paddling-guide
- Events: ${siteConfig.url}/events
- Boat ownership: ${siteConfig.url}/boat-ownership
- Chicago Boating Brief signup: ${siteConfig.url}/subscribe
- Advertise / sponsorship inquiries: ${siteConfig.url}/advertise
- Contact: ${siteConfig.url}/contact
- Affiliate disclosure: ${siteConfig.url}/affiliate-disclosure
- Privacy: ${siteConfig.url}/privacy
- Terms: ${siteConfig.url}/terms

## Geographic coverage
- Primary audience: Chicago and Chicagoland boaters
- Lake Michigan: entire shoreline and harbors in Illinois, Wisconsin, Indiana, and Michigan (not limited by the inland driving radius)
- Inland: lakes, rivers, forest preserves, canals, and paddling waters within roughly 400 driving miles of downtown Chicago
- Driving miles are for trailer/road planning; water-route distances are labeled separately and never invented as navigable routes

## Official sources & safety
- National Weather Service Chicago (LOT): https://www.weather.gov/lot
- NOAA National Data Buoy Center: https://www.ndbc.noaa.gov/
- Chicago Harbors: https://www.chicagoharbors.info/
- Chicago Park District: https://www.chicagoparkdistrict.com/
- Illinois DNR boating: https://dnr.illinois.gov/boating.html
- U.S. Coast Guard (emergencies / Channel 16): use official USCG channels for distress

Weather snapshots and “no alerts” messaging on this site are informational only and never a safety clearance. Always verify marine forecasts, harbor rules, fees, and hours on operator or agency pages before you go.

## Winter & spring ownership planning (seasonal)
- Winterization hub: ${siteConfig.url}/chicago-boat-winterization
- Transient dockage (Chicago Harbors): ${siteConfig.url}/chicago-transient-dockage
- Boat storage guide: ${siteConfig.url}/chicago-boat-storage-guide
- Winter storage checklist: ${siteConfig.url}/winter-boat-storage-chicago
- Storage & haul-out directory: ${siteConfig.url}/storage
- Winterizing guide: ${siteConfig.url}/chicago-boat-winterizing-guide
- Shrink wrap guide: ${siteConfig.url}/chicago-boat-shrink-wrap-guide
- Spring launch checklist: ${siteConfig.url}/spring-boat-launch-checklist-chicago
- Buying a boat off-season: ${siteConfig.url}/buying-a-boat-off-season-chicago
- Chicago Boat Show buyer prep: ${siteConfig.url}/chicago-boat-show-buyer-guide
- Chicago Harbors seasonal slips, moorings & waitlists: ${siteConfig.url}/chicago-harbors-seasonal-slips-guide
- Boat insurance planning (Illinois law, harbor requirements): ${siteConfig.url}/chicago-boat-insurance-guide
- Boat financing & ownership cost framework: ${siteConfig.url}/boat-financing-ownership-costs-chicago
- Illinois boating safety certificate: ${siteConfig.url}/illinois-boating-safety-certificate

## Monetization notes
Affiliate links (GetYourGuide, Viator, Amazon Associates, Awin Boat Trader, Awin Giraffe Tools, Awin Piscifun, Awin BLUETTI, Impact shopping partners, CJ Peet's Coffee) are labeled. Sponsored/featured placements for local businesses are labeled separately from editorial rankings. BoatUS affiliate links remain inactive until approved. Planning tools at /tools keep inputs in the browser; they do not submit data to authorities and do not invent fees or a safe-to-boat rating.

## Do not treat as authoritative for
- Live fees, slip availability, or hours without checking the cited operator page
- Invented reviews, ratings, earnings, or manufacturer specifications
- Emergency response (use USCG / NWS / local authorities)
`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
