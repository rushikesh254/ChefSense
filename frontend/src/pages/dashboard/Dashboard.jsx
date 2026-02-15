import React from "react";
import { DUMMY_DATA } from "@/lib/dummydata";
import { Img as Image } from "@/components/ui/img";
import { Badge } from "@/components/ui/badge";
import { Flame } from "lucide-react";
import { stripHtml } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { getCategoryEmoji } from "@/lib/data";

const {
  recipeOfTheDay,
  categories,
  cuisines,
  diets,
  trending,
  quickMeals,
  wasteStats,
  recentlyViewed,
  cookingTips,
} = DUMMY_DATA;

let heroSummary = "";

if (recipeOfTheDay && recipeOfTheDay.summary) {
  // Step 1: Remove HTML tags
  let cleaned = stripHtml(recipeOfTheDay.summary);

  // Step 2: Check length
  if (cleaned.length > 160) {
    heroSummary = cleaned.substring(0, 160) + "...";
  } else {
    heroSummary = cleaned;
  }
}

const heroRating =
  typeof recipeOfTheDay?.rating === "number" ? recipeOfTheDay.rating : 4.9;
const Dashboard = () => {
  return (
    <div className="min-h-screen pb-24">
      {/* hero section  */}

      {recipeOfTheDay && (
        <section className="relative h-[85vh] w-full overflow-hidden">
          <Image
            src={recipeOfTheDay.image}
            alt={recipeOfTheDay.title}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

          {/* content  */}

          <div className="relative z-10 mx-auto h-full max-w-7xl px-6 flex flex-col justify-center">
            <div className="max-w-2xl space-y-6">
              <Badge className="bg-brand-500 hover:bg-brand-800 text-white border-none px-4 py-1 text-xs font-bold uppercase tracking-widest">
                <Flame
                  className="mr-2 w-3.5 h-3.5 fill-current"
                  aria-hidden="true"
                />
                Featured Today
              </Badge>

              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tighter">
                {recipeOfTheDay.title}
              </h1>

              <p className="text-lg md:text-xl text-stone-200/90 leading-relaxed max-w-lg font-medium">
                {heroSummary}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button
                  size="lg"
                  variant="primary"
                  className="rounded-full px-8 py-7 text-lg font-bold  transition-all hover:scale-105 "
                >
                  Start Cooking
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                {/* Info pills */}
                <div className="flex items-center gap-5 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white">
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wider text-stone-300">
                      Ready In
                    </p>
                    <p className="text-xs font-bold text-white">
                      {recipeOfTheDay.readyInMinutes || 35}m
                    </p>
                  </div>
                  <Separator orientation="vertical" className="h-8 bg-white" />
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wider text-stone-300">
                      Rating
                    </p>
                    <p className="text-xs font-bold text-white flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {heroRating.toFixed(1)}
                    </p>
                  </div>
                  <Separator orientation="vertical" className="h-8 bg-white" />
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wider text-stone-300">
                      Servings
                    </p>
                    <p className="text-xs font-bold text-white">
                      {recipeOfTheDay.servings || 4}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Floating Search */}
      {recipeOfTheDay && (
        <div className="relative z-20 px-6 -mt-9">
          <form className="mx-auto max-w-3xl">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-brand-600 " />
              <Input
                placeholder="What you want to cook today? (e.g. Paneer tikka, Dal makhani)"
                className="h-16 w-full rounded-2xl border-none bg-white pl-16 pr-8 text-lg  ring-1 ring-stone-200 transition-all placeholder:text-stone-400"
              />
            </div>
          </form>
        </div>
      )}

      {/* main content  */}

      <div className="mx-auto max-w-7xl px-6 pt-28 space-y-28">
        {/*CATEGORIES*/}
        <section className="bg-stone-100/50 rounded-[2.5rem] p-8 sm:p-10">
          <h3 className="text-xl font-bold text-black mb-8 flex items-center gap-2">
            Explore Categories{" "}
            <ChevronRight
              className="w-4 h-4 text-brand-500"
              aria-hidden="true"
            />
          </h3>
          <div className="flex flex-wrap gap-3.5">
            {categories.map((category) => (
              <Link className="px-5 py-3 bg-white hover:bg-brand-100 border border-stone-200 rounded-full flex items-center gap-2.5 transition-all  hover:scale-105 shadow-lg hover:border-brand-600">
                <span className="text-xl group-hover:scale-125 transition-transform ">
                  {getCategoryEmoji(category.name)}
                </span>
                <span className="text-sm font-bold text-stone-700  transition-colors ">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
