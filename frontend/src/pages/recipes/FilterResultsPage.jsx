import RecipeCard from "@/components/RecipeCard";
import RecipeFilterBar from "@/components/RecipeFilterBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRecipeFilters } from "@/hooks/useRecipeFilters";
import {
  getByCategory,
  getByCuisine,
  getByDiet,
  getQuickMeals,
  getTrending,
} from "@/services/discover";
import { generateRecipe } from "@/services/recipe";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Loader2,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { toast } from "sonner";

function FilterResultsPage({ type }) {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [generatingRecipe, setGeneratingRecipe] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const isPaginationType =
    type === "quick" ||
    type === "trending" ||
    type === "cuisine" ||
    type === "category" ||
    type === "diet";

  async function fetchRecipes(pageNum = 1) {
    if (type === "quick") return getQuickMeals(pageNum);
    if (type === "trending") return getTrending(pageNum);
    if (type === "cuisine") return getByCuisine(params.cuisine, pageNum);
    if (type === "category") return getByCategory(params.category, pageNum);
    if (type === "diet") return getByDiet(params.diet, pageNum);
    if (type === "search") {
      const query = searchParams.get("q") || "";
      if (!query) return { recipes: [] };
      setGeneratingRecipe(true);
      try {
        const genResult = await generateRecipe(query);
        const recipe = genResult.recipe || genResult.existing;
        if (recipe) {
          navigate(`/recipe/${recipe._id}`);
          return null;
        }
      } catch (genError) {
        const existing = genError?.response?.data?.existing;
        if (existing) {
          navigate(`/recipe/${existing._id}`);
          return null;
        }
        toast.error("No recipe found for your search.");
      } finally {
        setGeneratingRecipe(false);
      }
      return { recipes: [] };
    }
  }

  useEffect(() => {
    async function run() {
      try {
        setLoading(true);
        setPage(1);
        setHasMore(false);
        const result = await fetchRecipes(1);
        if (result === null) return;
        setRecipes(result?.recipes || []);
        setHasMore(result?.hasMore || false);
      } catch (error) {
        toast.error("Unable to load recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    run();
  }, [type, params.cuisine, params.category, params.diet, searchParams]);

  async function handleLoadMore() {
    const nextPage = page + 1;
    setLoadingMore(true);
    try {
      const result = await fetchRecipes(nextPage);
      if (result === null) return;
      setRecipes((prev) => [...prev, ...(result?.recipes || [])]);
      setHasMore(result?.hasMore || false);
      setPage(nextPage);
    } catch (error) {
      toast.error("Unable to load more recipes. Please try again.");
    } finally {
      setLoadingMore(false);
    }
  }

  const {
    difficulty,
    setDifficulty,
    diet,
    setDiet,
    sortBy,
    setSortBy,
    filteredRecipes,
    clearAll,
    hasActiveFilters,
  } = useRecipeFilters(recipes);

  function getLabel() {
    if (type === "quick") return "Quick Meals";
    if (type === "trending") return "Trending Recipes";
    if (type === "cuisine") return params.cuisine;
    if (type === "category") return params.category;
    if (type === "diet") return params.diet;
    if (type === "search") return `Search: ${searchParams.get("q") || ""}`;
  }

  function getDescription() {
    if (type === "quick") return "Ready in 15 minutes or less.";
    if (type === "trending") return "The most popular recipes right now.";
    if (type === "cuisine") return "Explore recipes from this cuisine.";
    if (type === "category") return "Recipes grouped under this category.";
    if (type === "diet") return "Recipes matching this dietary preference.";
    if (type === "search")
      return `Results for "${searchParams.get("q") || ""}"`;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border border-stone-200 rounded-full flex justify-center items-center bg-stone-50 sm:px-8 px-4 sm:py-4 py-3 text-lg font-bold shadow-xl">
          {generatingRecipe ? (
            <Sparkles className="animate-pulse text-brand-600 mr-3 h-6 w-6" />
          ) : (
            <Loader2 className="animate-spin text-brand-600 mr-3 h-6 w-6" />
          )}
          {generatingRecipe
            ? "Cooking up this recipe with AI..."
            : "Recipes are loading..."}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="mx-auto max-w-7xl">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="rounded-xl mb-6 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="flex flex-col gap-4 mb-6 justify-between md:flex-row md:items-end">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-500">
              {type === "quick"
                ? "Quick Meals"
                : type === "trending"
                  ? "Trending"
                  : type}
            </p>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-black">
              {getLabel()}
            </h1>
            <p className="text-stone-500 sm:text-lg text-sm">
              {getDescription()}
            </p>
          </div>

          {recipes.length > 0 && (
            <div className="flex flex-col justify-center items-center md:items-center">
              <span className="text-3xl sm:text-4xl font-black  text-stone-900">
                {filteredRecipes.length}
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase text-stone-400 mt-1">
                Recipes found
              </span>
            </div>
          )}
        </div>

        <div className="rounded-2xl p-6 bg-purple-400 text-white mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Badge className="bg-white/20 text-white text-xs font-bold uppercase mb-2">
                Discover
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black">
                Browsing {getLabel()}
              </h2>
              <p className="text-blue-50 text-md mt-1">
                {getDescription()} Use the filters below to narrow down your
                search.
              </p>
            </div>
            <Link to="/dashboard">
              <Button
                variant="secondary"
                className="bg-white text-purple-600 hover:bg-white/80"
              >
                Explore More <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        <RecipeFilterBar
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          diet={diet}
          setDiet={setDiet}
          sortBy={sortBy}
          setSortBy={setSortBy}
          clearAll={clearAll}
          hasActiveFilters={hasActiveFilters}
        />

        {filteredRecipes.length === 0 && (
          <div className="rounded-2xl border border-stone-200 bg-white p-10 sm:p-20 text-center">
            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <UtensilsCrossed className="w-9 h-9 text-brand-600" />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">
              No recipes found
            </h3>
            <p className="text-stone-500 text-sm mb-6 max-w-xs mx-auto">
              Nothing here yet. Try a different filter.
            </p>
            <Button
              variant="outline"
              onClick={clearAll}
              className="rounded-2xl font-bold px-8 py-2.5"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {filteredRecipes.length > 0 && (
          <section>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id || recipe.title} recipe={recipe} />
              ))}
            </div>

            {isPaginationType && hasMore && (
              <div className="flex justify-center mt-10">
                <Button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  variant="outline"
                  className="rounded-2xl font-bold px-10 py-6 text-base gap-2"
                >
                  {loadingMore ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                  {loadingMore ? "Loading..." : "Load More"}
                </Button>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default FilterResultsPage;
