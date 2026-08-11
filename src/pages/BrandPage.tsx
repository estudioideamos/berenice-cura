import { ConceptTagIcon, type ConceptIcon } from "../components/AssociationIcons";
import { PageIntro } from "../components/PageIntro";
import { pageUrl } from "../utils/routes";
import { association, brand } from "../data/content";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
const pillarIcons: ConceptIcon[] = ["comunicacion", "lsa", "conexion"];

export function BrandPage() {
  return (
    <main id="contenido" className="internal-page brand-page">
      <PageIntro
        index="02"
        eyebrow="Identidad · Lengua de Señas Argentina"
        title="Primero Mis Manos"
        description="Las manos como lenguaje, identidad y puente hacia la Lengua de Señas Argentina."
      />

      <section className="brand-page__feature section" aria-labelledby="brand-meaning-title">
        <div className="shell brand-page__grid">
          <figure className="brand-page__visual" data-reveal>
            <img src={asset("primero-mis-manos-editorial.webp")} width="1536" height="1536" alt="Ilustración editorial de dos manos formando un corazón enmarcadas en un arco" />
            <figcaption>{brand.registration}</figcaption>
          </figure>
          <div data-reveal>
            <p className="eyebrow">Lo que expresa</p>
            <h2 id="brand-meaning-title">Las manos también hablan, sienten y construyen puentes.</h2>
            <p className="brand-page__lead">El concepto reúne comunicación, Lengua de Señas Argentina y conexión humana. También enlaza la identidad de la asociación con el libro de Berenice Cura.</p>
            <ul className="brand-page__pillars">
              {brand.pillars.map((pillar, index) => (
                <li key={pillar.label}>
                  <span aria-hidden="true"><ConceptTagIcon type={pillarIcons[index]} /></span>
                  <div>
                    <strong>{pillar.label}</strong>
                    <p>{pillar.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <small>Marca registrada con derechos de autor.</small>
          </div>
        </div>
      </section>

      <section className="brand-page__bridge section">
        <div className="shell brand-page__bridge-grid">
          <img src={asset("manos-conexion.webp")} width="1536" height="1024" loading="lazy" alt="Ilustración editorial de dos manos que se acercan" />
          <div data-reveal>
            <p className="eyebrow">Dentro del ecosistema</p>
            <h2>{association.concept}</h2>
            <p>Una forma de acercar, sensibilizar y abrir caminos de comunicación desde una identidad reconocible y propia.</p>
            <a className="button button--light" href={pageUrl("asociacion")}>Conocer la asociación <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}
