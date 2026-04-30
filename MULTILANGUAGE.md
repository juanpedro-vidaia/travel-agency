# Guía: Añadir un nuevo idioma

## Infraestructura actual

El sistema de i18n está completamente preparado. Solo ES está activo; EN y CAT están definidos pero comentados.

```
lib/config/languages.config.ts   ← fuente de verdad de idiomas
lib/data/i18n.ts                 ← tipos y validación
lib/context/LanguageContext.tsx  ← provider global (localStorage)
lib/hooks/useLanguage.ts         ← hook de consumo
components/LanguageSwitch.tsx    ← selector (invisible con 1 solo idioma)
```

---

## Pasos para activar un idioma nuevo (ej. Inglés)

### 1. Descomentar en `languages.config.ts` (2 min)

```ts
// lib/config/languages.config.ts
en: {
  code: 'en',
  name: 'English',
  nativeName: 'English',
  flag: '🇬🇧',
  enabled: true,   // ← cambiar a true
  default: false,
  locale: 'en-US',
},
```

### 2. Traducir `lib/data/staticContent.ts` (30–60 min)

`STATIC_CONTENT.en` ya existe con las páginas legales. Hay que completar el resto de secciones siguiendo la misma estructura que `es`:

```ts
export const STATIC_CONTENT = {
  es: { /* completo */ },
  en: {
    header: { nav: { home: 'Home', destinations: 'Destinations', ... } },
    footer: { ... },
    home: { hero: { title: '...', description: '...' } },
    valueProposition: { header: { ... } },
    quienesSomos: { header: { ... }, landscapePhoto: { ... }, teamMembers: [...] },
    featuredDestinations: { header: { ... }, callToAction: '...' },
    testimonialsSection: { header: { ... } },
    instagramBanner: { header: { ... }, callToAction: '...', instagramUrl: '...' },
    blogSection: { header: { ... }, callToAction: '...' },
    ctaSection: { ... },
    itineraryPage: { ... },
    destinationPage: { ... },
    honeymoonPage: { ... },
    quotePage: { ... },
    privacyPage: { ... },   // ya existe
    cookiesPage: { ... },   // ya existe
    legalNoticePage: { ... }, // ya existe
  },
}
```

`COMMON_UI.en` ya está completo.

### 3. Traducir datos (30 min por idioma)

Los datos con contenido multilingüe usan `content: { es: T, en?: T }`. Para que los componentes muestren el idioma correcto, añade `en` a cada entrada:

**`lib/data/trips.ts`** — `content.en.title`, `content.en.subtitle`
**`lib/data/itineraries.ts`** — `content.en` en cada itinerario y día
**`lib/data/countries.ts`** — `content.en.name`, `content.en.description`
**`lib/data/destinations.ts`** — `content.en.name`, `content.en.description`
**`lib/data/hotels.ts`** — `content.en.name`, `content.en.categoryLabel`
**`lib/data/activities.ts`** — `content.en.name`, `content.en.description`
**`lib/data/testimonials.ts`** — `content.en.text`, `content.en.name`, etc.
**`lib/data/posts.ts`** — `content.en.title`, `content.en.excerpt`, etc.

Los componentes ya usan el patrón:
```ts
const t = item.content[language as keyof typeof item.content] ?? item.content.es
```
No hay que tocar el código de los componentes.

### 4. Traducir `Hero.tsx` — región (2 min)

```ts
// components/Hero.tsx
const regionContent: Record<string, ...> = {
  es: [
    { flagKey: 'FLAGS.AR', countryName: 'Argentina' },
    ...
  ],
  en: [                          // ← añadir
    { flagKey: 'FLAGS.AR', countryName: 'Argentina' },
    { flagKey: 'FLAGS.CL', countryName: 'Chile' },
    { flagKey: 'FLAGS.BO', countryName: 'Bolivia' },
  ],
}
```

### 5. Traducir `ValueProposition.tsx` — cards (5 min)

Las cards tienen contenido local en el array `valuePropositionItems`. Añadir `en: { title, description }` a cada ítem y usar `item[language] ?? item.es` en el render. O mover el contenido a `STATIC_CONTENT.en.valueProposition.items`.

### 6. Verificar

```bash
npm run type-check   # debe pasar sin errores
npm run build        # debe compilar sin warnings
```

El `LanguageSwitch` aparecerá automáticamente en el Header cuando `enabled: true`.

---

## Páginas con metadata (cuando haya 2+ idiomas)

Las páginas con `export const metadata` son Server Components y no pueden usar `useLanguage()`. Al activar un segundo idioma hay que dividirlas:

```
app/privacidad/page.tsx         → mantener Server (metadata) + crear PrivacidadContent.tsx (client)
app/aviso-legal/page.tsx        → mismo patrón
app/cookies/page.tsx            → mismo patrón
app/presupuesto/page.tsx        → mismo patrón
app/lunas-de-miel/page.tsx      → mismo patrón
app/destinos/[slug]/page.tsx    → usar generateMetadata() con lang
```

O bien, adoptar rutas con prefijo de idioma (`/es/...`, `/en/...`) usando `app/[lang]/`.

---

## Añadir Catalán (CAT)

Mismo proceso. En `languages.config.ts`:

```ts
cat: {
  code: 'cat',
  name: 'Català',
  nativeName: 'Català',
  flag: '🏴',
  enabled: true,
  default: false,
  locale: 'ca-ES',
},
```

---

## Checklist rápido

```
[ ] languages.config.ts — enabled: true para el nuevo idioma
[ ] staticContent.ts    — STATIC_CONTENT[lang] completo
[ ] trips.ts            — content.en en cada viaje
[ ] itineraries.ts      — content.en en cada itinerario y día
[ ] countries.ts        — content.en en cada país
[ ] destinations.ts     — content.en en cada destino
[ ] hotels.ts           — content.en en cada hotel
[ ] activities.ts       — content.en en cada actividad
[ ] testimonials.ts     — content.en en cada testimonio
[ ] posts.ts            — content.en en cada post
[ ] Hero.tsx            — regionContent[lang]
[ ] ValueProposition    — items con contenido en nuevo idioma
[ ] npm run build       — sin errores
[ ] Testing manual      — cambiar idioma y navegar todas las páginas
```
