const primary = ["Accesibilidad", "Comunicación", "Lengua de Señas Argentina", "Inclusión real"];
const secondary = ["Mirar", "Comprender", "Conectar", "Participar"];
const REPEAT = 8;

function MarqueeTrack({ items, reverse = false }: { items: readonly string[]; reverse?: boolean }) {
  const repeated = Array.from({ length: REPEAT }, () => items).flat();
  return (
    <div className={`editorial-marquee__lane${reverse ? " editorial-marquee__lane--reverse" : ""}`} aria-hidden="true">
      <div className="editorial-marquee__track">
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`}>{item}<i>✦</i></span>
        ))}
      </div>
    </div>
  );
}

export function EditorialMarquee() {
  return (
    <section className="editorial-marquee" aria-label="Principios de la asociación">
      <p className="sr-only">Accesibilidad, comunicación, Lengua de Señas Argentina, inclusión real, comprensión, conexión y participación.</p>
      <MarqueeTrack items={primary} />
      <MarqueeTrack items={secondary} reverse />
    </section>
  );
}
