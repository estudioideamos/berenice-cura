import { useState, type PointerEvent } from "react";
import { AssociationBrand } from "./AssociationBrand";
import { SocialIcon } from "./SocialIcon";
import { association, book, contact, contactMessages, whatsappUrl } from "../data/content";
import { pageUrl } from "../utils/routes";

type FooterPanel = "recorridos" | "canales";

export function Footer() {
  const [openPanel, setOpenPanel] = useState<FooterPanel | null>(null);

  const moveGlow = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--footer-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--footer-y", `${event.clientY - rect.top}px`);
  };

  const toggle = (panel: FooterPanel) => setOpenPanel((current) => current === panel ? null : panel);

  return (
    <footer className="footer footer--premium" onPointerMove={moveGlow}>
      <div className="footer__glow" aria-hidden="true" />

      <section className="footer-cta shell" aria-labelledby="footer-cta-title">
        <div>
          <p className="footer-cta__eyebrow"><span aria-hidden="true" />Una conversación puede abrir un puente</p>
          <h2 id="footer-cta-title">Construyamos una comunicación <em>sin barreras.</em></h2>
        </div>
        <a className="footer-cta__orbit" href={pageUrl("contacto")} aria-label="Abrir las opciones de contacto">
          <svg className="footer-cta__orbit-copy" viewBox="0 0 160 160" aria-hidden="true">
            <defs>
              <path id="accsht-footer-orbit-path" d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
            </defs>
            <text>
              <textPath href="#accsht-footer-orbit-path" startOffset="0" textLength="350" lengthAdjust="spacing">CONTACTAR · COMUNIDAD · ACCESIBILIDAD ·</textPath>
            </text>
          </svg>
          <span className="footer-cta__core" aria-hidden="true">
            <img src={`${import.meta.env.BASE_URL}assets/isotipo-accsht-original.png`} width="640" height="896" alt="" />
          </span>
        </a>
      </section>

      <div className="footer-main shell">
        <div className="footer-brand">
          <AssociationBrand />
          <p>{association.description}</p>
          <div className="footer-social" aria-label="Redes sociales">
            <a href={contact.instagram.url} target="_blank" rel="noreferrer" aria-label={`Instagram ${contact.instagram.handle}`}><SocialIcon network="instagram" /></a>
            <a href={contact.facebook.url} target="_blank" rel="noreferrer" aria-label={`Facebook ${contact.facebook.label}`}><SocialIcon network="facebook" /></a>
          </div>
        </div>

        <nav className={`footer-nav${openPanel === "recorridos" ? " is-open" : ""}`} aria-label="Recorridos del sitio">
          <button type="button" aria-expanded={openPanel === "recorridos"} aria-controls="footer-routes" onClick={() => toggle("recorridos")}>
            <span>Recorridos</span><i aria-hidden="true" />
          </button>
          <ul id="footer-routes">
            <li><a href={pageUrl("asociacion")}>La asociación</a></li>
            <li><a href={pageUrl("primero-mis-manos")}>Primero Mis Manos</a></li>
            <li><a href={pageUrl("libro")}>{book.title}</a></li>
            <li><a href={pageUrl("berenice")}>Berenice Cura</a></li>
            <li><a href={pageUrl("blog-y-novedades")}>Blog y novedades</a></li>
          </ul>
        </nav>

        <nav className={`footer-nav${openPanel === "canales" ? " is-open" : ""}`} aria-label="Canales de contacto">
          <button type="button" aria-expanded={openPanel === "canales"} aria-controls="footer-channels" onClick={() => toggle("canales")}>
            <span>Canales</span><i aria-hidden="true" />
          </button>
          <ul id="footer-channels">
            <li><a href={pageUrl("contacto")}>Contacto</a></li>
            <li><a href={`mailto:${contact.email}`}>Correo electrónico</a></li>
            <li><a href={contact.instagram.url} target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href={contact.facebook.url} target="_blank" rel="noreferrer">Facebook</a></li>
          </ul>
        </nav>

        <div className="footer-contact">
          <p className="footer-contact__label">Contacto directo</p>
          <h3>¿Cómo podemos acompañarte?</h3>
          <a className="footer-contact__whatsapp" href={whatsappUrl(contactMessages.association, 1)} target="_blank" rel="noreferrer">
            <span>Hablar por WhatsApp</span><i aria-hidden="true">↗</i>
          </a>
          <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
          <p>{contact.phones[1].display}</p>
          <p>Tandil · Argentina</p>
        </div>
      </div>

      <div className="footer-bottom shell">
        <p>© {new Date().getFullYear()} {association.name}.</p>
        <div className="footer-seal" aria-label="ACCSHT, desde 2024">
          <img src={`${import.meta.env.BASE_URL}assets/isotipo-accsht-original.png`} width="640" height="896" alt="" aria-hidden="true" />
          <small>ASOCIACIÓN CIVIL · DESDE 2024</small>
        </div>
        <p>“Primero Mis Manos” · Marca registrada con derechos de autor.</p>
      </div>
    </footer>
  );
}
