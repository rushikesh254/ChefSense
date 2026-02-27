import React from "react";
import { Camera, Brain, ChefHat, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: Camera,
    title: "1. Snap Your Pantry",
    description:
      "Take a photo of your fridge, pantry shelves, or ingredients on your counter.",
  },
  {
    icon: Brain,
    title: "2. AI Analysis",
    description:
      "Our AI instantly identifies ingredients and understands what you have.",
  },
  {
    icon: ChefHat,
    title: "3. Get Recipes",
    description:
      "We match your ingredients with thousands of recipes you can cook right now.",
  },
  {
    icon: Heart,
    title: "4. Cook & Enjoy",
    description:
      "Follow step-by-step instructions, save favorites, and reduce food waste.",
  },
];

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen py-20 px-5 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight">
            How <span className="text-brand-600">ChefSense</span> Works
          </h1>
          <p className="text-lg  text-stone-600 max-w-2xl mx-auto">
            Turn chaos into delicious meals in seconds.
          </p>
        </div>

        {/* Steps */}
        <Card className="border-stone-200">
          <CardContent className="p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 gap-8">
              {steps.map((step) => (
                <div key={step.title} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-brand-50 border border-brand-100 text-brand-600">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                    <p className="text-lg text-stone-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-14">
          <Button asChild variant="primary" size="lg">
            <Link to="/dashboard">Try it now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
