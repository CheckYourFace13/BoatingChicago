import Link from "next/link";

interface GeoHeroProps {
  eyebrow: string;
  title: string;
  intro: string;
  links?: { label: string; href: string }[];
}

export function GeoHero({ eyebrow, title, intro, links = [] }: GeoHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-lake-blue via-lake-blue to-sky-blue text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <p className="text-sun-yellow font-bold text-sm tracking-widest uppercase mb-3">
          {eyebrow}
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 max-w-4xl">
          {title}
        </h1>
        <p className="text-white/90 text-lg max-w-3xl leading-relaxed">
          {intro}
        </p>
        {links.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  i === 0
                    ? "text-sun-yellow hover:underline"
                    : "text-white/90 hover:underline"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
