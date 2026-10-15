import { test } from 'node:test';
import assert from 'node:assert/strict';
import { posiciones, asignar, textoSobre } from '../src/lib/hemiciclo.js';

test('el hemiciclo tiene exactamente los escaños pedidos', () => {
  for (const n of [1, 7, 33, 350, 351]) assert.equal(posiciones(n).length, n);
});
test('los escaños van de izquierda a derecha', () => {
  const p = posiciones(350);
  assert.ok(p[0].x < p[349].x);
});
test('asignar respeta los escaños de cada grupo y marca los no asignados', () => {
  const s = asignar([{ escanos: 176 }, { escanos: 170 }], 350);
  assert.equal(s.filter((x) => x.g === 0).length, 176);
  assert.equal(s.filter((x) => x.g === 1).length, 170);
  assert.equal(s.filter((x) => x.g === -1).length, 4);
});
test('texto legible sobre colores claros y oscuros', () => {
  assert.equal(textoSobre('#F2C200'), '#111318');
  assert.equal(textoSobre('#1D5FAF'), '#ffffff');
});
