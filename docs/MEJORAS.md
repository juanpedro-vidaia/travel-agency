# Mejoras — Viajes Vidaia

> Lista accionable priorizada. Todo referenciado a ficheros reales del proyecto.

---

## 🔴 Urgente

### M01 — Los formularios no envían datos a ningún destino
> ✅ COMPLETADO — CLIENTIFY 23/05/2026 · RESEND 16/06/2026. Los tres endpoints (`/api/forms/{presupuesto,contacto,newsletter}`) envían el lead a Clientify y notifican por email vía Resend (`lib/services/resend.ts`, remitente `web@viajesvidaia.com`). El email es best-effort (no rompe el envío si falla). Requiere `RESEND_API_KEY` en las variables de entorno (Vercel → Settings → Environment Variables) y el dominio `viajesvidaia.com` verificado en Resend.

**Problema (resuelto):** Los tres endpoints de formulario (`/api/forms/contacto`, `/api/forms/newsletter`, `/api/forms/presupuesto`) aceptaban los datos, validaban y devolvían `{ ok: true }`, pero **solo escribían en `console.log`**. El equipo no recibía ninguna notificación de los formularios enviados en producción.

**Archivos:**
- `app/api/forms/contacto/route.ts` → Clientify + email a `info@viajesvidaia.com`
- `app/api/forms/newsletter/route.ts` → Clientify + email a `info@viajesvidaia.com`
- `app/api/forms/presupuesto/route.ts` → Clientify + email a `sales@viajesvidaia.com`
- `lib/services/clientify.ts` → integración CRM (`VV_CLIENTIFY_API_TOKEN`)
- `lib/services/resend.ts` → notificación email (`RESEND_API_KEY`)

**Implementado:**
1. ✅ Clientify (CRM): contacto + tarea/deal/nota según formulario.
2. ✅ Resend (email): helper `sendNotificationEmail` centralizado, remitente `web@viajesvidaia.com`, envío best-effort (un fallo de email no rompe el envío del formulario; Clientify es la fuente de verdad).
3. ✅ Paquete `resend` instalado.

**Variables de entorno requeridas** (local en `.env.local`, producción en Vercel → Settings → Environment Variables):
- `RESEND_API_KEY` — además, el dominio `viajesvidaia.com` debe estar verificado en Resend.
- `VV_CLIENTIFY_API_TOKEN`.

Si falta alguna variable, la integración correspondiente se omite con un `console.warn` y el resto del flujo sigue funcionando.


---

### M02 — `og-default.jpg` no existe en `public/`
> ✅ CREADO OG-DEFAULT con branding de Vidaia para páginas sin imagen OG explicita. 

**Problema:** `lib/helpers/seo.ts` (línea 4) referencia `https://www.viajesvidaia.com/images/og-default.jpg` como fallback para Open Graph. El fichero no existe en `public/images/`. Todas las páginas sin imagen OG explícita (aviso legal, privacidad, cookies, blog) muestran imagen rota al compartirlas en redes sociales.

**Archivos afectados:**
- `lib/helpers/seo.ts:4`

**Solución:** Crear y colocar `public/images/og-default.jpg` (1200×630px) con el branding de Vidaia.

---

### M03 — Crear `.env.example` con todas las variables necesarias
> ✅ COMPLETADO 23/05/2026

**Problema:** No existe documentación de las variables de entorno necesarias para arrancar el proyecto o activar integraciones. Cualquier developer nuevo debe rastrear el código para saber qué variables configurar.

**Archivos afectados:** Repositorio raíz.

**Solución:** Crear `.env.example`:
```bash
# Analytics
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Email (Resend) — activar en app/api/forms/*.ts
RESEND_API_KEY=re_xxxxxxxxxxxxx

# CRM (Clientify) — activar en app/api/forms/*.ts + lib/services/clientify.ts
CLIENTIFY_API_KEY=xxxxxxxxxxxxxxxx

# Base de datos (si se reactiva Supabase en el futuro)
# NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxxxxx
```

---

### M31 — La raíz `/` no tiene manejo: dará 404 al desplegar
> ✅ FALSO POSITIVO (cerrado 11/06/2026) — La raíz **sí** está manejada: `proxy.ts` (el sustituto de `middleware.ts` en Next.js 16) redirige cualquier ruta sin prefijo de idioma a `/${DEFAULT_LANGUAGE}/...`, incluida `/` → `/es`. La auditoría buscó `middleware.ts` (deprecado en Next.js 16) y no encontró el fichero renombrado. Verificado con curl: `/` → 307 `/es`, `/viajes` → 307 `/es/viajes`. Se añadió temporalmente un `redirects()` en next.config.ts y se retiró al descubrir el proxy — una sola fuente de verdad.

**Lección para futuras auditorías:** en Next.js 16 el fichero de middleware se llama `proxy.ts` (export `proxy`), no `middleware.ts`. Aparece en el build como `ƒ Proxy (Middleware)`.

---

### M32 — Dominio canónico inconsistente: www vs no-www
> ✅ COMPLETADO 11/06/2026 — Decidido dominio canónico **no-www** (`viajesvidaia.com`, coincide con el redirect del hosting). Constante única `BASE_URL` en `lib/config/site.ts` importada en seo.ts, sitemap, robots, todos los schemas, llms.txt y páginas personalizar. Enlaces internos de `posts.ts` convertidos a rutas relativas. Cero ocurrencias de `www.viajesvidaia.com` en `lib/` y `app/`.

**Problema:** El código usa `https://www.viajesvidaia.com` como BASE_URL en canonicals, sitemap, robots y schemas. Pero el dominio en producción redirige `www.viajesvidaia.com → viajesvidaia.com` (301, verificado con curl el 03/06/2026). Resultado: **todos los canonicals, URLs del sitemap y URLs de schema apuntarían a direcciones que redirigen** — señal confusa para Google (canonical que no es canonical).

Además, hay inconsistencia interna: `app/[lang]/blog/[slug]/page.tsx:32,75` y varios enlaces en `lib/data/posts.ts` usan `viajesvidaia.com` **sin** www, distinto del resto del código.

**Archivos afectados (todos con BASE_URL hardcodeado):**
- `lib/helpers/seo.ts`
- `app/sitemap.ts`, `app/robots.ts`
- `lib/schema/buildOrganizationSchema.ts`, `buildTouristTripSchema.ts`, `buildBreadcrumbSchema.ts`
- `app/[lang]/itinerarios/personalizar/page.tsx`, `app/[lang]/itinerarios/[slug]/personalizar/page.tsx`
- `app/[lang]/blog/[slug]/page.tsx` (sin www)
- `lib/data/posts.ts` (enlaces internos en contenido, sin www)

**Solución:**
1. **Decidir** el dominio canónico (www o no-www) y configurar el redirect del hosting/DNS en esa dirección.
2. Extraer una constante única `BASE_URL` en un módulo compartido (ej. `lib/config/site.ts`) e importarla en todos los puntos anteriores.
3. Alinear los enlaces internos de `posts.ts` (o mejor: convertirlos en rutas relativas).

---

## 🟡 Importante

### M04 — Eliminar `lib/supabase.ts` y dependencia `@supabase/supabase-js`
> ✅ COMPLETADO 02/06/2026 — `lib/supabase.ts` borrado; `@supabase/supabase-js` desinstalado (10 paquetes menos).

**Problema:** `lib/supabase.ts` no se importa en ningún fichero activo. Mantenerlo confunde sobre la arquitectura del proyecto y genera dudas sobre si los datos vienen de Supabase o de los ficheros estáticos.

**Archivos afectados:**
- `lib/supabase.ts`
- `package.json` (dependencia `@supabase/supabase-js`)

**Solución:**
```bash
npm uninstall @supabase/supabase-js
# Eliminar lib/supabase.ts
```
Eliminar también `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` del `.env.local` y del futuro `.env.example`.

---

### M05 — Strings hardcodeados en `PostContent.tsx` y `blog/page.tsx`
> ✅ COMPLETADO 23/05/2026 — `blogPage` añadido a staticContent; PostContent usa useLanguage(); blog/page usa getStaticContent(lang)

**Problema:** "Volver al blog" y "min de lectura" están hardcodeados en español en los ficheros del blog, rompiendo el sistema de i18n cuando se active el inglés.

**Archivos afectados:**
- `app/[lang]/blog/[slug]/PostContent.tsx` (líneas 65, 94)
- `app/[lang]/blog/page.tsx` (líneas 88, 165)

**Solución:** Añadir claves en `staticContent.ts` bajo una nueva sección `blogPage`:
```typescript
blogPage: {
  backButton: 'Volver al blog',
  readingTimeLabel: 'min de lectura',
}
```
Y actualizar los componentes para leer de `getStaticContent(lang).blogPage` (en server components) o `content.blogPage` (en client components vía `useLanguage()`).

**Nota:** `blog/page.tsx` es un Server Component — necesita `lang` como prop para llamar a `getStaticContent`. `PostContent.tsx` es Client Component y puede usar `useLanguage()`.

---

### M06 — `ValueProposition.tsx` con contenido hardcodeado en el componente
> ✅ COMPLETADO 23/05/2026 — items[] movido a staticContent con iconName como string; componente usa ICON_MAP

**Problema:** Los títulos y descripciones de las 4 cards de propuesta de valor están hardcodeados en el componente en lugar de venir de `staticContent.ts`. El componente llama a `useLanguage()` para el header, pero ignora el sistema para el contenido principal.

**Archivos afectados:**
- `components/sections/ValueProposition.tsx` (líneas 6-34)

**Solución:** Mover el array al bloque `valueProposition` en `staticContent.ts`:
```typescript
valueProposition: {
  header: { overline, title, subtitle },
  items: [
    { icon: 'Compass', title: 'Viajes únicos', description: '...' },
    // ...
  ]
}
```
Y en el componente, iterar sobre `sectionContent.items`.

---

### M07 — Añadir `aria-label` a los botones de compartir en `PostContent.tsx`
> ✅ YA ESTABA IMPLEMENTADO — aria-labels presentes en el código antes de esta sesión

**Problema:** Los tres botones de compartir (Twitter, Facebook, copiar enlace) en el post del blog solo muestran iconos sin texto accesible. Los lectores de pantalla no pueden identificarlos.

**Archivos afectados:**
- `app/[lang]/blog/[slug]/PostContent.tsx`

**Solución:**
```tsx
<button onClick={shareOnTwitter} aria-label="Compartir en Twitter">
  <Twitter className="w-4 h-4" aria-hidden="true" />
</button>
<button onClick={shareOnFacebook} aria-label="Compartir en Facebook">
  <Facebook className="w-4 h-4" aria-hidden="true" />
</button>
<button onClick={handleCopyLink} aria-label={copied ? 'Enlace copiado' : 'Copiar enlace'}>
  <Link2 className="w-4 h-4" aria-hidden="true" />
</button>
```

---

### M08 — `generateMetadata` de Home con contenido hardcodeado
> ✅ COMPLETADO 23/05/2026 — home.metadata añadido a staticContent; generateMetadata lee de ahí

**Problema:** `app/[lang]/page.tsx` (líneas 21-29) tiene el título y la descripción de metadata hardcodeados en lugar de leer de `getStaticContent(lang)`. Inconsistente con el patrón del resto de páginas.

**Archivos afectados:**
- `app/[lang]/page.tsx`

**Solución:** Añadir claves de metadata en `staticContent.ts` bajo `home`:
```typescript
home: {
  metadata: {
    title: 'Viajes Vidaia — El viaje de tu vida hecho realidad',
    description: 'Agencia de viajes personalizados...',
  },
  hero: { ... }
}
```
Y actualizar `generateMetadata` para leer de ahí.

---

### M09 — `blog/page.tsx` sin `generateMetadata` propio
> ✅ YA ESTABA IMPLEMENTADO — generateMetadata ya existía en blog/page.tsx antes de esta sesión

**Problema:** La página del listado de blog (`app/[lang]/blog/page.tsx`) no exporta `generateMetadata`, heredando el título genérico del layout raíz.

**Archivos afectados:**
- `app/[lang]/blog/page.tsx`

**Solución:** Añadir:
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return buildMetadata({
    title: 'Blog de viajes — Viajes Vidaia',
    description: 'Artículos, guías e inspiración para tu viaje a Argentina, Chile y Bolivia.',
    path: `/${lang}/blog`,
    lang,
  })
}
```

---

### M10 — Añadir JSON-LD de `Article` en páginas de blog
> ✅ COMPLETADO 28/05/2026 — Migrado a `buildArticleSchema` de `lib/schema/`. Usa `<JsonLd>` component con `next/script`. `datePublished` normalizado a ISO 8601 completo con timezone (`new Date(date).toISOString()`).

**Problema:** Los posts del blog no tienen structured data de tipo `Article`. Esto reduce la visibilidad en Google News y los rich results de artículos.

**Archivos afectados:**
- `app/[lang]/blog/[slug]/page.tsx`

**Solución implementada:** `buildArticleSchema({ title, description, imageUrl, publishedAt, url })` en `lib/schema/buildArticleSchema.ts`, llamado desde `app/[lang]/blog/[slug]/page.tsx` con `<JsonLd data={buildArticleSchema(...)} id="ld-article" />`. Las fechas de `posts.ts` son `"YYYY-MM-DD"` — el builder las convierte a `"YYYY-MM-DDT00:00:00.000Z"` antes de emitirlas.

---

### M11 — `ItineraryContent.tsx` (687 líneas) — dividir en subcomponentes
> ✅ COMPLETADO 23/05/2026 — Extraídos: ItineraryHeroCarousel, ItineraryDayAccordion, ItineraryHotels, ItineraryRelated. ItineraryContent reducido a ~170 líneas como orquestador.

**Problema:** `ItineraryContent.tsx` es el componente más grande del proyecto con 687 líneas. Mezcla lógica de carousel, acordeón, mapa, hoteles, opcionales y viajes relacionados. Dificulta el mantenimiento.

**Archivos afectados:**
- `app/[lang]/itinerarios/[slug]/ItineraryContent.tsx`

**Solución propuesta:** Extraer:
- `ItineraryHero.tsx` — carousel de imágenes + hero info (~120 líneas)
- `ItineraryDayAccordion.tsx` — acordeón días a día (~150 líneas)
- `ItineraryHotels.tsx` — sección de hoteles (~80 líneas)
- `ItineraryRelated.tsx` — viajes relacionados (~60 líneas)

El `ItineraryContent.tsx` quedaría como orquestador de ~100 líneas.

---

### M12 — `Hero.tsx` — eliminar `regionContent` hardcodeado y leer de `countries.ts`
> ✅ COMPLETADO 23/05/2026 — regionContent eliminado; Hero usa getCountriesOrdered() con flagCode para construir la clave de asset dinámicamente

**Problema:** `Hero.tsx` tiene un objeto `regionContent` con los países (Argentina, Chile, Bolivia) y sus flags hardcodeados en el componente. Si se añade un país nuevo a `countries.ts`, no aparece en el hero automáticamente.

**Archivos afectados:**
- `components/sections/Hero.tsx` (líneas 11-17)

**Solución:** El hero debería recibir los países como prop desde la página (que ya carga `getCountriesOrdered()`), o leer directamente de `getCountriesOrdered()` para mostrar los flags dinámicamente.

---

### M33 — Sin `not-found.tsx` global (404 sin marca)
> ✅ COMPLETADO 11/06/2026 — `app/not-found.tsx` creado. Validado por el equipo, con dos correcciones posteriores el mismo día:
> 1. **i18n:** ahora es Client Component con `useLanguage()` (el `LanguageContext` deriva el idioma del pathname, que se conserva en la 404). Strings en `staticContent.ts` bajo `notFoundPage` (es + en). Enlaces con `LangLink` para conservar el prefijo de idioma.
> 2. **Header ilegible:** el Header arranca transparente con texto blanco (diseñado para heroes oscuros); sobre el fondo blanco original de la 404 los enlaces eran invisibles hasta hacer scroll. Solución: la 404 usa el degradado oscuro del hero del blog (`from-vidaia-charcoal to-vidaia-dark`) — mismo lenguaje visual que el resto de páginas con header transparente.

**Problema:** `notFound()` se invoca en `blog/[slug]`, `destinos/[slug]` e `itinerarios/[slug]`, pero no existe `app/not-found.tsx` ni `app/[lang]/not-found.tsx`. El usuario que llega a una URL rota ve el 404 genérico de Next.js sin logo, sin navegación y sin enlaces de recuperación.

**Solución:** Crear `app/not-found.tsx` con branding Vidaia y enlaces a home/viajes/blog. Patrón visual similar a las páginas de éxito existentes (`contacto/exito`).

---

### M34 — Páginas legales sin `buildMetadata` (sin canonical ni OG)
> ✅ COMPLETADO 11/06/2026 — privacidad, aviso-legal y cookies migradas a `buildMetadata()` con su path. Canonical verificado en local.

**Problema:** `privacidad/page.tsx`, `aviso-legal/page.tsx` y `cookies/page.tsx` definen solo `title`/`description` a mano. No tienen canonical, ni hreflang, ni Open Graph — son las únicas páginas del sitio fuera del patrón `buildMetadata`.

**Archivos afectados:**
- `app/[lang]/privacidad/page.tsx`
- `app/[lang]/aviso-legal/page.tsx`
- `app/[lang]/cookies/page.tsx`

**Solución:** Migrar las tres a `buildMetadata()` de `lib/helpers/seo.ts` con su `path` correspondiente, como el resto de páginas.

---

### M35 — `blog/[slug]` construye metadata a mano en vez de usar `buildMetadata`
> ✅ COMPLETADO 11/06/2026 — `buildMetadata()` extendido con `publishedTime` (emitido solo con `ogType: 'article'`). Blog post migrado; canonical no-www verificado.

**Problema:** `generateMetadata` de `app/[lang]/blog/[slug]/page.tsx` no usa el helper: construye la URL hardcodeada (además sin www — ver M32), duplica la lógica OG/Twitter y no emite canonical vía `alternates`.

**Archivos afectados:**
- `app/[lang]/blog/[slug]/page.tsx` (líneas 23-56)

**Solución:** Extender `buildMetadata()` para aceptar `publishedTime` y `ogImage` por página (ya soporta `ogType: 'article'`), y migrar el blog post a usarlo. Un único punto de verdad para canonical/OG en todo el sitio.

---

### M36 — Sin security headers en `next.config.ts`
> ✅ COMPLETADO 11/06/2026 — `headers()` añadido: nosniff, Referrer-Policy, X-Frame-Options SAMEORIGIN, Permissions-Policy. Verificado con curl en local.

**Problema:** La app no emite cabeceras de seguridad estándar: `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `X-Frame-Options` (o CSP `frame-ancestors`), `Permissions-Policy`. Herramientas como securityheaders.com penalizarán el dominio; algunos scanners de clientes corporativos también.

**Archivos afectados:**
- `next.config.ts`

**Solución:** Añadir función `headers()`:
```typescript
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ],
  }]
}
```
**Nota:** HSTS lo añade Vercel automáticamente. Ojo con `X-Frame-Options` si algún día se embebe el sitio en iframes propios. El iframe de LightWidget (M17) no se ve afectado — es contenido externo embebido aquí, no al revés.

---

### M37 — Sin `manifest.webmanifest` ni `apple-touch-icon`
> ✅ COMPLETADO 11/06/2026 — `app/manifest.ts` creado (theme_color `#5ea6ae`, descripción dinámica desde `getCountriesOrdered()` — se actualiza sola al añadir países). Iconos provistos por diseño: `public/apple-touch-icon.png` (180×180, raíz por convención iOS) + `public/images/icons/icon-192.png` e `icon-512.png`. `apple` añadido a `metadata.icons` del layout.

**Problema:** Solo existe `public/favicon.png`. Falta el web manifest (nombre, `theme_color`, iconos para "añadir a pantalla de inicio" en Android) y el `apple-touch-icon` de 180×180 para iOS. Sin ellos, el icono al guardar el sitio en el móvil es un screenshot o un icono genérico.

**Solución:**
1. Crear `app/manifest.ts` (Next.js lo sirve como `/manifest.webmanifest`): `name`, `short_name`, `theme_color`, `background_color`, `icons` (192×192 y 512×512).
2. Generar `apple-touch-icon.png` (180×180) y añadirlo en `metadata.icons` del root layout.

---

## 🟢 Nice to have

### M13 — `STATIC_CONTENT.en` — completar o eliminar el bloque parcial

**Problema:** El bloque `en` en `staticContent.ts` solo tiene las páginas legales (~450 líneas) pero faltan todas las secciones funcionales. Mientras inglés esté desactivado es inofensivo, pero puede confundir.

**Solución:** Si no hay planes inminentes de activar inglés, mover el bloque `en` a un fichero separado `staticContent.en.ts` y no importarlo hasta que esté completo.

**Nota hreflang (auditoría 03/06/2026):** `buildMetadata` en `lib/helpers/seo.ts:29-34` hardcodea los alternates hreflang solo para `es` + `x-default`. Cuando se active el inglés, hay que generar los alternates dinámicamente iterando `ENABLED_LANGUAGES` — el código actual no produciría hreflang `en`.

---

### M14 — `ViajesBuscador.tsx` (351 líneas) — extraer subcomponentes

**Problema:** Mezcla lógica de filtrado y presentación.

**Solución:** Extraer `TripSearchFilters.tsx` (los controles de filtro) y dejar el buscador como controlador de estado que pasa props a los subcomponentes.

---

### M15 — Añadir JSON-LD de tipo `TouristTrip` en páginas de itinerarios
> ✅ COMPLETADO 28/05/2026 — `buildTouristTripSchema` en `lib/schema/`. Incluye `subTrip` por día con `itinerary` (lugar + coordenadas) y `subjectOf` (actividades incluidas). Combinado en `@graph` con `FAQPage` vía `buildPageSchema`.

**Solución implementada:** `buildTouristTripSchema(trip, resolvedItinerary.days, allDestinations)` en `lib/schema/buildTouristTripSchema.ts`. Cada día del itinerario genera un nodo `TouristTrip` anidado en `subTrip`, con el destino del día como `itinerary: Place` y las actividades incluidas como `subjectOf: ItemList`.

---

### M16 — Añadir coordenadas `lat`/`lng` a los destinos que aún no las tienen
> ✅ COMPLETADO — Todos los destinos tienen `lat` y `lng` confirmado por el usuario.

**Problema:** `Destination` tiene `lat?` y `lng?` como campos opcionales. `buildTouristDestinationSchema` omite el `GeoCoordinates` para los destinos que no las tienen, empobreciendo el schema `TouristAttraction` para esos destinos.

**Archivos afectados:**
- `lib/data/destinations.ts` — los destinos sin coordenadas

**Solución:** Añadir `lat` y `lng` al resto de destinos en `destinations.ts`. No requiere cambios en el builder — ya está preparado para usarlas cuando existen.

---

### M17 — InstagramBanner: preparar integración con widget real
> ✅ COMPLETADO 03/06/2026 — Integrado widget de LightWidget (`<Script>` con `strategy="afterInteractive"` + `<iframe>` con `minHeight: 300px` para evitar CLS). Eliminado el grid placeholder de Unsplash y los 6 assets `INSTAGRAM_PHOTOS.*` de `assets.ts`.

**Problema:** Las 6 fotos del `InstagramBanner` eran fotos estáticas de Unsplash, no el Instagram real.

---

### M17b — Alt de fotos de equipo más descriptivo
> (Nota: ID duplicado con el anterior; renumerado como M17b para distinguirlos.)
> ✅ COMPLETADO 02/06/2026 — `alt={person.name}` → `alt={personImage.alt}` en `QuienesSomos.tsx`. Los assets ya tienen alt rico con rol y localización.

**Problema:** Las fotos de Lau y Jupe usan `alt={person.name}` (solo el nombre).

**Solución:** Usar `alt={`${person.name}, ${person.role}`}` para mejor accesibilidad.

---

### M18 — Crear página de éxito genérica para el formulario de contacto
> ✅ COMPLETADO 02/06/2026 — `app/[lang]/contacto/exito/page.tsx` creada. Strings en `staticContent.ts` bajo `contactPage.success` (es + en). Patrón idéntico a `itinerarios/personalizar/exito`.

**Problema:** El formulario de contacto (`ContactModal`) muestra un mensaje inline de éxito, pero si se usa sin modal (en página directa), no hay redirección de confirmación.

**Nota:** El formulario de presupuesto sí tiene página de éxito en `app/[lang]/itinerarios/personalizar/exito/page.tsx`. El patrón ya existe.

---

### M19 — Homogeneizar la ubicación de componentes: co-locación en `app/` para componentes de página

**Decisión:** Alinearse con la convención de Next.js App Router. El criterio definitivo es:
- `components/` — componentes **reutilizables** en más de una página (Header, Footer, LangLink, TripCard, NewsletterForm…)
- `app/[lang]/.../` — componentes **ligados a una ruta concreta** y no reutilizados en otro sitio

**Estado actual — componentes mal ubicados en `components/` que deberían co-locarse:**

| Componente | Usado solo en | Mover a |
|---|---|---|
| `components/sections/ViajesHero.tsx` | `viajes/page.tsx` | `app/[lang]/viajes/` |
| `components/sections/ViajesServicios.tsx` | `viajes/page.tsx` | `app/[lang]/viajes/` |
| `components/sections/ViajesComoTrabajamos.tsx` | `viajes/page.tsx` | `app/[lang]/viajes/` |
| `components/sections/HoneymoonFaq.tsx` | `lunas-de-miel/page.tsx` | `app/[lang]/lunas-de-miel/` |
| `components/sections/ViajesBuscador.tsx` | `viajes/page.tsx` | `app/[lang]/viajes/` |
| `components/forms/FormularioPersonalizado/` | `itinerarios/personalizar/` | `app/[lang]/itinerarios/personalizar/` |

**Componentes ya co-locados correctamente (no mover):**
- `app/[lang]/blog/[slug]/PostContent.tsx`
- `app/[lang]/destinos/[slug]/DestinationBackButton.tsx`
- `app/[lang]/itinerarios/[slug]/ItineraryContent.tsx` y subcomponentes

**Alcance:** ~8 ficheros a mover + actualizar imports en sus páginas padre. No hay cambios funcionales.

---

### M20 — `url_mobile` en heroes de Server Components (lunas-de-miel, destinos)
> ✅ COMPLETADO 02/06/2026 — `LunasDeMielHeroImage.tsx` y `DestinationHeroImage.tsx` creados como Client Components con `useIsMobile()`. Integrados en sus páginas. Degradación elegante hasta que se añadan `url_mobile` en `assets.ts` para `HONEYMOON_HERO_BG` y `COUNTRIES.*_HERO`.

**Pendiente:** Los siguientes heroes son Server Components y no pueden usar `useIsMobile()`:

| Componente | Ruta |
|---|---|
| Hero de lunas de miel | `app/[lang]/lunas-de-miel/page.tsx` (renderiza imagen inline o via subcomponente server) |
| Hero de destinos | `app/[lang]/destinos/[slug]/page.tsx` |

**Qué habría que hacer para incluirlos:**
1. Extraer la sección de imagen del hero a un Client Component propio (ej. `LunasDeMielHeroImage.tsx`) que reciba `asset: Asset` como prop.
2. En ese Client Component, usar `useIsMobile()` y computar la URL igual que en los heroes ya migrados: `isMobile ? (asset.url_mobile ?? asset.url) : asset.url`.
3. El Server Component padre sigue haciendo el fetch de datos y pasa el asset como prop.
4. Añadir `url_mobile` a los assets correspondientes en `lib/data/assets.ts`.

**Archivos afectados cuando se implemente:**
- `app/[lang]/lunas-de-miel/page.tsx`
- `app/[lang]/destinos/[slug]/page.tsx`
- `lib/data/assets.ts` (añadir `url_mobile` a los assets de esos heroes)

---

### M21 — `searchParams` fuerza dynamic rendering en blog listing y destinos
> ✅ COMPLETADO 02/06/2026 — Blog: `BlogFilters.tsx` Client Component con `useSearchParams()` extrae filtrado/grid; `blog/page.tsx` es SSG puro con `<Suspense>`. Destinos: `DestinationBackButton` lee `from` internamente con `useSearchParams()` e incluye su propio `<section>`; `destinos/[slug]/page.tsx` sin `searchParams`, con `<Suspense fallback={null}>`.

**Problema:** En Next.js 16, cualquier página que haga `await searchParams` se convierte en dynamic (server-rendered on demand), incluso si tiene `generateStaticParams`. Estas dos páginas lo hacen y aparecen como `ƒ` en el build en lugar de `●` (SSG):

| Página | Archivo | `searchParams` usado para |
|---|---|---|
| Blog listing | `app/[lang]/blog/page.tsx` | `category?: string` — filtrar posts por categoría |
| Destino | `app/[lang]/destinos/[slug]/page.tsx` | `from?: string` — URL de vuelta del botón back |

**Impacto:** Estas páginas se sirven desde serverless functions (Vercel) en lugar de CDN estático. Aumenta la latencia en ~50–200 ms por request.

**Solución:** Mover la lectura de `searchParams` a un Client Component con `useSearchParams()`:

1. **Blog listing** — Extraer un `BlogFilters` Client Component que lea `useSearchParams()` para el filtro de categoría. La página (`blog/page.tsx`) pasa los posts al componente como prop; el filtrado ocurre en el cliente.

2. **Destinos** — El `from` param solo se usa para la URL del botón "volver". Mover esa lógica al ya existente `DestinationBackButton.tsx` (ya es Client Component — puede leer `useSearchParams()` directamente). Eliminar `searchParams` de la firma de `CountryPage`.

**Archivos afectados:**
- `app/[lang]/blog/page.tsx` — eliminar `searchParams` de la firma; pasar todos los posts al componente de filtros
- `app/[lang]/blog/[slug]/DestinationBackButton.tsx` — usar `useSearchParams()` para leer `from`
- `app/[lang]/destinos/[slug]/page.tsx` — eliminar `searchParams` de la firma
- (nuevo) `app/[lang]/blog/BlogFilters.tsx` — Client Component con `useSearchParams()` para filtrado por categoría

---

### M22 — Eliminar datos estáticos del bundle cliente (itinerario)
> ✅ COMPLETADO 29/05/2026 — `itineraries.ts` + `activities.ts` + `hotels.ts` + `destinations.ts` (~244 KB parsed) eliminados del bundle cliente. `trips.ts` (array de datos) eliminado de los chunks de itinerario y viajes.

**Solución implementada:**
- Creado `lib/data/tagConfig.ts` con `TAG_CONFIG` + `TRIP_TAGS` extraídos de `trips.ts` — los Client Components importan solo el config sin arrastrar el array de datos
- `app/[lang]/itinerarios/[slug]/page.tsx` centraliza todas las llamadas a servicios y construye lookup maps (`destinationNames`, `destCoords`)
- `ItineraryContent` y sus 5 sub-componentes refactorizados para recibir datos como props (no slug) — eliminadas todas las llamadas a `lib/services/` desde código cliente
- `ItineraryMap` recibe `destCoords: Record<string, {name,lat,lng}>` en lugar de importar el array completo de `destinations.ts`
- Ver D16 en DECISIONS.md para el razonamiento arquitectónico

---

### M23 — `staticContent.ts` (79 KB) en shared chunk — deuda técnica arquitectónica
> ⏬ DESPRIORITIZADO 11/06/2026 — Con el baseline real de M24 (scores 87-95, TBT sano en hardware estándar), el coste del refactor no se justifica ahora. Reevaluar solo si los scores caen al crecer el contenido o al activar el inglés (que duplicaría el tamaño de staticContent en el bundle).

**Problema:** `useLanguage` hook importa todo `staticContent.ts` (1.854 líneas, ~79 KB parsed) a nivel de módulo. Como es usado por 20+ Client Components repartidos por todas las páginas, webpack lo eleva al shared chunk que se carga en CADA página. No se puede tree-shake porque el acceso a la clave del idioma (`STATIC_CONTENT[language]`) es dinámico en tiempo de ejecución.

**Impacto:** 79 KB presentes en el shared bundle de todas las páginas, incluyendo páginas que solo usan una pequeña fracción del contenido estático.

**Solución (alto coste):** Eliminar `useLanguage()` de los Client Components que no tienen interactividad real y convertirlos a Server Components que reciben `content` como prop desde la página padre. Esto es el refactor arquitectónico de D10 (DECISIONS.md).

**Componentes candidatos (solo usan `useLanguage()` para texto, sin interactividad):**
- `components/layout/Footer.tsx`
- `components/sections/ValueProposition.tsx`
- `components/sections/QuienesSomos.tsx`
- `components/sections/TestimonialsSection.tsx`
- `components/sections/CTASection.tsx`
- `components/sections/InstagramBanner.tsx`
- `components/sections/BlogSection.tsx`
- `components/sections/ViajesServicios.tsx`
- `components/sections/ViajesComoTrabajamos.tsx`

**Estimación:** ~8-12 ficheros a cambiar + actualizar sus páginas padre para pasar `content` como prop. Requiere crear un `app/[lang]/layout.tsx` intermedio para que el Footer en el root layout también pueda recibir `lang` desde la URL.

---

### M24 — Auditoría Lighthouse post-optimizaciones
> ✅ BASELINE MEDIDO 11/06/2026 (PSI mobile, preview de Vercel):
>
> | Página | Score | FCP | LCP |
> |---|---|---|---|
> | /es | 89 | 1,8 s | 3,5 s |
> | /es/viajes | 90 | 1,0 s | 3,5 s |
> | /es/destinos/argentina | 95 | 0,9 s | 2,9 s |
> | /es/itinerarios/capitales-del-vino | 87 | 1,0 s | 4,1 s |
>
> **Conclusiones:** CLS = 0 (perfecto), TBT sano, oportunidades de red vacías. El único gap sistemático es **LCP > 2,5 s** (hero image) → la palanca es M20 (`url_mobile`) + M29 (`sizes`), en espera de imágenes finales. La "cadena crítica" HTML→CSS reportada por Lighthouse era la mínima posible y se eliminó con `experimental.inlineCss` (ver M28). Re-medir tras M20/M29.
>
> ⚠️ Nota de medición: Lighthouse en máquina local lenta dio Performance 50 / TBT 1.830 ms — falsa alarma por hardware (benchmarkIndex 786 + throttle 4x). Usar siempre PSI (pagespeed.web.dev) para números comparables.

**Objetivos originales:**
- Lighthouse Performance > 90 en home → 89 (rozado; pendiente del LCP)
- First Load JS home < 145 kB
- First Load JS itinerario < 150 kB

---

### M25 — BreadcrumbList en schema.org
> ✅ COMPLETADO 02/06/2026 — `buildBreadcrumbSchema(lang, items)` en `lib/schema/buildBreadcrumbSchema.ts`. Integrado vía `buildPageSchema` (en `@graph`) en itinerarios y destinos, y como `<JsonLd id="ld-breadcrumb">` independiente en blog posts. Breadcrumb: Inicio → Viajes → Título en itinerarios/destinos; Inicio → Blog → Título en posts.

---

### M26 — Email en texto plano — ObfuscatedEmail
> ✅ COMPLETADO 02/06/2026 — Componente `components/ui/ObfuscatedEmail.tsx` (Client Component) construye la dirección con `[user, domain].join('@')` en cliente. Reemplazado el `<a href="mailto:...">` de `ContactModal.tsx`. El email ya no aparece en el HTML estático entregado al crawler.

---

### M27 — `eslint-config-next` desactualizado
> ✅ COMPLETADO 02/06/2026 — Actualizado de `^15.3.0` a `^16.2.6` para coincidir con la versión de Next.js (`^16.2.6`).

---

### M28 — Render blocking resources (inspección manual)
> ✅ COMPLETADO 11/06/2026 — La auditoría M24 confirmó que el único recurso render-blocking era el CSS propio (13 KiB gzip, cadena HTML→CSS). Resuelto con `experimental.inlineCss: true` en `next.config.ts`: el CSS se inlinea en el HTML (`<style data-precedence="next">`) y desaparece el request. Verificado: 0 stylesheets externos, render visual correcto, JSON-LD intacto. No hay scripts de terceros bloqueantes (GA4 carga tras consentimiento; LightWidget es afterInteractive).

---

### M29 — `sizes` en componentes `<Image>` (auditoría manual)

> ⏸️ EN ESPERA (decidido 11/06/2026) — No abordar hasta que **todas las imágenes finales estén subidas** (incluye los `url_mobile` de M20), para hacer la auditoría una sola vez y no repetirla.

**Requiere:** Revisar cada `<Image>` del proyecto y comparar el `sizes` declarado con el ancho real del elemento en cada breakpoint.

**Riesgo:** Sin `sizes` correcto, Next.js sirve la imagen al ancho del viewport completo aunque el elemento ocupe, por ejemplo, 33vw en desktop. Penaliza LCP y bandwidth.

**Ficheros prioritarios a revisar:**
- `components/ui/TripCard.tsx` — grid de 1/2/3 columnas
- `app/[lang]/blog/BlogFilters.tsx` — grid de posts 1/2/3 columnas
- `app/[lang]/blog/[slug]/PostContent.tsx` — imagen de portada
- ~~`components/sections/InstagramBanner.tsx`~~ — ya no aplica: el grid se sustituyó por el widget de LightWidget (M17)

**Criterio:** `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"` para grids de 3 columnas; ajustar según diseño real.

---

### M30 — Aspect ratio en imágenes (inspección visual)

**Requiere:** Revisar en el navegador (mobile + desktop) que ninguna imagen aparece distorsionada. Candidatos principales: fotos de equipo (`QuienesSomos`), cards de blog, flags en Header/Footer.

**Solución si se detecta distorsión:** Usar `object-fit: cover` con contenedor de proporción fija (`aspect-ratio` en CSS o clase Tailwind `aspect-[x/y]`), o `fill` con contenedor de altura explícita.

**Estado:** Sin confirmar — pendiente inspección visual en producción.

---

### M38 — Sustituir TestimonialsSection por widget de Google Reviews

> ⚠️ REDEFINIDO 11/06/2026 — El objetivo original (schema Review/AggregateRating sobre los testimonios estáticos) se descarta: la sección de testimonios es **temporal** y se sustituirá por un widget de Google Reviews con reseñas reales.

**Pendiente de negocio antes de implementar:**
1. Perfil de Google Business activo y con reseñas
2. Elegir proveedor de widget (Elfsight, etc. — mismo patrón de integración que LightWidget en M17)
3. Decidir ubicación/diseño en home y en /viajes

**Al implementar:**
- Eliminar `components/sections/TestimonialsSection.tsx`, `lib/data/testimonials.ts` y los assets `TESTIMONIALS.*` de `assets.ts`
- Quitar el componente de `app/[lang]/page.tsx` y `app/[lang]/viajes/page.tsx`
- Las reseñas de Google traen su propio rich data verificable — no hace falta schema manual

**Precaución:** Google exige que las reseñas sean verificables y no autogeneradas — por eso el widget de Google Reviews es mejor señal que el markup manual sobre testimonios estáticos.

---

### M39 — Sin schema `WebSite` (GEO)
> ✅ COMPLETADO 11/06/2026 — `lib/schema/buildWebSiteSchema.ts` creado y emitido en `app/layout.tsx` como `<JsonLd id="ld-website">` junto al Organization. Sin SearchAction (no hay buscador con URL de query).

**Problema:** El layout emite `TravelAgency` (Organization) pero no hay nodo `WebSite`. Es el schema que conecta el nombre del sitio con su URL para Google (site name en resultados) y ayuda a los motores IA a identificar la entidad sitio.

**Archivos afectados:**
- `app/layout.tsx` + nuevo `lib/schema/buildWebSiteSchema.ts`

**Solución:** Emitir junto al Organization:
```json
{ "@type": "WebSite", "name": "Viajes Vidaia", "url": "...", "inLanguage": "es", "publisher": { "@id": ".../#organization" } }
```
`SearchAction` solo si algún día existe un buscador interno con URL de query (el filtro de `/viajes` no cualifica — no tiene URL por término de búsqueda).

---

### M40 — Enriquecer schemas existentes con propiedades recomendadas (GEO)
> ✅ COMPLETADO 11/06/2026 — `buildTouristTripSchema`: `image` desde `getAsset(trip.imageKey)`. `buildArticleSchema`: `dateModified` con fallback a `datePublished`; campo opcional `dateUpdated` añadido a la interfaz `Post`. `buildPersonSchema`: `image` desde `imageKey` del miembro (spread condicional). Duración del trip NO añadida — schema.org `Trip` no tiene propiedad oficial de duración.

**Problema:** Los builders emiten lo esencial pero omiten propiedades que los datos ya tienen disponibles:

| Builder | Falta | El dato ya existe en |
|---|---|---|
| `buildTouristTripSchema` | `image` | `trip.imageKey` → `getAsset()` |
| `buildTouristTripSchema` | duración (`P14D` ISO 8601) | `trip.days` / `trip.nights` |
| `buildArticleSchema` | `dateModified` | añadir campo a `posts.ts` (fallback: `datePublished`) |
| `buildPersonSchema` | `image` | fotos de equipo en `assets.ts` |

**Solución:** Añadir cada propiedad a su builder con spread condicional (mismo patrón que `offers`/`geo` ya usados). Bajo coste, los datos ya están.

---

### M41 — Listados sin `CollectionPage`/`ItemList` (GEO)
> ✅ COMPLETADO 11/06/2026 — `lib/schema/buildCollectionPageSchema.ts` creado (CollectionPage + mainEntity ItemList). Integrado: `/viajes` y `/lunas-de-miel` en `@graph` con su FAQSchema vía `buildPageSchema`; `/blog` con `<JsonLd id="ld-blog">` nuevo. Solo se listan trips con `hasItinerary` (los demás no tienen URL propia).

**Problema:** Las páginas de listado (`/viajes`, `/blog`, `/lunas-de-miel`) solo emiten FAQSchema (o nada en el caso de `/blog`). Los motores generativos entienden mucho mejor el catálogo si el listado declara sus items.

**Archivos afectados:**
- `app/[lang]/viajes/page.tsx`, `app/[lang]/blog/page.tsx`, `app/[lang]/lunas-de-miel/page.tsx`
- Nuevo `lib/schema/buildCollectionPageSchema.ts`

**Solución:** Emitir `CollectionPage` con `mainEntity: ItemList` donde cada `ListItem` apunta a la URL del trip/post. Integrar en el `@graph` existente vía `buildPageSchema`.
