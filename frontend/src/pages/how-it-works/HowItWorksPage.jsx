import React from "react";
import { Camera, Brain, ChefHat, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Camera,
      color: "bg-brand-100 text-brand-600",
      title: "1. Snap Your Pantry",
      description:
        "Take a photo of the ingredients in your fridge or pantry. Our AI will identify everything automatically.",
    },
    {
      icon: Brain,
      color: "bg-blue-100 text-blue-600",
      title: "2. AI Analysis",
      description:
        "Google Gemini AI analyzes your ingredients and matches them with thousands of recipes in our database.",
    },
    {
      icon: ChefHat,
      color: "bg-green-100 text-green-600",
      title: "3. Get Recipes",
      description:
        "Receive personalized recipe suggestions ranked by how well they match your available ingredients.",
    },
    {
      icon: Heart,
      color: "bg-pink-100 text-pink-600",
      title: "4. Cook & Enjoy",
      description:
        "Follow step-by-step instructions, save your favorites, and enjoy delicious homemade meals!",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-stone-900 mb-4">
            How <span className="text-brand-600">ChefSense</span> Works
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            From fridge to fork in 4 simple steps. ChefSense makes home cooking
            effortless with AI-powered recipe suggestions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm"
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-brand-600 hover:bg-brand-700 text-white px-8 h-12"
          >
            <Link to="/dashboard">
              <ChefHat className="w-5 h-5 mr-2" />
              Start Cooking Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
