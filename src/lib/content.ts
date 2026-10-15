import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import { PREVIEW_DRAFTS } from '../config/site';

type ConRevision = { revision: { estado_editorial: string } };

/** ¿Puede mostrarse públicamente? Solo `publicado` y `desactualizado` (este con aviso). */
export function esPublico(data: ConRevision) {
  const e = data.revision.estado_editorial;
  return e === 'publicado' || e === 'desactualizado' || (PREVIEW_DRAFTS && (e === 'borrador' || e === 'revisado'));
}

export async function publicados<C extends CollectionKey>(col: C): Promise<CollectionEntry<C>[]> {
  const all = await getCollection(col);
  return all.filter((e) => {
    const d = e.data as unknown as Partial<ConRevision>;
    return d.revision ? esPublico(d as ConRevision) : true;
  });
}

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

/** '2026-10-15' → '15 de octubre de 2026'; '2026-10' → 'octubre de 2026'; '2026' → '2026' */
export function fechaLarga(f?: string) {
  if (!f) return '';
  const [y, m, d] = f.split('-');
  if (!m) return y;
  if (!d) return `${MESES[+m - 1]} de ${y}`;
  return `${+d} de ${MESES[+m - 1]} de ${y}`;
}
export function fechaCorta(f?: string) {
  if (!f) return '';
  const [y, m, d] = f.split('-');
  if (!m) return y;
  if (!d) return `${m}/${y}`;
  return `${d}/${m}/${y}`;
}

export const ETIQUETAS = {
  tipoAfirmacion: { hecho: 'Hecho comprobado', declaracion: 'Declaración atribuida', interpretacion: 'Análisis o interpretación' },
  tipoFuente: {
    oficial: 'Fuente oficial',
    partido: 'Documento del partido',
    academica: 'Fuente académica',
    organismo_independiente: 'Organismo independiente',
    medio: 'Medio de comunicación',
    otra: 'Otra fuente',
  },
  tipoInformacion: {
    programa_electoral: 'Programa electoral 2026',
    documento_oficial: 'Documento oficial del partido',
    declaracion: 'Declaración pública',
    iniciativa_parlamentaria: 'Iniciativa parlamentaria',
    voto_parlamentario: 'Voto parlamentario',
  },
  estadoPropuesta: {
    compromiso_2026: 'Compromiso en el programa 2026',
    posicion_vigente: 'Posición declarada (no es aún programa 2026)',
    iniciativa_presentada: 'Iniciativa presentada',
    medida_aprobada: 'Medida ya aprobada',
  },
  administracion: { estado: 'Estado', ccaa: 'Comunidades autónomas', local: 'Ayuntamientos', ue: 'Unión Europea' },
  naturaleza: {
    partido: 'Partido político',
    federacion: 'Federación de partidos',
    coalicion_electoral: 'Coalición electoral',
    agrupacion: 'Agrupación de electores',
  },
  candidatura: {
    sin_informacion: 'No localizada en las fuentes consultadas',
    anunciada_por_partido: 'Anunciada por el partido (aún no oficial)',
    presentada: 'Presentada (publicada en el BOE)',
    proclamada: 'Proclamada oficialmente',
  },
  programa: {
    pendiente_publicacion: 'Pendiente de publicación',
    publicado: 'Publicado',
    no_localizado: 'No localizado en las fuentes consultadas',
  },
  analisis: {
    objetivo_declarado: 'Objetivo declarado por el partido',
    efecto_estimado: 'Efecto estimado por una fuente identificada',
    hipotesis_editorial: 'Hipótesis editorial condicionada',
    hecho: 'Hecho comprobado',
    requisito: 'Requisito jurídico o parlamentario',
  },
  categoriaHistoria: {
    'elecciones-gobiernos': 'Elecciones y gobiernos',
    'reformas-institucionales': 'Reformas institucionales',
    legislacion: 'Legislación relevante',
    'economia-sociedad': 'Economía y sociedad',
    territorial: 'Organización territorial',
    europa: 'Integración europea',
  },
} as const;

/** Orden alfabético estable (es-ES), usado como orden por defecto en toda la web. */
export const alfa = (a: string, b: string) => a.localeCompare(b, 'es', { sensitivity: 'base' });

/** Fecha más reciente de revisión entre varias entradas. */
export function ultimaRevision(items: { data: { revision?: { fecha_revision: string } } }[]) {
  return items
    .map((i) => i.data.revision?.fecha_revision)
    .filter(Boolean)
    .sort()
    .at(-1) as string | undefined;
}
