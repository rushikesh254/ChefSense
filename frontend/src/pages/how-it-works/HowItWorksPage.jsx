import { Button } from '@/components/ui/button'
import { STEPS } from '@/utils/data'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-3xl mx-auto my-2 sm:my-10 ">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-20">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-500 border border-brand-200 px-3 py-1 rounded-full mb-4">
            How it works
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 leading-tight mb-4">
            Fridge to fork in <span className="text-brand-500">4 steps</span>
          </h1>
          <p className="text-stone-500 text-sm sm:text-base max-w-xs sm:max-w-sm mx-auto leading-relaxed">
            No cooking experience needed. ChefSense does the hard thinking so
            you can focus on eating.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-5">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            const flip = i % 2 !== 0
            return (
              <div
                key={i}
                className={`flex flex-col sm:flex-row ${flip ? 'sm:flex-row-reverse' : ''} bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm`}
              >
                {/* Image */}
                <div className="w-full sm:w-48 h-44 sm:h-auto shrink-0">
                  <img
                    src={`${step.img}?w=600&auto=format&fit=crop`}
                    alt={step.alt}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div
                      className={`w-8 h-8 rounded-lg ${step.color} flex items-center justify-center shrink-0`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                      Step {i + 1}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-stone-900 mb-2">
                    {step.title.replace(/^\d+\.\s*/, '')}
                  </h2>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 bg-stone-700 rounded-2xl sm:rounded-3xl px-6 py-10 sm:p-12 text-center">
          <p className="text-stone-200 text-xs font-semibold uppercase tracking-widest mb-3">
            Ready to try?
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 leading-snug">
            Your next great meal is
            <br className="hidden sm:block" /> already in your fridge.
          </h2>
          <Link to="/dashboard">
            <Button
              variant="primary"
              className="h-11 px-8 text-sm font-bold gap-2 rounded-full w-full sm:w-auto"
            >
              Start Cooking Free <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <p className="text-stone-200 text-xs mt-4">
            No credit card · Under 30 seconds
          </p>
        </div>
      </div>
    </div>
  )
}
