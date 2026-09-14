import RecipeCard from "@/components/RecipeCard";
import RecipeImage from "@/components/RecipeImage";
import SearchBar from "@/components/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useUser } from "@/context/AuthContext";
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
  getTrending,
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
  TrendingUp,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const COOKING_TIPS = [
  "Let meat rest for 5 minutes after cooking to lock in juices.",
  "Season pasta water generously — it should taste like the sea.",
  "Use room-temperature eggs for fluffier baking results.",
  "A sharp knife is safer than a dull one — it requires less force.",
  "Taste as you go and adjust seasoning gradually.",
  "Rest dough in the fridge for easier handling.",
  "Deglaze your pan with wine or broth for instant flavor.",
  "Toast spices in a dry pan to deepen their aroma.",
  "Pat proteins dry with paper towels for a better sear.",
  "Let your pan get hot before adding oil to prevent sticking.",
  "Add acid (lemon, vinegar) at the end to brighten any dish.",
];

function Dashboard() {
  const { user } = useUser();

  const [featuredRecipe, setFeaturedRecipe] = useState(null);
  const [quickMeals, setQuickMeals] = useState([]);
  const [trendingMeals, setTrendingMeals] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [diets, setDiets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tipIndex, setTipIndex] = useState(
    Math.floor(Math.random() * COOKING_TIPS.length),
  );

  useEffect(() => {
    if (user?._id) {
      try {
        const key = `recentlyViewed_${user._id}`;
        const stored = JSON.parse(localStorage.getItem(key) || "[]");
        setRecentlyViewed(stored);
      } catch {}
    }
  }, [user]);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [featuredRes, quickRes, catRes, cuiRes, dietRes, trendingRes] =
          await Promise.all([
            getFeatured(),
            getQuickMeals(),
            getCategories(),
            getCuisines(),
            getDiets(),
            getTrending(),
          ]);
        setFeaturedRecipe(featuredRes.recipe);
        setTrendingMeals(trendingRes.recipes || []);
        setQuickMeals(quickRes.recipes || []);
        setCategories(catRes.categories || []);
        setCuisines(cuiRes.cuisines || []);
        setDiets(dietRes.diets || []);
      } catch {
        toast.error("Unable to load your dashboard. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

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

  return (
    <div className="min-h-screen pb-20">
      {featuredRecipe && (
        <section className="relative h-[65vh] overflow-hidden">
          <RecipeImage
            src={featuredRecipe.imageUrl}
            alt={featuredRecipe.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
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

      <div className="px-4 sm:px-6 -mt-6 relative z-20">
        <SearchBar />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {categories.length > 0 && (
          <section>
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

        {quickMeals.length > 0 && (
          <section>
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
              {quickMeals.slice(0, 4).map((meal) => (
                <RecipeCard key={meal.id} recipe={meal} />
              ))}
            </div>
          </section>
        )}

        {cuisines.length > 0 && (
          <section>
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
        {trendingMeals.length > 0 && (
          <section>
            <div className="flex items-center justify-between">
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-brand-600" />
                  <p className="text-xs text-brand-600 font-bold uppercase ">
                    Trending Recipes
                  </p>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  What's Hot Right Now
                </h2>
                <p className="text-stone-500 text-sm mt-1">
                  See what's popular among our community.
                </p>
              </div>

              <div>
                <Link to="/recipes/trending">
                  <Button
                    variant="secondary"
                    className="w-fit bg-white/70 border-0 hover:bg-white/80 text-stone-700 font-bold gap-2"
                  >
                    View All <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
              {trendingMeals.slice(0, 4).map((meal) => (
                <RecipeCard key={meal.id} recipe={meal} />
              ))}
            </div>
          </section>
        )}

        {diets.length > 0 && (
          <section>
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

        {recentlyViewed.length > 0 && (
          <section>
            <div className="flex items-center justify-between">
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-1">
                  <History className="w-4 h-4 text-brand-600" />
                  <p className="text-xs text-brand-600 font-bold uppercase ">
                    Recently Viewed
                  </p>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  Pick Up Where You Left Off
                </h2>
                <p className="text-stone-500 text-sm mt-1">
                  Recipes you have checked out recently.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
              {recentlyViewed.slice(0, 4).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        )}
        <section>
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
                    setTipIndex(Math.floor(Math.random() * COOKING_TIPS.length))
                  }
                  className="text-xs font-bold text-brand-600 px-3 py-1 rounded-full bg-brand-100/50 border border-brand-200 hover:bg-brand-100"
                >
                  ↻ New Tip
                </button>
              </div>
              <p className="text-sm sm:text-base text-brand-800 font-semibold">
                {COOKING_TIPS[tipIndex]}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
