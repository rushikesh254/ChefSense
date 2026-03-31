import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { FAQS } from "@/lib/siteContent";

export default function FAQPage() {
  return (
    
    <div className="min-h-screen pt-20">
      <div className="max-w-3xl mx-auto px-5 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>

          <p className="text-lg text-stone-600">
            Everything you need to know about ChefSense.
          </p>
        </div>

        {/* Card */}
        <Card className="border border-stone-200 shadow-sm rounded-xl">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${i}`}
                  className="border border-stone-200 rounded-lg px-4"
                >
                  {/* Question */}
                  <AccordionTrigger className="text-left font-semibold text-base md:text-lg py-4 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>

                  {/* Answer */}
                  <AccordionContent className="text-stone-600 text-sm md:text-base pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
