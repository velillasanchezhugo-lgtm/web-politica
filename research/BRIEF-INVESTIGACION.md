# Brief común para investigación (agentes y redactores)

Fecha de trabajo: 2026-10-15. Elecciones generales: 29-11-2026 (RD 806/2026, BOE-A-2026-20742, verificado).

## Reglas no negociables
- No inventar NADA: cifras, citas, fechas, candidaturas, cargos, propuestas, votaciones, URLs.
- Cada dato debe salir de una fuente que hayas ABIERTO y leído en esta sesión (curl o WebFetch).
  Si no puedes abrir la fuente, no uses el dato. `fecha_consulta` = 2026-10-15.
- Jerarquía de fuentes: BOE, Congreso, Senado, Junta Electoral Central, Ministerio del Interior
  (infoelectoral), La Moncloa, INE, Eurostat, Banco de España, AIReF, Seguridad Social → documentos
  oficiales de partidos (web del partido) → investigación académica → medios solventes
  (El País, RTVE, EFE, Europa Press, La Vanguardia, El Mundo, ABC, elDiario.es, El Confidencial,
  Cadena SER, Newtral, Maldita, Expansión, Cinco Días, El Periódico, Naiz, Deia, El Correo, Ara, Nació
  Digital, La Voz de Galicia…).
- Wikipedia solo como pista para encontrar fuentes primarias: NUNCA como fuente citada.
- Desconfía de webs "agregadoras" electorales desconocidas (p. ej. afinidadpolitica.es, democrata.es,
  politicaelectoral.com o similares): no las cites ni uses sus datos.
- Distinguir: hecho / declaración atribuida / interpretación. Lo que un partido afirma se atribuye
  ("según el PP…", "el PSOE propone…"); no se presenta como efecto demostrado.
- No presentar programas de 2023 u otros antiguos como compromisos de 2026. Para 2026 sirven:
  programa 2026 (si existe), ponencias/resoluciones/documentos oficiales recientes (2024–2026),
  declaraciones públicas recientes de dirigentes, iniciativas y votos parlamentarios de la XV legislatura.
- Si no encuentras algo, NO crees la entrada. Lo indicas en tu informe final ("no localizado").
- Lenguaje claro, neutral, preciso, en español de España. Resúmenes originales (no copiar párrafos
  de medios; citas literales breves solo si son imprescindibles y entre comillas con fuente).
- Misma estructura y mismo rigor para todos los partidos.
- Escribe JSON válido UTF-8 (2 espacios), siguiendo exactamente el esquema de src/content.config.ts
  y docs/MODELO-DE-CONTENIDO.md. `revision.estado_editorial`: "publicado" solo si TODO el contenido
  de esa entrada está verificado con fuentes abiertas; si no, "borrador".
- Escribe SOLO en las carpetas/archivos que se te asignen.

## Descargar páginas
Usa `curl -sS -L -A "Mozilla/5.0" URL` (hay proxy configurado) y extrae texto, o la herramienta WebFetch.
Para PDFs: `curl -o archivo.pdf` en tu directorio temporal y `pdftotext` si está disponible, o python.
