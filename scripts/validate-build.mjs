import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const fromRoot = (...parts) => join(root, ...parts);
const requiredSections = [
  "asociacion", "acciones", "manifiesto", "primero-mis-manos",
  "el-libro", "proposito", "berenice", "fragmentos", "contacto",
];
const requiredAssets = [
  "book-cover.webp", "book-back.webp", "berenice-cura.webp", "berenice-presentacion.webp",
  "logo-asociacion.webp", "logo-primero-mis-manos.webp", "qr-instagram.webp",
  "manos-conexion.webp", "og-asociacion.png", "favicon.png",
];
const failures = [];
const source = [
  readFileSync(fromRoot("src", "App.tsx"), "utf8"),
  readFileSync(fromRoot("src", "data", "content.ts"), "utf8"),
  readFileSync(fromRoot("src", "data", "site.ts"), "utf8"),
  readFileSync(fromRoot("src", "components", "ListeningAtlas.tsx"), "utf8"),
  readFileSync(fromRoot("src", "components", "AudienceExplorer.tsx"), "utf8"),
  readFileSync(fromRoot("src", "components", "FragmentReader.tsx"), "utf8"),
].join("\n");
const styles = [
  "atelier.css", "association-focus.css", "association-mobile-fix.css",
  "responsive-finish.css", "desktop-navigation.css",
].map((name) => readFileSync(fromRoot("src", "styles", name), "utf8")).join("\n");
const html = readFileSync(fromRoot("dist", "index.html"), "utf8");

for (const section of requiredSections) {
  if (!source.includes(`id="${section}"`)) failures.push(`Missing section: ${section}`);
}
for (const asset of requiredAssets) {
  const path = fromRoot("public", "assets", asset);
  if (!existsSync(path) || statSync(path).size === 0) failures.push(`Missing asset: ${asset}`);
}
if (/__SITE_URL__|__BASE_URL__/.test(html)) failures.push("Metadata placeholders remain in dist/index.html");
if (!html.includes("Comunidad Sorda e Hipoacúsica Tandilense") || !html.includes("og-asociacion.png")) {
  failures.push("Association-first metadata is missing");
}
if (/lorem ipsum|href=["']#["']|best seller/i.test(source) || /\bTODO\b/.test(source)) {
  failures.push("Placeholder, empty link, TODO, or unverified claim found");
}
if (!source.includes("5492494569921") || !source.includes("5492494245888")) failures.push("International WhatsApp numbers are missing");
if (!styles.includes("prefers-reduced-motion")) failures.push("Reduced-motion support is missing");
if (!["ListeningAtlas", "AudienceExplorer", "FragmentReader"].every((name) => source.includes(name))) {
  failures.push("An interactive editorial module is missing");
}

const distFiles = readdirSync(fromRoot("dist", "assets"));
if (!distFiles.some((file) => file.endsWith(".css"))) failures.push("Compiled CSS is missing");
if (!distFiles.some((file) => file.endsWith(".js"))) failures.push("Compiled JavaScript is missing");
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(JSON.stringify({
  sections: requiredSections.length,
  requiredAssets: requiredAssets.length,
  interactiveModules: 3,
  distAssets: distFiles.length,
  htmlBytes: Buffer.byteLength(html),
  status: "ok",
}, null, 2));
