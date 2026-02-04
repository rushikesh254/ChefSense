import React from "react";
import { Button } from "@/components/ui/button";
import { Cookie, Refrigerator, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Flame, Clock, Users } from "lucide-react"; // Icons
import { Card, CardContent } from "@/components/ui/card"; // Reusable Card
import { FEATURES } from "../lib/data"; // Text content
import { HOW_IT_WORKS_STEPS } from "../lib/data"; // Text content

import { SITE_STATS } from "../lib/data"; // Text content
import TiltedCard from "@/components/reactBits/TiltedCard";
import HowItWorks from "@/components/HowItWorks";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* hero section  */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* 1. LEFT SIDE: Messaging */}

            <div className="flex-1 text-center md:text-left">
              <Badge
                variant="outline"
                className="border-2 border-orange-600 text-orange-700 bg-orange-50 text-sm font-bold mb-6 uppercase tracking-wide"
              >
                <Flame className="mr-1" />
                #1 AI Cooking Assistant
              </Badge>

              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 leading-[0.9] tracking-tight">
                Turn your{" "}
                <span className="italic underline decoration-4 decoration-orange-600">
                  leftovers
                </span>{" "}
                into <br />
                masterpieces.
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-stone-600 mb-8 sm:mb-10 max-w-lg mx-auto md:mx-0 font-light">
                Snap a photo of your fridge. We&apos;ll tell you what to cook.
                Save money, reduce waste, and eat better tonight.
              </p>

              <Link href="/dashboard">
                <Button
                  size="xl"
                  variant="primary"
                  className="px-8 py-6 text-lg"
                >
                  Start Cooking Free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <p className="mt-6 text-sm text-stone-500">
                <span className="font-bold text-stone-900">10k+ cooks</span>{" "}
                joined last month
              </p>
            </div>

            {/* 2. RIGHT SIDE: Visual/Image - Hidden on mobile, shown on md+ */}
            <div className="hidden md:flex justify-center items-center w-full md:w-auto">
              <TiltedCard
                imageSrc="/pasta-dish.png"
                altText="Delicious pasta dish"
                captionText="Rustic Tomato Basil Pasta"
                containerHeight="500px"
                containerWidth="500px"
                imageHeight="500px"
                imageWidth="500px"
                rotateAmplitude={4}
                scaleOnHover={1.02}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <Card className="mx-8 mb-8 bg-white/95 backdrop-blur-sm border-2 border-stone-900 shadow-xl">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg">
                            Rustic Tomato Basil Pasta
                          </h3>
                          <div className="flex gap-0.5 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-orange-500 text-orange-500"
                              />
                            ))}
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-2 border-green-700 bg-green-50 text-green-700 font-bold"
                        >
                          98% MATCH
                        </Badge>
                      </div>
                      <div className="flex gap-4 text-xs text-stone-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> 25 mins
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" /> 2 servings
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                }
              />
            </div>
          </div>
        </div>
      </section>
      {/* 
        STATS BAR 
        A dark strip that shows users we are a real, popular app.
      */}
      <section className="py-12 border-y-2 border-stone-900 bg-stone-900">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-4">
          {SITE_STATS.map((stat, i) => (
            <div key={i}>
              <div className="text-2xl sm:text-4xl font-bold mb-1 text-stone-50">
                {stat.val}
              </div>
              <Badge
                variant="secondary"
                className="bg-transparent text-orange-500 text-sm uppercase tracking-wider font-medium border-none"
              >
                {stat.label}
              </Badge>
            </div>
          ))}
        </div>
      </section>
      {/* 
        FEATURES SECTION 
        Explaining What the App actually DOES.
      */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4">
              Your Smart Kitchen
            </h2>
            <p className="text-stone-600 text-xl font-light">
              Everything you need to master your meal prep.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-2 border-stone-200 bg-white hover:border-orange-600 hover:shadow-lg transition-all group py-0"
                >
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="border-2 border-stone-200 bg-orange-50 p-3 group-hover:border-orange-600 group-hover:bg-orange-100 transition-colors">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-xs font-mono bg-stone-100 text-stone-600 uppercase tracking-wide border border-stone-200"
                      >
                        {feature.limit}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-stone-600 text-lg font-light">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      {/* 
        HOW IT WORKS 
        A step-by-step guide for new users.
      */}
      <HowItWorks />
      {/* 
        PRICING SECTION 
        Where we convince people to upgrade to PRO.
      */}
      {/* remianing */}
      pricing section here
    </div>
  );
}
