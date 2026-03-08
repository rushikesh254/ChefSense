import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Clock, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import TiltedCard from "@/components/ReactBits/TiltedCard";
import { Card, CardContent } from "@/components/ui/card";
import Stepper, { Step } from "@/components/ReactBits/Stepper";
import { useNavigate } from "react-router-dom";
import { FEATURES, SITE_STATS } from "@/lib/data";



const LandingPage = () => {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate("/sign-in");
  };
  return (
    <div className="min-h-screen">
      {/* hero section  */}
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
                <span className="italic text-brand-600">
                  leftovers
                </span> into <br className="hidden sm:block" />
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
                      className="w-10 h-10 rounded-full border-[3px] border-white object-cover shadow-xs bg-brand-50"
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
                  <Card className="mx-8 mb-8 bg-white/95 backdrop-blur-xs border border-stone-200 shadow-xs">
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

      {/* steps section  */}
      <section className="py-16 sm:py-20 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-brand-600 text-sm font-semibold uppercase tracking-wider mb-3">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 mb-4 text-balance">
              From Photo to Feast in{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-500 to-orange-400">
                3 Steps
              </span>
            </h2>
            <p className="text-stone-500 text-base sm:text-lg font-medium">
              Just snap a photo — our AI handles the rest.
            </p>
          </div>

          {/* Stepper Container */}
          <div className="rounded-2xl border border-stone-200/60 bg-white px-5 sm:px-10 py-10 shadow-xs">
            <Stepper
              initialStep={1}
              onFinalStepCompleted={handleFinish}
              backButtonText="Back"
              nextButtonText="Next"
              finishButtonText="Get Started"
            >
              <Step>
                <div className="text-center space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                    📸 Take a Photo
                  </h3>
                  <p className="text-stone-500 max-w-md mx-auto text-base font-medium">
                    Snap a picture of the ingredients you already have at home.
                  </p>
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e"
                    alt="Ingredients"
                    loading="lazy"
                    className="w-full max-w-md aspect-video object-cover rounded-xl mx-auto shadow-xs"
                  />
                </div>
              </Step>

              <Step>
                <div className="text-center space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                    🤖 AI Analysis
                  </h3>
                  <p className="text-stone-500 max-w-md mx-auto text-base font-medium">
                    Our AI identifies ingredients and finds the best recipes for
                    you.
                  </p>
                  <img
                    src="https://images.unsplash.com/photo-1697577418970-95d99b5a55cf"
                    alt="AI Analysis"
                    loading="lazy"
                    className="w-full max-w-md aspect-video object-cover rounded-xl mx-auto shadow-xs"
                  />
                </div>
              </Step>

              <Step>
                <div className="text-center space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                    🍽️ Cook & Enjoy
                  </h3>
                  <p className="text-stone-500 max-w-md mx-auto text-base font-medium">
                    Pick a recipe and start cooking instantly.
                  </p>
                  <img
                    src="https://images.unsplash.com/photo-1710091691780-c7eb0dc50cf8"
                    alt="Cook Food"
                    loading="lazy"
                    className="w-full max-w-md aspect-video object-cover rounded-xl mx-auto shadow-xs"
                  />
                </div>
              </Step>
            </Stepper>
          </div>
        </div>
      </section>

      {/* features section  */}
      <section className="py-20 sm:py-24 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}

          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-brand-600 text-sm font-semibold uppercase tracking-wider mb-3">
              Features
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 mb-4 text-balance">
              Your Smart Kitchen
            </h2>
            <p className="text-stone-500 text-base sm:text-lg font-medium">
              Everything you need to master your meal prep.
            </p>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {FEATURES.map((feature) => (
              <Card
                key={feature.title}
                className="rounded-2xl border-stone-200/60 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-5">
                    <div className="shrink-0 rounded-2xl bg-brand-50 p-3.5 group-hover:border-orange-600 group-hover:border-2   group-hover:scale-105 transition-transform">
                      <feature.icon className="w-6 h-6 text-brand-600" />
                    </div>
                    <div className="pt-1">
                      <div className="flex items-baseline gap-3 mb-1.5">
                        <h3 className="text-lg font-bold text-stone-900">
                          {feature.title}
                        </h3>
                        <span className="text-sm text-stone-400">
                          {feature.limit}
                        </span>
                      </div>
                      <p className="text-base text-stone-500 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* stats section  */}
      <section className="py-10 sm:py-14 px-5 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-stone-200/60 bg-white px-6 sm:px-8 py-8 sm:py-10 shadow-xs">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4">
              {SITE_STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-700 mb-1">
                    {stat.val}
                  </div>
                  <span className="text-stone-500 text-xs sm:text-sm uppercase tracking-widest font-semibold">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA section  */}
      <section className="py-20 sm:py-28 px-5 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-stone-200 bg-white px-6 sm:px-12 py-12 sm:py-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight text-balance">
              Your next great meal
              <br />
              <span className="text-brand-600">is already in your fridge.</span>
            </h2>

            <p className="text-stone-500 text-base sm:text-lg max-w-xl mx-auto mb-8">
              Scan your pantry, let AI do the thinking, and cook something
              amazing tonight — without wasting food or money.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
              <Button asChild variant="primary" size="lg">
                <Link to="/dashboard">
                  Scan My Pantry Free <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/how-it-works">See How It Works</Link>
              </Button>
            </div>

            <p className="mt-5 text-sm text-stone-400">
              No credit card required · Takes less than 30 seconds
            </p>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default LandingPage;
