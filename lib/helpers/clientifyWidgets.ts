const CLIENTIFY_MEETINGS_FALLBACK_URL =
  'https://reuniones.clientify.com/#/viajesvidaia/hablemos30min?v2=true'

const WHATSAPP_WIDGET_SELECTORS = [
  '[data-clientify-whatsapp]',
  '[id*="clientify"][id*="whatsapp"]',
  '[class*="clientify"][class*="whatsapp"]',
]

const MEETINGS_WIDGET_SELECTORS = [
  '[data-clientify-meetings]',
  '[id*="clientify"][id*="meeting"]',
  '[class*="clientify"][class*="meeting"]',
]

function tryCallMethods(target: unknown, methodNames: string[]): boolean {
  if (!target || (typeof target !== 'object' && typeof target !== 'function')) return false
  const record = target as Record<string, unknown>

  for (const methodName of methodNames) {
    const candidate = record[methodName]
    if (typeof candidate === 'function') {
      try {
        ;(candidate as () => void)()
        return true
      } catch {
        // Continue with next strategy.
      }
    }
  }
  return false
}

function tryClickWidget(selectors: string[]): boolean {
  for (const selector of selectors) {
    const node = document.querySelector<HTMLElement>(selector)
    if (node) {
      node.click()
      return true
    }
  }
  return false
}

export function openClientifyMeetingWidget() {
  if (typeof window === 'undefined') return

  const globalsToTry = [
    (window as Record<string, unknown>).ClientifyMeetings,
    (window as Record<string, unknown>).clientifyMeetings,
    (window as Record<string, unknown>).Clientify,
  ]

  for (const globalCandidate of globalsToTry) {
    if (tryCallMethods(globalCandidate, ['open', 'show', 'toggle', 'launch'])) return
  }

  if (tryClickWidget(MEETINGS_WIDGET_SELECTORS)) return

  // Robust fallback if the embedded widget API is unavailable.
  window.location.assign(CLIENTIFY_MEETINGS_FALLBACK_URL)
}

export function openClientifyWhatsAppWidget(fallbackWaLink: string) {
  if (typeof window === 'undefined') return

  const globalsToTry = [
    (window as Record<string, unknown>).ClientifyWhatsApp,
    (window as Record<string, unknown>).clientifyWhatsApp,
    (window as Record<string, unknown>).Clientify,
  ]

  for (const globalCandidate of globalsToTry) {
    if (tryCallMethods(globalCandidate, ['open', 'show', 'toggle', 'launch'])) return
  }

  if (tryClickWidget(WHATSAPP_WIDGET_SELECTORS)) return

  window.open(fallbackWaLink, '_blank', 'noopener,noreferrer')
}
