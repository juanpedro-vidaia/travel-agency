'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import ConsentScript from '@/components/ConsentScript'
import { useConsent } from '@/lib/hooks/useConsent'

const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID

function clearGaCookies() {
  if (typeof document === 'undefined') return
  const cookieNames = document.cookie
    .split(';')
    .map(part => part.trim().split('=')[0])
    .filter(name => name === '_ga' || name.startsWith('_ga_'))

  for (const name of cookieNames) {
    document.cookie = `${name}=; path=/; max-age=0; samesite=lax`
    document.cookie = `${name}=; path=/; max-age=0; samesite=lax; domain=.viajesvidaia.com`
  }
}

export default function GoogleAnalytics() {
  const { consent, isReady } = useConsent()

  useEffect(() => {
    if (!GA4_MEASUREMENT_ID || !isReady) return
    const disabledKey = `ga-disable-${GA4_MEASUREMENT_ID}`
    ;(window as unknown as Record<string, boolean>)[disabledKey] = !consent.analytics
    if (!consent.analytics) clearGaCookies()
  }, [consent.analytics, isReady])

  if (!GA4_MEASUREMENT_ID) return null

  return (
    <ConsentScript category="analytics">
      <Script
        id="ga4-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA4_MEASUREMENT_ID}');
        `}
      </Script>
    </ConsentScript>
  )
}
