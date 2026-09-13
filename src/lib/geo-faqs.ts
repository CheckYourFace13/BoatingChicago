import type { Marina, BoatLaunch, Destination } from "@/types/geo";
import type { CategoryFAQ } from "@/types";

function amenityAvailable(marina: Marina, key: string): boolean | null {
  const row = marina.amenities.find((a) => a.key === key);
  return row ? row.available : null;
}

/** FAQs supported only by verified marina amenity/source fields — never invents. */
export function buildMarinaFaqs(
  marina: Marina,
  destination?: Destination
): CategoryFAQ[] {
  const launch = amenityAvailable(marina, "boat-launch");
  const transient = amenityAvailable(marina, "transient-dockage");
  const fuel = amenityAvailable(marina, "fuel");
  const faqs: CategoryFAQ[] = [];

  faqs.push({
    question: `Does ${marina.name} have a public boat launch?`,
    answer:
      launch === true
        ? `Yes — a boat launch is listed as available for ${marina.name} based on the operator source we cite on this page. Confirm current access, fees, and hours on the official website before you trailer in.`
        : launch === false
          ? `A boat launch is not listed as available for ${marina.name} in the amenity data we verified. Check the official operator page for any seasonal or special-access options.`
          : `We have not confirmed a boat launch amenity for ${marina.name}. Use the official operator link on this page to verify launching options before you go.`,
  });

  faqs.push({
    question: "Where do I verify launch fees and dockage rates?",
    answer: marina.officialWebsite
      ? `BoatingChicago does not reprint live marina pricing. Confirm launch fees, transient rates, and season passes on the official operator site (${marina.source.name}) linked on this page.`
      : `Confirm fees directly with the operating agency cited as ${marina.source.name}. We do not reprint live marina pricing.`,
  });

  faqs.push({
    question: `Can transient boats dock at ${marina.name}?`,
    answer:
      transient === true
        ? `Transient dockage is listed as available. Capacity, reservations, and overnight rules change — verify with ${marina.source.name} before arrival.`
        : transient === false
          ? `Transient dockage is not listed as available in our verified amenity notes. Confirm any guest-dock exceptions with the operator.`
          : `Transient dockage status is unknown in our verified data. Check the official source before planning an overnight or day dockage stay.`,
  });

  faqs.push({
    question: "Where should I check current conditions?",
    answer: destination
      ? `Use the ${destination.name} marine weather view on BoatingChicago and always cross-check official NOAA/NWS marine forecasts. Our informational rating is not a safety clearance.`
      : `Use the BoatingChicago weather hub and official NOAA/NWS marine products. Our informational rating is not a safety clearance.`,
  });

  faqs.push({
    question: `Who operates ${marina.name}?`,
    answer: `Details on this page are attributed to ${marina.source.name}. Follow the official website link for operator contact, rules, and current facility status.${
      fuel === true
        ? " Fuel is listed as available in our amenity notes — confirm hours on the official site."
        : ""
    }`,
  });

  return faqs;
}

export function buildLaunchFaqs(
  launch: BoatLaunch,
  destination?: Destination
): CategoryFAQ[] {
  return [
    {
      question: `Is ${launch.name} a public boat launch?`,
      answer: `${launch.summary} Confirm current access, stickers, and fees on the official source (${launch.source.name}) before you tow.`,
    },
    {
      question: "Where do I verify launch fees?",
      answer:
        "BoatingChicago does not reprint live launch fees. Use the official agency link on this page for current ramp fees, season passes, and waterway stickers.",
    },
    {
      question: "Where should I check current conditions?",
      answer: destination
        ? `Check ${destination.name} marine weather on BoatingChicago and official NOAA/NWS products. Do not treat our informational rating as a go/no-go decision.`
        : "Check the BoatingChicago weather hub and official NOAA/NWS marine forecasts before launching.",
    },
    {
      question: "Who operates this launch?",
      answer: `Access guidance is attributed to ${launch.source.name}. Follow the official source link for rules, hours, and closures.${
        launch.amenityNotes ? ` Notes: ${launch.amenityNotes}` : ""
      }`,
    },
  ];
}
