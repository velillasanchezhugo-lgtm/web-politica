# Estrategia de tráfico, SEO y calendario editorial

No disponemos de volúmenes de búsqueda reales, así que **no se citan cifras**. Las prioridades se basan en
utilidad para el lector, actualidad (calendario oficial), esfuerzo y oportunidad cualitativa (dudas que
la gente se plantea en cada fase electoral). Antes de publicar, conviene contrastarlas con Google Search
Console (tras verificar el dominio) y con Google Trends, que da interés relativo, no volúmenes.
No prometemos posiciones en Google.

## Principios

1. **Resolver dudas reales con páginas únicas**: una URL por partido, tema, hito histórico y artículo de
   la guía. Sin páginas generadas por combinaciones (p. ej. «PP vs PSOE en vivienda» × todas las parejas):
   el comparador usa el fragmento `#…` y una única URL canónica `/comparar/`.
2. **Títulos y descripciones específicos y honestos**: cada página define su `title` y `description`; nada
   de titulares engañosos ni de «última hora» sin novedad.
3. **Fechas reales**: la fecha de revisión de cada contenido es la de la última revisión editorial; no se
   renueva automáticamente.
4. **Enlazado interno**: partido ↔ temas ↔ comparador ↔ simulador ↔ guía ↔ glosario; migas de pan en
   todas las páginas internas.

## Implementado

- URLs estables con barra final (`/partidos/pp/`, `/temas/vivienda/`, `/historia/<fecha-slug>/`, `/guia/<slug>/`).
- `<link rel="canonical">` en todas las páginas, siempre hacia la URL sin parámetros.
- `sitemap-index.xml` automático (excluye `/admin/` y `/buscar/`); `robots.txt` dinámico.
- **Interruptor de indexación** (`PUBLIC_INDEXABLE`): hasta activarlo, todo lleva `noindex` y
  `robots.txt` bloquea el rastreo, para no indexar una versión sin revisar.
- Open Graph y Twitter Card con imagen por defecto (`public/og-default.png`).
- Datos estructurados solo cuando corresponden al contenido real: `WebSite` + `SearchAction`,
  `BreadcrumbList`, `PoliticalParty` (fichas), `Article` (guía e historia), `DefinedTermSet` (glosario).
  No se usa `FAQPage` ni marcado de reseñas o valoraciones.
- Rendimiento: HTML estático, sin fuentes web externas, JavaScript solo en las herramientas, imágenes
  mínimas; publicidad con altura reservada.
- Accesibilidad: un `h1` por página, «saltar al contenido», foco visible, controles nativos, contraste AA,
  `prefers-reduced-motion` y modo oscuro.

## Mantenerla útil después del 29-N

- **Resultados**: página con el resultado oficial cuando la JEC lo publique en el BOE (nuevo conjunto en
  `src/content/escanos/`). Hasta entonces, nada de proyecciones propias.
- **Investidura y Gobierno**: cronología de consultas del Rey, votaciones y acuerdos firmados, enlazando
  los textos íntegros.
- **Seguimiento de compromisos**: cada propuesta del Gobierno resultante pasa a seguimiento con estados
  «sin iniciar», «en tramitación» (enlace a la iniciativa en congreso.es), «aprobada» (enlace al BOE) o
  «no evaluable todavía». **Nunca se marca como incumplida** hasta que haya vencido el plazo comprometido
  y existan datos para evaluarla.
- **Historia**: añadir los hitos de la XVI legislatura a medida que se produzcan.
- **Evergreen**: guía, glosario e historia siguen siendo útiles fuera de campaña (y para elecciones
  autonómicas y europeas).

## Calendario editorial inicial (cuatro semanas)

Fechas oficiales del calendario: presentación de candidaturas del 21 al 26 de octubre, publicación de las
presentadas el 28 de octubre, proclamación publicada el 3 de noviembre y campaña del 13 al 27 de noviembre.

| Semana | Prioridad | Pieza | Por qué ahora | Esfuerzo |
|---|---|---|---|---|
| 1 (19–25 oct) | Alta | Completar y revisar las fichas de partido y propuestas por tema publicadas | Base de todo lo demás; los partidos están definiendo coaliciones y candidatos | Alto |
| 1 | Alta | Voto por correo: plazos y pasos (ya publicado; revisar con Correos e INE) | Plazo de solicitud abierto; duda práctica muy frecuente | Bajo |
| 1 | Media | Coaliciones registradas ante la JEC (cuando se publiquen) | Novedad oficial; aclara qué es partido, coalición y grupo | Medio |
| 2 (26 oct–1 nov) | Alta | Candidaturas presentadas (BOE del 28 oct): página por circunscripción con enlace oficial | Interés local; pregunta «¿a quién puedo votar en mi provincia?» | Medio |
| 2 | Media | «Qué cambia en 2026»: Madrid +1 y Cádiz −1 diputado; Ibiza y Formentera con un senador cada una | Cambios verificados y poco conocidos | Bajo |
| 2 | Media | Programas: incorporar cada programa 2026 cuando se publique (propuestas `compromiso_2026`) | Pasa de posiciones declaradas a compromisos | Alto |
| 3 (2–8 nov) | Alta | Candidaturas proclamadas (BOE del 3 nov) y actualización de fichas | Dato oficial definitivo | Medio |
| 3 | Alta | Comparativas por tema con programas 2026 (vivienda, empleo, pensiones, sanidad) | Máxima utilidad antes de la campaña | Alto |
| 3 | Media | «¿Qué podría pasar si gobernara…?» revisado con los programas | Contenido diferencial, análisis identificado | Alto |
| 4 (9–15 nov) | Alta | Inicio de campaña: guía de la jornada (mesa, documentación, voto en blanco y nulo) | Duda práctica en las semanas previas | Bajo |
| 4 | Media | Debates electorales: qué dijo cada candidato sobre cada tema, atribuido y con enlace | Picos de interés; solo declaraciones verificadas | Medio |
| 4 | Baja | Historia: «Todas las investiduras desde 1979» con votos oficiales | Evergreen y enlazable | Medio |

Cada pieza se publica solo cuando pasa la revisión editorial. Si un programa no se publica, la ficha lo
indica («Pendiente de publicación») en lugar de rellenar el hueco.
