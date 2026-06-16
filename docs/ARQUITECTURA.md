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
| `/manifest.webmanifest` | `app/manifest.ts` | Metadata Route | `getCountriesOrdered()` (descripción dinámica) |
| (404 global) | `app/not-found.tsx` | Server Component | Página 404 con marca; se renderiza al llamar `notFound()` o en rutas inexistentes |
| (rutas sin `/es`) | `proxy.ts` (raíz del proyecto) | Proxy (middleware de Next.js 16) | Redirige `/` y cualquier ruta sin prefijo de idioma a `/${DEFAULT_LANGUAGE}/...` (307) |

> **Nota Next.js 16:** `middleware.ts` está deprecado — el fichero se llama `proxy.ts` con export `proxy()`. En el build aparece como `ƒ Proxy (Middleware)`.

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
| `clientify.ts` | `pushContactToClientify()`, `pushNewsletterToClientify()`, `pushPresupuestoToClientify()` + payload builders (activo) |
| `resend.ts` | `sendNotificationEmail()` — notificación email best-effort de formularios (activo) |

---

## `lib/config/` — Configuración

| Fichero | Contenido |
|---|---|
| `site.ts` | `BASE_URL = 'https://viajesvidaia.com'` — **dominio canónico único** (no-www, coincide con el redirect del hosting). Toda URL absoluta del proyecto DEBE importar esta constante; nunca hardcodear el dominio. La importan: `seo.ts`, `sitemap.ts`, `robots.ts`, todos los builders de `lib/schema/`, `llms.txt` y las páginas personalizar. |
| `contact.ts` | `CONTACT` — teléfono, email, horarios |
| `languages.config.ts` | `LANGUAGES_CONFIG`, `ENABLED_LANGUAGES`, `DEFAULT_LANGUAGE` |

---

## `lib/helpers/` — Utilidades

| Fichero | Funciones |
|---|---|
| `contentHelpers.ts` | `getStaticContent(lang)`, `getCommonUI(lang)`, `renderTemplate(template, vars)`, `formatPrice(price)` |
| `seo.ts` | `buildMetadata({ title, description, path, lang, ogImage?, ogType?, publishedTime? })` — genera Metadata completo con OG, Twitter Card, canonical y hreflang. `publishedTime` solo se emite con `ogType: 'article'` (blog posts). **Todas** las páginas usan este helper — incluidas legales y blog posts; no construir metadata a mano. |

---

## `lib/schema/` — Builders de structured data (JSON-LD)

Módulo creado para centralizar toda la generación de schema.org. Cada builder recibe datos tipados y devuelve un objeto JSON-LD con `@context`. El helper `buildPageSchema` los combina en un `@graph` único eliminando los `@context` individuales.

| Builder | Schema | Usado en |
|---|---|---|
| `buildPageSchema(...schemas)` | `@graph` combinator | Todas las páginas con >1 schema |
| `buildOrganizationSchema(countries, destinations)` | `TravelAgency` con `@id`, `areaServed`, `knowsAbout`, `sameAs` | `layout.tsx` (solo aquí, para todas las páginas) |
| `buildWebSiteSchema()` | `WebSite` con `publisher` por `@id` (sin SearchAction — no hay buscador con URL de query) | `layout.tsx` |
| `buildTouristDestinationSchema(country, dests)` | `TouristDestination` con `GeoCoordinates` + `includesAttraction` | `/destinos/[slug]` |
| `buildTouristTripSchema(trip, days, allDests)` | `TouristTrip` con `image`, `subTrip` por día, `subjectOf` actividades y `offers: AggregateOffer` (solo si `priceFrom > 0`) | `/itinerarios/[slug]` |
| `buildFAQSchema(items)` | `FAQPage` | Todas las páginas con FAQs |
| `buildPersonSchema(member)` | `Person` con `image` (desde `imageKey`) y `worksFor` por `@id` | Home (equipo) |
| `buildArticleSchema(post)` | `Article` con `dateModified` (fallback a `datePublished`), `author`/`publisher` por `@id` | `/blog/[slug]` |
| `buildBreadcrumbSchema(lang, items)` | `BreadcrumbList` — el último item va sin `path` (página actual) | `/itinerarios/[slug]`, `/destinos/[slug]`, `/blog/[slug]` |
| `buildCollectionPageSchema(lang, opts)` | `CollectionPage` + `mainEntity: ItemList` — solo items con URL propia (ej. trips con `hasItinerary`) | `/viajes`, `/blog`, `/lunas-de-miel` |

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

`buildOrganizationSchema` emite `"@id": "${BASE_URL}/#organization"` (= `https://viajesvidaia.com/#organization`, importando `BASE_URL` de `lib/config/site.ts`). Todos los builders que referencian la organización usan `{ '@id': \`${BASE_URL}/#organization\` }` en lugar de objetos inline (`worksFor`, `provider`, `author`, `publisher`). Esto evita que los validadores cuenten múltiples instancias de Organization en la misma página.

### `JsonLd` — script nativo server-rendered

`components/scripts/JsonLd.tsx` usa `<script type="application/ld+json">` **nativo** (no `next/script`) con prop `id` obligatoria. El script queda en el HTML estático servido — visible para crawlers que **no ejecutan JS** (GPTBot, PerplexityBot, ClaudeBot), no solo para Google. Verificado en Next.js 16 (build de producción + Chrome headless) que no hay duplicación tras la hidratación — ver D22 en DECISIONS.md (revierte D15).

El layout emite Organization + WebSite juntos en un `@graph` con `id="ld-site"`. Ids por página: `ld-site`, `ld-home`, `ld-destination`, `ld-itinerary`, `ld-article`, `ld-breadcrumb`, `ld-viajes`, `ld-blog`, `ld-honeymoon`.

**Verificación rápida tras tocar schemas:** `curl -s localhost:3000/es | grep -c 'application/ld+json'` debe devolver ≥1 — si da 0, los schemas han dejado de estar en el HTML estático.

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
| `TESTIMONIALS.*` | Fotos de testimonios (a eliminar con M38 — Google Reviews) |
| `HOTELS.*` | Fotos de hoteles |
| `TEAM.*` | Fotos del equipo |
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

- **Estado:** Activo. Los 3 API Routes llaman a `pushContactToClientify`, `pushNewsletterToClientify` y `pushPresupuestoToClientify` (`lib/services/clientify.ts`).
- **Qué hace:** Crea/actualiza el contacto en el CRM y, según el formulario, una tarea de llamada (contacto), o un deal con nota en el pipeline "Viaje a Medida" (presupuesto).
- **Reuniones (activo):** La URL `https://reuniones.clientify.com/#/viajesvidaia/hablemos30min` está activa en el FAB de contacto y en la página de lunas de miel.
- **Variable:** `VV_CLIENTIFY_API_TOKEN`. Si no está definida, la integración se omite con un `console.warn` (el resto del flujo del formulario sigue funcionando).

### Resend (email) — M01

- **Estado:** Activo desde 16/06/2026 (paquete `resend` instalado).
- **Qué hace:** Envía un email de notificación al equipo cuando se recibe un formulario. Presupuesto → `sales@viajesvidaia.com`; contacto y newsletter → `info@viajesvidaia.com`. Remitente `web@viajesvidaia.com`.
- **Dónde:** centralizado en `lib/services/resend.ts` (`sendNotificationEmail`), llamado desde los 3 API Routes tras el push a Clientify. Plantillas: `buildPresupuestoEmailHtml` (`lib/form-utils.ts`) y HTML inline en contacto/newsletter.
- **Best-effort:** `sendNotificationEmail` captura sus propios errores y nunca lanza — un fallo de Resend no rompe el envío del formulario (Clientify es la fuente de verdad).
- **Variable:** `RESEND_API_KEY` + dominio `viajesvidaia.com` verificado en Resend. Si falta la variable, el envío se omite con un `console.warn`. Ver `docs/EMAIL.md`.

### Google Analytics 4

- **Estado:** Activo. El componente `GoogleAnalytics.tsx` carga el script de GA4 solo si el usuario ha aceptado las cookies analíticas (vía `ConsentContext`).
- **Variable:** `NEXT_PUBLIC_GA4_MEASUREMENT_ID`.

### `llms.txt` — Visibilidad en IAs

- **Ruta:** `GET /llms.txt` — `app/llms.txt/route.ts`
- **Qué hace:** Genera un fichero de texto plano en formato [llms.txt](https://llmstxt.org/) con la descripción del negocio, destinos activos con sus atracciones, y los itinerarios destacados con enlace directo. Los crawlers de LLMs (ChatGPT, Perplexity, Claude, Gemini) leen este fichero para conocer el sitio sin necesidad de renderizar HTML.
- **Contenido dinámico:** Lee en tiempo real de `getCountriesOrdered()`, `getDestinationsByCountry()` y `getActiveTrips()`. No requiere mantenimiento manual.

### Instagram widget (LightWidget)

- **Estado:** Activo desde 03/06/2026. `InstagramBanner.tsx` carga el script de LightWidget con `<Script strategy="afterInteractive">` (no bloquea LCP) y renderiza el feed real en un `<iframe>` con `minHeight: 300px` para reservar espacio y evitar CLS.
- **Patrón reutilizable para widgets de terceros** (aplicable al futuro widget de Google Reviews — M38):
  ```tsx
  <Script src="https://cdn.proveedor.com/widget.js" strategy="afterInteractive" />
  <iframe src="..." scrolling="no" className="..." style={{ width: '100%', border: 0, overflow: 'hidden', minHeight: '300px' }} />
  ```
  No usar `allowTransparency` (atributo legacy — React lo rechaza).

### Web App Manifest

- **Ruta:** `/manifest.webmanifest` — `app/manifest.ts` (Metadata Route de Next.js)
- **Descripción dinámica:** la lista de países se genera desde `getCountriesOrdered()` — al añadir un país a `countries.ts` el manifest se actualiza solo (mismo principio que `llms.txt`; ver D20 en DECISIONS.md).
- **Iconos:** `public/images/icons/icon-192.png` e `icon-512.png` (manifest) + `public/apple-touch-icon.png` (180×180, **debe estar en la raíz de public/** — iOS lo busca en `/apple-touch-icon.png`). `theme_color: #5ea6ae` (vidaia-primary, validado por diseño).

### Security headers

- **Dónde:** `headers()` en `next.config.ts`, aplicados a todas las rutas.
- **Headers:** `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy` (cámara/micro/geo deshabilitados).
- **Sin CSP** (ver D18 en DECISIONS.md). HSTS lo añade Vercel automáticamente.

---

## Despliegue y CI/CD

### Estrategia de ramas

- **`develop`** — rama de integración. Todo el desarrollo se commitea/pushea aquí. Es la rama por defecto del repo.
- **`main`** — rama de producción. Solo se actualiza vía Pull Request desde `develop`. Está protegida: requiere PR + el check de CI en verde para mergear.

```
push a develop  →  CI (lint + build)  +  Vercel Preview (URL staging)
       │
PR develop → main  →  re-corre CI (gate; bloquea el merge si falla)
       │
   merge a main  →  Vercel Production Deploy
```

### CI — GitHub Actions

- **Fichero:** `.github/workflows/ci.yml`. Job único `validate`.
- **Disparadores:** `push` a `develop` y `pull_request` contra `main`.
- **Pasos:** `npm ci` → `npm run lint` → `npm run build` sobre **Node 24** (`actions/setup-node` con caché de npm).
- **No despliega** — el deploy lo gestiona la integración Git de Vercel. El CI es puramente el gate de calidad (y añade el `lint`, que el build de Vercel no ejecuta por sí solo).
- El build de CI corre **sin secrets**: las integraciones (Resend, Clientify, GA4) guardan ante env ausente, así que no son necesarias para que el build pase.

### Vercel

- **Production Branch:** `main` → cada merge despliega a producción.
- **Previews:** cada push a `develop` (y cualquier rama/PR) genera un Preview Deployment con URL propia. Comparten las variables de entorno de producción (`RESEND_API_KEY`, `VV_CLIENTIFY_API_TOKEN`, GA4) marcadas en scope Preview — por tanto, **los formularios de prueba en una preview crean contactos reales en Clientify y envían emails reales**.
- **Node.js Version:** 24.x, alineada con `.nvmrc` y el CI.

### Node version

`.nvmrc` fija Node **24** para alinear local / CI / Vercel. Al cambiar de versión, actualizar los tres puntos a la vez (`.nvmrc`, `node-version` en el workflow, y el panel de Vercel).

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

7. **No hardcodear el dominio.** Toda URL absoluta importa `BASE_URL` de `lib/config/site.ts`. El dominio canónico es `viajesvidaia.com` (no-www). Los enlaces internos en contenido (markdown de posts) son rutas relativas.

8. **Toda página usa `buildMetadata()`** de `lib/helpers/seo.ts` en su `generateMetadata` — nunca construir el objeto Metadata a mano. Es el único punto que garantiza canonical, hreflang y OG consistentes.

9. **Contenido generado que enumere países/destinos/viajes se deriva de los servicios** (`getCountriesOrdered()`, etc.), nunca se hardcodea — aplica a manifest, llms.txt y schemas (ver D20).
