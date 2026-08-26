import { PageIntro } from "../components/PageIntro";
import { products } from "../data/content";
import { pageUrl } from "../utils/routes";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

export function StorePage() {
  return (
    <main id="contenido" className="internal-page store-page">
      <PageIntro
        index="07"
        eyebrow="Publicaciones"
        title="Tienda"
        description="Accedé a las publicaciones de Berenice Cura."
      />

      <section className="store-catalog section" aria-labelledby="store-catalog-title">
        <div className="shell">
          <h2 id="store-catalog-title" className="sr-only">Publicaciones disponibles</h2>
          <div className="store-grid">
            {products.map((product) => (
              <a className="store-card" key={product.slug} href={pageUrl(product.page)} data-reveal>
                <div className="store-card__cover">
                  <img src={asset(product.image)} width={product.imageWidth} height={product.imageHeight} loading="lazy" alt={`Tapa de ${product.title}`} />
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
    </main>
  );
}
