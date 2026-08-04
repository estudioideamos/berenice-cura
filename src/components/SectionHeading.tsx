type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
};

const headingIds: Record<string, string> = {
  "El libro": "book-title",
  "Su propósito": "purpose-title",
  "La autora": "author-title",
  Fragmentos: "fragments-title",
  "Contacto y adquisición": "contact-title",
};

export function SectionHeading({ eyebrow, title, description, light = false }: SectionHeadingProps) {
  return (
    <header className={`section-heading${light ? " section-heading--light" : ""}`} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={headingIds[eyebrow]}>{title}</h2>
      {description ? <p className="section-heading__description">{description}</p> : null}
    </header>
  );
}
