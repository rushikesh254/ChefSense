import RecipeCard from '@/components/RecipeCard'
import { Button } from '@/components/ui/button'
import { DiscoverService } from '@/services/discover'
import { ArrowLeft, ChefHat, Loader2, UtensilsCrossed } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const FILTER_META = {
  cuisine: { description: 'Explore recipes from this cuisine.' },
  category: { description: 'Recipes grouped under this category.' },
  diet: { description: 'Recipes matching this dietary preference.' },
  quick: { description: 'Ready in 15 minutes or less.' },
}

function FilterResultsPage({ type }) {
  const params = useParams()
  const navigate = useNavigate()

  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(8)

  const rawLabel = {
    quick: 'Quick Meals',
    cuisine: params.cuisine,
    category: params.category,
    diet: params.diet,
  }

  const label = rawLabel[type]
  const meta = FILTER_META[type] || FILTER_META.quick

  useEffect(() => {
    async function run() {
      try {
        setLoading(true)
        let data

        if (type === 'quick') data = await DiscoverService.getQuickMeals()
        else if (type === 'cuisine')
          data = await DiscoverService.getByCuisine(params.cuisine)
        else if (type === 'category')
          data = await DiscoverService.getByCategory(params.category)
        else if (type === 'diet')
          data = await DiscoverService.getByDiet(params.diet)

        setRecipes(data.recipes || [])
      } catch (error) {
        console.log(error)
        toast.error('Failed to load recipes. Please try again later.')
      } finally {
        setLoading(false)
        setVisibleCount(8)
      }
    }
    run()
  }, [type, params.cuisine, params.category, params.diet])
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border rounded-full inline-flex items-center bg-white px-6 py-4 text-lg font-bold text-stone-900 shadow-sm">
          <Loader2 className="mr-3 h-6 w-6 animate-spin text-brand-600 shrink-0" />
          Recipes are loading...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* page header */}
      <div className="bg-white border-b border-stone-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm font-semibold text-stone-400 hover:text-stone-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-2">
                {type === 'quick' ? 'Quick Meals' : type}
              </p>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-stone-900">
                {label}
              </h1>
              <p className="mt-2 text-stone-500 text-sm sm:text-base">
                {meta.description}
              </p>
            </div>

            {recipes.length > 0 && (
              <div className="shrink-0 text-right">
                <p className="text-4xl font-extrabold text-stone-900">
                  {recipes.length}
                </p>
                <p className="text-xs text-stone-400 font-medium mt-0.5">
                  recipes found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* content area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* empty state */}
        {recipes.length === 0 && (
          <div className="rounded-2xl border border-stone-200 bg-white p-10 sm:p-20 text-center">
            <UtensilsCrossed className="mx-auto mb-4 h-10 w-10 text-stone-200" />
            <p className="font-semibold text-stone-800 mb-1">
              No recipes found
            </p>
            <p className="text-sm text-stone-400 mb-5">
              Nothing here yet. Try a different filter.
            </p>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back to Dashboard
            </Button>
          </div>
        )}

        {/* results grid */}
        {recipes.length > 0 && (
          <section>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {recipes.slice(0, visibleCount).map((recipe) => (
                <RecipeCard
                  key={recipe.id || recipe.title}
                  recipe={recipe}
                  forceRegenerate={type === 'category'}
                />
              ))}
            </div>

            {visibleCount < recipes.length && (
              <div className="mt-10 text-center">
                <Button
                  variant="outline"
                  onClick={() => setVisibleCount((prev) => prev + 8)}
                  className="h-11 px-8 rounded-full font-semibold border-stone-300 hover:border-stone-900 transition-colors"
                >
                  <ChefHat className="w-4 h-4 mr-2" />
                  Load more · {recipes.length - visibleCount} left
                </Button>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  )
}

export default FilterResultsPage
