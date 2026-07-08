interface BestForCardsProps {
  items: { title: string; description: string; icon: string }[];
}

export function BestForCards({ items }: BestForCardsProps) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-6">Best For</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex gap-4 p-5 bg-white rounded-2xl border border-sky-blue/20 shadow-sm"
          >
            <span className="text-3xl shrink-0">{item.icon}</span>
            <div>
              <h3 className="font-extrabold text-lake-blue mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
