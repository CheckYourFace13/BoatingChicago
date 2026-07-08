const reasons = [
  {
    icon: "🏙️",
    title: "Local Chicago Experts",
    description: "We know Lake Michigan, the Playpen, every harbor, and every season. This isn't a generic directory — it's a Chicago boating guide built by locals.",
  },
  {
    icon: "⚡",
    title: "Fast Matching",
    description: "Tell us what you need and we connect you with the right boat, captain, or charter — often within 24 hours. No endless searching.",
  },
  {
    icon: "💰",
    title: "Best Price Options",
    description: "Compare affiliate partners like Boatsetter and GetMyBoat, browse local vendor listings, and find options at every budget level.",
  },
  {
    icon: "🛡️",
    title: "Trusted Referrals",
    description: "We feature vetted local operators and clearly label sponsored listings. You always know who you're booking with.",
  },
];

export function WhyBoatingChicago() {
  return (
    <section className="bg-light-blue/50 rounded-3xl p-8 md:p-12">
      <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2 text-center">
        Why Use Boating Chicago?
      </h2>
      <p className="text-gray-600 mb-10 text-center max-w-2xl mx-auto">
        The fastest way to find and book Chicago boating experiences — built for locals and visitors who want results, not research rabbit holes.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reasons.map((reason) => (
          <div key={reason.title} className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm">
            <span className="text-3xl shrink-0">{reason.icon}</span>
            <div>
              <h3 className="font-extrabold text-lake-blue mb-1">{reason.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
