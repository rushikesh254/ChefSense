import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const FAQPage = () => {
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
    <div
      className="min-h-screen py-20 px-4 text-stone-900"
      style={{
        background: `linear-gradient(
          180deg,
          #fff 0%,
          #fff7f2 40%,
          #ffffff 100%
        )`,
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-stone-600">
            Everything you need to know about the product and billing.
          </p>
        </div>

        {/* FAQ Card */}
        <Card className="bg-gradient-to-b from-stone-50/80 to-stone-100/60 backdrop-blur-sm border-stone-200 shadow-[0_30px_80px_rgba(0,0,0,0.06)]">
          <CardContent className="p-8">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-stone-200 last:border-b-0"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-stone-600 leading-relaxed">
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
