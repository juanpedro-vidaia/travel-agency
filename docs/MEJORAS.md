# Mejoras — Viajes Vidaia

> Lista accionable priorizada. Todo referenciado a ficheros reales del proyecto.

---

## 🔴 Urgente

### M01 — Los formularios no envían datos a ningún destino
> ✅ CLIENTIFY COMPLETADO 23/05/2026 — PENDIENTE RESEND (bloqueado por DNS y RESEND_API_KEY)

**Problema:** Los tres endpoints de formulario (`/api/forms/contacto`, `/api/forms/newsletter`, `/api/forms/presupuesto`) aceptan los datos, validan y devuelven `{ ok: true }`, pero **solo escriben en `console.log`**. El equipo no recibe ninguna notificación de los formularios enviados en producción.

**Archivos afectados:**
- `app/api/forms/contacto/route.ts` (líneas 29-49)
- `app/api/forms/newsletter/route.ts` (líneas 22-42)
- `app/api/forms/presupuesto/route.ts` (líneas 23-65)

**Solución:** Activar Resend (email de notificación) y Clientify (CRM):
1. Añadir `RESEND_API_KEY` a las variables de entorno
2. Añadir `CLIENTIFY_API_KEY` a las variables de entorno
3. En cada route, descomentar los bloques marcados con `// TODO: Activate`
4. Instalar el paquete `resend`: `npm install resend`


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

## 🟡 Importante

### M04 — Eliminar `lib/supabase.ts` y dependencia `@supabase/supabase-js`

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
> ✅ YA ESTABA IMPLEMENTADO — script JSON-LD Article presente en blog/[slug]/page.tsx antes de esta sesión

**Problema:** Los posts del blog no tienen structured data de tipo `Article`. Esto reduce la visibilidad en Google News y los rich results de artículos.

**Archivos afectados:**
- `app/[lang]/blog/[slug]/page.tsx`

**Solución:** En el `generateMetadata` del post, añadir un componente `<JsonLd>` con el schema de `Article` (se puede reutilizar el componente ya existente `components/scripts/JsonLd.tsx`).

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

## 🟢 Nice to have

### M13 — `STATIC_CONTENT.en` — completar o eliminar el bloque parcial

**Problema:** El bloque `en` en `staticContent.ts` solo tiene las páginas legales (~450 líneas) pero faltan todas las secciones funcionales. Mientras inglés esté desactivado es inofensivo, pero puede confundir.

**Solución:** Si no hay planes inminentes de activar inglés, mover el bloque `en` a un fichero separado `staticContent.en.ts` y no importarlo hasta que esté completo.

---

### M14 — `ViajesBuscador.tsx` (351 líneas) — extraer subcomponentes

**Problema:** Mezcla lógica de filtrado y presentación.

**Solución:** Extraer `TripSearchFilters.tsx` (los controles de filtro) y dejar el buscador como controlador de estado que pasa props a los subcomponentes.

---

### M15 — Añadir JSON-LD de tipo `TouristTrip` en páginas de itinerarios
> ✅ YA ESTABA IMPLEMENTADO — script JSON-LD TouristTrip presente en blog/[slug]/page.tsx antes de esta sesión

**Solución:** Añadir en `app/[lang]/itinerarios/[slug]/page.tsx` un JSON-LD con el schema `TouristTrip` o `Product` con precio desde y destinos. Mejora los rich results de Google para búsquedas de viajes.

---

### M16 — Instagrambanner: preparar integración con widget real

**Problema:** Las 6 fotos del `InstagramBanner` son fotos estáticas de Unsplash, no el Instagram real. Hay un comentario con un div de Elfsight placeholder que nunca se activa.

**Solución:** Cuando se integre el widget de Instagram (Elfsight, SnapWidget, o Instagram Graph API), el componente ya tiene el placeholder comentado. Solo hay que reemplazar el grid de fotos estáticas.

---

### M17 — Alt de fotos de equipo más descriptivo

**Problema:** Las fotos de Lau y Jupe usan `alt={person.name}` (solo el nombre).

**Solución:** Usar `alt={`${person.name}, ${person.role}`}` para mejor accesibilidad.

---

### M18 — Crear página de éxito genérica para el formulario de contacto

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
> ✅ PARCIALMENTE COMPLETADO 25/05/2026 — url_mobile implementado en Hero.tsx, ViajesHero.tsx, ItineraryHeroCarousel.tsx (todos Client Components).

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
