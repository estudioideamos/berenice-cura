export type HomeSignal = "mirada" | "manos" | "presencia" | "empatia";

export function HomeSignalIcon({ signal }: { signal: HomeSignal }) {
  return (
    <span className={`home-signal-icon home-signal-icon--${signal}`} aria-hidden="true">
      {signal === "manos" ? (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <rect x="10" y="26" width="9" height="26" rx="4.5" />
          <rect x="23" y="14" width="9" height="38" rx="4.5" />
          <rect x="36" y="18" width="9" height="34" rx="4.5" />
          <rect x="49" y="24" width="9" height="28" rx="4.5" />
        </svg>
      ) : signal === "empatia" ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s-7.5-4.35-10-9C.5 8.5 2 4 6 4c2.5 0 4.5 1.5 6 4 1.5-2.5 3.5-4 6-4 4 0 5.5 4.5 4 8-2.5 4.65-10 9-10 9z" />
        </svg>
      ) : (
        <>
          <i /><b /><em />
        </>
      )}
    </span>
  );
}
