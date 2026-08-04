import { book, contact } from "../data/content";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__grid">
        <div>
          <p className="footer__title">{book.title}</p>
          <p>{book.subtitle} · {book.author}</p>
        </div>
        <div>
          <p className="footer__label">Contacto</p>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={`tel:+${contact.phones[0].international}`}>{contact.phones[0].display}</a>
        </div>
        <div>
          <p className="footer__label">Comunidad</p>
          <a href={contact.instagram.url} target="_blank" rel="noreferrer">Instagram</a>
          <a href={contact.facebook.url} target="_blank" rel="noreferrer">Facebook</a>
        </div>
      </div>
      <div className="shell footer__bottom">
        <p>© {new Date().getFullYear()} Berenice Cura. Todos los derechos reservados.</p>
        <p>“Primero Mis Manos” es una marca registrada con derechos de autor.</p>
      </div>
    </footer>
  );
}
