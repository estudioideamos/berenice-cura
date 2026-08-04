import { useState } from "react";
import { listeningModes } from "../data/experience";

type ConceptIconProps = {
  type: (typeof listeningModes)[number]["id"];
};

function ConceptIcon({ type }: ConceptIconProps) {
  if (type === "mirada") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M4 24s7-11 20-11 20 11 20 11-7 11-20 11S4 24 4 24Z" />
        <circle cx="24" cy="24" r="5" />
      </svg>
    );
  }
  if (type === "manos") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M13 30V17m6 10V11m6 16V9m6 19V14m6 14v-8c0-3 5-3 5 1v11c0 8-6 13-14 13h-4c-7 0-13-5-13-12v-3c0-4 2-7 5-9" />
      </svg>
    );
  }
  if (type === "presencia") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="5" />
        <circle cx="24" cy="24" r="13" />
        <circle cx="24" cy="24" r="21" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 39C17 33 7 27 7 17c0-6 4-10 10-10 4 0 7 2 9 6 2-4 5-6 9-6 6 0 10 4 10 10 0 10-10 16-21 22Z" />
      <path d="M24 14v18" />
    </svg>
  );
}

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
                <ConceptIcon type={mode.id} />
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
