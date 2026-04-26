# Gestión de contenido — Viajes Vidaia

## Añadir un nuevo viaje

### Caso 1 — Solo tarjeta de viaje (lo más común)

Edita **`lib/data/trips.ts`** y añade un objeto al array:

```ts
{
  id: 'mi-nuevo-viaje',           // kebab-case, único
  slug: 'mi-nuevo-viaje',         // igual que el id
  title: 'Título del viaje',
  subtitle: 'Ciudad A · Ciudad B · Ciudad C',
  country: 'argentina',           // 'argentina' | 'chile' | 'bolivia'
  days: 10,
  priceFrom: 3200,                // precio por persona en hab. doble
  image: 'https://images.unsplash.com/...',
  featured: false,                // true = aparece en FeaturedDestinations (home)
  active: true,
  hasItinerary: false,            // sin página propia de itinerario
  honeymoonFeatured: false,       // true = aparece en /lunas-de-miel
  // honeymoonTitle: 'Luna de Miel ...',    // solo si honeymoonFeatured: true
  // honeymoonTagline: 'Tagline ...',       // solo si honeymoonFeatured: true
}
```

La tarjeta aparece automáticamente en `/destinos/[country]` y el botón
enlaza a `/presupuesto-itinerario?titulo=...`. **No hay que tocar ningún otro archivo.**

---

### Caso 2 — Viaje con página de itinerario completa

Requiere tres pasos:

**1.** Añade la entrada en `trips.ts` con `hasItinerary: true`.

**2.** Añade el itinerario en **`lib/data/itineraries.ts`**:
- `hotelStops[]` — un stop por destino, con `hotelByCategory` y `nights`
- `days[]` — un objeto por día con `activities[]` referenciando IDs del catálogo
- Si necesitas hoteles o actividades nuevas, añádelos antes en `hotels.ts` / `activities.ts`

**3.** Crea la página:
```
app/itinerarios/[slug]/page.tsx
```
Copia `app/itinerarios/paisajes-naturales-argentina/page.tsx` y cambia solo:
```ts
const SLUG = 'mi-nuevo-viaje'
```
Todo (carrusel, acordeón, hoteles, opcionales, precio) se genera automáticamente.

---

## Añadir un testimonio

Edita **`lib/data/testimonials.ts`** y añade un objeto al array:

```ts
{
  id: '4',                         // número siguiente en secuencia
  name: 'Nombre Apellido',
  location: 'Ciudad, España',
  trip: 'Nombre del viaje realizado',
  rating: 5,                       // 1-5
  image: '/images/testimonials/cliente-4.jpg',  // foto real o URL Unsplash
  text: 'Texto del testimonio...',
  date: '2025-06',                 // YYYY-MM
  active: true,
  featured: true,                  // true = aparece en la home
}
```

Las fotos de clientes van en **`/public/images/testimonials/`**.

Los testimonios con `featured: true` aparecen en la sección de la home.
Los testimonios con `active: false` están ocultos sin borrarlos.

---

## Añadir un hotel nuevo

Edita **`lib/data/hotels.ts`**:

```ts
{
  id: 'mi-hotel',           // kebab-case, único
  destinationId: 'el-calafate',   // debe existir en destinations.ts
  name: 'Nombre del Hotel',
  category: 4,              // 3, 4 o 5 estrellas
  categoryLabel: 'Boutique',      // opcional: Superior, Boutique, Lujo...
  image: 'https://images.unsplash.com/...',
  active: true,
}
```

---

## Añadir una actividad nueva

Edita **`lib/data/activities.ts`**:

```ts
{
  id: 'mi-actividad',
  destinationId: 'ushuaia',
  name: 'Nombre de la actividad',
  description: 'Descripción detallada.',
  duration: '4 horas · Salida 09:00 hs',
  priceFrom: 85,          // solo para opcionales; omitir si es incluida
  active: true,
}
```

El campo `status` (`included` / `optional`) **no** va aquí —
se asigna por itinerario en `itineraries.ts` dentro de `days[].activities[]`.

---

## Añadir un destino nuevo

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
