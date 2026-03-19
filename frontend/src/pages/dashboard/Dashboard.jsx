import RecipeCard from '@/components/RecipeCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import recentlyviewed from '@/Dummydata/recentrlyviewed'
import {
  DISCOVER_CATEGORIES,
  DISCOVER_CUISINES,
  DISCOVER_DIETS,
} from '@/utils/data'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  ChevronRight,
  Clock3,
  Flame,
  History,
  Leaf,
  Lightbulb,
  Search,
  Star,
} from 'lucide-react'

import {
  dietColors,
  getCategoryEmoji,
  getCountryFlag,
  getDietEmoji,
  slugify,
} from '@/utils/data'

import cookingTips from '@/Dummydata/cookingTips'

import RecipeImage from '@/components/RecipeImage'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  getCategories,
  getCuisines,
  getDiets,
  getFeatured,
  getQuickMeals,
  getTrending,
} from '@/services/dicover'
import { toast } from 'sonner'

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [featuredRecipe, setFeaturedRecipe] = useState(null)
  const [trending, setTrending] = useState([])
  const [quickMeals, setQuickMeals] = useState([])
  const [categories, setCategories] = useState(DISCOVER_CATEGORIES)
  const [cuisines, setCuisines] = useState(DISCOVER_CUISINES)
  const [diets, setDiets] = useState(DISCOVER_DIETS)

  const navigate = useNavigate()

  const [recentlyViewed, setRecentlyViewed] = useState(
    recentlyviewed.recipes || [],
  )

  useEffect(() => {
    async function LoadDashboard() {
      setLoading(true)
      try {
        const featuredRecipe = await getFeatured()
        setFeaturedRecipe(featuredRecipe.recipe || null)

        const trendingRecipes = await getTrending()
        setTrending(trendingRecipes.recipes || [])

        const quickMealsData = await getQuickMeals()
        setQuickMeals(quickMealsData.meals || [])

        const categoryData = await getCategories()
        setCategories(categoryData?.categories || DISCOVER_CATEGORIES)

        const cuisineData = await getCuisines()
        setCuisines(cuisineData?.cuisines || DISCOVER_CUISINES)

        const dietData = await getDiets()
        setDiets(dietData?.diets || DISCOVER_DIETS)
      } catch (error) {
        toast.error('Failed to load dashboard data. Please try again later.')
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    LoadDashboard()
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    const query = search.trim()
    if (!query) return
    navigate(`/recipe?cook=${encodeURIComponent(query)}`)
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Enter') handleSearch(e)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [search])

  const [tipIndex, setTipIndex] = useState(
    Math.floor(Math.random() * cookingTips.length),
  )
  const randomTip = cookingTips[tipIndex]
  const refreshTip = () =>
    setTipIndex(Math.floor(Math.random() * cookingTips.length))

  return (
    <div className="min-h-screen pb-16 sm:pb-20">
      {/* hero section  */}
      {featuredRecipe && (
        <section className="relative h-[55vh] sm:h-[65vh] overflow-hidden">
          <RecipeImage
            src={featuredRecipe.imageUrl}
            alt={featuredRecipe.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-10 max-w-7xl mx-auto px-3 h-full flex items-end pb-10 sm:pb-14">
            <div className="max-w-xs sm:max-w-lg space-y-2 sm:space-y-3">
              <Badge className="bg-brand-500 text-white border-0">
                <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                Featured
              </Badge>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-bold text-white/90 leading-tight">
                {featuredRecipe.title}
              </h1>

              {/* Description */}
              {featuredRecipe.description && (
                <p className="text-xs sm:text-base text-white line-clamp-2 sm:line-clamp-none">
                  {featuredRecipe.description}
                </p>
              )}

              {/* Info row */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-stone-300">
                {featuredRecipe.cookTime && (
                  <span className="flex items-center gap-1">
                    <Clock3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {featuredRecipe.cookTime} min
                  </span>
                )}
                {featuredRecipe.rating && (
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" />
                    {featuredRecipe.rating.toFixed(1)}
                  </span>
                )}
                {featuredRecipe.servings && (
                  <span>{featuredRecipe.servings} servings</span>
                )}
              </div>

              {/* Tags */}
              {(featuredRecipe.cuisine ||
                featuredRecipe.diet ||
                featuredRecipe.category) && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                  {featuredRecipe.cuisine && (
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white"
                    >
                      {featuredRecipe.cuisine}
                    </Badge>
                  )}
                  {featuredRecipe.diet && (
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white"
                    >
                      {featuredRecipe.diet}
                    </Badge>
                  )}
                  {featuredRecipe.category && (
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white"
                    >
                      {featuredRecipe.category}
                    </Badge>
                  )}
                </div>
              )}

              <Link to={`/recipe/${featuredRecipe.id}`}>
                <Button
                  variant="primary"
                  className="cursor-pointer transition-all duration-300 hover:scale-105 h-12 w-full sm:w-auto font-bold"
                >
                  Start Cooking Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
      {/* search section  */}
      <div className="px-4 sm:px-6 -mt-6 sm:-mt-7 relative z-20">
        <form onSubmit={handleSearch} className="mx-auto max-w-3xl">
          <div className="relative">
            <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-stone-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipes (e.g. Paneer tikka, Dal makhani)"
              className="h-12 sm:h-14 w-full rounded-xl bg-white pl-10 pr-4 text-sm shadow-xl shadow-stone-200 border border-stone-200 placeholder:text-stone-400"
            />
          </div>
        </form>
      </div>

      {/* main content  */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 sm:pt-16 pb-16 space-y-12 sm:space-y-20">
        {/* Categories */}
        {categories?.length > 0 && (
          <section className="rounded-3xl p-5 sm:p-8">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-4xl font-extrabold tracking-tight text-stone-900 flex items-center gap-2">
                Explore Styles
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500" />
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm font-medium mt-1.5 sm:mt-2">
                Browse recipes by your favorite style.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  to={`/recipes/category/${slugify(cat.name)}`}
                  className="group px-4 sm:px-5 py-2.5 sm:py-3 bg-white hover:bg-brand-50 border border-stone-200 rounded-full flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-105 shadow-xs hover:shadow-brand-200/50 hover:border-brand-500"
                >
                  <span className="text-xl sm:text-2xl inline-block group-hover:scale-125 transition-transform duration-300 origin-center">
                    {getCategoryEmoji(cat.name)}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-stone-700 group-hover:text-brand-500 transition-colors duration-300">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Quick Meals */}
        {quickMeals?.length > 0 && (
          <section className="rounded-xl sm:rounded-2xl p-4 sm:p-8">
            <div className="flex items-start sm:items-center justify-between mb-5 sm:mb-6 gap-3">
              <div>
                <p className="text-sm sm:text-lg text-stone-500 mb-0.5 sm:mb-1 font-semibold uppercase tracking-wider">
                  Quick Recipes
                </p>
                <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
                  Ready in 15 Minutes
                </h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full shrink-0 text-xs sm:text-sm"
              >
                <Link to="/recipes/quick/all" className="cursor-pointer">
                  View All
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
              {quickMeals?.slice(0, 4).map((meal) => (
                <Link
                  key={meal.id}
                  to={`/recipe?cook=${encodeURIComponent(meal.title)}`}
                >
                  <RecipeCard recipe={meal} />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Cuisines */}
        {cuisines?.length > 0 && (
          <section className="rounded-3xl p-5 sm:p-10">
            <div className="text-center mb-7 sm:mb-10">
              <h2 className="text-xl sm:text-5xl font-extrabold tracking-tight text-stone-900">
                Explore Cuisines
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm font-medium mt-1.5 sm:mt-2">
                Discover flavors from around the world.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-5 sm:gap-10">
              {cuisines.map((cuisine) => {
                const flagUrl = getCountryFlag(cuisine.name)
                return (
                  <Link
                    key={cuisine.name}
                    to={`/recipes/cuisine/${slugify(cuisine.name)}`}
                    className="group flex flex-col items-center gap-2 sm:gap-3"
                  >
                    <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white shadow-sm border border-stone-100 flex items-center justify-center group-hover:scale-110 group-hover:shadow-xl group-hover:ring-2 group-hover:ring-brand-300 transition-all duration-300">
                      {flagUrl ? (
                        <img
                          src={flagUrl}
                          alt={`${cuisine.name} flag`}
                          className="w-8 h-5 sm:w-12 sm:h-8 object-cover rounded-sm"
                        />
                      ) : (
                        <span className="text-2xl sm:text-3xl">🌍</span>
                      )}
                    </div>
                    <span className="text-[11px] sm:text-sm font-bold text-stone-700 group-hover:text-brand-600 transition-colors duration-300 text-center">
                      {cuisine.name}
                    </span>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Diets */}
        {diets?.length > 0 && (
          <section className="rounded-3xl p-5 sm:p-8">
            <div className="mb-7 sm:mb-10">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-brand-600" />
                <p className="text-[10px] sm:text-xs text-brand-600 font-bold uppercase tracking-widest">
                  Lifestyle
                </p>
              </div>
              <h2 className="text-xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
                Dietary Preferences
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm font-medium mt-1.5 sm:mt-2">
                Choose a lifestyle that fits your taste.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
              {diets.map((diet) => {
                const colors =
                  dietColors[diet.name] ||
                  'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                return (
                  <Link
                    key={diet.name}
                    to={`/recipes/diet/${slugify(diet.name)}`}
                    className="group"
                  >
                    <Card
                      className={`${colors} rounded-xl sm:rounded-2xl shadow-xs hover:-translate-y-1 sm:hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300`}
                    >
                      <CardContent className="p-3.5 sm:p-5 flex items-center gap-3 sm:gap-4">
                        <span className="text-xl sm:text-2xl inline-block group-hover:scale-125 transition-transform duration-300 origin-center">
                          {getDietEmoji(diet.name)}
                        </span>
                        <span className="text-xs sm:text-sm font-bold">
                          {diet.name}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentlyViewed?.length > 0 && (
          <section>
            <div className="flex items-center gap-2 sm:gap-2.5 mb-5 sm:mb-8">
              <History className="w-4 h-4 sm:w-5 sm:h-5 text-brand-600" />
              <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
                Recently Viewed
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
              {recentlyViewed.map((recipe) => (
                <Link
                  key={recipe.id}
                  to={`/recipe?cook=${encodeURIComponent(recipe.title)}`}
                >
                  <RecipeCard recipe={recipe} />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Cooking Tip */}
        {randomTip && (
          <section>
            <div className="relative bg-brand-50/80 border border-brand-200 rounded-2xl sm:rounded-3xl overflow-hidden min-h-32 sm:min-h-40">
              <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-5">
                <Lightbulb className="w-24 h-24 sm:w-32 sm:h-32 text-brand-900" />
              </div>

              <div className="relative z-10 p-4 sm:p-8 flex items-start gap-3 sm:gap-6">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-brand-100 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-5 h-5 sm:w-7 sm:h-7 text-brand-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2 gap-2">
                    <p className="text-[10px] sm:text-sm font-bold uppercase tracking-widest text-brand-600">
                      💡 Cooking Tip
                    </p>
                    <button
                      onClick={refreshTip}
                      className="text-[10px] sm:text-sm font-bold text-brand-600 hover:text-brand-800 transition-colors flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-brand-100/50 hover:bg-brand-100 shrink-0"
                    >
                      ↻ New Tip
                    </button>
                  </div>
                  <p className="text-sm sm:text-lg font-medium text-stone-800 leading-relaxed pr-2">
                    {randomTip}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default Dashboard
