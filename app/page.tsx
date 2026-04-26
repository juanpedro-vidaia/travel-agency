import Hero from '@/components/Hero'
import ValueProposition from '@/components/ValueProposition'
import QuienesSomos from '@/components/QuienesSomos'
import TestimonialsSection from '@/components/TestimonialsSection'
import InstagramBanner from '@/components/InstagramBanner'
import BlogSection from '@/components/BlogSection'
import CTASection from '@/components/CTASection'

export default function Home() {
  return (
    <main>
      <Hero />
      <ValueProposition />
      <QuienesSomos />
      <TestimonialsSection />
      <InstagramBanner />
      <BlogSection />
      <CTASection />
    </main>
  )
}
