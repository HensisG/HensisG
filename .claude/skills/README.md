# Skills de venta y réplica: un solo reporte

17 skills de Claude Code de Jake Schincariol (licencia MIT, ver `LICENSE-*`):

- **Venta** (6 de 11 de [founder-skill](https://github.com/Jakeschincariol/founder-skill), commit `fd9385b`)
- **Réplica** (11 de 11 de [replica-skill](https://github.com/Jakeschincariol/replica-skill), commit `77c9436`)

Para usarlas en otro proyecto: copiar las carpetas `founder-*` y `replica-*` a `.claude/skills/`
de ese repo (o abrir Claude Code dentro de este repo).

## El flujo, en un solo reporte

Cada skill escribe en su carpeta (`founder/` o `replica/`). Al final se juntan en
`reporte/REPORTE.md` con la estructura de abajo.

| # | Paso | Skill | Sale en | Va a la sección |
|---|------|-------|---------|-----------------|
| 1 | Qué hay en el mercado | `/founder-competitors` | `founder/competitors.md` | 1. Mercado |
| 2 | Qué odian los usuarios del líder | `/replica-entrepreneur` | `replica/feedback.md`, `replica/fixes.md` | 1. Mercado |
| 3 | Cómo funciona la app a mejorar | `/replica-recon` | `replica/recon.md` | 2. Producto |
| 4 | ¿Comprarían? (simulado) | `/founder-consumer --quick` | `founder/panel/results.md` | 3. Clientes |
| 5 | Precio | `/founder-pricing` | `founder/pricing.md` | 4. Oferta y precio |
| 6 | Oferta | `/founder-offer` | `founder/offer.md` | 4. Oferta y precio |
| 7 | Plan técnico | `/replica-architect` → `design` → `build` → `backend` | `replica/` | 5. Construcción |
| 8 | Calidad | `/replica-test`, `/replica-diff` | `replica/bugs.md`, `replica/parity.md` | 5. Construcción |
| 9 | Marca propia | `/replica-brand` | `replica/brand.md` | 6. Marca |
| 10 | Marketing | `/founder-marketing` | `founder/marketing.md` | 7. Salida al mercado |
| 11 | Landing y tienda | `/replica-launch` | `replica/launch/` | 7. Salida al mercado |
| 12 | Prueba real y lanzamiento | `/founder-launch` | `founder/launch.md` | 7. Salida al mercado |
| 13 | Publicar | `/replica-deploy` | `replica/deploy.md` | 8. En vivo |

Para validar una idea sin construir nada: pasos 1 a 6 y 10. Eso ya es un reporte de ventas.

## Estructura de `reporte/REPORTE.md`

1. Mercado: competidores, precios, quejas reales (con links) y el hueco a ocupar.
2. Producto: pantallas y flujos de la referencia, qué se mejora.
3. Clientes: segmentos, objeciones, qué haría cambiar un "no".
4. Oferta y precio: rango aceptable, precio elegido, oferta de lanzamiento.
5. Construcción: stack, paridad de funciones, bugs abiertos.
6. Marca: nombre (con chequeos de marca registrada), voz, look.
7. Salida al mercado: posicionamiento, canales, 30 días de campaña, prueba con clientes reales.
8. Decisión: seguir / ajustar / no seguir, y por qué.

## Avisos

- Los compradores de `/founder-consumer` son simulados: buenos para encontrar objeciones,
  malos para predecir ventas. Confirmar con personas reales (preventa, lista de espera).
- Las skills `replica-*` rehacen funciones y flujos, nunca código, logos, textos ni contenido
  ajeno. `/replica-brand` y `/replica-deploy` bloquean el lanzamiento si queda algo del original.
  Antes de vender: revisar marcas registradas y, si hay dinero en juego, un abogado.
- No incluidas de founder-skill: board, cfo, brand, ops, plan. `founder-pricing` usa el script
  de margen de `founder-cfo` y `founder-offer` el método de `founder-board`; sin ellas funcionan
  con menos detalle.
