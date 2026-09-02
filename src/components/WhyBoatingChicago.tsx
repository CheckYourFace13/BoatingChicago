import Image from "next/image";
import { siteImages } from "@/data/images";
import { Reveal } from "./Reveal";

const reasons = [
  {
    title: "Local Chicago Focus",
    description:
      "We know Lake Michigan, the Playpen, every harbor, and every season. This isn't a generic directory — it's a Chicago boating guide built for locals and visitors.",
  },
  {
    title: "Live Conditions First",
    description:
      "Weather, marine alerts, and lake conditions sit alongside guides and destinations so you can plan with real-time context.",
  },
  {
    title: "Clear Booking Options",
    description:
      "When you're ready to get on the water, we highlight highly reviewed GetYourGuide and Viator experiences — clearly labeled affiliate links.",
  },
  {
    title: "Trusted Local Info",
    description:
      "Marinas, launches, destinations, news, and events link back to official sources so you can verify fees, hours, and rules yourself.",
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
            An information-first guide to Chicago and southern Lake Michigan boating —
            conditions, harbors, and curated experiences when you&apos;re ready.
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
