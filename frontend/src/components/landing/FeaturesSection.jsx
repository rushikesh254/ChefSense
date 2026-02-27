import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FEATURES } from "@/lib/data";

export default function FeaturesSection() {
  return (
    <section className="py-20 sm:py-24 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}

        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 mb-4 text-balance">
            Your Smart Kitchen
          </h2>
          <p className="text-stone-500 text-base sm:text-lg font-medium">
            Everything you need to master your meal prep.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {FEATURES.map((feature) => (
            <Card
              key={feature.title}
              className="rounded-2xl border-stone-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start gap-5">
             
                  <div className="shrink-0 rounded-2xl bg-brand-50 p-3.5 group-hover:border-orange-600 group-hover:border-2   group-hover:scale-105 transition-transform">
                    <feature.icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <div className="pt-1">
                    <div className="flex items-baseline gap-3 mb-1.5">
                      <h3 className="text-lg font-bold text-stone-900">
                        {feature.title}
                      </h3>
                      <span className="text-sm text-stone-400">
                        {feature.limit}
                      </span>
                    </div>
                    <p className="text-base text-stone-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
