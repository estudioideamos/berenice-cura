import { useRef, useState, type PointerEvent } from "react";

type BookVisualProps = {
  compact?: boolean;
};

export function BookVisual({ compact = false }: BookVisualProps) {
  const [showBack, setShowBack] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stageRef.current?.style.setProperty("--tilt-x", `${(-y * 4).toFixed(2)}deg`);
    stageRef.current?.style.setProperty("--tilt-y", `${(x * 7).toFixed(2)}deg`);
  };

  const resetTilt = () => {
    stageRef.current?.style.setProperty("--tilt-x", "0deg");
    stageRef.current?.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div className={`book-visual${compact ? " book-visual--compact" : ""}`}>
      <div
        ref={stageRef}
        className="book-stage"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
      >
        <div className={`book-object${showBack ? " is-flipped" : ""}`} aria-live="polite">
          <div className="book-face book-face--front">
            <img
              src={`${import.meta.env.BASE_URL}assets/book-cover.webp`}
              alt="Portada de Escuchar en otros sentidos: Primero mis manos, de Berenice Cura"
              width="1024"
              height="1536"
              fetchPriority={compact ? "auto" : "high"}
            />
          </div>
          <div className="book-face book-face--back">
            <img
              src={`${import.meta.env.BASE_URL}assets/book-back.webp`}
              alt="Contratapa del libro Escuchar en otros sentidos: Primero mis manos"
              width="760"
              height="1234"
              loading="lazy"
            />
          </div>
        </div>
        <span className="book-shadow" aria-hidden="true" />
      </div>
      <button
        className="book-toggle"
        type="button"
        aria-pressed={showBack}
        onClick={() => setShowBack((current) => !current)}
      >
        <span>{showBack ? "Volver a la portada" : "Ver la contratapa"}</span>
        <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
