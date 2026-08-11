import { Hero } from "../components/Hero";
import { HomeSignalIcon, type HomeSignal } from "../components/HomeSignalIcon";
import { association, book } from "../data/content";
import { pageUrl } from "../utils/routes";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

const signals: Array<{ number: string; label: string; detail: string; icon: HomeSignal }> = [
  { number: "01", label: "Mirada", detail: "Atención que reconoce.", icon: "mirada" },
  { number: "02", label: "Manos", detail: "Gestos que comunican.", icon: "manos" },
  { number: "03", label: "Presencia", detail: "Disponibilidad para conectar.", icon: "presencia" },
  { number: "04", label: "Empatía", detail: "Comprensión sin barreras.", icon: "empatia" },
];

export function HomePage() {
  return (
    <main id="contenido">
      <Hero />

      <section className="home-signals" aria-label="Formas de construir comunicación accesible">
        <ul className="shell">
          {signals.map((signal) => (
            <li key={signal.number}>
              <HomeSignalIcon signal={signal.icon} />
              <span>{signal.number}</span>
              <strong>{signal.label}</strong>
              <p>{signal.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-paths section" aria-labelledby="home-paths-title">
        <div className="shell home-paths__header">
          <p className="eyebrow">Un propósito · distintas expresiones</p>
          <h2 id="home-paths-title">Elegí por dónde conocer el proyecto.</h2>
          <p>Cada recorrido tiene su propia página para que la información sea clara, breve y fácil de encontrar.</p>
        </div>
        <div className="shell home-paths__grid">
          <a className="home-path home-path--association" href={pageUrl("asociacion")}>
            <span>01 / Eje central</span>
            <img className="home-path__cover" src={asset("home-asociacion-editorial.webp")} width="683" height="1024" loading="lazy" alt="" aria-hidden="true" />
            <strong>La asociación</strong>
            <p>{association.description}</p>
            <i aria-hidden="true">↗</i>
          </a>
          <a className="home-path home-path--brand" href={pageUrl("primero-mis-manos")}>
            <span>02 / Identidad</span>
            <img className="home-path__cover" src={asset("primero-mis-manos-editorial.webp")} width="1536" height="1536" loading="lazy" alt="" aria-hidden="true" />
            <strong>Primero Mis Manos</strong>
            <p>Lenguaje, identidad y conexión desde la Lengua de Señas Argentina.</p>
            <i aria-hidden="true">↗</i>
          </a>
          <a className="home-path home-path--book" href={pageUrl("libro")}>
            <span>03 / Publicación</span>
            <img className="home-path__cover" src={asset("book-cover.webp")} width="1024" height="1536" loading="lazy" alt="Portada del libro Escuchar en otros sentidos" />
            <strong>{book.title}</strong>
            <p>{book.subtitle} · Berenice Cura</p>
            <i aria-hidden="true">↗</i>
          </a>
        </div>
      </section>

      <section className="home-community section" aria-labelledby="home-community-title">
        <div className="shell home-community__grid">
          <figure className="home-community__visual">
            <img src={asset("home-comunidad-editorial.webp")} width="1536" height="1024" loading="lazy" alt="Ilustración editorial de varias personas comunicándose mediante gestos y miradas" />
            <figcaption>Ilustración editorial · comunidad y conexión</figcaption>
          </figure>
          <div className="home-community__content">
            <p className="eyebrow">Comunicación en movimiento</p>
            <h2 id="home-community-title">No existe una única forma de escuchar.</h2>
            <p>La accesibilidad comunicacional se construye cuando cada mirada, gesto y forma de expresarse encuentra un espacio real de participación.</p>
            <a className="button button--light" href={pageUrl("asociacion")}>Conocer nuestras acciones <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section className="home-people section" aria-labelledby="home-people-title">
        <div className="shell home-people__grid">
          <figure className="home-people__image">
            <img src={asset("berenice-home-editorial.webp")} width="1536" height="1024" loading="lazy" alt="Retrato editorial de Berenice Cura generado a partir de fotografías reales de referencia" />
            <figcaption>Retrato editorial generado a partir de fotografías reales de referencia.</figcaption>
          </figure>
          <div>
            <p className="eyebrow">Personas que impulsan comunidad</p>
            <h2 id="home-people-title">Berenice Cura</h2>
            <p>Fundadora y presidenta de la asociación, comunicadora en Lengua de Señas Argentina y referente en accesibilidad comunicacional.</p>
            <a className="button button--line" href={pageUrl("berenice")}>Conocer su recorrido <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="home-contact">
        <img className="home-contact__art" src={asset("home-fondo-conexion.webp")} width="1774" height="887" loading="lazy" alt="" aria-hidden="true" />
        <div className="shell home-contact__grid">
          <p>¿Querés participar, capacitarte o conocer el libro?</p>
          <a href={pageUrl("contacto")}>Abrir una conversación <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </main>
  );
}
