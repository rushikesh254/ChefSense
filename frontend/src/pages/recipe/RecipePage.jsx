import RecipeImage from '@/components/RecipeImage'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getById } from '@/services/recipe'
import { getdifficultyColor } from '@/lib/utils'
import {
  ArrowLeft,
  CheckCircle2,
  ChefHat,
  Clock,
  Flame,
  Lightbulb,
  Loader2,
  Star,
  Users,
  Zap,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

function RecipePage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    function loadRecipe() {
      try {
        setLoading(true)
        const res = getById(id)
        // using simple function now not async .. layter when backend is ready it will be async and then we can use await here

        // console.log('recipe res', res)

        setRecipe(res)
      } catch {
        toast.error('Failed to load recipe')
        navigate('/')
      } finally {
        setLoading(false)
      }
    }
    loadRecipe()
  }, [id]) // if id changes load new recipe

  const totalTime = (recipe?.prepTime || 0) + (recipe?.cookTime || 0) // total time= prep time + cook time

  let diffStyle = getdifficultyColor(recipe?.difficulty)

  // loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <div className="flex items-center gap-2 p-4 border rounded-2xl">
          <Loader2 className="mr-3 h-6 w-6 animate-spin text-brand-600" />
          <p className="text-lg font-bold">Loading your recipe...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 pt-10 space-y-4">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-black hover:text-brand-600 transition-colors border rounded-full py-2 px-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {/* Hero image */}
        {recipe?.imageUrl && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-stone-200">
            <RecipeImage
              src={recipe.imageUrl}
              alt={recipe.title}
              className="h-full w-full object-cover"
            />

            {recipe?.isVeg && (
              <div
                className="absolute top-3 left-3 w-6 h-6 rounded-sm border-2 bg-stone-50 flex items-center justify-center"
                style={{ borderColor: recipe.isVeg ? 'green' : 'red' }}
              >
                <div
                  className={`w-3 h-3 rounded-full ${recipe.isVeg ? 'bg-green-500' : 'bg-red-500'}`}
                />
              </div>
            )}

            {recipe?.rating && (
              <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-stone-50/90 px-3 py-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-black">
                  {typeof recipe.rating === 'number'
                    ? recipe.rating.toFixed(1)
                    : recipe.rating}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Title card */}
        <Card>
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {recipe?.difficulty && (
                <Badge
                  variant="outline"
                  className={`rounded-full text-[10px] font-semibold uppercase tracking-wide flex items-center gap-1 ${diffStyle}`}
                >
                  <Zap className="w-2.5 h-2.5" /> {recipe.difficulty}
                </Badge>
              )}
              {recipe?.cuisine && (
                <Badge
                  variant="outline"
                  className="rounded-full text-[10px] border-brand-100 bg-brand-50 text-brand-600"
                >
                  {recipe.cuisine}
                </Badge>
              )}
              {recipe?.category && (
                <Badge
                  variant="outline"
                  className="rounded-full text-[10px] border-stone-200 bg-stone-50 text-stone-500"
                >
                  {recipe.category}
                </Badge>
              )}
              {recipe?.diet && recipe.diet.toLowerCase() !== 'none' && (
                <Badge
                  variant="outline"
                  className="rounded-full text-[10px] border-emerald-100 bg-emerald-50 text-emerald-600"
                >
                  {recipe.diet}
                </Badge>
              )}
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-black mb-2">
              {recipe?.title}
            </h1>

            {recipe?.description && (
              <p className="text-sm text-stone-400 leading-relaxed mb-4">
                {recipe.description}
              </p>
            )}

            <Separator className="mb-4" />

            <div className="flex flex-wrap gap-5 text-sm text-stone-500">
              {totalTime > 0 && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-stone-300" /> {totalTime} min
                </span>
              )}
              {recipe?.servings && (
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-stone-300" /> {recipe.servings}{' '}
                  serves
                </span>
              )}
              {recipe?.nutrition?.calories && (
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-stone-300" />{' '}
                  {recipe.nutrition.calories} kcal
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main grid */}

        <div className="flex flex-col gap-4">
          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
            {/* Ingredients */}
            <Card>
              <CardHeader className="px-5 pt-5 pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <ChefHat className="h-4 w-4 text-brand-500" /> Ingredients
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <ul className="divide-y divide-stone-100">
                  {recipe?.ingredients?.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="h-2 w-2 rounded-full bg-brand-400 shrink-0" />
                        <div>
                          <span className="text-sm text-stone-700">
                            {item.item}
                          </span>
                          {item.category && (
                            <span className="block text-[11px] text-stone-400">
                              {item.category}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-medium text-stone-400 shrink-0 ml-3">
                        {item.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Nutrition */}
            {recipe?.nutrition && (
              <Card>
                <CardHeader className="px-5 pt-5 pb-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
                    Per serving
                  </p>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      {
                        label: 'Calories',
                        value: recipe.nutrition.calories,
                        unit: 'kcal',
                      },
                      {
                        label: 'Protein',
                        value: recipe.nutrition.protein,
                        unit: 'g',
                      },
                      {
                        label: 'Carbs',
                        value: recipe.nutrition.carbs,
                        unit: 'g',
                      },
                      { label: 'Fat', value: recipe.nutrition.fat, unit: 'g' },
                    ]
                      .filter((n) => n.value)
                      .map((n) => (
                        <div
                          key={n.label}
                          className="rounded-xl bg-stone-50 border border-stone-100 p-3 text-center"
                        >
                          <p className="text-lg font-bold text-black">
                            {n.value}
                          </p>
                          <p className="text-xs text-stone-400">
                            {n.label} ({n.unit})
                          </p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </aside>

          {/* Right column */}
          <div className="lg:col-span-8 space-y-4">
            {/* Instructions */}
            <Card>
              <CardHeader className="px-5 sm:px-6 pt-5 pb-3">
                <CardTitle className="text-lg font-semibold">
                  Instructions
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 sm:px-6 pb-6">
                <div className="space-y-5">
                  {recipe?.instructions?.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-7 h-7 rounded-full bg-brand-500 flex items-center justify-center text-sm font-bold text-white">
                          {step.step}
                        </div>
                        {i < recipe.instructions.length - 1 && (
                          <div className="w-px flex-1 bg-stone-100 mt-2 min-h-3" />
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-black mb-1">
                          {step.title}
                        </h3>
                        <p className="text-sm text-stone-500 leading-relaxed">
                          {step.instruction}
                        </p>
                        {step.tip && (
                          <div className="mt-2.5 flex gap-2 rounded-xl border border-brand-100 bg-brand-50 px-3 py-2.5">
                            <Lightbulb className="h-3.5 w-3.5 shrink-0 text-brand-400 mt-0.5" />
                            <p className="text-xs text-brand-700 leading-relaxed">
                              <span className="font-semibold">Tip: </span>
                              {step.tip}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-800">
                        You're all done!
                      </p>
                      <p className="text-xs text-emerald-500 mt-0.5">
                        Enjoy your {recipe?.title}.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chef's Tips */}
            {recipe?.tips?.length > 0 && (
              <Card className="bg-amber-50 border-amber-100">
                <CardHeader className="px-5 sm:px-6 pt-5 pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-brand-400" /> Chef's Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 sm:px-6 pb-5">
                  <ul className="space-y-3">
                    {recipe.tips.map((tip, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-stone-600 leading-relaxed"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Substitutions */}
            {recipe?.substitutions?.length > 0 && (
              <Card>
                <CardHeader className="px-5 sm:px-6 pt-5 pb-1">
                  <CardTitle className="text-lg font-semibold">
                    Substitutions
                  </CardTitle>
                  <p className="text-sm text-stone-400 mt-1">
                    Don't have everything? Try these swaps.
                  </p>
                </CardHeader>
                <CardContent className="px-5 sm:px-6 pb-5">
                  <div className="space-y-4">
                    {recipe.substitutions.map((entry, i) => (
                      <div key={i}>
                        <p className="text-sm text-stone-600 mb-2">
                          Instead of{' '}
                          <span className="font-semibold text-brand-500">
                            {entry.original}
                          </span>
                          :
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {entry.alternatives?.map((alt) => (
                            <Badge
                              key={alt}
                              variant="outline"
                              className="rounded-full text-xs text-stone-500"
                            >
                              {alt}
                            </Badge>
                          ))}
                        </div>
                        {i < recipe.substitutions.length - 1 && (
                          <Separator className="mt-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipePage


