import { getCollection } from 'astro:content';
import { textoSobre } from './hemiciclo.js';

export interface Tinta { id: string; nombre: string; siglas: string; color: string; ink: string }

/**
 * Colores de identidad de cada formación: una sola fuente (campo `color_grafico` de su ficha),
 * para que un partido tenga siempre el mismo color en toda la web. El color no es una afirmación
 * factual, así que se toma de cualquier ficha, esté o no publicada.
 */
export async function paleta(): Promise<Map<string, Tinta>> {
  const all = await getCollection('partidos');
  return new Map(all.map((p) => [p.data.id, { id: p.data.id, nombre: p.data.nombre, siglas: p.data.siglas, color: p.data.color_grafico, ink: textoSobre(p.data.color_grafico) }]));
}

/** Variables CSS para tematizar un bloque con el color de un partido. */
export const estiloPartido = (t?: { color: string; ink: string }) => (t ? `--pc:${t.color};--pc-ink:${t.ink}` : '');

/**
 * Escaños obtenidos en el Congreso en 2023 por candidaturas de la propia formación.
 * Se excluyen las filas de candidaturas predecesoras con otro nombre (p. ej. «Sumar» en la ficha
 * de Frente Amplio), para no atribuir a una coalición nueva el resultado de otra distinta.
 */
export function escanos2023(p: { nombre: string; siglas: string; resultados: { eleccion: string; candidatura: string; escanos_congreso?: number }[] }) {
  const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
  const claves = [p.nombre, ...p.siglas.split('/')].map((s) => norm(s.trim())).filter((s) => s.length >= 2);
  const propias = p.resultados.filter((r) => r.eleccion === 'generales-2023' && r.escanos_congreso != null && !norm(r.candidatura).includes('predecesor') && claves.some((k) => norm(r.candidatura).includes(k)));
  return propias.length ? propias.reduce((s, r) => s + (r.escanos_congreso ?? 0), 0) : undefined;
}
