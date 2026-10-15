import { test } from 'node:test';
import assert from 'node:assert/strict';
import { investidura, mocionCensura, mayoriaAbsoluta, validar, situacionGobierno } from '../src/lib/investidura.js';

test('mayoría absoluta del Congreso es 176', () => {
  assert.equal(mayoriaAbsoluta(350), 176);
  assert.equal(mayoriaAbsoluta(349), 175);
});

test('primera votación: 176 síes bastan aunque haya abstenciones', () => {
  const r = investidura([
    { nombre: 'A', escanos: 176, posicion: 'si' },
    { nombre: 'B', escanos: 174, posicion: 'abstencion' },
  ]);
  assert.equal(r.primeraVotacion.aprobada, true);
  assert.equal(r.investido, true);
});

test('primera votación: 175 síes no bastan aunque nadie vote en contra', () => {
  const r = investidura([
    { nombre: 'A', escanos: 175, posicion: 'si' },
    { nombre: 'B', escanos: 175, posicion: 'abstencion' },
  ]);
  assert.equal(r.primeraVotacion.aprobada, false);
  assert.equal(r.primeraVotacion.faltan, 1);
  // segunda votación: 175 sí > 0 no
  assert.equal(r.segundaVotacion.aprobada, true);
});

test('segunda votación: empate de síes y noes no inviste', () => {
  const r = investidura([
    { nombre: 'A', escanos: 170, posicion: 'si' },
    { nombre: 'B', escanos: 170, posicion: 'no' },
    { nombre: 'C', escanos: 10, posicion: 'abstencion' },
  ]);
  assert.equal(r.primeraVotacion.aprobada, false);
  assert.equal(r.segundaVotacion.aprobada, false);
  assert.equal(r.investido, false);
});

test('investidura de Sánchez de 16-11-2023: 179 a favor, 171 en contra', () => {
  const r = investidura([
    { nombre: 'Sí', escanos: 179, posicion: 'si' },
    { nombre: 'No', escanos: 171, posicion: 'no' },
  ]);
  assert.equal(r.primeraVotacion.aprobada, true);
});

test('investidura fallida de Feijóo (sept. 2023): 172 a favor, 178 en contra', () => {
  const r = investidura([
    { nombre: 'Sí', escanos: 172, posicion: 'si' },
    { nombre: 'No', escanos: 178, posicion: 'no' },
  ]);
  assert.equal(r.primeraVotacion.aprobada, false);
  assert.equal(r.segundaVotacion.aprobada, false);
});

test('voto dividido dentro de un grupo', () => {
  const r = investidura([
    { nombre: 'A', escanos: 170, posicion: 'si' },
    { nombre: 'B', escanos: 10, reparto: { si: 6, no: 2, abstencion: 2, ausente: 0 } },
    { nombre: 'C', escanos: 170, posicion: 'no' },
  ]);
  assert.equal(r.votos.si, 176);
  assert.equal(r.primeraVotacion.aprobada, true);
});

test('validación: negativos, no enteros y totales imposibles', () => {
  assert.ok(validar([{ nombre: 'A', escanos: -1 }]).errores.length > 0);
  assert.ok(validar([{ nombre: 'A', escanos: 1.5 }]).errores.length > 0);
  assert.ok(validar([{ nombre: 'A', escanos: 200 }, { nombre: 'B', escanos: 151 }]).errores.length > 0);
  assert.ok(validar([{ nombre: 'A', escanos: 10, reparto: { si: 5, no: 5, abstencion: 1, ausente: 0 } }]).errores.length > 0);
  const ok = validar([{ nombre: 'A', escanos: 300 }]);
  assert.equal(ok.errores.length, 0);
  assert.equal(ok.avisos.length, 1);
});

test('escaños sin asignar cuentan como no emitidos', () => {
  const r = investidura([{ nombre: 'A', escanos: 175, posicion: 'si' }]);
  assert.equal(r.votos.ausente, 175);
  assert.equal(r.primeraVotacion.aprobada, false);
  assert.equal(r.segundaVotacion.aprobada, true);
});

test('moción de censura de 2018: 180 a favor prospera', () => {
  assert.equal(mocionCensura([{ nombre: 'Sí', escanos: 180, posicion: 'si' }, { nombre: 'No', escanos: 169, posicion: 'no' }, { nombre: 'Abs', escanos: 1, posicion: 'abstencion' }]).aprobada, true);
  assert.equal(mocionCensura([{ nombre: 'Sí', escanos: 175, posicion: 'si' }, { nombre: 'No', escanos: 10, posicion: 'no' }]).aprobada, false);
});

test('gobierno en minoría', () => {
  assert.equal(situacionGobierno(152).mayoriaPropia, false);
  assert.equal(situacionGobierno(152).faltanParaMayoria, 24);
  assert.equal(situacionGobierno(176).mayoriaPropia, true);
});
