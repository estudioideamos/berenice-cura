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

export default defineConfig({
  base: normalizedBase,
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
      },
    },
  },
});
