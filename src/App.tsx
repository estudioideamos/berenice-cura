import { useEffect, type CSSProperties } from "react";
import { BookVisual } from "./components/BookVisual";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SectionHeading } from "./components/SectionHeading";
import {
  association,
  audiences,
  book,
  contact,
  contactMessages,
  fragments,
  manifesto,
  whatsappUrl,
} from "./data/content";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

export function App() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -7%" },
    );
    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      document.documentElement.style.setProperty("--scroll-progress", String(progress));
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header />
      <main id="contenido">
        <Hero />

        <section className="manifesto section" id="manifiesto" aria-labelledby="manifesto-title">
          <div className="shell manifesto__intro" data-reveal>
            <p className="eyebrow">Otra forma de escuchar</p>
            <h2 id="manifesto-title">La comunicación vive en cada mirada y movimiento.</h2>
            <p>
              Escuchar también puede ser prestar atención, comprender una experiencia diferente y
              reconocer que las manos, el cuerpo y la presencia construyen sentido.
            </p>
          </div>
          <div className="shell manifesto__sequence">
            {manifesto.map((item, index) => (
              <div className="manifesto__item" data-reveal key={item.word} style={{ "--delay": `${index * 80}ms` } as CSSProperties}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.word}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="book-section section" id="el-libro" aria-labelledby="book-title">
          <div className="shell book-section__grid">
            <div className="book-section__visual" data-reveal>
              <BookVisual compact />
              <p className="visual-caption">Portada y contratapa reales del libro.</p>
            </div>
            <div className="book-section__content">
              <SectionHeading eyebrow="El libro" title={`${book.title}: ${book.subtitle}`} light />
              <p className="book-section__lead" data-reveal>{book.description}</p>
              <p data-reveal>{book.purpose}</p>
              <ul className="topic-list" aria-label="Temas principales" data-reveal>
                {book.topics.map((topic) => <li key={topic}>{topic}</li>)}
              </ul>
              <a
                className="button button--light"
                href={whatsappUrl(contactMessages.book)}
                target="_blank"
                rel="noreferrer"
                data-reveal
              >
                Consultar por el libro <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="purpose section" id="proposito" aria-labelledby="purpose-title">
          <div className="shell">
            <SectionHeading
              eyebrow="Su propósito"
              title="Un libro para construir puentes"
              description="Una herramienta y una invitación a transformar la forma en que aprendemos, acompañamos y hacemos posible la participación."
            />
            <div className="audience-grid">
              {audiences.map((audience, index) => (
                <article className="audience-card" data-reveal key={audience.title} style={{ "--delay": `${index * 70}ms` } as CSSProperties}>
                  <span>{audience.number}</span>
                  <h3>{audience.title}</h3>
                  <p>{audience.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="author section" id="berenice" aria-labelledby="author-title">
          <div className="shell author__grid">
            <div className="author__portrait" data-reveal>
              <div className="author__frame">
                <img
                  src={asset("berenice-cura.webp")}
                  width="549"
                  height="1024"
                  loading="lazy"
                  alt="Retrato de Berenice Cura sonriendo, con la mano apoyada bajo el rostro"
                />
              </div>
              <p>Comunicación · educación · accesibilidad</p>
            </div>
            <div className="author__content">
              <SectionHeading eyebrow="La autora" title="Berenice Cura" />
              <p className="author__lead" data-reveal>
                Referente en accesibilidad comunicacional e inclusión de personas sordas e hipoacúsicas.
                Desde su experiencia personal con la hipoacusia y su compromiso con la educación,
                impulsa una sociedad donde la comunicación sea un derecho para todas las personas.
              </p>
              <div className="author__facts" data-reveal>
                <p>Fundadora y presidenta de la Asociación Civil Comunidad Sorda e Hipoacúsica Tandilense.</p>
                <p>Comunicadora en Lengua de Señas Argentina.</p>
                <p>Desarrolla acciones de concientización, capacitación y promoción de la LSA en ámbitos educativos y sociales.</p>
              </div>
              <blockquote data-reveal>“La inclusión comienza cuando aprendemos a comunicarnos sin dejar a nadie afuera.”</blockquote>
            </div>
          </div>
        </section>

        <section className="association section" id="asociacion" aria-labelledby="association-title">
          <div className="shell association__grid">
            <div className="association__content">
              <img
                className="association__logo"
                src={asset("logo-asociacion.webp")}
                width="720"
                height="411"
                loading="lazy"
                alt="Logo de la Asociación Civil Comunidad Sorda e Hipoacúsica Tandilense"
                data-reveal
              />
              <p className="eyebrow" data-reveal>{association.since} · Accesibilidad comunicacional</p>
              <h2 id="association-title" data-reveal>{association.name}</h2>
              <p className="association__lead" data-reveal>{association.description}</p>
              <ul className="association__activities" data-reveal>
                {association.activities.map((activity) => <li key={activity}>{activity}</li>)}
              </ul>
              <div className="crossing-bridges" data-reveal>
                <span>Proyecto e iniciativa</span>
                <strong>{association.concept}</strong>
                <p>El trabajo colectivo continúa el propósito del libro: acercar, sensibilizar y abrir caminos de comunicación.</p>
              </div>
              <a
                className="button"
                href={whatsappUrl(contactMessages.association, 1)}
                target="_blank"
                rel="noreferrer"
                data-reveal
              >
                Conocer o contactar a la asociación
              </a>
            </div>
            <div className="association__gallery" aria-label="Materiales de sensibilización" data-reveal>
              <figure className="gallery-card gallery-card--large">
                <img src={asset("sin-subtitulos.webp")} width="720" height="1020" loading="lazy" alt="Pieza de sensibilización sobre el derecho a contar con subtítulos" />
                <figcaption>Accesibilidad en la comunicación</figcaption>
              </figure>
              <figure className="gallery-card">
                <img src={asset("derechos-personas-discapacidad.webp")} width="720" height="1002" loading="lazy" alt="Pieza educativa sobre los derechos de las personas con discapacidad" />
                <figcaption>Derechos y participación</figcaption>
              </figure>
              <figure className="gallery-card">
                <img src={asset("todos-tenemos-derechos.webp")} width="714" height="996" loading="lazy" alt="Pieza educativa titulada Todos tenemos derechos" />
                <figcaption>Sensibilización comunitaria</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="hands-brand section" aria-labelledby="hands-brand-title">
          <div className="shell hands-brand__grid">
            <div data-reveal>
              <img
                src={asset("logo-primero-mis-manos.webp")}
                width="720"
                height="498"
                loading="lazy"
                alt="Logo original de Primero Mis Manos, Lengua de Señas Argentina"
              />
            </div>
            <div>
              <p className="eyebrow" data-reveal>Identidad y comunicación</p>
              <h2 id="hands-brand-title" data-reveal>Primero Mis Manos</h2>
              <p data-reveal>
                Las manos como lenguaje, identidad y puente: un concepto que enlaza la Lengua de Señas Argentina con el corazón del libro.
              </p>
              <small data-reveal>Marca registrada con derechos de autor.</small>
            </div>
          </div>
        </section>

        <section className="fragments section" id="fragmentos" aria-labelledby="fragments-title">
          <div className="shell">
            <SectionHeading eyebrow="Fragmentos" title="Palabras para leer con otros sentidos" light />
            <div className="fragments__list">
              {fragments.map((fragment, index) => (
                <blockquote data-reveal key={fragment}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>“{fragment}”</p>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section" id="contacto" aria-labelledby="contact-title">
          <div className="shell">
            <div className="contact__header">
              <SectionHeading
                eyebrow="Contacto y adquisición"
                title="Empecemos a escuchar en otros sentidos"
                description="Para consultar por el libro, invitar a Berenice a una actividad, solicitar una capacitación o acercarse al trabajo de la asociación."
              />
              <div className="contact__qr" data-reveal>
                <a href={contact.instagram.url} target="_blank" rel="noreferrer" aria-label="Abrir Instagram de la asociación">
                  <img src={asset("qr-instagram.webp")} width="720" height="946" loading="lazy" alt="Código QR del Instagram de la asociación" />
                </a>
                <p>Instagram<br /><strong>{contact.instagram.handle}</strong></p>
              </div>
            </div>
            <div className="contact__actions">
              <a className="contact-card contact-card--primary" href={whatsappUrl(contactMessages.book)} target="_blank" rel="noreferrer" data-reveal>
                <span>Libro</span>
                <strong>Consultar por un ejemplar</strong>
                <small>WhatsApp · {contact.phones[0].display}</small>
                <i aria-hidden="true">↗</i>
              </a>
              <a className="contact-card" href={whatsappUrl(contactMessages.activity)} target="_blank" rel="noreferrer" data-reveal>
                <span>Actividades</span>
                <strong>Invitar a Berenice</strong>
                <small>Encuentros y acciones de sensibilización</small>
                <i aria-hidden="true">↗</i>
              </a>
              <a className="contact-card" href={whatsappUrl(contactMessages.training, 1)} target="_blank" rel="noreferrer" data-reveal>
                <span>Capacitaciones</span>
                <strong>Solicitar información</strong>
                <small>WhatsApp · {contact.phones[1].display}</small>
                <i aria-hidden="true">↗</i>
              </a>
              <a className="contact-card" href={`mailto:${contact.email}?subject=${encodeURIComponent("Consulta desde el sitio de Berenice Cura")}`} data-reveal>
                <span>Correo</span>
                <strong>Escribir a la asociación</strong>
                <small>{contact.email}</small>
                <i aria-hidden="true">↗</i>
              </a>
            </div>
            <div className="contact__social" data-reveal>
              <span>También en</span>
              <a href={contact.instagram.url} target="_blank" rel="noreferrer">Instagram {contact.instagram.handle}</a>
              <a href={contact.facebook.url} target="_blank" rel="noreferrer">Facebook {contact.facebook.label}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
