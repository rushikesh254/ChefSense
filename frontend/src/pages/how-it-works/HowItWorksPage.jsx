import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { STEPS } from '@/utils/data'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-stone-900 mb-4">
            How <span className="text-brand-600">ChefSense</span> Works
          </h1>
          <p className="text-xl text-stone-600 max-w-4xl mx-auto">
            From fridge to fork in 4 simple steps. ChefSense makes home cooking
            effortless with AI-powered recipe suggestions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <Card
                key={i}
                className="hover:scale-105 transition-all duration-300 ease-in-out p-4"
              >
                <CardContent>
                  <div
                    className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center flex justify-center items-center">
          <Link to="/dashboard">
            <Button
              variant="primary"
              className="flex items-center gap-2 cursor-pointer hover:bg-brand-600 hover:text-white transition-all duration-300 ease-in-out hover:scale-105 h-12 w-full sm:w-auto text-base font-bold  "
            >
              Start Cooking Free <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
