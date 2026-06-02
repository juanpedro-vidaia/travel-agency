'use client'

import Image from 'next/image'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import type { Asset } from '@/lib/data/assets'

interface Props {
  asset: Asset
}

export default function DestinationHeroImage({ asset }: Props) {
  const isMobile = useIsMobile()
  const src = isMobile ? (asset.url_mobile ?? asset.url) : asset.url

  return (
    <Image src={src} alt={asset.alt} fill className="object-cover" priority sizes="100vw" />
  )
}
