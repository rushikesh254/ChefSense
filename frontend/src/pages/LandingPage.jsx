import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import TiltedCard from "@/components/ReactBits/TiltedCard";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, Users } from "lucide-react";
import { SITE_STATS } from "@/lib/data";
import { motion as Motion } from "motion/react";
import Popular from "@/components/Popular";

import { FEATURES } from "@/lib/data";

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

            <Motion.div
              className="flex-1 text-center md:text-left w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
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
            </Motion.div>

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
                className="bg-transparent hover:text-brand-500 text-brand-400 text-xs uppercase tracking-wider font-medium border-none"
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
                  className="border-2 border-stone-200 bg-white hover:border-brand-600  hover:-translate-y-1 transition-all duration-300 group "
                >
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="rounded-xl border-2 border-stone-200 bg-linear-to-br from-brand-50 to-brand-100 p-3">
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
      <div className="text-8xl mt-20 bg-pink-700">main page</div>;
    </div>
  );
};

export default LandingPage;
