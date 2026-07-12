import type { ReactNode } from "react";
import { BreadcrumbSchema } from "./BreadcrumbSchema";

interface LegalPageProps {
  title: string;
  description?: string;
  path: string;
  children: ReactNode;
}

export function LegalPage({ title, description, path, children }: LegalPageProps) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: title, path },
        ]}
      />
      <section className="bg-gradient-to-br from-lake-blue to-sky-blue text-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{title}</h1>
          {description ? (
            <p className="text-white/90 text-lg leading-relaxed">{description}</p>
          ) : null}
        </div>
      </section>
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 prose-legal">
        {children}
      </article>
    </>
  );
}
