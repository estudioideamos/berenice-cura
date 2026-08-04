import { useEffect, useState } from "react";
import { contactMessages, whatsappUrl } from "../data/content";
import { siteNavigation } from "../data/site";

export function Header() {
  const [open, setOpen] = useState(false);

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
        <a className="wordmark" href="#inicio" aria-label="Ir al inicio">
          <span>ACCSH</span>
          <small>Comunidad · Tandil</small>
        </a>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((current) => !current)}>
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          <span aria-hidden="true" /><span aria-hidden="true" />
        </button>
        <nav id="primary-navigation" className={`primary-nav${open ? " is-open" : ""}`} aria-label="Navegación principal">
          <ul>
            {siteNavigation.map((item) => <li key={item.href}><a href={item.href} onClick={() => setOpen(false)}>{item.label}</a></li>)}
          </ul>
          <a className="button button--small" href={whatsappUrl(contactMessages.association, 1)} target="_blank" rel="noreferrer">Contactar</a>
        </nav>
      </div>
    </header>
  );
}
