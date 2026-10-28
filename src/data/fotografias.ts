/**
 * Integración progresiva de imágenes propias del CIS.
 * Importar las fotografías optimizadas en src/assets/fotos/
 * Los módulos de página no intentan cargar rutas inexistentes.
 */
const assets = import.meta.glob<string>('../assets/fotos/*.avif', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const fotosCentro = {
  entrada: assets['../assets/fotos/cis-entrada.avif'] ?? null,
  exteriores: assets['../assets/fotos/cis-exteriores.avif'] ?? null,
};
