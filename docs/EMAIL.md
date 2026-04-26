# Configuración de email con Resend

El endpoint `POST /api/presupuesto` está listo para recibir solicitudes.
Sigue estos pasos para activar el envío real a `sales@viajesvidaia.com`.

---

## 1. Crear cuenta en Resend

1. Ve a [resend.com](https://resend.com) y crea una cuenta.
2. Añade y verifica el dominio `viajesvidaia.com`.
3. Crea una API Key con permisos de envío.

---

## 2. Instalar el SDK

```bash
npm install resend
```

---

## 3. Configurar la variable de entorno

Crea o edita **`.env.local`**:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

En producción (Vercel), añade `RESEND_API_KEY` en:
**Settings → Environment Variables → Production**

---

## 4. Actualizar el endpoint

En **`app/api/presupuesto/route.ts`**, descomenta y completa el bloque de Resend:

```ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const data = await request.json()

  await resend.emails.send({
    from: 'web@viajesvidaia.com',        // remitente verificado en Resend
    to: 'sales@viajesvidaia.com',
    replyTo: data.email,                 // el usuario puede recibir la respuesta
    subject: `Nueva solicitud — ${data.first_name} ${data.last_name}`,
    html: buildEmailHtml(data),
  })

  return NextResponse.json({ ok: true })
}
```

---

## 5. Plantilla HTML del email (función helper)

Añade esta función en el mismo archivo o en `lib/email/templates.ts`:

```ts
function buildEmailHtml(data: Record<string, unknown>): string {
  return `
    <h2>Nueva solicitud de presupuesto</h2>
    <p><strong>Nombre:</strong> ${data.first_name} ${data.last_name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Teléfono:</strong> ${data.phone ?? '—'}</p>
    <p><strong>Destinos:</strong> ${data.destinations ?? '—'}</p>
    <p><strong>Tipo de grupo:</strong> ${data.group_type ?? '—'}</p>
    <p><strong>Adultos:</strong> ${data.adults ?? '—'} | 
       <strong>Niños:</strong> ${data.children ?? '—'}</p>
    <p><strong>Mes de salida:</strong> ${data.start_month ?? '—'} ${data.start_year ?? ''}</p>
    <p><strong>Duración:</strong> ${data.duration ?? '—'}</p>
    <p><strong>Presupuesto:</strong> ${data.budget ?? '—'}</p>
    <p><strong>Mensaje:</strong> ${data.message ?? '—'}</p>
    <hr />
    <p><small>Enviado desde: ${data.form_source ?? 'web'}</small></p>
  `
}
```

---

## 6. (Opcional) Conectar el formulario al endpoint

Si el formulario actual envía directamente a Clientify y quieres mantener ambos flujos,
añade una llamada paralela desde `PresupuestoForm.tsx` al enviar:

```ts
await fetch('/api/presupuesto', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
})
```

Esto no interrumpe la integración con Clientify.
