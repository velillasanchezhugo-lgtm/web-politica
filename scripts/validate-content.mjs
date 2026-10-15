#!/usr/bin/env node
/**
 * Comprobaciones editoriales que el esquema Zod no cubre. Se ejecuta antes de `astro build`.
 * Errores → la compilación se detiene. Avisos → se muestran pero no bloquean.
 *
 *  - Referencias cruzadas (partido y tema de cada propuesta, partido de cada escenario…).
 *  - Sumas de escaños coherentes con el total declarado.
 *  - Fechas de consulta y revisión no posteriores a hoy.
 *  - Ningún texto de relleno en contenido publicado.
 *  - Identificadores únicos.
 *  - Si PUBLIC_INDEXABLE=true: datos del titular completos y URL de producción real.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, basename } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const C = join(ROOT, 'src/content');
const hoy = new Date().toISOString().slice(0, 10);
const errores = [];
const avisos = [];
const err = (f, m) => errores.push(`${relative(ROOT, f)}: ${m}`);
const warn = (f, m) => avisos.push(`${relative(ROOT, f)}: ${m}`);

function archivos(dir, ext = '.json') {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? archivos(p, ext) : p.endsWith(ext) ? [p] : [];
  });
}
function leer(dir) {
  return archivos(join(C, dir)).flatMap((f) => {
    try {
      return [{ f, d: JSON.parse(readFileSync(f, 'utf8')) }];
    } catch (e) {
      err(f, `JSON no válido: ${e.message}`);
      return [];
    }
  });
}
const publico = (d) => ['publicado', 'desactualizado'].includes(d?.revision?.estado_editorial);

/** Recorre un objeto y devuelve todas las fuentes y fechas. */
function recorrer(o, visit) {
  if (Array.isArray(o)) return o.forEach((x) => recorrer(x, visit));
  if (o && typeof o === 'object') {
    visit(o);
    Object.values(o).forEach((x) => recorrer(x, visit));
  }
}
// TODO/FIXME/XXX en mayúsculas (sensible a mayúsculas: «todo» es una palabra española normal).
const RELLENO = /\b(TODO|FIXME|XXX)\b|lorem ipsum|placeholder|dato inventado/;

function comprobarComunes(f, d) {
  recorrer(d, (o) => {
    if (typeof o.fecha_consulta === 'string' && o.fecha_consulta > hoy) err(f, `fecha_consulta futura (${o.fecha_consulta})`);
    if (typeof o.url === 'string' && !/^https:\/\//.test(o.url)) warn(f, `URL sin https: ${o.url}`);
  });
  if (d?.revision?.fecha_revision > hoy) err(f, `fecha_revision futura (${d.revision.fecha_revision})`);
  if (publico(d) && RELLENO.test(JSON.stringify(d))) err(f, 'contiene texto de relleno en una entrada publicada');
}

// --- Cargar colecciones ---
const partidos = leer('partidos');
const temas = leer('temas');
const propuestas = leer('propuestas');
const escenarios = leer('escenarios');
const historia = leer('historia');
const glosario = leer('glosario');
const escanos = leer('escanos');
const circ = leer('circunscripciones');
const calendario = leer('calendario');
const actualizaciones = leer('actualizaciones');

for (const col of [partidos, temas, propuestas, escenarios, historia, glosario, escanos, circ, calendario, actualizaciones])
  for (const { f, d } of col) comprobarComunes(f, d);

const idsPartido = new Set(partidos.map(({ d }) => d.id));
const partidoPublico = new Map(partidos.map(({ d }) => [d.id, publico(d)]));
const idsTema = new Set(temas.map(({ d }) => d.id));

// Partidos: id = nombre de archivo, únicos
for (const { f, d } of partidos) {
  if (basename(f, '.json') !== d.id) err(f, `el id "${d.id}" no coincide con el nombre de archivo`);
}
// Temas
for (const { f, d } of temas) if (basename(f, '.json') !== d.id) err(f, `el id "${d.id}" no coincide con el nombre de archivo`);

// Propuestas
const vistos = new Set();
for (const { f, d } of propuestas) {
  if (vistos.has(d.id)) err(f, `id de propuesta duplicado: ${d.id}`);
  vistos.add(d.id);
  if (!idsPartido.has(d.partido)) err(f, `partido inexistente: ${d.partido}`);
  else if (publico(d) && !partidoPublico.get(d.partido)) warn(f, `propuesta publicada de un partido cuya ficha no está publicada (${d.partido}); no se mostrará en su ficha`);
  if (temas.length && !idsTema.has(d.tema)) warn(f, `tema sin ficha de tema: ${d.tema}`);
  if (d.estado === 'compromiso_2026' && d.tipo_informacion !== 'programa_electoral')
    err(f, 'estado "compromiso_2026" exige tipo_informacion "programa_electoral"');
  if (d.tipo_informacion === 'programa_electoral') {
    const p = partidos.find((x) => x.d.id === d.partido)?.d;
    if (p && p.programa_2026?.estado !== 'publicado') err(f, `cita el programa 2026, pero la ficha de ${d.partido} no lo marca como publicado`);
  }
}

// Escenarios
for (const { f, d } of escenarios) {
  const p = partidos.find((x) => x.d.id === d.partido)?.d;
  if (!p) err(f, `partido inexistente: ${d.partido}`);
  else if (p.rol_gobierno !== 'opcion_presidencia') warn(f, `${d.partido} no está marcado como opción de presidencia`);
  for (const k of ['medidas', 'instrumentos', 'apoyos', 'limites', 'efectos', 'incertidumbres']) {
    for (const it of d[k] ?? []) {
      if (['objetivo_declarado', 'efecto_estimado', 'hecho'].includes(it.tipo) && !(it.fuentes?.length))
        err(f, `${k}: un elemento de tipo "${it.tipo}" necesita al menos una fuente`);
    }
  }
}

// Historia: id = archivo, fecha coherente
for (const { f, d } of historia) {
  if (basename(f, '.json') !== d.id) err(f, `el id "${d.id}" no coincide con el nombre de archivo`);
  if (d.fecha > hoy) err(f, `fecha futura (${d.fecha})`);
  if (d.fecha_fin && d.fecha_fin < d.fecha) err(f, 'fecha_fin anterior a fecha');
}

// Glosario: relacionados existentes
const idsGlosario = new Set(glosario.map(({ f }) => basename(f, '.json')));
for (const { f, d } of glosario) for (const r of d.relacionados ?? []) if (!idsGlosario.has(r)) warn(f, `relacionado inexistente: ${r}`);

// Escaños
for (const { f, d } of escanos) {
  const suma = d.filas.reduce((s, x) => s + x.escanos, 0);
  if (suma !== d.total) err(f, `los escaños suman ${suma} y el total declarado es ${d.total}`);
  for (const x of d.filas) if (x.partido && !idsPartido.has(x.partido)) warn(f, `fila "${x.candidatura}" apunta a un partido sin ficha: ${x.partido}`);
  if (d.origen === 'encuesta' && !/metodolog/i.test(d.descripcion)) err(f, 'un conjunto de origen "encuesta" debe describir su metodología territorial');
}
for (const { f, d } of circ) {
  const suma = d.filas.reduce((s, x) => s + x.diputados, 0);
  if (suma !== 350) err(f, `los diputados suman ${suma}, no 350`);
}

// Calendario: fechas ordenadas
for (const { f, d } of calendario) for (const h of d.hitos) if (h.fecha_fin && h.fecha_fin < h.fecha_inicio) err(f, `hito "${h.titulo}": fecha_fin anterior a fecha_inicio`);

// Actualizaciones: no futuras
for (const { f, d } of actualizaciones) if (d.fecha > hoy) err(f, `actualización con fecha futura (${d.fecha})`);

// Puesta en producción
if (process.env.PUBLIC_INDEXABLE === 'true') {
  const tit = readFileSync(join(ROOT, 'src/config/titular.ts'), 'utf8');
  if (/'PENDIENTE/.test(tit)) errores.push('src/config/titular.ts: hay datos del titular pendientes y PUBLIC_INDEXABLE=true');
  if (!process.env.SITE_URL || /\.example\b/.test(process.env.SITE_URL)) errores.push('SITE_URL no está configurada con el dominio real y PUBLIC_INDEXABLE=true');
}
if (process.env.PUBLIC_ADS_ENABLED === 'true' && !/^ca-pub-\d{10,20}$/.test(process.env.PUBLIC_ADSENSE_CLIENT || ''))
  avisos.push('PUBLIC_ADS_ENABLED=true pero PUBLIC_ADSENSE_CLIENT no tiene formato ca-pub-…: los anuncios seguirán desactivados');

// Resumen
const cuenta = (col) => `${col.filter(({ d }) => !d.revision || publico(d)).length}/${col.length}`;
console.log('Contenido (publicado/total):');
console.log(`  partidos ${cuenta(partidos)} · propuestas ${cuenta(propuestas)} · temas ${cuenta(temas)} · escenarios ${cuenta(escenarios)}`);
console.log(`  historia ${cuenta(historia)} · glosario ${cuenta(glosario)} · escaños ${cuenta(escanos)} · calendario ${cuenta(calendario)}`);
if (avisos.length) console.warn(`\n${avisos.length} aviso(s):\n  - ` + avisos.join('\n  - '));
if (errores.length) {
  console.error(`\n${errores.length} error(es):\n  - ` + errores.join('\n  - '));
  process.exit(1);
}
console.log('\nValidación editorial superada.');
