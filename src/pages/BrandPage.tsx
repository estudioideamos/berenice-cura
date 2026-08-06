import { PageIntro } from "../components/PageIntro";
import { association } from "../data/content";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

export function BrandPage() {
  return (
    <main id="contenido" className="internal-page brand-page">
      <PageIntro
        index="02"
        eyebrow="Identidad · Lengua de Señas Argentina"
        title="Primero Mis Manos"
        description="Las manos como lenguaje, identidad y puente: una iniciativa vinculada con la Lengua de Señas Argentina y el propósito de la asociación."
      />

      <section className="brand-page__feature section" aria-labelledby="brand-meaning-title">
        <div className="shell brand-page__grid">
          <div className="brand-page__logo">
            <span aria-hidden="true">Identidad / 01</span>
            <img src={asset("logo-primero-mis-manos.webp")} width="720" height="498" alt="Logo original de Primero Mis Manos, Lengua de Señas Argentina" />
          </div>
          <div>
            <p className="eyebrow">Lo que expresa</p>
            <h2 id="brand-meaning-title">Las manos también hablan, sienten y construyen puentes.</h2>
            <p>El concepto reúne comunicación, Lengua de Señas Argentina y conexión humana. También enlaza la identidad de la asociación con el libro de Berenice Cura.</p>
            <small>Marca registrada con derechos de autor.</small>
          </div>
        </div>
      </section>

      <section className="brand-page__bridge section">
        <div className="shell brand-page__bridge-grid">
          <img src={asset("manos-conexion.webp")} width="1536" height="1024" loading="lazy" alt="Ilustración editorial de dos manos que se acercan" />
          <div>
            <p className="eyebrow">Dentro del ecosistema</p>
            <h2>{association.concept}</h2>
            <p>Una forma de acercar, sensibilizar y abrir caminos de comunicación desde una identidad reconocible y propia.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
