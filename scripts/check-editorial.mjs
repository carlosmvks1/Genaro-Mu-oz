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
if (pending.length) {
  console.error('Publicación detenida: hay contenidos pendientes de aprobación clínica:');
  for (const item of pending) console.error(' -', item);
  process.exit(1);
}
console.log('Control editorial de publicación aprobado.');
