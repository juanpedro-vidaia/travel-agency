import { Compass, Star, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Card {
  title: string
  description: string
}

interface ViajesServiciosProps {
  missionTitle: string
  missionText: string
  cardsTitle: string
  cards: Card[]
}

// Icons match the order of the three cards in staticContent.viajesPage.servicios.cards
const CARD_ICONS: LucideIcon[] = [Compass, Star, Users]

export default function ViajesServicios({ missionTitle, missionText, cardsTitle, cards }: ViajesServiciosProps) {
  return (
    <>
      {/* ── Misión ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-vidaia-cream">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-6">
            {missionTitle}
          </h2>
          <p className="text-vidaia-charcoal/80 text-lg sm:text-xl leading-relaxed">
            {missionText}
          </p>
        </div>
      </section>

      {/* ── Cards de servicios ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-vidaia-sand">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-2 text-center">
            {cardsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">
            {cards.map((card, i) => {
              const Icon = CARD_ICONS[i] ?? Compass
              return (
                <div
                  key={card.title}
                  className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow duration-300 border border-vidaia-light/60 group"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-vidaia-light rounded-xl mb-5 group-hover:bg-vidaia-primary transition-colors duration-300">
                    <Icon className="w-6 h-6 text-vidaia-primary group-hover:text-white transition-colors duration-300" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-vidaia-dark mb-2">{card.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
