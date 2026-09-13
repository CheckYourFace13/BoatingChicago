import { buildFAQSchema } from "@/lib/schema";
import type { CategoryFAQ } from "@/types";

interface FAQSchemaProps {
  faqs: CategoryFAQ[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  if (!faqs.length) return null;
  const schema = buildFAQSchema(faqs);
  if (!schema) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
