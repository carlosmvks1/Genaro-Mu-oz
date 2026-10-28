import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Control previo a la publicación:
 * - Prohíbe contenidos en borrador.
 * - Conserva el estado de revisión de los materiales sanitarios.
 * - Admite una entrega pública informativa solicitada por el responsable
 *   del proyecto sin fingir que la dirección o un médico ya la aprobaron.
 */
const folder = new URL('../src/content/enfermedades/', import.meta.url);
const root = decodeURIComponent(folder.pathname);
const errors = [];
const warnings = [];
for (const file of readdirSync(root).filter(f => f.endsWith('.md'))) {
  const content = readFileSync(join(root, file), 'utf8');
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  const meta = match?.[1] || '';
  const state = meta.match(/^estado:\s*["']?([^"'\s]+)/m)?.[1];
  if (!state || state === 'borrador') errors.push(`${file}: falta estado publicable`);
  else if (state === 'revision-clinica') warnings.push(`${file}: revisión clínica interna pendiente`);
  if (!/^fuentes:/m.test(meta)) errors.push(`${file}: faltan fuentes`);
}
const institution = readFileSync(new URL('../src/data/centro.ts', import.meta.url), 'utf8');
if (/estado:\s*['"]reportado['"]/.test(institution)) {
  warnings.push('La información operativa registrada requiere revisión posterior de la dirección.');
}
for (const warning of warnings) console.warn('Revisión interna:', warning);
if (errors.length) {
  for (const error of errors) console.error('No publicable:', error);
  process.exit(1);
}
console.log('Comprobaciones editoriales realizadas; sin contenidos en borrador.');
