import { buildBreadcrumbSchema } from "@/lib/schema";

interface BreadcrumbSchemaProps {
  items: { name: string; path: string }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  if (!items.length) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildBreadcrumbSchema(items)),
      }}
    />
  );
}
