# Modelo de contenido y reglas de redacción

Todo el contenido está en `src/content/**` como archivos JSON. El esquema formal está en
`src/content.config.ts` (Zod) y las comprobaciones adicionales en `scripts/validate-content.mjs`.
`npm run build` no compila si alguna entrada no cumple el esquema.

## Reglas editoriales que el modelo hace cumplir

1. **Toda afirmación factual relevante lleva fuente** (`fuentes`, mínimo una) con URL, emisor,
   fecha del documento si se conoce y fecha de consulta real (`fecha_consulta`).
2. **Tipo de afirmación explícito**: `hecho`, `declaracion` (atribuida) o `interpretacion`
   (análisis identificado como tal, con su fundamento).
3. **Estado editorial**: `borrador` → `revisado` → `publicado` → (`desactualizado`).
   Solo `publicado` y `desactualizado` aparecen en páginas públicas; `desactualizado` muestra un aviso.
4. **Nunca se rellena un hueco con suposiciones**. Si algo no se ha encontrado, no se crea la entrada:
   la web muestra automáticamente «No localizado en las fuentes consultadas» o «Pendiente de publicación».
5. **Programas antiguos no son compromisos de 2026**. Una propuesta solo tiene
   `estado: "compromiso_2026"` si figura en el programa electoral de 2026. Las posiciones
   tomadas de ponencias, resoluciones o declaraciones recientes llevan `estado: "posicion_vigente"`.
6. **Atribución**: el resumen de una propuesta describe lo que el partido plantea; no afirma que
   sus efectos estén demostrados. Los costes se separan en `coste_declarado` (lo que dice el partido)
   y `estimacion_independiente` (fuente externa identificada).
7. **Partido ≠ coalición electoral ≠ grupo parlamentario**. `naturaleza` indica qué es la formación;
   los resultados se registran por candidatura (`candidatura`), sin contar dos veces una misma lista.

## Objeto `fuente`

```json
{
  "titulo": "Real Decreto 806/2026, de 5 de octubre, de disolución…",
  "emisor": "Boletín Oficial del Estado",
  "tipo": "oficial",
  "url": "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-20742",
  "localizacion": "Artículo 2",
  "fecha_documento": "2026-10-06",
  "fecha_consulta": "2026-10-15"
}
```

`tipo`: `oficial` (BOE, Cortes, JEC, ministerios, INE…), `partido` (documentos del propio partido),
`academica`, `organismo_independiente` (AIReF, Banco de España, Eurostat, OCDE…), `medio`, `otra`.

## Colecciones

| Colección | Carpeta | Qué contiene |
|---|---|---|
| `partidos` | `src/content/partidos/<id>.json` | Ficha de cada formación (9 bloques) |
| `propuestas` | `src/content/propuestas/<partido>/<tema>-<n>.json` | Propuestas y posiciones por tema |
| `temas` | `src/content/temas/<id>.json` | Los 13 temas comunes, con contexto y competencias |
| `escenarios` | `src/content/escenarios/<partido>.json` | «¿Qué podría pasar si gobernara…?» |
| `historia` | `src/content/historia/<aaaa-mm-dd-slug>.json` | Hitos de la cronología |
| `glosario` | `src/content/glosario/<slug>.json` | Términos |
| `escanos` | `src/content/escanos/<id>.json` | Conjuntos de escaños con origen identificado |
| `circunscripciones` | `src/content/circunscripciones/<eleccion>.json` | Diputados por circunscripción |
| `actualizaciones` | `src/content/actualizaciones/<aaaa-mm-dd-slug>.json` | Registro público de cambios |

### Propuesta (ejemplo de estructura; los valores son ilustrativos de formato, no datos)

```json
{
  "id": "partido-vivienda-1",
  "partido": "<id-de-partido>",
  "tema": "vivienda",
  "eleccion": "generales-2026",
  "titulo": "Título breve y descriptivo",
  "tipo_informacion": "documento_oficial",
  "estado": "posicion_vigente",
  "resumen": "Qué plantea, en palabras propias y fieles.",
  "que_cambiaria": "Qué cambiaría respecto a la norma vigente (citar la norma).",
  "competencia": { "administraciones": ["estado", "ccaa"], "nota": "…" },
  "financiacion": { "nota": "El partido no publica coste ni fuente de financiación." },
  "calendario": "No publicado",
  "fuentes": [ { "…": "objeto fuente" } ],
  "revision": { "fecha_revision": "2026-10-15", "estado_editorial": "publicado" }
}
```

### Elementos del análisis «¿Qué podría pasar si gobernara…?»

Cada elemento lleva `tipo`:

- `objetivo_declarado`: lo que el partido dice que quiere lograr (con fuente del partido).
- `efecto_estimado`: efecto estimado por una fuente identificada (AIReF, Banco de España, estudio…).
- `hipotesis_editorial`: razonamiento condicionado de la redacción; debe explicar su fundamento.
- `requisito`: instrumento o condición jurídica/parlamentaria necesaria.
- `hecho`: dato comprobado.

## Flujo de actualización

1. Crear o editar el JSON (directamente o desde el panel `/admin/`), con `estado_editorial: "borrador"`.
2. Comprobar cada afirmación contra la fuente y pasar a `revisado`.
3. Una segunda persona (o el titular) revisa y pasa a `publicado`; añadir una entrada en `actualizaciones`
   si el cambio es relevante para el lector.
4. Si un dato deja de ser cierto, marcar `desactualizado` (se muestra con aviso) y crear la nueva versión.
5. `npm run build` valida todo antes de publicar.

Los procesos automáticos (por ejemplo, detectar cambios en una página oficial) solo pueden crear
entradas `borrador`. Nunca publican.
