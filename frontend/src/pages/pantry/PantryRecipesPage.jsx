import RecipeCard from "@/components/RecipeCard";
import RecipeFilterBar from "@/components/RecipeFilterBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRecipeFilters } from "@/hooks/useRecipeFilters";
import { getPantryRecipes } from "@/services/pantry";
import {
  ArrowLeft,
  ArrowRight,
  ChefHat,
  Loader2,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function PantryRecipesPage() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // setup filtering logic
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


  // useeffect for fetching recipes from backend
  useEffect(() => {
    async function fetchRecipes() {
      try {
        const data = await getPantryRecipes();
        // console.log(data);
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  // console.log(recipes);

  // loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border border-stone-200 rounded-full flex justify-center items-center bg-stone-50 sm:px-8 px-4 sm:py-4 py-3 text-lg font-bold shadow-xl">
          <Loader2 className="animate-spin text-brand-600 mr-3 h-6 w-6" />
          AI is cooking something for you...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="mx-auto max-w-7xl">
        {/* back btn */}
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="rounded-xl mb-6 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* header */}
        <div className="flex flex-col gap-4 mb-6 justify-between md:flex-row md:items-end">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-500">
              AI Recipes
            </p>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-black">
              Pantry Recipes
            </h1>
            <p className="text-stone-500 sm:text-lg text-sm">
              Smart recipes crafted from your pantry ingredients.
            </p>
          </div>

          {recipes.length > 0 && (
            <div className="flex flex-col items-start md:items-center">
              <span className="text-3xl sm:text-4xl font-black text-stone-900">
                {filteredRecipes.length}
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase text-stone-400 mt-1">
                Recipes found
              </span>
            </div>
          )}
        </div>

        {/* ai banner */}
        <div className="rounded-2xl p-6 bg-cyan-400 text-white mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Badge className="bg-white/20 text-white text-xs font-bold uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                AI Powered
              </Badge>
              <h2 className="text-xl sm:text-2xl font-black">
                Recipes based on your pantry
              </h2>
              <p className="text-emerald-50 text-sm mt-1 max-w-lg">
                Our AI analyzes what you have and suggests the best recipes you
                can make right now - no extra shopping needed.
              </p>
            </div>
            <Link to="/pantry">
              <Button
                variant="secondary"
                className="bg-white text-cyan-600 hover:bg-white/80"
              >
                Manage Pantry <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/*  FILTER BAR */}
        {recipes.length > 0 && (
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
        )}

        {/* empty state */}
        {recipes.length === 0 && (
          <div className="rounded-2xl border border-stone-200 bg-white p-10 sm:p-20 text-center">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <UtensilsCrossed className="w-9 h-9 text-emerald-300" />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">
              No Recipes Yet
            </h3>
            <p className="text-stone-500 text-sm mb-6 max-w-xs mx-auto">
              Add ingredients to your pantry and let our AI chef create recipes
              for you.
            </p>
            <Link to="/pantry">
              <Button
                variant="primary"
                className="rounded-2xl font-bold px-8 py-2.5"
              >
                <ChefHat className="w-4 h-4 mr-2" /> Go to Pantry
              </Button>
            </Link>
          </div>
        )}

        {/* Empty state when filters don't match */}
        {recipes.length > 0 && filteredRecipes.length === 0 && (
          <div className="rounded-2xl border border-stone-200 bg-white p-10 text-center">
            <h3 className="text-lg font-bold text-stone-800 mb-1">
              No matching recipes
            </h3>
            <p className="text-stone-500 text-sm mb-4">
              Try adjusting your filters to see more results from your pantry.
            </p>
            <Button variant="outline" onClick={clearAll} className="rounded-xl">
              Clear All Filters
            </Button>
          </div>
        )}

        {/* recipe grid */}
        {filteredRecipes.length > 0 && (
          <section>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default PantryRecipesPage;
