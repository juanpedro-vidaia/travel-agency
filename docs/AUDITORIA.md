# Auditoría del Proyecto — Viajes Vidaia

> Generado: 15 de mayo de 2026

---

## 1. Código muerto

### 1.1 `lib/supabase.ts` — cliente nunca importado

El fichero crea un cliente Supabase y define un tipo `DestinationRow`, pero **ningún otro fichero lo importa**. Es código de una versión anterior antes de migrar a datos estáticos en `lib/data/*.ts`.

```
lib/supabase.ts — instala y exporta `supabase`, no referenciado en ningún sitio
```

**Acción:** eliminar el fichero y las variables de entorno `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` si no se planea usar Supabase.

---

### 1.2 `STATIC_CONTENT.en` — bloque incompleto y no activado

El bloque `en` de `staticContent.ts` (línea 885) solo contiene `privacyPage`, `cookiesPage` y `legalNoticePage`. Faltan traducciones para todas las demás secciones (`home`, `viajes`, `destinationsSection`, `honeymoonPage`, `formularioPersonalizado`, etc.). Como el idioma inglés está desactivado en `languages.config.ts`, este bloque no genera errores en runtime pero sí confunde — sugiere que el inglés está "casi listo" cuando en realidad apenas tiene el 20% del contenido traducido.

---

### 1.3 `ValueProposition.tsx` — contenido hardcodeado en el componente (no en `staticContent`)

El array `valuePropositionItems` (líneas 6-34) define los títulos y descripciones de las 4 tarjetas directamente en el componente. Usa `useLanguage()` solo para leer `sectionContent.header`, pero el contenido real de las cards no pasa por `staticContent`.

---

### 1.4 `Hero.tsx` — `regionContent` hardcodeado en el componente

El objeto `regionContent` (líneas 11-17) define los países y sus flags directamente en el componente, no en `staticContent`. Duplica información de `lib/data/countries.ts`.

---

### 1.5 `InstagramBanner.tsx` — array `photos` hardcodeado + widget placeholder

El array `photos` de 6 entradas (líneas 12-19) está hardcodeado en el componente. También hay un comentario con un div de Elfsight placeholder (`elfsight-app-XXXXXX`, línea 55) que nunca se activa.

---

## 2. Hardcodes pendientes

Strings literales en JSX/TSX que deberían estar en `staticContent.ts`:

| Archivo | Línea | String hardcodeado | Clave sugerida |
|---|---|---|---|
| `app/[lang]/blog/[slug]/PostContent.tsx` | 65 | `"Volver al blog"` | `blogPage.backButton` |
| `app/[lang]/blog/[slug]/PostContent.tsx` | 94 | `"min de lectura"` | `blogPage.readingTime` |
| `app/[lang]/blog/page.tsx` | 88 | `"min de lectura"` | `blogPage.readingTime` |
| `app/[lang]/blog/page.tsx` | 165 | `"min"` | `COMMON_UI.labels.minutes` (ya existe) |
| `components/sections/ValueProposition.tsx` | 6-34 | Títulos y descripciones de las 4 cards | `valueProposition.items[].title/description` |
| `components/sections/Hero.tsx` | 11-17 | Nombres de países en el tagline | Derivar de `countries.ts` |

**Nota:** `blog/page.tsx:165` debería usar `ui.labels.minutes` que ya existe en `COMMON_UI` en lugar de hardcodear `"min"`.

---

## 3. Consistencia de patrones

### 3.1 Patrón correcto — la mayoría de páginas

La mayoría de páginas Server Component siguen el patrón correcto:

```typescript
const content = getStaticContent(lang)
const ui = getCommonUI(lang)
```

Páginas que lo hacen correctamente: `viajes/page.tsx`, `destinos/[slug]/page.tsx`, `lunas-de-miel/page.tsx`, `privacidad/page.tsx`, `cookies/page.tsx`, `aviso-legal/page.tsx`.

### 3.2 Inconsistencia — `app/[lang]/page.tsx` (Home)

La home usa `getStaticContent(lang)` para `destinationsSection` pero **no usa `getCommonUI`**. Los componentes hijos como `Hero`, `CTASection`, `ValueProposition` acceden al contexto mediante `useLanguage()`. Esta mezcla es intencionada por la arquitectura de `LanguageContext`, pero merece documentarse.

### 3.3 Inconsistencia — acceso a `getAsset` desde Client Components

Algunos Client Components llaman a `getAsset()` directamente (sin que el dato llegue por props desde el Server Component padre):
- `Hero.tsx` — `getAsset('HOME.HERO_BG')`, `getAsset(region.flagKey)`
- `CTASection.tsx` — `getAsset('CTA_SECTION_BG')`
- `QuienesSomos.tsx` — `getAsset('TEAM.LANDSCAPE_PHOTO')`, `getAsset(person.imageKey)`
- `BlogSection.tsx` — `getAsset(post.imageKey)`

Esto funciona porque `getAsset` es una función pura que lee un objeto estático, pero crea una dependencia directa en el bundle del cliente. El patrón ideal sería pasar la URL como prop desde el Server Component padre.

### 3.4 `blog/[slug]/PostContent.tsx` — usa `getAsset` directamente en Client Component de 222 líneas

Accede a assets directamente y tiene hardcodes de i18n (ver sección 2). Inconsistente con la tendencia del resto del proyecto.

---

## 4. Interfaces comentadas con Clientify

### Inventario completo

| Archivo | Tipo | Estado | Impacto |
|---|---|---|---|
| `lib/services/clientify.ts` | Servicio CRM completo | Parcialmente activo (función `pushToClientify` existe pero la llamada HTTP está comentada) | Bloquea la captura de leads en el CRM |
| `app/api/forms/contacto/route.ts` (líneas 29-44) | Envío a Clientify y Resend comentados | Comentado | Los formularios de contacto llegan solo al `console.log` |
| `app/api/forms/newsletter/route.ts` (líneas 22-42) | Suscripción a Clientify y Resend comentados | Comentado | Las suscripciones al newsletter no se almacenan |
| `app/api/forms/presupuesto/route.ts` (líneas 23-64) | Envío por Resend y push a Clientify comentados | Comentado | Las solicitudes de presupuesto llegan solo al `console.log` |

### Estado funcional actual

Los tres formularios (`contacto`, `newsletter`, `presupuesto`) **aceptan datos** y devuelven `{ ok: true }`, pero **no envían emails ni registran leads** — solo escriben en `console.log` del servidor. El impacto es que cualquier formulario enviado en producción se pierde silenciosamente para el equipo comercial.

### URLs activas de Clientify (no comentadas)

La URL de reuniones de Clientify sí está activa en dos sitios:
- `app/[lang]/lunas-de-miel/page.tsx` (líneas 65 y 229): `href="https://reuniones.clientify.com/#/viajesvidaia/hablemos30min?v2=true"`
- `components/ui/ContactFAB.tsx` (línea 8): `MEETING_URL = 'https://reuniones.clientify.com/...'`

### Variables de entorno necesarias para activar

- `CLIENTIFY_API_KEY` — para `pushToClientify` en los tres routes
- `RESEND_API_KEY` — para envío de emails de notificación

---

## 5. TypeScript

### 5.1 `any` explícitos e implícitos

No se han encontrado usos de `any` explícitos en el código de producción. El proyecto tiene buena tipificación general.

### 5.2 Aserciones no-null potencialmente problemáticas

`lib/supabase.ts` usa `!` en variables de entorno:
```typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
```
Si estas variables no están definidas, la app falla en runtime sin mensaje de error claro. (Como el fichero no se importa, actualmente es inofensivo.)

### 5.3 Tipos implícitos en `Hero.tsx`

```typescript
{heroContent.title.split('{br}').map((part: string, index: number) => (
```
La anotación `part: string` en el callback de `.map()` es redundante cuando TypeScript puede inferirla, pero no es incorrecta.

### 5.4 Pre-existing TS errors (no relacionados con este proyecto)

El proyecto tiene errores de TypeScript preexistentes relacionados con packages que están en `package.json` pero cuyas definiciones de tipos tenían problemas en la versión instalada:
- `@hookform/resolvers/zod`
- `zod` (versión 4.x con algunos cambios de API)
Estos errores no fueron introducidos por el desarrollo reciente. El build de Next.js puede funcionar con estos errores presentes, ya que no afectan al código de la app directamente.

---

## 6. Componentes grandes

| Componente | Líneas | Problema | Propuesta de división |
|---|---|---|---|
| `app/[lang]/itinerarios/[slug]/ItineraryContent.tsx` | 687 | Hace demasiado: hero carousel, acordeón de días, mapa, hoteles, opcionales, viajes relacionados | Separar en: `ItineraryHero.tsx`, `ItineraryDayAccordion.tsx`, `ItineraryHotels.tsx`, `ItineraryRelated.tsx` |
| `lib/data/staticContent.ts` | 1335 | No es un componente pero es el fichero más grande | Podría dividirse por sección: `staticContent.legal.ts`, `staticContent.pages.ts`, `staticContent.forms.ts` |
| `components/sections/ViajesBuscador.tsx` | 351 | Mezcla lógica de filtrado, estado y rendering de grids | Separar en: `TripSearchFilters.tsx` (estado y filtros) + `TripSearchResults.tsx` (rendering del grid) |
| `components/forms/FormularioPersonalizado.tsx` | 278 | Orquesta 3 pasos con estado complejo | Ya parcialmente dividido en `Paso1`, `Paso2`, `Paso3` — el fichero principal es el controlador de estado |
| `app/[lang]/lunas-de-miel/page.tsx` | 248 | Server Component con mucho JSX inline | Extraer secciones como `HoneymoonIdeas.tsx`, `HoneymoonHowWeDesign.tsx` |

---

## 7. Performance

### 7.1 `og-default.jpg` referenciado pero no existente

`lib/helpers/seo.ts` (línea 4) referencia `https://www.viajesvidaia.com/images/og-default.jpg` como imagen OG por defecto. Este archivo **no existe en `public/images/`** (la carpeta solo contiene `logo/`). Esto afecta al SEO en todas las páginas que no especifican `ogImage`.

### 7.2 Client Components innecesariamente pesados

La arquitectura actual usa `LanguageContext` + `useLanguage()` en casi todos los componentes de sección, lo que los convierte en Client Components. Esto incluye componentes que no tienen interactividad real:

- `ValueProposition.tsx` — solo renderiza datos estáticos
- `BlogSection.tsx` — solo renderiza posts estáticos
- `TestimonialsSection.tsx` — solo renderiza testimonios estáticos
- `InstagramBanner.tsx` — solo renderiza fotos estáticas

Estos podrían ser Server Components si el `lang` se pasara como prop desde la página, eliminando la dependencia de `useLanguage()`.

### 7.3 `dynamic` import correcto para el mapa

`ItineraryContent.tsx` usa `dynamic(() => import('@/components/ui/ItineraryMap'), { ssr: false })` — correcto para Leaflet que requiere acceso a `window`.

### 7.4 Imágenes con `sizes` correcto

La mayoría de imágenes con `fill` tienen `sizes` correctamente configurados. No se detectan casos críticos faltantes.

### 7.5 Dependencias no utilizadas en `package.json`

- `@supabase/supabase-js` — instalado pero el cliente (`lib/supabase.ts`) no se importa en ningún componente activo. Se puede eliminar si no se planea usar Supabase.

---

## 8. Accesibilidad

### 8.1 Botones de compartir sin `aria-label` en `PostContent.tsx`

Los tres botones de compartir (Twitter, Facebook, copiar enlace) en `app/[lang]/blog/[slug]/PostContent.tsx` solo muestran un icono sin texto accesible. Deben tener `aria-label`:

```tsx
<button onClick={shareOnTwitter}>
  <Twitter className="w-4 h-4" />  {/* Sin aria-label */}
</button>
```

### 8.2 Imágenes de equipo con alt genérico

`QuienesSomos.tsx` usa `person.name` como `alt` para las fotos del equipo (ej. `alt="Lau"`). Debería ser descriptivo: `alt="Lau, Fundadora de Viajes Vidaia"`.

### 8.3 Foto en `ItineraryContent.tsx`

`app/[lang]/itinerarios/[slug]/ItineraryContent.tsx` (línea 607) usa `related.content.es.title` como `alt` para las imágenes de viajes relacionados. Si el usuario navega en otro idioma, el alt siempre será en español.

### 8.4 Input de búsqueda en `ViajesBuscador.tsx`

El `SearchBar` tiene un `placeholder` pero hay que verificar que el `<input>` tenga `aria-label` o `<label>` asociado correctamente.

---

## 9. SEO

### 9.1 `og-default.jpg` no existe

Ya mencionado en Performance. Afecta directamente a Open Graph en todas las páginas que no proveen imagen propia (home, lunas de miel, blog, legal pages).

### 9.2 Home — `generateMetadata` con título y descripción hardcodeados

`app/[lang]/page.tsx` (líneas 21-29) tiene el título y descripción hardcodeados en lugar de usar `getStaticContent(lang)`. Inconsistente con el resto de páginas.

### 9.3 Páginas de blog sin `generateMetadata` propio contextual

`app/[lang]/blog/page.tsx` no tiene `generateMetadata` exportado — hereda el metadata del layout raíz. Debería tener título y descripción específicos para el blog.

### 9.4 Structured data solo en el layout raíz

Solo hay un JSON-LD de tipo `TravelAgency` en `app/layout.tsx`. Sería recomendable añadir JSON-LD de tipo `TouristAttraction` o `Product` en páginas de itinerarios, y `Article` en posts de blog.

### 9.5 `hreflang` apunta siempre a `/es`

En `lib/helpers/seo.ts` (líneas 27-31), el bloque de `languages` para alternates siempre construye la URL con `/es`, incluso si se activa el inglés en el futuro. Habrá que actualizarlo cuando se habilite `en`.

---

## 10. Variables de entorno

### Variables actualmente usadas en código

| Variable | Archivo | Estado | Notas |
|---|---|---|---|
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | `components/scripts/GoogleAnalytics.tsx:8` | **Activa** | Pública; si no está definida, GA4 simplemente no carga |
| `NEXT_PUBLIC_SUPABASE_URL` | `lib/supabase.ts:3` | Inactiva (fichero no importado) | Puede eliminarse con el fichero |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `lib/supabase.ts:4` | Inactiva (fichero no importado) | Puede eliminarse con el fichero |
| `RESEND_API_KEY` | `app/api/forms/*/route.ts` | **Pendiente** (código comentado) | Necesaria para envío de emails |
| `CLIENTIFY_API_KEY` | `app/api/forms/*/route.ts` + `lib/services/clientify.ts` | **Pendiente** (código comentado) | Necesaria para integración CRM |
| `NODE_ENV` | `lib/data/assets.ts:150` | Inyectada por Next.js | Controla el warning de getAsset |

### Estado de documentación

No existe fichero `.env.example` ni `.env.local.example` en el repositorio. Las variables de entorno no están documentadas en ningún fichero de texto. Recomendación: crear `.env.example`.

### Claves sensibles hardcodeadas

No se han encontrado claves sensibles (API keys, tokens, passwords) hardcodeadas directamente en el código. Correcto.

---

## Resumen ejecutivo

| Categoría | Issues encontrados | Severidad |
|---|---|---|
| Código muerto | 5 | Media |
| Hardcodes pendientes | 6 | Baja-Media |
| Consistencia de patrones | 4 | Baja |
| Interfaces Clientify comentadas | 4 ficheros afectados | **Alta** (pérdida de leads) |
| TypeScript | 2 (menores) | Baja |
| Componentes grandes | 5 | Baja-Media |
| Performance | 5 | Media |
| Accesibilidad | 4 | Media |
| SEO | 5 | Media-Alta |
| Variables de entorno | 3 | Media |
| **TOTAL** | **43 issues** | |

> El issue más crítico en términos de impacto en negocio es la **pérdida de leads**: los formularios funcionan pero no envían datos a ningún destino útil (ni email ni CRM). Activar Resend + Clientify debería ser la prioridad #1.
