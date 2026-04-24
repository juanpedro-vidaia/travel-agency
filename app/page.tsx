import Hero from '@/components/Hero';
import ValueProposition from '@/components/ValueProposition';
import QuienesSomos from '@/components/QuienesSomos';
import BlogSection from '@/components/BlogSection';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <main>
      <Hero />
      <ValueProposition />
      <QuienesSomos />
      <BlogSection />
      <CTASection />
    </main>
  );
}
