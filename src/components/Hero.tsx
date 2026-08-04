import { book, contactMessages, whatsappUrl } from "../data/content";
import { BookVisual } from "./BookVisual";

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero__orb hero__orb--one" aria-hidden="true" />
      <div className="hero__orb hero__orb--two" aria-hidden="true" />
      <div className="shell hero__grid">
        <div className="hero__content">
          <p className="hero__question" data-hero-item>¿Y si escuchar no empezara por los oídos?</p>
          <div className="hero__rule" aria-hidden="true" />
          <h1 id="hero-title" data-hero-item>
            <span>{book.title}</span>
            <em>{book.subtitle}</em>
          </h1>
          <p className="hero__cover-line" data-hero-item>“{book.coverLine}”</p>
          <p className="hero__author" data-hero-item>Un libro de <strong>{book.author}</strong></p>
          <div className="hero__actions" data-hero-item>
            <a className="button" href="#el-libro">Conocer el libro</a>
            <a className="button button--ghost" href="#asociacion">Ver la asociación</a>
            <a
              className="text-link"
              href={whatsappUrl(contactMessages.book)}
              target="_blank"
              rel="noreferrer"
            >
              Contactar <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="hero__visual" data-hero-item>
          <p className="hero__side-note" aria-hidden="true">Mirar · sentir · conectar</p>
          <BookVisual />
        </div>
      </div>
      <a className="hero__scroll" href="#manifiesto">
        <span aria-hidden="true" />
        Seguir leyendo
      </a>
    </section>
  );
}
