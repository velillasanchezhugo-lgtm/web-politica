import type { Tinta } from './partidos';

/** Siglas de una candidatura oficial: el último paréntesis del nombre del BOE, si existe. */
export function siglasDe(candidatura: string) {
  const m = candidatura.match(/\(([^()]+)\)\s*$/);
  return m ? m[1] : candidatura;
}

/**
 * Agrupa las filas de un resultado oficial por formación (p. ej. PSOE y PSC, que forman un mismo
 * grupo parlamentario) para dibujarlas, conservando los nombres oficiales de las candidaturas.
 * Orden alfabético por siglas: no refleja la ubicación en la Cámara ni posiciones ideológicas.
 */
export function gruposDe(
  filas: { candidatura: string; partido?: string; escanos: number; color: string }[],
  paleta: Map<string, Tinta>,
  publicas: Set<string>,
) {
  const m = new Map<string, { nombre: string; siglas: string; escanos: number; color: string; ink?: string; href?: string; candidaturas: string[] }>();
  for (const f of filas) {
    if (!f.escanos) continue;
    const k = f.partido ?? f.candidatura;
    const t = f.partido ? paleta.get(f.partido) : undefined;
    const g = m.get(k);
    if (g) {
      g.escanos += f.escanos;
      g.candidaturas.push(f.candidatura);
      g.siglas = g.candidaturas.map(siglasDe).join(' + ');
      g.nombre = g.candidaturas.join(' + ');
    } else {
      m.set(k, {
        nombre: f.candidatura,
        siglas: siglasDe(f.candidatura),
        escanos: f.escanos,
        color: t?.color ?? f.color,
        ink: t?.ink,
        href: f.partido && publicas.has(f.partido) ? `/partidos/${f.partido}/` : undefined,
        candidaturas: [f.candidatura],
      });
    }
  }
  return [...m.values()].sort((a, b) => a.siglas.localeCompare(b.siglas, 'es'));
}
