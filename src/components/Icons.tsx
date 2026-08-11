export type IconName =
  | "mirada"
  | "manos"
  | "presencia"
  | "empatia"
  | "reconocer"
  | "conexion"
  | "construir"
  | "participar"
  | "capacitaciones"
  | "sensibilizacion"
  | "proyectos"
  | "comunicacion"
  | "identidad";

const accent = { fill: "var(--signal)" } as const;

export function Icon({ type }: { type: IconName }) {
  const props = { viewBox: "0 0 48 48", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

  if (type === "mirada") {
    return (
      <svg {...props}>
        <path d="M4 24s7-12 20-12 20 12 20 12-7 12-20 12S4 24 4 24Z" />
        <circle cx="24" cy="24" r="6.5" />
        <circle cx="24" cy="24" r="2" style={accent} />
      </svg>
    );
  }
  if (type === "manos") {
    return (
      <svg {...props}>
        <path d="M13 30V17m6 10V11m6 16V9m6 19V14m6 14v-8c0-3 5-3 5 1v11c0 8-6 13-14 13h-4c-7 0-13-5-13-12v-3c0-4 2-7 5-9" />
        <circle cx="24" cy="39" r="1.9" style={accent} />
      </svg>
    );
  }
  if (type === "presencia") {
    return (
      <svg {...props}>
        <circle cx="24" cy="24" r="20" />
        <circle cx="24" cy="24" r="12" />
        <circle cx="24" cy="24" r="2" style={accent} />
      </svg>
    );
  }
  if (type === "empatia") {
    return (
      <svg {...props}>
        <path d="M24 39C17 33 7 27 7 17c0-6 4-10 10-10 4 0 7 2 9 6 2-4 5-6 9-6 6 0 10 4 10 10 0 10-10 16-21 22Z" />
        <circle cx="24" cy="17" r="1.9" style={accent} />
      </svg>
    );
  }
  if (type === "reconocer") {
    return (
      <svg {...props}>
        <circle cx="20" cy="20" r="13" />
        <path d="M29 29l12 12" />
        <circle cx="20" cy="20" r="2" style={accent} />
      </svg>
    );
  }
  if (type === "conexion") {
    return (
      <svg {...props}>
        <path d="M6 32c6-15 30-15 36 0" />
        <circle cx="8" cy="34" r="2.8" />
        <circle cx="40" cy="34" r="2.8" />
        <circle cx="24" cy="19" r="2" style={accent} />
      </svg>
    );
  }
  if (type === "construir") {
    return (
      <svg {...props}>
        <rect x="7" y="27" width="13" height="13" rx="2" />
        <rect x="28" y="27" width="13" height="13" rx="2" />
        <rect x="17.5" y="9" width="13" height="13" rx="2" />
        <circle cx="24" cy="15.5" r="1.9" style={accent} />
      </svg>
    );
  }
  if (type === "participar") {
    return (
      <svg {...props}>
        <circle cx="24" cy="9" r="3" />
        <circle cx="9" cy="35" r="3" />
        <circle cx="39" cy="35" r="3" />
        <path d="M24 13v8m0 0-15 12m15-12 15 12" />
        <circle cx="24" cy="21" r="2" style={accent} />
      </svg>
    );
  }
  if (type === "capacitaciones") {
    return (
      <svg {...props}>
        <path d="M24 14c-3-3-9-4-15-3v22c6-1 12 0 15 3 3-3 9-4 15-3V11c-6-1-12 0-15 3Z" />
        <path d="M24 14v22" />
        <circle cx="24" cy="10" r="1.9" style={accent} />
      </svg>
    );
  }
  if (type === "sensibilizacion") {
    return (
      <svg {...props}>
        <circle cx="24" cy="24" r="20" />
        <circle cx="24" cy="24" r="12" />
        <circle cx="24" cy="24" r="2" style={accent} />
      </svg>
    );
  }
  if (type === "proyectos") {
    return (
      <svg {...props}>
        <path d="M24 6c-7 0-12 5-12 12 0 5 3 8 5 11v5h14v-5c2-3 5-6 5-11 0-7-5-12-12-12Z" />
        <path d="M19 40h10M21 44h6" />
        <circle cx="24" cy="18" r="2" style={accent} />
      </svg>
    );
  }
  if (type === "comunicacion") {
    return (
      <svg {...props}>
        <path d="M6 10h36v20H20l-9 9v-9H6Z" />
        <circle cx="24" cy="20" r="1.9" style={accent} />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path d="M24 5 6 12v11c0 11 7.5 18.5 18 20 10.5-1.5 18-9 18-20V12Z" />
      <path d="m16 24 6 6 11-12" />
      <circle cx="24" cy="5" r="1.9" style={accent} />
    </svg>
  );
}
