---
titulo: "El método D'Hondt, paso a paso"
descripcion: "Cómo se convierten los votos en escaños del Congreso: se dividen los votos entre 1, 2, 3… y los escaños van a los cocientes más altos. Con un ejemplo resuelto."
orden: 4
resumen:
  - "En cada circunscripción, los votos de cada candidatura se dividen entre 1, 2, 3… hasta el número de escaños en juego."
  - "Los escaños se asignan a los resultados (cocientes) más altos, de mayor a menor."
  - "Antes se descartan las candidaturas que no llegan al 3 % de los votos válidos, en los que cuentan los votos en blanco."
  - "Si dos cocientes empatan, el escaño es para la candidatura con más votos en total."
  - "El método solo se usa en el Congreso; en el Senado ganan los candidatos más votados."
fuentes:
  - titulo: "Ley Orgánica 5/1985, de 19 de junio, del Régimen Electoral General (texto consolidado)"
    emisor: "Boletín Oficial del Estado"
    tipo: "oficial"
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672"
    localizacion: "Artículo 163 (reglas de atribución de escaños y ejemplo práctico) y artículo 108.4"
    fecha_documento: "1985-06-19"
    fecha_consulta: "2026-10-15"
  - titulo: "Constitución Española (texto consolidado)"
    emisor: "Boletín Oficial del Estado"
    tipo: "oficial"
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229"
    localizacion: "Artículo 68.3"
    fecha_documento: "1978-12-27"
    fecha_consulta: "2026-10-15"
  - titulo: "29N: guía básica sobre las elecciones generales y el proceso electoral"
    emisor: "La Moncloa (Ministerio del Interior)"
    tipo: "oficial"
    url: "https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/interior/Paginas/guia-dudas-elecciones-generales-29n.aspx"
    localizacion: "Apartado «¿Qué es el sistema electoral?»"
    fecha_documento: "2026-10-14"
    fecha_consulta: "2026-10-15"
revision:
  fecha_revision: "2026-10-15"
  estado_editorial: "publicado"
  notas: "Cálculos del ejemplo comprobados dos veces (a mano y con src/lib/dhondt.js)."
---

## Para qué sirve

La Constitución exige que el Congreso se elija «atendiendo a criterios de representación proporcional» (art. 68.3). Para convertir votos en escaños, la ley electoral usa la fórmula que se conoce como **método D'Hondt**, por el jurista belga que la propuso. Está descrita en el **artículo 163 de la LOREG**, que incluye hasta un ejemplo numérico.

El reparto se hace **por separado en cada circunscripción** (cada provincia, más Ceuta y Melilla). Los votos de un partido en Soria no se suman a los que obtenga en Sevilla.

## Las reglas, en orden (LOREG, art. 163.1)

1. **Barrera del 3 %.** Se apartan las candidaturas que no tengan al menos el **3 % de los votos válidos** de la circunscripción. Los votos válidos son los de todas las candidaturas **más los votos en blanco**. Los nulos no cuentan (art. 108.4).
2. **Ordenar.** Se ordenan de mayor a menor las candidaturas que quedan.
3. **Dividir.** Los votos de cada una se dividen entre 1, 2, 3… y así hasta el número de escaños de la circunscripción.
4. **Asignar.** Los escaños van a los **cocientes más altos**, de mayor a menor, hasta repartirlos todos.
5. **Empates.** Si dos cocientes de candidaturas distintas empatan, el escaño es para la que tenga **más votos en total**. Si también empatan en votos totales, el primer empate se resuelve por **sorteo** y los siguientes, de forma alternativa.
6. **Quién ocupa el escaño.** Dentro de cada candidatura, los escaños van a sus candidatos **en el orden de la lista**.

## Ejemplo resuelto

> **Atención: cifras inventadas.** Este ejemplo no corresponde a ninguna provincia ni a ningún partido real. Sirve solo para practicar el método.

Una circunscripción imaginaria elige **5 diputados**. Estos son los resultados:

| | Votos |
|---|---|
| Candidatura A | 42.000 |
| Candidatura B | 30.000 |
| Candidatura C | 16.000 |
| Candidatura D | 2.500 |
| Votos en blanco | 1.500 |
| Votos nulos | 800 |

### Paso 1: calcular la barrera

- Votos válidos = 42.000 + 30.000 + 16.000 + 2.500 + 1.500 (en blanco) = **92.000**. Los 800 nulos no se suman.
- 3 % de 92.000 = **2.760 votos**.
- D tiene 2.500, menos de 2.760, así que **queda fuera** del reparto. A, B y C siguen.

### Paso 2: dividir entre 1, 2, 3, 4 y 5

| | ÷1 | ÷2 | ÷3 | ÷4 | ÷5 |
|---|---|---|---|---|---|
| A | **42.000** | **21.000** | 14.000 | 10.500 | 8.400 |
| B | **30.000** | **15.000** | 10.000 | 7.500 | 6.000 |
| C | **16.000** | 8.000 | 5.333,3 | 4.000 | 3.200 |

### Paso 3: dar los 5 escaños a los 5 cocientes más altos

1. 42.000 → A
2. 30.000 → B
3. 21.000 → A
4. 16.000 → C
5. 15.000 → B

El siguiente cociente, que se queda sin escaño, es 14.000 (A).

**Resultado: A obtiene 2 escaños, B obtiene 2 y C obtiene 1.** Entran los dos primeros nombres de la lista de A, los dos primeros de la de B y el primero de la de C.

**Comprobación:** 2 + 2 + 1 = 5 escaños. A logra el 45,7 % de los votos válidos y el 40 % de los escaños. C, con el 17,4 %, logra 1 de 5 escaños (20 %).

### Una observación sobre la barrera

En este ejemplo, aunque D hubiera superado el 3 %, no habría conseguido escaño: su mejor cociente (2.500) está muy lejos del quinto cociente más alto (15.000). En las circunscripciones que reparten pocos escaños, para entrar hace falta en la práctica bastante más del 3 %. La barrera solo puede decidir algo donde se reparten muchos escaños. La guía [Voto en blanco, nulo y abstención](/guia/blanco-nulo-abstencion/) incluye un ejemplo de ese caso.

## Variante: cómo se resuelve un empate

> **Cifras inventadas.** Igual que antes, pero ahora A tiene **45.000** votos.

Los cocientes más altos son 45.000 (A), 30.000 (B), 22.500 (A) y 16.000 (C). Para el **quinto escaño** empatan dos cocientes:

- A ÷ 3 = 15.000
- B ÷ 2 = 15.000

La ley (art. 163.1.d) da el escaño a la candidatura con **más votos en total**: A (45.000) frente a B (30.000). **Resultado: A 3, B 1, C 1.**

## Lo que el método D'Hondt no hace

- **No se aplica al Senado.** En el Senado cada elector marca candidatos y salen elegidos los más votados (LOREG, art. 166).
- **No se aplica a nivel nacional.** No hay un reparto de los 350 escaños según el porcentaje en toda España. Hay 52 repartos, uno por circunscripción.
- **En Ceuta y Melilla**, que eligen un solo diputado, gana el candidato con más votos (art. 163.2).
