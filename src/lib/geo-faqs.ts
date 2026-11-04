import type { Marina, BoatLaunch, Destination } from "@/types/geo";
import type { CategoryFAQ } from "@/types";

function amenityAvailable(marina: Marina, key: string): boolean | null {
  const row = marina.amenities.find((a) => a.key === key);
  return row ? row.available : null;
}

function amenityNote(marina: Marina, key: string): string | undefined {
  return marina.amenities.find((a) => a.key === key)?.note;
}

/** FAQs supported only by verified marina amenity/source fields — never invents. */
export function buildMarinaFaqs(
  marina: Marina,
  destination?: Destination
): CategoryFAQ[] {
  const launch = amenityAvailable(marina, "boat-launch");
  const transient = amenityAvailable(marina, "transient-dockage");
  const fuel = amenityAvailable(marina, "fuel");
  const pump = amenityAvailable(marina, "pump-out");
  const launchNote = amenityNote(marina, "boat-launch");
  const transientNote = amenityNote(marina, "transient-dockage");
  const fuelNote = amenityNote(marina, "fuel");
  const faqs: CategoryFAQ[] = [];

  faqs.push({
    question: `Does ${marina.name} have a public boat launch?`,
    answer:
      launch === true
        ? `Yes — ${marina.name} lists a boat launch on the cited operator source${
            launchNote ? ` (${launchNote})` : ""
          }. Confirm current ramp access, fees, and hours on that official page before you trailer in.`
        : launch === false
          ? `${marina.name} does not list a boat launch in the amenity data we verified. Check ${marina.source.name} for any seasonal or special-access exceptions.`
          : `A boat launch is not confirmed for ${marina.name} on the source we cite. Verify launching options on ${marina.source.name} before you go.`,
  });

  faqs.push({
    question: `How do I verify fees for ${marina.name}?`,
    answer: marina.feesNote
      ? `${marina.feesNote}`
      : `BoatingChicago does not reprint live pricing for ${marina.name}. Confirm rates on ${marina.source.name}${
          marina.officialWebsite ? " via the official link on this page" : ""
        }.`,
  });

  faqs.push({
    question: `Can transient boats dock at ${marina.name}?`,
    answer:
      transient === true
        ? `Transient dockage is listed for ${marina.name}${
            transientNote ? ` (${transientNote})` : ""
          }. Capacity, reservations, and overnight rules change — verify with ${marina.source.name} before arrival.`
        : transient === false
          ? `${marina.name} does not list transient dockage in our verified amenity notes. Confirm any guest-dock exceptions with the operator.`
          : `Transient dockage is not confirmed for ${marina.name} on the source we cite. Ask ${marina.source.name} before planning an overnight or day stop.`,
  });

  if (fuel === true || pump === true) {
    const bits: string[] = [];
    if (fuel === true) {
      bits.push(
        `fuel is listed as available${fuelNote ? ` (${fuelNote})` : ""}`
      );
    }
    if (pump === true) {
      const pumpNote = amenityNote(marina, "pump-out");
      bits.push(
        `pump-out is listed as available${pumpNote ? ` (${pumpNote})` : ""}`
      );
    }
    faqs.push({
      question: `Does ${marina.name} offer fuel or pump-out?`,
      answer: `On the cited source, ${bits.join(" and ")}. Confirm hours and any purchase rules on ${marina.source.name} before you depend on those services.`,
    });
  }

  faqs.push({
    question: `Where should I check conditions near ${marina.name}?`,
    answer: destination
      ? `Use the ${destination.name} weather view on BoatingChicago and cross-check official NOAA/NWS marine forecasts for that area. Those are area products — not a sensor at ${marina.name}'s basin mouth — and our informational rating is not a safety clearance.`
      : `Use the BoatingChicago weather hub and official NOAA/NWS marine products. Our informational rating is not a safety clearance.`,
  });

  faqs.push({
    question: `Who operates ${marina.name}?`,
    answer: `${marina.name} details on this page are attributed to ${marina.source.name}${
      marina.phone ? ` (phone ${marina.phone})` : ""
    }. Use the official website link for contact, rules, and current facility status.`,
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
      question: `How do I verify fees for ${launch.name}?`,
      answer: launch.feesNote
        ? launch.feesNote
        : `BoatingChicago does not reprint live launch fees for ${launch.name}. Use ${launch.source.name} for current ramp fees, season passes, and waterway stickers.`,
    },
    {
      question: `Where should I check conditions near ${launch.name}?`,
      answer: destination
        ? `Check ${destination.name} marine weather on BoatingChicago and official NOAA/NWS products. Do not treat our informational rating as a go/no-go decision for ${launch.name}.`
        : "Check the BoatingChicago weather hub and official NOAA/NWS marine forecasts before launching.",
    },
    {
      question: `Who operates ${launch.name}?`,
      answer: `Access guidance is attributed to ${launch.source.name}. Follow the official source link for rules, hours, and closures.${
        launch.amenityNotes ? ` Notes: ${launch.amenityNotes}` : ""
      }`,
    },
  ];
}
