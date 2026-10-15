# Modelo orientativo de ingresos y costes

> No garantizamos la aprobación de AdSense, ni tráfico, ni rentabilidad. Las cifras de ejemplo son
> **supuestos ilustrativos**, no datos propios ni de mercado verificados. Sustitúyelas por tus datos reales
> (AdSense → Informes → RPM de página) en cuanto existan.

## Fórmula

```
ingresos mensuales (€) = páginas vistas mensuales / 1.000 × RPM de página (€)
```

El **RPM de página** son los ingresos por cada mil páginas vistas. Depende del país del lector, la
temporada (la publicidad suele variar entre meses), el porcentaje de usuarios que rechazan el
consentimiento (que pueden recibir anuncios limitados o ninguno), la ubicación de los bloques y el tipo
de contenido.

## Tabla de sensibilidad (valores ilustrativos)

Los RPM de esta tabla (0,50 €, 1,50 € y 3,00 €) son **supuestos ilustrativos** elegidos solo para mostrar
el cálculo. No proceden de datos propios.

| Páginas vistas/mes | RPM 0,50 € | RPM 1,50 € | RPM 3,00 € |
|---:|---:|---:|---:|
| 10.000 | 5 € | 15 € | 30 € |
| 50.000 | 25 € | 75 € | 150 € |
| 200.000 | 100 € | 300 € | 600 € |
| 1.000.000 | 500 € | 1.500 € | 3.000 € |

El tráfico de una web electoral es muy estacional: puede concentrarse en las semanas previas a la
votación y caer después. Planifica los costes con el escenario bajo.

## Costes (rellenar con presupuestos reales)

| Concepto | Notas |
|---|---|
| Dominio | Pago anual al registrador elegido |
| Alojamiento estático | Cloudflare Pages, Netlify o GitHub Pages ofrecen planes gratuitos con límites; comprueba sus condiciones actuales y el uso comercial |
| Proxy OAuth del panel | Gratuito en Netlify o en un Worker de Cloudflare dentro de sus límites gratuitos |
| Medición sin cookies | Gratuita si es autoalojada (coste del servidor) o de pago en servicios gestionados |
| Revisión jurídica de textos legales | Una vez al inicio y tras cambios relevantes |
| **Mantenimiento editorial** | Normalmente el coste principal: horas de verificación y actualización × coste por hora |

Para estimar el mantenimiento editorial: (fichas × horas de revisión por ficha y semana) + (piezas del
calendario × horas por pieza) + (correcciones). En campaña la carga sube; después baja a seguimiento
legislativo.

## Margen

```
margen mensual = ingresos mensuales − (alojamiento + dominio/12 + herramientas + horas editoriales × coste/hora)
```

Revisa el modelo cada mes con datos reales de Search Console y AdSense, y no aumentes la densidad de
anuncios a costa de la lectura o del uso de las herramientas.
