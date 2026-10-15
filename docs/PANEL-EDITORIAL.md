# Panel editorial (`/admin/`)

El panel usa [Decap CMS](https://decapcms.org) 3.8.3 (cargado desde unpkg con versión fija). No hay base
de datos: cada cambio es un commit en este repositorio, y la web se recompila al fusionarlo.

## Qué se edita desde el panel

| Colección | Edición en el panel |
|---|---|
| Propuestas por tema | Completa |
| Historia (cronología) | Completa |
| Glosario | Completo |
| Registro de actualizaciones | Completo |
| Guía electoral (Markdown) | Completa |
| Fichas de partido, temas, escenarios, datos electorales | **En el repositorio** (JSON). Su estructura es muy anidada y es más seguro editarla en un editor con la validación de `npm run build` |

La configuración del panel se genera con `node scripts/build-cms-config.mjs` (no edites
`public/admin/config.yml` a mano).

## Flujo de revisión

`publish_mode: editorial_workflow` hace que cada cambio pase por **Borrador → En revisión → Listo** y se
publique como *pull request*. Recomendación:

1. Protege la rama `main` en GitHub (Settings → Branches) y exige al menos una aprobación y que pase la
   compilación (validación incluida) antes de fusionar.
2. Quien redacta crea la entrada con `estado_editorial: borrador`.
3. Quien revisa comprueba cada afirmación contra su fuente, cambia a `publicado` y aprueba el PR.

Así hay dos barreras: el estado editorial de cada entrada y la revisión del PR.

## Autenticación (lo que debe configurar el titular)

El backend `github` necesita un proveedor OAuth:

- **Si alojas en Netlify**: crea una OAuth App en GitHub (Settings → Developer settings → OAuth Apps) con
  la URL de callback `https://api.netlify.com/auth/done`, y añade el *client id/secret* en Netlify
  (Site configuration → Access control → OAuth → GitHub). No hace falta cambiar `config.yml`.
- **Si alojas en otro sitio** (Cloudflare Pages, GitHub Pages…): despliega un proxy OAuth para Decap
  (hay implementaciones de código abierto para Cloudflare Workers) y añade su URL en `backend.base_url`
  dentro de `scripts/build-cms-config.mjs`.

Solo las personas con permiso de escritura en el repositorio pueden guardar cambios. La página `/admin/`
lleva `noindex` y está bloqueada en `robots.txt`.

## Automatizaciones

Cualquier proceso automático (por ejemplo, un script que detecte cambios en el BOE o en la web de un
partido) solo debe **crear entradas `borrador`** o abrir un *pull request* sin fusionar. Nunca debe
publicar afirmaciones políticas sin revisión humana. No existe actualmente ninguna integración en tiempo
real; la web no lo promete.
