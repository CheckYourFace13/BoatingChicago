import Image from "next/image";
import { siteImages } from "@/data/images";
import { Reveal } from "./Reveal";

const reasons = [
  {
    title: "Local Chicago Experts",
    description:
      "We know Lake Michigan, the Playpen, every harbor, and every season. This isn't a generic directory — it's a Chicago boating guide built by locals.",
  },
  {
    title: "Fast Matching",
    description:
      "Tell us what you need and we connect you with the right boat, captain, or charter — often within 24 hours. No endless searching.",
  },
  {
    title: "Best Price Options",
    description:
      "Compare affiliate partners like Boatsetter and GetMyBoat, browse local vendor listings, and find options at every budget level.",
  },
  {
    title: "Trusted Referrals",
    description:
      "We feature vetted local operators and clearly label sponsored listings. You always know who you're booking with.",
  },
];

export function WhyBoatingChicago() {
  return (
    <section className="relative overflow-hidden rounded-3xl">
      <div className="absolute inset-0">
        <Image
          src={siteImages.whyChicago.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-lake-blue/88" />
      </div>

      <div className="relative z-10 p-8 md:p-12">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 text-center">
            Why Use Boating Chicago?
          </h2>
          <p className="text-white/80 mb-10 text-center max-w-2xl mx-auto">
            The fastest way to find and book Chicago boating experiences — built for locals and visitors who want results, not research rabbit holes.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reasons.map((reason, i) => (
            <Reveal key={reason.title} delayMs={i * 70}>
              <div className="p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 hover:bg-white/15 transition-colors">
                <h3 className="font-extrabold text-sun-yellow mb-1.5">{reason.title}</h3>
                <p className="text-white/85 text-sm leading-relaxed">{reason.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
