import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export default function FAQPage() {
  const faqs = [
    {
      question: "What is ChefSense?",
      answer:
        "ChefSense is an AI-powered recipe platform that helps you cook amazing meals using ingredients you already have. Simply scan your pantry and get personalized recipe suggestions.",
    },
    {
      question: "How does the AI scanning work?",
      answer:
        "Our platform uses Google Gemini AI Vision to analyze photos of your ingredients. Just take a picture of your fridge or pantry, and the AI will identify the items automatically.",
    },
    {
      question: "Is ChefSense free to use?",
      answer:
        "Yes! ChefSense is completely free to use. You can scan your pantry, generate recipes, and save your favorites at no cost.",
    },
    {
      question: "What features does ChefSense offer?",
      answer:
        "ChefSense includes AI pantry scanning, personalized recipe suggestions, nutrition info, chef's tips, ingredient substitutions, and PDF recipe downloads.",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-stone-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-stone-600">
            Everything you need to know about ChefSense.
          </p>
        </div>

        <Card className="border-stone-200">
          <CardContent className="p-5 sm:p-8">
            <Accordion type="single" collapsible className="space-y-1">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${i}`}
                  className="border-b border-stone-200 last:border-b-0"
                >
                  <AccordionTrigger className="text-left font-bold hover:no-underline py-4">
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
}
