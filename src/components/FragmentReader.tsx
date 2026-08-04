import { useState } from "react";
import { fragments } from "../data/content";

export function FragmentReader() {
  const [activeIndex, setActiveIndex] = useState(0);
  const goTo = (index: number) => setActiveIndex((index + fragments.length) % fragments.length);

  return (
    <div className="fragment-reader" data-reveal>
      <div className="fragment-reader__counter" aria-hidden="true">
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <i />
        <span>{String(fragments.length).padStart(2, "0")}</span>
      </div>
      <div className="fragment-reader__viewport" aria-live="polite">
        {fragments.map((fragment, index) => (
          <blockquote
            key={fragment}
            className={activeIndex === index ? "is-active" : ""}
            aria-hidden={activeIndex !== index}
          >
            <p>“{fragment}”</p>
          </blockquote>
        ))}
      </div>
      <div className="fragment-reader__controls">
        <button type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Leer el fragmento anterior">←</button>
        <div className="fragment-reader__dots" aria-label="Elegir fragmento">
          {fragments.map((fragment, index) => (
            <button
              type="button"
              key={fragment}
              className={activeIndex === index ? "is-active" : ""}
              aria-label={`Mostrar fragmento ${index + 1}`}
              aria-pressed={activeIndex === index}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        <button type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Leer el fragmento siguiente">→</button>
      </div>
    </div>
  );
}
