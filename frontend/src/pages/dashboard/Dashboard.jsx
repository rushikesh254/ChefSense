// imports
import RecipeCard from "@/components/RecipeCard";
import RecipeImage from "@/components/RecipeImage";
import SearchBar from "@/components/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import cookingTips from "@/data/cookingTips";
import {
  DISCOVER_CATEGORIES,
  DISCOVER_CUISINES,
  DISCOVER_DIETS,
} from "@/lib/constants";
import {
  dietColors,
  getCategoryEmoji,
  getCountryFlag,
  getDietEmoji,
} from "@/lib/utils";
import {
  getCategories,
  getCuisines,
  getDiets,
  getFeatured,
  getQuickMeals,
  getRecentlyViewed,
} from "@/services/discover";
import {
  ArrowRight,
  Clock,
  Clock3,
  Flame,
  History,
  Leaf,
  Lightbulb,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// main component
function Dashboard() {
  // states
  const [featuredRecipe, setFeaturedRecipe] = useState(null);
  const [quickMeals, setQuickMeals] = useState([]);
  const [categories, setCategories] = useState(DISCOVER_CATEGORIES);
  const [cuisines, setCuisines] = useState(DISCOVER_CUISINES);
  const [diets, setDiets] = useState(DISCOVER_DIETS);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // loading state
  const [loading, setLoading] = useState(true);

  // load all dashboard data on mount
  useEffect(() => {
    function loadDashboardData() {
      try {
        setFeaturedRecipe(getFeatured());
        setQuickMeals(getQuickMeals());
        setCategories(getCategories());
        setCuisines(getCuisines());
        setDiets(getDiets());
        setRecentlyViewed(getRecentlyViewed());
      } catch {
        toast.error("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  // random tip index
  const [tipIndex, setTipIndex] = useState(
    Math.floor(Math.random() * cookingTips.length),
  );

  // loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border border-stone-200 rounded-full flex justify-center items-center bg-stone-50 sm:px-8 px-4 sm:py-4 py-3 text-lg font-bold shadow-xl">
          <Clock className="mr-3 h-6 w-6 animate-spin text-brand-600" />
          Loading Your Dashboard...
        </div>
      </div>
    );
  }

  // return dashboard ui
  return (
    <div className="min-h-screen pb-20">
      {/* Hero / Featured Recipe */}
      {featuredRecipe && (
        <section className="relative h-[65vh] overflow-hidden">
          <RecipeImage
            src={featuredRecipe.imageUrl}
            alt={featuredRecipe.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* black overlay */}
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-10 h-full flex items-end justify-start w-full px-5">
            <div className="max-w-7xl mr-auto px-4 sm:px-6 pb-12 space-y-3 flex flex-col items-start">
              <Badge className="bg-brand-600 text-white border-0">
                <Flame className="w-4 h-4" /> Featured
              </Badge>

              <div className="flex gap-2">
                {[
                  featuredRecipe.category,
                  featuredRecipe.cuisine,
                  featuredRecipe.diet,
                ]
                  .filter(Boolean)
                  .map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-white/15 text-white border-0"
                    >
                      {tag}
                    </Badge>
                  ))}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
                {featuredRecipe.title}
              </h1>

              {featuredRecipe.description && (
                <p className="text-sm text-white line-clamp-2 max-w-md">
                  {featuredRecipe.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-sm text-white">
                {featuredRecipe.cookTime && (
                  <span className="flex items-center gap-1">
                    <Clock3 className="w-4 h-4" /> {featuredRecipe.cookTime} min
                  </span>
                )}
                {featuredRecipe.rating && (
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400 border-amber-400" />
                    {featuredRecipe.rating.toFixed(1)}
                  </span>
                )}
                {featuredRecipe.servings && (
                  <span className="flex items-center gap-1">
                    <UtensilsCrossed className="w-4 h-4" />{" "}
                    {featuredRecipe.servings} servings
                  </span>
                )}
              </div>

              <Link to={`/recipe/${featuredRecipe.id}`}>
                <Button
                  variant="secondary"
                  className="w-fit bg-white/70 border-0 hover:bg-white/80 text-stone-700 font-bold gap-2"
                >
                  Cook This <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Search Bar */}
      <div className="px-4 sm:px-6 -mt-6 relative z-20">
        <SearchBar />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Categories */}
        {categories.length > 0 && (
          <section>
            {/* section header  */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-1">
                <UtensilsCrossed className="w-4 h-4 text-brand-600" />
                <p className="text-xs text-brand-600 font-bold uppercase ">
                  Categories
                </p>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                Explore Categories
              </h2>
              <p className="text-stone-500 text-sm mt-1">
                Browse recipes by your favorite style.
              </p>
            </div>
            {/* main content */}
            <div className="flex flex-wrap gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  to={`/recipes/category/${cat.name}`}
                  className="px-4 h-10 sm:h-12 bg-white rounded-full flex items-center gap-2 hover:bg-brand-50 transition-colors hover:border-brand-50 border border-stone-100 group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                    {getCategoryEmoji(cat.name)}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-stone-700 group-hover:scale-110 transition-transform duration-200">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Quick Meals */}
        {quickMeals.length > 0 && (
          <section>
            {/* scetion header  */}
            <div className="flex items-center justify-between">
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-1">
                  <Clock3 className="w-4 h-4 text-brand-600" />
                  <p className="text-xs text-brand-600 font-bold uppercase ">
                    Quick Recipes
                  </p>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  Ready in 15 Minutes
                </h2>
                <p className="text-stone-500 text-sm mt-1">
                  Whip up something delicious in no time.
                </p>
              </div>

              <div>
                <Link to="/recipes/quick">
                  <Button
                    variant="secondary"
                    className="w-fit bg-white/70 border-0 hover:bg-white/80 text-stone-700 font-bold gap-2"
                  >
                    View All <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            {/* main content */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
              {quickMeals.slice(0, 4).map((meal) => (
                <RecipeCard key={meal.id} recipe={meal} />
              ))}
            </div>
          </section>
        )}

        {/* Cuisines */}
        {cuisines.length > 0 && (
          <section>
            {/* scetion header  */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-1">
                <UtensilsCrossed className="w-4 h-4 text-brand-600" />
                <p className="text-xs text-brand-600 font-bold uppercase ">
                  Cuisines
                </p>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                Explore Cuisines
              </h2>
              <p className="text-stone-500 text-sm mt-1">
                Discover flavors from around the world.
              </p>
            </div>
            {/* main content */}
            <div className="flex flex-wrap justify-center gap-5 sm:gap-8">
              {cuisines.map((cuisine) => (
                <Link
                  key={cuisine.name}
                  to={`/recipes/cuisine/${cuisine.name}`}
                  className="flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-200 "
                >
                  <span
                    className={`text-5xl sm:text-7xl rounded-full border-2 bg-white border-white  shadow-xs ${getCountryFlag(cuisine.name)}`}
                  />
                  <span className="text-xs sm:text-sm font-bold text-stone-700">
                    {cuisine.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Dietary Preferences */}
        {diets.length > 0 && (
          <section>
            {/* section header  */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-1">
                <Leaf className="w-4 h-4 text-brand-600" />
                <p className="text-xs text-brand-600 font-bold uppercase ">
                  Lifestyle
                </p>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                Dietary Preferences
              </h2>
              <p className="text-stone-500 text-sm mt-1">
                Choose a lifestyle that fits your taste.
              </p>
            </div>
            {/* main content */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {diets.map((diet) => (
                <Link key={diet.name} to={`/recipes/diet/${diet.name}`}>
                  <Card
                    className={`${dietColors[diet.name] || "bg-stone-50 text-stone-700"} rounded-xl shadow-xs hover:-translate-y-1 transition-all`}
                  >
                    <CardContent className="p-1 py-2 flex items-center gap-2">
                      <span className="text-xl">{getDietEmoji(diet.name)}</span>
                      <span className="text-sm font-bold">{diet.name}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section>
            {/* section header  */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-1">
                <History className="w-4 h-4 text-brand-600" />
                <p className="text-xs text-brand-600 font-bold uppercase ">
                  Recently Viewed
                </p>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                Recently Viewed
              </h2>
              <p className="text-stone-500 text-sm mt-1">
                Here's what you've cooked recently.
              </p>
            </div>
            {/* main content */}
            <div className="flex gap-2 overflow-x-auto">
              {recentlyViewed.map((recipe) => (
                <div key={recipe.id} className="shrink-0 w-64">
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Cooking Tip */}
        {cookingTips.length > 0 && (
          <section>
            {/* section header  */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-1">
                <Lightbulb className="w-4 h-4 text-brand-600" />
                <p className="text-xs text-brand-600 font-bold uppercase ">
                  Cooking Tip
                </p>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                Cooking Tip
              </h2>
              <p className="text-stone-500 text-sm mt-1">
                Here's a tip to help you cook better.
              </p>
            </div>
            {/* main content */}
            <div className="bg-brand-50/80 border border-brand-200 rounded-2xl p-5 sm:p-8 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
                <Lightbulb className="w-5 h-5 text-brand-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs sm:text-sm font-bold uppercase text-brand-600">
                    💡 Cooking Tip
                  </p>
                  <button
                    onClick={() =>
                      setTipIndex(
                        Math.floor(Math.random() * cookingTips.length),
                      )
                    }
                    className="text-xs font-bold text-brand-600 px-3 py-1 rounded-full bg-brand-100/50 border border-brand-200 hover:bg-brand-100"
                  >
                    ↻ New Tip
                  </button>
                </div>
                <p className="text-sm sm:text-base text-brand-800 font-semibold">
                  {cookingTips[tipIndex]}
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
