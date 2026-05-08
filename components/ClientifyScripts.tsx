'use client'

import { createElement } from 'react'
import Script from 'next/script'

export default function ClientifyScripts() {
  return (
    <>
      {createElement('app-clientify-meetings')}
      <Script
        id="clientify-meetings-widget"
        src="https://app.clientify.com/meetings/script/v2/13205.js"
        strategy="afterInteractive"
      />
    </>
  )
}
