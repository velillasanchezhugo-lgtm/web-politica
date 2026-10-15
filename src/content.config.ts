/**
 * Modelo de contenido de Voto en Claro.
 *
 * Todo el contenido editorial vive en src/content/** como JSON y se valida aquí
 * con Zod en cada compilación. Las reglas que Zod no puede expresar
 * (referencias cruzadas, coherencia de fechas, sumas de escaños…) se comprueban
 * en scripts/validate-content.mjs, que se ejecuta antes de `astro build`.
 *
 * Documentación para redacción: docs/MODELO-DE-CONTENIDO.md
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const fecha = z
  .string()
  .regex(/^\d{4}(-\d{2}(-\d{2})?)?$/, 'Fecha en formato AAAA, AAAA-MM o AAAA-MM-DD');
const fechaDia = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha en formato AAAA-MM-DD');

/** Fuente citada. Toda afirmación factual relevante debe llevar al menos una. */
export const fuente = z.object({
  titulo: z.string().min(3),
  emisor: z.string().min(2), // organismo, partido, medio o autor
  tipo: z.enum(['oficial', 'partido', 'academica', 'organismo_independiente', 'medio', 'otra']),
  url: z.string().url(),
  localizacion: z.string().optional(), // página, artículo, apartado…
  fecha_documento: fecha.optional(),
  fecha_consulta: fechaDia,
});

/** Estado editorial. Solo `publicado` y `desactualizado` llegan a páginas públicas. */
const estadoEditorial = z.enum(['borrador', 'revisado', 'publicado', 'desactualizado']);

const revision = z.object({
  fecha_revision: fechaDia,
  estado_editorial: estadoEditorial,
  notas: z.string().optional(),
});

/** Texto con fuentes: unidad mínima de afirmación verificable. */
const afirmacion = z.object({
  texto: z.string().min(10),
  tipo: z.enum([
    'hecho', // hecho comprobado
    'declaracion', // lo que alguien dijo (atribuido)
    'interpretacion', // análisis u opinión identificada como tal
  ]).default('hecho'),
  fecha: fecha.optional(),
  fuentes: z.array(fuente).min(1),
});

export const TEMAS = [
  'economia',
  'empleo',
  'vivienda',
  'sanidad',
  'educacion',
  'pensiones',
  'inmigracion',
  'seguridad-justicia',
  'igualdad-derechos',
  'energia-medioambiente',
  'organizacion-territorial',
  'ue-exterior',
  'tecnologia',
] as const;

const temas = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/temas' }),
  schema: z.object({
    id: z.enum(TEMAS),
    nombre: z.string(),
    nombre_corto: z.string(),
    descripcion: z.string(),
    orden: z.number().int(),
    /** Contexto: situación vigente, con fuentes. */
    contexto: z.array(afirmacion).default([]),
    /** Quién tiene competencias (Estado, CCAA, entidades locales, UE). */
    competencias: z.array(afirmacion).default([]),
    revision,
  }),
});

const partidos = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/partidos' }),
  schema: z.object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    nombre: z.string(),
    siglas: z.string(),
    /** Naturaleza jurídica de la formación (no confundir con grupo parlamentario). */
    naturaleza: z.enum(['partido', 'federacion', 'coalicion_electoral', 'agrupacion']),
    ambito: z.enum(['estatal', 'territorial']),
    territorio: z.string().optional(),
    /** Color solo para gráficos de escaños; nunca para la identidad del sitio. */
    color_grafico: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    web_oficial: z.string().url().optional(),
    /** Por qué figura en el directorio (ver /metodologia/#cobertura). */
    criterio_inclusion: z.string(),
    resumen: z.string().min(40),
    historia: z.array(afirmacion).min(1),
    liderazgo: z.array(
      z.object({
        cargo: z.string(),
        nombre: z.string(),
        desde: fecha.optional(),
        fuentes: z.array(fuente).min(1),
      }),
    ),
    /** Candidatura a las generales de 2026. */
    candidatura_2026: z.object({
      estado: z.enum([
        'sin_informacion', // nada localizado
        'anunciada_por_partido', // anuncio del partido, aún sin presentar
        'presentada', // publicada en el BOE como presentada
        'proclamada', // proclamada y publicada en el BOE
      ]),
      forma_concurrencia: z.string().optional(), // «en solitario», «dentro de la coalición X»…
      candidato_presidencia: z.string().optional(),
      detalle: z.array(afirmacion).default([]),
      /** URL oficial con las listas por circunscripción, cuando exista. */
      listas_oficiales_url: z.string().url().optional(),
    }),
    orientacion: z.object({
      descripcion: z.string(),
      autodefinicion: afirmacion.optional(), // cómo se define el propio partido
      clasificaciones_externas: z.array(afirmacion).default([]),
      matices: z.string().optional(),
    }),
    resultados: z
      .array(
        z.object({
          eleccion: z.string(), // p. ej. 'generales-2023'
          candidatura: z.string(), // nombre de la candidatura con la que concurrió
          votos: z.number().int().nonnegative().optional(),
          porcentaje: z.number().nonnegative().max(100).optional(),
          escanos_congreso: z.number().int().nonnegative().optional(),
          escanos_senado: z.number().int().nonnegative().optional(),
          nota: z.string().optional(),
          fuentes: z.array(fuente).min(1),
        }),
      )
      .default([]),
    trayectoria_institucional: z.array(afirmacion).default([]),
    pactos: z.object({
      anteriores: z.array(afirmacion).default([]),
      posicion_actual: z.array(afirmacion).default([]),
    }),
    programa_2026: z.object({
      estado: z.enum(['pendiente_publicacion', 'publicado', 'no_localizado']),
      url: z.string().url().optional(),
      fecha_publicacion: fecha.optional(),
      comprobado_en: fechaDia,
    }),
    /** Bloque 8 de la ficha. */
    balance_informacion: z.object({
      concreto: z.array(z.string()).default([]),
      sin_desarrollar: z.array(z.string()).default([]),
      pendiente: z.array(z.string()).default([]),
    }),
    /** ¿Tiene opciones realistas de encabezar el Gobierno? Determina qué análisis se muestra. */
    rol_gobierno: z.enum(['opcion_presidencia', 'influencia_parlamentaria', 'sin_representacion']),
    revision,
  }),
});

/** Propuestas y posiciones, una entrada por partido y tema (o más). */
const propuestas = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/propuestas' }),
  schema: z.object({
    id: z.string(),
    partido: z.string(),
    tema: z.enum(TEMAS),
    eleccion: z.literal('generales-2026'),
    titulo: z.string().min(5),
    /** Tipo de información: qué clase de documento la respalda. */
    tipo_informacion: z.enum([
      'programa_electoral', // programa de 2026
      'documento_oficial', // ponencia, resolución, documento del partido no electoral
      'declaracion', // declaración pública de un dirigente
      'iniciativa_parlamentaria', // proposición de ley, enmienda, moción…
      'voto_parlamentario', // cómo votó
    ]),
    /** Estado de la propuesta respecto a 2026. */
    estado: z.enum([
      'compromiso_2026', // incluida en el programa de 2026
      'posicion_vigente', // posición declarada, no aún programa 2026
      'iniciativa_presentada',
      'medida_aprobada', // ya aprobada (por ejemplo en un Gobierno anterior)
    ]),
    resumen: z.string().min(20), // resumen fiel, en palabras propias
    que_cambiaria: z.string().optional(), // respecto a la situación vigente
    competencia: z.object({
      administraciones: z.array(z.enum(['estado', 'ccaa', 'local', 'ue'])).min(1),
      nota: z.string().optional(),
    }),
    financiacion: z.object({
      coste_declarado: z.string().optional(), // lo que dice el partido
      estimacion_independiente: afirmacion.optional(), // fuente externa identificada
      nota: z.string().optional(),
    }),
    calendario: z.string().optional(),
    detalle: z.string().optional(),
    fuentes: z.array(fuente).min(1),
    revision,
  }),
});

/** Análisis «¿Qué podría pasar si gobernara…?» */
const elementoAnalisis = z.object({
  texto: z.string().min(10),
  tipo: z.enum(['objetivo_declarado', 'efecto_estimado', 'hipotesis_editorial', 'hecho', 'requisito']),
  fuentes: z.array(fuente).default([]),
});
const escenarios = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/escenarios' }),
  schema: z.object({
    partido: z.string(),
    titulo: z.string(),
    resumen: z.string(),
    medidas: z.array(elementoAnalisis),
    instrumentos: z.array(elementoAnalisis),
    apoyos: z.array(elementoAnalisis),
    limites: z.array(elementoAnalisis),
    efectos: z.array(elementoAnalisis),
    incertidumbres: z.array(elementoAnalisis),
    revision,
  }),
});

const historia = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/historia' }),
  schema: z.object({
    id: z.string(),
    fecha: fechaDia,
    fecha_fin: fechaDia.optional(),
    titulo: z.string(),
    categorias: z
      .array(
        z.enum([
          'elecciones-gobiernos',
          'reformas-institucionales',
          'legislacion',
          'economia-sociedad',
          'territorial',
          'europa',
        ]),
      )
      .min(1),
    resumen: z.string(),
    contexto: z.string(),
    consecuencias: z.array(afirmacion).default([]),
    interpretaciones: z.array(afirmacion).default([]),
    fuentes: z.array(fuente).min(1),
    revision,
  }),
});

const glosario = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/glosario' }),
  schema: z.object({
    termino: z.string(),
    definicion: z.string(),
    ejemplo: z.string().optional(),
    relacionados: z.array(z.string()).default([]),
    fuentes: z.array(fuente).default([]),
    revision,
  }),
});

/** Registro público de actualizaciones verificadas, con fecha real. */
const actualizaciones = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/actualizaciones' }),
  schema: z.object({
    fecha: fechaDia,
    titulo: z.string(),
    descripcion: z.string(),
    enlace_interno: z.string().optional(),
    fuentes: z.array(fuente).default([]),
    tipo: z.enum(['contenido', 'correccion', 'dato_oficial']),
  }),
});

/** Conjuntos de escaños con origen identificado (resultados oficiales o encuestas). */
const escanos = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/escanos' }),
  schema: z.object({
    id: z.string(),
    nombre: z.string(),
    origen: z.enum(['resultado_oficial', 'encuesta']),
    eleccion: z.string().optional(),
    descripcion: z.string(),
    total: z.number().int().positive(),
    filas: z.array(
      z.object({
        candidatura: z.string(),
        partido: z.string().optional(), // id de ficha, si existe
        escanos: z.number().int().nonnegative(),
        votos: z.number().int().nonnegative().optional(),
        porcentaje: z.number().nonnegative().max(100).optional(),
        color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
      }),
    ),
    fuentes: z.array(fuente).min(1),
    revision,
  }),
});

/** Circunscripciones y diputados asignados por real decreto de convocatoria. */
const circunscripciones = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/circunscripciones' }),
  schema: z.object({
    eleccion: z.string(),
    filas: z.array(z.object({ nombre: z.string(), comunidad: z.string(), diputados: z.number().int().positive() })),
    fuentes: z.array(fuente).min(1),
    revision,
  }),
});

/** Calendario electoral oficial (plazos derivados de la LOREG y del real decreto). */
const calendario = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/calendario' }),
  schema: z.object({
    eleccion: z.string(),
    hitos: z.array(
      z.object({
        fecha_inicio: fechaDia,
        fecha_fin: fechaDia.optional(),
        titulo: z.string(),
        descripcion: z.string().optional(),
        fuentes: z.array(fuente).min(1),
      }),
    ),
    revision,
  }),
});

/** Artículos de la guía electoral (Markdown con frontmatter). */
const guia = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/guia' }),
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string().max(170),
    orden: z.number().int(),
    resumen: z.array(z.string()).min(1).max(5), // nivel 1: resumen rápido
    fuentes: z.array(fuente).min(1),
    revision,
  }),
});

export const collections = {
  calendario,
  guia,
  temas,
  partidos,
  propuestas,
  escenarios,
  historia,
  glosario,
  actualizaciones,
  escanos,
  circunscripciones,
};
