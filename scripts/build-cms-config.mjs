#!/usr/bin/env node
/**
 * Genera public/admin/config.yml (en JSON, que es YAML válido) para el panel editorial Decap CMS.
 * Se genera por script para reutilizar definiciones de campos sin depender de anclas YAML.
 * Ejecutar tras cambiar el modelo: `node scripts/build-cms-config.mjs`.
 */
import { writeFileSync } from 'node:fs';

const fecha = (label, name, required = true) => ({ label, name, widget: 'datetime', format: 'YYYY-MM-DD', date_format: 'YYYY-MM-DD', time_format: false, required });
const fuentes = (min = 1) => ({
  label: 'Fuentes', name: 'fuentes', widget: 'list', min, required: min > 0, summary: '{{fields.emisor}} — {{fields.titulo}}',
  fields: [
    { label: 'Título', name: 'titulo', widget: 'string' },
    { label: 'Emisor (organismo, partido, medio)', name: 'emisor', widget: 'string' },
    { label: 'Tipo', name: 'tipo', widget: 'select', options: [
      { label: 'Oficial', value: 'oficial' }, { label: 'Documento del partido', value: 'partido' }, { label: 'Académica', value: 'academica' },
      { label: 'Organismo independiente', value: 'organismo_independiente' }, { label: 'Medio', value: 'medio' }, { label: 'Otra', value: 'otra' } ] },
    { label: 'URL', name: 'url', widget: 'string', pattern: ['^https?://', 'Debe ser una URL'] },
    { label: 'Localización en el documento', name: 'localizacion', widget: 'string', required: false },
    { label: 'Fecha del documento (AAAA, AAAA-MM o AAAA-MM-DD)', name: 'fecha_documento', widget: 'string', required: false, pattern: ['^\\d{4}(-\\d{2}(-\\d{2})?)?$', 'Formato AAAA, AAAA-MM o AAAA-MM-DD'] },
    fecha('Fecha de consulta', 'fecha_consulta'),
  ],
});
const revision = {
  label: 'Revisión', name: 'revision', widget: 'object', fields: [
    fecha('Fecha de revisión', 'fecha_revision'),
    { label: 'Estado editorial', name: 'estado_editorial', widget: 'select', default: 'borrador', options: [
      { label: 'Borrador', value: 'borrador' }, { label: 'Revisado (falta segunda revisión)', value: 'revisado' },
      { label: 'Publicado', value: 'publicado' }, { label: 'Desactualizado (se muestra con aviso)', value: 'desactualizado' } ] },
    { label: 'Notas internas', name: 'notas', widget: 'text', required: false },
  ],
};
const afirmaciones = (label, name, required = true) => ({
  label, name, widget: 'list', required, summary: '{{fields.texto}}',
  fields: [
    { label: 'Texto', name: 'texto', widget: 'text' },
    { label: 'Tipo', name: 'tipo', widget: 'select', default: 'hecho', options: [
      { label: 'Hecho comprobado', value: 'hecho' }, { label: 'Declaración atribuida', value: 'declaracion' }, { label: 'Análisis o interpretación', value: 'interpretacion' } ] },
    { label: 'Fecha', name: 'fecha', widget: 'string', required: false },
    fuentes(),
  ],
});
const temas = [
  ['economia', 'Economía'], ['empleo', 'Empleo'], ['vivienda', 'Vivienda'], ['sanidad', 'Sanidad'], ['educacion', 'Educación'],
  ['pensiones', 'Pensiones'], ['inmigracion', 'Inmigración'], ['seguridad-justicia', 'Seguridad y justicia'], ['igualdad-derechos', 'Igualdad y derechos'],
  ['energia-medioambiente', 'Energía y medioambiente'], ['organizacion-territorial', 'Organización territorial'], ['ue-exterior', 'UE y exterior'], ['tecnologia', 'Tecnología'],
].map(([value, label]) => ({ value, label }));

const config = {
  backend: { name: 'github', repo: 'velillasanchezhugo-lgtm/web-politica', branch: 'main' /* , base_url: 'https://tu-proxy-oauth' */ },
  publish_mode: 'editorial_workflow',
  locale: 'es',
  media_folder: 'public/uploads',
  public_folder: '/uploads',
  collections: [
    {
      name: 'propuestas', label: 'Propuestas por tema', label_singular: 'Propuesta', folder: 'src/content/propuestas',
      path: '{{partido}}/{{slug}}', slug: '{{fields.id}}', extension: 'json', format: 'json', create: true,
      summary: '{{partido}} · {{tema}} · {{titulo}}',
      fields: [
        { label: 'ID único (p. ej. pp-vivienda-1)', name: 'id', widget: 'string' },
        { label: 'Partido (id de ficha, p. ej. pp)', name: 'partido', widget: 'string' },
        { label: 'Tema', name: 'tema', widget: 'select', options: temas },
        { label: 'Elección', name: 'eleccion', widget: 'hidden', default: 'generales-2026' },
        { label: 'Título', name: 'titulo', widget: 'string' },
        { label: 'Tipo de información', name: 'tipo_informacion', widget: 'select', options: [
          { label: 'Programa electoral 2026', value: 'programa_electoral' }, { label: 'Documento oficial del partido', value: 'documento_oficial' },
          { label: 'Declaración pública', value: 'declaracion' }, { label: 'Iniciativa parlamentaria', value: 'iniciativa_parlamentaria' }, { label: 'Voto parlamentario', value: 'voto_parlamentario' } ] },
        { label: 'Estado de la propuesta', name: 'estado', widget: 'select', hint: 'Solo «Compromiso 2026» si figura en el programa electoral de 2026', options: [
          { label: 'Compromiso en el programa 2026', value: 'compromiso_2026' }, { label: 'Posición declarada', value: 'posicion_vigente' },
          { label: 'Iniciativa presentada', value: 'iniciativa_presentada' }, { label: 'Medida ya aprobada', value: 'medida_aprobada' } ] },
        { label: 'Resumen fiel (palabras propias)', name: 'resumen', widget: 'text' },
        { label: 'Qué cambiaría respecto a lo vigente', name: 'que_cambiaria', widget: 'text', required: false },
        { label: 'Competencia', name: 'competencia', widget: 'object', fields: [
          { label: 'Administraciones', name: 'administraciones', widget: 'select', multiple: true, options: [
            { label: 'Estado', value: 'estado' }, { label: 'Comunidades autónomas', value: 'ccaa' }, { label: 'Ayuntamientos', value: 'local' }, { label: 'Unión Europea', value: 'ue' } ] },
          { label: 'Nota', name: 'nota', widget: 'text', required: false } ] },
        { label: 'Financiación', name: 'financiacion', widget: 'object', fields: [
          { label: 'Coste declarado por el partido', name: 'coste_declarado', widget: 'text', required: false },
          { label: 'Estimación independiente', name: 'estimacion_independiente', widget: 'object', required: false, collapsed: true, fields: [
            { label: 'Texto', name: 'texto', widget: 'text' },
            { label: 'Tipo', name: 'tipo', widget: 'hidden', default: 'hecho' },
            fuentes() ] },
          { label: 'Nota', name: 'nota', widget: 'text', required: false } ] },
        { label: 'Calendario', name: 'calendario', widget: 'string', required: false },
        { label: 'Más contexto', name: 'detalle', widget: 'text', required: false },
        fuentes(),
        revision,
      ],
    },
    {
      name: 'historia', label: 'Historia (cronología)', label_singular: 'Hito', folder: 'src/content/historia', extension: 'json', format: 'json',
      create: true, slug: '{{fields.id}}', summary: '{{fecha}} · {{titulo}}',
      fields: [
        { label: 'ID (= nombre de archivo, AAAA-MM-DD-slug)', name: 'id', widget: 'string' },
        fecha('Fecha', 'fecha'), fecha('Fecha fin', 'fecha_fin', false),
        { label: 'Título', name: 'titulo', widget: 'string' },
        { label: 'Categorías', name: 'categorias', widget: 'select', multiple: true, options: [
          { label: 'Elecciones y gobiernos', value: 'elecciones-gobiernos' }, { label: 'Reformas institucionales', value: 'reformas-institucionales' },
          { label: 'Legislación', value: 'legislacion' }, { label: 'Economía y sociedad', value: 'economia-sociedad' },
          { label: 'Organización territorial', value: 'territorial' }, { label: 'Integración europea', value: 'europa' } ] },
        { label: 'Resumen', name: 'resumen', widget: 'text' },
        { label: 'Contexto', name: 'contexto', widget: 'text' },
        afirmaciones('Consecuencias documentadas', 'consecuencias'),
        afirmaciones('Interpretaciones historiográficas', 'interpretaciones', false),
        fuentes(), revision,
      ],
    },
    {
      name: 'glosario', label: 'Glosario', label_singular: 'Término', folder: 'src/content/glosario', extension: 'json', format: 'json',
      create: true, slug: '{{slug}}', identifier_field: 'termino',
      fields: [
        { label: 'Término', name: 'termino', widget: 'string' },
        { label: 'Definición', name: 'definicion', widget: 'text' },
        { label: 'Ejemplo', name: 'ejemplo', widget: 'text', required: false },
        { label: 'Relacionados (slugs)', name: 'relacionados', widget: 'list', required: false },
        fuentes(0), revision,
      ],
    },
    {
      name: 'actualizaciones', label: 'Registro de actualizaciones', label_singular: 'Actualización', folder: 'src/content/actualizaciones',
      extension: 'json', format: 'json', create: true, slug: '{{slug}}', identifier_field: 'titulo',
      fields: [
        fecha('Fecha real del cambio', 'fecha'),
        { label: 'Título', name: 'titulo', widget: 'string' },
        { label: 'Descripción', name: 'descripcion', widget: 'text' },
        { label: 'Enlace interno', name: 'enlace_interno', widget: 'string', required: false },
        { label: 'Tipo', name: 'tipo', widget: 'select', options: [
          { label: 'Contenido', value: 'contenido' }, { label: 'Corrección', value: 'correccion' }, { label: 'Dato oficial', value: 'dato_oficial' } ] },
        fuentes(0),
      ],
    },
    {
      name: 'guia', label: 'Guía electoral', label_singular: 'Artículo', folder: 'src/content/guia', extension: 'md', format: 'frontmatter',
      create: true, slug: '{{slug}}', identifier_field: 'titulo',
      fields: [
        { label: 'Título', name: 'titulo', widget: 'string' },
        { label: 'Descripción (máx. 170)', name: 'descripcion', widget: 'string', pattern: ['^.{1,170}$', 'Máximo 170 caracteres'] },
        { label: 'Orden', name: 'orden', widget: 'number', value_type: 'int' },
        { label: 'Resumen rápido (1–5 puntos)', name: 'resumen', widget: 'list', min: 1, max: 5 },
        fuentes(), revision,
        { label: 'Explicación ampliada', name: 'body', widget: 'markdown' },
      ],
    },
  ],
};

const header = '# Generado por scripts/build-cms-config.mjs. No editar a mano.\n# Fichas de partido, temas y escenarios se editan como JSON en el repositorio (ver docs/PANEL-EDITORIAL.md).\n';
writeFileSync(new URL('../public/admin/config.yml', import.meta.url), header + JSON.stringify(config, null, 2) + '\n');
console.log('public/admin/config.yml generado');
