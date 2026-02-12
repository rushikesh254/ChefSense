import React from "react";
import { Img as Image } from "@/components/ui/img";
import Stepper, { Step } from "@/components/reactBits/Stepper";
import { useNavigate } from "react-router-dom";

export default function HowItWorks() {
  const navigate = useNavigate();
  const user = false; // replace later with real auth

  const handleFinish = () => {
    navigate(user ? "/dashboard" : "/sign-in");
  };

  return (
    <section className="relative py-24 sm:py-32 px-4 overflow-hidden">
      {/* Background matches landing gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-50/20 to-white pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 mb-6 leading-tight">
            From Photo to Feast in{" "}
            <span className="text-brand-600">3 Simple Steps</span>
          </h2>

          <p className="text-lg sm:text-xl text-stone-600 font-light">
            Just snap a photo — our AI handles the rest.
          </p>
        </div>

        {/* Stepper Container */}
        <div
          className="
            rounded-3xl
            border border-stone-200/60
            bg-white/80
            backdrop-blur-sm
            shadow-[0_30px_80px_rgba(0,0,0,0.06)]
            px-6 sm:px-12 py-14
          "
        >
          <Stepper
            initialStep={1}
            onFinalStepCompleted={handleFinish}
            backButtonText="Back"
            nextButtonText="Next"
            finishButtonText="Get Started"
          >
            {/* STEP 1 */}
            <Step>
              <div className="text-center space-y-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-stone-900">
                  📸 Take a Photo
                </h3>

                <p className="text-stone-600 max-w-md mx-auto">
                  Snap a picture of the ingredients you already have at home.
                </p>

                <Image
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e"
                  alt="Ingredients"
                  className="w-full max-w-md h-64 object-cover rounded-2xl mx-auto shadow-md"
                />
              </div>
            </Step>

            {/* STEP 2 */}
            <Step>
              <div className="text-center space-y-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-stone-900">
                  🤖 AI Analysis
                </h3>

                <p className="text-stone-600 max-w-md mx-auto">
                  Our AI identifies ingredients and finds the best recipes for
                  you.
                </p>

                <Image
                  src="https://images.unsplash.com/photo-1697577418970-95d99b5a55cf"
                  alt="AI Analysis"
                  className="w-full max-w-md h-64 object-cover rounded-2xl mx-auto shadow-md"
                />
              </div>
            </Step>

            {/* STEP 3 */}
            <Step>
              <div className="text-center space-y-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-stone-900">
                  🍽️ Cook & Enjoy
                </h3>

                <p className="text-stone-600 max-w-md mx-auto">
                  Pick a recipe and start cooking instantly.
                </p>

                <Image
                  src="https://images.unsplash.com/photo-1710091691780-c7eb0dc50cf8"
                  alt="Cook Food"
                  className="w-full max-w-md h-64 object-cover rounded-2xl mx-auto shadow-md"
                />
              </div>
            </Step>
          </Stepper>
        </div>
      </div>
    </section>
  );
}
