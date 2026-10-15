/**
 * Datos del titular del sitio (LSSI-CE, art. 10; RGPD, art. 13).
 * DEBEN COMPLETARLOS LAS PERSONAS RESPONSABLES. No se inventa ninguno.
 * Mientras un campo empiece por "PENDIENTE", las páginas legales lo mostrarán resaltado
 * y la compilación con PUBLIC_INDEXABLE=true fallará (scripts/validate-content.mjs).
 */
export const TITULAR = {
  nombre_o_razon_social: 'PENDIENTE: nombre completo o razón social del titular',
  nif: 'PENDIENTE: NIF/CIF',
  domicilio: 'PENDIENTE: domicilio a efectos de notificaciones',
  email_contacto: 'PENDIENTE: correo de contacto',
  email_correcciones: 'PENDIENTE: correo para correcciones (puede ser el mismo)',
  email_privacidad: 'PENDIENTE: correo para ejercer derechos de protección de datos',
  registro_mercantil: 'PENDIENTE (solo si es una sociedad): datos registrales',
  responsable_editorial: 'PENDIENTE: nombre de la persona responsable de los contenidos',
  hosting: 'PENDIENTE: proveedor de alojamiento y país',
};

export const esPendiente = (v: string) => v.startsWith('PENDIENTE');
