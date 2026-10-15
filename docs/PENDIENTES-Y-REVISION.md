# Pendientes y puntos de revisión humana (a 15 de octubre de 2026)

Todo el contenido publicado ha pasado dos revisiones: verificación de cada afirmación contra su fuente
(investigación asistida por IA) y una segunda revisión por muestreo de fuentes originales. **Antes de abrir la
indexación, el titular o una persona de la redacción debe revisarlo**, empezando por esta lista.

## Datos oficiales que llegarán y hay que incorporar

| Fecha | Qué | Dónde |
|---|---|---|
| 16–17 oct | Coaliciones comunicadas a la JEC (UPN-PP, ERC–EH Bildu al Senado, Frente Amplio, Compromís, posible PAR) | `candidatura_2026` de cada ficha |
| 16–17 oct | Primarias de Podemos, Comité Federal del PSOE, Consell Nacional de Junts, Asamblea del PNV | fichas |
| 28 oct | BOE: candidaturas presentadas | `/candidaturas/` y fichas (`estado: presentada`) |
| 3 nov | BOE: candidaturas proclamadas | `/candidaturas/` y fichas (`estado: proclamada`, `listas_oficiales_url`) |
| Campaña | Programas electorales 2026 de cada partido | propuestas `programa_electoral` / `compromiso_2026` |
| Pendiente | Convalidación o derogación de los RDL 28/2026 y 29/2026 por la Diputación Permanente | escenarios y propuestas de vivienda |

## Fichas y contenido retenido

- **SALF**: ficha en `revisado`. No se ha podido verificar su forma jurídica actual (en 2024 concurrió como
  agrupación de electores) ni si sus tres eurodiputados siguen vinculados. Consultar el Registro de Partidos
  Políticos del Ministerio del Interior.
- **Historia, Estatutos de 1983**: en `borrador` (sin fuente abierta que acredite que completaron el mapa autonómico).

## Comprobaciones recomendadas

- Webs de partidos que bloquearon el acceso automático: voxespana.es, psoe.es, podemos.info, esquerra.cat,
  webs de SALF. Comprobar cargos, autodefiniciones estatutarias y si hay programa 2026.
- PSOE: las medidas del 41 Congreso del escenario «Si gobernara» proceden del resumen de EFE (la web del
  partido no respondía). Contrastar con la resolución original.
- Frente Amplio: sus propuestas proceden del documento político de 2025 de Movimiento Sumar (uno de los cuatro
  partidos). Está indicado en cada propuesta; sustituir por el programa de la coalición cuando exista.
- Votaciones del 2 de octubre de 2026 por partido: proceden de Europa Press (vía Diario de Avisos/Infobae) y
  cuadran con los totales oficiales; sustituir por el acta del Congreso cuando esté disponible.
- AIReF (pensiones): citada a través de Forbes porque la web de la AIReF no respondió. Sustituir por el informe original.
- Porcentajes de voto de 2023: calculados por la redacción sobre votos válidos (24.688.087); el cuadro de la
  JEC usa votos a candidaturas. Ambos criterios se explican en las notas.
- Copias de los acuerdos de investidura de 2023 alojadas por medios (la7tv.es, Newtral): buscar las versiones de los partidos.
- Historia: legalización del PCE apoyada en Newtral; fecha de disolución de ETA (se usa la declaración del
  Gobierno del 4-5-2018); interpretación sobre el 15-M retirada hasta contar con al menos dos lecturas académicas.
- Moncloa (guía electoral) mantiene dos erratas sobre circunscripciones del Senado; la guía sigue la LOREG.

## Datos del titular (bloqueantes para publicar)

Ver `src/config/titular.ts` y `docs/DESPLIEGUE.md`.
