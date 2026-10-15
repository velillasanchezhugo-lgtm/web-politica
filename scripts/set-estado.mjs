#!/usr/bin/env node
/**
 * Cambia el estado editorial de entradas JSON y deja constancia en `revision.notas`.
 * Uso: node scripts/set-estado.mjs <estado> "<nota>" <archivo|carpeta>...
 * Ej.: node scripts/set-estado.mjs publicado "Segunda revisión por muestreo" src/content/partidos/pp.json src/content/propuestas/pp
 */
import { readFileSync, writeFileSync, statSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const [estado, nota, ...rutas] = process.argv.slice(2);
const validos = ['borrador', 'revisado', 'publicado', 'desactualizado'];
if (!validos.includes(estado) || !nota || !rutas.length) {
  console.error('Uso: node scripts/set-estado.mjs <' + validos.join('|') + '> "<nota>" <archivo|carpeta>...');
  process.exit(1);
}
const hoy = new Date().toISOString().slice(0, 10);
const archivos = rutas.flatMap((r) => (statSync(r).isDirectory() ? readdirSync(r).filter((f) => f.endsWith('.json')).map((f) => join(r, f)) : [r]));
for (const f of archivos) {
  const d = JSON.parse(readFileSync(f, 'utf8'));
  if (!d.revision) { console.warn(`Sin bloque revision: ${f}`); continue; }
  const previo = d.revision.estado_editorial;
  d.revision.estado_editorial = estado;
  d.revision.fecha_revision = hoy;
  d.revision.notas = [d.revision.notas, `${hoy}: ${previo} → ${estado}. ${nota}`].filter(Boolean).join(' | ');
  writeFileSync(f, JSON.stringify(d, null, 2) + '\n');
  console.log(`${f}: ${previo} → ${estado}`);
}
