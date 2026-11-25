/**
 * Authoritative bridge/lock planning notices only — no scraped schedules.
 * Dates and status come from USACE / USCG public notices; always re-check.
 */

const NOTICES = [
  {
    id: "chicago-harbor-lock-winter-2026",
    title: "Chicago Harbor Lock — winter closure window",
    summary:
      "U.S. Coast Guard District Local Notice and USACE materials describe a Chicago Harbor Lock closure to all navigation for chamber wall and floor repairs from November 15, 2026 through April 3, 2027 (River Mile 327). USACE’s project page also lists the 2026 recreational open window as April 15–November 14, 2026. Confirm the live navigation notice before you plan a lake–river transit.",
    links: [
      {
        label: "USACE — Chicago Harbor Lock project",
        href: "https://www.lrd.usace.army.mil/Missions/Projects/Display/Article/3638585/chicago-harbor-lock/",
      },
      {
        label: "USACE navigation notices portal",
        href: "https://ndc.ops.usace.army.mil/ords/r/ntni/notices/navigation-notices",
      },
      {
        label: "USCG GovDelivery bulletin (closure notice)",
        href: "https://content.govdelivery.com/accounts/USDHSCG/bulletins/430ee57",
      },
    ],
    verified: "2026-11-25",
  },
] as const;

export function BridgeLockNotices({
  showChicago = true,
}: {
  showChicago?: boolean;
}) {
  if (!showChicago) return null;

  return (
    <section
      id="bridge-lock-notices"
      className="rounded-2xl border border-amber-300/60 bg-amber-50/80 p-5 md:p-6"
    >
      <h2 className="text-xl md:text-2xl font-extrabold text-lake-blue mb-2">
        Bridge &amp; lock notices
      </h2>
      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
        Only notices backed by U.S. Army Corps of Engineers or U.S. Coast Guard
        public materials appear here. This is not a live lock schedule and does
        not replace Local Notices to Mariners.
      </p>
      <ul className="space-y-5">
        {NOTICES.map((n) => (
          <li key={n.id}>
            <h3 className="font-extrabold text-lake-blue">{n.title}</h3>
            <p className="text-sm text-gray-700 mt-1 leading-relaxed">
              {n.summary}
            </p>
            <ul className="mt-2 space-y-1">
              {n.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-lake-blue hover:underline"
                  >
                    {l.label} →
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-2">
              Sources checked {n.verified}. Re-verify before transit.
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
