# Berenice Cura — Escuchar en otros sentidos

Landing editorial responsive para presentar el libro **Escuchar en otros sentidos: Primero mis manos**, a Berenice Cura y el trabajo de la Asociación Civil Comunidad Sorda e Hipoacúsica Tandilense.

## Ejecutar localmente

Requiere Node.js 22 o una versión compatible.

```bash
npm install
npm run dev
```

El build de producción se genera con:

```bash
npm run build
npm run preview
```

## Editar contenido y enlaces

- Textos, navegación, teléfonos, mensajes de WhatsApp y redes: `src/data/content.ts`.
- Estructura de las secciones: `src/App.tsx`.
- Sistema visual y responsive: `src/styles.css` y `src/styles/`.
- Imágenes optimizadas publicadas: `public/assets/`.
- Materiales originales consultados: `source-materials/` (solo local; no se publica para proteger el manuscrito y los archivos de trabajo).

Los campos editoriales todavía no confirmados —ISBN, editorial, fecha, precio y enlace de compra— están centralizados en `book.pendingDetails` dentro de `src/data/content.ts`. No se muestran mientras sean `null`.

## GitHub Pages

El workflow `.github/workflows/pages.yml` construye y publica el sitio al hacer push sobre `main`. Vite calcula automáticamente la ruta base y la URL canónica a partir del nombre del repositorio dentro de GitHub Actions.

1. En GitHub, abrir **Settings → Pages** y seleccionar **GitHub Actions** como fuente.
2. Hacer push a la rama `main`.
3. Esperar a que finalice la acción **Deploy to GitHub Pages**.

Para un dominio propio, definir `VITE_SITE_URL` y, si corresponde, `VITE_BASE_PATH` durante el build.

## Accesibilidad

La página incluye HTML semántico, enlace para saltar al contenido, foco visible, navegación por teclado, objetivos táctiles amplios, textos alternativos, contraste AA, contenido alternativo sin JavaScript y reducción completa de movimiento mediante `prefers-reduced-motion`.
