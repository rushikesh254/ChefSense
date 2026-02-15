import React from "react";
import { SITE_STATS } from "@/lib/data";

export default function StatsSection() {
  return (
    <section className="py-12 sm:py-14">
      <div className="max-w-5xl mx-auto px-4">
        <div className="rounded-2xl border border-stone-200/60 bg-white/60 backdrop-blur-sm px-8 py-10 sm:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4">
            {SITE_STATS.map((stat, i) => (
              <div key={i} className="text-center relative">
                {/* Subtle divider between items on desktop */}
                {i !== 0 && (
                  <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-10 bg-stone-200" />
                )}
                <div className="text-3xl sm:text-4xl font-bold mb-1 text-stone-900 tracking-tight">
                  {stat.val}
                </div>
                <span className="text-stone-500 text-xs uppercase tracking-wider font-medium">
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
