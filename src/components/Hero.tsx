import { AssociationBrand } from "./AssociationBrand";
import { association } from "../data/content";
import { associationHero } from "../data/site";
import { pageUrl } from "../utils/routes";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

export function Hero() {
  return (
    <section className="hero hero--association" aria-labelledby="hero-title">
      <div className="hero__edition" aria-hidden="true">Comunidad / 2024</div>
      <div className="hero__layout shell">
        <div className="hero__content">
          <div className="hero__identity" data-hero-item>
            <AssociationBrand />
            <p>{associationHero.eyebrow}</p>
          </div>
          <p className="hero__question" data-hero-item>{associationHero.statement}</p>
          <h1 id="hero-title" data-hero-item>
            {associationHero.titleLines.map((line, index) => (
              <span key={line}>{line}{index < associationHero.titleLines.length - 1 ? " " : ""}</span>
            ))}
          </h1>
          <p className="hero__mission" data-hero-item>{associationHero.description}</p>
          <div className="hero__actions" data-hero-item>
            <a className="button button--signal" href={pageUrl("asociacion")}>Conocer la asociación <span aria-hidden="true">→</span></a>
            <a className="button button--line" href={pageUrl("contacto")}>Contactar <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="hero__media" data-hero-item>
          <img className="hero__artwork" src={asset("hero-manos-editorial.webp")} width="1600" height="1600" alt="Ilustración editorial de una mano que se extiende entre líneas doradas" />
          <div className="hero__concept" aria-hidden="true"><span>Proyecto e iniciativa</span><strong>{association.concept}</strong></div>
          <div className="hero__coordinate hero__coordinate--top" aria-hidden="true">38°20′S / 59°08′O</div>
          <div className="hero__coordinate hero__coordinate--bottom" aria-hidden="true">Tandil · Argentina</div>
        </div>
      </div>
      <div className="hero__legend shell" aria-label="Información central de la asociación">
        {associationHero.signals.map((signal) => (
          <span key={signal.label}><em>{signal.label}</em>{signal.value}</span>
        ))}
        <a href={pageUrl("libro")}>El libro dentro del proyecto ↗</a>
      </div>
    </section>
  );
}
