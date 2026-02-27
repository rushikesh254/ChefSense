import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-20 sm:py-28 px-5 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl border border-stone-200 bg-white px-6 sm:px-12 py-12 sm:py-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight text-balance">
            Your next great meal
            <br />
            <span className="text-brand-600">is already in your fridge.</span>
          </h2>

          <p className="text-stone-500 text-base sm:text-lg max-w-xl mx-auto mb-8">
            Scan your pantry, let AI do the thinking, and cook something amazing
            tonight — without wasting food or money.
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
  );
}
