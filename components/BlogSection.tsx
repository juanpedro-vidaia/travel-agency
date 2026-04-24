import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

const posts = [
  {
    slug: 'ruta-carretera-austral',
    title: '7 días por la Carretera Austral: la guía que nadie más te da',
    excerpt:
      'La ruta más espectacular de Chile te espera con bosques templados, glaciares y fiordos que parecen pintados. Te contamos cómo hacerla sin morir en el intento.',
    image:
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
    date: '18 Abr 2026',
    category: 'Chile',
    readTime: '8 min',
  },
  {
    slug: 'salar-uyuni-cuando-ir',
    title: 'Salar de Uyuni: cuándo ir, qué esperar y cómo no arruinarlo',
    excerpt:
      'El espejo natural más grande del mundo tiene sus secretos. Temporada de lluvias o de seca, la foto del coche en el reflejo, el amanecer sobre la sal…',
    image:
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=800&q=80',
    date: '4 Abr 2026',
    category: 'Bolivia',
    readTime: '6 min',
  },
  {
    slug: 'patagonia-argentina-w-circuit',
    title: 'W Circuit en Torres del Paine: todo lo que necesitas saber',
    excerpt:
      'Uno de los trekkings más míticos del planeta. Campamentos, refugios, el Glaciar Grey y esas torres que emergen entre nubes. Paso a paso.',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    date: '28 Mar 2026',
    category: 'Argentina',
    readTime: '10 min',
  },
];

const categoryColors: Record<string, string> = {
  Chile: 'bg-red-50 text-red-700',
  Bolivia: 'bg-amber-50 text-amber-700',
  Argentina: 'bg-sky-50 text-sky-700',
};

export default function BlogSection() {
  return (
    <section className="py-24 bg-vidaia-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-vidaia-light text-vidaia-primary text-xs font-bold uppercase tracking-widest rounded-full mb-5">
              Blog de Viajes
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-vidaia-dark leading-tight">
              Últimas del blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-vidaia-primary hover:text-vidaia-dark font-semibold text-sm transition-colors self-start sm:self-auto pb-1"
          >
            Ver todos los artículos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
              {/* Image */}
              <div className="relative h-52 overflow-hidden flex-shrink-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${categoryColors[post.category] ?? 'bg-gray-100 text-gray-600'}`}>
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-semibold text-vidaia-dark leading-snug mb-3 group-hover:text-vidaia-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-vidaia-primary hover:text-vidaia-dark font-semibold text-sm transition-colors group/link mt-auto"
                >
                  Leer más
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
