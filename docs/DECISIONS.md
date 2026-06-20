# Decisiones técnicas — Viajes Vidaia

> Registro de decisiones de arquitectura y diseño inferidas del código y el historial de git.

---

## D01 — Datos estáticos en TypeScript en lugar de base de datos

**Fecha aproximada:** Inicio del proyecto (commit `13f035c` — "versión limpia Vidaia" → `eace0a7` — "Refactorización de paises y destinos")

**Decisión:** Todos los datos de contenido (países, destinos, viajes, itinerarios, posts, testimonios, hoteles, actividades) se almacenan como arrays de objetos en ficheros `.ts` dentro de `lib/data/`.

**Alternativas consideradas:**
- Base de datos PostgreSQL/Supabase (el cliente Supabase estaba instalado y se eliminó en un refactor)
- CMS headless (Contentful, Sanity, Strapi)
- Markdown files con frontmatter (solo para blog)

**Razonamiento:**
- Cero latencia de datos: todo se compila en build time (SSG)
- Tipado completo: TypeScript garantiza la consistencia del schema
- Sin costes de infraestructura de BBDD
- El equipo es pequeño (2 personas) y el volumen de contenido es manejable
- Los itinerarios tienen estructura compleja (días, hoteles, actividades anidados) — más fácil modelar en TS que en un CMS genérico

**Consecuencias:**
- Añadir contenido requiere editar código y hacer redeploy
- No hay panel de administración para el contenido
- Escala bien para el tamaño actual (~10 viajes, ~8 posts, 4 países)

---

## D02 — Next.js App Router (SSG) como framework

**Fecha aproximada:** Inicio del proyecto

**Decisión:** Next.js 15+ con App Router. Todas las páginas de contenido se generan estáticamente (`generateStaticParams`).

**Alternativas consideradas:**
- Astro (mejor para SSG puro, pero sin experiencia del equipo)
- Remix (SSR first, menos natural para contenido estático)
- Next.js Pages Router (obsoleto en versiones nuevas)

**Razonamiento:**
- Experiencia previa del equipo con Next.js
- App Router permite Server Components, reduciendo el JS enviado al cliente
- SSG ideal para SEO de una agencia de viajes (velocidad, crawlabilidad)
- `generateStaticParams` permite pre-renderizar todos los slugs en build time

**Consecuencias:**
- Páginas extremadamente rápidas (archivos HTML estáticos)
- Redeploy necesario para cualquier cambio de contenido
- Bundle del cliente relativamente grande por el número de Client Components

---

## D03 — Sistema de i18n propio sin librería externa

**Fecha aproximada:** Commit `c0bc1ba` — "Multilanguage Refactor"

**Decisión:** i18n implementado con:
- `[lang]` como segmento dinámico de URL
- `STATIC_CONTENT` y `COMMON_UI` como diccionarios en `staticContent.ts`
- `LanguageContext` para acceso en Client Components
- `getStaticContent(lang)` para Server Components

**Alternativas consideradas:**
- `next-intl` (librería popular para Next.js)
- `i18next` + `react-i18next`
- `next-translate`

**Razonamiento:**
- El volumen de traducciones es manejable sin librería externa
- Evitar una dependencia más
- TypeScript garantiza que todas las claves existen en ambos idiomas (el tipo se infiere de `es`, que es el completo)
- Control total sobre la estructura del diccionario

**Consecuencias:**
- Sin herramientas especializadas de gestión de traducciones
- El bloque `en` en `staticContent.ts` está incompleto (solo páginas legales)
- Si se activa inglés, hay que completar ~1000 líneas de traducciones manualmente

---

## D04 — `LanguageContext` para evitar prop drilling del idioma

**Fecha aproximada:** Commit `c0bc1ba` — "Multilanguage Refactor"

**Decisión:** Crear `LanguageContext` + `useLanguage()` hook para que los Client Components accedan al contenido y al idioma sin recibir props desde las páginas.

**Alternativas consideradas:**
- Pasar `lang` como prop en cascada desde cada página
- Usar `useParams()` en cada Client Component para leer el segmento `[lang]`
- Hacer todos los componentes Server Components con `lang` como prop

**Razonamiento:**
- Los componentes globales (Header, Footer, CTASection, BlogSection) se renderizan desde el layout raíz sin acceso directo a los params de la página
- Evitar pasar `lang` y `content` como props a cada componente del árbol
- `useParams()` requiere que el componente sea Client Component de todas formas

**Consecuencias:**
- Muchos componentes que solo necesitan leer texto estático son Client Components innecesariamente
- El bundle del cliente es mayor de lo necesario
- Patrón consistente y fácil de entender para el equipo

---

## D05 — `STATIC_CONTENT` plano por sección (no por tipo de contenido)

**Fecha aproximada:** Commit `ab7bee2` — "Refactoring static content data"

**Decisión:** Organizar `staticContent.ts` agrupando por página/sección (ej. `viajesPage.buscador.headerPill`) en lugar de por tipo de contenido (ej. `buttons.searchPlaceholder`).

**Alternativas consideradas:**
- Estructura por tipo: `buttons.*`, `labels.*`, `errors.*`, `headings.*`
- Ficheros separados por idioma: `content.es.ts`, `content.en.ts`
- Ficheros separados por página: `home.content.ts`, `viajes.content.ts`

**Razonamiento:**
- Más fácil encontrar un texto cuando se conoce la página donde aparece
- Refleja la estructura visual del sitio
- Facilita la refactorización de una sección completa
- Los strings compartidos van en `COMMON_UI`

**Consecuencias:**
- Algunos strings que podrían ser idénticos en varias páginas se duplican
- El fichero `staticContent.ts` tiene 1335 líneas (largo pero manejable con búsqueda)
- Añadir una nueva página requiere añadir una nueva sección al objeto

---

## D06 — `getAsset()` con registro centralizado de imágenes

**Fecha aproximada:** Commit `eace0a7` — "Refactorización de paises y destinos. Banderas..."

**Decisión:** Todas las URLs de imágenes y sus `alt` se centralizan en `lib/data/assets.ts`. Los componentes nunca hardcodean URLs.

**Alternativas consideradas:**
- Guardar las URLs directamente en los datos (`countries.ts`, `trips.ts`, etc.)
- Sistema de carpetas en `public/` con convención de nombres
- CMS de assets (Cloudinary con API)

**Razonamiento:**
- Punto único de cambio para actualizar una imagen
- El `alt` siempre va junto a la URL (no puede olvidarse)
- TypeScript garantiza que la key existe (`AssetKey` type)
- Fallback explícito con warning en desarrollo si la key no existe
- Permite mezclar Cloudinary, Unsplash y assets locales con la misma API

**Consecuencias:**
- Hay que añadir la key en dos sitios (donde se usa la imagen y en `assets.ts`)
- El fichero `assets.ts` crece con el proyecto (~150 líneas ya)
- Separación clara entre "qué imagen mostrar" (key en datos) y "de dónde viene" (assets.ts)

---

## D07 — Formularios con `react-hook-form` + Zod en el frontend

**Fecha aproximada:** Commit `8c9fdbc` — "Refactoring Formulario"

**Decisión:** Usar `react-hook-form` para gestión de formularios y `zod` para validación de schema, tanto en el frontend como en el backend (API Routes).

**Alternativas consideradas:**
- Formularios controlados con `useState` manual
- `formik`
- Validación manual sin librería

**Razonamiento:**
- Performance: `react-hook-form` es non-controlled, evita re-renders en cada keystroke
- El schema Zod (`lib/form-utils.ts`) se comparte entre frontend y backend, garantizando consistencia
- `safeParse` del backend valida antes de procesar los datos

**Consecuencias:**
- Dos dependencias más (`react-hook-form`, `zod`)
- El formulario multi-step (`FormularioPersonalizado`) usa `trigger()` de react-hook-form para validar paso a paso

---

## D08 — `generateStaticParams` para pre-generar todas las rutas dinámicas

**Fecha aproximada:** Commit `eace0a7` — "Refactorización de paises y destinos. Banderas. Sitemap.xml automatico..."

**Decisión:** Usar `generateStaticParams` en todas las rutas dinámicas (`[lang]`, `[slug]`) para que Next.js pre-genere todos los paths en build time.

**Razonamiento:**
- Build completamente estático: sin SSR, sin cold starts
- Ideal para hosting en Vercel con Edge CDN
- Los slugs de países, itinerarios y posts son conocidos en build time

**Consecuencias:**
- Redeploy necesario al añadir nuevos países, itinerarios o posts
- Build time aumenta linealmente con el número de páginas

---

## D09 — `proxy.ts` (antes `middleware.ts`) redirige automáticamente a `/es` si no hay idioma en la URL

**Fecha aproximada:** Commit `eace0a7` — Actualizado 11/06/2026

**Decisión:** El proxy intercepta todas las peticiones sin prefijo de idioma y redirige a `/${DEFAULT_LANGUAGE}${pathname}`.

**Nota de migración (11/06/2026):** En Next.js 16 `middleware.ts` está deprecado; en un refactor el fichero se renombró a `proxy.ts` con export `proxy()`. La funcionalidad es idéntica. En el output del build aparece como `ƒ Proxy (Middleware)`. La auditoría SEO del 03/06/2026 no lo encontró por buscar el nombre antiguo (ver M31 en MEJORAS.md) — tener en cuenta el nombre nuevo en futuras revisiones.

**Consecuencias:**
- La URL raíz `/` siempre redirige a `/es` (307)
- Cualquier ruta sin idioma redirige conservando el path: `/viajes` → `/es/viajes`
- El matcher excluye `_next`, `api`, favicon y ficheros con extensión
- Compatible con la estructura `[lang]` sin configuración adicional

---

## D10 — Client Components innecesariamente pesados por `LanguageContext`

**Fecha aproximada:** Inherente a la decisión D04

**Decisión implícita:** Aceptar que componentes como `ValueProposition`, `BlogSection`, `TestimonialsSection`, `CTASection` sean Client Components aunque no tengan interactividad, porque dependen de `useLanguage()`.

**Consecuencias aceptadas:**
- Mayor bundle del cliente
- No se pueden usar React Server Component features (streaming, suspense) en estas secciones

**Nota:** Esta decisión podría revisarse en el futuro pasando `content` como prop desde las páginas, convirtiendo estos componentes en Server Components.

---

## D11 — Clientify y Resend preparados pero no activados

**Fecha aproximada:** Commit `b033876` — "Reorganizing forms and components"

**Decisión:** El código de integración con Clientify CRM y Resend está escrito y comentado en los API Routes, a la espera de las API keys y la configuración del DNS del dominio.

**Razonamiento:**
- Preparar la infraestructura técnica antes de tener las credenciales
- Los `void` references evitan errores de TypeScript por imports no usados
- Comentarios `// TODO: Activate when X_API_KEY is configured` documentan qué falta

**Consecuencias:**
- Los formularios aceptan datos y responden `{ ok: true }` pero no los envían a ningún destino útil
- Riesgo de pérdida de leads en producción si no se activan pronto

---

## D13 — `lib/schema/` con builders tipados para structured data

**Fecha:** 2026-05-28

**Decisión:** Toda la generación de JSON-LD se centraliza en `lib/schema/`, un directorio de funciones puras que reciben datos tipados y devuelven objetos schema.org. Se usa un helper `buildPageSchema(...schemas)` que combina varios schemas en un único `@graph`.

**Alternativas consideradas:**
- Objetos inline en cada página (era el estado anterior)
- Un único fichero `schemas.ts` con todas las funciones
- Librería externa como `schema-dts` para tipado schema.org

**Razonamiento:**
- Un builder por tipo de schema = fácil de encontrar, testear y modificar de forma aislada
- El patrón `@graph` es la recomendación actual de Google para múltiples schemas en una página — evita que cada `<script>` sea independiente
- Elimina duplicación: `buildFaqJsonLd` estaba en `contentHelpers.ts` (lugar incorrecto) y duplicado conceptualmente en cada página
- Tipado estricto: los builders reciben `Country`, `Trip`, `ResolvedDay[]` etc. — TypeScript garantiza que los schemas reflejan el estado real de los datos
- Los builders solo dependen de los tipos de `lib/data/` y `lib/services/` — sin acoplamiento con componentes React

**Consecuencias:**
- Añadir un schema nuevo requiere crear un fichero en `lib/schema/` y re-exportarlo en `index.ts`
- `buildPageSchema` siempre genera un `@graph` (aunque haya un solo schema) — consistencia sobre brevedad
- `buildTouristTripSchema` genera `subTrip` con un nodo por día de itinerario, lo que puede producir payloads grandes para itinerarios de 20+ días

---

## D14 — `llms.txt` dinámico para visibilidad en IAs

**Fecha:** 2026-05-28

**Decisión:** Crear una ruta `GET /llms.txt` en `app/llms.txt/route.ts` que genera un fichero de texto plano en formato [llms.txt spec](https://llmstxt.org/) con destinos e itinerarios reales.

**Alternativas consideradas:**
- Fichero estático `public/llms.txt` mantenido a mano
- Sin fichero (dejar que los crawlers de IA usen el sitemap.xml)

**Razonamiento:**
- Los crawlers de LLMs (ChatGPT, Perplexity, Claude, Gemini) consumen `llms.txt` para indexar el contexto de un sitio sin renderizar JS
- Una ruta dinámica se actualiza automáticamente cuando se añaden países, destinos o itinerarios — sin mantenimiento manual
- El formato es simple (texto plano con Markdown) y no requiere librería externa
- Complementa el sitemap.xml (descubrimiento de URLs) con contexto semántico (qué hace el sitio, en qué destaca)

**Consecuencias:**
- La ruta es sincrónica (`GET` sin `async`) porque todos los datos vienen de módulos estáticos
- El contenido cambia con cada redeploy al añadir contenido nuevo — comportamiento deseado
- No es indexado por Google (que usa sitemap.xml) pero sí por IAs que buscan `llms.txt` en el dominio raíz

---

## D16 — Server Component como único punto de acceso a datos en páginas pesadas

**Fecha:** 2026-05-29

**Decisión:** En páginas cuyo contenido principal es un Client Component complejo (como la página de itinerario), el Server Component (`page.tsx`) pre-computa TODOS los datos necesarios y los pasa como props serializables. Los Client Components no importan ningún servicio ni fichero de datos.

**Problema previo:** `ItineraryContent` y sus cinco sub-componentes (`ItineraryHeroCarousel`, `ItineraryDayAccordion`, `ItineraryHotels`, `ItineraryRelated`, `ItineraryMap`) recibían solo `slug: string` como prop y llamaban a servicios internamente. Webpack incluía en el bundle cliente todos los ficheros de datos importados por esos servicios: `itineraries.ts`, `activities.ts`, `hotels.ts`, `destinations.ts`, `trips.ts` (~244 KB parsed).

**Solución aplicada:**
- `page.tsx` centraliza todas las llamadas a servicios y construye lookup maps (`destinationNames`, `destCoords`)
- `ItineraryContent` recibe datos resueltos como props tipadas
- Sub-componentes reciben exactamente los datos que necesitan (no el slug)
- `TAG_CONFIG` se extrajo a `lib/data/tagConfig.ts` para que los Client Components lo importen sin arrastrar el array de viajes

**Alternativas consideradas:**
- React Context para compartir datos entre Client Components — añade complejidad y no elimina los datos del bundle
- Convertir los Client Components a Server Components — imposible; necesitan estado/efectos (carousel, accordion, mapa)

**Consecuencias:**
- El Server Component `page.tsx` crece en responsabilidad (centraliza más lógica de datos)
- Al añadir un nuevo dato a algún sub-componente, hay que añadirlo en tres sitios: cómputo en page.tsx, prop en ItineraryContent, prop en el sub-componente
- Los Client Components son más testables (reciben datos, no los buscan)
- `itineraries.ts`, `activities.ts`, `hotels.ts`, `destinations.ts` ya NO aparecen en el bundle cliente

---

## D15 — `JsonLd` usa `next/script` con `id` para evitar duplicación RSC

> ⚠️ REVERTIDA 11/06/2026 por **D22** — `next/script` con `afterInteractive` inyectaba el JSON-LD **solo en cliente**: el HTML estático no contenía ningún `<script type="application/ld+json">`, haciendo los schemas invisibles para crawlers que no ejecutan JS (GPTBot, PerplexityBot, ClaudeBot). El problema de duplicación que motivó esta decisión NO se reproduce en Next.js 16 con build de producción (verificado empíricamente con Chrome headless). Ver D22.

**Fecha:** 2026-05-28

**Decisión:** El componente `components/scripts/JsonLd.tsx` usa `<Script id={id}>` de `next/script` en lugar de un `<script dangerouslySetInnerHTML>` nativo. Todos los callers deben pasar un `id` estable y único por ruta.

**Problema que resolvía:** validadores que ejecutan JavaScript encontraban cada schema dos veces (re-inyección RSC en versiones anteriores de Next).

**Consecuencias (vigentes tras D22):**
- El prop `id` es obligatorio en `JsonLd` — TypeScript lo fuerza
- El schema de Organization NO debe incluirse en los `buildPageSchema` de las páginas — solo se emite desde `layout.tsx` (ahora con `id="ld-site"`, junto a WebSite)

---

## D22 — JSON-LD server-rendered con `<script>` nativo + Organization/WebSite en un solo @graph

**Fecha:** 2026-06-11

**Decisión:**
1. `JsonLd.tsx` vuelve a `<script type="application/ld+json" dangerouslySetInnerHTML>` nativo (sin `next/script`) — el patrón que recomienda la documentación oficial de Next.js para JSON-LD.
2. El layout emite Organization (TravelAgency) y WebSite juntos en **un único `@graph`** (`<JsonLd id="ld-site">` vía `buildPageSchema`), en lugar de dos scripts separados.

**Contexto que lo destapó:** Al validar la preview en validator.schema.org, TravelAgency "desaparecía" del listado de primer nivel. Investigación: (a) el validador lo anidaba bajo `WebSite → publisher` por la referencia `@id` — solo presentación, los datos estaban; (b) hallazgo colateral grave: con `next/script` afterInteractive el JSON-LD solo existía tras hidratación — `curl` del HTML estático devolvía **cero** schemas. Toda la inversión GEO era invisible para crawlers sin JS.

**Verificación empírica (build de producción, Chrome headless `--dump-dom`):**
- HTML estático (curl, sin JS): schemas presentes como `<script type="application/ld+json">` reales
- DOM tras hidratación: exactamente 2 scripts por página (`ld-site` + el de la página), TravelAgency aparece **una sola vez** — la duplicación RSC que motivó D15 no se reproduce en Next.js 16
- Verificado en home e itinerario (TouristTrip ×14 = 1 principal + 13 subTrip días, correcto)

**Consecuencias:**
- Los schemas son visibles para TODOS los crawlers (Google, GPTBot, PerplexityBot, ClaudeBot) sin ejecutar JS
- Si una futura versión de Next reintroduce la duplicación, re-verificar con el mismo método (headless Chrome contra build de producción) antes de revertir
- En el validador, TravelAgency aparece dentro del @graph del `ld-site` junto a WebSite — presentación estándar recomendada por Google (entidades hermanas conectadas por `@id`)

**Addendum (mismo día) — duplicados por hydration mismatch de fechas:**
Tras desplegar el script nativo, el validador mostró TODOS los schemas duplicados en home y blog/[slug] (no en viajes/destinos/itinerarios/lunas-de-miel). Causa raíz: `formatDate` usaba `toLocaleDateString('es-ES', ...)` **sin `timeZone`** — `new Date('YYYY-MM-DD')` es medianoche UTC, y en zonas detrás de UTC (el renderer del validador corre en zona US) la fecha retrocedía un día respecto al HTML pre-renderizado en build. El texto distinto dispara la recuperación de hidratación de React, que re-renderiza el árbol y **duplica los `<script>` nativos** (los `next/script` no se duplicaban gracias a su registro por id — por eso el problema no se vio antes de D22). Las páginas afectadas eran exactamente las que pintan fechas en Client Components: home (BlogSection), blog/[slug] (PostContent) y blog listing (BlogFilters).

**Fix:** `timeZone: 'UTC'` en `formatDate` (lib/services/postsService.ts) — salida determinista en cualquier zona horaria.

**Regla derivada:** cualquier formateo de fecha/hora que se renderice como texto en un Client Component debe fijar `timeZone` explícita. Los hydration mismatches no solo penalizan rendimiento: con scripts JSON-LD nativos, duplican los schemas de cara a los validadores.

---

## D17 — Dominio canónico no-www con constante única en `lib/config/site.ts`

**Fecha:** 2026-06-11

**Decisión:** El dominio canónico del sitio es `https://viajesvidaia.com` (sin www). Existe una única constante `BASE_URL` en `lib/config/site.ts` que importan todos los puntos que construyen URLs absolutas: `seo.ts`, `sitemap.ts`, `robots.ts`, todos los builders de `lib/schema/`, `llms.txt` y las páginas personalizar.

**Alternativas consideradas:**
- `www.viajesvidaia.com` como canónico (era lo que usaba el código) — requería invertir el redirect en el proveedor de dominio
- Mantener constantes locales duplicadas por fichero (estado anterior — provocó la inconsistencia)

**Razonamiento:**
- El hosting ya redirige `www → no-www` (301): elegir no-www significa cero cambios de infraestructura
- Antes de esta decisión, los canonicals/sitemap/schemas apuntaban a `www.`, que redirige — señal SEO confusa (canonical que no es canónico)
- Una constante única elimina la clase de bug por inconsistencia: el blog usaba sin www y el resto con www
- Los enlaces internos en el contenido markdown de `posts.ts` se convirtieron a rutas relativas — inmunes a futuros cambios de dominio

**Consecuencias:**
- El `@id` del Organization schema cambió (`https://viajesvidaia.com/#organization`) — Google regenerará la entidad, esperable
- Cualquier URL absoluta nueva DEBE importar `BASE_URL` de `lib/config/site.ts` — nunca hardcodear el dominio
- Si el dominio cambia algún día, se toca un solo fichero

---

## D18 — Security headers básicos en `next.config.ts`, sin CSP completa

**Fecha:** 2026-06-11

**Decisión:** Añadir vía `headers()` en next.config.ts: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`. NO se añadió Content-Security-Policy.

**Razonamiento:**
- Los cuatro headers elegidos son seguros de activar sin auditoría: no rompen nada del sitio actual
- Una CSP completa requiere inventariar todos los orígenes (GA4, Cloudinary, Unsplash, LightWidget, Clientify, flagcdn) y los inline scripts de Next.js — coste alto y riesgo de romper terceros en producción
- HSTS no se añade porque Vercel lo gestiona automáticamente

**Consecuencias:**
- `X-Frame-Options: SAMEORIGIN` impide embeber el sitio en iframes de terceros (el iframe de LightWidget no se ve afectado: es contenido externo embebido aquí, no al revés)
- La CSP queda como mejora futura si se quiere endurecer más

---

## D19 — Schemas GEO: CollectionPage solo con trips enlazables, sin duración en TouristTrip, sin SearchAction

**Fecha:** 2026-06-11

**Decisión:** Al añadir los schemas de la auditoría GEO (M39–M41) se tomaron tres decisiones de alcance:

1. **`CollectionPage.mainEntity.ItemList` solo incluye trips con `hasItinerary: true`.** Los trips sin itinerario enlazan al formulario genérico `/itinerarios/personalizar` (sin URL propia) — incluirlos generaría N items apuntando a la misma URL, lo que invalida el propósito del ItemList.
2. **No se añade duración a `TouristTrip`.** schema.org `Trip` no tiene propiedad oficial de duración — emitirla provocaría warnings del validador. Los días/noches ya van en el texto.
3. **`WebSite` sin `SearchAction`.** Google exige una URL de búsqueda con parámetro de query; el filtro de `/viajes` es client-side sin URL por término — no cualifica. Añadir si algún día existe `/buscar?q=`.

**Consecuencias:**
- Si un trip pasa a tener itinerario, entra automáticamente en el ItemList (filtro dinámico)
- Patrón reutilizable: `buildCollectionPageSchema(lang, { name, description, path, items })` sirve para cualquier listado futuro

---

## D20 — Contenido derivado de datos, no hardcodeado (manifest, llms.txt, organization)

**Fecha:** 2026-06-11 (generaliza el principio de D14)

**Decisión:** Cualquier texto generado que enumere países/destinos/viajes debe derivarse de los servicios (`getCountriesOrdered()`, etc.), nunca hardcodearse. Aplicado hoy a `app/manifest.ts` (descripción con lista de países dinámica).

**Contexto:** El manifest se creó con "Argentina, Chile y Bolivia" hardcodeado mientras el sitio ya incluía Perú. Mismo patrón que ya cumplían `llms.txt` (D14) y `buildOrganizationSchema` (description y `areaServed` dinámicos).

**Consecuencias:**
- Añadir un país a `countries.ts` actualiza automáticamente manifest, llms.txt y Organization schema
- **Deuda conocida:** siguen hardcodeados con el trío antiguo (sin Perú) las meta descriptions de `app/layout.tsx`, `blog/page.tsx` (×3) y 3 entradas de `staticContent.ts`. Son copy de marketing — pendiente de revisión editorial, no de automatización (decidido 11/06/2026).

---

## D21 — Google Reviews en lugar de schema sobre testimonios estáticos

**Fecha:** 2026-06-11

**Decisión:** No añadir `Review`/`AggregateRating` sobre los testimonios estáticos de `testimonials.ts`. La sección `TestimonialsSection` es temporal y se sustituirá por un widget de Google Reviews (ver M38 en MEJORAS.md).

**Razonamiento:**
- Google penaliza el self-serving review markup: el `aggregateRating` emitido por el propio sitio sobre testimonios no verificables es señal débil y arriesgada
- Las reseñas de Google Business son verificables por terceros y alimentan directamente el Knowledge Panel y los AI Overviews
- Evita invertir en schema sobre una sección que va a desaparecer

**Consecuencias:**
- Bloqueado por negocio: perfil de Google Business con reseñas + elección de proveedor de widget
- Al implementar: eliminar `TestimonialsSection`, `testimonials.ts`, `testimonialsService.ts` y assets `TESTIMONIALS.*`

---

## D12 — Leaflet con `dynamic` import y `ssr: false`

**Fecha aproximada:** Commit `69af0f1` — "Mapa en Itinerario"

**Decisión:** El mapa interactivo de itinerarios usa Leaflet, importado dinámicamente con `{ ssr: false }`.

**Razonamiento:**
- Leaflet accede a `window` y `document` en su inicialización — incompatible con SSR
- `dynamic(() => import('...'), { ssr: false })` garantiza que solo se carga en el browser
- Evita el error `window is not defined` que aparecería en el build SSR

**Consecuencias:**
- El mapa no aparece en el HTML inicial — se hidrata en el cliente
- Ligero flash de layout al cargar el mapa (el espacio ya está reservado con `height` fijo)

---

## D23 — La marca "Viajes Vidaia" en el `<title>` se añade solo vía `title.template`

**Fecha:** 2026-06-20

**Decisión:** Ningún `title`/`metaTitle` almacenado en los datos (`staticContent.ts`, `countries.ts`, `trips.ts`, `itineraries.ts`, `posts.ts`) incluye "Viajes Vidaia". El sufijo de marca lo añade **una sola vez** el `title.template` (`'%s | Viajes Vidaia'`) del root layout (`app/layout.tsx`).

**Contexto:** La auditoría SEO detectó que muchos títulos llevaban "— Viajes Vidaia" o "| Viajes Vidaia" en el propio dato y, al aplicarles el template del root, la marca se renderizaba **dos veces** (p. ej. `Viajes a Argentina — Viajes Vidaia | Viajes Vidaia`), además de salirse del rango de longitud.

**Consecuencias / regla:**
- Al añadir cualquier página/itinerario/post/país, el `title`/`metaTitle` va **sin** marca; el template la pone.
- Los títulos de destino se generan por plantilla (`destinationPage.metaTitleTemplate`), no con un `metaTitle` por país (eliminado de `countries.ts`).
- `buildMetadata` devuelve el `title` como string plano (recibe el template del root); `openGraph.title` usa ese valor base sin marca — tampoco se duplica.

---

## D24 — Indexación restringida al deployment de producción

**Fecha:** 2026-06-20

**Decisión:** Solo el deployment de producción sobre el dominio real `viajesvidaia.com` se indexa. Las preview deployments y la URL `*.vercel.app` no se indexan.

**Implementación (tres piezas, ver M44 en MEJORAS.md):**
1. `app/robots.ts` es env-aware (`process.env.VERCEL_ENV`): fuera de producción devuelve `Disallow: /` (sin sitemap); en producción `allow: /` + `sitemap` + `host`.
2. `proxy.ts`: en `VERCEL_ENV !== 'production'` añade `X-Robots-Tag: noindex, nofollow` a la respuesta (cinturón-y-tirantes con el robots.txt); en producción, si el host entrante es `*.vercel.app`, redirige `308` al host canónico de `BASE_URL`.
3. `app/layout.tsx`: `metadataBase: new URL(BASE_URL)` — fija el origen de canonicals/OG relativos al dominio real (los de `buildMetadata` ya eran absolutos).

**Razonamiento:**
- `VERCEL_ENV` distingue production/preview por deployment sin configuración extra.
- El `308` pliega el alias `*.vercel.app` de producción en el dominio canónico (evita contenido duplicado indexable); `robots.txt` no bloquea esa URL para que el bot pueda leer la redirección.
- Doble señal (robots.txt + `X-Robots-Tag`) cubre crawlers que solo respetan una u otra.

**Verificación:** En local sin `VERCEL_ENV`: `/robots.txt` → `Disallow: /`, `/es` → `X-Robots-Tag: noindex, nofollow`. Con `VERCEL_ENV=production`: `/robots.txt` → `allow` + sitemap + host, `/es` sin `X-Robots-Tag`. El `308` solo se comprueba en el deployment (host `*.vercel.app`).

**Consecuencias:**
- Cualquier ruta nueva hereda el comportamiento (robots global + proxy con matcher que cubre las páginas HTML).
- Si se añade un idioma o subdominio, revisar el matcher del proxy y la lógica de host.
