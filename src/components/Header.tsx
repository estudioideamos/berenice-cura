import { useEffect, useState } from "react";
import { book, contactMessages, navigation, whatsappUrl } from "../data/content";

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
          <span>{book.author}</span>
          <small>{book.subtitle}</small>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <nav id="primary-navigation" className={`primary-nav${open ? " is-open" : ""}`} aria-label="Navegación principal">
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
              </li>
            ))}
          </ul>
          <a
            className="button button--small"
            href={whatsappUrl(contactMessages.book)}
            target="_blank"
            rel="noreferrer"
          >
            Quiero el libro
          </a>
        </nav>
      </div>
    </header>
  );
}
