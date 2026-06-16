# Inventario de imágenes — tamaños recomendados y auditoría `sizes`

> Doble propósito: (1) decidir a qué resolución subir cada imagen a Cloudinary, y (2) base para la auditoría M29 (`sizes`) y M30 (aspect ratio) cuando todas las imágenes finales estén subidas.

## Criterio de tamaño recomendado

El ancho recomendado de subida = **ancho CSS máximo al que se renderiza × 2** (para pantallas retina/2x DPR). Next.js genera automáticamente las variantes más pequeñas a partir del original (`deviceSizes` por defecto: 640/750/828/1080/1200/1920/2048/3840), así que **solo importa que el original sea ≥ la variante más grande que se pueda pedir**. Subir más grande no mejora nada y pesa de más; subir más pequeño se ve borroso en retina.

Las **banderas** (`flagcdn.com`, 20×15) son externas y ya vienen dimensionadas → **no requieren acción**.

> **Por qué 2560 mínimo en heroes (no 2200):** en un monitor grande o retina, Next.js intenta pedir la variante de 2560px (p. ej. 1280 CSS × 2 de DPR). Si el original solo tiene 2200px, **no puede generar esa variante → escala hacia arriba y se ve blanda**. Es exactamente el síntoma de un hero a 2200px que en una pantalla de 27" "le falta nitidez". Para 4K perfecto serían 3840, pero 2560 es el punto dulce (más allá, rendimientos decrecientes y mucho peso).

## Una imagen vs varias: resolución ≠ recorte

Es el concepto que decide si hay que subir uno o varios archivos:

- **Distinta resolución → UNA sola imagen.** `<Image>` genera automáticamente el `srcset` con todas las variantes a partir del original y sirve la adecuada según el `sizes` y la pantalla. Si la misma foto a 2560px se usa en un hero (`100vw`) y en una card (`33vw`), en la card Next.js pide una variante **pequeña (~640px)** de ese mismo archivo — **no sirve los 2560 en la card**. No hace falta generar un 1280 a mano: se sube una vez al tamaño mayor y Next la reduce sola.
- **Distinto recorte / proporción → ARCHIVO APARTE.** Lo único que justifica un segundo archivo es necesitar **otra proporción** (el caso del `url_mobile` vertical de los heroes), no otra resolución.

> **Regla mental:** distinta resolución → una imagen, Next.js se encarga · distinto recorte/proporción → archivo aparte.

Por tanto, el ancho "mínimo" de la tabla aplica **solo si la imagen vive únicamente en ese rol**. Si una foto se comparte entre un hero y una card, gana el requisito mayor (2560) y se sube **una sola vez** a ese tamaño.

---

## Tabla por rol de imagen

| Rol / prefijo en `assets.ts` | Componente(s) | `sizes` actual | Render máx (CSS) | **Subir a (ancho)** | Aspect sugerido |
|---|---|---|---|---|---|
| `HOME.HERO_BG` | `Hero.tsx` (fill) | `100vw` ✅ | 100vw | **2560** (+ mobile 1080) | 16:9 desktop |
| `VIAJES_HERO_*` | `ViajesHero.tsx` (carousel) | `100vw` | 100vw | **2560** | 16:9 |
| `COUNTRIES.*_HERO` | `DestinationHeroImage.tsx` | `100vw` | 100vw | **2560** + `url_mobile` **1080** (M20) | 16:9 desktop / 4:5 móvil |
| `HONEYMOON_HERO_BG` | `LunasDeMielHeroImage.tsx` | `100vw` | 100vw | **2560** + `url_mobile` **1080** (M20) | 16:9 / 4:5 móvil |
| `ITINERARIES.*` | `ItineraryHeroCarousel.tsx` (100vw) **y** `ItineraryRelated`/cards (3-col) | `100vw` / 3-col | 100vw (uso hero manda) | **2560** | 16:9 |
| `CTA_SECTION_BG` | `CTASection.tsx` | `100vw` | 100vw | **2560** | 16:9 (lleva overlay oscuro) |
| `TEAM.*` (paisaje) | `QuienesSomos.tsx` (banner) | `(max-width:1280px) 100vw, 1280px` | 1280 | **2560** | ~21:9 banner |
| `BLOG.*` (portada) | `PostContent.tsx` portada | `(max-width:1280px) 100vw, 1280px` | 1280 ⚠️ verificar contenedor | **2560** (o 1920 si el contenedor es más estrecho) | 16:9 |
| `DESTINATIONS_CARD_*` / `DESTINATIONS.*` | `DestinationsSection(.Expand).tsx` | `(max-width:768px) 100vw, 50vw` | ~960 | **1600** | a confirmar (M30) |
| `BLOG.*` (featured) | `BlogFilters.tsx` destacado | `(max-width:768px) 100vw, 50vw` | ~960 | **1600** | 16:9 |
| `TRIPS.*` | `TripCard.tsx` (2 variantes) | `(max-width:640px)100vw,(max-width:1024px)50vw,33vw` | ~640 (móvil) | **1280** | a confirmar (M30) |
| `ITINERARIES.*` (como card) | `ItineraryRelated.tsx`, `PostContent` relacionados | idem 3-col | ~640 | (cubierto por 2560 del hero) | — |
| `BLOG.*` (card) | `BlogFilters` grid, `BlogSection.tsx` | 3-col / `33vw` | ~640 | (cubierto por 2560 portada) | — |
| `HOTELS.*` | `ItineraryHotels.tsx` | 3-col | ~640 | **1280** | a confirmar (M30) |
| `TEAM.*` (retratos) | `QuienesSomos.tsx` equipo | `112px` | 112 | **400×400** (margen futuro) | 1:1 |
| `BLOG`/`TRIPS` miniatura | `PostContent.tsx` viaje relacionado | `64px` | 64 | **160×160** | 1:1 |
| `TESTIMONIALS.*` | `TestimonialsSection.tsx` | `44px` | 44 | **128×128** (se elimina con M38) | 1:1 |
| `LOGO.*` | `Header.tsx`, `Footer.tsx` | fijo 160×44 (alto 40–56px) | ~160 | **SVG** ideal, o PNG **480×132** | — |
| `FLAGS.*` / flagcdn | varios selectores | fijo 20×15 | 20 | — (externo, sin acción) | — |

---

## Notas y puntos a verificar en la auditoría (M29 / M30)

1. ~~**`Hero.tsx` (home) no declara `sizes`**~~ — ✅ Resuelto 16/06/2026: añadido `sizes="100vw"` explícito, consistente con el resto de heroes.
2. **`PostContent.tsx` portada declara `1280px`** — verificar el ancho real del contenedor del artículo. Si el `<article>` tiene un `max-w` menor (p. ej. `max-w-4xl` ≈ 896px), el `sizes` está sobredeclarado y se sirve imagen de más; ajustar a la anchura real.
3. **Heroes móviles (M20)** — `COUNTRIES.*_HERO` y `HONEYMOON_HERO_BG` ya consumen `url_mobile ?? url`; subir las variantes verticales (≈1080×1350) y añadirlas en `assets.ts` cierra M20.
4. **Aspect ratio (M30)** — para cards (`TRIPS`, `DESTINATIONS`, `HOTELS`) la proporción debe coincidir con la del contenedor (`object-cover` recorta). Confirmar visualmente en producción mobile+desktop antes de dar por buenos los ratios marcados "a confirmar".
5. La mayoría de los `sizes` de grids (3-col y 2-col) ya están bien planteados — la auditoría es de **verificación**, no de reescritura masiva.

---

## Resumen accionable para subir imágenes

- **Heroes y fondos full-bleed** (`HOME.HERO_BG`, `VIAJES_HERO_*`, `COUNTRIES.*_HERO`, `HONEYMOON_HERO_BG`, `CTA_SECTION_BG`, `ITINERARIES.*`): **2560px de ancho** (+ variante móvil ~1080px para los heroes de destino y lunas de miel).
- **Banners anchos** (`TEAM` paisaje, `BLOG` portada): **2560px**.
- **Cards a media columna** (`DESTINATIONS*`, `BLOG` featured): **1600px**.
- **Cards a tercio** (`TRIPS`, `HOTELS`, `BLOG` cards): **1280px**.
- **Retratos / avatares** (`TEAM` equipo, `TESTIMONIALS`, miniaturas): **128–400px cuadrado**.
- **Logo**: SVG (o PNG 480px ancho).
- **Banderas**: nada (externas).
