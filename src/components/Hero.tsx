import { association, contactMessages, whatsappUrl } from "../data/content";
import { associationHero } from "../data/site";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

export function Hero() {
  return (
    <section className="hero hero--association" id="inicio" aria-labelledby="hero-title">
      <div className="hero__edition" aria-hidden="true">Comunidad / 2024</div>
      <div className="hero__layout shell">
        <div className="hero__content">
          <div className="hero__identity" data-hero-item>
            <img src={asset("logo-asociacion.webp")} width="720" height="411" alt="" aria-hidden="true" />
            <p>{associationHero.eyebrow}</p>
          </div>
          <p className="hero__question" data-hero-item>{associationHero.statement}</p>
          <h1 id="hero-title" data-hero-item>
            {associationHero.titleLines.map((line) => <span key={line}>{line}</span>)}
          </h1>
          <p className="hero__mission" data-hero-item>{associationHero.description}</p>
          <div className="hero__actions" data-hero-item>
            <a className="button button--signal" href="#asociacion">Conocer la asociación <span aria-hidden="true">↓</span></a>
            <a className="button button--line" href={whatsappUrl(contactMessages.association, 1)} target="_blank" rel="noreferrer">Contactar <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="hero__media" data-hero-item>
          <img className="hero__artwork" src={asset("manos-conexion.webp")} width="1536" height="1024" alt="" aria-hidden="true" />
          <div className="hero__concept" aria-hidden="true">
            <span>Proyecto e iniciativa</span>
            <strong>{association.concept}</strong>
          </div>
          <div className="hero__coordinate hero__coordinate--top" aria-hidden="true">38°20′S / 59°08′O</div>
          <div className="hero__coordinate hero__coordinate--bottom" aria-hidden="true">Tandil · Argentina</div>
        </div>
      </div>
      <div className="hero__legend shell" aria-label="Información central de la asociación">
        {associationHero.signals.map((signal, index) => <span key={signal}>0{index + 1} — {signal}</span>)}
        <a href="#el-libro">El libro dentro del proyecto ↘</a>
      </div>
    </section>
  );
}
