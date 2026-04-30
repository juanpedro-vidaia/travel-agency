import testimonials from '../data/testimonials'
import type { Testimonial } from '../data/testimonials'
import type { Asset } from '../data/assets'
import { getAsset } from '../data/assets'

export function getTestimonials(): Testimonial[] {
  return testimonials.filter(testimonial => testimonial.active)
}

export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter(testimonial => testimonial.featured && testimonial.active)
}
