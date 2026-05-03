interface Step {
  title: string
  description: string
}

interface ViajesComoTrabajamosProps {
  title: string
  subtitle: string
  steps: Step[]
}

export default function ViajesComoTrabajamos({ title, subtitle, steps }: ViajesComoTrabajamosProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-vidaia-cream">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-vidaia-dark mb-2 text-center">
          {title}
        </h2>
        <p className="text-center text-vidaia-charcoal/55 text-sm mb-16">
          {subtitle}
        </p>

        {/* Desktop — horizontal timeline */}
        <div className="hidden md:block relative">
          <div className="absolute top-5 left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-px border-t-2 border-dashed border-vidaia-light" />
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="relative z-10 w-10 h-10 rounded-full bg-vidaia-primary text-white flex items-center justify-center font-heading font-bold text-lg mb-5 shadow-sm">
                  {i + 1}
                </div>
                <h3 className="font-heading font-bold text-vidaia-dark mb-2">{step.title}</h3>
                <p className="text-sm text-vidaia-charcoal/65 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile — vertical timeline */}
        <div className="md:hidden space-y-0">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-vidaia-primary text-white flex items-center justify-center font-heading font-bold text-lg shrink-0 shadow-sm">
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-vidaia-light my-2 min-h-[2rem]" />
                )}
              </div>
              <div className="pb-8">
                <h3 className="font-heading font-bold text-vidaia-dark mb-1 mt-2">{step.title}</h3>
                <p className="text-sm text-vidaia-charcoal/65 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
