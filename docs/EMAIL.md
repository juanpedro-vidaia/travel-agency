# Configuración de email con Resend

Las notificaciones por email de los formularios están **activas** (M01). Cada endpoint
envía el lead a Clientify y, además, notifica al equipo por email vía Resend.

| Endpoint | Plantilla | Destinatario |
|---|---|---|
| `POST /api/forms/presupuesto` | `buildPresupuestoEmailHtml` (`lib/form-utils.ts`) | `sales@viajesvidaia.com` |
| `POST /api/forms/contacto` | `buildEmailHtml` (inline en el route) | `info@viajesvidaia.com` |
| `POST /api/forms/newsletter` | HTML inline en el route | `info@viajesvidaia.com` |

El envío se centraliza en `lib/services/resend.ts` (`sendNotificationEmail`), remitente
`web@viajesvidaia.com`. Es **best-effort**: si Resend falla, se registra el error y el
formulario sigue devolviendo `ok` (Clientify es la fuente de verdad).

---

## Requisitos para que funcione

1. **Cuenta y dominio en Resend** — dominio `viajesvidaia.com` añadido y **verificado**
   (registros DNS SPF/DKIM). Si no está verificado, los envíos fallan con error de
   remitente no autorizado (visible en el log `[Resend] Send failed`).

2. **API Key** — variable de entorno `RESEND_API_KEY`:
   - Local: en `.env.local`
     ```
     RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
     ```
   - Producción: **Vercel → Settings → Environment Variables → Production**

Si `RESEND_API_KEY` no está definida, `sendNotificationEmail` registra
`"[Resend] RESEND_API_KEY not set — skipping email"` y omite el envío sin romper nada.

---

## Cambiar destinatarios o remitente

- **Destinatarios:** en cada `app/api/forms/*/route.ts`, campo `to:` de la llamada a
  `sendNotificationEmail`.
- **Remitente:** constante `FROM` en `lib/services/resend.ts` (debe estar en el dominio
  verificado en Resend).
