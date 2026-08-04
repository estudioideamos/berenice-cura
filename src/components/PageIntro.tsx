type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  index: string;
};

export function PageIntro({ eyebrow, title, description, index }: PageIntroProps) {
  return (
    <header className="page-intro">
      <div className="shell page-intro__grid">
        <p className="page-intro__index" aria-hidden="true">{index}</p>
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
        </div>
        <p className="page-intro__description">{description}</p>
      </div>
    </header>
  );
}
