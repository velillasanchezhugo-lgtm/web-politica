// @ts-check
/**
 * Reparto de escaños por el método D'Hondt según el artículo 163 de la LOREG
 * (Ley Orgánica 5/1985): https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672
 *
 *  a) No se tienen en cuenta las candidaturas que no obtengan al menos el 3 % de los votos
 *     válidos emitidos en la circunscripción. Los votos válidos incluyen los votos en blanco
 *     (art. 96 LOREG); los nulos no cuentan.
 *  b) Se ordenan las candidaturas por votos y se divide el número de votos de cada una
 *     entre 1, 2, 3… hasta el número de escaños.
 *  c) Los escaños se atribuyen a los mayores cocientes, en orden decreciente.
 *  d) Si hay empate entre cocientes de distintas candidaturas, el escaño es para la que tenga
 *     más votos totales. Si también empatan en votos, el primer empate se resuelve por sorteo
 *     y los sucesivos de forma alternativa. Esta calculadora no hace sorteos: lo señala.
 *
 * Es una herramienta didáctica: sirve para una circunscripción, no para proyectar resultados
 * nacionales a partir de porcentajes estatales.
 */

/**
 * @param {{ escanos: number, candidaturas: {nombre:string, votos:number}[], blanco?: number, barrera?: number }} p
 */
export function dhondt({ escanos, candidaturas, blanco = 0, barrera = 0.03 }) {
  /** @type {string[]} */ const errores = [];
  if (!Number.isInteger(escanos) || escanos < 1) errores.push('El número de escaños debe ser un entero mayor que 0.');
  if (!Number.isInteger(blanco) || blanco < 0) errores.push('Los votos en blanco deben ser un entero igual o mayor que 0.');
  candidaturas.forEach((c, i) => {
    if (!Number.isInteger(c.votos) || c.votos < 0) errores.push(`${c.nombre || 'Candidatura ' + (i + 1)}: los votos deben ser un entero igual o mayor que 0.`);
  });
  const nombres = candidaturas.map((c) => c.nombre.trim());
  if (new Set(nombres).size !== nombres.length) errores.push('Hay candidaturas con el mismo nombre.');
  if (errores.length) return { errores };

  const votosCandidaturas = candidaturas.reduce((s, c) => s + c.votos, 0);
  const validos = votosCandidaturas + blanco;
  if (validos === 0) return { errores: ['No hay votos válidos.'] };
  const minimo = validos * barrera;

  const admitidas = candidaturas.filter((c) => c.votos >= minimo && c.votos > 0);
  /** @type {{nombre:string, divisor:number, cociente:number, votos:number}[]} */
  const cocientes = [];
  for (const c of admitidas) {
    for (let d = 1; d <= escanos; d++) cocientes.push({ nombre: c.nombre, divisor: d, cociente: c.votos / d, votos: c.votos });
  }
  cocientes.sort((a, b) => b.cociente - a.cociente || b.votos - a.votos);
  const ganadores = cocientes.slice(0, escanos);

  // ¿Hay un empate no resoluble (mismo cociente y mismos votos) en la frontera del último escaño?
  let empateSorteo = false;
  if (cocientes.length > escanos) {
    const ultimo = ganadores[ganadores.length - 1];
    const siguiente = cocientes[escanos];
    if (ultimo.cociente === siguiente.cociente && ultimo.votos === siguiente.votos && ultimo.nombre !== siguiente.nombre) empateSorteo = true;
  }

  /** @type {Record<string, number>} */ const reparto = {};
  for (const c of candidaturas) reparto[c.nombre] = 0;
  for (const g of ganadores) reparto[g.nombre]++;

  return {
    errores: [],
    validos,
    minimo,
    excluidas: candidaturas.filter((c) => !admitidas.includes(c)).map((c) => c.nombre),
    cocientes,
    ganadores,
    reparto,
    empateSorteo,
  };
}
