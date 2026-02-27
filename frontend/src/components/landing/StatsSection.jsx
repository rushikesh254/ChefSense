import React from "react";
import { SITE_STATS } from "@/lib/data";

export default function StatsSection() {
  return (
    <section className="py-10 sm:py-14 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl border border-stone-200/60 bg-white px-6 sm:px-8 py-8 sm:py-10 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4">
            {SITE_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-700 mb-1">
                  {stat.val}
                </div>
                <span className="text-stone-500 text-xs sm:text-sm uppercase tracking-widest font-semibold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
