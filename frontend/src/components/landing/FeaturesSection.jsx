import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FEATURES } from "@/lib/data";

export default function FeaturesSection() {
  return (
    <section className="relative py-16 sm:py-20 px-4 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <p className="text-brand-600 text-sm font-semibold uppercase tracking-widest mb-4">
            Features
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Your Smart Kitchen
          </h2>

          <p className="text-stone-500 text-base sm:text-lg">
            Everything you need to master your meal prep.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {FEATURES.map((feature, index) => {
            const IconComponent = feature.icon;

            return (
              <Card
                key={index}
                className="
                  border border-stone-200/60
                  bg-white/80
                  rounded-2xl
                  shadow-sm
                  hover:shadow-md
                  transition duration-300
                  hover:-translate-y-1
                  group
                "
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="
                        shrink-0
                        rounded-xl
                        bg-brand-50
                        p-3
                        border border-brand-100
                        group-hover:scale-105
                        transition-transform
                      "
                    >
                      <IconComponent
                        className="w-5 h-5 text-brand-600"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Text */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="text-base font-semibold text-stone-800">
                          {feature.title}
                        </h3>
                        <span className="text-xs text-stone-400 font-medium uppercase tracking-wide">
                          {feature.limit}
                        </span>
                      </div>

                      <p className="text-sm text-stone-500 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
