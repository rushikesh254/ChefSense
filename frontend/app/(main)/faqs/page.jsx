import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
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

  return (
    <div className="min-h-screen bg-stone-50 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-stone-900 mb-4 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-stone-600 text-center mb-12">
          Everything you need to know about the product and billing.
        </p>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border border-stone-200 rounded-xl px-6"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-stone-900">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-stone-600 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
