import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Img as Image } from "@/components/ui/img";
import { ArrowRight, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import TiltedCard from "@/components/ReactBits/TiltedCard";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, Users } from "lucide-react";
import { SITE_STATS } from "@/lib/data";
import Popular from "@/components/Popular";

import { FEATURES } from "@/lib/data";

import HowItWorks from "@/components/HowItWorks";

const LandingPage = () => {
  return (
    <div
      className="min-h-screen bg-stone-50 text-stone-900"
      style={{
        background: `linear-gradient(
  180deg,
  #fff 0%,
  #fff7f2 40%,
  #ffffff 100%
)`,
      }}
    >
      {/* hero section  */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/*  LEFT SIDE: Messaging */}

            <div className="flex-1 text-center md:text-left w-full">
              <Badge
                variant="outline"
                className="border-2 border-brand-600 text-brand-700 bg-brand-50 text-sm font-bold mb-6 uppercase tracking-wide"
              >
                <Flame className="mr-1 w-4 h-4" />
                #1 AI Cooking Assistant
              </Badge>

              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 leading-[0.95] tracking-tight">
                Turn your{" "}
                <span className="italic underline decoration-4 decoration-brand-600">
                  leftovers
                </span>{" "}
                into <br />
                masterpieces.
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-stone-600 mb-8 sm:mb-10 max-w-lg mx-auto md:mx-0 font-light">
                Snap a photo of your fridge. We&apos;ll tell you what to cook.
                Save money, reduce waste, and eat better tonight.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center md:justify-start">
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button
                    size="xl"
                    variant="primary"
                    className="w-full px-8 py-4 md:py-6 text-base md:text-lg"
                  >
                    Start Cooking Free <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/demo" className="w-full sm:w-auto">
                  <Button
                    size="xl"
                    variant="outline"
                    className="w-full px-8 py-4 md:py-6 text-base md:text-lg border-2"
                  >
                    Watch Demo
                  </Button>
                </Link>
              </div>

              <p className="mt-6 text-sm text-stone-500">
                <span className="font-bold text-stone-900">10k+ cooks</span>{" "}
                joined last month
              </p>
            </div>

            {/* RIGHT SIDE: Visual/Image - Hidden on mobile, shown on md+ */}
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
                  <Card className="mx-8 mb-8 bg-white/95 backdrop-blur-sm border border-stone-900 shadow-xl ">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-xl text-gray-700  ">
                            Rustic Tomato Basil Pasta
                          </h3>
                          <div className="flex gap-0.5 mt-1">
                            {[...Array(5)].map((e, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-brand-500 text-brand-500"
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
      <section className="py-16 bg-stone-900">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 text-center px-4">
          {SITE_STATS.map((stat, i) => (
            <div key={i}>
              <div className="text-2xl sm:text-4xl font-bold mb-1 text-stone-50">
                {stat.val}
              </div>
              <Badge
                variant="secondary"
                className="bg-transparent hover:text-brand-500 hover:bg-slate-0 text-brand-400 text-xs uppercase tracking-wider font-medium border-none  transition"
              >
                {stat.label}
              </Badge>
            </div>
          ))}
        </div>
      </section>
      {/* POPULAR RECIPES SECTION  */}
      <Popular />
      {/* 
        FEATURES SECTION 
        Explaining What the App actually DOES.
      */}
      <section className="relative py-20 sm:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-50/30 to-white pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 md:mb-20 max-w-2xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.05]">
              Your Smart Kitchen
            </h2>

            <p className="text-lg sm:text-xl text-stone-600 font-light">
              Everything you need to master your meal prep.
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {FEATURES.map((feature, index) => {
              const IconComponent = feature.icon;

              return (
                <Card
                  key={index}
                  className="
              border border-stone-200/60
              bg-white/80
              backdrop-blur-sm
              rounded-2xl
              shadow-sm
              hover:shadow-lg
              transition-all duration-300
              hover:-translate-y-1
              group
            "
                >
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      {/* Icon */}
                      <div
                        className="
                  rounded-xl
                  bg-gradient-to-br
                  from-brand-50
                  to-brand-100
                  p-3
                  border border-brand-100
                  group-hover:scale-105
                  transition
                "
                      >
                        <IconComponent className="w-6 h-6 text-brand-600" />
                      </div>

                      {/* Limit Badge */}
                      <Badge
                        variant="secondary"
                        className="
                    text-xs
                    bg-stone-100
                    text-stone-600
                    uppercase
                    tracking-wide
                    border border-stone-200
                  "
                      >
                        {feature.limit}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-semibold mb-3">
                      {feature.title}
                    </h3>

                    <p className="text-stone-600 font-light leading-relaxed">
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
      {/* CTA section
      tells users to get started, with a link to the dashboard and demo video. */}
      <section className="relative py-28 px-4 ">
        {/* Very subtle ambient glow (matches page bg) */}

        <div className="relative max-w-6xl mx-auto">
          <div
            className="
        rounded-3xl
        border border-stone-200
        bg-linear-to-b from-stone-50/80 to-stone-100/60
        backdrop-blur-sm
        shadow-[0_30px_80px_rgba(0,0,0,0.06)]
        px-8 sm:px-16 py-16
        text-center
      "
          >
            {/* Badge */}
            <Badge
              variant="outline"
              className="mb-6 border-brand-600 text-brand-700 bg-brand-50 font-bold uppercase tracking-wide"
            >
              Start Cooking Smarter
            </Badge>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Your next great meal
              <br />
              <span className="italic underline decoration-4 decoration-brand-600">
                is already in your fridge.
              </span>
            </h2>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto mb-10 font-light">
              Scan your pantry, let AI do the thinking, and cook something
              amazing tonight — without wasting food or money.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/dashboard">
                <Button
                  size="xl"
                  variant="primary"
                  className="px-10 py-6 text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  aria-label="Scan pantry for recipes"
                >
                  Scan My Pantry Free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button
                  size="xl"
                  variant="outline"
                  className="px-10 py-6 text-lg border-2 hover:bg-stone-100 transition-colors"
                >
                  See How It Works
                </Button>
              </Link>
            </div>

            {/* Trust Line */}
            <p className="mt-8 text-sm text-stone-500">
              No credit card required · Takes less than 30 seconds
            </p>
          </div>
        </div>
      </section>
      {/* 
        PRICING SECTION 
        Where we convince people to upgrade to PRO.
      */}
      {/* remianing */}

      <div className="bg-pink-400">pricing section here</div>
    </div>
  );
};

export default LandingPage;
