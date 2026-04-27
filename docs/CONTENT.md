# Gestión de contenido — Viajes Vidaia

## Arquitectura de datos

```
lib/data/
  countries.ts      → países (Argentina, Chile, Bolivia)
  trips.ts          → tarjetas de viaje + tipos TripTag, TAG_CONFIG, RelatedTrip
  itineraries.ts    → itinerarios completos día a día (solo contenido)
  destinations.ts   → destinos/ciudades + tipo Country
  hotels.ts         → hoteles por destino
  activities.ts     → actividades por destino
  testimonials.ts   → testimonios de clientes

lib/services/
  countriesService.ts    → getCountries(), getCountryBySlug()
  tripsService.ts        → getTripsByCountry(), getFeaturedTrips(),
                           getHoneymoonTrips(), getTripBySlug(),
                           getRelatedTripsBySlug()
  itinerariesService.ts  → getItinerary(), getItineraryWithDetails(),
                           getItineraryWithTrip(), getAllItineraries()
  destinationsService.ts → getDestinationById()
  hotelsService.ts       → getHotelById()
  activitiesService.ts   → getActivityById()
  testimonialsService.ts → getFeaturedTestimonials()
```

---

## Añadir un país nuevo

Edita **`lib/data/countries.ts`** y añade un objeto al array:

```ts
{
  id: 'peru',
  slug: 'peru',
  name: 'Perú',
  flag: '🇵🇪',
  flagCode: 'pe',           // código ISO 3166-1 alpha-2 (para la imagen de bandera)
  description: 'Descripción del país...',
  heroImage: 'https://images.unsplash.com/...',
  heroAlt: 'Machu Picchu, Perú',
  active: true,             // false = no aparece en menú ni sitemap
  order: 4,                 // orden en el menú de destinos
  metaTitle: 'Viajes a Perú — Viajes Vidaia',
  metaDescription: 'Descripción SEO del país...',
}
```

La página `/destinos/peru` se genera automáticamente desde `app/destinos/[slug]/page.tsx`.
El país aparece en el menú, el footer y el sitemap sin tocar ningún otro archivo.

---

## Añadir un viaje (tarjeta)

### Campos obligatorios de Trip

```ts
{
  id: 'mi-nuevo-viaje',                 // kebab-case, único
  slug: 'mi-nuevo-viaje',               // igual que el id
  title: 'Título del viaje',
  subtitle: 'Ciudad A · Ciudad B · Ciudad C',
  country: 'argentina',                 // un país o array: ['argentina', 'chile']
  days: 10,                             // días totales
  nights: 9,                            // noches totales
  priceFrom: 3200,                      // precio referencia por persona en hab. doble
  image: 'https://images.unsplash.com/...',
  featured: false,                      // true = aparece en FeaturedDestinations (home)
  active: true,
  hasItinerary: false,                  // sin página propia de itinerario
  tags: ['naturaleza', 'aventura'],     // ver TRIP_TAGS en trips.ts
  includesFlightsInternational: true,
  includesFlightsInternal: false,
  relatedTrips: [],                     // array vacío si no hay relacionados
}
```

**Tags disponibles** (`TripTag`):
`naturaleza` · `vida-salvaje` · `aventura` · `relax` · `cultura` · `gastronomia`

**Campos opcionales**:
```ts
  honeymoonFeatured: true,              // aparece en /lunas-de-miel
  honeymoonTitle: 'Luna de Miel ...',
  honeymoonTagline: 'Tagline romántico...',
  season: 'all-year',                  // future — no se renderiza aún
  bestMonths: [3, 4, 10, 11],          // future — meses 1-12, no se renderiza aún
```

La tarjeta aparece en `/destinos/[country]` con tags y botón.
**No hay que tocar ningún otro archivo.**

---

### Viajes multi-país

Si el viaje recorre varios países, usa un array en `country`:

```ts
country: ['argentina', 'chile'],
```

El viaje aparece automáticamente en **ambas** páginas de país
(`/destinos/argentina` y `/destinos/chile`).

---

### Viajes relacionados

Cada viaje puede apuntar a otros viajes relacionados que se muestran
al final de la página de itinerario:

```ts
relatedTrips: [
  { slug: 'esencias-chile-isla-pascua', reason: 'Combina con paisajes únicos del Cono Sur' },
  { slug: 'patagonia-sur-a-norte',      reason: 'Profundiza en la Patagonia argentina' },
],
```

- `slug` debe coincidir con el `slug` de otro Trip activo.
- `reason` es el texto que aparece en la card con el icono 💡.
- Si el slug no existe o el trip está inactivo, la card se omite silenciosamente.

---

### Caso — Viaje con página de itinerario completa

Requiere dos pasos:

**1.** Añade la entrada en `trips.ts` con `hasItinerary: true`.

**2.** Añade el itinerario en **`lib/data/itineraries.ts`**:

```ts
{
  id: 'mi-nuevo-viaje',
  slug: 'mi-nuevo-viaje',         // debe coincidir con trips.ts
  title: 'Título completo del itinerario',
  description: 'Descripción del itinerario...',
  featured: true,                 // true = aparece en secciones "featured"
  active: true,
  heroImages: [
    { src: 'https://...', alt: 'Alt text', location: 'Nombre del lugar' },
  ],
  hotelStops: [
    {
      hotelByCategory: { '3': 'hotel-id-3', '4': 'hotel-id-4', '5': 'hotel-id-5' },
      nights: 3,
      dates: '17-20 sep',         // opcional, solo para display
      defaultCategory: 4,         // categoría base para el precio de referencia
    },
  ],
  days: [
    {
      dayNumber: 1,
      destinationId: 'el-calafate',
      dayType: 'transit',         // 'transit' | 'activity' | 'free'
      title: 'Llegada a El Calafate',
      description: 'Descripción del día...',
      schedule: 'Tarde libre',
      referenceHotelId: 'hotel-id-4',
      activities: [
        { activityId: 'id-actividad', status: 'included' },  // 'included' | 'optional'
      ],
    },
  ],
}
```

> **Nota**: `subtitle`, `priceFrom`, `days` y `nights` ya **no** van en `itineraries.ts`
> — vienen del Trip con el mismo slug.

La página `/itinerarios/mi-nuevo-viaje` se genera automáticamente.
**No hay que crear ningún archivo nuevo.**

> Si necesitas hoteles o actividades nuevas, añádelos antes en `hotels.ts` / `activities.ts`.

---

## Añadir un destino (ciudad)

Edita **`lib/data/destinations.ts`**:

```ts
{
  id: 'el-chalten',
  slug: 'el-chalten',
  name: 'El Chaltén',
  country: 'argentina',
  description: 'Descripción breve del destino.',
  image: 'https://images.unsplash.com/...',
  active: true,
}
```

Los destinos se referencian desde `itineraries.ts` (`destinationId`) y desde
`hotels.ts` / `activities.ts` (`destinationId`).

---

## Añadir un hotel

Edita **`lib/data/hotels.ts`**:

```ts
{
  id: 'mi-hotel',
  destinationId: 'el-calafate',   // debe existir en destinations.ts
  name: 'Nombre del Hotel',
  category: 4,                    // 3, 4 o 5
  categoryLabel: 'Boutique',      // opcional: Superior, Boutique, Lujo...
  image: 'https://images.unsplash.com/...',
  active: true,
}
```

---

## Añadir una actividad

Edita **`lib/data/activities.ts`**:

```ts
{
  id: 'mi-actividad',
  destinationId: 'ushuaia',
  name: 'Nombre de la actividad',
  description: 'Descripción detallada.',
  duration: '4 horas · Salida 09:00 hs',
  priceFrom: 85,    // solo para opcionales; omitir si es incluida
  active: true,
}
```

El campo `status` (`included` / `optional`) **no** va aquí — se asigna
por itinerario en `itineraries.ts` dentro de `days[].activities[]`.

---

## Añadir un testimonio

Edita **`lib/data/testimonials.ts`**:

```ts
{
  id: '4',
  name: 'Nombre Apellido',
  location: 'Ciudad, España',
  trip: 'Nombre del viaje realizado',
  rating: 5,
  image: '/images/testimonials/cliente-4.jpg',
  text: 'Texto del testimonio...',
  date: '2025-06',      // YYYY-MM
  active: true,
  featured: true,       // true = aparece en la home
}
```

Las fotos de clientes van en **`/public/images/testimonials/`**.

---

## Publicar / despublicar contenido

| Campo | Efecto |
|-------|--------|
| `country.active = false` | El país desaparece del menú, footer y sitemap |
| `trip.active = false` | El viaje no aparece en el listing del país |
| `itinerary.active = false` | La página del itinerario devuelve 404 |
| `trip.featured = false` | No aparece en FeaturedDestinations (home) |
| `trip.honeymoonFeatured = false` | No aparece en /lunas-de-miel |
| `testimonial.featured = false` | No aparece en la home |

---

## Rutas generadas automáticamente

| URL | Fuente de datos |
|-----|----------------|
| `/destinos/[slug]` | `countries.ts` → `generateStaticParams` |
| `/itinerarios/[slug]` | `itineraries.ts` → `generateStaticParams` |
| `/sitemap.xml` | `app/sitemap.ts` lee countries + itineraries activos |

Para añadir un país o itinerario y que aparezca en el sitemap, menú y footer,
solo hay que añadir la entrada en el archivo de datos con `active: true`.
No hay que crear páginas ni tocar rutas.
