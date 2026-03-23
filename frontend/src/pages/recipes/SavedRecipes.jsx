import RecipeCard from '@/components/RecipeCard'
import { Button } from '@/components/ui/button'
import savedrecipesService from '@/services/savedrecipe'
import { ArrowRight, Bookmark, ChefHat, Loader2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const DIFFICULTIES = ['easy', 'medium', 'hard']
const Types = ['vegetarian', 'non-vegetarian']
const SORT_OPTIONS = [
  { label: 'Top Rated', value: 'rating' },
  { label: 'Quickest', value: 'cookTime' },
]

function SavedRecipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(8)

  const [difficulty, setDifficulty] = useState(null)
  const [diet, setDiet] = useState(null)
  const [sortBy, setSortBy] = useState(null)

  useEffect(() => {
    async function loadSaved() {
      try {
        const savedRecipes = await savedrecipesService.loadsavedrecipes()
        setRecipes(savedRecipes.recipes)
      } catch (err) {
        console.log('recipes not loaded')
      } finally {
        setLoading(false)
      }
    }
    loadSaved()
  }, [])

  const removeRecipe = (recipeId) => {
    setRecipes(recipes.filter((item) => item.id !== recipeId))
  }

  function clearAll() {
    setDifficulty(null)
    setDiet(null)
    setSortBy(null)
  }

  // filter & sort logic
  function getFilteredRecipes() {
    let result = [...recipes]

    if (difficulty) result = result.filter((r) => r.difficulty === difficulty)
    if (diet === 'vegetarian') result = result.filter((r) => r.isVeg === true)
    if (diet === 'non-vegetarian')
      result = result.filter((r) => r.isVeg === false)
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating)
    if (sortBy === 'cookTime') result.sort((a, b) => a.cookTime - b.cookTime)

    return result
  }

  const filteredRecipes = getFilteredRecipes()
  const hasActiveFilters = difficulty || diet || sortBy

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border rounded-full inline-flex items-center bg-white px-6 py-4 text-lg font-bold text-stone-900 shadow-sm">
          <Loader2 className="mr-3 h-6 w-6 animate-spin text-brand-600 shrink-0" />
          Your Recipes are loading...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-2">
              Collection
            </p>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-stone-900">
              Saved Recipes
            </h1>
            <p className="mt-2 text-stone-500 text-sm sm:text-base">
              Your personal cookbook
            </p>
          </div>

          <div className="flex items-center gap-3">
            {recipes.length > 0 && (
              <div className="shrink-0 text-right">
                <p className="text-4xl font-extrabold text-stone-900">
                  {filteredRecipes.length}
                </p>
                <p className="text-xs text-stone-400 font-medium mt-0.5">
                  {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
                </p>
              </div>
            )}
            <Link to="/dashboard">
              <Button variant="primary">
                Browse More <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {/* difficulty */}
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(difficulty === d ? null : d)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize border transition-colors ${
                  difficulty === d
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                }`}
              >
                {d}
              </button>
            ))}

            <div className="w-px h-5 bg-stone-200" />

            {/* diet */}
            {Types.map((d) => (
              <button
                key={d}
                onClick={() => setDiet(diet === d ? null : d)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  diet === d
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                }`}
              >
                {d === 'vegetarian' ? '🥦 Veg' : '🍖 Non-Veg'}
              </button>
            ))}

            <div className="w-px h-5 bg-stone-200" />

            {/* sort */}
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() =>
                  setSortBy(sortBy === opt.value ? null : opt.value)
                }
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  sortBy === opt.value
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                }`}
              >
                {opt.label}
              </button>
            ))}

            {/* clear all */}
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Clear All
              </button>
            )}
          </div>
        </div>

        {/* Empty State - no saved recipes at all */}
        {recipes.length === 0 && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-16 text-center">
            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <Bookmark className="w-9 h-9 text-stone-300" />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">
              No Saved Recipes Yet
            </h3>
            <p className="text-stone-500 text-sm mb-8 max-w-xs mx-auto">
              Start exploring and save your favorites to build your personal
              cookbook!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/dashboard">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-2.5 rounded-xl flex items-center gap-2">
                  <ChefHat className="w-4 h-4" /> Explore Recipes
                </Button>
              </Link>
              <Link to="/pantry">
                <Button
                  variant="outline"
                  className="border-stone-300 font-semibold px-8 py-2.5 rounded-xl hover:border-orange-400"
                >
                  Check Pantry
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Empty State - filters returned nothing */}
        {recipes.length > 0 && filteredRecipes.length === 0 && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-16 text-center">
            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <ChefHat className="w-9 h-9 text-stone-300" />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">
              No Matches
            </h3>
            <p className="text-stone-500 text-sm mb-6">
              No recipes match the selected filters.
            </p>
            <Button variant="outline" onClick={clearAll}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Recipes Grid */}
        {filteredRecipes.length > 0 && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {filteredRecipes.slice(0, visibleCount).map((recipe) => {
                const recipeId = recipe._id || recipe.id
                return (
                  <div key={recipeId} className="relative group">
                    <RecipeCard
                      recipe={recipe}
                      deletebtn={true}
                      variant="list"
                      removeRecipe={removeRecipe}
                    />
                  </div>
                )
              })}
            </div>

            {visibleCount < filteredRecipes.length && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 8)}
                  className="bg-white border border-stone-300 hover:border-orange-400 text-stone-700 font-semibold px-8 py-3 rounded-xl transition-colors"
                >
                  Show More ({filteredRecipes.length - visibleCount} more)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedRecipes
