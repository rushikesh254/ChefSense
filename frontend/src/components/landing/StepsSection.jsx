import React from "react";
import { Img as Image } from "@/components/ui/img";
import Stepper, { Step } from "@/components/ReactBits/Stepper";
import { useNavigate } from "react-router-dom";

export default function StepsSection() {
  const navigate = useNavigate();
  const user = false; // replace later with real auth

  const handleFinish = () => {
    navigate(user ? "/dashboard" : "/sign-in");
  };

  return (
    <section className="relative py-16 sm:py-20 px-4 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <p className="text-brand-600 text-sm font-semibold uppercase tracking-widest mb-4">
            How It Works
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            From Photo to Feast in{" "}
            <span className="text-brand-600">3 Steps</span>
          </h2>

          <p className="text-stone-500 text-base sm:text-lg">
            Just snap a photo — our AI handles the rest.
          </p>
        </div>

        {/* Stepper Container */}
        <div
          className="
            rounded-2xl
            border border-stone-200/60
            bg-white/80
            shadow-sm
            px-6 sm:px-12 py-12
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
              <div className="text-center space-y-5">
                <h3 className="text-xl sm:text-2xl font-semibold text-stone-800">
                  📸 Take a Photo
                </h3>

                <p className="text-stone-500 max-w-md mx-auto">
                  Snap a picture of the ingredients you already have at home.
                </p>

                <Image
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e"
                  alt="Ingredients"
                  className="w-full max-w-md h-56 object-cover rounded-xl mx-auto"
                />
              </div>
            </Step>

            {/* STEP 2 */}
            <Step>
              <div className="text-center space-y-5">
                <h3 className="text-xl sm:text-2xl font-semibold text-stone-800">
                  🤖 AI Analysis
                </h3>

                <p className="text-stone-500 max-w-md mx-auto">
                  Our AI identifies ingredients and finds the best recipes for
                  you.
                </p>

                <Image
                  src="https://images.unsplash.com/photo-1697577418970-95d99b5a55cf"
                  alt="AI Analysis"
                  className="w-full max-w-md h-56 object-cover rounded-xl mx-auto"
                />
              </div>
            </Step>

            {/* STEP 3 */}
            <Step>
              <div className="text-center space-y-5">
                <h3 className="text-xl sm:text-2xl font-semibold text-stone-800">
                  🍽️ Cook & Enjoy
                </h3>

                <p className="text-stone-500 max-w-md mx-auto">
                  Pick a recipe and start cooking instantly.
                </p>

                <Image
                  src="https://images.unsplash.com/photo-1710091691780-c7eb0dc50cf8"
                  alt="Cook Food"
                  className="w-full max-w-md h-56 object-cover rounded-xl mx-auto"
                />
              </div>
            </Step>
          </Stepper>
        </div>
      </div>
    </section>
  );
}
