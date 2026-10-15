/**
 * Pruebas de humo en navegador real (Playwright) sobre `astro preview`.
 * Uso: npm run build && npx astro preview --port 4321 &  luego  node tests/e2e/smoke.mjs
 * Requiere Playwright instalado (npx playwright o global). Guarda capturas en tests/e2e/out/.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const BASE = process.env.BASE_URL || 'http://localhost:4321';
const OUT = new URL('./out/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const errores = [];
const ok = (m) => console.log('✓', m);

async function pagina(viewport) {
  const ctx = await browser.newContext({ viewport, locale: 'es-ES' });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errores.push(`${page.url()}: ${e.message}`));
  page.on('console', (m) => m.type() === 'error' && !/favicon|pagefind/.test(m.text()) && errores.push(`${page.url()}: ${m.text()}`));
  return page;
}

// --- Simulador: reproduce la investidura de Sánchez (16-11-2023, 179 síes) ---
{
  const page = await pagina({ width: 390, height: 844 });
  await page.goto(BASE + '/simulador/');
  await page.waitForSelector('.sim-fila');
  await page.check('input[name="origen"][value="generales-2023"]', { force: true });
  const filas = await page.$$eval('.sim-fila strong', (els) => els.map((e) => e.textContent));
  assert.ok(filas.length >= 10, 'el preset oficial de 2023 carga los grupos');
  const si = ['Partido Socialista', 'Sumar', 'Esquerra', 'Junts', 'Bildu', 'Nacionalista Vasco', 'Galego', 'Canaria'];
  for (const [i, nombre] of filas.entries()) {
    if (si.some((s) => nombre.includes(s))) await page.selectOption(`#p${i}`, nombre.includes('Socialista') || nombre.includes('Sumar') ? 'gob' : 'apoyo');
  }
  const txt = await page.textContent('#resultado');
  assert.match(txt, /Sí: 179/);
  assert.match(txt, /No: 171/);
  assert.match(txt, /Primera votación.*Investidura aprobada/s);
  assert.match(txt, /Gobierno en minoría/);
  ok('simulador: investidura 2023 → 179/171, aprobada en primera votación, Gobierno en minoría (152)');
  await page.screenshot({ path: OUT + 'simulador-movil.png', fullPage: true });

  // Votación real de referencia: Feijóo, 27-09-2023
  await page.click('[data-ref="feijoo-2023"]');
  const tf = await page.textContent('#resultado');
  assert.match(tf, /Sí: 172/); assert.match(tf, /No: 178/);
  assert.match(tf, /Segunda votación.*No alcanza/s);
  assert.match(await page.textContent('#sim-origen'), /votación real/);
  ok('simulador: votación de referencia de Feijóo (27-09-2023) → 172/178, no investido');
  await page.click('[data-ref="sanchez-2023"]');
  assert.match(await page.textContent('#resultado'), /Sí: 179/);
  ok('simulador: votación de referencia de Sánchez (16-11-2023) → 179');

  // Validación: escaños negativos
  await page.fill('#e0', '-5');
  assert.match(await page.textContent('#resultado'), /Revisa los datos/);
  assert.match(await page.textContent('#sim-origen'), /introducidos por el usuario/);
  ok('simulador: rechaza negativos y cambia el origen a «datos del usuario» al editar');

  // Enlace compartido conserva la etiqueta
  const url = page.url();
  assert.ok(url.includes('sim=1'));
  const p2 = await pagina({ width: 1280, height: 900 });
  await p2.goto(url);
  await p2.waitForSelector('.sim-fila');
  assert.match(await p2.textContent('#sim-banner'), /Escenario compartido/);
  assert.match(await p2.textContent('#sim-banner'), /hipotético/);
  ok('simulador: el enlace compartido mantiene la etiqueta de simulación');

  // Moción de censura con mismas posiciones
  await p2.fill('#e0', '137');
  await p2.check('input[name="modo"][value="cen"]');
  assert.match(await p2.textContent('#resultado'), /Moción de censura/);
  ok('simulador: modo moción de censura');
}

// --- Calculadora D'Hondt ---
{
  const page = await pagina({ width: 390, height: 844 });
  await page.goto(BASE + '/guia/metodo-dhondt/');
  await page.waitForSelector('#dh-out table');
  await page.fill('#dh-esc', '7');
  await page.fill('#dv0', '340000'); await page.fill('#dv1', '280000'); await page.fill('#dv2', '160000'); await page.fill('#dv3', '60000'); await page.fill('#dv4', '0');
  await page.fill('#dh-blanco', '0');
  const filas = await page.$$eval('#dh-out tbody tr', (trs) => trs.map((tr) => tr.lastElementChild.textContent.trim()));
  assert.deepEqual(filas.slice(0, 4), ['3', '3', '1', '0']);
  ok('D’Hondt: 340k/280k/160k/60k con 7 escaños → 3/3/1/0');
  await page.screenshot({ path: OUT + 'dhondt-movil.png', fullPage: true });
}

// --- Comparador ---
{
  const page = await pagina({ width: 390, height: 844 });
  await page.goto(BASE + '/comparar/');
  const n = await page.$$eval('input[name="partido"]', (els) => els.length);
  if (n >= 2) {
    const ids = await page.$$eval('input[name="partido"]', (els) => els.slice(0, 5).map((e) => e.value));
    for (const id of ids) await page.check(`input[name="partido"][value="${id}"]`, { force: true }).catch(() => {});
    const marcados = await page.$$eval('input[name="partido"]:checked', (els) => els.length);
    assert.ok(marcados <= 4, 'máximo 4 partidos');
    assert.ok(page.url().includes('#partidos='), 'estado en el fragmento');
    await page.waitForSelector('.cmp-tema');
    ok(`comparador: ${marcados} partidos seleccionados como máximo, estado en el fragmento`);
    await page.screenshot({ path: OUT + 'comparador-movil.png', fullPage: false });
  } else {
    assert.match(await page.textContent('#cmp-out'), /al menos 2/);
    ok('comparador: estado vacío correcto (sin fichas publicadas aún)');
  }
}

// --- Páginas principales: carga, título, sin errores ---
for (const ruta of ['/', '/partidos/', '/temas/', '/si-gobernara/', '/historia/', '/guia/', '/guia/calendario-electoral/', '/glosario/', '/candidaturas/', '/metodologia/', '/fuentes/', '/buscar/?q=investidura', '/aviso-legal/']) {
  const page = await pagina({ width: 390, height: 844 });
  const r = await page.goto(BASE + ruta);
  assert.equal(r.status(), 200, ruta);
  const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
  assert.ok(scrollW <= 392, `${ruta}: desbordamiento horizontal en móvil (${scrollW}px)`);
  assert.ok((await page.$$('h1')).length === 1, `${ruta}: debe tener un único h1`);
  if (ruta === '/') await page.screenshot({ path: OUT + 'inicio-movil.png', fullPage: true });
  if (ruta.startsWith('/buscar')) { await page.waitForSelector('.pagefind-ui__result', { timeout: 8000 }); ok('buscador: devuelve resultados para «investidura»'); }
}
ok('páginas principales: 200, un solo h1 y sin scroll horizontal a 390 px');

// --- Sin anuncios ni scripts de terceros con la configuración por defecto ---
{
  const page = await pagina({ width: 1280, height: 900 });
  const externos = [];
  page.on('request', (r) => { const u = new URL(r.url()); if (!['localhost', '127.0.0.1'].includes(u.hostname)) externos.push(u.hostname); });
  await page.goto(BASE + '/');
  await page.goto(BASE + '/partidos/');
  assert.equal(await page.$$eval('.ad-slot', (e) => e.length), 0);
  assert.deepEqual(externos, []);
  ok('sin AdSense configurado: ningún bloque publicitario ni petición a terceros');
  await page.screenshot({ path: OUT + 'inicio-escritorio.png' });
}

// --- Accesibilidad (axe-core, reglas WCAG 2.1 A/AA) ---
{
  const { readFileSync } = await import('node:fs');
  const { createRequire } = await import('node:module');
  const axeSrc = readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');
  for (const ruta of ['/', '/simulador/', '/comparar/', '/guia/metodo-dhondt/', '/historia/', '/glosario/', '/candidaturas/', '/partidos/']) {
    for (const scheme of ['light', 'dark']) {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme });
      const page = await ctx.newPage();
      await page.goto(BASE + ruta);
      await page.addScriptTag({ content: axeSrc });
      const res = await page.evaluate(async () => await (window).axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }));
      const graves = res.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
      if (graves.length) errores.push(`axe ${ruta} (${scheme}): ` + graves.map((v) => `${v.id} [${v.nodes.length}] ${v.nodes[0]?.target}`).join('; '));
      await ctx.close();
    }
  }
  ok('accesibilidad: auditoría axe ejecutada (modo claro y oscuro)');
}

await browser.close();
if (errores.length) { console.error('Errores de consola:\n' + errores.join('\n')); process.exit(1); }
console.log('Todas las pruebas de humo superadas.');
