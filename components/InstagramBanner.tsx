import Image from 'next/image'
import Link from 'next/link'
import { Instagram } from 'lucide-react'
import { STATIC_CONTENT } from '@/lib/data/staticContent'
import { getAsset } from '@/lib/data/assets'

// Photos placeholder from Unsplash — replace when Elfsight or SnapWidget is integrated.
// To integrate the actual widget, replace the entire grid with the provider's script
// and place it inside the div id="instagram-widget" (see comment below).
const photos = [
  { imageKey: 'INSTAGRAM_PHOTOS.PERITO_MORENO'},
  { imageKey: 'INSTAGRAM_PHOTOS.IGUAZU_FALLS'},
  { imageKey: 'INSTAGRAM_PHOTOS.TORRES_DEL_PAINE_INSTA'},
  { imageKey: 'INSTAGRAM_PHOTOS.BUENOS_AIRES_INSTA'},
  { imageKey: 'INSTAGRAM_PHOTOS.JUJUY_HUMAHUACA'},
  { imageKey: 'INSTAGRAM_PHOTOS.USHUAIA_BEAGLE'},
]

export default function InstagramBanner() {
  const sectionContent = STATIC_CONTENT.es.instagramBanner;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <Link
            href={sectionContent.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-vidaia-dark hover:text-vidaia-primary transition-colors group"
          >
            <Instagram className="w-6 h-6" />
            <h2 className="font-heading text-2xl sm:text-3xl font-bold">
              {sectionContent.header.title.split('{span}').map((part, index) => (
                <span key={index} className={index === 1 ? 'text-vidaia-primary' : ''}>
                  {part}
                </span>
              ))}
              {/* <span className="text-vidaia-primary">{sectionContent.header.instagramHandle}</span> */}
            </h2>
          </Link>
          <p className="text-gray-400 mt-2 text-base">
            {sectionContent.header.subtitle}
          </p>
        </div>

        {/*
          FUTURE ELFSIGHT / SNAPWIDGET INTEGRATION:
          When you have the provider's script, replace the grid below
          with something like:
          <div id="instagram-widget">
            <div class="elfsight-app-XXXXXX" data-elfsight-app-lazy></div>
          </div>
          And add the provider's script in app/layout.tsx with strategy="afterInteractive".
        */}

        {/* Grid placeholder */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {photos.map((photo, i) => {
            const instaAsset = getAsset(photo.imageKey);
            return (
              <Link
                key={i}
                href={sectionContent.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden rounded-xl group"
              >
                <Image
                  src={instaAsset.url}
                  alt={instaAsset.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-vidaia-dark/0 group-hover:bg-vidaia-dark/40 transition-colors duration-300 flex items-center justify-center">
                  <Instagram className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            href={sectionContent.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-vidaia-primary hover:text-vidaia-dark transition-colors"
          >
            <Instagram className="w-4 h-4" />
            {sectionContent.callToAction}
          </Link>
        </div>
      </div>
    </section>
  );
}
