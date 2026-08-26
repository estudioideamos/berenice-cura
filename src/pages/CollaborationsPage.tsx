import { Icon, type IconName } from "../components/Icons";
import { PageIntro } from "../components/PageIntro";
import { contactMessages, donationUrl, whatsappUrl } from "../data/content";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

const pillars: Array<{ icon: IconName; label: string; detail: string }> = [
  { icon: "capacitaciones", label: "Talleres y capacitaciones", detail: "Financiás espacios de formación en Lengua de Señas Argentina." },
  { icon: "proyectos", label: "Materiales de sensibilización", detail: "Ayudás a producir piezas educativas para instituciones y familias." },
  { icon: "construir", label: "Proyectos educativos", detail: "Sostenés el trabajo territorial de la asociación en Tandil." },
];

export function CollaborationsPage() {
  return (
    <main id="contenido" className="internal-page collab-page">
      <PageIntro
        index="08"
        eyebrow="Sostené el proyecto"
        title="Colaboraciones"
        description="Tu aporte ayuda a sostener talleres, capacitaciones y materiales de la Asociación Civil Comunidad Sorda e Hipoacúsica Tandilense."
      />

      <section className="brand-page__feature section" aria-labelledby="collab-feature-title">
        <div className="shell brand-page__grid">
          <figure className="brand-page__visual" data-reveal>
            <img src={asset("colaboraciones-editorial.webp")} width="1536" height="1536" alt="Ilustración editorial de una mano entregando una luz cálida a otra mano" />
            <figcaption>Cada aporte, un puente</figcaption>
          </figure>
          <div data-reveal>
            <p className="eyebrow">Tu aporte</p>
            <h2 id="collab-feature-title">Un aporte que se convierte en puentes.</h2>
            <p className="brand-page__lead">Cada colaboración financia directamente los talleres de Lengua de Señas Argentina, las capacitaciones y los materiales de sensibilización que la asociación desarrolla en Tandil.</p>
            <ul className="brand-page__pillars">
              {pillars.map((pillar) => (
                <li key={pillar.label}>
                  <span aria-hidden="true"><Icon type={pillar.icon} /></span>
                  <div>
                    <strong>{pillar.label}</strong>
                    <p>{pillar.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a className="button button--signal collab-cta" href={donationUrl} target="_blank" rel="noreferrer">Donar por Mercado Pago <span aria-hidden="true">↗</span></a>
            <small>Donación segura y directa a través de Mercado Pago.</small>
          </div>
        </div>
      </section>

      <section className="brand-page__bridge section">
        <div className="shell brand-page__bridge-grid">
          <img src={asset("home-comunidad-editorial.webp")} width="1536" height="1024" loading="lazy" alt="Ilustración editorial de varias personas comunicándose mediante gestos y miradas" />
          <div data-reveal>
            <p className="eyebrow">Otras formas de ayudar</p>
            <h2>Ninguna colaboración es demasiado chica.</h2>
            <p>Si preferís colaborar con tiempo, materiales o difusión en vez de un aporte económico, también podés escribirnos.</p>
            <a className="button button--light" href={whatsappUrl(contactMessages.association, 1)} target="_blank" rel="noreferrer">Contactar a la asociación <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}
