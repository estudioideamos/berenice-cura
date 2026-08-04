import { useEffect } from "react";
import { AudienceExplorer } from "./components/AudienceExplorer";
import { BookVisual } from "./components/BookVisual";
import { Footer } from "./components/Footer";
import { FragmentReader } from "./components/FragmentReader";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ListeningAtlas } from "./components/ListeningAtlas";
import { SectionHeading } from "./components/SectionHeading";
import { association, book, contact, contactMessages, whatsappUrl } from "./data/content";
import { impactRoute } from "./data/experience";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

export function App() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1, rootMargin: "0px 0px -5%" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--scroll-progress", String(total > 0 ? window.scrollY / total : 0));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header />
      <main id="contenido">
        <Hero />

        <section className="association association--lead section" id="asociacion" aria-labelledby="association-title">
          <div className="shell association__masthead">
            <div data-reveal>
              <p className="eyebrow">La asociación · {association.since}</p>
              <h2 id="association-title">Una comunidad que <em>cruza puentes.</em></h2>
            </div>
            <p className="association__lead" data-reveal>{association.description}</p>
          </div>

          <div className="shell impact-route" aria-label="Ruta hacia una comunicación accesible" data-reveal>
            <div className="impact-route__title"><span>Ruta de impacto</span><strong>{association.concept}</strong></div>
            <ol>
              {impactRoute.map((step) => <li key={step.number}><span>{step.number}</span><strong>{step.label}</strong><p>{step.text}</p></li>)}
            </ol>
          </div>

          <div className="shell association__program" id="acciones" data-reveal>
            <div>
              <p className="eyebrow">Qué hacemos</p>
              <h3>Acciones que vuelven posible la participación.</h3>
              <ul className="association__activities">
                {association.activities.map((activity, index) => <li key={activity}><span>0{index + 1}</span>{activity}</li>)}
              </ul>
              <a className="button button--line" href={whatsappUrl(contactMessages.association, 1)} target="_blank" rel="noreferrer">Contactar a la asociación <span aria-hidden="true">↗</span></a>
            </div>
            <div className="association__gallery" aria-label="Materiales de sensibilización">
              <figure className="gallery-card gallery-card--large"><img src={asset("sin-subtitulos.webp")} width="720" height="1020" loading="lazy" alt="Pieza de sensibilización sobre el derecho a contar con subtítulos" /><figcaption>Accesibilidad en la comunicación</figcaption></figure>
              <figure className="gallery-card"><img src={asset("derechos-personas-discapacidad.webp")} width="720" height="1002" loading="lazy" alt="Pieza educativa sobre los derechos de las personas con discapacidad" /><figcaption>Derechos y participación</figcaption></figure>
              <figure className="gallery-card"><img src={asset("todos-tenemos-derechos.webp")} width="714" height="996" loading="lazy" alt="Pieza educativa titulada Todos tenemos derechos" /><figcaption>Sensibilización comunitaria</figcaption></figure>
            </div>
          </div>
        </section>

        <section className="listening section" id="manifiesto" aria-labelledby="listening-title">
          <div className="shell listening__header" data-reveal>
            <p className="eyebrow">Anatomía de la escucha</p>
            <h2 id="listening-title">La comunicación es un sistema de <em>conexiones.</em></h2>
            <p>La accesibilidad comunicacional también se construye con la mirada, las manos, la presencia y la empatía. Explorá cada punto del mapa.</p>
          </div>
          <div className="shell"><ListeningAtlas /></div>
        </section>

        <section className="hands-brand section" id="primero-mis-manos" aria-labelledby="hands-brand-title">
          <div className="shell hands-brand__grid">
            <div className="hands-brand__mark" data-reveal><span aria-hidden="true">Identidad / 01</span><img src={asset("logo-primero-mis-manos.webp")} width="720" height="498" loading="lazy" alt="Logo original de Primero Mis Manos, Lengua de Señas Argentina" /></div>
            <div className="hands-brand__content">
              <p className="eyebrow" data-reveal>Una identidad propia</p>
              <h2 id="hands-brand-title" data-reveal>Primero<br /><em>Mis Manos</em></h2>
              <p data-reveal>Las manos como lenguaje, identidad y puente: una iniciativa vinculada con la Lengua de Señas Argentina y el propósito de la asociación.</p>
              <small data-reveal>Marca registrada con derechos de autor.</small>
            </div>
          </div>
        </section>

        <section className="book-section section" id="el-libro" aria-labelledby="book-title">
          <div className="book-section__index" aria-hidden="true">Una publicación del ecosistema</div>
          <div className="shell book-section__grid">
            <div className="book-section__visual" data-reveal><div className="book-section__halo" aria-hidden="true" /><BookVisual compact /><p className="visual-caption">Objeto editorial · Portada y contratapa reales</p></div>
            <div className="book-section__content">
              <SectionHeading eyebrow="El libro" title={`${book.title}: ${book.subtitle}`} light />
              <p className="book-section__lead" data-reveal>{book.description}</p>
              <p data-reveal>{book.purpose}</p>
              <div className="topic-matrix" aria-label="Temas principales" data-reveal>{book.topics.map((topic, index) => <span key={topic}><i>{String(index + 1).padStart(2, "0")}</i>{topic}</span>)}</div>
              <a className="button button--light" href={whatsappUrl(contactMessages.book)} target="_blank" rel="noreferrer" data-reveal>Consultar por el libro <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className="purpose section" id="proposito" aria-labelledby="purpose-title">
          <div className="shell purpose__intro"><SectionHeading eyebrow="A quiénes acompaña" title="Un libro para construir puentes" description="Reflexiones y herramientas para transformar la forma en que aprendemos, acompañamos y hacemos posible la participación." /></div>
          <div className="shell"><AudienceExplorer /></div>
        </section>

        <section className="author section" id="berenice" aria-labelledby="author-title">
          <div className="shell author__grid">
            <div className="author__visual" data-reveal>
              <div className="author__portrait"><img src={asset("berenice-cura.webp")} width="549" height="1024" loading="lazy" alt="Retrato de Berenice Cura sonriendo, con la mano apoyada bajo el rostro" /></div>
              <div className="author__context"><img src={asset("berenice-presentacion.webp")} width="1024" height="682" loading="lazy" alt="Berenice Cura durante una presentación" /></div>
              <span className="author__visual-label">Comunicación · educación · accesibilidad</span>
            </div>
            <div className="author__content">
              <SectionHeading eyebrow="Fundadora y presidenta" title="Berenice Cura" />
              <p className="author__lead" data-reveal>Referente en accesibilidad comunicacional e inclusión de personas sordas e hipoacúsicas. Desde su experiencia personal con la hipoacusia y su compromiso con la educación, impulsa una sociedad donde la comunicación sea un derecho para todas las personas.</p>
              <ol className="author__facts" data-reveal>
                <li><span>01</span><p>Fundadora y presidenta de la Asociación Civil Comunidad Sorda e Hipoacúsica Tandilense.</p></li>
                <li><span>02</span><p>Comunicadora en Lengua de Señas Argentina.</p></li>
                <li><span>03</span><p>Impulsa concientización, capacitación y promoción de la LSA en ámbitos educativos y sociales.</p></li>
              </ol>
              <blockquote data-reveal>“La inclusión comienza cuando aprendemos a comunicarnos sin dejar a nadie afuera.”</blockquote>
            </div>
          </div>
        </section>

        <section className="fragments section" id="fragmentos" aria-labelledby="fragments-title">
          <div className="shell fragments__header"><SectionHeading eyebrow="Lector de fragmentos" title="Palabras para leer con otros sentidos" light /><p data-reveal>Frases reales de la contratapa del libro.</p></div>
          <div className="shell"><FragmentReader /></div>
        </section>

        <section className="contact section" id="contacto" aria-labelledby="contact-title">
          <div className="shell contact__header">
            <SectionHeading eyebrow="Abrir una conversación" title="Construyamos comunicación accesible" description="Contactá a la asociación, consultá por talleres y capacitaciones, invitá a Berenice o preguntá por el libro." />
            <div className="contact__qr" data-reveal><a href={contact.instagram.url} target="_blank" rel="noreferrer" aria-label="Abrir Instagram de la asociación"><img src={asset("qr-instagram.webp")} width="720" height="946" loading="lazy" alt="Código QR del Instagram de la asociación" /></a><p>Escaneá para conocer<br /><strong>{contact.instagram.handle}</strong></p></div>
          </div>
          <div className="shell contact__actions">
            <a className="contact-card contact-card--primary" href={whatsappUrl(contactMessages.association, 1)} target="_blank" rel="noreferrer" data-reveal><span>01 / Asociación</span><strong>Conocer y participar</strong><small>WhatsApp · {contact.phones[1].display}</small><i aria-hidden="true">↗</i></a>
            <a className="contact-card" href={whatsappUrl(contactMessages.training, 1)} target="_blank" rel="noreferrer" data-reveal><span>02 / Capacitaciones</span><strong>Solicitar información</strong><small>Accesibilidad y Lengua de Señas Argentina</small><i aria-hidden="true">↗</i></a>
            <a className="contact-card" href={whatsappUrl(contactMessages.activity)} target="_blank" rel="noreferrer" data-reveal><span>03 / Actividades</span><strong>Invitar a Berenice</strong><small>Encuentros y sensibilización</small><i aria-hidden="true">↗</i></a>
            <a className="contact-card" href={whatsappUrl(contactMessages.book)} target="_blank" rel="noreferrer" data-reveal><span>04 / Libro</span><strong>Consultar por un ejemplar</strong><small>WhatsApp · {contact.phones[0].display}</small><i aria-hidden="true">↗</i></a>
          </div>
          <div className="shell contact__social" data-reveal><span>Contacto</span><a href={`mailto:${contact.email}`}>{contact.email}</a><a href={contact.instagram.url} target="_blank" rel="noreferrer">Instagram {contact.instagram.handle}</a><a href={contact.facebook.url} target="_blank" rel="noreferrer">Facebook {contact.facebook.label}</a></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
