# Comunidad Sorda e Hipoacúsica Tandilense

Sitio editorial multipágina de la **Asociación Civil Comunidad Sorda e Hipoacúsica Tandilense**. La asociación es el eje del proyecto; **Primero Mis Manos**, el libro **Escuchar en otros sentidos: Primero mis manos** y Berenice Cura tienen recorridos internos propios.

## Ejecutar localmente

Requiere Node.js 22 o una versión compatible.

```bash
npm install
npm run dev
```

El build de producción se genera y verifica con:

```bash
npm run build
node scripts/validate-build.mjs
npm run preview
```

## Arquitectura del sitio

- `/`: portada e índice editorial.
- `/asociacion/`: misión, acciones, materiales y mapa de escucha.
- `/primero-mis-manos/`: identidad registrada e iniciativa.
- `/libro/`: presentación, públicos, mockup y fragmentos.
- `/berenice/`: perfil de Berenice Cura.
- `/contacto/`: consultas, capacitaciones, actividades y adquisición.

Cada página cuenta con título, descripción, URL canónica y metadatos sociales propios.

## Editar contenido, imágenes y enlaces

- Información del libro, asociación, teléfonos, mensajes de WhatsApp y redes: `src/data/content.ts`.
- Navegación y contenido principal de portada: `src/data/site.ts`.
- Estructura de cada recorrido: `src/pages/`.
- Componentes compartidos: `src/components/`.
- Sistema visual y responsive: `src/styles/`.
- Isotipo institucional modernizado: `public/assets/isotipo-accsht.svg`.
- Ilustraciones editoriales generadas para la portada: `public/assets/home-comunidad-editorial.webp` y `public/assets/home-fondo-conexion.webp`.
- Imágenes optimizadas: `public/assets/`.
- Materiales originales consultados: `source-materials/` —solo local; no se publica el manuscrito ni los archivos de trabajo—.

Los datos editoriales todavía no confirmados —ISBN, editorial, fecha, precio y enlace de compra— están centralizados en `book.pendingDetails` dentro de `src/data/content.ts`. No se muestran mientras sean `null`.

## GitHub Pages

El flujo `.github/workflows/pages.yml` construye y publica las seis páginas al hacer push sobre `main`. Vite calcula automáticamente la ruta base y la URL canónica a partir del nombre del repositorio dentro de GitHub Actions.

1. En GitHub, abrir **Settings → Pages** y elegir **GitHub Actions** como fuente.
2. Hacer push a la rama `main`.
3. Esperar a que termine la acción **Deploy to GitHub Pages**.

Para un dominio propio, definir `VITE_SITE_URL` y, si corresponde, `VITE_BASE_PATH` durante el build.

## Accesibilidad

El sitio incluye estructura semántica, jerarquía de encabezados, enlace para saltar al contenido, foco visible, navegación por teclado, estado de página actual, objetivos táctiles amplios, textos alternativos, contraste suficiente y reducción de movimiento mediante `prefers-reduced-motion`. El footer incorpora navegación desplegable accesible en mobile.
