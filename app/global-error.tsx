'use client'

// Sustituye al root layout completo cuando este revienta: sin providers,
// sin CSS global → estilos inline y texto fijo en español.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom, #1c2e32, #1a4a52)',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          padding: '1rem',
        }}
      >
        <div style={{ maxWidth: '28rem' }}>
          <h1 style={{ color: '#ffffff', fontSize: '1.875rem', marginBottom: '1rem' }}>
            Algo no ha salido bien
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '2rem' }}>
            Ha ocurrido un error inesperado. Puedes reintentarlo o volver al inicio; si el problema
            persiste, escríbenos a info@viajesvidaia.com.
          </p>
          <button
            onClick={reset}
            style={{
              background: '#c36689',
              color: '#ffffff',
              border: 'none',
              borderRadius: '1rem',
              padding: '0.875rem 2rem',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: 'pointer',
              marginRight: '0.75rem',
            }}
          >
            Reintentar
          </button>
          <button
            onClick={() => { window.location.href = '/es' }}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.875rem',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Volver al inicio
          </button>
        </div>
      </body>
    </html>
  )
}
