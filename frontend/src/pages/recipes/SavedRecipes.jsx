import RecipeCard from "@/components/RecipeCard";
import RecipeFilterBar from "@/components/RecipeFilterBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRecipeFilters } from "@/hooks/useRecipeFilters";
import { loadsavedrecipes } from "@/services/savedrecipe";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  ChefHat,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SavedRecipes() {
  const navigate = useNavigate();

  // for storing recipes
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

  useEffect(() => {
    async function loadSaved() {
      try {
        const savedRecipes = await loadsavedrecipes();
        setRecipes(savedRecipes);
      } catch (err) {
        console.log("recipes not loaded");
      } finally {
        setLoading(false);
      }
    }
    loadSaved();
  }, []);

  // delete recipe from saved recipes .``
  function removeRecipe(recipeId) {
    setRecipes(recipes.filter((item) => item.id !== recipeId));
  }

  // loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border border-stone-200 rounded-full flex justify-center items-center bg-stone-50 sm:px-8 px-4 sm:py-4 py-3 text-lg font-bold shadow-xl">
          <Loader2 className="animate-spin text-brand-600 mr-3 h-6 w-6" />
          Your recipes are loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* hero section */}
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
              Collection
            </p>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-black">
              Saved Recipes
            </h1>
            <p className="text-stone-500 sm:text-lg text-sm">
              Your personal cookbook - all favorites in one place.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {recipes.length > 0 && (
              <div className="flex flex-col justify-center items-center md:items-center">
                <span className="text-3xl sm:text-4xl font-black text-stone-900">
                  {filteredRecipes.length}
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase text-stone-400 mt-1">
                  Recipes found
                </span>
              </div>
            )}
            <Link to="/dashboard">
              <Button variant="primary">
                Browse More <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* banner section */}
        {recipes.length > 0 && (
          <div className="rounded-2xl p-6 bg-emerald-500 text-white mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Badge className="bg-white/20 text-white text-xs font-bold uppercase mb-2">
                  Cooking Tip
                </Badge>
                <h2 className="text-2xl sm:text-4xl font-black">
                  Keep your favorites ready
                </h2>
                <p className="text-white/80 text-md mt-1">
                  You have {recipes.length} saved recipes. Explore a few more
                  and pick tonight&apos;s winner faster.
                </p>
              </div>
              <Link to="/pantry">
                <Button
                  variant="secondary"
                  className="bg-white text-emerald-600 hover:bg-white/80"
                >
                  Generate More <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* FILTER BAR */}
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

        {/* Empty state when filters don't match any saved recipes */}
        {recipes.length > 0 && filteredRecipes.length === 0 && (
          <div className="rounded-2xl border border-stone-200 bg-white p-10 text-center">
            <h3 className="text-lg font-bold text-stone-800 mb-1">
              No matching favorites
            </h3>
            <p className="text-stone-500 text-sm mb-4">
              Try adjusting your filters to find what you&apos;re looking for.
            </p>
            <Button variant="outline" onClick={clearAll} className="rounded-xl">
              Clear Filters
            </Button>
          </div>
        )}

        {/* no recipes found section */}
        {recipes.length === 0 && (
          <div className="rounded-2xl border border-stone-200 bg-white p-10 sm:p-20 text-center">
            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <Bookmark className="w-9 h-9 text-stone-300" />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">
              No Saved Recipes Yet
            </h3>
            <p className="text-stone-500 text-sm mb-6 max-w-xs mx-auto">
              Start exploring and save your favorites to build your personal
              cookbook.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/dashboard">
                <Button
                  variant="primary"
                  className="px-8 rounded-full font-bold gap-2"
                >
                  <ChefHat className="w-4 h-4" /> Explore Recipes
                </Button>
              </Link>
              <Link to="/pantry">
                <Button
                  variant="outline"
                  className="border-stone-300 font-semibold px-8 py-2.5 rounded-2xl hover:border-orange-400"
                >
                  Check Pantry
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* recipes grid section */}
        {filteredRecipes.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredRecipes.map((recipe) => {
              return (
                <div key={recipe.id} className="relative group">
                  <RecipeCard
                    recipe={recipe}
                    deletebtn={true}
                    variant="list"
                    removeRecipe={removeRecipe}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedRecipes;
