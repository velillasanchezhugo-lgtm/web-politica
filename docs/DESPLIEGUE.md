# Publicar la web y solicitar AdSense

## 1. Antes de publicar (bloqueante)

- [ ] Completar `src/config/titular.ts` (titular, NIF, domicilio, correos, responsable editorial, hosting).
- [ ] Revisar con un profesional jurídico aviso legal, privacidad y cookies.
- [ ] Decidir el nombre definitivo (o mantener «Voto en Claro» tras comprobar disponibilidad de dominio y
      marca en la OEPM/EUIPO) y cambiar `nombreProvisional` en `src/config/site.ts`.
- [ ] Revisión humana del contenido publicado: cada ficha, propuesta y análisis (ver `research/` y los
      informes de verificación). Las entradas dudosas pasan a `borrador`.
- [ ] `npm run build`, `npm test` y `npm run test:e2e` sin errores.

## 2. Alojamiento (ejemplo con Cloudflare Pages; Netlify es equivalente)

1. Conectar el repositorio de GitHub.
2. Comando de compilación: `npm run build`. Directorio de salida: `dist`. Node 20 o superior.
3. Variables de entorno: `SITE_URL=https://tu-dominio.es`, `PUBLIC_INDEXABLE=false` (de momento).
4. Conectar el dominio y forzar HTTPS.
5. Comprobar la web publicada, el buscador y `/robots.txt`.

## 3. Abrir a buscadores

1. Cambiar `PUBLIC_INDEXABLE=true` (la compilación falla si faltan datos del titular o el dominio real).
2. Verificar el dominio en Google Search Console y enviar `https://tu-dominio.es/sitemap-index.xml`.

## 4. Solicitar AdSense

1. Crear la cuenta de AdSense con los datos reales del titular y añadir el sitio.
2. AdSense pide colocar su código o verificar el sitio: añade `PUBLIC_ADSENSE_CLIENT=ca-pub-…` y
   `PUBLIC_ADS_ENABLED=true`, recompila y publica. Esto activa el script y genera `/ads.txt` con la línea
   de Google. Sin identificadores de bloque no se pinta ningún anuncio.
3. Configurar **Privacidad y mensajes** con el botón «No consentir» y el enlace de revocación (ver
   `docs/PUBLICIDAD-Y-PRIVACIDAD.md`).
4. Esperar la revisión de Google. La aprobación no está garantizada: suele valorar contenido original y
   suficiente, navegación clara y páginas de contacto y privacidad accesibles.
5. Tras la aprobación, crear dos bloques de anuncio adaptables (no *Auto ads*) y añadir sus IDs en
   `PUBLIC_ADSENSE_SLOT_INARTICLE` y `PUBLIC_ADSENSE_SLOT_FOOTER`.
6. Comprobar que `/ads.txt` aparece como «Autorizado» en AdSense (puede tardar días).

## 5. Después

- Revisar Search Console y AdSense cada semana durante la campaña.
- Mantener el calendario editorial y el registro de actualizaciones con fechas reales.
- Recompilar a diario durante la campaña: la portada calcula «próximas fechas» al compilar.
