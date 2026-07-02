# Auditoría completa — Viajes Vidaia (02/07/2026)

> Análisis del proyecto en tres ejes: **Seguridad**, **SEO/GEO** y **Mejoras generales**.
> Cada hallazgo accionable tiene su entrada correspondiente en `MEJORAS.md` (sección "Auditoría completa 02/07/2026", items **M49–M66**).

---

## Resumen ejecutivo

El proyecto está en buen estado general: la mayor parte del trabajo de SEO técnico, indexación y hardening básico ya se hizo en sesiones anteriores (M32–M48) y esta auditoría lo confirma — de los ~15 items SEO cerrados, solo uno quedó incompleto (el `twitter.site` del root layout).

**El gap más importante está en los endpoints de formulario.** El endpoint de contacto no valida ninguna entrada, y los tres endpoints interpolan datos del usuario en el HTML de los emails sin escapar. No es explotable contra visitantes de la web (los emails van solo al equipo), pero permite a un bot inyectar contenido arbitrario en los emails internos y meter basura en el CRM.

**Prioridades pre-PROD** (encajan en el roadmap de principios de julio):

1. 🔴 **M49 + M50** — Escapar HTML en emails y validar con Zod contacto/newsletter (½ día en total).
2. 🔴 **M59** — Asset `ACTIVITIES.TODO_GLACIARES` inexistente → imagen rota en itinerarios que incluyan esa actividad.
3. 🟡 **M51 + M52** — Honeypot anti-spam y dejar de loggear PII (los logs de Vercel guardan hoy nombre, email y teléfono de cada lead).
4. 🟢 **M55** — Quitar el `twitter.site` huérfano (1 línea, remate de M47).

El resto son mejoras incrementales sin urgencia. Todo lo demás que se auditó (headers, secrets, proxy, robots, canonicals, schemas) está correcto — ver las subsecciones "Bien hecho".

---

## Metodología y alcance

- **Fecha:** 02/07/2026, sobre la rama `develop` (commit `5f3fadd`).
- **Alcance:** `app/` (rutas, API routes, metadata), `lib/` (datos, servicios, schemas, helpers), `components/`, `proxy.ts`, `next.config.ts`, CI (`.github/workflows/ci.yml`), dependencias (`npm audit`), gestión de secretos.
- **Método:** exploración con 3 agentes en paralelo (uno por eje) + **verificación manual contra el código de todos los hallazgos relevantes** antes de documentarlos (lección de M31: las auditorías generan falsos positivos; los descartados se listan explícitamente abajo).
- **Fuera de alcance:** verificaciones que requieren el deploy en producción (siguen en M47) y la carpeta `/supabase/` de la migración (planificación, no código activo).

---

## 1. Seguridad

### 1.1 Hallazgos

#### 🔴 S1 — `/api/forms/contacto` no valida ninguna entrada → **M50**

`app/api/forms/contacto/route.ts:24` hace `await request.json() as ContactoPayload` — un cast de TypeScript, no una validación. Cualquier payload JSON llega tal cual a Clientify (CRM) y al email del equipo. Contrasta con presupuesto, que sí valida con Zod (`formSchema.safeParse`, `presupuesto/route.ts:14`). El newsletter está a medias: valida presencia y una regex de email laxa, pero `full_name` no tiene límites de longitud ni tipo garantizado (`newsletter/route.ts:10-17`).

Consecuencias: campos arbitrarios/enormes al CRM, `replyTo` sin validar (mitigado aguas abajo por Resend, pero no debería salir de aquí sin validar), y habilita el hallazgo S2.

**Fix:** schema Zod por endpoint, mismo patrón que presupuesto. Detalle en M50.

#### 🔴 S2 — Inyección de HTML en las plantillas de email → **M49**

Los tres endpoints interpolan input del usuario directamente en el HTML del email de notificación, sin escape de entidades:

- `app/api/forms/contacto/route.ts:8-17` — `full_name`, `email`, `phone`, `message`, etc. en `buildEmailHtml()`.
- `app/api/forms/newsletter/route.ts:26` — `full_name` y `email` en el `<p>` inline.
- `lib/form-utils.ts` — `buildPresupuestoEmailHtml()`: `nombre`, `email` (también dentro de `href="mailto:..."`), `idea` (con `.replace(/\n/g, '<br>')`).

Ejemplo: `nombre = "Juan</td></tr><tr><td colspan='2'><a href='https://phishing.example'>..."` reescribe la tabla del email. Los clientes de correo no ejecutan JS, así que no es XSS clásico, pero sí permite suplantar contenido en los emails internos del equipo (vector de phishing dirigido) y romper el render.

**Fix:** helper `escapeHtml()` compartido aplicado a todo valor de usuario en las tres plantillas. Detalle en M49.

#### 🟡 S3 — PII completa en los logs → **M52**

- `contacto/route.ts:37` — `console.log('[Contacto] ...', JSON.stringify(data, null, 2))`: el lead completo (nombre, email, teléfono, mensaje) queda en los logs de Vercel.
- `presupuesto/route.ts:35-42` — loggea nombre y email.
- `newsletter/route.ts:29` — loggea nombre y email.
- `lib/services/clientify.ts:124,177,283` — los errores incluyen el cuerpo completo de la respuesta de Clientify (puede ecoar datos del contacto).

Los logs de Vercel son accesibles a todo el equipo del proyecto y se retienen. Para GDPR es dato personal fuera del registro de tratamiento.

**Fix:** loggear solo identificadores no personales (origen, itinerario, timestamp) y códigos de estado. Detalle en M52.

#### 🟡 S4 — Sin protección anti-spam/abuso en los formularios → **M51**

Los tres endpoints son públicos (correcto, no hay sesión) pero sin ninguna fricción para bots: ni honeypot, ni rate limiting, ni CAPTCHA. Un bot puede inundar Clientify de contactos falsos y quemar cuota de Resend.

**Fix por fases:** honeypot (coste cero de UX) → rate limit básico por IP → Turnstile solo si el spam real lo justifica. Detalle en M51.

#### 🟡 S5 — Dependencias: 3 vulnerabilidades moderate → **M53**

`npm audit` (02/07/2026):

| Paquete | Vía | Severidad | Fix |
|---|---|---|---|
| `js-yaml` 4.0.0–4.1.1 | transitiva (tooling) | moderate (DoS cuadrático) | `npm audit fix` (no breaking) |
| `postcss` <8.5.10 | **bundled dentro de `next`** | moderate (XSS en stringify de CSS) | actualizar Next a un patch que lo incluya — **NO** usar `npm audit fix --force` (propone un downgrade absurdo a next@9) |

El de postcss solo afecta al build (no procesa input de usuario), riesgo real bajo. Detalle en M53.

#### 🟢 S6 — Sin Content-Security-Policy → **M54**

Los headers de M36 están en su sitio (verificado en `next.config.ts`): `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`. Falta CSP, que es la única defensa en profundidad contra inyección de scripts. No es trivial aquí: hay que permitir GA4, Elfsight, LightWidget, Clientify, Supabase Storage y los estilos inline de `experimental.inlineCss`. Empezar en modo `Content-Security-Policy-Report-Only`. HSTS lo pone Vercel. Detalle en M54.

### 1.2 Bien hecho (no tocar)

- **Secretos:** `.env.local` en `.gitignore` y fuera del historial de git (verificado con `git ls-files`); solo `.env.example` trackeado. Las claves de servidor (`RESEND_API_KEY`, `VV_CLIENTIFY_API_TOKEN`) nunca se exponen al cliente; el único `NEXT_PUBLIC_` sensible es el GA4 measurement ID, que es público por diseño.
- **`proxy.ts`:** sin open redirect (usa el constructor `URL`, no concatenación); `X-Robots-Tag: noindex` en no-producción; el redirect de `*.vercel.app` gateado tras `REDIRECT_VERCEL_TO_CANONICAL` (correcto hasta el cutover de dominio).
- **`next.config.ts`:** `images.remotePatterns` sin wildcards (hostnames exactos, solo HTTPS); headers de M36.
- **CI:** `actions/checkout@v4` / `setup-node@v4`, trigger `pull_request` estándar (sin `pull_request_target`), sin secretos en el workflow.
- **Consentimiento:** GA4 solo carga tras consentimiento explícito (`ConsentContext`), estado versionado, cookies `samesite=lax`.
- **Resiliencia:** `fetchWithTimeout()` (10 s) en Clientify y Resend; el email es best-effort y no rompe el alta del lead.
- **Presupuesto:** validación Zod completa con checkbox GDPR obligatorio (`privacidad: z.literal(true)`).

### 1.3 Falsos positivos descartados (para futuras auditorías)

| Señalado como | Por qué se descarta |
|---|---|
| Email header injection (CRLF en `replyTo`) | El `.email()` de Zod (presupuesto) y la regex `[^\s@]` del newsletter rechazan cualquier whitespace, incluido `\r\n`. Solo contacto estaba expuesto — y por no validar nada, que es S1/M50, no un problema de headers. Además Resend construye el mensaje vía API JSON, no SMTP crudo. |
| `dangerouslySetInnerHTML` en `JsonLd.tsx` | Es el patrón recomendado por Next.js para JSON-LD; `JSON.stringify` no produce HTML ejecutable. Decisión ya documentada en DECISIONS.md. |
| XSS vía ReactMarkdown en el blog | ReactMarkdown no renderiza HTML crudo por defecto y el contenido es estático propio (`lib/data/posts.ts`). Reevaluar solo si algún día el contenido viene de fuentes no confiables (p. ej. CMS con editores externos). |
| GA4 measurement ID expuesto | Es público por diseño de GA4; la mitigación es filtrar tráfico anómalo en la UI de GA. |

---

## 2. SEO / GEO

### 2.1 Verificación del trabajo previo (M32–M48)

Se re-verificó el estado de los items SEO cerrados: **todos correctos** — `BASE_URL` no-www único (M32), legales con `buildMetadata` (M34), blog con `ogType: 'article'` + `publishedTime` (M35), `WebSite` schema (M39), schemas enriquecidos (M40), `CollectionPage` en los tres listados (M41), condiciones de contratación (M43), indexación env-aware (M44), titles/H1 limpios (M45).

**Única excepción:** M47 eliminó `twitter:site` de `lib/helpers/seo.ts` pero el root layout conserva `site: '@viajesvidaia'` (`app/layout.tsx:59`) apuntando a una cuenta que no existe → **M55**.

### 2.2 Hallazgos SEO

#### 🟡 G1 — Breadcrumbs solo en schema, sin navegación visible → **M56**

Itinerarios, destinos y posts emiten `BreadcrumbList` (M25) pero no muestran breadcrumbs al usuario. Google prefiere que el structured data se corresponda con contenido visible, y es navegación útil en páginas profundas. Ya existe el patrón a reutilizar: `BreadcrumbPersonalizar.tsx` (`<nav aria-label>` + `<ol>`).

#### 🟡 G2 — Sin señales de frescura visibles ni `article:modified_time` → **M57**

`buildArticleSchema` ya emite `dateModified`, pero: (a) `buildMetadata` no emite el meta `article:modified_time` (solo `publishedTime`), y (b) el post no muestra fecha con `<time datetime="...">` visible. Señal de frescura relevante tanto para Google como para motores generativos.

#### 🟢 G3 — Micro-mejoras de metadata → **M58** (parcial)

- Twitter card sin `alt` en la imagen (`lib/helpers/seo.ts` — pasar `images: [{ url, alt }]`).
- Páginas de éxito (`/contacto/exito`, `/itinerarios/personalizar/exito`) sin `robots: noindex` (verificado: no declaran `robots`). Son páginas post-conversión sin valor de búsqueda; el precedente ya existe (`personalizar/[slug]` usa `noindex,follow` desde M45).

### 2.3 Hallazgos GEO

#### 🟢 G4 — Schemas: enlaces de grafo y propiedades disponibles no emitidas → **M58**

- `buildCollectionPageSchema` sin `@id` → los nodos del `@graph` no pueden referenciarlo.
- `offers.seller` en `buildTouristTripSchema` sin `url: BASE_URL` (solo `@type` + `name`).
- `includesAttraction` en `buildTouristDestinationSchema` emite solo `name` + `geo`; los destinos tienen imagen y descripción disponibles en los datos.

Todo son spreads de 1-3 líneas con datos que ya existen (mismo espíritu que M40).

#### 🟢 G5 — llms.txt sin sección de equipo/autoría → **M58**

`app/llms.txt/route.ts` cubre destinos, viajes y enlaces, pero no presenta a Lau y Jupe (los autores del contenido). Para E-E-A-T ante motores generativos, una sección `## Equipo` con nombre, rol y bio corta refuerza la señal de autoría que M46 está construyendo en el HTML.

### 2.4 Ya cubierto por items abiertos (no se duplica)

- **hreflang dinámico multi-idioma** — ya anotado en M13: `buildMetadata` hardcodea `es` + `x-default`; hay que iterar `ENABLED_LANGUAGES` antes de activar el inglés.
- **Byline de autor visible en posts + datos citables por país en `/destinos/[slug]`** — es exactamente el pendiente de M46 (el schema de Article ya acepta `Person`; falta la UI).
- **Validación en Rich Results Test, 308 de `*.vercel.app`, banner de consentimiento en móvil** — M47, requieren el deploy.

### 2.5 Bien hecho

Canonicals y sitemap coherentes con `BASE_URL` único; robots env-aware; `@graph` combinado por página vía `buildPageSchema`; FAQ visible + schema en las páginas clave; bloque "Datos clave" del itinerario con `<dl>` semántico (M46a); llms.txt dinámico autopoblado desde los servicios; título con `template` de marca única.

---

## 3. Mejoras generales

### 3.1 Datos y contenido

#### 🔴 C1 — Asset `ACTIVITIES.TODO_GLACIARES` no existe → **M59**

`lib/data/activities.ts:269` referencia `imageKey: 'ACTIVITIES.TODO_GLACIARES'`, que no está definido en `lib/data/assets.ts` (verificado por grep). Cualquier itinerario que incluya esa actividad renderiza imagen rota o revienta según el comportamiento de `getAsset()`. Es además el síntoma de C2.

#### 🟡 C2 — Sin validación de integridad referencial de los datos en build → **M62**

Los ficheros de `lib/data/` se referencian entre sí por IDs/slugs/keys sin ninguna comprobación (trip → itinerario, itinerario → hoteles/actividades/destinos, `imageKey` → assets). Los errores solo aparecen en runtime (como C1). La planificación de Supabase ya detectó dos casos reales (A-01: actividades huérfanas; A-02: `referenceHotelId` incorrectos). Un script `scripts/validate-data.ts` enganchado al `build` los cazaría todos en CI, y de paso deja los datos limpios para el seed de la migración.

### 3.2 Robustez y UX de formularios → **M63**

- `telefono` acepta cualquier string (sin regex de formato) → teléfonos incontactables en el CRM.
- El multistep no muestra errores inline por campo (el usuario no sabe qué corregir).
- Los `fetch` del cliente no tienen timeout ni mensaje de fallback con vía alternativa de contacto — si Vercel tarda o falla, el lead se pierde en silencio.
- `ContactModal` gestiona estado a mano con `useState` en vez de react-hook-form + Zod (inconsistente con el formulario de presupuesto, y sin validación cliente).

#### 🟡 C3 — Sin error boundaries con marca → **M61**

Existe `app/not-found.tsx` (M33) pero no `app/error.tsx` ni `app/global-error.tsx` (verificado por glob). Un error de runtime muestra la pantalla genérica de Next.js sin logo ni navegación. Mismo tratamiento visual que la 404.

### 3.3 Accesibilidad → **M64**

- `ContactModal`: enfoca el primer input y cierra con ESC (bien), pero sin focus trap (se puede tabular fuera del modal) y sin restaurar el foco al cerrar.
- Sin skip-link "Saltar a contenido" antes del Header.
- Dual range de `ViajesBuscador`: los dos `<input type="range">` superpuestos necesitan `aria-label` con el valor actual ("Mínimo (7 días)").

### 3.4 DX y calidad → **M60, M65, M66**

- `components/ui/SearchBar.tsx` (111 líneas) no se importa desde ningún sitio y su submit es un `console.log` con TODO → borrar (o conectar, decisión de producto) — **M60**.
- CI sin paso `tsc --noEmit` separado (los errores de tipos se mezclan con los de build) y ESLint solo con `core-web-vitals` (sin `no-console`, que habría cazado los logs de S3) — **M65**.
- **Cero tests.** Los de más valor/coste: schemas Zod de `form-utils.ts`, `formatBestMonths()` (lógica de rangos con vuelta de año) y la conversión de fechas/timezone de `clientify.ts` — **M66**.

---

## 4. Tabla resumen — hallazgo → acción

| # | Hallazgo | Severidad | Entrada MEJORAS |
|---|---|---|---|
| S1 | Contacto/newsletter sin validación Zod | 🔴 | M50 |
| S2 | Inyección HTML en emails | 🔴 | M49 |
| S3 | PII en logs | 🟡 | M52 |
| S4 | Sin anti-spam | 🟡 | M51 |
| S5 | npm audit (3 moderate) | 🟡 | M53 |
| S6 | Sin CSP | 🟢 | M54 |
| G1 | Breadcrumbs no visibles | 🟡 | M56 |
| G2 | Sin frescura visible / modified_time | 🟡 | M57 |
| G3-G5 | Micro-mejoras schema/metadata/llms.txt | 🟢 | M58 |
| — | twitter.site huérfano | 🟢 | M55 |
| C1 | Asset TODO_GLACIARES inexistente | 🔴 | M59 |
| C2 | Sin validación de datos en build | 🟡 | M62 |
| C3 | Sin error boundaries | 🟡 | M61 |
| — | Formularios: robustez/UX | 🟡 | M63 |
| — | A11y (focus trap, skip-link, sliders) | 🟢 | M64 |
| — | SearchBar código muerto | 🟢 | M60 |
| — | CI typecheck + ESLint | 🟢 | M65 |
| — | Tests mínimos | 🟢 | M66 |
