# Auditoría Independiente de Código

Fecha: 2026-05-25
Alcance: revisión estática de arquitectura, calidad de código, i18n, SEO, formularios, configuración y mantenibilidad.
Método: lectura directa de código + `npm run lint` + `npx tsc --noEmit`.

## Resumen ejecutivo

El proyecto está bien estructurado para un sitio de contenido estático en Next.js (App Router), con separación clara entre datos (`lib/data`), servicios (`lib/services`) y UI (`components`). La base técnica es sólida y el tipado general es correcto.

Los riesgos más relevantes hoy no son de compilación, sino de consistencia operativa y de producto:

1. Desalineación entre variables de entorno documentadas y variables realmente usadas para CRM/Analytics.
2. Integración de email (Resend) todavía comentada en las 3 API routes de formularios.
3. i18n parcial en varias pantallas (se siguen leyendo campos `content.es` aunque la ruta sea dinámica por idioma).
4. Falta de `public/images/og-default.jpg` pese a estar definido como fallback SEO global.

## Evidencia técnica

- `npm run lint`: OK con 1 warning (import sin uso en `app/[lang]/itinerarios/[slug]/ItineraryDayAccordion.tsx:7`).
- `npx tsc --noEmit`: sin errores.

## Hallazgos (priorizados)

### 1. Crítico/Alto: Desalineación de variables de entorno (riesgo de integración silenciosa)

- En código, Clientify usa `VV_CLIENTIFY_API_TOKEN` (`lib/services/clientify.ts:105`, `:164`, `:258`).
- En `.env.example` se documenta `VV_CLIENTIFY_API_KEY`.
- En documentación histórica también aparece `CLIENTIFY_API_KEY`/`RESEND_API_KEY` sin prefijo `VV_`.
- GA4 en código usa `NEXT_PUBLIC_GA4_MEASUREMENT_ID` (`components/scripts/GoogleAnalytics.tsx:8`), pero `.env.example` publica `VV_NEXT_PUBLIC_GA4_MEASUREMENT_ID`.

Impacto: configuración aparentemente correcta pero integraciones desactivadas en runtime.

### 2. Alto: Captura de leads incompleta en correo transaccional

- Las 3 rutas API sí procesan y validan/normalizan datos, y llaman a Clientify.
- El envío por Resend está comentado en:
- `app/api/forms/contacto/route.ts`
- `app/api/forms/newsletter/route.ts`
- `app/api/forms/presupuesto/route.ts`

Impacto: dependencia total de CRM para trazabilidad; si CRM falla o token no está, no hay canal alternativo de notificación por email.

### 3. Alto: i18n inconsistente (contenido fijado en español en múltiples vistas)

Patrón repetido: uso directo de `content.es` en páginas/componentes con `lang` dinámico.

Ejemplos:
- `app/[lang]/blog/page.tsx` (títulos, excerpts e imágenes en `content.es`).
- `app/[lang]/blog/[slug]/PostContent.tsx` (`const es = post.content.es`, textos de relacionados y share parcial).
- `app/[lang]/itinerarios/[slug]/page.tsx` y subcomponentes (`Itinerary*`) consumen datos en español.

Impacto: al activar `en`, la experiencia quedará parcialmente en español y aumentará deuda de localización.

### 4. Medio: SEO social con fallback roto

- `lib/helpers/seo.ts:4` define `DEFAULT_OG_IMAGE = /images/og-default.jpg`.
- No existe `public/images/og-default.jpg`.

Impacto: previews pobres o inconsistentes al compartir enlaces en redes/mensajería para páginas sin imagen OG explícita.

### 5. Medio: Dependencia y módulo no usados (ruido arquitectónico)

- Existe `lib/supabase.ts` con cliente inicializado y env vars no-null (`!`), pero no está conectado al flujo actual estático.
- `@supabase/supabase-js` permanece en `package.json`.

Impacto: confusión sobre fuente de datos real y mantenimiento innecesario.

### 6. Bajo: Warning de lint pendiente

- `Calendar` importado y no usado en `app/[lang]/itinerarios/[slug]/ItineraryDayAccordion.tsx:7`.

Impacto: bajo, pero conviene mantener cero warnings.

## Fortalezas observadas

- Arquitectura legible y modular.
- Buen uso de validación con Zod en flujo de presupuesto.
- Integración de consentimiento para Analytics bien planteada.
- `buildMetadata` centralizado para SEO y alternates.
- Separación clara entre contenido estático y lógica de presentación.

## Recomendaciones (plan corto)

1. Unificar naming de variables de entorno y documentación.
2. Activar Resend o eliminar temporalmente el código comentado con feature flag explícita.
3. Definir estrategia i18n única para datos de dominio (`content[lang] ?? content.es`) y aplicarla a blog/itinerarios.
4. Añadir `public/images/og-default.jpg` (1200x630) y verificar cards sociales.
5. Retirar Supabase (archivo + dependencia) si no entra en roadmap inmediato.
6. Cerrar warning de lint y mantener pipeline con `lint` + `tsc --noEmit` en CI.

## Evaluación general

Estado general: Bueno, con base técnica estable.

Riesgo principal: Operativo/configuración (integraciones y consistencia de entorno), no de compilación.

Conclusión: el proyecto está en buena posición para producción de contenido, pero antes de escalar internacionalización o campañas conviene resolver la capa de integración/configuración para evitar fallos silenciosos.
