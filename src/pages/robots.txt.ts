import type { APIRoute } from 'astro';
import { INDEXABLE } from '../config/site';

export const GET: APIRoute = ({ site }) => {
  const body = INDEXABLE
    ? `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /buscar/\n\nSitemap: ${new URL('/sitemap-index.xml', site).href}\n`
    : `# Sitio en preparación: indexación desactivada (PUBLIC_INDEXABLE != true)\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
