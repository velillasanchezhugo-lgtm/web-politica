# Publicidad (AdSense), consentimiento y medición

> Esto no es asesoramiento jurídico. Ningún banner garantiza por sí solo el cumplimiento legal: hace falta
> una configuración correcta, textos legales revisados por un profesional y coherencia con lo que la web
> hace realmente.

## Estado por defecto: todo desactivado

- Sin `PUBLIC_ADS_ENABLED=true` **y** un `PUBLIC_ADSENSE_CLIENT` con formato `ca-pub-…`, no se carga
  ningún script de Google ni se pinta ningún bloque (`src/config/site.ts`, `src/components/AdSlot.astro`).
- Un bloque concreto solo aparece si además tiene su identificador (`PUBLIC_ADSENSE_SLOT_INARTICLE`,
  `PUBLIC_ADSENSE_SLOT_FOOTER`). Nunca se inventa un identificador.
- `ads.txt` se genera automáticamente con la línea de Google solo si el identificador es válido.
- La prueba `npm run test:e2e` comprueba que, con la configuración por defecto, no hay bloques ni
  peticiones a terceros.

## Dónde aparecen los anuncios

- Como máximo dos bloques por página: uno entre secciones de contenido largo y otro antes del pie.
- **Nunca** dentro de herramientas (comparador, simulador, calculadora), junto a controles, ni entre una
  afirmación y su fuente.
- Siempre con la etiqueta «Publicidad» y altura reservada (`min-height`) para evitar saltos de contenido.
- No usamos anuncios automáticos (*Auto ads*): colocarían anuncios donde no controlamos. Si se activan
  en la cuenta, desactívalos para este sitio.

## Consentimiento en España y el EEE

Requisitos consultados el 15 de octubre de 2026:

- Google exige una **CMP certificada e integrada con el TCF de IAB Europe** para servir anuncios a
  usuarios del EEE, el Reino Unido y Suiza
  ([Ayuda de AdSense](https://support.google.com/adsense/answer/13554116)). Sin ella, solo se pueden servir
  anuncios limitados o no personalizados, si están disponibles.
- La **AEPD** (Guía sobre el uso de cookies, actualización de julio de 2023, aplicable desde el 11 de enero
  de 2024) exige que **rechazar** esté en la primera capa, en el mismo lugar, formato y nivel que aceptar
  ([nota de prensa AEPD](https://www.aepd.es/prensa-y-comunicacion/notas-de-prensa/aepd-actualiza-guia-cookies-para-adaptarla-a-nuevas-directrices-cepd)).

**Opción recomendada:** la CMP de Google (*Privacidad y mensajes* en AdSense), certificada en el TCF y
cargada por el propio script de AdSense:

1. AdSense → Privacidad y mensajes → Normativas europeas → crear mensaje para el sitio.
2. Activar el botón **«No consentir»** (rechazar) en la primera capa, además de «Consentir» y
   «Gestionar opciones», con el mismo estilo.
3. Activar el enlace de **revocación** (el pie de página incluye «Gestionar privacidad», que llama a
   `googlefc.showRevocationMessage()`).
4. Idioma español; enlazar `/privacidad/` y `/cookies/`.
5. Publicar el mensaje y comprobarlo desde una IP del EEE en una ventana privada.

Alternativa: cualquier CMP de terceros que figure en la
lista de CMP certificadas que Google enlaza desde la página de requisitos citada arriba (se actualiza periódicamente). En ese caso
debe cargarse antes que la etiqueta de AdSense.

## Datos políticos: qué no hacemos

- Las selecciones del comparador, las simulaciones y las búsquedas se guardan solo en el fragmento de la
  URL (`#…`) o en memoria. El fragmento no viaja en las peticiones HTTP ni en el `Referer`.
- No enviamos a Google ni a la herramienta de medición ningún evento sobre partidos, temas o escenarios.
- No hay segmentación por claves personalizadas (*key-values*) ni audiencias propias.
- No inferimos ideología ni opinión política (categoría especial del art. 9 RGPD).

## Medición agregada

Opcional: herramienta **sin cookies** (Plausible, Umami autoalojado o similar) mediante
`PUBLIC_ANALYTICS_SCRIPT` y `PUBLIC_ANALYTICS_DOMAIN`. Solo páginas vistas por URL (sin fragmento),
referencias y país. Revisa con un profesional si, con la herramienta elegida, hace falta consentimiento.
Las métricas útiles son páginas vistas por sección, páginas de entrada desde buscadores, uso de
herramientas (número de cargas de la página, no lo que se selecciona) y retorno de visitantes (agregado).
