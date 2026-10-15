---
titulo: "Voto en blanco, voto nulo y abstención"
descripcion: "Qué es legalmente cada opción, cuál cuenta para la barrera del 3 % y qué efecto real tiene en el reparto de escaños. Con ejemplo y sin mitos."
orden: 5
resumen:
  - "Voto en blanco: sobre vacío (o, en el Senado, papeleta sin marcar). Es un voto válido."
  - "Voto nulo: papeleta no oficial, alterada, sin sobre o con papeletas de partidos distintos. No es válido y no cuenta para el reparto."
  - "Abstención: no votar. No deja ninguna huella en el reparto."
  - "La única diferencia práctica entre las tres es que el voto en blanco cuenta para calcular la barrera del 3 %; ninguna suma escaños a nadie."
fuentes:
  - titulo: "Ley Orgánica 5/1985, de 19 de junio, del Régimen Electoral General (texto consolidado)"
    emisor: "Boletín Oficial del Estado"
    tipo: "oficial"
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672"
    localizacion: "Artículos 5, 96, 97, 108.4 y 163.1"
    fecha_documento: "1985-06-19"
    fecha_consulta: "2026-10-15"
  - titulo: "29N: guía básica sobre las elecciones generales y el proceso electoral"
    emisor: "La Moncloa (Ministerio del Interior)"
    tipo: "oficial"
    url: "https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/interior/Paginas/guia-dudas-elecciones-generales-29n.aspx"
    localizacion: "Apartados «¿Quién tiene derecho a votar?» y «¿Qué votos son válidos y cuáles son nulos?»"
    fecha_documento: "2026-10-14"
    fecha_consulta: "2026-10-15"
  - titulo: "¿Cómo solicitar el voto por correo en las elecciones generales del 29 de noviembre?"
    emisor: "La Moncloa (Ministerio del Interior)"
    tipo: "oficial"
    url: "https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/interior/Paginas/voto-por-correo-elecciones-generales-29n.aspx"
    localizacion: "Apartado «¿Cuáles son los plazos del voto por correo?»"
    fecha_documento: "2026-10-14"
    fecha_consulta: "2026-10-15"
revision:
  fecha_revision: "2026-10-15"
  estado_editorial: "publicado"
  notas: "Ejemplo calculado con src/lib/dhondt.js y comprobado a mano."
---

## Qué dice la ley de cada opción

### Voto en blanco

Es un **voto válido**, pero no apoya a ninguna candidatura (LOREG, art. 96.5):

- **Congreso:** sobre que se mete en la urna **sin papeleta dentro**. Hay que usar el sobre oficial.
- **Senado:** sobre vacío o papeleta del Senado **sin ninguna cruz**.

### Voto nulo

Es un voto que **no es válido** y no se tiene en cuenta para el reparto. Según el artículo 96 de la LOREG, es nulo:

- el voto en sobre o papeleta que **no sea el modelo oficial**;
- la papeleta **sin sobre**;
- el sobre con **papeletas de candidaturas distintas**. Si lleva varias papeletas **de la misma** candidatura, cuenta como un solo voto válido;
- la papeleta con nombres **tachados, añadidos o reordenados**, o con **cualquier frase, dibujo o alteración voluntaria**;
- en el Senado, la papeleta con **más cruces de las permitidas**: más de 3 en las provincias, más de 2 en Gran Canaria, Mallorca, Tenerife, Ceuta y Melilla, y más de 1 en las demás islas;
- el voto en un **sobre alterado**.

En el voto por correo, el Ministerio del Interior advierte de que meter un documento de identidad dentro del sobre de votación hace que la mesa considere **nulo** el voto.

### Abstención

Es **no votar**. En España votar no es obligatorio y nadie puede ser obligado a votar ni a revelar su voto (LOREG, art. 5). Quien se abstiene no figura en ningún recuento de votos. Solo cuenta para calcular la participación.

## Cómo influye cada opción en el reparto

| | ¿Se cuenta? | ¿Entra en los «votos válidos»? | ¿Sube la barrera del 3 %? | ¿Da escaños a alguien? |
|---|---|---|---|---|
| Voto a una candidatura | Sí | Sí | Sí | Sí, a esa candidatura |
| Voto en blanco | Sí | **Sí** | **Sí** | No |
| Voto nulo | Sí, como nulo | No | No | No |
| Abstención | No | No | No | No |

La barrera se calcula sobre los votos válidos, **incluidos los votos en blanco** (arts. 108.4 y 163.1.a). Por eso el voto en blanco puede dejar fuera del reparto a una candidatura que esté justo en el límite del 3 %. Después, para el reparto con el método D'Hondt, solo se usan los votos de las candidaturas que han superado la barrera.

## Ejemplo práctico

> **Atención: cifras inventadas.** Circunscripción imaginaria grande, con 35 escaños, para que se vea el efecto de la barrera.

Votos a candidaturas: A 40.000; B 30.000; C 25.000; D 3.000. Total: **98.000**.

**Caso 1. Nadie vota en blanco.**
- Votos válidos: 98.000. Barrera: 3 % = **2.940**.
- D (3.000) **supera** la barrera.
- Reparto D'Hondt: **A 14, B 11, C 9, D 1**.

**Caso 2. Además hay 2.500 votos en blanco.**
- Votos válidos: 98.000 + 2.500 = 100.500. Barrera: 3 % = **3.015**.
- D (3.000) **no llega** y queda fuera.
- Reparto: **A 15, B 11, C 9, D 0**. El escaño que habría sido de D pasa a la candidatura con el siguiente cociente más alto, que en este ejemplo es A. En otro reparto podría ser otra.

**Caso 3. En vez de en blanco, hay 2.500 votos nulos.**
- Los nulos no entran en los votos válidos: siguen siendo 98.000 y la barrera, 2.940.
- El reparto es igual que en el caso 1: **A 14, B 11, C 9, D 1**.

**Caso 4. Esas 2.500 personas se abstienen.**
- Mismo resultado que en el caso 1.

## Mitos frecuentes

- **«El voto en blanco va al partido más votado.»** Falso. No se suma a ninguna candidatura. Su único efecto es subir la barrera del 3 %, como se ve en el caso 2.
- **«El voto nulo o la abstención se reparten entre los partidos.»** Falso. Ni los votos nulos ni la abstención se asignan a nadie.
- **«Si gana el voto en blanco, quedan escaños vacíos.»** Falso. La ley no prevé escaños vacíos: todos los escaños de la circunscripción se reparten entre las candidaturas que superan la barrera.
- **«Votar en blanco y abstenerse es lo mismo.»** No del todo: el voto en blanco cuenta como válido y entra en la barrera; la abstención no.

La ley no da a ninguna de las tres opciones un efecto de protesta especial. Qué significado político tienen es una valoración de cada persona.
