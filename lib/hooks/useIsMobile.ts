import { useSyncExternalStore } from 'react'

const MQ = '(max-width: 767px) and (orientation: portrait)'

function subscribe(cb: () => void) {
  const mq = window.matchMedia(MQ)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

export function useIsMobile(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MQ).matches,
    () => false,
  )
}
