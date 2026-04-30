import Image from 'next/image'
import { Star } from 'lucide-react'
import { getFeaturedTestimonials } from '@/lib/services/testimonialsService'
import { STATIC_CONTENT } from '@/lib/data/staticContent'
import { getAsset } from '@/lib/data/assets'

export default function TestimonialsSection() {
  const testimonials = getFeaturedTestimonials()

  if (testimonials.length === 0) return null

  const sectionContent = STATIC_CONTENT.es.testimonialsSection;

  return (
    <section className="py-24 bg-vidaia-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-vidaia-light text-vidaia-primary text-xs font-bold uppercase tracking-widest rounded-full mb-5">
            {sectionContent.header.overline}
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-vidaia-dark mb-4">
            {sectionContent.header.title}
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            {sectionContent.header.subtitle}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => {
            const testimonialImage = getAsset(testimonial.imageKey);
            return (
              <article
                key={testimonial.id}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-vidaia-earth text-vidaia-earth" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-vidaia-charcoal/80 text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{testimonial.content.es.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t border-vidaia-light/60">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonialImage.url}
                      alt={testimonial.content.es.name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-vidaia-dark text-sm">{testimonial.content.es.name}</p>
                    <p className="text-xs text-gray-400">{testimonial.content.es.location}</p>
                    <p className="text-xs text-vidaia-primary font-medium mt-0.5">{testimonial.content.es.trip}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
