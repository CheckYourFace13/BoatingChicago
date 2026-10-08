import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

/**
 * Discoverability aid for LLM crawlers — concise, accurate, no credentials.
 */
export function GET() {
  const body = `# ${siteConfig.name}

> Information-first publication for boating around Chicago, southern Lake Michigan, nearby Wisconsin and Indiana destinations, and selected lakes within about 100 miles of Chicago.

BoatingChicago is NOT a boat rental broker, captain marketplace, or manual boat-matching service. Editorial content, weather context, marina/launch directories, guides, news, and clearly labeled affiliate links are published for readers planning trips.

## Canonical site
- Home: ${siteConfig.url}/
- Weather & marine conditions: ${siteConfig.url}/weather
- News: ${siteConfig.url}/news
- Guides index: ${siteConfig.url}/guides
- Destinations: ${siteConfig.url}/destinations
- Marinas: ${siteConfig.url}/marinas
- Boat launches: ${siteConfig.url}/boat-launches
- Events: ${siteConfig.url}/events
- Boat ownership: ${siteConfig.url}/boat-ownership
- Chicago Boating Brief signup: ${siteConfig.url}/subscribe
- Advertise / sponsorship inquiries: ${siteConfig.url}/advertise
- Contact: ${siteConfig.url}/contact
- Affiliate disclosure: ${siteConfig.url}/affiliate-disclosure
- Privacy: ${siteConfig.url}/privacy
- Terms: ${siteConfig.url}/terms

## Official sources & safety
- National Weather Service Chicago (LOT): https://www.weather.gov/lot
- NOAA National Data Buoy Center: https://www.ndbc.noaa.gov/
- Chicago Harbors: https://www.chicagoharbors.info/
- Chicago Park District: https://www.chicagoparkdistrict.com/
- Illinois DNR boating: https://dnr.illinois.gov/boating.html
- U.S. Coast Guard (emergencies / Channel 16): use official USCG channels for distress

Weather ratings and “no alerts” messaging on this site are informational only and never a safety clearance. Always verify marine forecasts, harbor rules, fees, and hours on operator or agency pages before you go.

## Winter planning (seasonal)
- Boat storage guide: ${siteConfig.url}/chicago-boat-storage-guide
- Winter storage checklist: ${siteConfig.url}/winter-boat-storage-chicago
- Winterizing guide: ${siteConfig.url}/chicago-boat-winterizing-guide
- Shrink wrap guide: ${siteConfig.url}/chicago-boat-shrink-wrap-guide
- Buying a boat off-season: ${siteConfig.url}/buying-a-boat-off-season-chicago
- Chicago Boat Show buyer prep: ${siteConfig.url}/chicago-boat-show-buyer-guide

## Monetization notes
Affiliate links (GetYourGuide, Viator, Amazon Associates, Awin Boat Trader, Awin Giraffe Tools) are labeled. Sponsored/featured placements for local businesses are labeled separately from editorial rankings. BoatUS affiliate links remain inactive until approved.

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
