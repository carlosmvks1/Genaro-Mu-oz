/**
 * Auditoría estructural básica del portal. No reemplaza pruebas visuales,
 * evaluación WCAG ni revisión clínica.
 * Ejecutar: node scripts/check-site.mjs
 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const base = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['index.html', 'chagas.html'];
const failures = [];
const read = path => readFileSync(resolve(base,path), 'utf8');
const extract = (content, pattern) => [...content.matchAll(pattern)].map(m => m[1]);

for (const page of pages) {
  if (!existsSync(resolve(base,page))) {failures.push(`Falta ${page}`);continue;}
  const html = read(page);
  const ids = extract(html,/\bid=["']([^"']+)["']/g);
  const attrs = extract(html,/\b(?:href|src)=["']([^"']+)["']/g);
  if (!/<html\s+lang=["']es["']/.test(html)) failures.push(`${page}: falta idioma es`);
  if (!/<title>[^<]+<\/title>/.test(html)) failures.push(`${page}: falta título`);
  for (const id of ids.filter((id,i) => ids.indexOf(id) !== i)) failures.push(`${page}: ID duplicado ${id}`);
  for (const attr of attrs) {
    if (/^(https?:|mailto:|tel:|data:)/.test(attr)) continue;
    const [rawPath, rawAnchor] = attr.split('#');
    // Las páginas compiladas usan el prefijo público de GitHub Pages.
    let targetPath = rawPath.split('?')[0].replace(/^\/Genaro-Mu-oz\//, '') || (rawPath ? 'index.html' : page);
    if (existsSync(resolve(base,targetPath)) && statSync(resolve(base,targetPath)).isDirectory())
      targetPath = `${targetPath.replace(/\/$/, '')}/index.html`;
    if (!existsSync(resolve(base,targetPath))) {
      failures.push(`${page}: recurso no encontrado ${attr}`);
      continue;
    }
    if (rawAnchor && /\.html$/i.test(targetPath)) {
      const target = read(targetPath);
      if (!extract(target,/\bid=["']([^"']+)["']/g).includes(rawAnchor))
        failures.push(`${page}: sección no encontrada ${attr}`);
    }
  }
}
const index = read('index.html');
const css = read('institucional.css');
const js = read('app.js');
if (!index.includes('class="skip-link"')) failures.push('La portada no tiene salto al contenido');
if (!index.includes('data-menu') || !index.includes('data-nav')) failures.push('Faltan controles del menú móvil');
if (!css.includes('@media(max-width:950px)')) failures.push('Falta punto de quiebre de tableta');
if (!js.includes('window.innerWidth>950')) failures.push('Punto de quiebre no sincronizado');
if (!css.includes('prefers-reduced-motion')) failures.push('Falta respeto a movimiento reducido');

if (failures.length) {
  console.error('Fallaron los controles estructurales:');
  failures.forEach(issue => console.error(' -',issue));
  process.exitCode = 1;
} else console.log('Control estructural completado: páginas, archivos, anclas internas, menú y configuración responsive.');
