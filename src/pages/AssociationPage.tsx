import { useState } from "react";
import { Icon, type IconName } from "../components/Icons";
import { ImageLightbox } from "../components/ImageLightbox";
import { ListeningAtlas } from "../components/ListeningAtlas";
import { PageIntro } from "../components/PageIntro";
import { association, contactMessages, whatsappUrl } from "../data/content";
import { impactRoute } from "../data/experience";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
const impactIcons: IconName[] = ["reconocer", "conexion", "construir", "participar"];
const activityIcons: IconName[] = ["manos", "capacitaciones", "sensibilizacion", "proyectos"];
const resources = [
  {
    title: "Accesibilidad en la comunicación",
    text: "Por qué la falta de subtítulos vulnera el derecho a la información y a la participación plena.",
    image: "sin-subtitulos.webp",
  },
  {
    title: "Derechos y participación",
    text: "Los diez derechos de las personas con discapacidad auditiva, explicados de forma clara.",
    image: "derechos-personas-discapacidad.webp",
  },
  {
    title: "Sensibilización comunitaria",
    text: "Una guía visual para conocer y ejercer estos derechos en el día a día.",
    image: "todos-tenemos-derechos.webp",
  },
] as const;

export function AssociationPage() {
  const [openResource, setOpenResource] = useState<(typeof resources)[number] | null>(null);

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
          <figure className="association-page__visual" data-reveal>
            <img src={asset("asociacion-mision.webp")} width="1536" height="1536" loading="lazy" alt="Ilustración editorial de dos puentes que conectan una comunidad" />
            <figcaption>Ilustración editorial · comunidad y conexión</figcaption>
          </figure>
          <div data-reveal>
            <p className="eyebrow">Misión</p>
            <h2 id="mission-title">Eliminar barreras. Abrir oportunidades. Hacer posible la participación.</h2>
            <div className="association-page__about">
              {association.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </div>
        <div className="shell impact-route" aria-label="Ruta hacia una comunicación accesible" data-reveal>
          <div className="impact-route__title"><span>Ruta de impacto</span><strong>{association.concept}</strong></div>
          <ol>
            {impactRoute.map((step, index) => (
              <li key={step.number}>
                <span aria-hidden="true">{step.number}</span>
                <Icon type={impactIcons[index]} />
                <strong>{step.label}</strong>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="association-page__actions section" id="acciones" aria-labelledby="actions-title">
        <div className="shell association__program">
          <div>
            <p className="eyebrow">Qué hacemos</p>
            <h2 id="actions-title">Acciones que vuelven posible la participación.</h2>
            <ul className="association__activities">
              {association.activities.map((activity, index) => (
                <li key={activity}>
                  <span aria-hidden="true"><Icon type={activityIcons[index]} /></span>
                  {activity}
                </li>
              ))}
            </ul>
            <a className="button button--line" href={whatsappUrl(contactMessages.association, 1)} target="_blank" rel="noreferrer">Contactar a la asociación <span aria-hidden="true">↗</span></a>
          </div>
          <ol className="association__resources" aria-label="Materiales de sensibilización">
            {resources.map((resource, index) => (
              <li key={resource.title}>
                <img src={asset(resource.image)} width="80" height="80" loading="lazy" alt="" aria-hidden="true" />
                <div>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{resource.title}</strong>
                  <p>{resource.text}</p>
                  <button type="button" onClick={() => setOpenResource(resource)}>Ver material completo <span aria-hidden="true">↗</span></button>
                </div>
              </li>
            ))}
          </ol>
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

      {openResource ? (
        <ImageLightbox
          src={asset(openResource.image)}
          alt={openResource.title}
          caption={openResource.title}
          onClose={() => setOpenResource(null)}
        />
      ) : null}
    </main>
  );
}
