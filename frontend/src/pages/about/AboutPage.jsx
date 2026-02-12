import React from "react";
import { Img as Image } from "@/components/ui/img";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
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
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
            We&apos;re on a mission to <br />
            <span className="text-brand-600">eliminate food waste.</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            We believe that great cooking shouldn&apos;t be complicated, and it
            definitely shouldn&apos;t result in wasted food.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div
            className="relative aspect-square rounded-2xl overflow-hidden shadow-lg rotate-[0.75deg]
"
          >
            <Image
              src="https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Cooking together"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              Why ChefSense?
            </h2>
            <p className="text-stone-600 mb-6 text-lg leading-relaxed">
              Every year, billions of tons of food go to waste simply because we
              don&apos;t know what to do with the ingredients we have.
            </p>
            <p className="text-stone-600 text-lg leading-relaxed">
              Chefsense uses advanced AI to bridge the gap between your pantry
              and your plate. We help you save money, discover new flavors, and
              make the most of what you already own.
            </p>
          </div>
        </div>
        <div>
          <Card className="bg-gradient-to-b from-stone-50/80 to-stone-100/60 backdrop-blur-sm border-stone-200 shadow-lg mx-auto max-w-md ">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-6">
                Join thousands of cooks
              </h2>
              <p className="text-stone-600 mb-8 max-w-xl mx-auto text-lg">
                Start your journey towards a more sustainable and delicious
                kitchen today.
              </p>
              <Link to="/dashboard">
                <Button
                  variant="primary"
                  size="xl"
                  className="px-8 py-5 text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
