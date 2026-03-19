import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { FAQS } from '@/utils/data'

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg sm:text-xl text-stone-600">
            Everything you need to know about ChefSense.
          </p>
        </div>

        <Card className="border-stone-200">
          <CardContent className="p-5 sm:p-8">
            <Accordion type="single" collapsible className="space-y-1">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${i}`}
                  className="border-b border-stone-200 last:border-b-0"
                >
                  <AccordionTrigger className="text-left font-bold text-lg sm:text-xl hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-stone-600 text-base sm:text-lg leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
