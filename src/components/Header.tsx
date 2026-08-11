import { useEffect, useState } from "react";
import { AssociationBrand } from "./AssociationBrand";
import { siteNavigation } from "../data/site";
import { contact } from "../data/content";
import { currentPage, pageUrl } from "../utils/routes";

export function Header() {
  const [open, setOpen] = useState(false);
  const activePage = currentPage();

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", open);
    return () => document.body.classList.remove("menu-is-open");
  }, [open]);

  return (
    <header className={`site-header${open ? " site-header--menu-open" : ""}`}>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="site-header__inner shell">
        <a className="wordmark" href={pageUrl("inicio")} aria-label="Ir al inicio">
          <AssociationBrand compact />
        </a>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((current) => !current)}>
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          <span aria-hidden="true" /><span aria-hidden="true" />
        </button>
        <nav id="primary-navigation" className={`primary-nav${open ? " is-open" : ""}`} aria-label="Navegación principal">
          <div className="primary-nav__glow" aria-hidden="true" />
          <ul>
            {siteNavigation.map((item, index) => (
              <li key={item.page}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <a href={pageUrl(item.page)} aria-current={activePage === item.page ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="primary-nav__footer">
            <a className="button button--signal" href={pageUrl("contacto")} aria-current={activePage === "contacto" ? "page" : undefined} onClick={() => setOpen(false)}>Contacto</a>
            <div className="primary-nav__contact">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:+${contact.phones[0].international}`}>{contact.phones[0].display}</a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
