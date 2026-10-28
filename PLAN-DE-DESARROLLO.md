# Plan de desarrollo institucional — CIS Genaro Muñoz Hernández
**Ubicación:** Gracias, Lempira, Honduras. **Versión objetivo:** 2.0.
**Alcance:** portal institucional e información educativa. No recopila información médica personal ni ofrece diagnósticos.

## Fase 1 — Portada e identidad (en revisión)
- [x] Encabezado institucional de lectura clara, navegación por secciones y menú adaptable a móvil.
- [x] Portada centrada en información para ciudadanía, sin banners de demostración.
- [x] Accesos rápidos a la presentación del CIS, información de atención y biblioteca educativa.
- [x] Tarjetas de tuberculosis y Chagas, conservando los recursos previos.
- [x] Hoja CSS propia para la portada con diseño responsive, accesibilidad de teclado y reducción de movimiento.
- [ ] Revisión visual en iPhone/Android y escritorio.
- [ ] Revisión de la dirección y ajustes de identidad institucional.

## Fase 2 — Datos del centro
**Información que debe confirmar el establecimiento:**
- Denominación institucional vigente y dependencias que autoriza mencionar.
- Logotipo oficial, fotografías con autorización de uso.
- Lista real de servicios/programas activos, requisitos y horarios de cada uno.
- Dirección precisa, teléfono/canales oficiales y horario vigente.
- Información de actividades comunitarias que pueda publicarse.
**Criterio de aceptación:** no mostrar como disponible ningún servicio u horario sin confirmación.

## Fase 3 — Biblioteca y contenido médico
- Uniformar las páginas de Chagas y tuberculosis con navegación, tipografía y componentes de portada.
- Preparar índice extensible de enfermedades, navegación móvil y enlaces a fuentes.
- Publicar referencias OMS/OPS/SESAL; indicar fecha de última revisión del contenido clínico.
- Revisión sanitaria por un profesional designado antes de la entrega formal.
- No ofrecer tratamiento personalizado o automedicación.

## Fase 4 — Recursos comunitarios
- PDFs imprimibles, QR por módulo, contenidos para sala de espera.
- Optimizar recursos para bajo consumo de datos.
- Validar comprensión con 3 a 5 usuarios de la comunidad, registrando hallazgos agregados, sin datos sensibles.

## Fase 5 — Publicación y transferencia
- Configurar GitHub Pages con URL verificada, SEO y revisión de enlaces.
- Garantizar acceso del establecimiento a los archivos y manejo seguro de credenciales.
- Designar responsable editorial y responsable técnico de mantenimiento.
- Manual sencillo de edición, respaldo y revisión semestral o cuando cambien lineamientos.
- Acta o registro de entrega institucional.

## Antecedentes de diseño
- NHS Service Manual: https://service-manual.nhs.uk/design-system
- Healthdirect Australia: https://www.healthdirect.gov.au/
- 1177 (Suecia): https://www.1177.se/
- OPS: https://www.paho.org/es
Las referencias inspiran criterios de diseño y contenido, no se copian sus imágenes ni logotipos.

## Decisión técnica
Implementación estática, simple y de bajo mantenimiento en GitHub Pages. `index.html` usa `institucional.css`; `chagas.html` mantiene temporalmente `styles.css` hasta la fase 3. El proyecto es completamente navegable sin frameworks ni infraestructura de datos.
