# Fotografías institucionales del CIS

Este directorio contiene dos fotografías enviadas para el portal el 28 de octubre de 2026:

- `cis-entrada.avif`: entrada al establecimiento con rótulo visible «CIS Gracias»; usado en la portada y en «El centro».
- `cis-exteriores.avif`: vista exterior del edificio, vegetación y ventanas; usado en «El centro».

## Optimización
Las imágenes están en AVIF y no contienen metadatos EXIF personales. Los originales en PNG se mantienen fuera del repositorio. El código de `src/data/fotografias.ts` importa los archivos y los muestra solo cuando existen.

La fotografía de entrada se volvió a exportar desde el original de 4160 × 3120 píxeles adjuntado por el usuario, conservando esa resolución y con calidad AVIF 90. Las variantes `cis-entrada-1200.avif` (1200 × 900) y `cis-entrada-1920.avif` (1920 × 1440) se exportan directamente del mismo original con calidad 90. La portada ofrece las tres mediante `srcset`: el navegador elige según el tamaño y la densidad de pantalla; en móvil se contempla el ancho real de la foto antes del recorte panorámico. No se aplica ampliación artificial ni reconstrucción de detalles. La foto de exteriores conserva 1200 × 900 píxeles.

## Criterios para la publicación
- Confirmar con la dirección que las fotos están autorizadas para difusión.
- Verificar si «CIS Gracias» es el nombre público actual y si «Genaro Muñoz Hernández» es la denominación administrativa vigente; no asumir equivalencias.
- No publicar datos personales de pacientes ni fotografías con personas identificables sin consentimiento.
- Usar pies de foto fácticos y textos alternativos; las imágenes no sustituyen información de servicios u horarios.

Las fotografías aparecen sin carruseles, filtros de color ni imágenes promocionales ajenas al establecimiento.
