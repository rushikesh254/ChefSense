import React from "react";
import { Camera, Brain, ChefHat, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link }  from "react-router-dom";
const HowItWorksPage = () => {
  const steps = [
    {
      icon: Camera,
      title: "1. Snap Your Pantry",
      description:
        "Take a photo of your open fridge, pantry shelves, or ingredients on your counter.",
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
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
          How <span className="text-brand-600">ChefSense</span> Works
        </h1>
        <p className="text-xl text-stone-600 mb-16 max-w-2xl mx-auto">
          Turn chaos into delicious meals in seconds.
        </p>

        {/* Steps Card */}
        <Card className="bg-gradient-to-b from-stone-50/80 to-stone-100/60 backdrop-blur-sm border-stone-200 shadow-[0_30px_80px_rgba(0,0,0,0.06)]">
          <CardContent className="grid md:grid-cols-2 gap-12 text-left p-8 sm:p-10">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 relative">
                {index !== steps.length - 1 && (
                  <span className="absolute left-8 top-16 h-full w-px bg-stone-200 hidden md:block" />
                )}

                <div
                  className="
                    shrink-0 w-16 h-16
                    rounded-2xl
                    flex items-center justify-center
                    border border-stone-200
                    bg-gradient-to-br from-brand-50 to-brand-100
                    shadow-sm
                    text-brand-600
                    transition-transform
                    hover:scale-[1.05]
                  "
                >
                  <step.icon className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-stone-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-20">
          <Link to="/dashboard">
            <Button
              size="xl"
              variant="primary"
              className="px-10 py-6 text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Try it now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
