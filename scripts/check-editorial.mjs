import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const folder = new URL('../src/content/enfermedades/', import.meta.url);
const root = decodeURIComponent(folder.pathname);
let pending = [];
for (const file of readdirSync(root).filter(f => f.endsWith('.md'))) {
  const content = readFileSync(join(root,file),'utf8');
  const meta = content.match(/^---\s*\n([\s\S]*?)\n---/);
  const state = meta?.[1].match(/^estado:\s*["']?([^"'\s]+)/m)?.[1];
  if (state !== 'aprobado') pending.push(`${file}: ${state ?? 'estado no definido'}`);
}
// Los datos operativos reportados aún no cuentan con aval de dirección.
const institution = readFileSync(new URL('../src/data/centro.ts', import.meta.url), 'utf8');
if (/estado:\s*['"]reportado['"]/.test(institution)) {
  pending.push('Datos de horario, servicios o cobros reportados sin aval institucional');
}
if (pending.length) {
  console.error('Publicación detenida: hay contenidos pendientes de aprobación clínica:');
  for (const item of pending) console.error(' -', item);
  process.exit(1);
}
console.log('Control editorial de publicación aprobado.');
