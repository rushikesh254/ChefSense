import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    question: "How accurate is the ingredient recognition?",
    answer:
      "Our AI is trained on millions of food images and is highly accurate. Lighting and camera angle can affect results, but you can always edit ingredients manually.",
  },
  {
    question: "Is ChefSense free to use?",
    answer:
      "Yes. You can scan ingredients and get recipes for free. We also offer a Pro plan with unlimited scans and advanced features.",
  },
  {
    question: "Can I save my favorite recipes?",
    answer:
      "Yes. Click the heart icon on any recipe to save it to your personal cookbook.",
  },
  {
    question: "Does it support dietary restrictions?",
    answer:
      "Yes. You can filter recipes by Vegetarian, Vegan, Gluten-Free, Keto, and more.",
  },
];

const FAQPage = () => {
  return (
    <div className="min-h-screen py-20 px-5 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-stone-600">
            Everything you need to know about ChefSense.
          </p>
        </div>

        {/* FAQ */}
        <Card className="border-stone-200">
          <CardContent className="p-5 sm:p-8">
            <Accordion type="single" collapsible className="space-y-1">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${i}`}
                  className="border-b border-stone-200 last:border-b-0"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-stone-600 leading-relaxed pb-4">
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
};

export default FAQPage;
