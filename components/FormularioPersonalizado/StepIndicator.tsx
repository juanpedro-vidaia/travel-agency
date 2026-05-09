'use client'

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3
  labels: { step1: string; step2: string; step3: string }
}

export default function StepIndicator({ currentStep, labels }: StepIndicatorProps) {
  const steps = [
    { num: 1 as const, label: labels.step1 },
    { num: 2 as const, label: labels.step2 },
    { num: 3 as const, label: labels.step3 },
  ]

  return (
    <div className="border-b border-gray-100 bg-white sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center py-4 max-w-2xl mx-auto">
          {steps.map((step, i) => {
            const done = currentStep > step.num
            const active = currentStep === step.num
            return (
              <div key={step.num} className="flex items-center flex-1 last:flex-none">
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    done
                      ? 'bg-vidaia-primary text-white'
                      : active
                        ? 'bg-vidaia-dark text-white ring-4 ring-vidaia-light'
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    {done ? '✓' : step.num}
                  </div>
                  <span className={`text-xs font-semibold hidden sm:block transition-colors ${
                    active ? 'text-vidaia-dark' : done ? 'text-vidaia-primary' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-3 transition-colors ${
                    currentStep > step.num ? 'bg-vidaia-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
