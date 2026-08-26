import { Icon, type IconName } from "../components/Icons";
import { PageIntro } from "../components/PageIntro";
import { pageUrl } from "../utils/routes";
import { book, contactMessages, whatsappUrl } from "../data/content";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

const pillars: Array<{ icon: IconName; label: string; detail: string }> = [
  { icon: "identidad", label: "Autora", detail: `${book.author}, fundadora de la asociación y comunicadora en Lengua de Señas Argentina.` },
  { icon: "comunicacion", label: "Contenido", detail: "Reflexiones y herramientas para docentes, familias e instituciones." },
  { icon: "conexion", label: "Disponibilidad", detail: "Edición coordinada directamente con la asociación." },
];

export function StorePage() {
  return (
    <main id="contenido" className="internal-page store-page">
      <PageIntro
        index="07"
        eyebrow="Publicaciones · Materiales"
        title="Tienda"
        description="Accedé al libro de Berenice Cura y a los materiales que la asociación pone a disposición de instituciones y familias."
      />

      <section className="brand-page__feature section" aria-labelledby="store-book-title">
        <div className="shell brand-page__grid">
          <figure className="brand-page__visual" data-reveal>
            <img src={asset("tienda-editorial.webp")} width="1536" height="1536" alt="Ilustración editorial de un libro abierto con luz cálida" />
            <figcaption>Escuchar en otros sentidos · Primero mis manos</figcaption>
          </figure>
          <div data-reveal>
            <p className="eyebrow">El libro</p>
            <h2 id="store-book-title">Escuchar en otros sentidos, disponible para vos.</h2>
            <p className="brand-page__lead">{book.description}</p>
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
            <div className="store-page__actions">
              <a className="button button--signal" href={whatsappUrl(contactMessages.book)} target="_blank" rel="noreferrer">Consultar por el libro <span aria-hidden="true">↗</span></a>
              <a className="text-link" href={pageUrl("libro")}>Conocer el libro en profundidad <span aria-hidden="true">→</span></a>
            </div>
            <small>Precio y disponibilidad a confirmar · Edición coordinada con la asociación.</small>
          </div>
        </div>
      </section>

      <section className="brand-page__bridge section">
        <div className="shell brand-page__bridge-grid">
          <img src={asset("todos-tenemos-derechos.webp")} width="1536" height="1024" loading="lazy" alt="Ilustración editorial sobre los derechos de las personas con discapacidad auditiva" />
          <div data-reveal>
            <p className="eyebrow">Para instituciones</p>
            <h2>Materiales de sensibilización</h2>
            <p>Compartimos piezas pensadas para acompañar charlas, capacitaciones y espacios educativos sobre accesibilidad comunicacional.</p>
            <a className="button button--light" href={whatsappUrl(contactMessages.materials)} target="_blank" rel="noreferrer">Solicitar materiales <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}
