import testimonials from '../data/testimonials'
import type { Testimonial } from '../data/testimonials'

export function getTestimonials(): Testimonial[] {
  return testimonials.filter(t => t.active)
}

export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter(t => t.featured && t.active)
}
