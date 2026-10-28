# Arquitectura del portal CIS Genaro Muñoz Hernández

## Objetivo
Sitio institucional estático, tipado y modular para atención primaria y educación sanitaria, adaptable a un despliegue estatal con gobierno editorial adecuado.

## Stack
- Astro 7: generación de HTML con JavaScript mínimo.
- TypeScript: calidad y mantenimiento.
- Colecciones de contenido y Zod: esquema de datos para enfermedades.
- CSS institucional: diseño compartido sin CSS frameworks.
- GitHub Actions: compilar y revisar antes de integrar cambios.
- GitHub Pages: alojamiento inicial; puede cambiarse sin rehacer el contenido.

## Estructura
- `src/layouts/BaseLayout.astro`: documento común, SEO, encabezado y pie.
- `src/components/Header.astro`, `Footer.astro`: navegación.
- `src/components/TarjetaEnfermedad.astro`: tarjeta reutilizable.
- `src/pages/index.astro`: portada institucional.
- `src/pages/enfermedades/[slug].astro`: plantilla de fichas.
- `src/content/enfermedades/*.md`: contenido médico desacoplado del diseño.
- `src/content.config.ts`: esquema y campos necesarios.
- `src/styles/`: estilos.
- `astro.config.mjs`: URL y ruta base de Pages.

## Uso
Con Node 24:
```bash
npm install
npm run check
npm run build
npm run dev
```
Para producción, generar y versionar `package-lock.json` y pasar a `npm ci` en todos los flujos.

## Gobierno clínico
Los artículos tienen tres estados: `borrador`, `revision-clinica`, `aprobado`.
Para aprobar, el esquema exige nombre del revisor y fecha de validación. El código no puede determinar por sí mismo si un criterio clínico es correcto: el responsable del CIS debe realizar esa revisión.
**La página de Chagas se ha migrado conservando estado `revision-clinica`; no afirmar que ya está aprobada.**

## Publicación
La rama `architecture/astro-platform` es un cambio que no se publica directamente.
El workflow de despliegue está limitado a `main`. Al integrar la migración, en Settings → Pages → Source seleccionar **GitHub Actions**. Asegurar que el flujo de aprobación editorial se aplique antes de la publicación.
Los archivos HTML anteriores se mantienen como referencia de migración y no forman parte del resultado generado por Astro.

## Pendientes
- Validación en navegador real y auditoría WCAG con personas y herramientas.
- Revisión clínica de la guía Chagas.
- Confirmación de servicios, horarios, fotografía y contactos por la dirección.
- Migrar la totalidad del micrositio de TB a la colección (por ahora es un enlace externo).
- Integrar pruebas de regresión visual Playwright y CMS editorial cuando la estructura esté estable.
- Completar lockfile y política de dependencias.
