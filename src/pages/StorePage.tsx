import { PageIntro } from "../components/PageIntro";
import { products, contactMessages, whatsappUrl } from "../data/content";
import { pageUrl } from "../utils/routes";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

export function StorePage() {
  return (
    <main id="contenido" className="internal-page store-page">
      <PageIntro
        index="07"
        eyebrow="Publicaciones · Materiales"
        title="Tienda"
        description="Accedé a las publicaciones de Berenice Cura y a los materiales que la asociación pone a disposición de instituciones y familias."
      />

      <section className="store-catalog section" aria-labelledby="store-catalog-title">
        <div className="shell">
          <h2 id="store-catalog-title" className="sr-only">Publicaciones disponibles</h2>
          <div className="store-grid">
            {products.map((product) => (
              <a className="store-card" key={product.slug} href={pageUrl(product.page)} data-reveal>
                <div className="store-card__cover">
                  <img src={asset(product.image)} width="1536" height="1536" loading="lazy" alt={`Ilustración de tapa de ${product.title}`} />
                </div>
                <p className="eyebrow">{product.subtitle}</p>
                <strong>{product.title}</strong>
                <p>{product.description}</p>
                <span className="store-card__cta">Ver publicación <span aria-hidden="true">→</span></span>
              </a>
            ))}
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
