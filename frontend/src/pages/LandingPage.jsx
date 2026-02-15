import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import PopularSection from "@/components/landing/PopularSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import StepsSection from "@/components/landing/StepsSection";
import CTASection from "@/components/landing/CTASection";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <PopularSection />
      <FeaturesSection />
      <StepsSection />
      <CTASection />
    </div>
  );
};

export default LandingPage;
