import RecipeImage from '@/components/RecipeImage'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Clock, Star, Users, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const DIFFICULTY_STYLES = {
  easy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  medium: 'bg-amber-50  text-amber-700  border-amber-100',
  hard: 'bg-red-50    text-red-700    border-red-100',
}

function RecipeCard({ recipe }) {
  if (!recipe) return null

  const {
    title = 'Recipe',
    imageUrl,
    description,
    category,
    cuisine,
    diet,
    cookTime,
    prepTime,
    servings,
    rating,
    difficulty,
    isVeg,
  } = recipe

  const totalTime = cookTime + prepTime

  const diffStyle =
    DIFFICULTY_STYLES[difficulty] ??
    'bg-stone-50 text-stone-600 border-stone-100'

  const taxonomyBadges = [category, cuisine, diet].filter(Boolean)

  return (
    <Link to={`/recipe/${recipe.id}`} className="w-full h-full">
      <Card className="group flex flex-col overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer p-0 w-full h-full">
        {/* image  */}
        <div className="relative overflow-hidden aspect-4/3 w-full shrink-0">
          {imageUrl ? (
            <RecipeImage
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-stone-100 flex items-center justify-center">
              <span className="text-4xl opacity-20">🍽️</span>
            </div>
          )}

          {/* Rating */}
          {rating != null && (
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-2 py-0.5 shadow-sm">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-[11px] font-semibold text-stone-800 leading-none">
                {typeof rating === 'number' ? rating.toFixed(1) : rating}
              </span>
            </div>
          )}

          {/* Veg / Non-veg square dot */}
          {isVeg != null && (
            <div
              className="absolute top-2.5 left-2.5 w-5 h-5 rounded-sm border-2 bg-white flex items-center justify-center shadow-sm"
              style={{ borderColor: isVeg ? '#16a34a' : '#dc2626' }}
            >
              <div
                className={`w-2 h-2 rounded-full ${isVeg ? 'bg-green-500' : 'bg-red-500'}`}
              />
            </div>
          )}
        </div>

        {/* content  */}
        <CardContent className="flex flex-col gap-2 px-3 pt-2.5 pb-3 flex-1">
          {/* Difficulty */}
          {difficulty && (
            <Badge
              variant="outline"
              className={`self-start flex items-center gap-1 rounded-full text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 ${diffStyle}`}
            >
              <Zap className="w-2.5 h-2.5" />
              {difficulty}
            </Badge>
          )}

          {/* Title */}
          <h3 className="font-serif text-sm sm:text-[15px] font-semibold leading-snug text-stone-900 line-clamp-1 tracking-tight">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-[11px] leading-relaxed text-stone-400 line-clamp-2 -mt-1">
              {description}
            </p>
          )}

          {/* Time + Servings */}
          {(totalTime || servings) && (
            <div className="flex items-center gap-3 text-[11px] text-stone-400 font-medium">
              {totalTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {totalTime} min
                </span>
              )}
              {totalTime && servings && (
                <Separator
                  orientation="vertical"
                  className="h-3 bg-stone-200"
                />
              )}
              {servings && (
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" /> {servings} serves
                </span>
              )}
            </div>
          )}

          {/* Category / Cuisine / Diet — badge*/}
          {taxonomyBadges.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-auto pt-1">
              {taxonomyBadges.map((label) => (
                <Badge
                  key={label}
                  variant="outline"
                  className="rounded-full border-stone-200 bg-stone-50 px-2 py-0.5 text-[10px] font-medium text-stone-500 hover:bg-stone-100 transition-colors"
                >
                  {label}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

export default RecipeCard
