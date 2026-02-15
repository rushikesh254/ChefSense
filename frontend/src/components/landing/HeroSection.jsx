import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame, Star, Clock, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import TiltedCard from "@/components/ReactBits/TiltedCard";
import { Card, CardContent } from "@/components/ui/card";
import { SOCIAL_PROOF } from "@/lib/data";

export default function HeroSection() {
  return (
    <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* LEFT SIDE: Messaging */}
          <div className="flex-1 text-center md:text-left w-full">
            <Badge
              variant="outline"
              className="border border-brand-200 text-brand-600 bg-brand-50/60 text-xs font-semibold mb-6 uppercase tracking-widest px-4 py-1.5"
            >
              <Sparkles className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" />
              #1 AI Cooking Assistant
            </Badge>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 leading-[0.95] tracking-tight">
              Turn your <span className="italic text-brand-600">leftovers</span>{" "}
              into <br />
              masterpieces.
            </h1>

            <p className="text-lg sm:text-xl text-stone-500 mb-8 sm:mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Snap a photo of your fridge. We&apos;ll tell you what to cook.
              Save money, reduce waste, and eat better tonight.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center md:justify-start">
              <Button
                asChild
                size="xl"
                variant="primary"
                className="w-full sm:w-auto px-8 py-4 md:py-6 text-base md:text-lg"
              >
                <Link to="/dashboard">
                  Start Cooking Free{" "}
                  <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="w-full sm:w-auto px-8 py-4 md:py-6 text-base md:text-lg border-2 hover:bg-stone-50"
              >
                <Link to="/how-it-works">See How It Works</Link>
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-3 justify-center md:justify-start">
              <div className="flex -space-x-2">
                {["🧑‍🍳", "👨‍🍳", "👩‍🍳"].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-brand-100 border-2 border-white flex items-center justify-center text-sm"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <p className="text-sm text-stone-500">
                <span className="font-semibold text-stone-800">
                  {SOCIAL_PROOF.count}
                </span>{" "}
                {SOCIAL_PROOF.label}
              </p>
            </div>
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
                <Card className="mx-8 mb-8 bg-white/95 backdrop-blur-sm border border-stone-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-stone-800">
                          Rustic Tomato Basil Pasta
                        </h3>
                        <div className="flex gap-0.5 mt-1">
                          {[...Array(5)].map((e, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-brand-500 text-brand-500"
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="border ml-3 mt-1 border-green-200 bg-green-50 text-green-700 text-xs font-semibold"
                      >
                        98% Match
                      </Badge>
                    </div>
                    <div className="flex gap-4 text-xs text-stone-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" aria-hidden="true" /> 25 mins
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" aria-hidden="true" /> 2
                        servings
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
  );
}
