import { association, book, contact } from "../data/content";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__grid">
        <div>
          <p className="footer__title">{association.name}</p>
          <p>{association.since} · Tandil</p>
        </div>
        <div>
          <p className="footer__label">Contacto</p>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={`tel:+${contact.phones[1].international}`}>{contact.phones[1].display}</a>
        </div>
        <div>
          <p className="footer__label">También en este sitio</p>
          <a href="#el-libro">{book.title}</a>
          <a href="#berenice">Berenice Cura</a>
        </div>
      </div>
      <div className="shell footer__bottom">
        <p>© {new Date().getFullYear()} {association.name}.</p>
        <p>“Primero Mis Manos” es una marca registrada con derechos de autor.</p>
      </div>
    </footer>
  );
}
