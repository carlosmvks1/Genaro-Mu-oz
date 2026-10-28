# CIS Genaro Muñoz Hernández

Portal institucional de información y educación sanitaria para el CIS Genaro Muñoz Hernández, Gracias, Lempira, Honduras.

## Estado del proyecto
- **Sitio actual:** publicado en la rama `main`.
- **Rediseño de portada:** PR #1, rama `redesign/portada-institucional`.
- **Nueva arquitectura Astro:** PR #2, rama `architecture/astro-platform` (basada en la rama de rediseño).
- **Edición clínica de Chagas y tuberculosis:** `revision-clinica` hasta su aprobación por un profesional designado.
- **Fase 3:** contenidos internos de tuberculosis y fuente única de datos institucionales (`src/data/centro.ts`).

La web pública no se modifica por los PR en borrador.

## Tecnologías
Astro 7, TypeScript, Markdown, colección de contenido validada con Zod, CSS modular y GitHub Actions. El contenido se genera como HTML estático.

## Comenzar
Requiere Node.js 24 y npm.

```bash
npm ci
npm run dev
npm run check
npm run build
```

## Estructura
- `src/layouts/`: plantilla general.
- `src/components/`: encabezado, pie y tarjetas reutilizables.
- `src/pages/`: portada y páginas generadas de enfermedades.
- `src/content/enfermedades/`: fichas médicas en Markdown.
- `src/data/centro.ts`: datos institucionales verificables; servicios, horarios, contactos y dirección solo aparecen si están validados.
- `src/content.config.ts`: esquema tipado, controles y datos obligatorios.
- `src/styles/`: diseño institucional.

Para más detalles, ver [ARQUITECTURA.md](ARQUITECTURA.md).

## Despliegue
El sitio se compila con Astro y se publica en GitHub Pages desde un workflow que solo se ejecuta sobre `main`. Antes de activar este despliegue, el repositorio debe utilizar **Settings → Pages → Build and deployment → Source: GitHub Actions**.

El flujo de publicación incluye un control editorial que bloquea las fichas médicas no aprobadas. Una vez aprobado el contenido, su archivo debe registrar `estado: aprobado`, `fechaRevisionClinica` y `responsableRevision`. Ese registro solo se realiza después de la revisión efectiva de un profesional autorizado.

## Limitaciones actuales
La ubicación exacta, horarios, servicios, contactos, fotos y elementos de identidad institucional dependen de la información validada por el CIS. La ficha resumida de tuberculosis está integrada; el micrositio ampliado de TB continúa disponible como recurso complementario.

## Fuentes y derechos
Las fichas citan fuentes oficiales; el código es del proyecto. La inclusión de logotipos y fotografías institucionales requiere permiso de los titulares correspondientes.
