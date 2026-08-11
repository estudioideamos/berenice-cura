import { useState } from "react";
import { Icon } from "./Icons";
import { listeningModes } from "../data/experience";

export function ListeningAtlas() {
  const [activeId, setActiveId] = useState<(typeof listeningModes)[number]["id"]>("mirada");
  const active = listeningModes.find((mode) => mode.id === activeId) ?? listeningModes[0];

  return (
    <div className="listening-atlas" data-reveal>
      <div className="listening-atlas__map">
        <svg className="listening-atlas__connections" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="29" />
          <path d="M50 50 18 18M50 50l32-32M50 50 18 82M50 50l32 32" />
        </svg>
        <div className="listening-atlas__center" aria-hidden="true">
          <small>El acto de</small>
          <strong>escuchar</strong>
          <span>en otros sentidos</span>
        </div>
        <ul className="listening-atlas__nodes" aria-label="Formas de escuchar">
          {listeningModes.map((mode) => (
            <li key={mode.id} className={`listening-atlas__node listening-atlas__node--${mode.id}`}>
              <button
                type="button"
                className={activeId === mode.id ? "is-active" : ""}
                aria-pressed={activeId === mode.id}
                onClick={() => setActiveId(mode.id)}
              >
                <span>{mode.number}</span>
                <Icon type={mode.id} />
                <strong>{mode.label}</strong>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="listening-atlas__reading" aria-live="polite">
        <span>{active.number} / 04</span>
        <p>“{active.quote}”</p>
        <strong>{active.action}</strong>
      </div>
    </div>
  );
}
