import type { APIRoute } from 'astro';
import { ADS } from '../config/site';

/**
 * ads.txt: declara qué vendedores están autorizados a vender el inventario publicitario.
 * Solo contiene la línea de Google si hay un identificador de editor válido configurado.
 * f08c47fec0942fa0 es el identificador TAG de Google publicado en la ayuda de AdSense.
 */
export const GET: APIRoute = () => {
  const pub = ADS.client.replace(/^ca-/, '');
  const body = /^pub-\d{10,20}$/.test(pub)
    ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`
    : `# Pendiente: configura PUBLIC_ADSENSE_CLIENT para generar la línea de Google.\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
