import { readFileSync, existsSync, statSync } from 'node:fs';

const inicio = readFileSync('dist/index.html', 'utf8');
const chagas = readFileSync('dist/enfermedades/chagas/index.html', 'utf8');
const tuberculosis = readFileSync('dist/enfermedades/tuberculosis/index.html', 'utf8');
const centro = readFileSync('dist/el-centro/index.html', 'utf8');
const errors = [];

const required = [
  [inicio, 'CIS Genaro Muñoz Hernández', 'Identidad del CIS en portada'],
  [inicio, '/Genaro-Mu-oz/enfermedades/chagas/', 'Ruta pública de Chagas'],
  [inicio, '/Genaro-Mu-oz/enfermedades/tuberculosis/', 'Ruta pública de tuberculosis'],
  [inicio, '/Genaro-Mu-oz/el-centro/', 'Ruta pública de información del centro'],
  [inicio, 'https://maps.app.goo.gl/nR8PFKsEPDxh2Z8N9', 'Indicaciones directas desde portada'],
  [inicio, 'https://carlosmvks1.github.io/Genaro-Mu-oz/og-cis.jpg', 'Imagen de WhatsApp y redes sociales'],
  [inicio, '/Genaro-Mu-oz/favicon.svg', 'Icono institucional del navegador'],
  [inicio, 'id="biblioteca"', 'Biblioteca de salud'],
  [inicio, '/Genaro-Mu-oz/', 'Prefijo GitHub Pages'],
  [chagas, 'Trypanosoma', 'Contenido médico de Chagas'],
  [chagas, 'Organización Panamericana de la Salud', 'Fuentes médicas'],
  [chagas, 'Fuentes y revisión del contenido', 'Transparencia editorial'],
  [tuberculosis, 'Mycobacterium', 'Contenido médico de tuberculosis'],
  [tuberculosis, 'Organización Mundial de la Salud', 'Fuentes de tuberculosis'],
  [tuberculosis, 'Fuentes y revisión del contenido', 'Transparencia editorial de tuberculosis'],
  [centro, 'Datos generales', 'Ficha institucional'],
  [centro, 'Fotografías del establecimiento', 'Galería institucional'],
  [inicio, 'Exteriores del establecimiento', 'Fotografía en portada'],
  [centro, 'Consulta de medicina general', 'Cartera de servicios reportada'],
  [centro, '7:00 a. m. a 3:00 p. m.', 'Horario reportado'],
  [centro, 'La consulta general no tiene cobro.', 'Información de consulta general'],
  [centro, 'Trabajo comunitario', 'Trabajo territorial del CIS'],
  [centro, 'enfermedades crónicas', 'Seguimiento de personas con enfermedades crónicas'],
  [centro, 'AIN-C', 'Actividades comunitarias de niñez'],
  [inicio, 'Gracias y comunidades cercanas', 'Cobertura geográfica de la portada'],
];
for (const [html, needle, label] of required) {
  if (!html.includes(needle)) errors.push(label);
}
for (const [name, html] of [['Inicio',inicio],['Chagas',chagas],['Tuberculosis',tuberculosis],['Centro',centro]]) {
  if (!html.includes('<main id="contenido"')) errors.push(name + ': falta estructura principal');
  if (!html.includes('name="description"')) errors.push(name + ': falta meta description');
  if (!html.includes('<title>')) errors.push(name + ': falta title');
  if (!html.includes('href="https://carlosmvks1.github.io/Genaro-Mu-oz/')) errors.push(name + ': falta canonical absoluto');
}
if (errors.length) {
  console.error('Errores en HTML generado:');
  errors.forEach(e=>console.error(' -',e));
  process.exit(1);
}
console.log('Portal generado correctamente: rutas, contenido, navegación y metadatos.');

for (const route of ['nuestros-servicios', 'antes-de-acudir', 'ubicacion-y-contacto']) {
  const html = readFileSync(`dist/${route}/index.html`, 'utf8');
  if (!html.includes('<main id="contenido"') || !inicio.includes(`/Genaro-Mu-oz/${route}/`)) throw new Error(`Página o enlace ausente: ${route}`);
}

// Recursos de primera impresión: no publicar enlaces a imágenes inexistentes.
for (const resource of ['dist/og-cis.jpg', 'dist/favicon.svg', 'dist/chagas.html']) {
  if (!existsSync(resource) || statSync(resource).size === 0) throw new Error(`Falta recurso público: ${resource}`);
}
const ubicacion = readFileSync('dist/ubicacion-y-contacto/index.html', 'utf8');
if (!ubicacion.includes('https://maps.app.goo.gl/nR8PFKsEPDxh2Z8N9')) throw new Error('Falta ubicación en Google Maps');
