import React from "react";
import { useState, useCallback } from "react";
import { DUMMY_DATA } from "@/lib/dummydata";

import {
  Flame,
  Star,
  ArrowRight,
  Search,
  Clock3,
  TrendingUp,
  Leaf,
  Lightbulb,
  History,
  ChevronRight,
} from "lucide-react";

import { stripHtml } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import {
  getCategoryEmoji,
  slugify,
  getCountryFlag,
  getDietEmoji,
  dietColors,
} from "@/lib/data";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  const {
    recipeOfTheDay,
    categories,
    trending,
    quickMeals,
    cuisines,
    diets,
    recentlyViewed,
    cookingTips,
  } = DUMMY_DATA;

  const heroSummary = (() => {
    if (!recipeOfTheDay?.summary) return "";
    const cleaned = stripHtml(recipeOfTheDay.summary);
    return cleaned.length > 160 ? cleaned.substring(0, 160) + "..." : cleaned;
  })();

  const heroRating =
    typeof recipeOfTheDay?.rating === "number" ? recipeOfTheDay.rating : 4.9;

  // const [randomTip, setRandomTip] = React.useState(null);

  // React.useEffect(() => {
  //   if (cookingTips && cookingTips.length > 0) {
  //     setRandomTip(cookingTips[Math.floor(Math.random() * cookingTips.length)]);
  //   }
  // }, [cookingTips]);

  const [tipIndex, setTipIndex] = useState(() =>
    Math.floor(Math.random() * cookingTips.length),
  );

  const randomTip = cookingTips[tipIndex];

  const refreshTip = useCallback(() => {
    setTipIndex((prev) => {
      let next = prev;
      while (next === prev && cookingTips.length > 1) {
        next = Math.floor(Math.random() * cookingTips.length);
      }
      return next;
    });
  }, [cookingTips]);

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
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto max-w-3xl"
        >
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
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 space-y-16 sm:space-y-24 lg:space-y-32">
        {/* Categories */}

        {categories?.length > 0 && (
          <section className="bg-stone-100/50 rounded-[2.5rem] p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 text-balance mb-6 flex items-center gap-2">
              Explore Styles{" "}
              <ChevronRight
                className="w-4 h-4 text-brand-500"
                aria-hidden="true"
              />
            </h2>

            <div className="flex flex-wrap gap-3.5">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  to={`/recipes/category/${slugify(cat.name)}`}
                  className="group px-5 py-3 bg-white hover:bg-brand-50 border border-stone-200 rounded-full flex items-center gap-2.5 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-brand-200/50 hover:border-brand-500"
                >
                  <span className="text-xl group-hover:scale-125 transition-transform duration-300">
                    {getCategoryEmoji(cat.name)}
                  </span>
                  <span className="text-sm font-bold text-stone-700 group-hover:text-brand-500 transition-colors duration-300">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Trending */}

        {trending?.length > 0 && (
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
        )}

        {/* Quick Meals */}
        {quickMeals?.length > 0 && (
          <section className="bg-stone-50 rounded-2xl p-5 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-stone-500 mb-1 font-semibold uppercase tracking-wider">
                  Quick Recipes
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 text-balance">
                  Ready in 15 Minutes
                </h2>
              </div>
              <Button variant="outline" size="sm" className="rounded-full">
                View All
              </Button>
            </div>

            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {quickMeals.map((meal) => (
                  <CarouselItem
                    key={meal.id}
                    className="pl-4 basis-[70%] sm:basis-[45%] md:basis-[30%] lg:basis-[22%]"
                  >
                    <Link to={`/recipe?cook=${encodeURIComponent(meal.title)}`}>
                      <Card className="overflow-hidden rounded-2xl border-stone-200/60 shadow-sm hover:shadow-md transition-shadow">
                        <AspectRatio ratio={1}>
                          <img
                            src={meal.image}
                            alt={meal.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </AspectRatio>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-base text-stone-900 line-clamp-1">
                            {meal.title}
                          </h4>
                          <p className="text-xs font-medium text-stone-500 mt-1">
                            {meal.readyInMinutes || 15} min
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden sm:flex justify-end gap-2 mt-4 pr-1">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </section>
        )}

        {/* Cuisines */}
        {cuisines?.length > 0 && (
          <section>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 text-balance">
                Explore Cuisines
              </h2>
              <p className="text-stone-500 text-sm sm:text-base font-medium mt-2">
                Discover flavors from around the world.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {cuisines.map((cuisine) => {
                const flagUrl = getCountryFlag(cuisine.name);
                return (
                  <Link
                    key={cuisine.name}
                    to={`/recipes/cuisine/${slugify(cuisine.name)}`}
                    className="group flex flex-col items-center gap-2.5"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-sm border border-stone-100 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-brand-200 transition-all duration-300">
                      {flagUrl ? (
                        <img
                          src={flagUrl}
                          alt={`${cuisine.name} flag`}
                          className="w-10 h-7 sm:w-12 sm:h-8 object-cover rounded-sm"
                        />
                      ) : (
                        <span className="text-2xl">🌍</span>
                      )}
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-stone-700 group-hover:text-brand-600 transition-colors">
                      {cuisine.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Diets */}
        {diets?.length > 0 && (
          <section className="bg-stone-50 rounded-2xl p-5 sm:p-8">
            <div className="mb-8">
              <div className="flex items-center gap-1.5 mb-2">
                <Leaf className="w-4 h-4 text-brand-600" />
                <p className="text-xs text-brand-600 font-bold uppercase tracking-wider">
                  Lifestyle
                </p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 text-balance">
                Dietary Preferences
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {diets.map((diet) => {
                const colors =
                  dietColors[diet.name.toLowerCase()] ||
                  "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100";
                return (
                  <Link
                    key={diet.name}
                    to={`/recipes/diet/${slugify(diet.name)}`}
                    className="group"
                  >
                    <Card
                      className={`${colors} rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300`}
                    >
                      <CardContent className="p-4 flex items-center gap-3">
                        <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                          {getDietEmoji(diet.name)}
                        </span>
                        <span className="text-sm font-bold">{diet.name}</span>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentlyViewed?.length > 0 && (
          <section>
            <div className="flex items-center gap-2.5 mb-8">
              <History className="w-5 h-5 text-brand-600" />
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 text-balance">
                Recently Viewed
              </h2>
            </div>

            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {recentlyViewed?.map((recipe) => (
                  <CarouselItem
                    key={recipe.id}
                    className="pl-4 basis-[60%] sm:basis-[40%] md:basis-[28%] lg:basis-[22%]"
                  >
                    <Link
                      to={`/recipe?cook=${encodeURIComponent(recipe.title)}`}
                      className="group block"
                    >
                      <Card className="overflow-hidden rounded-2xl border-stone-200/60 shadow-sm hover:shadow-md transition-shadow">
                        <AspectRatio ratio={4 / 3}>
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </AspectRatio>
                        <CardContent className="p-4">
                          <p className="font-bold text-base text-stone-900 line-clamp-1">
                            {recipe.title}
                          </p>
                          <p className="text-xs font-semibold text-brand-600 mt-1 flex items-center gap-1">
                            View Again
                            <ArrowRight className="w-3 h-3" />
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden sm:flex justify-end gap-2 mt-4 pr-1">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </section>
        )}

        {/* Cooking Tip */}
        {randomTip && (
          <section>
            <Card className="bg-brand-50/80 border-brand-200 rounded-3xl shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Lightbulb className="w-32 h-32 text-brand-900" />
              </div>
              <CardContent className="p-6 sm:p-8 flex items-start gap-4 sm:gap-6 relative z-10">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-brand-100 flex items-center justify-center shrink-0 shadow-inner">
                  <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-brand-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-600">
                      💡 Cooking Tip of the Day
                    </p>
                    <button
                      onClick={refreshTip}
                      className="text-xs sm:text-sm text-brand-600 hover:text-brand-800 font-bold transition-colors flex items-center gap-1.5 bg-brand-100/50 hover:bg-brand-100 px-3 py-1.5 rounded-full"
                    >
                      ↻ New Tip
                    </button>
                  </div>

                  <p className="text-base sm:text-lg font-medium text-stone-800 leading-relaxed pr-4">
                    {randomTip}
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
