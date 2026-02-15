import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="relative py-16 sm:py-20 px-4">
      <div className="relative max-w-4xl mx-auto">
        <div
          className="
            rounded-2xl
            border border-stone-200/60
            bg-white/80
            shadow-sm
            px-8 sm:px-16 py-14 sm:py-16
            text-center
          "
        >
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight">
            Your next great meal
            <br />
            <span className="text-brand-600">is already in your fridge.</span>
          </h2>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-stone-500 max-w-xl mx-auto mb-8">
            Scan your pantry, let AI do the thinking, and cook something amazing
            tonight — without wasting food or money.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <Button
              asChild
              size="xl"
              variant="primary"
              className="px-8 py-5 text-base sm:text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              <Link to="/dashboard">
                Scan My Pantry Free{" "}
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="px-8 py-5 text-base sm:text-lg border-2 hover:bg-stone-50 transition-colors"
            >
              <Link to="/how-it-works">See How It Works</Link>
            </Button>
          </div>

          {/* Trust Line */}
          <p className="mt-6 text-xs text-stone-400">
            No credit card required · Takes less than 30 seconds
          </p>
        </div>
      </div>
    </section>
  );
}
