import { useEffect, useState } from "react";
import { AssociationBrand } from "./AssociationBrand";
import { siteNavigation } from "../data/site";
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

  return (
    <header className="site-header">
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
          <ul>
            {siteNavigation.map((item) => (
              <li key={item.page}>
                <a href={pageUrl(item.page)} aria-current={activePage === item.page ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}</a>
              </li>
            ))}
          </ul>
          <a className="button button--small" href={pageUrl("contacto")} aria-current={activePage === "contacto" ? "page" : undefined} onClick={() => setOpen(false)}>Contacto</a>
        </nav>
      </div>
    </header>
  );
}
