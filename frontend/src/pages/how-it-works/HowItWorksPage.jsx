import { Button } from "@/components/ui/button";
import { STEPS } from "@/lib/siteContent";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function HowItWorksPage() {
  return (
    <div className="min-h-screen flex justify-center items-center pt-20">
      <div className="max-w-3xl mx-auto my-2 sm:my-10 ">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-20">
          <p className="text-xs sm:text-sm font-bold uppercase  text-brand-500 mb-3 sm:mb-4">
            How it works
          </p>

          <h1 className="text-4xl sm:text-6xl font-extrabold  mb-4 px-5 sm:px-10 lg:px-16">
            Fridge to fork in
            <span className="text-brand-500 ">
              {" "}
              <br />4 steps
            </span>
          </h1>
          <p className="text-stone-500 text-sm sm:text-base max-w-xs sm:max-w-sm mx-auto">
            No cooking experience needed. ChefSense does the hard thinking so
            you can focus on eating.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-5">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="flex  flex-col sm:flex-row bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm"
              >
                {/* Image */}
                <div className="w-full sm:w-48 h-44 sm:h-auto shrink-0">
                  <img
                    src={step.img}
                    alt={step.alt}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-lg border-2 bg-brand-500/10  flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-brand-500" />
                    </div>
                    <span className="text-xs font-bold text-stone-400 uppercase">
                      Step{step.id}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold mb-2">
                    {step.title}
                  </h2>
                  <p className="text-stone-500 text-sm ">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 bg-stone-50 rounded-2xl sm:rounded-3xl px-6 py-10 sm:p-12 text-center border border-stone-100 shadow-sm">
          <p className="text-xs font-semibold uppercase mb-3">Ready to try?</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-6">
            Your next great meal is
            <br className="hidden sm:block" /> already in your fridge.
          </h2>
          <Link to="dashboard">
            <Button
              variant="primary"
              className="h-11 px-8 text-sm font-bold gap-2 rounded-full w-full sm:w-auto"
            >
              Start Cooking Free <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HowItWorksPage;
