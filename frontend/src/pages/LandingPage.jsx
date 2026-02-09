import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import TiltedCard from "@/components/ReactBits/TiltedCard";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, Users } from "lucide-react";

import { motion as Motion } from "motion/react";
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
            {/* 1. LEFT SIDE: Messaging */}

            {/* <div className="flex-1 text-center md:text-left"> */}
            <Motion.div
              className="flex-1 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                variant="outline"
                className="border-2 border-orange-600 text-orange-700 bg-orange-50 text-sm font-bold mb-6 uppercase tracking-wide"
              >
                <Flame className="mr-1 w-4 h-4" />
                #1 AI Cooking Assistant
              </Badge>

              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 leading-[0.95] tracking-tight">
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

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Link to="/dashboard">
                  <Button
                    size="xl"
                    variant="primary"
                    className="px-8 py-6 text-lg"
                  >
                    Start Cooking Free <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button
                    size="xl"
                    variant="outline"
                    className="px-8 py-6 text-lg border-2"
                  >
                    Watch Demo
                  </Button>
                </Link>
              </div>

              <p className="mt-6 text-sm text-stone-500">
                <span className="font-bold text-stone-900">10k+ cooks</span>{" "}
                joined last month
              </p>
              {/* </div> */}
            </Motion.div>




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
                          <h3 className="font-bold text-xl text-gray-700  ">
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
      <div className="text-8xl mt-20">main page</div>;
    </div>
  );
};

export default LandingPage;
