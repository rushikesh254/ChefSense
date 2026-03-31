import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { FAQS } from "@/lib/siteContent";

function FAQPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-3xl mx-auto px-5 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold  mb-4">
            Frequently Asked Questions
          </h1>

          <p className="text-lg text-stone-500">
            Everything you need to know about ChefSense.
          </p>
        </div>

        {/* Card */}
        <Card className="border border-stone-200 shadow-sm rounded-xl">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="space-y-3">
              {/* 4 questions and ans */}
              {FAQS.map((faq) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${faq.question}`}
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

export default FAQPage;
