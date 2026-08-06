import { useState } from "react";
import { fragments } from "../data/content";

const asset = (name: string) => import.meta.env.BASE_URL + "assets/" + name;

export function FragmentReader() {
  const [activeIndex, setActiveIndex] = useState(0);
  const goTo = (index: number) => setActiveIndex((index + fragments.length) % fragments.length);
  const active = fragments[activeIndex];

  return (
    <div className="fragment-reader" data-reveal>
      <figure className="fragment-reader__visual" key={activeIndex}>
        <img src={asset(active.image)} width="1024" height="1024" alt={active.imageAlt} loading={activeIndex === 0 ? "eager" : "lazy"} />
      </figure>
      <div className="fragment-reader__copy">
        <div className="fragment-reader__quote" key={activeIndex}>
          <span aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")}</span>
          <blockquote><p>“{active.text}”</p></blockquote>
        </div>
        <div className="fragment-reader__controls">
          <button type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Fragmento anterior">←</button>
          <div className="fragment-reader__dots" aria-label="Elegir fragmento">
            {fragments.map((fragment, index) => (
              <button
                type="button"
                key={fragment.text}
                className={activeIndex === index ? "is-active" : ""}
                aria-label={`Mostrar fragmento ${index + 1}`}
                aria-pressed={activeIndex === index}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
          <button type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Fragmento siguiente">→</button>
        </div>
      </div>
    </div>
  );
}
