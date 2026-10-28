import { readFileSync } from 'node:fs';

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
  [inicio, 'Acceso al establecimiento', 'Fotografía en portada'],
  [centro, 'Consulta de medicina general', 'Cartera de servicios reportada'],
  [centro, '7:00 a. m. a 3:00 p. m.', 'Horario reportado'],
  [centro, 'La consulta general no tiene cobro.', 'Información de consulta general'],
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
