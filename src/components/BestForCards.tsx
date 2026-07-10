interface BestForCardsProps {
  items: { title: string; description: string; icon: string }[];
}

export function BestForCards({ items }: BestForCardsProps) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-6">Best For</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div
            key={item.title}
            className="group relative overflow-hidden p-6 bg-white rounded-2xl border border-sky-blue/20 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-sky-blue to-coral opacity-80" />
            <span className="text-xs font-bold tracking-widest uppercase text-sky-blue mb-2 block">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-extrabold text-lake-blue mb-1.5 text-lg">{item.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
