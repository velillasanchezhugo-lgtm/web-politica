// @ts-check
/**
 * Geometría de un hemiciclo: reparte N escaños en filas concéntricas y devuelve sus
 * coordenadas, ordenadas de izquierda a derecha (por ángulo) para que cada grupo
 * ocupe una cuña continua. El orden de los grupos lo decide quien llama
 * (en esta web: alfabético o por sentido del voto, nunca ideológico).
 */

/**
 * @param {number} total número de escaños
 * @param {{ filas?: number, radioInterior?: number }} [opts]
 * @returns {{ x: number, y: number, r: number }[]} coordenadas en un lienzo de 200×105
 */
export function posiciones(total, opts = {}) {
  if (!Number.isInteger(total) || total <= 0) return [];
  const filas = opts.filas ?? Math.max(1, Math.min(14, Math.round(Math.sqrt(total / 2.2))));
  const r0 = opts.radioInterior ?? 0.36;
  const radios = Array.from({ length: filas }, (_, i) => (filas === 1 ? 1 : r0 + ((1 - r0) * i) / (filas - 1)));
  const sumaR = radios.reduce((a, b) => a + b, 0);
  // Escaños por fila proporcionales al radio (mayores restos).
  const cuotas = radios.map((r) => (total * r) / sumaR);
  const base = cuotas.map(Math.floor);
  let resto = total - base.reduce((a, b) => a + b, 0);
  cuotas
    .map((q, i) => ({ i, f: q - Math.floor(q) }))
    .sort((a, b) => b.f - a.f)
    .forEach(({ i }) => { if (resto > 0) { base[i]++; resto--; } });

  const R = 98; // radio exterior en unidades del lienzo
  const cx = 100, cy = 100;
  const tam = Math.min(4.2, (R * (1 - r0)) / filas * 0.42);
  /** @type {{x:number,y:number,r:number,a:number,f:number}[]} */
  const seats = [];
  radios.forEach((rad, f) => {
    const n = base[f];
    for (let k = 0; k < n; k++) {
      const a = n === 1 ? Math.PI / 2 : Math.PI - (Math.PI * k) / (n - 1);
      seats.push({ x: cx + R * rad * Math.cos(a), y: cy - R * rad * Math.sin(a), r: tam, a, f });
    }
  });
  // Izquierda → derecha; a igualdad de ángulo, de dentro afuera.
  seats.sort((p, q) => q.a - p.a || p.f - q.f);
  return seats.map(({ x, y, r }) => ({ x: +x.toFixed(2), y: +y.toFixed(2), r: +r.toFixed(2) }));
}

/**
 * Asigna escaños consecutivos a cada grupo en el orden dado.
 * @template T
 * @param {(T & { escanos: number })[]} grupos
 * @param {number} total
 */
export function asignar(grupos, total) {
  const pos = posiciones(total);
  /** @type {{ x:number, y:number, r:number, g: number }[]} */
  const out = [];
  let i = 0;
  grupos.forEach((g, gi) => {
    for (let k = 0; k < g.escanos && i < pos.length; k++, i++) out.push({ ...pos[i], g: gi });
  });
  for (; i < pos.length; i++) out.push({ ...pos[i], g: -1 }); // sin asignar
  return out;
}

/** Color de texto legible (WCAG) sobre un fondo dado. */
export function textoSobre(hex) {
  const c = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const contraBlanco = 1.05 / (L + 0.05);
  const contraNegro = (L + 0.05) / 0.05;
  return contraBlanco >= contraNegro ? '#ffffff' : '#111318';
}
