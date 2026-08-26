import type { SitePage } from "../utils/routes";

export const siteNavigation: ReadonlyArray<{ label: string; page: SitePage }> = [
  { label: "La asociación", page: "asociacion" },
  { label: "Primero Mis Manos", page: "primero-mis-manos" },
  { label: "El libro", page: "libro" },
  { label: "Berenice", page: "berenice" },
  { label: "Blog y novedades", page: "blog-y-novedades" },
  { label: "Tienda", page: "tienda" },
  { label: "Colaboraciones", page: "colaboraciones" },
];

export const associationHero = {
  eyebrow: "Asociación Civil · Tandil",
  titleLines: ["Comunidad Sorda e", "Hipoacúsica Tandilense"],
  statement: "Comunicarnos sin dejar a nadie afuera.",
  description:
    "Promovemos la inclusión y la accesibilidad comunicacional de las personas sordas e hipoacúsicas.",
  signals: [
    { label: "Fundada en", value: "2024" },
    { label: "Comunicamos en", value: "Lengua de Señas Argentina" },
    { label: "Nuestro enfoque", value: "Accesibilidad comunicacional" },
  ],
} as const;
