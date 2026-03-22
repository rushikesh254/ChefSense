import RecipeCard from '@/components/RecipeCard'
import RecipeImage from '@/components/RecipeImage'
import SearchBar from '@/components/SearchBar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import cookingTips from '@/Dummydata/cookingTips'
import recentlyviewed from '@/Dummydata/recentlyviewed'
import { DiscoverService } from '@/services/discover'
import {
  DISCOVER_CATEGORIES,
  DISCOVER_CUISINES,
  DISCOVER_DIETS,
  dietColors,
  getCategoryEmoji,
  getCountryFlag,
  getDietEmoji,
  slugify,
} from '@/utils/data'
import {
  ArrowRight,
  Clock,
  Clock3,
  Flame,
  History,
  Leaf,
  Lightbulb,
  Star,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Dashboard = () => {
  const [search, setSearch] = useState('')
  const [featuredRecipe, setFeaturedRecipe] = useState(null)
  const [quickMeals, setQuickMeals] = useState([])
  const [categories, setCategories] = useState(DISCOVER_CATEGORIES)
  const [cuisines, setCuisines] = useState(DISCOVER_CUISINES)
  const [diets, setDiets] = useState(DISCOVER_DIETS)
  const [recentlyViewed] = useState(recentlyviewed.recipes || [])
  const [tipIndex, setTipIndex] = useState(
    Math.floor(Math.random() * cookingTips.length),
  )

  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [
          featuredData,
          quickMealsData,
          categoryData,
          cuisineData,
          dietData,
        ] = await Promise.all([
          DiscoverService.getFeatured(),
          DiscoverService.getQuickMeals(),
          DiscoverService.getCategories(),
          DiscoverService.getCuisines(),
          DiscoverService.getDiets(),
        ])

        setFeaturedRecipe(featuredData.recipe || null)
        setQuickMeals(quickMealsData.recipes || [])
        setCategories(categoryData.categories || DISCOVER_CATEGORIES)
        setCuisines(cuisineData.cuisines || DISCOVER_CUISINES)
        setDiets(dietData.diets || DISCOVER_DIETS)
      } catch (error) {
        toast.error('Failed to load dashboard data. Please try again later.')
        console.error('Error loading dashboard data:', error)
      }
      setLoading(false)
    }

    loadDashboard()
  }, [])

  const refreshTip = () =>
    setTipIndex(Math.floor(Math.random() * cookingTips.length))

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border rounded-full inline-flex items-center bg-white px-6 py-4 text-lg font-bold text-stone-900">
          <Clock className="  mr-3 h-6 w-6 animate-spin text-brand-600" />
          Loading Your Dashboard...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-16 sm:pb-20">
      {/* hero section */}
      {featuredRecipe && (
        <section className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
          <RecipeImage
            src={featuredRecipe.imageUrl}
            alt={featuredRecipe.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

          <div className="relative z-10 h-full flex items-end">
            <div className="w-full max-w-7xl mx-auto px-5 sm:px-10 pb-10 sm:pb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
              {/* left — info */}
              <div className="space-y-3 max-w-xl">
                <div className="flex gap-2 flex-col items-start">
                  <Badge className="bg-brand-600 text-white border-0">
                    <Flame className="w-5 h-5" /> Featured
                  </Badge>
                  <div className="flex gap-2">
                    {featuredRecipe.category && (
                      <Badge className="bg-white/15 text-white border-0 backdrop-blur-sm">
                        {featuredRecipe.category}
                      </Badge>
                    )}
                    {featuredRecipe.cuisine && (
                      <Badge className="bg-white/15 text-white border-0 backdrop-blur-sm">
                        {featuredRecipe.cuisine}
                      </Badge>
                    )}
                    {featuredRecipe.diet && (
                      <Badge className="bg-white/15 text-white border-0 backdrop-blur-sm">
                        {featuredRecipe.diet}
                      </Badge>
                    )}
                  </div>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                  {featuredRecipe.title}
                </h1>

                {featuredRecipe.description && (
                  <p className="text-sm sm:text-base text-white/65 line-clamp-2 max-w-md">
                    {featuredRecipe.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-white/55">
                  {featuredRecipe.cookTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock3 className="w-4 h-4" /> {featuredRecipe.cookTime}{' '}
                      min
                    </span>
                  )}
                  {featuredRecipe.rating && (
                    <span className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      {featuredRecipe.rating.toFixed(1)}
                    </span>
                  )}
                  {featuredRecipe.servings && (
                    <span>{featuredRecipe.servings} servings</span>
                  )}
                </div>
                {/* right — CTA */}
                <Link to={`/recipe/${featuredRecipe.id}`} className="shrink-0">
                  <Button
                    variant="outline"
                    className="h-9 px-5 bg-stone-100/80 font-bold text-base hover:scale-105 border-none transition-transform gap-2"
                  >
                    Cook This <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* search section */}
      <div className="px-4 sm:px-6 -mt-6 sm:-mt-7 relative z-20">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search for any recipe, cuisine, or ingredient..."
        />
      </div>
      {/* main content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 sm:pt-14 pb-16 space-y-10 sm:space-y-14">
        {/* Categories */}
        {categories.length > 0 && (
          <section>
            <div className="mb-5 sm:mb-6">
              <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
                Explore Styles
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm font-medium mt-1">
                Browse recipes by your favorite style.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 sm:gap-4 sm:px-15">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  to={`/recipes/category/${slugify(cat.name)}`}
                  className="group px-4 sm:px-5 sm:h-15 h-10 py-2.5 sm:py-3 bg-white hover:bg-brand-50 border border-stone-200 rounded-full flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-105 shadow-xs hover:shadow-brand-200/50 hover:border-brand-500"
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
        {quickMeals.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <div>
                <p className="text-xs sm:text-sm text-stone-500 font-semibold uppercase tracking-wider mb-0.5">
                  Quick Recipes
                </p>
                <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
                  Ready in 15 Minutes
                </h2>
              </div>
              <Link to="/recipes/quick/all">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs sm:text-sm"
                >
                  View All
                </Button>
              </Link>
            </div>
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
            <div className="text-center mb-7 sm:mb-8">
              <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
                Explore Cuisines
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm font-medium mt-1">
                Discover flavors from around the world.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-5 sm:gap-10 sm:px-15">
              {cuisines.map((cuisine) => {
                const flagUrl = getCountryFlag(cuisine.name)
                return (
                  <Link
                    key={cuisine.name}
                    to={`/recipes/cuisine/${slugify(cuisine.name)}`}
                    className="group flex flex-col items-center gap-2 sm:gap-3"
                  >
                    <div className="w-14 h-14 sm:w-25 sm:h-25 rounded-full bg-white shadow-sm border border-stone-100 flex items-center justify-center group-hover:scale-110 group-hover:shadow-xl group-hover:ring-2 group-hover:ring-brand-300 transition-all duration-300">
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
        {diets.length > 0 && (
          <section>
            <div className="mb-5 sm:mb-7">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-brand-600" />
                <p className="text-[10px] sm:text-xs text-brand-600 font-bold uppercase tracking-widest">
                  Lifestyle
                </p>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
                Dietary Preferences
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm font-medium mt-1">
                Choose a lifestyle that fits your taste.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
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
        {recentlyViewed.length > 0 && (
          <section>
            <div className="flex items-center gap-2 sm:gap-2.5 mb-5 sm:mb-6">
              <History className="w-4 h-4 sm:w-5 sm:h-5 text-brand-600" />
              <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
                Recently Viewed
              </h2>
            </div>
            <div className="flex flex-nowrap gap-2 overflow-x-auto">
              {recentlyViewed.map((recipe) => (
                <div key={recipe.id} className="shrink-0 w-64 ">
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Cooking Tip */}
        {cookingTips.length > 0 && (
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
                    {cookingTips[tipIndex]}
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
