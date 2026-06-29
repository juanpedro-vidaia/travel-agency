# Viajes Vidaia — Web

Sitio web de Viajes Vidaia, agencia boutique especializada en viajes personalizados a Argentina, Chile, Bolivia, Perú y Uruguay. Construido con Next.js 16 (App Router), todos los contenidos son datos estáticos en TypeScript sin base de datos externa activa.

---

## Stack técnico

| Tecnología | Versión | Uso |
|---|---|---|
| Next.js | ^16.2.6 | Framework (App Router, SSG) |
| React | ^19.0.0 | UI |
| TypeScript | ^5 | Tipado |
| Tailwind CSS | ^3.4.17 | Estilos |
| `react-hook-form` | ^7.75.0 | Formularios |
| `zod` | ^4.4.3 | Validación de esquemas |
| `@hookform/resolvers` | ^5.2.2 | Integración zod + react-hook-form |
| `react-markdown` + `remark-gfm` | ^10.1.0 / ^4.0.1 | Renderizado de Markdown en blog |
| `leaflet` + `@types/leaflet` | ^1.9.4 | Mapa interactivo en itinerarios |
| `lucide-react` | ^0.487.0 | Iconos |
| `@tailwindcss/typography` | ^0.5.19 | Estilos para contenido Markdown |
| `resend` | ^6.12.4 | Envío de emails de notificación de formularios |

---

## Requisitos previos

- Node.js 24 (fijado en `.nvmrc`; alinea local / CI / Vercel)
- npm >= 10

---

## Instalación y desarrollo local

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd travel-agency

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con los valores reales

# 4. Arrancar el servidor de desarrollo
npm run dev
# → http://localhost:3000
```

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Build de producción (SSG) |
| `npm run start` | Servidor de producción (requiere `build` previo) |
| `npm run lint` | Linter (ESLint + Next.js rules) |

---

## Variables de entorno

Crear `.env.local` en la raíz con las siguientes variables:

```bash
# Analytics (Google Analytics 4)
# Opcional: si no se define, GA4 simplemente no carga
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Email — Resend (activo)
# Notificaciones de formularios; remitente web@viajesvidaia.com (dominio verificado en Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# CRM — Clientify (activo)
# Token de la API para registrar los leads de los formularios
VV_CLIENTIFY_API_TOKEN=xxxxxxxxxxxxxxxx
```

Las variables con prefijo `NEXT_PUBLIC_` se exponen al cliente. Las demás son solo servidor.
La lista completa y al día está en `.env.example`.

> Si falta alguna variable, la integración correspondiente se omite con un `console.warn` y el resto del flujo sigue funcionando. Ver `docs/MEJORAS.md` — M01.

---

## Estructura de carpetas

```
travel-agency/
├── app/                          # Páginas (Next.js App Router)
│   ├── [lang]/                   # Rutas dinámicas por idioma (/es/...)
│   │   ├── page.tsx              # Home
│   │   ├── viajes/               # Página de viajes
│   │   ├── destinos/[slug]/      # Página de país (Argentina, Chile...)
│   │   ├── itinerarios/          # Itinerarios y formulario de personalización
│   │   ├── lunas-de-miel/        # Página de lunas de miel
│   │   ├── blog/                 # Listado y detalle de posts
│   │   ├── privacidad/           # Política de privacidad
│   │   ├── cookies/              # Política de cookies
│   │   └── aviso-legal/          # Aviso legal
│   ├── api/forms/                # API Routes para formularios
│   │   ├── contacto/             # Formulario de contacto
│   │   ├── newsletter/           # Suscripción al newsletter
│   │   └── presupuesto/          # Solicitud de presupuesto
│   ├── layout.tsx                # Layout raíz con providers
│   ├── sitemap.ts                # Generación automática del sitemap
│   └── robots.ts                 # Robots.txt
│
├── components/                   # Componentes React
│   ├── layout/                   # Header y Footer
│   ├── sections/                 # Secciones de página (Hero, Blog, etc.)
│   ├── forms/                    # Formularios y modal de contacto
│   ├── ui/                       # Componentes UI reutilizables
│   └── scripts/                  # Analytics, consent, JSON-LD
│
├── lib/                          # Lógica y datos
│   ├── data/                     # Datos estáticos del proyecto
│   ├── services/                 # Funciones de acceso a datos
│   ├── helpers/                  # Utilidades (SEO, contenido, precios)
│   ├── config/                   # Configuración de idiomas
│   ├── context/                  # Contexts React (Language, Modal, Consent)
│   └── hooks/                    # Custom hooks
│
├── public/                       # Assets estáticos
│   ├── images/logo/              # Logos de Viajes Vidaia
│   └── favicon.png
│
├── docs/                         # Documentación técnica
│   ├── AUDITORIA.md
│   ├── MEJORAS.md
│   ├── ARQUITECTURA.md
│   ├── CONTENT.md                # Guía de gestión de contenido (añadir país/viaje/post…)
│   ├── IMAGENES.md               # Estrategia de imágenes (sizes, assets)
│   └── DECISIONS.md
│
├── tailwind.config.ts            # Colores y tipografía personalizada
├── tsconfig.json
└── package.json
```

---

## Guías de contenido

### Cómo añadir un país nuevo

1. **Añadir el país en `lib/data/countries.ts`:**
   ```typescript
   {
     id: 'colombia',
     slug: 'colombia',
     content: {
       es: {
         name: 'Colombia',
         description: '...',
         heroAlt: 'Cartagena de Indias, Colombia',
         metaDescription: '...',   // SIN la marca: el title se genera por plantilla (ver D23)
       }
     },
     flag: '🇨🇴',
     flagCode: 'co',
     heroImageKey: 'COUNTRIES.COLOMBIA_HERO',
     active: true,
     order: 5,
     lat: 4.5709,
     lng: -74.2973,
   }
   ```

2. **Añadir los assets en `lib/data/assets.ts`:**
   ```typescript
   'FLAGS.CO': { url: 'https://flagcdn.com/20x15/co.png', alt: 'Colombia' },
   'COUNTRIES.COLOMBIA_HERO': { url: 'https://...', alt: 'Cartagena de Indias' },
   'DESTINATIONS_CARD_COLOMBIA': { url: 'https://...', alt: 'Paisajes de Colombia' },
   ```

3. **El país aparecerá automáticamente en:**
   - Menú de navegación (dropdown de destinos)
   - `DestinationsSection` (home y viajes)
   - Sitemap (`app/sitemap.ts`)
   - `generateStaticParams` de `destinos/[slug]/page.tsx`

4. **Añadir destinos del país en `lib/data/destinations.ts`** (opcional, mejora la UI de las cards).

5. **Añadir viajes asociados en `lib/data/trips.ts`** (opcional, para que aparezcan en la página del país).

---

### Cómo añadir un itinerario nuevo

1. **Añadir el viaje (Trip) en `lib/data/trips.ts`:**
   ```typescript
   {
     id: 'colombia-caribena',
     slug: 'colombia-caribena',
     country: ['colombia'],       // o array si abarca varios países
     content: {
       es: {
         title: 'Colombia Caribeña',
         subtitle: 'Cartagena, Santa Marta y Tayrona',
       }
     },
     imageKey: 'TRIPS.COLOMBIA_CARIBENA',
     days: 10,
     nights: 9,
     priceFrom: 2800,
     tags: ['culture', 'nature'],
     active: true,
     featured: false,
   }
   ```

2. **Añadir el itinerary (detalle día a día) en `lib/data/itineraries.ts`:**
   Solo necesario si quieres la página de itinerario detallada. Si `active: true` en el trip pero no hay itinerary, el TripCard muestra el botón "Solicitar información" en lugar de "Ver itinerario".

3. **Añadir el asset de imagen en `lib/data/assets.ts`:**
   ```typescript
   'TRIPS.COLOMBIA_CARIBENA': { url: 'https://...', alt: 'Colombia Caribeña' },
   ```

4. **El itinerario aparecerá automáticamente en:**
   - Página del país correspondiente (`/es/destinos/colombia`)
   - Buscador de viajes (`/es/viajes`)
   - Sitemap

---

### Cómo añadir un post de blog

1. **Añadir el post en `lib/data/posts.ts`:**
   ```typescript
   {
     slug: 'guia-cartagena',
     content: {
       es: {
         title: 'Guía de Cartagena de Indias',
         excerpt: 'Todo lo que necesitas saber...',
         content: `## Introducción\n\nCartagena es...`,  // Markdown
         imageAlt: 'Murallas de Cartagena de Indias',
         metaDescription: '...',   // metaTitle opcional y SIN marca: el title lo da el template (ver D23)
       }
     },
     imageKey: 'BLOG.GUIA_CARTAGENA',
     date: '2026-06-01',           // ISO date
     category: 'inspiration',      // POST_CATEGORIES
     tags: ['colombia', 'caribe'],
     readingTime: 6,               // minutos (estimado manual)
     featured: false,
     active: true,
   }
   ```

2. **Añadir el asset de imagen en `lib/data/assets.ts`:**
   ```typescript
   'BLOG.GUIA_CARTAGENA': { url: 'https://...', alt: 'Murallas de Cartagena' },
   ```

3. **El post aparecerá automáticamente en:**
   - Listado del blog (`/es/blog`)
   - Sitemap
   - `BlogSection` en home (si `featured: true` y está entre los 3 más recientes)

---

## Estado del proyecto

### En producción

- Sitio web completo con páginas de destinos (Argentina, Chile, Bolivia, Perú, Uruguay)
- Itinerarios detallados con mapa interactivo y acordeón día a día
- Blog con posts en Markdown
- Página de lunas de miel
- Formulario de personalización de viajes (multi-step) → Clientify (CRM) + email (Resend)
- Modal de contacto y newsletter → Clientify + email
- Sistema de cookies y consentimiento (RGPD)
- Google Analytics 4 (con consentimiento previo)
- Reseñas de Google vía widget de Elfsight (home y /viajes)
- Feed de Instagram vía widget de LightWidget
- SEO: sitemap, robots.txt, Open Graph, Twitter Card, JSON-LD (TravelAgency, WebSite, TouristTrip, Article, BreadcrumbList, CollectionPage)

### Pendiente de activar

| Integración | Estado | Qué falta |
|---|---|---|
| **Cutover de dominio** | Pendiente | Apuntar `viajesvidaia.com` a Vercel + `REDIRECT_VERCEL_TO_CANONICAL=true` (ver D24) |
| **Idioma inglés** | Infraestructura lista | Completar traducciones en `staticContent.ts` (ver M13) |

> Resend y Clientify ya están **activos** (ver `docs/MEJORAS.md` — M01); requieren `RESEND_API_KEY` y `VV_CLIENTIFY_API_TOKEN` en las env vars de producción.

---

## Documentación técnica

- [Arquitectura del proyecto](docs/ARQUITECTURA.md)
- [Decisiones técnicas](docs/DECISIONS.md)
- [Auditoría de código](docs/AUDITORIA.md)
- [Lista de mejoras](docs/MEJORAS.md)
