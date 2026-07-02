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

### M42 — Flujo de despliegue develop → main con CI
> ✅ COMPLETADO 16/06/2026 — Establecido el flujo `develop` → `main` con validación automática antes de producción. Antes se commiteaba directo a `main` (rama de producción en Vercel), sin red de seguridad.

**Implementado:**
1. **Rama `develop`** como integración (todo el desarrollo se pushea aquí); `main` reservada para producción.
2. **CI GitHub Actions** (`.github/workflows/ci.yml`, job `validate`): `npm ci` → `lint` → `build` sobre Node 24, en cada push a `develop` y en cada PR contra `main`. No despliega (eso lo hace Vercel); es el gate de calidad y añade el `lint` que Vercel no corre.
3. **`main` protegida**: solo se actualiza vía PR desde `develop` con el check `validate` en verde.
4. **`.nvmrc`** fija Node 24 (alinea local / CI / Vercel).
5. **Vercel:** Production Branch = `main` (merge → deploy a producción); push a `develop` → Preview Deployment con URL de staging.

> ⚠️ Los previews de `develop` comparten las claves de producción → los formularios de prueba en una preview crean contactos reales en Clientify y envían emails reales. Si se quiere aislar, cambiar las env vars del scope *Preview* en Vercel por claves de test. Ver `docs/ARQUITECTURA.md` → "Despliegue y CI/CD".

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

> ✅ AUDITADO 28/06/2026 (imágenes finales subidas en TRIPS, CARDS, ITINERARIOS, HEROS) — **Sin cambios de código necesarios.** Revisados los ~21 componentes con `<Image>`: los de grid/contenido declaran `sizes` acordes a su ancho real (cards 3-col `…33vw`, post destacado `50vw`, portada con cap `1280px`, miniaturas/banderas con `width`/`height` fijos), los heroes son full-width (`100vw`), y todos usan `object-cover`. No hay ningún `fill` sin `sizes` (las banderas/logo de Header/Footer/LanguageSwitch/ViajesBuscador/Paso1ElViaje usan dimensiones fijas). Queda solo la confirmación visual de M30 en navegador y re-medir LCP en PSI tras el cutover.

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

**Estado:** Revisado a nivel de código 28/06/2026 — todos los `<Image>` usan `object-cover` con contenedor de tamaño/proporción fijo (cards, fotos de equipo en `QuienesSomos`, banderas), por lo que no debería haber distorsión. **Pendiente solo la inspección visual** en mobile + desktop sobre el deploy (parte de M47).

---

### M38 — Sustituir TestimonialsSection por widget de Google Reviews

> ✅ COMPLETADO 27/06/2026 — `TestimonialsSection.tsx` ahora carga el widget de Google Reviews de Elfsight (app `fd4557ec-…`) en lugar de las tarjetas estáticas. Se **conservó la sección con su pill + título** (no se eliminó entera como se planteó originalmente); solo se sustituyeron las tarjetas y se actualizó el subtítulo a "Reseñas reales de viajeros en Google". Eliminados `lib/data/testimonials.ts`, `lib/services/testimonialsService.ts` y los assets `TESTIMONIALS.*`. El widget carga con `next/script` `strategy="lazyOnload"` + `data-elfsight-app-lazy` (mismo patrón que LightWidget en M17), solo en home y /viajes. Las reseñas de Google traen su propio rich data verificable — sin schema manual.

> 🔭 **Mejora futura (M38b):** sustituir el widget de Elfsight por una sección propia que consuma la **Google Business Profile API**. Motivo: `googleReviews.js` de Elfsight pesa ~523 KiB de JS de terceros (Lighthouse marca cache TTL ineficiente, no controlable por nosotros). Con API propia: render estático/SSG, cero JS de terceros, control del peso y posibilidad de emitir nuestro propio schema `Review`/`AggregateRating` con datos reales verificables. Decisión 29/06/2026: por ahora se mantiene el widget (resuelve el corto plazo); se migrará a get propio de reviews a futuro.

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

---

## 📋 Sesión SEO + indexación (20/06/2026)

> Cambios derivados de la auditoría `Downloads/auditoria-resultado-vidaia.md`. Los pendientes (M46-M48) salen de esa auditoría.

### M43 — Página de Condiciones Generales de Contratación (viaje combinado)
> ✅ COMPLETADO 20/06/2026 — cierra **CF1** de la auditoría.

**Problema:** Faltaba la página legal obligatoria en España de "Condiciones Generales de Contratación de Viajes Combinados" (RD-ley 23/2018 / TRLGDCU). El sitio ya vende viaje combinado (lo menciona el proceso de `/viajes`) pero no había página pública.

**Implementado:**
- Nueva ruta `/condiciones-contratacion` (`app/[lang]/condiciones-contratacion/page.tsx`), mismo patrón que el resto de legales (`buildMetadata`, `generateStaticParams`, render de secciones).
- Contenido en `staticContent.ts` → `conditionsPage` (datos identificativos, formulario de información normalizada, garantía Markel, cláusulas 1-26, tratamiento de datos con RD 933/2021).
- Enlace en el footer (columna Legal, entre Privacidad y Cookies) + entrada en `app/sitemap.ts`.
- Reemplazos del texto fuente: ORGANIZADOR / AGENCIA / minorista → "Viajes Vidaia".

### M44 — Indexación restringida a producción
> ✅ COMPLETADO 20/06/2026 — verificado en local (robots.txt + `X-Robots-Tag` en ambos entornos). Ver **D24** en DECISIONS.md.

**Problema:** `robots.ts` era estático (`allow: /` siempre) y nada impedía indexar las preview deployments ni la URL `*.vercel.app` → riesgo de indexación de previews y contenido duplicado.

**Implementado (solo lo que faltaba; sitemap y los canonicals de `buildMetadata` ya estaban bien):**
- `app/robots.ts` env-aware: `VERCEL_ENV !== 'production'` → `Disallow: /`; producción → `allow` + `sitemap` + `host`.
- `proxy.ts`: en no-producción añade `X-Robots-Tag: noindex, nofollow`; en producción redirige `308` cualquier host `*.vercel.app` → `viajesvidaia.com`. **(El `308` quedó gateado tras `REDIRECT_VERCEL_TO_CANONICAL=true`, off por defecto, porque el dominio aún sirve la web antigua en otro host — ver addendum en D24. Activarlo tras el cutover del dominio a Vercel.)**
- `app/layout.tsx`: `metadataBase: new URL(BASE_URL)`.

### M45 — Limpieza de metadatos SEO (marca, H1, plantillas)
> ✅ COMPLETADO 20/06/2026 — cierra QW1 y la tabla por página de la auditoría. Ver **D23**.

- **Marca única en `<title>`:** ningún `title`/`metaTitle` de los datos incluye ya "Viajes Vidaia"; la añade una sola vez el `template` del root layout. Revisados home, viajes, lunas, legales, blog, posts, itinerarios y destinos.
- **Destinos:** title y H1 por plantilla — `destinationPage.metaTitleTemplate` (`Viajes a medida por {country}`) + `metaDescriptionSuffix`; eliminado el `metaTitle` por país de `countries.ts`.
- **Personalizar:** nuevo helper `getShortTitle()` (`contentHelpers.ts`); `/itinerarios/[slug]/personalizar` usa `Personalizar {shortTitle}`, `robots: noindex,follow` y `og:image` del trip; `/itinerarios/personalizar` `index,follow`. `buildMetadata` extendido con `robots?`.
- **H1 con keyword:** home y `/viajes` (antes el H1 de viajes era solo "Viajes Vidaia").
- **Blog index** migrado a `staticContent.blogPage` (metadata + hero, sin texto hardcodeado).
- **Descripciones legales** ampliadas; **erratas** corregidas (doble espacio en Argentina, "nos llevó" en el post de Iguazú); **`quotePage`** (código muerto) eliminado.

### M46 — GEO por destino: bloques citables + autoría (E-E-A-T)
> 🟡 EN PROGRESO — de la auditoría (CF3). Redefinido: el "bloque Q&A" ya estaba cubierto por el FAQ (visible `FaqSection` + `FAQPage` schema), así que M46 se reduce a (a) datos citables y (b) autoría.

**Hecho 28/06/2026 — bloque "Datos clave" del itinerario:**
- `<dl>` visible bajo el hero en `ItineraryContent.tsx` con duración, precio desde, mejor época, países y dificultad. Datos ya existentes en `trips.ts` (`days`/`nights`/`priceFrom`/`bestMonths`) + nuevo campo `difficulty?` (config en `tagConfig.ts`, `DIFFICULTY_CONFIG`).
- Helper `formatBestMonths()` en `contentHelpers.ts` (comprime meses en rangos, maneja vuelta de año y año completo → "Todo el año").
- Schema: `buildTouristTripSchema` añade `additionalProperty: PropertyValue[]` (duración, mejor época, dificultad); el precio ya iba en `offers`. Labels en `staticContent.itineraryPage.keyFacts`.

**Pendiente:**
1. **Datos citables a nivel de país** (`/destinos/[slug]`): bloque "Claves para viajar a {país}" con datos editoriales nuevos (mejor época, duración recomendada, presupuesto orientativo, dificultad general).
2. **Autoría E-E-A-T en posts:** `author` ('Lau'/'Jupe') ya está en los 7 posts, pero `buildArticleSchema` aún atribuye `author` a la **Organización**, no a una `Person`, y no hay byline visible en `PostContent`. Falta: mapear `author` → `Person` (bios reales de `quienesSomos.teamMembers`) en el schema + byline visible en el post.

### M47 — Verificación post-deploy de la auditoría SEO/GEO
> 🟢 PENDIENTE — comprobaciones que solo se pueden hacer sobre el deploy.

- Validar los schemas en **Rich Results Test** tras la limpieza de titles.
- Confirmar el `308` de `*.vercel.app` → dominio real en el deployment.
- ~~Verificar que la cuenta `@viajesvidaia` (Twitter/X del `twitter:site`) existe~~ ✅ 28/06/2026 — no existe cuenta de X; eliminado `twitter:site` de `lib/helpers/seo.ts` (la Twitter Card se mantiene con card/title/description/image).
- Comprobar que el banner de consentimiento bloquea GA4 antes de aceptar, y el render en móvil.
- Ya resueltos del checklist: `og-default.jpg` (M02), favicons/manifest (M37), 404 con marca (M33), `/`→`/es` (M31), CWV baseline (M24).
- `AggregateRating`: intencionadamente **NO** se añade (testimonios de muestra) — ver M38 / D21.

### M48 — `docs/CONTENT.md` y `README.md` desfasados — poner al día antes de PROD
> ✅ COMPLETADO 28/06/2026. Ambos documentos alineados con el modelo real (`content: { es: { … } }`, `imageKey`, `flagCode`/`heroImageKey`, `lat`/`lng`, tags en inglés incl. `cruise`, `accommodationStops`/`hotelsByCategory`). Quitado todo `metaTitle` con sufijo de marca (D23). Corregidas además las guías de itinerario/destino/hotel/actividad y `relatedTrips` (`{ slug, es: { reason } }`).
>
> **Bonus (deuda de entorno detectada al verificar):** `.env.example` tenía nombres que **no** coincidían con el código (`VV_CLIENTIFY_API_KEY` → real `VV_CLIENTIFY_API_TOKEN`; `VV_NEXT_PUBLIC_GA4_MEASUREMENT_ID` → real `NEXT_PUBLIC_GA4_MEASUREMENT_ID`), le faltaba `NEXT_PUBLIC_CLIENTIFY_CITA_URL` y estaba envuelto en fences ```` ```bash ```` (se colaban al hacer `cp .env.example .env.local`). Reescrito como fichero de entorno válido con los 5 nombres verificados en código + nota de `REDIRECT_VERCEL_TO_CANONICAL`. README alineado: Next.js 16, Node 24, integraciones activas, lista de docs (añadidos CONTENT.md e IMAGENES.md).

---

## 📋 Auditoría completa (02/07/2026)

> Resultado de la auditoría de Seguridad + SEO/GEO + Mejoras generales. Detalle completo, verificación de M32–M48 y falsos positivos descartados en `docs/AUDITORIA-2026-07.md`. Todos los hallazgos verificados manualmente contra el código (rama `develop`, commit `5f3fadd`).

### M49 — 🔴 Escapar HTML en las plantillas de email de notificación
> ✅ COMPLETADO 02/07/2026 — `escapeHtml()` en `lib/form-utils.ts`, aplicado a todo valor de usuario en las tres plantillas (presupuesto, contacto, newsletter). En `idea` se escapa primero y luego se convierten los `\n` en `<br>`.

**Problema:** Los tres endpoints interpolan datos del usuario directamente en el HTML del email al equipo, sin escape de entidades. Un bot puede inyectar HTML arbitrario en los emails internos (suplantación de contenido / phishing dirigido al equipo) o romper el render de la tabla.

**Archivos afectados:**
- `lib/form-utils.ts` — `buildPresupuestoEmailHtml()`: `nombre`, `email` (también dentro de `href="mailto:..."`), `idea`
- `app/api/forms/contacto/route.ts:8-17` — `buildEmailHtml()`: todos los campos
- `app/api/forms/newsletter/route.ts:26` — `full_name` y `email` en el `<p>` inline

**Solución:** Helper compartido en `lib/form-utils.ts` y aplicarlo a todo valor de usuario en las tres plantillas:
```typescript
export function escapeHtml(text: string): string {
  const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
  return text.replace(/[&<>"']/g, (c) => map[c])
}
// idea: escapar PRIMERO, luego los <br>: escapeHtml(data.idea).replace(/\n/g, '<br>')
```

---

### M50 — 🔴 `/api/forms/contacto` no valida ninguna entrada (y newsletter a medias)
> ✅ COMPLETADO 02/07/2026 — `contactoSchema` y `newsletterSchema` en `lib/form-utils.ts` (límites de longitud, `email()`, `preferred_time` como enum de los 4 valores de la UI, `privacy: z.literal(true)`). Ambas rutas usan `safeParse` y responden 400 (contacto con `fieldErrors`, mismo patrón que presupuesto; newsletter mantiene su shape de respuesta). El `replyTo` ya solo recibe emails validados.

**Problema:** `app/api/forms/contacto/route.ts:24` hace `await request.json() as ContactoPayload` — un cast de TypeScript, no validación. Cualquier payload llega tal cual a Clientify y al email (incluido `replyTo` sin validar). El newsletter (`newsletter/route.ts:10-17`) valida presencia + regex laxa de email, pero `full_name` no tiene tipo/longitud garantizados. Presupuesto es el patrón correcto (Zod `formSchema.safeParse`, `presupuesto/route.ts:14`).

**Archivos afectados:**
- `app/api/forms/contacto/route.ts`
- `app/api/forms/newsletter/route.ts`
- `lib/form-utils.ts` (ubicación natural de los nuevos schemas)

**Solución:** Schema Zod por endpoint (mismo patrón que presupuesto): `contactoSchema` (full_name/email/phone/preferred_time/message con `.max()`, `privacy: z.literal(true)`) y `newsletterSchema` (`z.string().email()`, `full_name` con `.min(1).max(...)`). Responder 400 con `fieldErrors` como hace presupuesto.

---

### M51 — 🟡 Anti-spam en los formularios: honeypot + rate limiting
> ✅ COMPLETADO 02/07/2026 (fases 1 y 2) — **Honeypot**: campo `website` oculto (off-screen, `tabindex=-1`, `aria-hidden`) en los 3 formularios; si llega relleno, la ruta responde éxito silencioso sin tocar Clientify/Resend. **Rate limit**: `lib/services/rateLimit.ts` (en memoria por instancia, 5 req/10 min por endpoint+IP, respuesta 429). Turnstile (fase 3) queda para si el spam real lo justifica tras el lanzamiento.

**Problema:** Los tres endpoints son públicos sin ninguna fricción para bots: ni honeypot, ni rate limit, ni CAPTCHA. Un bot puede inundar Clientify de contactos falsos y quemar cuota de Resend.

**Archivos afectados:**
- `app/api/forms/{presupuesto,contacto,newsletter}/route.ts`
- Formularios cliente: `ContactModal.tsx`, `FormularioPersonalizado/`, `NewsletterForm`

**Solución (por fases):**
1. **Honeypot** (coste UX cero): campo oculto (`position:absolute; left:-9999px`, `tabindex="-1"`, `autocomplete="off"`); si llega relleno → responder `{ ok: true }` silencioso sin llamar a Clientify/Resend.
2. **Rate limit básico** por IP (`x-forwarded-for`) — en Vercel sin Redis, un Map en memoria por instancia ya corta ráfagas; si se quiere persistente, Upstash/Vercel KV.
3. **Turnstile** (Cloudflare, gratis) solo si el spam real lo justifica tras el lanzamiento.

---

### M52 — 🟡 No loggear PII de los leads
> ✅ COMPLETADO 02/07/2026 — Los tres endpoints loggean solo datos no personales (origen, preferencia de llamada, itinerario, países, fecha). Los errores de `clientify.ts` loggean solo el status HTTP, sin el cuerpo de la respuesta. Nota: si algún día hay que depurar los custom fields de Clientify de nuevo, loggear el cuerpo temporalmente en local, nunca en producción.

**Problema:** Los logs de Vercel (accesibles a todo el equipo, con retención) guardan hoy datos personales de cada lead:
- `contacto/route.ts:37` — `JSON.stringify(data, null, 2)` con el lead completo (nombre, email, teléfono, mensaje)
- `presupuesto/route.ts:35-42` y `newsletter/route.ts:29` — nombre y email
- `lib/services/clientify.ts:124,177,283` — los errores incluyen el cuerpo completo de la respuesta de Clientify (puede ecoar datos del contacto)

**Solución:** Loggear solo lo no personal (origen, itinerario, timestamp, status). En clientify.ts, loggear solo `status` sin el cuerpo. Clientify es la fuente de verdad del lead — el log no necesita duplicarlo.

---

### M53 — 🟡 Dependencias: 3 vulnerabilidades moderate en `npm audit`
> 🟡 PARCIAL 02/07/2026 — `js-yaml` resuelto con `npm audit fix`. **Pendiente postcss**, y ojo: el rango vulnerable del advisory (`next 9.3.4-canary.0 – 16.3.0-canary.5`) **incluye la última stable de Next a día de hoy (16.2.10)** — actualizar Next ahora no lo cierra. Queda en espera de una release de Next que empaquete postcss ≥ 8.5.10 (previsiblemente 16.3.0 stable). Riesgo real bajo mientras tanto: solo afecta al build, no procesa input de usuario. Comprobar con `npm audit` tras cada actualización de Next.

**Problema (medido 02/07/2026):**
- ~~`js-yaml` 4.0.0–4.1.1 (transitiva, tooling) — DoS cuadrático.~~ ✅ resuelto con `npm audit fix`.
- `postcss` <8.5.10 **bundled dentro de `next`** — XSS en el stringify de CSS (solo afecta al build, riesgo real bajo).

**Solución:**
1. ~~`npm audit fix` (arregla js-yaml, no-breaking).~~ ✅
2. Para postcss: actualizar Next cuando salga una release con postcss ≥ 8.5.10. **NO usar `npm audit fix --force`** — propone un downgrade absurdo a `next@9.3.3`.
3. Re-ejecutar `npm audit` tras cada actualización.

---

### M54 — 🟢 Content-Security-Policy (empezar en Report-Only)

**Problema:** Los headers de M36 están bien, pero falta CSP — la única defensa en profundidad contra inyección de scripts. No es trivial: hay que permitir GA4 (googletagmanager, google-analytics), Elfsight, LightWidget, widget de Clientify, Supabase Storage, flagcdn y los `<style>` inline de `experimental.inlineCss`.

**Archivos afectados:** `next.config.ts`

**Solución:** Añadir primero `Content-Security-Policy-Report-Only` con la whitelist de los proveedores activos, observar violaciones en consola/reportes durante unos días de uso real, y solo entonces promover a `Content-Security-Policy`. HSTS no hace falta (lo pone Vercel).

---

### M55 — 🟢 Quitar `twitter.site: '@viajesvidaia'` del root layout (remate de M47)
> ✅ COMPLETADO 02/07/2026 — clave `site` eliminada del bloque `twitter` de `app/layout.tsx`.

**Problema:** M47 verificó que la cuenta de X no existe y eliminó `twitter:site` de `lib/helpers/seo.ts`, pero el metadata del root layout conserva `site: '@viajesvidaia'` (`app/layout.tsx:59`).

**Solución:** Eliminar la clave `site` del bloque `twitter` del layout (la card se mantiene con `card: 'summary_large_image'`). 1 línea.

---

### M56 — 🟡 Breadcrumbs visibles en itinerarios, destinos y posts
> ✅ COMPLETADO 02/07/2026 — `components/ui/Breadcrumbs.tsx` (mismo shape de items que `buildBreadcrumbSchema` — una sola fuente de verdad definida en cada page.tsx). Itinerarios: en la franja bajo el hero, sobre las pills "Volver al país". Destinos: bajo el hero, antes del botón volver. Posts: **sustituye** al enlace "Volver al blog" (el crumb "Blog" cumple esa función). Pendiente revisión visual en navegador (mobile + desktop).

**Problema:** Las tres plantillas emiten `BreadcrumbList` en JSON-LD (M25) pero no muestran breadcrumbs al usuario. Google prefiere structured data respaldado por contenido visible, y es navegación útil en páginas profundas.

**Archivos afectados:**
- `app/[lang]/itinerarios/[slug]/page.tsx`, `app/[lang]/destinos/[slug]/page.tsx`, `app/[lang]/blog/[slug]/page.tsx`
- Patrón a reutilizar: `components/forms/FormularioPersonalizado/BreadcrumbPersonalizar.tsx` (`<nav aria-label>` + `<ol>`)

**Solución:** Componente `Breadcrumbs` compartido que reciba los mismos items que ya se pasan a `buildBreadcrumbSchema` (una sola fuente de verdad para schema y UI). Ojo con el hero: en páginas con header transparente, colocarlo bajo el hero o con contraste adecuado.

---

### M57 — 🟡 Frescura visible en el blog: `article:modified_time` + `<time>`
> ✅ COMPLETADO 02/07/2026 — `buildMetadata` acepta `modifiedTime` (emitido solo con `ogType: 'article'`); el post pasa `dateUpdated ?? date`. En PostContent la fecha va en `<time dateTime>` y aparece "Actualizado el …" cuando existe `dateUpdated` (label en `staticContent.blogPage.updatedPrefix`, es+en). Nota: el byline de autor con foto (pendiente de M46) resultó estar **ya implementado** en PostContent — M46 queda solo con los datos citables por país.

**Problema:** `buildArticleSchema` ya emite `dateModified` (M40), pero (a) `buildMetadata` no emite el meta `article:modified_time` — solo `publishedTime` — y (b) el post no muestra ninguna fecha visible con `<time datetime="...">`. Señal de frescura para Google y motores generativos. Complementa el pendiente de autoría de M46.

**Archivos afectados:**
- `lib/helpers/seo.ts` — añadir `modifiedTime?: string` a `SeoOptions`, emitirlo con `ogType: 'article'`
- `app/[lang]/blog/[slug]/page.tsx` — pasar `dateUpdated ?? date`
- `app/[lang]/blog/[slug]/PostContent.tsx` — fecha visible con `<time>` (+ "Actualizado: …" si `dateUpdated` existe)

---

### M58 — 🟢 Micro-mejoras GEO: schemas, twitter alt, noindex de éxito, llms.txt
> ✅ COMPLETADO 02/07/2026 — Todos los items de la tabla: `@id` en CollectionPage; `description` + `image` en cada TouristAttraction (datos ya existentes en `destinations.ts`); `alt` en la imagen de la Twitter card; `robots: noindex, follow` en las dos páginas de éxito (además se les quitó el "— Viajes Vidaia" del title, que se duplicaba con el template — resto de M45); sección `## Equipo` en llms.txt con nombre, rol y bio completa de Lau y Jupe (autoría E-E-A-T).

> 🔄 **Item del seller resuelto 02/07/2026 (y de otra forma):** el usuario detectó en Rich Results Test que las páginas de itinerario mostraban **dos LocalBusiness / dos Organization** — uno completo (el del root layout) y otro casi vacío con warnings (telephone/priceRange/address/image missing). Causa: `offers.seller` creaba un nodo `TravelAgency` inline anónimo con solo `name`. Fix: `seller: { '@id': BASE_URL/#organization }` — referencia al Organization completo del layout, igual que ya hacía `provider`. Mejor que añadir `url` (lo propuesto originalmente): elimina el nodo duplicado en vez de rellenarlo.

**Problema:** Conjunto de propiedades de bajo coste con los datos ya disponibles (mismo espíritu que M40):

| Qué | Dónde |
|---|---|
| `@id` en `CollectionPage` (enlazable desde el `@graph`) | `lib/schema/buildCollectionPageSchema.ts` |
| ~~`url: BASE_URL` en `offers.seller`~~ ✅ resuelto vía `@id` (ver nota) | `lib/schema/buildTouristTripSchema.ts` |
| `image`/`description` en cada `TouristAttraction` de `includesAttraction` | `lib/schema/buildTouristDestinationSchema.ts` |
| `alt` en la imagen de la Twitter card (`images: [{ url, alt }]`) | `lib/helpers/seo.ts` |
| `robots: noindex, follow` en las páginas de éxito (precedente: M45 en `personalizar/[slug]`) | `app/[lang]/contacto/exito/page.tsx`, `app/[lang]/itinerarios/personalizar/exito/page.tsx` |
| Sección `## Equipo` (Lau y Jupe: nombre, rol, bio corta) para reforzar autoría E-E-A-T | `app/llms.txt/route.ts` |

**Solución:** Spreads condicionales de 1-3 líneas por item; sin cambios de datos.

---

### M59 — 🔴 Asset `ACTIVITIES.TODO_GLACIARES` referenciado pero inexistente
> ✅ COMPLETADO 02/07/2026 — Añadido a `assets.ts`. ⚠️ **Placeholder de Unsplash** (la misma foto que `ESTANCIA_CRISTINA_CALAFATE`, temática Lago Argentino/Upsala) — sustituir por foto real en el bucket de Supabase junto con el resto de actividades pendientes. Verificado también que `getAsset()` no revienta con claves inexistentes (cae a `/images/placeholder.jpg` con warning en dev) y que la actividad `todo-glaciares` aún no se usa en ningún itinerario.

**Problema:** `lib/data/activities.ts:269` referencia `imageKey: 'ACTIVITIES.TODO_GLACIARES'`, que no existe en `lib/data/assets.ts` (verificado por grep). Cualquier itinerario que incluya esa actividad ("Todo Glaciares: Traslados y Navegación") renderiza imagen rota o falla según el comportamiento de `getAsset()` con claves inexistentes.

**Solución:** Añadir el asset a `assets.ts` con URL + alt reales, o retirar la actividad si no se usa. Es además el caso de ejemplo perfecto para el validador de M62.

---

### M60 — 🟢 `SearchBar.tsx` es código muerto
> ✅ COMPLETADO 02/07/2026 — borrado. Recuperable del historial de git si algún día se quiere un buscador.

**Problema:** `components/ui/SearchBar.tsx` (111 líneas) no se importa desde ningún fichero (verificado por grep). Su submit es un `console.log` con TODO "conectar con búsqueda real o ruta /destinos".

**Solución:** Borrarlo. Si algún día se quiere buscador, se recupera del historial de git — mantenerlo "por si acaso" solo confunde (mismo criterio que M04 con supabase.ts).

---

### M61 — 🟡 Error boundaries con marca (`error.tsx` + `global-error.tsx`)
> ✅ COMPLETADO 02/07/2026 — `app/error.tsx` con el patrón visual de la 404 (degradado oscuro, i18n vía `staticContent.errorPage`, botón Reintentar con `reset()` + enlace a home). `app/global-error.tsx` con estilos inline y texto fijo en español — sustituye al root layout entero, así que no tiene providers ni CSS global disponibles. Para probarlos en dev: lanzar un `throw` temporal en cualquier página.

**Problema:** Existe `app/not-found.tsx` (M33) pero no `app/error.tsx` ni `app/global-error.tsx`. Un error de runtime muestra la pantalla genérica de Next.js sin logo, navegación ni recuperación.

**Solución:** Crear ambos como Client Components (requisito de Next.js) con el mismo tratamiento visual que la 404 (degradado `from-vidaia-charcoal to-vidaia-dark`), botón "Reintentar" (`reset()`) y enlaces a home/viajes. `global-error.tsx` debe incluir sus propios `<html>`/`<body>`.

---

### M62 — 🟡 Validación de integridad de los datos en build

**Problema:** Los ficheros de `lib/data/` se referencian por IDs/slugs/keys sin ninguna comprobación: trip → itinerario, itinerario → hoteles/actividades/destinos, `imageKey` → assets. Los errores solo aparecen en runtime (M59 es un caso real). La planificación de Supabase ya detectó dos más (A-01: actividades huérfanas; A-02: `referenceHotelId` incorrectos).

**Archivos afectados:** nuevo `scripts/validate-data.ts` + `package.json`

**Solución:** Script que cargue todos los ficheros de datos y verifique referencias cruzadas + `imageKey` contra `assets.ts` (y de propina: coordenadas numéricas válidas, slugs únicos). Engancharlo al build (`"build": "tsx scripts/validate-data.ts && next build"`) para que CI (M42) falle con un mensaje claro. Beneficio doble: deja los datos limpios para el seed de la migración Supabase.

---

### M63 — 🟡 Robustez y UX de formularios
> ✅ COMPLETADO 02/07/2026 — (1) Teléfono validado con `PHONE_RE` en `formSchema` (opcional: vacío OK) y `contactoSchema` (obligatorio), con error inline y mensaje `phoneInvalid` en staticContent. (2) Corrección del diagnóstico: el multistep **ya tenía** errores inline por campo (`FieldError` + `validationMessages`); solo faltaba el del teléfono. (3) `AbortSignal.timeout(12s)` en los fetch de los 3 formularios; los mensajes de error ya incluían el email de fallback. (4) ContactModal migrado a react-hook-form + `contactoSchema` (mismo schema cliente/servidor), con errores inline y `noValidate` — mismo patrón que presupuesto.

**Problema:** Cuatro gaps en el flujo de captura de leads (el activo más crítico del negocio):
1. `telefono` acepta cualquier string — sin regex de formato → teléfonos incontactables en el CRM (`lib/form-utils.ts`).
2. El multistep no muestra errores inline por campo — el usuario no sabe qué corregir (`FormularioPersonalizado/`).
3. Los `fetch` del cliente no tienen timeout ni mensaje de fallback con vía alternativa ("escríbenos a info@…") — si Vercel falla, el lead se pierde en silencio (`ContactModal.tsx:82-97`, `FormularioPersonalizado.tsx:126-152`).
4. `ContactModal` gestiona estado a mano con `useState` en vez de react-hook-form + Zod — inconsistente con presupuesto y sin validación cliente.

**Solución:** (1) `telefono: z.string().regex(/^\+?[\d\s\-()]{7,}$/, 'phoneInvalid')` + mensaje en `staticContent`; (2) `errors.campo?.message` bajo cada campo (RHF ya lo expone); (3) `AbortSignal.timeout(10_000)` + mensaje de error con email de contacto; (4) migrar ContactModal a RHF + el `contactoSchema` de M50 (compartido cliente/servidor).

---

### M64 — 🟢 Accesibilidad: focus trap, skip-link, sliders

**Problema:**
1. `ContactModal` enfoca el primer input y cierra con ESC (bien), pero no atrapa el foco (se puede tabular fuera del modal abierto) ni lo restaura al elemento disparador al cerrar.
2. Sin skip-link "Saltar a contenido" antes del Header — usuarios de teclado/lector atraviesan toda la navegación en cada página.
3. Dual range de `ViajesBuscador.tsx` — dos `<input type="range">` superpuestos sin `aria-label` con el valor actual.

**Solución:** (1) Focus trap manual (Tab/Shift+Tab en primer/último focusable) o `<dialog>` nativo + guardar/restaurar `document.activeElement`; (2) `<a href="#main-content" className="sr-only focus:not-sr-only ...">` en el root layout + `id="main-content"` en el main; (3) `aria-label={`Mínimo (${min} días)`}` / máximo en cada input.

---

### M65 — 🟢 DX: typecheck separado en CI + reglas ESLint
> ✅ COMPLETADO 02/07/2026 — `npx tsc --noEmit` añadido al CI entre lint y build. ESLint: `no-console: warn` con `allow: ['info', 'warn', 'error']` (los logs intencionados de las rutas pasaron a `console.info`; los `console.log` accidentales avisan). La warning que queda en SearchBar.tsx desaparecerá con M60.

**Problema:** CI (M42) corre `lint` → `build`; los errores de tipos solo aparecen mezclados en el build. ESLint usa solo `core-web-vitals` — sin `no-console` (habría cazado los logs de PII de M52).

**Archivos afectados:** `.github/workflows/ci.yml`, `eslint.config.mjs`

**Solución:** Paso `npx tsc --noEmit` entre lint y build; añadir `'no-console': ['warn', { allow: ['warn', 'error'] }]` al config de ESLint.

---

### M66 — 🟢 Tests mínimos de la lógica crítica

**Problema:** Cero tests en el proyecto. No bloquea el lanzamiento (el sitio es SSG y el build valida mucho), pero hay tres piezas de lógica pura donde una regresión sería silenciosa y cara.

**Solución:** Vitest (nativo con TS, sin config de Babel) con los tres suites de más valor/coste:
1. Schemas Zod de `lib/form-utils.ts` (+ los nuevos de M50) — payloads válidos/ inválidos/maliciosos.
2. `formatBestMonths()` de `contentHelpers.ts` — rangos, vuelta de año, año completo.
3. Conversión de fechas/timezone de `lib/services/clientify.ts`.

Añadir `npm test` al CI (M65). El validador de datos de M62 cubre el resto del terreno.
