# Investiduras de 2023 y moción de censura de 2018: votos y normas

Fecha de consulta de todas las fuentes: 2026-10-15. Este documento sirve para comprobar el simulador de investidura.

## 1. Resultados oficiales (Diario de Sesiones del Congreso)

| Votación | Fecha | Emitidos | Sí | No | Abst. | Nulos | Resultado | Fuente |
|---|---|---|---|---|---|---|---|---|
| Investidura de Alberto Núñez Feijóo, 1.ª votación (mayoría absoluta, 176) | 2023-09-27 | 350 | 172 | 178 | 0 | 0 | No investido | DSCD XV, núm. 5, sumario |
| Investidura de Alberto Núñez Feijóo, 2.ª votación (mayoría simple) | 2023-09-29 | 350 | 172 | 177 | 0 | 1 | No investido | DSCD XV, núm. 6, sumario |
| Investidura de Pedro Sánchez Pérez-Castejón, 1.ª votación | 2023-11-16 | 350 | 179 | 171 | 0 | 0 | Investido (mayoría absoluta) | DSCD XV, núm. 8, sumario |
| Moción de censura contra el Gobierno de Mariano Rajoy, con Pedro Sánchez como candidato | 2018-06-01 | 350 | 180 | 169 | 1 | 0 | Aprobada (mayoría absoluta) | DSCD XII, núm. 127, pág. 23 |

Fuentes:
- Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 5 (sesión plenaria núm. 5, 27-09-2023), expediente 080/000001: https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-5.PDF. Según el sumario, la Presidencia informa del resultado: «votos emitidos, 350; a favor, 172; en contra, 178; abstenciones, 0».
- Diario de Sesiones, XV legislatura, núm. 6 (29-09-2023): https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-6.PDF. Resultado: «votos emitidos, 350; a favor, 172; en contra, 177; voto nulo, 1». Una nota del Diario explica el voto nulo: al ser llamado, el diputado Eduard Pujol Bonell (Grupo Parlamentario Junts per Catalunya) dijo «sí» y se corrigió al instante diciendo «no». La Presidencia, en ejercicio del artículo 32.1 del Reglamento, declaró nulo ese voto.
- Diario de Sesiones, XV legislatura, núm. 8 (16-11-2023), expediente 080/000002: https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-8.PDF. Resultado: «votos emitidos, 350; a favor, 179; en contra, 171; abstenciones, 0»; se declara otorgada la confianza.
- Diario de Sesiones, XII legislatura, núm. 127 (01-06-2018), expediente 082/000002: https://www.congreso.es/public_oficiales/L12/CONG/DS/PL/DSCD-12-PL-127.PDF. Resultado: «votos emitidos, 350; votos a favor de la moción de censura, 180; votos en contra, 169; abstenciones, 1». La única abstención fue la de Ana María Oramas González-Moro, según la relación nominal del Diario.
- Datos abiertos del Congreso (votaciones). Los gráficos oficiales de cada votación confirman los totales del 27-09-2023 (sí 172, no 178, abstenciones 0): https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion005/20230927/VOT_20230927125500.zip. Los del 29-09 están en `Sesion006/20230929/VOT_20230929125600.zip` y los del 16-11 en `Sesion008/20231116/VOT_20231116125700.zip`. Estos archivos solo contienen un gráfico de totales, sin desglose nominal, porque fueron votaciones públicas por llamamiento.

## 2. Desglose por candidatura y por grupo (2023)

Método: las investiduras se votan por llamamiento público, y el Diario de Sesiones (núms. 5, 6 y 8) publica la lista nominal de quién dijo «sí», «no» o emitió voto nulo, incluidos los votos telemáticos y los de los miembros del Gobierno en funciones. Hemos cruzado cada nombre con el fichero de datos abiertos de diputados del Congreso (XV legislatura): https://www.congreso.es/es/opendata/diputados, archivos `DiputadosActivos__20261015050011.json` y `DiputadosDeBaja__20261015050019.json`, descargados el 2026-10-15. Ese fichero indica la formación electoral de cada diputado y su grupo, con las fechas de alta y baja en el grupo. Las 350 personas de cada lista se identifican; las sumas cuadran con los totales oficiales.

### Por formación electoral (candidatura con la que fue elegido cada diputado)

| Formación electoral (código en datos abiertos) | Escaños | Feijóo 27-09 | Feijóo 29-09 | Sánchez 16-11 |
|---|---|---|---|---|
| PP | 137 | 137 sí | 137 sí | 137 no |
| PSOE (todas sus candidaturas: PSOE 85, PSC-PSOE 19, PsdeG-PSOE 7, PSE-EE 5, PSIB-PSOE 3, PSN-PSOE 2) | 121 | 121 no | 121 no | 121 sí |
| VOX | 33 | 33 sí | 33 sí | 33 no |
| SUMAR | 31 | 31 no | 31 no | 31 sí |
| ERC | 7 | 7 no | 7 no | 7 sí |
| JxCAT-JUNTS | 7 | 7 no | 6 no + 1 nulo | 7 sí |
| EH Bildu | 6 | 6 no | 6 no | 6 sí |
| EAJ-PNV | 5 | 5 no | 5 no | 5 sí |
| BNG | 1 | 1 no | 1 no | 1 sí |
| CCa | 1 | 1 sí | 1 sí | 1 sí |
| UPN | 1 | 1 sí | 1 sí | 1 no |
| **Total** | **350** | **172 sí / 178 no** | **172 sí / 177 no / 1 nulo** | **179 sí / 171 no** |

Nota: Coalición Canaria votó «sí» en las tres votaciones. Es el único escaño que apoyó a los dos candidatos.

### Por grupo parlamentario en la fecha de cada votación

| Grupo parlamentario | Feijóo 27-09 | Feijóo 29-09 | Sánchez 16-11 |
|---|---|---|---|
| Popular en el Congreso (137) | 137 sí | 137 sí | 137 no |
| Socialista (121) | 121 no | 121 no | 121 sí |
| VOX (33) | 33 sí | 33 sí | 33 no |
| Plurinacional SUMAR (31) | 31 no | 31 no | 31 sí |
| Republicano (7) | 7 no | 7 no | 7 sí |
| Junts per Catalunya (7) | 7 no | 6 no + 1 nulo | 7 sí |
| Euskal Herria Bildu (6) | 6 no | 6 no | 6 sí |
| Vasco (EAJ-PNV) (5) | 5 no | 5 no | 5 sí |
| Mixto (3: BNG, CCa, UPN) | 2 sí (CCa, UPN), 1 no (BNG) | 2 sí, 1 no | 2 sí (BNG, CCa), 1 no (UPN) |

Cautela sobre la atribución a grupos: el fichero de datos abiertos registra el grupo vigente en cada fecha para 341 de los 350 diputados. Otros ocho cambiaron después de grupo, y el fichero solo conserva su último grupo:
- Seis diputados elegidos en la candidatura SUMAR pasaron al Grupo Mixto: Ione Belarra, Javier Sánchez Serna, Noemí Santana, Martina Velarde y Lilith Verstrynge el 05-12-2023, y Àgueda Micó el 03-07-2025.
- José Luis Ábalos (elegido por el PSOE) pasó al Grupo Mixto el 27-02-2024.
- Francisco Javier Ortega Smith (elegido por VOX) pasó al Grupo Mixto el 17-07-2026.

Como todos esos cambios son posteriores a las tres votaciones, la tabla los sitúa en el grupo de la candidatura por la que fueron elegidos. Es una inferencia razonable, pero no figura de forma directa en el fichero. El noveno caso, María del Socorro Cuesta Rodríguez, solo era una variante del nombre: el fichero la recoge como «Cuesta Rodríguez, María» (PP, Grupo Popular desde el 18-08-2023). El desglose por formación electoral no depende de esta inferencia.

Contraste en prensa: Ara (es.ara.cat, 29-09-2023, https://es.ara.cat/politica/congreso-consuma-fracaso-feijoo-pide-repeticion-electoral_1_4814836.html) atribuye los 172 apoyos a Feijóo a 137 diputados del PP, 33 de Vox, 1 de UPN y 1 de CC. También describe el voto nulo de Eduard Pujol (Junts) en los mismos términos.

## 3. Normas aplicables (textos consolidados del BOE)

### Constitución Española, artículo 99
Fuente: https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229 (texto consolidado, última actualización publicada el 20/05/2026; el artículo 99 conserva su redacción original).

> 1. Después de cada renovación del Congreso de los Diputados, y en los demás supuestos constitucionales en que así proceda, el Rey, previa consulta con los representantes designados por los Grupos políticos con representación parlamentaria, y a través del Presidente del Congreso, propondrá un candidato a la Presidencia del Gobierno.
> 2. El candidato propuesto conforme a lo previsto en el apartado anterior expondrá ante el Congreso de los Diputados el programa político del Gobierno que pretenda formar y solicitará la confianza de la Cámara.
> 3. Si el Congreso de los Diputados, por el voto de la mayoría absoluta de sus miembros, otorgare su confianza a dicho candidato, el Rey le nombrará Presidente. De no alcanzarse dicha mayoría, se someterá la misma propuesta a nueva votación cuarenta y ocho horas después de la anterior, y la confianza se entenderá otorgada si obtuviere la mayoría simple.
> 4. Si efectuadas las citadas votaciones no se otorgase la confianza para la investidura, se tramitarán sucesivas propuestas en la forma prevista en los apartados anteriores.
> 5. Si transcurrido el plazo de dos meses, a partir de la primera votación de investidura, ningún candidato hubiere obtenido la confianza del Congreso, el Rey disolverá ambas Cámaras y convocará nuevas elecciones con el refrendo del Presidente del Congreso.

### Constitución Española, artículo 113 (moción de censura)
> 1. El Congreso de los Diputados puede exigir la responsabilidad política del Gobierno mediante la adopción por mayoría absoluta de la moción de censura.
> 2. La moción de censura deberá ser propuesta al menos por la décima parte de los Diputados, y habrá de incluir un candidato a la Presidencia del Gobierno.
> 3. La moción de censura no podrá ser votada hasta que transcurran cinco días desde su presentación. En los dos primeros días de dicho plazo podrán presentarse mociones alternativas.
> 4. Si la moción de censura no fuere aprobada por el Congreso, sus signatarios no podrán presentar otra durante el mismo período de sesiones.

Artículo 114.2 CE (efecto): «Si el Congreso adopta una moción de censura, el Gobierno presentará su dimisión al Rey y el candidato incluido en aquélla se entenderá investido de la confianza de la Cámara a los efectos previstos en el artículo 99. El Rey le nombrará Presidente del Gobierno.»

Resultado de 2018 (véase la tabla 1): el 1 de junio de 2018 se aprobó la moción con 180 votos a favor, 169 en contra y 1 abstención. Superó la mayoría absoluta de 176 y Pedro Sánchez quedó investido de la confianza de la Cámara.

### Reglamento del Congreso de los Diputados, artículos 170 a 172 (investidura)
Fuente: https://www.boe.es/buscar/act.php?id=BOE-A-1982-5196. Es el texto consolidado, cuya última actualización se publicó el 28/07/2026. Los artículos 170 a 172 están en la redacción que les dio la Reforma del Reglamento de 22 de julio de 2025 (BOE-A-2025-15844), vigente desde el 31/07/2025. En las investiduras de 2023 se aplicó la redacción anterior a esa reforma, que no hemos cotejado literalmente en esta sesión. La regla de mayorías (absoluta en la primera votación y simple 48 horas después) la fija el artículo 99.3 CE, que no ha cambiado.

> **Artículo 170.** En cumplimiento de las previsiones establecidas en el artículo 99 de la Constitución, y una vez recibida en el Congreso la propuesta de candidato o candidata a la Presidencia del Gobierno, la Presidencia de la Cámara convocará el Pleno.

> **Artículo 171.**
> 1. La sesión comenzará por la lectura de la propuesta por una de las Secretarías.
> 2. A continuación, la candidata o el candidato propuesto expondrá, sin limitación de tiempo, el programa político del Gobierno que pretende formar y solicitará la confianza de la Cámara.
> 3. Tras el tiempo de interrupción decretado por la Presidencia intervendrá un diputado o diputada representante de cada grupo parlamentario que lo solicite por treinta minutos.
> 4. La candidata o el candidato propuesto podrá hacer uso de la palabra cuantas veces lo solicitare. Cuando contestare individualmente a cualquiera de las personas intervinientes, ésta tendrá derecho a réplica por diez minutos. Si el candidato o candidata contestare en forma global a las personas representantes de los grupos parlamentarios, éstas tendrán derecho a una réplica de diez minutos.
> 5. La votación se llevará a efecto a la hora fijada por la Presidencia. Si en ella el candidato o candidata propuesta obtuviera el voto de la mayoría absoluta de los miembros del Congreso, se entenderá otorgada la confianza. Si no se obtuviera dicha mayoría, se procederá a nueva votación cuarenta y ocho horas después de la anterior, y la confianza se entenderá otorgada si en ella obtuviere mayoría simple. Antes de proceder a esta votación, el candidato o candidata podrá intervenir por tiempo máximo de diez minutos y los grupos parlamentarios por cinco minutos cada uno para fijar su posición.
> 6. Otorgada la confianza a la candidata o candidato, conforme al apartado anterior, la Presidencia del Congreso lo comunicará al Rey o a la Reina, a los efectos de su nombramiento como Presidenta o Presidente del Gobierno.

> **Artículo 172.**
> 1. Si en las votaciones a que se refiere el artículo anterior la Cámara no hubiere otorgado su confianza se tramitarán sucesivas propuestas por el mismo procedimiento.
> 2. Si transcurrieren dos meses a partir de la primera votación de investidura y ninguna candidatura propuesta hubiere obtenido la confianza del Congreso, la Presidencia de la Cámara someterá a la firma del Rey o de la Reina el Decreto de disolución de las Cortes Generales y de convocatoria de elecciones, y lo comunicará a la Presidencia del Senado.

Complemento: los artículos 175 a 177 del Reglamento regulan la moción de censura con el mismo texto consolidado. La moción debe proponerla al menos una décima parte de la Cámara e incluir un candidato que haya aceptado. Se pueden presentar mociones alternativas en los dos días siguientes. La votación no puede celebrarse antes de que pasen cinco días desde la presentación de la primera, y la aprobación exige «en todo caso, el voto favorable de la mayoría absoluta de los miembros del Congreso» (art. 177.5).

## 4. Reglas para el simulador (derivadas de lo anterior)

- Primera votación de investidura: hacen falta al menos 176 «sí», la mayoría absoluta de 350. Las abstenciones y los nulos no cuentan como «sí».
- Segunda votación, 48 horas después: hace falta mayoría simple, es decir, más «sí» que «no». Las abstenciones no cuentan en ninguno de los dos lados.
- Con los resultados de 2023, Feijóo obtuvo 172 «sí» y 178 «no» (luego 177 y 1 nulo): no alcanzó ninguna de las dos mayorías. Sánchez obtuvo 179 «sí», por encima de los 176 de la mayoría absoluta.
- Moción de censura: hacen falta 176 «sí» en todo caso. No hay segunda votación por mayoría simple.
