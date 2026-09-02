export type SitePage =
  | "inicio"
  | "asociacion"
  | "primero-mis-manos"
  | "libro"
  | "berenice"
  | "contacto"
  | "blog-y-novedades"
  | "tienda"
  | "tienda/escuchar-en-otros-sentidos"
  | "tienda/luna-y-el-puente-de-las-manos"
  | "tienda/mi-mama"
  | "colaboraciones"
  | "admin";

export const pageUrl = (page: SitePage, hash = "") => {
  const base = import.meta.env.BASE_URL;
  const path = page === "inicio" ? base : `${base}${page}/`;
  return `${path}${hash}`;
};

export const currentPage = (): SitePage => {
  const basePath = new URL(import.meta.env.BASE_URL, window.location.origin).pathname;
  const localPath = window.location.pathname.slice(basePath.length).replace(/^\/+|\/+$/g, "");
  if (localPath === "asociacion") return "asociacion";
  if (localPath === "primero-mis-manos") return "primero-mis-manos";
  if (localPath === "libro") return "libro";
  if (localPath === "berenice") return "berenice";
  if (localPath === "contacto") return "contacto";
  if (localPath === "blog-y-novedades") return "blog-y-novedades";
  if (localPath === "tienda") return "tienda";
  if (localPath === "tienda/escuchar-en-otros-sentidos") return "tienda/escuchar-en-otros-sentidos";
  if (localPath === "tienda/luna-y-el-puente-de-las-manos") return "tienda/luna-y-el-puente-de-las-manos";
  if (localPath === "tienda/mi-mama") return "tienda/mi-mama";
  if (localPath === "colaboraciones") return "colaboraciones";
  if (localPath === "admin") return "admin";
  return "inicio";
};
