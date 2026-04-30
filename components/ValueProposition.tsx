import React from 'react';
import { Compass, Heart, Leaf, Users } from 'lucide-react';
import { STATIC_CONTENT, COMMON_UI } from '@/lib/data/staticContent';

// Define the structure for value proposition items, including i18n content
interface ValuePropositionItem {
  icon: React.ElementType; // Using React.ElementType for the icon component
  content: {
    es: {
      title: string;
      description: string;
    };
    en?: {
      title: string;
      description: string;
    };
  };
}

// Populate the value proposition data using the refactored structure
const valuePropositionItems: ValuePropositionItem[] = [
  {
    icon: Compass,
    content: {
      es: {
        title: 'Viajes únicos',
        description:
          'Nada de catálogos ni paquetes de agencia. Cada itinerario nace de una conversación contigo y se construye desde cero.',
      },
    },
  },
  {
    icon: Heart,
    content: {
      es: {
        title: 'Totalmente personalizados',
        description:
          'Tu ritmo, tus intereses, tu presupuesto. Diseñamos el viaje que encaja con tu forma de viajar, no al revés.',
      }
    },
  },
  {
    icon: Leaf,
    content: {
      es: {
        title: 'Turismo sostenible',
        description:
          'Viajamos con respeto por los ecosistemas y las comunidades. Huella mínima, experiencia máxima y conciencia en cada paso.',
      }
    },
  },
  {
    icon: Users,
    content: {
      es: {
        title: 'Apoyo local',
        description:
          'Trabajamos con guías, hospedajes y operadores locales de confianza. Tu viaje impulsa directamente a las personas del lugar.',
      }
    },
  },
];

export default function ValueProposition() {
  // Accessing the relevant content for the Value Proposition section
  const sectionContent = STATIC_CONTENT.es.valueProposition; 

  return (
    <section className="py-24 bg-vidaia-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-vidaia-light text-vidaia-primary text-xs font-bold uppercase tracking-widest rounded-full mb-5">
            {sectionContent.header.overline}
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-vidaia-dark mb-4 leading-tight">
            {sectionContent.header.title.split('{br}').map((part, index) => (
              <React.Fragment key={index}>
                {part}
                {index === 0 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            {sectionContent.header.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valuePropositionItems.map(({ icon: Icon, content }) => (
            <div
              key={content.es.title}
              className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow duration-300 border border-vidaia-light/60 group"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-vidaia-light rounded-xl mb-5 group-hover:bg-vidaia-primary transition-colors duration-300">
                <Icon className="w-6 h-6 text-vidaia-primary group-hover:text-white transition-colors duration-300" strokeWidth={1.8} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-vidaia-dark mb-2">
                {content.es.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{content.es.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
