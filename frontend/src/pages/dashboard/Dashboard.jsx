import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
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
  ArrowRight,
  ChevronRight,
  Clock3,
  Flame,
  History,
  Leaf,
  Lightbulb,
  Loader2,
  Search,
  Star,
  TrendingUp,
} from 'lucide-react'

import {
  dietColors,
  getCategoryEmoji,
  getCountryFlag,
  getDietEmoji,
  slugify,
} from '@/utils/data'

import cookingTips from '@/Dummydata/cookingTips'

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

  // handle submit

  function handleSearch(e) {
    e.preventDefault()

    const query = search.trim()

    if (!query) return

    navigate(`/recipe?cook=${encodeURIComponent(query)}`)
  }

  // click enter to search
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Enter') {
        handleSearch(e)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [search])

  //  cooking tipc logic

  const [tipIndex, setTipIndex] = useState(
    Math.floor(Math.random() * cookingTips.length),
  )

  const randomTip = cookingTips[tipIndex]

  const refreshTip = () => {
    const newIndex = Math.floor(Math.random() * cookingTips.length)
    setTipIndex(newIndex)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50">
        <div className="inline-flex items-center border-2 border-stone-900 bg-white px-6 py-4 text-lg font-bold text-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]">
          <Loader2 className="mr-3 h-6 w-6 animate-spin text-orange-600" />
          Loading dashboard...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-16 sm:pb-20">
      {/* Hero */}

      {featuredRecipe && (
        <section className="relative h-[65vh] sm:h-[70vh] w-full overflow-hidden">
          {/* Background Image */}
          <img
            src={featuredRecipe.imageUrl}
            alt={featuredRecipe.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 h-full flex items-end pb-12 sm:pb-16">
            <div className="max-w-lg space-y-4">
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold bg-brand-500 text-white px-3 py-1 rounded-md">
                <Flame className="w-3.5 h-3.5" />
                Featured
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                {featuredRecipe.title}
              </h1>

              {/* Summary */}
              <p className="text-sm sm:text-base text-stone-200">
                {featuredRecipe.description}
              </p>

              {/* Info Row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-stone-300">
                <span className="flex items-center gap-1">
                  <Clock3 className="w-4 h-4" />
                  {featuredRecipe.cookTime || 35} min
                </span>

                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  {featuredRecipe.rating?.toFixed(1) || '4.9'}
                </span>

                <span>{featuredRecipe.servings || 4} servings</span>
              </div>

              {/* NEW: Tags (Cuisine / Diet / Category) */}
              <div className="flex flex-wrap gap-2 pt-1">
                {featuredRecipe.cuisine && (
                  <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full">
                    {featuredRecipe.cuisine}
                  </span>
                )}

                {featuredRecipe.diet && (
                  <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full">
                    {featuredRecipe.diet}
                  </span>
                )}

                {featuredRecipe.category && (
                  <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full">
                    {featuredRecipe.category}
                  </span>
                )}
              </div>

              {/* CTA */}
              <Link
                to={`/recipe/${featuredRecipe.id}`}
                className="inline-flex items-center gap-2 mt-2 bg-white text-black px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-stone-200 transition"
              >
                Start Cooking
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
      {/* Search */}
      <div className="px-5 sm:px-6 lg:px-8 -mt-7 relative z-20">
        <form onSubmit={handleSearch} className="mx-auto max-w-3xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
          <section className="bg-stone-100/50 rounded-4xl p-8 sm:p-12">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 text-balance flex items-center gap-2">
                Explore Styles{' '}
                <ChevronRight
                  className="w-5 h-5 text-brand-500"
                  aria-hidden="true"
                />
              </h2>
              <p className="text-stone-500 text-sm sm:text-base font-medium mt-2">
                Browse recipes by your favorite style.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  to={`/recipes/category/${slugify(cat.name)}`}
                  className="group px-6 py-3.5 bg-white hover:bg-brand-50 border border-stone-200 rounded-full flex items-center gap-3 transition-all duration-300 hover:scale-105 shadow-xs hover:shadow-brand-200/50 hover:border-brand-500"
                >
                  <span className="text-2xl inline-block group-hover:scale-[1.4] transition-transform duration-300 origin-center">
                    {getCategoryEmoji(cat.name)}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-stone-700 group-hover:text-brand-500 transition-colors duration-300">
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
                  <div className="relative overflow-hidden rounded-2xl bg-stone-100 shadow-xs transition-shadow hover:shadow-md">
                    <div className="aspect-3/4">
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        loading="lazy"
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
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
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                <Link to="/recipes/quick/all">View All</Link>
              </Button>
            </div>

            <Carousel opts={{ align: 'start' }} className="w-full">
              <CarouselContent className="-ml-4">
                {quickMeals.map((meal) => (
                  <CarouselItem
                    key={meal.id}
                    className="pl-4 basis-[70%] sm:basis-[45%] md:basis-[30%] lg:basis-[22%]"
                  >
                    <Link to={`/recipe?cook=${encodeURIComponent(meal.title)}`}>
                      <Card className="overflow-hidden rounded-2xl border-stone-200/60 shadow-xs hover:shadow-md transition-shadow">
                        <div className="aspect-square">
                          <img
                            src={meal.imageUrl}
                            alt={meal.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
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
          <section className="bg-stone-50 rounded-4xl p-8 sm:p-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 text-balance">
                Explore Cuisines
              </h2>
              <p className="text-stone-500 text-sm sm:text-base font-medium mt-2">
                Discover flavors from around the world.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 sm:gap-10">
              {cuisines.map((cuisine) => {
                const flagUrl = getCountryFlag(cuisine.name)
                return (
                  <Link
                    key={cuisine.name}
                    to={`/recipes/cuisine/${slugify(cuisine.name)}`}
                    className="group flex flex-col items-center gap-3"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white shadow-sm border border-stone-100 flex items-center justify-center group-hover:scale-[1.15] group-hover:shadow-xl group-hover:ring-3 group-hover:ring-brand-300 transition-all duration-300">
                      {flagUrl ? (
                        <img
                          src={flagUrl}
                          alt={`${cuisine.name} flag`}
                          className="w-11 h-8 sm:w-14 sm:h-10 object-cover rounded-sm"
                        />
                      ) : (
                        <span className="text-3xl">🌍</span>
                      )}
                    </div>
                    <span className="text-sm sm:text-base font-bold text-stone-700 group-hover:text-brand-600 transition-colors duration-300">
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
          <section className="bg-stone-50 rounded-4xl p-6 sm:p-10">
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="w-5 h-5 text-brand-600" />
                <p className="text-xs text-brand-600 font-bold uppercase tracking-widest">
                  Lifestyle
                </p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 text-balance">
                Dietary Preferences
              </h2>
              <p className="text-stone-500 text-sm sm:text-base font-medium mt-2">
                Choose a lifestyle that fits your taste.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
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
                      className={`${colors} rounded-2xl shadow-xs hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300`}
                    >
                      <CardContent className="p-5 sm:p-6 flex items-center gap-4">
                        <span className="text-2xl sm:text-3xl inline-block group-hover:scale-[1.4] transition-transform duration-300 origin-center">
                          {getDietEmoji(diet.name)}
                        </span>
                        <span className="text-sm sm:text-base font-bold">
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
            <div className="flex items-center gap-2.5 mb-8">
              <History className="w-5 h-5 text-brand-600" />
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 text-balance">
                Recently Viewed
              </h2>
            </div>

            <Carousel opts={{ align: 'start' }} className="w-full">
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
                      <Card className="overflow-hidden rounded-2xl border-stone-200/60 shadow-xs hover:shadow-md transition-shadow">
                        <div className="aspect-[4/3]">
                          <img
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
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

        {/* Cooking Tip  */}

        {randomTip && (
          <section>
            <div className="relative bg-brand-50/80 border border-brand-200 rounded-3xl overflow-hidden min-h-35 sm:min-h-40">
              {/* Background Icon */}
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Lightbulb className="w-32 h-32 text-brand-900" />
              </div>

              <div className="relative z-10 p-6 sm:p-8 flex items-start gap-4 sm:gap-6">
                {/* Icon */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-brand-100 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-brand-600" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-600">
                      💡 Cooking Tip
                    </p>

                    <button
                      onClick={refreshTip}
                      className="text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-800 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-100/50 hover:bg-brand-100"
                    >
                      ↻ New Tip
                    </button>
                  </div>

                  {/* Tip */}
                  <p className="text-base sm:text-lg font-medium text-stone-800 leading-relaxed pr-4">
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
