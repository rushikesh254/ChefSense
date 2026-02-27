import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Clock, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import TiltedCard from "@/components/ReactBits/TiltedCard";
import { Card, CardContent } from "@/components/ui/card";

export default function HeroSection() {
  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Side */}
          <div className="flex-1 text-center lg:text-left">
            <Badge
              variant="outline"
              className="border-orange-200 text-orange-500 bg-orange-50/50 text-sm font-semibold mb-6 uppercase tracking-wide px-3 py-1 rounded-md"
            >
              <Sparkles className="mr-1.5 w-4 h-4" />
              #1 AI Cooking Assistant
            </Badge>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-stone-900 mb-6 leading-[1.1]">
              Turn your <br className="hidden lg:block" />
              <span className="italic text-brand-600">leftovers</span> into{" "}
              <br className="hidden sm:block" />
              masterpieces.
            </h1>

            <p className="text-lg sm:text-xl text-stone-500 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Snap a photo of your fridge. We'll tell you what to cook. Save
              money, reduce waste, and eat better tonight.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
              <Link
                to="/dashboard"
                className="flex w-full sm:w-auto items-center justify-center rounded-lg bg-brand-600 px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-brand-700"
              >
                Start Cooking Free <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                to="/how-it-works"
                className="flex w-full sm:w-auto items-center justify-center rounded-lg border border-stone-200 bg-white px-6 py-3.5 text-base font-bold text-stone-900 transition-colors hover:bg-stone-50"
              >
                See How It Works
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-3 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[
                  "https://i.pravatar.cc/150?u=admin@example.com",
                  "https://i.pravatar.cc/150?u=chef@example.com",
                  "https://i.pravatar.cc/150?u=cook@example.com",
                ].map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Cook avatar ${i + 1}`}
                    className="w-10 h-10 rounded-full border-[3px] border-white object-cover shadow-sm bg-brand-50"
                  />
                ))}
              </div>
              <p className="text-base text-stone-500">
                <span className="font-bold text-stone-900">10k+ cooks</span>{" "}
                joined last month
              </p>
            </div>
          </div>

          {/* Right Side — TiltedCard */}
          <div className="hidden lg:flex justify-center items-center w-full max-w-md xl:max-w-lg mx-auto aspect-square">
            <TiltedCard
              imageSrc="/pasta-dish.png"
              altText="Delicious pasta dish"
              captionText="Rustic Tomato Basil Pasta"
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
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-brand-500 text-brand-500"
                            />
                          ))}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-green-200 bg-green-50 text-green-700 text-xs font-semibold ml-3 mt-1"
                      >
                        98% Match
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
  );
}
