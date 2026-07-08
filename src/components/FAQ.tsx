interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
  title?: string;
}

export function FAQ({ faqs, title = "Frequently Asked Questions" }: FAQProps) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-6">{title}</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group bg-white rounded-2xl border border-sky-blue/20 shadow-sm overflow-hidden"
          >
            <summary className="flex items-center justify-between cursor-pointer p-5 font-bold text-lake-blue hover:bg-light-blue/50 transition-colors list-none">
              {faq.question}
              <span className="ml-4 text-sky-blue group-open:rotate-180 transition-transform shrink-0">
                ▼
              </span>
            </summary>
            <div className="px-5 pb-5 text-gray-600 leading-relaxed">{faq.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
