import { ListeningAtlas } from "../components/ListeningAtlas";
import { PageIntro } from "../components/PageIntro";
import { association, contactMessages, whatsappUrl } from "../data/content";
import { impactRoute } from "../data/experience";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

export function AssociationPage() {
  return (
    <main id="contenido" className="internal-page">
      <PageIntro
        index="01"
        eyebrow={`${association.since} · Tandil`}
        title="Una comunidad que cruza puentes."
        description="Promovemos la inclusión y la accesibilidad comunicacional en Tandil."
      />

      <section className="association-page__mission section" aria-labelledby="mission-title">
        <div className="shell association-page__statement">
          <p className="eyebrow">Misión</p>
          <div>
            <h2 id="mission-title">Eliminar barreras. Abrir oportunidades. Hacer posible la participación.</h2>
            <div className="association-page__about">
              {association.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </div>
        <div className="shell impact-route" aria-label="Ruta hacia una comunicación accesible">
          <div className="impact-route__title"><span>Ruta de impacto</span><strong>{association.concept}</strong></div>
          <ol>{impactRoute.map((step) => <li key={step.number}><span>{step.number}</span><strong>{step.label}</strong><p>{step.text}</p></li>)}</ol>
        </div>
      </section>

      <section className="association-page__actions section" id="acciones" aria-labelledby="actions-title">
        <div className="shell association__program">
          <div>
            <p className="eyebrow">Qué hacemos</p>
            <h2 id="actions-title">Acciones que vuelven posible la participación.</h2>
            <ul className="association__activities">
              {association.activities.map((activity, index) => <li key={activity}><span>0{index + 1}</span>{activity}</li>)}
            </ul>
            <a className="button button--line" href={whatsappUrl(contactMessages.association, 1)} target="_blank" rel="noreferrer">Contactar a la asociación <span aria-hidden="true">↗</span></a>
          </div>
          <div className="association__gallery" aria-label="Materiales de sensibilización">
            <figure className="gallery-card gallery-card--large"><img src={asset("sin-subtitulos.webp")} width="720" height="1020" loading="lazy" alt="Pieza de sensibilización sobre el derecho a contar con subtítulos" /><figcaption>Accesibilidad en la comunicación</figcaption></figure>
            <figure className="gallery-card"><img src={asset("derechos-personas-discapacidad.webp")} width="720" height="1002" loading="lazy" alt="Pieza educativa sobre derechos de las personas con discapacidad" /><figcaption>Derechos y participación</figcaption></figure>
            <figure className="gallery-card"><img src={asset("todos-tenemos-derechos.webp")} width="714" height="996" loading="lazy" alt="Pieza educativa titulada Todos tenemos derechos" /><figcaption>Sensibilización comunitaria</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="listening section" aria-labelledby="listening-title">
        <div className="shell listening__header">
          <p className="eyebrow">Anatomía de la escucha</p>
          <h2 id="listening-title">La comunicación es un sistema de <em>conexiones.</em></h2>
          <p>La accesibilidad comunicacional también se construye con la mirada, las manos, la presencia y la empatía.</p>
        </div>
        <div className="shell"><ListeningAtlas /></div>
      </section>
    </main>
  );
}
