// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// URL pública definitiva. Mientras no exista dominio se usa un dominio reservado (.example)
// para que nada apunte por error a un sitio ajeno.
const SITE = process.env.SITE_URL || 'https://votoenclaro.example';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // Herramientas de administración y búsqueda interna fuera del sitemap.
      filter: (page) => !/\/(admin|buscar)\//.test(page),
      i18n: undefined,
    }),
  ],
  vite: { build: { assetsInlineLimit: 2048 } },
});
