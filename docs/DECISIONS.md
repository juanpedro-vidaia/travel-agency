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

## D09 — `middleware.ts` redirige automáticamente a `/es` si no hay idioma en la URL

**Fecha aproximada:** Commit `eace0a7`

**Decisión:** El middleware intercepta todas las peticiones sin prefijo de idioma y redirige a `/${DEFAULT_LANGUAGE}${pathname}`.

**Consecuencias:**
- La URL raíz `/` siempre redirige a `/es`
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
