import React from "react";
import { DUMMY_DATA } from "@/lib/dummydata";
import { stripHtml } from "@/lib/utils";
import {
  Flame,
  Star,
  ArrowRight,
  Search,
  Clock3,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { getCategoryEmoji, slugify } from "@/lib/data";

const Dashboard = () => {
  const { recipeOfTheDay, categories, trending } = DUMMY_DATA;

  const heroSummary = (() => {
    if (!recipeOfTheDay?.summary) return "";
    const cleaned = stripHtml(recipeOfTheDay.summary);
    return cleaned.length > 160 ? cleaned.substring(0, 160) + "..." : cleaned;
  })();

  const heroRating =
    typeof recipeOfTheDay?.rating === "number" ? recipeOfTheDay.rating : 4.9;

  return (
    <div className="min-h-screen pb-16 sm:pb-20">
      {/* Hero */}
      {recipeOfTheDay && (
        <section className="relative h-[70vh] sm:h-[75vh] w-full overflow-hidden">
          <img
            src={recipeOfTheDay.image}
            alt={recipeOfTheDay.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

          <div className="relative z-10 mx-auto h-full max-w-7xl px-5 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-20">
            <div className="max-w-xl space-y-4">
              <Badge className="border border-brand-400/30 bg-brand-500/80 backdrop-blur-md text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
                <Flame className="mr-1.5 w-3.5 h-3.5" />
                Featured Today
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {recipeOfTheDay.title}
              </h1>

              <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-md">
                {heroSummary}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-stone-300">
                <span className="flex items-center gap-1">
                  <Clock3 className="w-4 h-4" />
                  {recipeOfTheDay.readyInMinutes || 35} min
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {heroRating.toFixed(1)}
                </span>
                <span>{recipeOfTheDay.servings || 4} servings</span>
              </div>

              <Button
                asChild
                variant="primary"
                size="lg"
                className="mt-2 rounded-lg shadow-lg shadow-brand-500/25 font-bold"
              >
                <Link to={`/recipe/${recipeOfTheDay.id}`}>
                  Start Cooking <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Search */}
      <div className="px-5 sm:px-6 lg:px-8 -mt-7 relative z-20">
        <form className="mx-auto max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <Input
              placeholder="Search recipes (e.g. Paneer tikka, Dal makhani)"
              className="h-14 sm:h-16 w-full rounded-2xl bg-white pl-12 pr-4 text-sm sm:text-base shadow-xl shadow-stone-200/50 border border-stone-200 placeholder:text-stone-400"
            />
          </div>
        </form>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 mt-16 space-y-16 sm:space-y-20">
        {/* Categories */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 text-balance mb-6">
            Explore Categories
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/recipes/category/${slugify(cat.name)}`}
                className="px-4 py-2 bg-white border border-stone-200 rounded-full flex items-center gap-2 text-sm font-medium text-stone-700 shadow-sm hover:shadow hover:border-brand-500 hover:bg-brand-50 transition-all"
              >
                <span className="text-lg">{getCategoryEmoji(cat.name)}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Trending */}
        <section>
          <div className="flex items-center gap-2.5 mb-8">
            <TrendingUp className="w-5 h-5 text-brand-600" />
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 text-balance">
              Trending Recipes
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {trending.map((recipe) => (
              <Link
                key={recipe.id}
                to={`/recipe/${recipe.id}`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-stone-100 shadow-sm transition-shadow hover:shadow-md">
                  <AspectRatio ratio={3 / 4}>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      loading="lazy"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </AspectRatio>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 space-y-1">
                    <span className="text-xs text-stone-300 flex items-center gap-1">
                      <Clock3 className="w-3 h-3" />
                      {recipe.readyInMinutes || 30} min
                    </span>
                    <p className="text-white font-bold text-base sm:text-lg leading-snug line-clamp-2">
                      {recipe.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
