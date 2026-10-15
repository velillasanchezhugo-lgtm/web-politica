import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { textoSobre } from '../src/lib/hemiciclo.js';

const lum = (hex) => {
  const c = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

test('el texto sobre el color de cada partido cumple WCAG AA (4,5:1)', () => {
  const dir = new URL('../src/content/partidos/', import.meta.url);
  for (const f of readdirSync(dir)) {
    const p = JSON.parse(readFileSync(new URL(f, dir), 'utf8'));
    const r = ratio(p.color_grafico, textoSobre(p.color_grafico));
    assert.ok(r >= 4.5, `${p.id}: ${p.color_grafico} da ${r.toFixed(2)}:1`);
  }
});
