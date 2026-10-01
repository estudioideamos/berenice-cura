import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
const repositoryOwner = process.env.GITHUB_REPOSITORY?.split("/")[0];
const configuredBase = process.env.VITE_BASE_PATH;
const base = configuredBase ?? (repository ? `/${repository}/` : "/");
const normalizedBase = base.endsWith("/") ? base : `${base}/`;
const siteUrl = process.env.VITE_SITE_URL
  ?? (repository && repositoryOwner
    ? `https://${repositoryOwner}.github.io${normalizedBase}`
    : "http://localhost:5173/");
const normalizedSiteUrl = siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;

// GitHub Pages serves static files only — there's no way to set real HTTP
// response headers (no _headers file, no server config access), so this is
// delivered as a <meta http-equiv> tag instead. That means `frame-ancestors`
// is NOT enforced (the CSP spec requires that directive to come from an
// actual header; browsers silently ignore it in a meta tag), so this does
// NOT provide clickjacking protection — only a header-capable host in front
// of Pages (e.g. Cloudflare) could add that. Everything else below (script,
// style, connect, frame-src for the embedded YouTube trailer, etc.) is fully
// enforced via meta.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'", // React's style={{...}} + Vite's emitted CSS
  "img-src 'self' data:",
  "font-src 'self' data:", // Vite inlines some small font-subset files as data: URIs
  "connect-src 'self' https://api.github.com", // /admin/ reads & writes blog.json via the GitHub API
  "frame-src https://www.youtube-nocookie.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

export default defineConfig({
  base: normalizedBase,
  server: {
    port: Number(process.env.PORT) || 5173,
  },
  plugins: [
    react(),
    {
      name: "site-metadata",
      transformIndexHtml(html) {
        return html
          .replaceAll("__SITE_URL__", normalizedSiteUrl)
          .replaceAll("__BASE_URL__", normalizedBase);
      },
    },
    {
      // Build-only: a dev-mode CSP this strict would block Vite's own HMR
      // client (inline/eval-based), so it's injected into the production
      // output exclusively.
      name: "security-headers",
      apply: "build",
      // `order: "pre"` + inserting right after <meta charset> (which must
      // stay the very first thing in <head> per spec) so the CSP still
      // lands ahead of every script/link tag — a meta-tag CSP only governs
      // resources parsed after it.
      transformIndexHtml: {
        order: "pre",
        handler(html) {
          return html.replace(
            /<meta charset="UTF-8"\s*\/?>/i,
            (match) => `${match}\n`
              + `    <meta http-equiv="Content-Security-Policy" content="${contentSecurityPolicy}" />\n`
              + `    <meta name="referrer" content="strict-origin-when-cross-origin" />`,
          );
        },
      },
    },
  ],
  build: {
    target: "es2022",
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        inicio: resolve(projectRoot, "index.html"),
        asociacion: resolve(projectRoot, "asociacion/index.html"),
        primeroMisManos: resolve(projectRoot, "primero-mis-manos/index.html"),
        libro: resolve(projectRoot, "libro/index.html"),
        berenice: resolve(projectRoot, "berenice/index.html"),
        contacto: resolve(projectRoot, "contacto/index.html"),
        blog: resolve(projectRoot, "blog-y-novedades/index.html"),
        tienda: resolve(projectRoot, "tienda/index.html"),
        tiendaLibro: resolve(projectRoot, "tienda/escuchar-en-otros-sentidos/index.html"),
        tiendaLuna: resolve(projectRoot, "tienda/luna-y-el-puente-de-las-manos/index.html"),
        tiendaMiMama: resolve(projectRoot, "tienda/mi-mama/index.html"),
        colaboraciones: resolve(projectRoot, "colaboraciones/index.html"),
        admin: resolve(projectRoot, "admin/index.html"),
      },
    },
  },
});
