# Voto en Claro (nombre provisional)

Plataforma informativa independiente sobre política española y las elecciones generales del
**29 de noviembre de 2026** ([Real Decreto 806/2026](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-20742)).
Partidos, propuestas comparadas con fuentes, escenarios de Gobierno, simulador de investidura,
guía electoral e historia política desde 1975.

## Arquitectura (y por qué)

- **[Astro 5](https://astro.build) en modo estático**: cada página es HTML indexable con URL estable;
  carga rápida, sin servidor que mantener y alojamiento barato o gratuito.
- **Contenido separado del código**: todo el contenido son archivos JSON/Markdown en `src/content/`,
  validados con Zod (`src/content.config.ts`) y con reglas editoriales extra (`scripts/validate-content.mjs`).
  Si un dato no cumple el modelo, **la web no compila**.
- **Herramientas interactivas en TypeScript sin framework** (comparador, simulador, calculadora D’Hondt,
  filtros): poco JavaScript, accesibles con teclado y con estado en el fragmento de la URL (`#…`),
  que no se envía a ningún servidor.
- **Buscador [Pagefind](https://pagefind.app)**: índice estático generado al compilar; funciona sin servidor.
- **Panel editorial [Decap CMS](https://decapcms.org)** en `/admin/`: edita en el repositorio Git con flujo
  de revisión (pull requests). Ver `docs/PANEL-EDITORIAL.md`.
- Lógica crítica aislada y probada: `src/lib/investidura.js` (arts. 99 y 113 CE) y `src/lib/dhondt.js`
  (art. 163 LOREG).

## Ejecutar

```bash
npm install
npm run dev          # desarrollo en http://localhost:4321
npm test             # pruebas unitarias (investidura y D'Hondt)
npm run build        # valida contenido + compila + índice de búsqueda → dist/
npm run preview      # sirve dist/ en local
npm run test:e2e     # pruebas en navegador (con `npm run preview` en marcha)
```

Copia `.env.example` a `.env` para configurar dominio, indexación, AdSense y medición.
**Por defecto la web no es indexable y no muestra anuncios**: hay que activarlo expresamente.

## Estructura

```
src/content/       contenido (partidos, propuestas, temas, historia, glosario, guía, datos electorales…)
src/content.config.ts  modelo de datos (Zod)
src/pages/         páginas y rutas (URLs estables)
src/components/    componentes de presentación
src/lib/           lógica: investidura, D'Hondt, utilidades de contenido
src/config/        configuración del sitio y datos del titular (PENDIENTES)
scripts/           validación editorial y generación de la configuración del panel
docs/              modelo de contenido, panel, SEO, publicidad y privacidad, ingresos, despliegue
research/          notas de verificación (no se publican)
tests/             pruebas unitarias y de navegador
```

## Actualizar contenido

Ver `docs/MODELO-DE-CONTENIDO.md`. Resumen: crea o edita el JSON (o usa `/admin/`) con
`estado_editorial: "borrador"`, verifica contra la fuente, pasa a `revisado` y, tras una segunda revisión,
a `publicado`. Solo `publicado` y `desactualizado` aparecen en la web. Añade una entrada en
`src/content/actualizaciones/` con la fecha real si el cambio es relevante para el lector.

## Documentación

- `docs/MODELO-DE-CONTENIDO.md`: modelo de datos y reglas editoriales.
- `docs/PANEL-EDITORIAL.md`: panel `/admin/`, autenticación y flujo de revisión.
- `docs/SEO-Y-CALENDARIO-EDITORIAL.md`: estrategia de tráfico y calendario de cuatro semanas.
- `docs/PUBLICIDAD-Y-PRIVACIDAD.md`: AdSense, consentimiento (CMP) y medición agregada.
- `docs/MODELO-DE-INGRESOS.md`: modelo orientativo de ingresos y costes.
- `docs/DESPLIEGUE.md`: publicación paso a paso y lista de comprobación.
