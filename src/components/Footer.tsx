import { AssociationBrand } from "./AssociationBrand";
import { association, book, contact } from "../data/content";
import { pageUrl } from "../utils/routes";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__grid">
        <div>
          <AssociationBrand />
          <p>{association.since} · Tandil</p>
        </div>
        <div>
          <p className="footer__label">Recorridos</p>
          <a href={pageUrl("asociacion")}>La asociación</a>
          <a href={pageUrl("primero-mis-manos")}>Primero Mis Manos</a>
          <a href={pageUrl("libro")}>{book.title}</a>
          <a href={pageUrl("berenice")}>Berenice Cura</a>
        </div>
        <div>
          <p className="footer__label">Contacto</p>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={`tel:+${contact.phones[1].international}`}>{contact.phones[1].display}</a>
          <a href={contact.instagram.url} target="_blank" rel="noreferrer">Instagram {contact.instagram.handle}</a>
        </div>
      </div>
      <div className="shell footer__bottom">
        <p>© {new Date().getFullYear()} {association.name}.</p>
        <p>“Primero Mis Manos” es una marca registrada con derechos de autor.</p>
      </div>
    </footer>
  );
}
