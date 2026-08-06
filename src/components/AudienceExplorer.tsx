import { useState } from "react";
import { audiences } from "../data/content";

export function AudienceExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = audiences[activeIndex];

  return (
    <div className="audience-explorer" data-reveal>
      <div className="audience-explorer__nav" aria-label="Públicos del libro">
        {audiences.map((audience, index) => (
          <button
            type="button"
            key={audience.title}
            className={activeIndex === index ? "is-active" : ""}
            aria-pressed={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          >
            <span>{audience.number}</span>
            <strong>{audience.title}</strong>
            <i aria-hidden="true">↗</i>
          </button>
        ))}
      </div>
      <div className="audience-explorer__panel" aria-live="polite">
        <div className="audience-explorer__orbit" aria-hidden="true">
          <span>{active.number}</span>
        </div>
        <div className="audience-explorer__copy" key={active.number}>
          <p>El libro propone para</p>
          <h3>{active.title}</h3>
          <div className="audience-explorer__line" aria-hidden="true" />
          <blockquote>{active.text}</blockquote>
        </div>
      </div>
    </div>
  );
}
