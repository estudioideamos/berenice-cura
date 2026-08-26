import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const fromRoot = (...parts) => join(root, ...parts);
const pages = [
  { path: "index.html", title: "Comunidad Sorda e Hipoacúsica Tandilense | ACCSHT" },
  { path: "asociacion/index.html", title: "La asociación | Comunidad Sorda e Hipoacúsica Tandilense" },
  { path: "primero-mis-manos/index.html", title: "Primero Mis Manos | ACCSHT" },
  { path: "libro/index.html", title: "Escuchar en otros sentidos | Berenice Cura" },
  { path: "berenice/index.html", title: "Berenice Cura | Accesibilidad comunicacional" },
  { path: "contacto/index.html", title: "Contacto | Comunidad Sorda e Hipoacúsica Tandilense" },
  { path: "blog-y-novedades/index.html", title: "Blog y novedades | ACCSHT" },
  { path: "tienda/index.html", title: "Tienda | Comunidad Sorda e Hipoacúsica Tandilense" },
  { path: "tienda/escuchar-en-otros-sentidos/index.html", title: "Escuchar en otros sentidos | Tienda ACCSHT" },
  { path: "tienda/luna-y-el-puente-de-las-manos/index.html", title: "Luna y el puente de las manos | Tienda ACCSHT" },
  { path: "colaboraciones/index.html", title: "Colaboraciones | Comunidad Sorda e Hipoacúsica Tandilense" },
  { path: "admin/index.html", title: "Administrar novedades | ACCSHT" },
];
const requiredAssets = [
  "book-cover.webp", "book-back.webp", "berenice-cura-retrato.webp",
  "isotipo-accsht-clean.png", "qr-instagram.webp", "primero-mis-manos-editorial.webp",
  "tienda-editorial.webp", "colaboraciones-editorial.webp", "luna-editorial-placeholder.webp",
  "manos-conexion.webp", "home-comunidad-editorial.webp", "home-fondo-conexion.webp", "asociacion-mision.webp",
  "berenice-home-editorial.webp", "home-asociacion-editorial.webp",
  "libro-fragmento-escuchar.webp", "libro-fragmento-manos.webp",
  "libro-fragmento-gesto.webp", "libro-fragmento-conexion.webp", "whatsapp.svg",
  "blog/accesibilidad-comunicacional.webp", "blog/lengua-de-senas-argentina.webp",
  "blog/educacion-inclusiva.webp", "blog/familias-comunicacion.webp",
  "blog/mitos-comunicacion.webp", "blog/actividades-accesibles.webp",
  "blog/contenidos-digitales-accesibles.webp", "blog/escuchar-otros-sentidos.webp",
  "blog/participacion-comunitaria.webp", "blog/cruzando-puentes.webp",
  "og-asociacion.png", "favicon.png",
];
const sourceFiles = [
  "src/App.tsx", "src/data/content.ts", "src/data/site.ts", "src/utils/routes.ts",
  "src/components/Header.tsx", "src/components/Hero.tsx", "src/components/Footer.tsx",
  "src/components/EditorialMarquee.tsx", "src/components/SocialIcon.tsx", "src/components/WhatsAppFloat.tsx",
  "src/components/BlogHighlights.tsx", "src/data/blog.ts", "src/pages/BlogPage.tsx", "src/pages/BlogAdminPage.tsx",
  "src/components/HomeSignalIcon.tsx", "src/components/ListeningAtlas.tsx",
  "src/components/AudienceExplorer.tsx", "src/components/FragmentReader.tsx",
  "src/pages/HomePage.tsx", "src/pages/AssociationPage.tsx", "src/pages/BrandPage.tsx",
  "src/pages/BookPage.tsx", "src/pages/AuthorPage.tsx", "src/pages/ContactPage.tsx",
];
const failures = [];
const source = sourceFiles.map((path) => readFileSync(fromRoot(...path.split("/")), "utf8")).join("\n");
const styles = readdirSync(fromRoot("src", "styles"))
  .filter((name) => name.endsWith(".css"))
  .map((name) => readFileSync(fromRoot("src", "styles", name), "utf8"))
  .join("\n");

for (const page of pages) {
  const path = fromRoot("dist", ...page.path.split("/"));
  if (!existsSync(path)) {
    failures.push(`Missing built page: ${page.path}`);
    continue;
  }
  const html = readFileSync(path, "utf8");
  if (!html.includes(`<title>${page.title}</title>`)) failures.push(`Wrong title: ${page.path}`);
  if (/__SITE_URL__|__BASE_URL__/.test(html)) failures.push(`Metadata placeholder remains: ${page.path}`);
  if (!html.includes('lang="es-AR"') || !html.includes('rel="canonical"')) failures.push(`Metadata incomplete: ${page.path}`);
}

for (const asset of requiredAssets) {
  const path = fromRoot("public", "assets", asset);
  if (!existsSync(path) || statSync(path).size === 0) failures.push(`Missing asset: ${asset}`);
}
if (/lorem ipsum|href=["']#["']|best seller/i.test(source) || /\bTODO\b/.test(source)) failures.push("Placeholder, empty link, TODO, or unverified claim found");
if (!source.includes("5492494569921") || !source.includes("5492494245888")) failures.push("International WhatsApp numbers are missing");
if (!styles.includes("prefers-reduced-motion")) failures.push("Reduced-motion support is missing");
if (!source.includes("aria-current") || !source.includes("Saltar al contenido")) failures.push("Navigation accessibility support is missing");
if (!source.includes("home-comunidad-editorial.webp") || !source.includes("HomeSignalIcon")) failures.push("Home visual system is missing");
if (!source.includes("footer-cta__orbit") || !source.includes("aria-controls=\"footer-routes\"")) failures.push("Premium footer or accessible mobile navigation is missing");
if (!source.includes("EditorialMarquee") || !source.includes("WhatsAppFloat")) failures.push("Editorial marquee or floating WhatsApp contact is missing");
if (!source.includes("BlogHighlights") || !source.includes("BlogAdminPage")) failures.push("Blog carousel or administration page is missing");
const blogPosts = JSON.parse(readFileSync(fromRoot("src", "data", "blog.json"), "utf8"));
if (blogPosts.length !== 10 || blogPosts.some((post) => !post.takeaways?.length || !post.imageCredit)) failures.push("The ten infographic blog publications are incomplete");
if (!["ListeningAtlas", "AudienceExplorer", "FragmentReader"].every((name) => source.includes(name))) failures.push("An interactive editorial module is missing");

const distFiles = readdirSync(fromRoot("dist", "assets"));
if (!distFiles.some((file) => file.endsWith(".css"))) failures.push("Compiled CSS is missing");
if (!distFiles.some((file) => file.endsWith(".js"))) failures.push("Compiled JavaScript is missing");
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(JSON.stringify({ pages: pages.length, requiredAssets: requiredAssets.length, interactiveModules: 3, distAssets: distFiles.length, status: "ok" }, null, 2));
