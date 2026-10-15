/**
 * Configuración general del sitio. Los valores sensibles o de despliegue vienen de variables
 * de entorno (ver .env.example). Nada se inventa: lo que falte queda marcado como pendiente.
 */
const env = import.meta.env;

export const SITE = {
  nombre: 'Voto en Claro',
  nombreProvisional: true, // cambiar a false cuando el nombre sea definitivo
  lema: 'Partidos, propuestas y reglas del juego, con fuentes.',
  descripcion:
    'Guía independiente para entender las elecciones generales del 29 de noviembre de 2026: partidos, propuestas comparadas con fuentes, escenarios de Gobierno, cómo se vota e historia política desde la Transición.',
  idioma: 'es-ES',
  eleccion: {
    id: 'generales-2026',
    fecha: '2026-11-29',
    nombre: 'Elecciones generales del 29 de noviembre de 2026',
    decreto: {
      titulo: 'Real Decreto 806/2026, de 5 de octubre',
      url: 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-20742',
    },
  },
};

export const INDEXABLE = env.PUBLIC_INDEXABLE === 'true';
export const PREVIEW_DRAFTS = env.PUBLIC_PREVIEW_DRAFTS === 'true';

const client = (env.PUBLIC_ADSENSE_CLIENT || '').trim();
export const ADS = {
  client,
  // Solo se activan si hay interruptor explícito Y un identificador con formato válido.
  enabled: env.PUBLIC_ADS_ENABLED === 'true' && /^ca-pub-\d{10,20}$/.test(client),
  slots: {
    inarticle: (env.PUBLIC_ADSENSE_SLOT_INARTICLE || '').trim(),
    footer: (env.PUBLIC_ADSENSE_SLOT_FOOTER || '').trim(),
  },
};

export const ANALYTICS = {
  script: (env.PUBLIC_ANALYTICS_SCRIPT || '').trim(),
  domain: (env.PUBLIC_ANALYTICS_DOMAIN || '').trim(),
};
