import React from "react";
import { Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { popularRecipes } from "@/lib/data";

export default function PopularSection() {
  return (
    <section className="py-16 sm:py-20 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-brand-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Trending This Week
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 mb-3 text-balance">
            Popular Right Now
          </h2>
          <p className="text-stone-500 text-base sm:text-lg">
            Discover what thousands of cooks are loving today.
          </p>
        </div>

        {/* Grid container */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {popularRecipes.slice(0, 4).map((recipe) => (
            <Link key={recipe.id} to="/dashboard" className="group">
              {/* Card wrapper */}
              <div className="relative overflow-hidden rounded-2xl bg-stone-100 aspect-[3/4] shadow-sm transition-shadow hover:shadow-md">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 space-y-1.5">
                  <div className="flex items-center gap-3.5 text-xs font-medium text-stone-200">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {recipe.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      {recipe.rating}
                    </span>
                  </div>
                  <p className="text-white font-bold text-base sm:text-lg leading-snug line-clamp-2">
                    {recipe.title}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
