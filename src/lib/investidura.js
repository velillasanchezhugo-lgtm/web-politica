// @ts-check
/**
 * Reglas de votación del Congreso de los Diputados aplicadas por el simulador.
 *
 * Fuentes:
 *  - Constitución Española, art. 99 (investidura) y art. 113 (moción de censura).
 *    https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229
 *  - Reglamento del Congreso de los Diputados, arts. 170–172 (investidura) y 175–179 (censura).
 *
 * Investidura:
 *  - Primera votación: el candidato necesita mayoría absoluta de los miembros de la Cámara
 *    (176 de 350), con independencia de cuántos voten o se abstengan.
 *  - Segunda votación (48 horas después): basta mayoría simple: más votos a favor que en contra.
 *    Las abstenciones y ausencias no cuentan ni a favor ni en contra.
 *  - Si ningún candidato obtiene la confianza en dos meses desde la primera votación,
 *    el Rey disuelve las Cortes y convoca nuevas elecciones (art. 99.5 CE).
 * Moción de censura:
 *  - Votación única; requiere mayoría absoluta (176 de 350) a favor. Es constructiva:
 *    incluye un candidato alternativo, que queda investido si prospera (arts. 113–114 CE).
 */

/** @typedef {'si'|'no'|'abstencion'|'ausente'} Posicion */
/**
 * @typedef {Object} Fila
 * @property {string} nombre
 * @property {number} escanos
 * @property {Posicion} [posicion]   posición de todo el grupo
 * @property {{si:number,no:number,abstencion:number,ausente:number}} [reparto] voto dividido (opcional)
 */

export const MIEMBROS_CONGRESO = 350;

/** Mayoría absoluta: más de la mitad de los miembros de derecho. Con 350, 176. */
export function mayoriaAbsoluta(total = MIEMBROS_CONGRESO) {
  return Math.floor(total / 2) + 1;
}

/**
 * Valida un conjunto de filas. Devuelve lista de errores (vacía si es válido) y avisos.
 * @param {Fila[]} filas
 * @param {number} total
 */
export function validar(filas, total = MIEMBROS_CONGRESO) {
  /** @type {string[]} */ const errores = [];
  /** @type {string[]} */ const avisos = [];
  if (!Number.isInteger(total) || total <= 0) errores.push('El total de escaños debe ser un número entero positivo.');
  let suma = 0;
  filas.forEach((f, i) => {
    const etiqueta = f.nombre?.trim() || `Fila ${i + 1}`;
    if (!Number.isInteger(f.escanos) || f.escanos < 0) {
      errores.push(`${etiqueta}: los escaños deben ser un número entero igual o mayor que 0.`);
      return;
    }
    suma += f.escanos;
    if (f.reparto) {
      const r = f.reparto;
      for (const k of /** @type {const} */ (['si', 'no', 'abstencion', 'ausente'])) {
        if (!Number.isInteger(r[k]) || r[k] < 0) errores.push(`${etiqueta}: el voto «${k}» debe ser un entero igual o mayor que 0.`);
      }
      const s = r.si + r.no + r.abstencion + r.ausente;
      if (s !== f.escanos) errores.push(`${etiqueta}: el reparto de votos suma ${s}, pero tiene ${f.escanos} escaños.`);
    }
  });
  if (suma > total) errores.push(`Los escaños suman ${suma}, más que los ${total} de la Cámara.`);
  else if (suma < total && errores.length === 0)
    avisos.push(`Faltan ${total - suma} escaños por asignar. Se tratan como votos no emitidos; la mayoría absoluta se sigue calculando sobre ${total}.`);
  return { errores, avisos, suma };
}

/**
 * Suma los votos de una votación.
 * @param {Fila[]} filas
 * @param {number} total
 */
export function recuento(filas, total = MIEMBROS_CONGRESO) {
  let si = 0, no = 0, abstencion = 0, ausente = 0, asignados = 0;
  for (const f of filas) {
    asignados += f.escanos;
    if (f.reparto) {
      si += f.reparto.si; no += f.reparto.no; abstencion += f.reparto.abstencion; ausente += f.reparto.ausente;
    } else {
      const p = f.posicion ?? 'ausente';
      if (p === 'si') si += f.escanos;
      else if (p === 'no') no += f.escanos;
      else if (p === 'abstencion') abstencion += f.escanos;
      else ausente += f.escanos;
    }
  }
  const sinAsignar = Math.max(0, total - asignados);
  return { si, no, abstencion, ausente: ausente + sinAsignar, total };
}

/**
 * Resultado de una investidura en primera y segunda votación con las mismas posiciones.
 * @param {Fila[]} filas
 * @param {number} total
 */
export function investidura(filas, total = MIEMBROS_CONGRESO) {
  const v = recuento(filas, total);
  const absoluta = mayoriaAbsoluta(total);
  const primera = v.si >= absoluta;
  const segunda = v.si > v.no;
  return {
    votos: v,
    mayoriaAbsoluta: absoluta,
    primeraVotacion: { aprobada: primera, faltan: Math.max(0, absoluta - v.si) },
    segundaVotacion: {
      aplicable: !primera,
      aprobada: !primera && segunda,
      margen: v.si - v.no, // > 0 necesario
    },
    investido: primera || segunda,
  };
}

/**
 * Moción de censura: votación única por mayoría absoluta.
 * @param {Fila[]} filas
 * @param {number} total
 */
export function mocionCensura(filas, total = MIEMBROS_CONGRESO) {
  const v = recuento(filas, total);
  const absoluta = mayoriaAbsoluta(total);
  return { votos: v, mayoriaAbsoluta: absoluta, aprobada: v.si >= absoluta, faltan: Math.max(0, absoluta - v.si) };
}

/**
 * Escaños de los grupos marcados como integrantes del Gobierno: indica si el Gobierno
 * tendría mayoría absoluta propia o sería un Gobierno en minoría.
 * @param {number} escanosGobierno
 * @param {number} total
 */
export function situacionGobierno(escanosGobierno, total = MIEMBROS_CONGRESO) {
  const absoluta = mayoriaAbsoluta(total);
  return {
    escanos: escanosGobierno,
    mayoriaPropia: escanosGobierno >= absoluta,
    faltanParaMayoria: Math.max(0, absoluta - escanosGobierno),
  };
}
