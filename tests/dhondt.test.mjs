import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dhondt } from '../src/lib/dhondt.js';

test('ejemplo clásico: 7 escaños', () => {
  // Ejemplo ficticio: A 340.000, B 280.000, C 160.000, D 60.000
  const r = dhondt({
    escanos: 7,
    candidaturas: [
      { nombre: 'A', votos: 340000 },
      { nombre: 'B', votos: 280000 },
      { nombre: 'C', votos: 160000 },
      { nombre: 'D', votos: 60000 },
    ],
  });
  assert.deepEqual(r.reparto, { A: 3, B: 3, C: 1, D: 0 });
});

test('la barrera del 3 % se calcula sobre votos válidos, incluidos los blancos', () => {
  // Válidos = 97.000 + 3.000 + 10.000 blancos = 110.000; 3 % = 3.300 → C (3.000) queda fuera
  const r = dhondt({
    escanos: 3,
    blanco: 10000,
    candidaturas: [
      { nombre: 'A', votos: 60000 },
      { nombre: 'B', votos: 37000 },
      { nombre: 'C', votos: 3000 },
    ],
  });
  assert.equal(r.validos, 110000);
  assert.deepEqual(r.excluidas, ['C']);
  assert.equal(r.reparto.C, 0);
});

test('sin blancos, la misma candidatura C sí supera la barrera', () => {
  const r = dhondt({ escanos: 3, candidaturas: [{ nombre: 'A', votos: 60000 }, { nombre: 'B', votos: 37000 }, { nombre: 'C', votos: 3000 }] });
  assert.deepEqual(r.excluidas, []);
});

test('empate de cocientes: gana quien tenga más votos totales', () => {
  // A 200 / 2 = 100 ; B 100 / 1 = 100 → empate en el 2.º escaño, gana A (más votos)
  const r = dhondt({ escanos: 2, candidaturas: [{ nombre: 'A', votos: 200 }, { nombre: 'B', votos: 100 }] });
  assert.deepEqual(r.reparto, { A: 2, B: 0 });
  assert.equal(r.empateSorteo, false);
});

test('empate total señala sorteo', () => {
  const r = dhondt({ escanos: 1, candidaturas: [{ nombre: 'A', votos: 100 }, { nombre: 'B', votos: 100 }] });
  assert.equal(r.empateSorteo, true);
});

test('errores de entrada', () => {
  assert.ok(dhondt({ escanos: 0, candidaturas: [{ nombre: 'A', votos: 1 }] }).errores.length);
  assert.ok(dhondt({ escanos: 2, candidaturas: [{ nombre: 'A', votos: -1 }] }).errores.length);
  assert.ok(dhondt({ escanos: 2, candidaturas: [{ nombre: 'A', votos: 1 }, { nombre: 'A', votos: 2 }] }).errores.length);
});
