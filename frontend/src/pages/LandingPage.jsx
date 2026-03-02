import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import StepsSection from "@/components/landing/StepsSection";
import CTASection from "@/components/landing/CTASection";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StepsSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </div>
  );
};

export default LandingPage;
