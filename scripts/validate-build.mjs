import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const fromRoot = (...parts) => join(root, ...parts);
const requiredSections = ["el-libro", "proposito", "berenice", "asociacion", "fragmentos", "contacto"];
const requiredAssets = [
  "book-cover.webp", "book-back.webp", "berenice-cura.webp", "logo-asociacion.webp",
  "logo-primero-mis-manos.webp", "qr-instagram.webp", "og-berenice-cura.png", "favicon.png",
];
const failures = [];
const source = [
  readFileSync(fromRoot("src", "App.tsx"), "utf8"),
  readFileSync(fromRoot("src", "data", "content.ts"), "utf8"),
].join("\n");
const html = readFileSync(fromRoot("dist", "index.html"), "utf8");

for (const section of requiredSections) {
  if (!source.includes(`id="${section}"`)) failures.push(`Missing section: ${section}`);
}
for (const asset of requiredAssets) {
  const path = fromRoot("public", "assets", asset);
  if (!existsSync(path) || statSync(path).size === 0) failures.push(`Missing asset: ${asset}`);
}
if (/__SITE_URL__|__BASE_URL__/.test(html)) failures.push("Metadata placeholders remain in dist/index.html");
if (/lorem ipsum|href=["']#["']|best seller/i.test(source) || /\bTODO\b/.test(source)) {
  failures.push("Placeholder, empty link, TODO, or unverified claim found");
}
if (!source.includes("5492494569921") || !source.includes("5492494245888")) failures.push("International WhatsApp numbers are missing");
if (!readFileSync(fromRoot("src", "styles", "responsive.css"), "utf8").includes("prefers-reduced-motion")) failures.push("Reduced-motion support is missing");

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
  distAssets: distFiles.length,
  htmlBytes: Buffer.byteLength(html),
  status: "ok",
}, null, 2));
