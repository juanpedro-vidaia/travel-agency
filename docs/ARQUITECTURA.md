# Arquitectura — Viajes Vidaia

> Documento técnico para desarrolladores. Explica el flujo de datos, las decisiones de diseño y las convenciones del proyecto.

---

## Mapa de rutas

| Ruta | Archivo | Tipo | Datos |
|---|---|---|---|
| `/es` | `app/[lang]/page.tsx` | Server Component | `getCountriesOrdered()`, `getDestinations()`, `getStaticContent()` |
| `/es/viajes` | `app/[lang]/viajes/page.tsx` | Server Component | `getActiveTrips()`, `getCountriesOrdered()`, `getDestinations()`, `getStaticContent()`, `getCommonUI()` |
| `/es/destinos/:slug` | `app/[lang]/destinos/[slug]/page.tsx` | Server Component | `getCountryBySlug()`, `getTripsByCountry()`, `getDestinationsByCountry()`, `getStaticContent()`, `getAsset()` |
| `/es/itinerarios/:slug` | `app/[lang]/itinerarios/[slug]/page.tsx` | Server Component (shell) | Delega rendering a `ItineraryContent` (Client Component) |
| `/es/itinerarios/personalizar` | `app/[lang]/itinerarios/personalizar/page.tsx` | Server Component (shell) | Delega a `FormularioPersonalizado` (Client Component) |
| `/es/itinerarios/:slug/personalizar` | `app/[lang]/itinerarios/[slug]/personalizar/page.tsx` | Redirect a personalizar con `?itinerarySlug=` | — |
| `/es/itinerarios/personalizar/exito` | `app/[lang]/itinerarios/personalizar/exito/page.tsx` | Server Component | Página de confirmación post-formulario |
| `/es/lunas-de-miel` | `app/[lang]/lunas-de-miel/page.tsx` | Server Component | `getStaticContent()`, `getCommonUI()`, `getAsset()` |
| `/es/blog` | `app/[lang]/blog/page.tsx` | Server Component | `getAllPosts()`, `getFeaturedPost()`, `getAsset()` |
| `/es/blog/:slug` | `app/[lang]/blog/[slug]/page.tsx` | Server Component (shell) | Delega a `PostContent` (Client Component) |
| `/es/privacidad` | `app/[lang]/privacidad/page.tsx` | Server Component | `getStaticContent()`, `getCommonUI()` |
| `/es/cookies` | `app/[lang]/cookies/page.tsx` | Server Component | `getStaticContent()`, `getCommonUI()` |
| `/es/aviso-legal` | `app/[lang]/aviso-legal/page.tsx` | Server Component | `getStaticContent()`, `getCommonUI()` |
| `/api/forms/contacto` | `app/api/forms/contacto/route.ts` | API Route (POST) | — |
| `/api/forms/newsletter` | `app/api/forms/newsletter/route.ts` | API Route (POST) | — |
| `/api/forms/presupuesto` | `app/api/forms/presupuesto/route.ts` | API Route (POST) | Zod validation con `formSchema` |
| `/llms.txt` | `app/llms.txt/route.ts` | API Route (GET) | `getCountriesOrdered()`, `getDestinationsByCountry()`, `getActiveTrips()` |

---

## Flujo de datos

```
lib/data/*.ts (datos estáticos TypeScript)
    ↓
lib/services/*.ts (funciones de acceso)
    ↓
app/[lang]/*/page.tsx (Server Components — leen datos)
    ↓ props
components/sections/*.tsx + components/ui/*.tsx (Server o Client Components)
```

### Para componentes con contenido estático de UI (textos)

Existen dos rutas paralelas según si el componente es Server o Client:

**Ruta A — Server Components (páginas):**
```
getStaticContent(lang) → content.xxx → props → componente
getCommonUI(lang) → ui.buttons / ui.labels → props → componente
getAsset('KEY') → { url, alt } → props → componente
```

**Ruta B — Client Components (interactivos):**
```
LanguageContext → useLanguage() → { content, ui, language } → componente
getAsset('KEY') llamado directamente en el componente (función pura)
```

---

## `lib/data/` — Ficheros de datos

| Fichero | Propósito |
|---|---|
| `staticContent.ts` | Todos los textos de la UI en español (e inglés parcial). Exporta `STATIC_CONTENT` y `COMMON_UI`. |
| `assets.ts` | Registro tipado de todas las URLs de imágenes y sus `alt`. Exporta `ASSETS` y `getAsset()`. |
| `countries.ts` | Array de países activos con contenido i18n, flags, slug, orden y coordenadas geográficas (`lat`, `lng`). |
| `destinations.ts` | Array de destinos con país, flag de `featured` y coordenadas opcionales (`lat?`, `lng?`). |
| `tagConfig.ts` | `TAG_CONFIG` y `TRIP_TAGS` — metadatos de tags (emoji + label). Separado de `trips.ts` para que los Client Components puedan importarlo sin arrastrar el array de viajes al bundle cliente. |
| `trips.ts` | Viajes con precio, duración, tags, países y referencias a itinerarios. Re-exporta `TAG_CONFIG` y `TripTag` desde `tagConfig.ts` para uso server-side. |
| `itineraries.ts` | Itinerarios detallados (días, etapas, alojamientos, actividades incluidas). |
| `activities.ts` | Actividades opcionales referenciadas desde itinerarios. |
| `hotels.ts` | Hoteles con categoría (3/4/5★) referenciados desde itinerarios. |
| `posts.ts` | Posts del blog con contenido Markdown, categoría, tags y tiempo de lectura. |
| `testimonials.ts` | Testimonios de clientes con texto, nombre, destino y foto. |
| `i18n.ts` | Helpers de formateo de fecha usados en `postsService`. |

---

## `lib/services/` — Funciones de acceso a datos

Los servicios son funciones puras que filtran y transforman los datos de `lib/data/`. No hay llamadas a red ni a base de datos.

| Servicio | Funciones clave |
|---|---|
| `countriesService.ts` | `getCountries()`, `getCountriesOrdered()`, `getCountryBySlug()` |
| `destinationsService.ts` | `getDestinations()`, `getDestinationById()`, `getDestinationsByCountry(countrySlug)` |
| `tripsService.ts` | `getActiveTrips()`, `getTripsByCountry()`, `getTripBySlug()`, `getRelatedTripsBySlug()` |
| `itinerariesService.ts` | `getItinerary()`, `getItineraryWithDetails()` (resuelve hotels y activities por referencia), `getAllItineraries()` |
| `activitiesService.ts` | `getActivityById()` |
| `hotelsService.ts` | `getHotelById()` |
| `postsService.ts` | `getAllPosts()`, `getRecentPosts(n)`, `getFeaturedPost()`, `getPostBySlug()` |
| `testimonialsService.ts` | `getFeaturedTestimonials()` |
| `clientify.ts` | `pushToClientify()` (comentado), payload builders para cada formulario |

---

## `lib/helpers/` — Utilidades

| Fichero | Funciones |
|---|---|
| `contentHelpers.ts` | `getStaticContent(lang)`, `getCommonUI(lang)`, `renderTemplate(template, vars)`, `formatPrice(price)` |
| `seo.ts` | `buildMetadata({ title, description, path, lang, ogImage?, ogType? })` — genera Metadata completo con OG, Twitter Card, canonical y hreflang |

---

## `lib/schema/` — Builders de structured data (JSON-LD)

Módulo creado para centralizar toda la generación de schema.org. Cada builder recibe datos tipados y devuelve un objeto JSON-LD con `@context`. El helper `buildPageSchema` los combina en un `@graph` único eliminando los `@context` individuales.

| Builder | Schema | Usado en |
|---|---|---|
| `buildPageSchema(...schemas)` | `@graph` combinator | Todas las páginas con >1 schema |
| `buildOrganizationSchema(countries, destinations)` | `TravelAgency` con `@id`, `areaServed`, `knowsAbout`, `sameAs` | `layout.tsx` (solo aquí, para todas las páginas) |
| `buildTouristDestinationSchema(country, dests)` | `TouristDestination` con `GeoCoordinates` + `includesAttraction` | `/destinos/[slug]` |
| `buildTouristTripSchema(trip, days, allDests)` | `TouristTrip` con `subTrip` por día y `subjectOf` actividades | `/itinerarios/[slug]` |
| `buildFAQSchema(items)` | `FAQPage` | Todas las páginas con FAQs |
| `buildPersonSchema(member)` | `Person` con `worksFor: { '@id': '.../#organization' }` | Home (equipo) |
| `buildArticleSchema(post)` | `Article` con `author`/`publisher` por `@id` | `/blog/[slug]` |

### Patrón de uso

```typescript
import { buildPageSchema, buildTouristDestinationSchema, buildFAQSchema } from '@/lib/schema'

<JsonLd data={buildPageSchema(
  buildTouristDestinationSchema(country, dests),
  buildFAQSchema(faqs),
)} id="ld-destination" />
```

`buildPageSchema` acepta 1..N schemas y siempre genera un `@graph` válido. Si solo hay un schema, igualmente lo envuelve en `@graph` para consistencia.

### `@id` canónico y referencias

`buildOrganizationSchema` emite `"@id": "https://www.viajesvidaia.com/#organization"`. Todos los builders que referencian la organización usan `{ '@id': 'https://www.viajesvidaia.com/#organization' }` en lugar de objetos inline (`worksFor`, `provider`, `author`, `publisher`). Esto evita que los validadores cuenten múltiples instancias de Organization en la misma página.

### `JsonLd` — deduplicación RSC

`components/scripts/JsonLd.tsx` usa `next/script` con prop `id` obligatoria. Next.js usa ese `id` para registrar el script y evitar re-inyectarlo cuando el runtime RSC cliente procesa el payload de hidratación — sin esto, los scripts del body aparecerían dos veces en validadores que ejecutan JavaScript (como validator.schema.org). Cada página usa un `id` estable y único: `ld-organization`, `ld-home`, `ld-destination`, `ld-itinerary`, `ld-article`, `ld-viajes`, `ld-honeymoon`.

### Patrón: Server Component como único punto de acceso a datos

Para páginas con Client Components pesados, el Server Component (`page.tsx`) pre-computa todos los datos y los pasa como props serializables. Los Client Components no importan servicios ni ficheros de datos.

**Ejemplo — itinerary page:**
```
page.tsx (Server)
  ├── getItineraryWithDetails() → resolvedItinerary
  ├── getTripBySlug()           → trip
  ├── getCountryBySlug()        → countries[]
  ├── getRelatedTripsBySlug()   → relatedTrips[]
  ├── getItineraryOptionals()   → optionals[]
  ├── Object.fromEntries(...)   → destinationNames: Record<string, string>
  └── Object.fromEntries(...)   → destCoords: Record<string, {name,lat,lng}>
         ↓ props serializables
  ItineraryContent (Client) → ItineraryHeroCarousel, ItineraryDayAccordion,
                               ItineraryHotels, ItineraryRelated, ItineraryMap
```

**Beneficio:** `itineraries.ts` + `activities.ts` + `hotels.ts` + `destinations.ts` (~244 KB parsed) se eliminan del bundle cliente. Los Client Components solo contienen lógica de UI (estado, efectos, Lucide icons).

**Regla:** Ningún Client Component del itinerario debe importar desde `lib/services/` ni `lib/data/` (excepto `getAsset()`, `tagConfig.ts`, y tipos TypeScript — que se eliminan en build).

---

### `renderTemplate`

Reemplaza placeholders `{variable}` en strings de contenido:

```typescript
renderTemplate('Viajes a {country}', { country: 'Argentina' })
// → 'Viajes a Argentina'
```

Usado en `destinationPage.titleTemplate`, `cta.descriptionTemplate`, etc.

---

## Sistema i18n y `staticContent`

### Cómo funciona

1. **`STATIC_CONTENT`** es un objeto con `es` (completo) y `en` (parcial) como claves de primer nivel.
2. **`COMMON_UI`** tiene `es` y `en` para los botones y labels comunes a toda la app.
3. **`getStaticContent(lang)`** devuelve `STATIC_CONTENT[lang] ?? STATIC_CONTENT.es` — tipado como `typeof STATIC_CONTENT.es`, garantizando que siempre hay tipo en TypeScript aunque el lang no exista.
4. **`ENABLED_LANGUAGES`** en `languages.config.ts` controla qué idiomas generan rutas estáticas (`generateStaticParams`).

### Cómo extender

Para añadir un string nuevo:

1. Añadir la clave en `STATIC_CONTENT.es` en `lib/data/staticContent.ts`.
2. Añadir la clave equivalente en `STATIC_CONTENT.en` (aunque sea igual que el español de momento).
3. Usar `getStaticContent(lang).nuevaClave` en los Server Components, o `content.nuevaClave` vía `useLanguage()` en Client Components.

### Convenciones de claves

Las claves de `STATIC_CONTENT` se nombran por página o sección:
- `home.hero`, `home.metadata`
- `viajesPage.hero`, `viajesPage.buscador`
- `destinationPage.hero`, `destinationPage.cta`
- `itineraryPage.accordion`, `itineraryPage.hotels`
- `formularioPersonalizado.step1`, `formularioPersonalizado.step3`
- `newsletter`, `contactModal`
- `privacyPage`, `cookiesPage`, `legalNoticePage`

Las claves de `COMMON_UI` se reservan para elementos transversales:
- `buttons.*` — llamadas a acción principales
- `labels.*` — etiquetas genéricas (días, noches, desde...)
- `map.*` — textos del mapa de itinerario

---

## Gestión de assets — `getAsset()`

### Cómo funciona

`lib/data/assets.ts` exporta `ASSETS`, un objeto con clave string → `{ url: string, alt: string }`. La función `getAsset(key)` devuelve el asset o un fallback `/images/placeholder.jpg` con warning en desarrollo.

```typescript
const asset = getAsset('COUNTRIES.ARGENTINA_HERO')
// → { url: 'https://res.cloudinary.com/...', alt: 'El Chaltén, Patagonia argentina' }
```

### Convención de naming de keys

| Prefijo | Uso |
|---|---|
| `LOGO.*` | Logos de la marca |
| `FLAGS.*` | Banderas de países (via flagcdn.com) |
| `COUNTRIES.*_HERO` | Imagen hero de cada país |
| `DESTINATIONS_CARD_*` | Imagen de la card en DestinationsSection |
| `DESTINATIONS.*` | Imágenes de destinos específicos |
| `TRIPS.*` | Imágenes de viajes (card y detalle) |
| `ITINERARIES.*` | Imágenes del carousel de itinerarios |
| `VIAJES_HERO_*` | Imágenes del carousel de la página /viajes |
| `BLOG.*` | Imágenes de posts del blog |
| `TESTIMONIALS.*` | Fotos de testimonios |
| `HOTELS.*` | Fotos de hoteles |
| `TEAM.*` | Fotos del equipo |
| `INSTAGRAM_PHOTOS.*` | Fotos del grid de Instagram |
| `HOME.HERO_BG` | Fondo del hero de la home |
| `HONEYMOON_HERO_BG` | Fondo del hero de lunas de miel |
| `CTA_SECTION_BG` | Fondo de la sección CTA |

### Añadir un asset nuevo

1. Subir la imagen a Cloudinary o Unsplash.
2. Añadir la entrada en `ASSETS` en `lib/data/assets.ts`:
   ```typescript
   'TRIPS.NOMBRE_NUEVO': { url: 'https://...', alt: 'Descripción accesible' }
   ```
3. Usar `getAsset('TRIPS.NOMBRE_NUEVO')` donde sea necesario.

---

## Decisiones de arquitectura

### Server vs Client Components

El proyecto usa Server Components por defecto para todas las páginas y secciones sin interactividad, siguiendo las recomendaciones de Next.js 13+.

Los Client Components (`'use client'`) se usan solo cuando es necesario:
- **Estado** (`useState`, `useRef`): formularios, carousels, acordeones, buscador
- **Efectos** (`useEffect`): scroll listeners (Header), timers (carrusel)
- **Contexto** (`useContext`): componentes que leen `LanguageContext`, `ConsentContext`, `ContactModalContext`
- **APIs del browser**: `window`, `navigator`, `document`

Hay un número elevado de Client Components que no tienen interactividad propia pero dependen de `useLanguage()` para leer los textos (ver `docs/AUDITORIA.md` sección 7.2). Esta es una consecuencia de la arquitectura de `LanguageContext`.

### `LanguageContext` — por qué existe

El idioma se lee del segmento `[lang]` de la URL. En un Server Component, `lang` está disponible como `params.lang`. Pero los componentes compartidos (Header, Footer, Hero, CTASection...) que se renderizan en múltiples páginas no reciben `lang` como prop — lo obtendrían del contexto.

La alternativa sería pasar `lang` por props en cascada desde cada página a cada componente, o usar `useParams()` en Client Components. Se optó por `LanguageContext` para evitar el prop drilling.

### `staticContent.ts` plano vs jerarquía profunda

El contenido estático se organiza por sección de página (ej. `viajesPage.buscador`) en lugar de una jerarquía genérica. Esto hace que sea más fácil encontrar un texto por su ubicación en la UI, a costa de no poder reutilizar strings idénticos entre secciones.

Los buscadores de texto en `COMMON_UI` (botones, labels) son la excepción — sí se comparten entre secciones.

### Sin base de datos externa

Todo el contenido (viajes, itinerarios, posts, hoteles, actividades, países, testimonios) vive en ficheros TypeScript en `lib/data/`. Ventajas: cero latencia de datos, tipado completo, build completamente estático (SSG), sin costes de BBDD. Desventaja: añadir contenido requiere editar código y redeploy.

---

## Integraciones externas

### Clientify CRM

- **Estado:** Código completo, listo para activar. Comentado en los 3 API Routes y en `lib/services/clientify.ts`.
- **Qué hace:** Envía leads (nombre, email, teléfono) al CRM cuando alguien rellena un formulario.
- **Reuniones (activo):** La URL `https://reuniones.clientify.com/#/viajesvidaia/hablemos30min` está activa en el FAB de contacto y en la página de lunas de miel.
- **Para activar:** Añadir `CLIENTIFY_API_KEY` al `.env.local` y descomentar el código en los routes.

### Resend (email)

- **Estado:** Código listo, comentado. Requiere instalar `npm install resend`.
- **Qué hace:** Envía un email de notificación al equipo cuando se recibe un formulario.
- **Para activar:** Añadir `RESEND_API_KEY`, configurar DNS del dominio en Resend, y descomentar el código.

### Google Analytics 4

- **Estado:** Activo. El componente `GoogleAnalytics.tsx` carga el script de GA4 solo si el usuario ha aceptado las cookies analíticas (vía `ConsentContext`).
- **Variable:** `NEXT_PUBLIC_GA4_MEASUREMENT_ID`.

### `llms.txt` — Visibilidad en IAs

- **Ruta:** `GET /llms.txt` — `app/llms.txt/route.ts`
- **Qué hace:** Genera un fichero de texto plano en formato [llms.txt](https://llmstxt.org/) con la descripción del negocio, destinos activos con sus atracciones, y los itinerarios destacados con enlace directo. Los crawlers de LLMs (ChatGPT, Perplexity, Claude, Gemini) leen este fichero para conocer el sitio sin necesidad de renderizar HTML.
- **Contenido dinámico:** Lee en tiempo real de `getCountriesOrdered()`, `getDestinationsByCountry()` y `getActiveTrips()`. No requiere mantenimiento manual.

### Instagram widget

- **Estado:** Grid estático con fotos de Unsplash como placeholder. Hay un comentario en `InstagramBanner.tsx` con el div de Elfsight listo para insertar.

---

## Convenciones del proyecto

### Naming de componentes

- **PascalCase** para todos los componentes: `DestinationsSection`, `TripCard`, `ViajesBuscador`.
- Prefijo de sección cuando el nombre es genérico: `ViajesHero`, `ViajesServicios` (no solo `Hero` para el hero de viajes).
- Sufijo `Section` para secciones de página: `BlogSection`, `CTASection`, `TestimonialsSection`.

### Estructura de ficheros

- Un componente = un fichero (excepto subcomponentes íntimamente relacionados como `HomeCard` y `DestinationsSection` en el mismo fichero).
- Los Client Components que son subcomponentes de una página se ubican junto a la página: `app/[lang]/destinos/[slug]/DestinationBackButton.tsx`.

### Convenciones de Tailwind

- Mobile-first: estilos base para móvil, `md:` y `lg:` para responsive.
- Paleta de colores en `tailwind.config.ts`: `vidaia-primary`, `vidaia-dark`, `vidaia-earth`, `vidaia-brown`, `vidaia-sand`, `vidaia-cream`, `vidaia-charcoal`, `vidaia-light`.
- Fuentes: `font-heading` para Playfair Display, `font-sans` para Inter.

---

## Reglas no negociables

1. **No llamar a APIs externas en Server Components** sin justificación. El modelo actual es datos estáticos; cualquier fetch dinámico debe ir en una API Route o hacerse solo en Client Components.

2. **No usar `LangLink` en Server Components.** `LangLink` usa `useLanguage()` y es un Client Component. En Server Components usar `Link` de `next/link` directamente con el `lang` como prop.

3. **No añadir texto de UI directamente en JSX** sin pasar por `staticContent.ts`. Todo string visible al usuario debe ser internacionalizable desde el primer día.

4. **`getAsset()` nunca falla en producción.** Siempre devuelve un fallback. Pero sí logea un warning en desarrollo — usar eso para detectar keys incorrectas.

5. **Los API Routes de formulario deben siempre validar con Zod** antes de procesar los datos (`formSchema.safeParse(body)`). El formulario de presupuesto ya lo hace; los de contacto y newsletter validan manualmente.

6. **No commitear claves de API.** Las variables sensibles van únicamente en `.env.local` (ignorado por git).
