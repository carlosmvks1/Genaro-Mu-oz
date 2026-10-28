# Fase 3 · Contenido institucional y biblioteca de salud

## Objetivos
1. Dar al CIS una fuente única para datos operativos verificables.
2. Integrar una ficha de tuberculosis dentro de Astro, con el mismo diseño de Chagas.
3. Mantener trazabilidad de bibliografía y revisión editorial.

## Datos institucionales
`src/data/centro.ts` reúne el nombre y la localidad del establecimiento, y tiene campos opcionales verificables para:
- Dirección exacta.
- Teléfono institucional.
- Correo institucional.
- Horarios.
- Servicios.
- Fecha y responsable de la última revisión institucional.

No poner información no verificada. Cada valor debe incluir `valor`, `verificadoEl` y `validadoPor`.
Los campos con `null` no se mostrarán como información confirmada.

## Educación sanitaria
- `src/content/enfermedades/chagas.md`: en revisión clínica.
- `src/content/enfermedades/tuberculosis.md`: ficha integrada en Astro, en revisión clínica.
- Recurso ampliado: https://carlosmvks1.github.io/tb-gracias/

La ficha de tuberculosis resume información respaldada por OMS y OPS, pero **no sustituye** a las secciones completas, iconografía y funcionalidades del micrositio original. La migración integral de todas sus secciones puede hacerse después sin alterar el contenido principal del CIS.

## Publicación
La rama `feature/fase-3-contenidos` es de desarrollo y no actualiza la web pública.
La puerta editorial debe continuar bloqueando la publicación de fichas con `estado: revision-clinica`.
Cambiar ese estado solo después de la revisión clínica efectiva y registrar responsable y fecha.

## Pendientes
- Revisión clínica de Chagas y tuberculosis por un profesional designado.
- Validación y carga de horarios, servicios, teléfono, correo, dirección y fotografías.
- Revisión de accesibilidad y usabilidad de los nuevos componentes con personas.
- Integración futura del material ampliado de TB, recursos imprimibles y búsqueda.
