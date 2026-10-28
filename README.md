# CIS Genaro Muñoz Hernández

Portal de información institucional y educación en salud del **Centro Integral de Salud Genaro Muñoz Hernández**, Gracias, Lempira, Honduras.

**Sitio:** https://carlosmvks1.github.io/Genaro-Mu-oz/

## Contenido
- Inicio, orientación de atención y servicios del establecimiento.
- Información institucional, reseña histórica e imágenes propias del CIS.
- Biblioteca de educación en salud con las fichas de Chagas y tuberculosis.
- Navegación adaptable a móvil, tableta y computadora.

## Tecnología
- Astro 7 y TypeScript: sitio estático, rápido y modular.
- Colecciones Markdown validadas con Zod.
- CSS institucional accesible, sin dependencia de JavaScript para leer el contenido.
- GitHub Actions: pruebas de tipos, compilación, rutas y navegación real con Chromium/axe.
- GitHub Pages para publicación.

## Desarrollo local

Requiere Node.js 24.

```bash
npm ci
npm run dev
npm run check
npm run build
node scripts/check-output.mjs
```

## Publicación
Los cambios se revisan en ramas de trabajo y se integran mediante Pull Request a `main`. El flujo `.github/workflows/pages-astro.yml` compila Astro, genera las páginas estáticas y ofrece compatibilidad tanto con despliegue GitHub Actions como con el origen clásico por rama.

La rama `backup/main-antes-astro-2026-10-28` conserva una referencia de la web HTML anterior, anterior a la migración.

## Revisión de contenidos
Las fichas médicas contienen fuentes y estados editoriales registrados en `src/content/enfermedades/`. La información del CIS se centraliza en `src/data/centro.ts` para poder corregirse en un solo lugar.

La bibliografía, la investigación documental y la propuesta para la dirección se mantienen como documentación de proyecto, no como advertencias visibles para el visitante:
- [Investigación institucional](INVESTIGACION-CIS-GRACIAS-2026.md)
- [Propuesta para la dirección](PROPUESTA-PARA-DIRECCION.md)
- [Arquitectura](ARQUITECTURA.md)

Para la publicación bajo identidad y dominio institucional definitivos, corresponde aplicar las correcciones y autorizaciones de la dirección y establecer responsables permanentes de contenido.
