import React from "react";
import Stepper, { Step } from "@/components/ReactBits/Stepper";
import { useNavigate } from "react-router-dom";

export default function StepsSection() {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate("/sign-in");
  };

  return (
    <section className="py-16 sm:py-20 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand-600 text-sm font-semibold uppercase tracking-wider mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 mb-4 text-balance">
            From Photo to Feast in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-orange-400">
              3 Steps
            </span>
          </h2>
          <p className="text-stone-500 text-base sm:text-lg font-medium">
            Just snap a photo — our AI handles the rest.
          </p>
        </div>

        {/* Stepper Container */}
        <div className="rounded-2xl border border-stone-200/60 bg-white px-5 sm:px-10 py-10 shadow-sm">
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
                  className="w-full max-w-md aspect-video object-cover rounded-xl mx-auto shadow-sm"
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
                  className="w-full max-w-md aspect-video object-cover rounded-xl mx-auto shadow-sm"
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
                  className="w-full max-w-md aspect-video object-cover rounded-xl mx-auto shadow-sm"
                />
              </div>
            </Step>
          </Stepper>
        </div>
      </div>
    </section>
  );
}
