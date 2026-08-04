export type HomeSignal = "mirada" | "manos" | "presencia" | "empatia";

export function HomeSignalIcon({ signal }: { signal: HomeSignal }) {
  return (
    <span className={`home-signal-icon home-signal-icon--${signal}`} aria-hidden="true">
      <i /><b /><em />
    </span>
  );
}
