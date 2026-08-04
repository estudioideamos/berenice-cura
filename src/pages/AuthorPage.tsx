import { PageIntro } from "../components/PageIntro";
import { pageUrl } from "../utils/routes";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

export function AuthorPage() {
  return (
    <main id="contenido" className="internal-page author-page">
      <PageIntro
        index="04"
        eyebrow="Fundadora y presidenta"
        title="Berenice Cura"
        description="Comunicadora en Lengua de Señas Argentina y referente en accesibilidad comunicacional e inclusión de personas sordas e hipoacúsicas."
      />

      <section className="author section" aria-labelledby="author-story-title">
        <div className="shell author__grid">
          <div className="author__visual">
            <div className="author__portrait"><img src={asset("berenice-cura.webp")} width="549" height="1024" alt="Retrato de Berenice Cura sonriendo, con la mano apoyada bajo el rostro" /></div>
            <div className="author__context"><img src={asset("berenice-presentacion.webp")} width="1024" height="682" loading="lazy" alt="Berenice Cura durante una presentación" /></div>
            <span className="author__visual-label">Comunicación · educación · accesibilidad</span>
          </div>
          <div className="author__content">
            <p className="eyebrow">Su trabajo</p>
            <h2 id="author-story-title">Comunicación como derecho.</h2>
            <p className="author__lead">Desde su experiencia personal con la hipoacusia y su compromiso con la educación, impulsa una sociedad donde la comunicación sea un derecho para todas las personas.</p>
            <ol className="author__facts">
              <li><span>01</span><p>Fundadora y presidenta de la Asociación Civil Comunidad Sorda e Hipoacúsica Tandilense.</p></li>
              <li><span>02</span><p>Comunicadora en Lengua de Señas Argentina.</p></li>
              <li><span>03</span><p>Impulsa concientización, capacitación y promoción de la LSA en ámbitos educativos y sociales.</p></li>
              <li><span>04</span><p>Comparte reflexiones y herramientas para docentes, familias e instituciones.</p></li>
            </ol>
            <blockquote>“La inclusión comienza cuando aprendemos a comunicarnos sin dejar a nadie afuera.”</blockquote>
          </div>
        </div>
      </section>

      <nav className="next-page shell" aria-label="Continuar recorriendo el sitio">
        <span>Conocé el eje central</span>
        <a href={pageUrl("asociacion")}>La asociación <i aria-hidden="true">→</i></a>
      </nav>
    </main>
  );
}
