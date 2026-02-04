"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Stepper, { Step } from "@/components/reactBits/Stepper";

export default function HowItWorks() {
  const router = useRouter();
  // TODO: Replace with real auth check when available
  const user = false;

  return (
    <section className="py-8 sm:py-12 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-3">
            From Photo to Feast in{" "}
            <span className="text-orange-600">3 Steps</span>
          </h2>
          <p className="text-stone-600">
            Just snap a photo and let our AI do the magic.
          </p>
        </div>

        <Stepper
          initialStep={1}
          onFinalStepCompleted={() =>
            router.push(user ? "/dashboard" : "/sign-in")
          }
          backButtonText="Back"
          nextButtonText="Next"
          finishButtonText="Get Started"
        >
          <Step>
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-stone-900">
                📸 Take a Photo
              </h3>
              <p className="text-stone-600">
                Click a picture of the ingredients you have at home.
              </p>
              <Image
                src="https://images.unsplash.com/photo-1542838132-92c53300491e"
                alt="Ingredients"
                width={400}
                height={250}
                className="rounded-xl mx-auto"
              />
            </div>
          </Step>

          <Step>
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-stone-900">
                🤖 AI Analysis
              </h3>
              <p className="text-stone-600">
                Our AI detects ingredients and finds matching recipes.
              </p>
              <Image
                // src="https://images.unsplash.com/photo-1621255551928-84226a273b07"

                src="https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?q=80&w=996&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="AI Analysis"
                width={400}
                height={250}
                className="rounded-xl mx-auto"
              />
            </div>
          </Step>

          <Step>
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-stone-900">
                🍽️ Cook & Enjoy
              </h3>
              <p className="text-stone-600">
                Choose a recipe and start cooking instantly.
              </p>
              <Image
                src="https://images.unsplash.com/photo-1710091691780-c7eb0dc50cf8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Food"
                width={400}
                height={250}
                className="rounded-xl mx-auto"
              />
            </div>
          </Step>
        </Stepper>
      </div>
    </section>
  );
}
