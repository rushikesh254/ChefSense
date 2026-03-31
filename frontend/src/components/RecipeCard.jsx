import RecipeImage from "@/components/RecipeImage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getdifficultyColor } from "@/lib/utils";
import { Clock, Star, Trash2, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

function RecipeCard({ recipe, deletebtn, removeRecipe }) {
  function deleterecipe(e) {
    e.preventDefault();
    removeRecipe(recipe.id);
  }

  if (!recipe) return null;

  const {
    title = "Recipe",
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
    missingIngredients,
    matchPercentage,
  } = recipe;

  const totalTime = (cookTime || 10) + (prepTime || 10); // default time if not provided

  let diffStyle = getdifficultyColor(recipe?.difficulty); // badge colors based on difficulty

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

          {deletebtn && (
            <button
              onClick={deleterecipe}
              className="absolute bottom-2 right-2 z-20 bg-white border border-red-200 text-red-500 hover:bg-red-200 hover:text-red-600 p-2 rounded-xl "
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {matchPercentage != null && (
            <div className="absolute bottom-2 right-2 z-20">
              <Badge
                className={`border-none px-2 py-0.5 text-[11px] font-semibold text-white shadow-sm backdrop-blur-sm
        ${matchPercentage >= 90 ? "bg-green-600/80" : matchPercentage >= 75 ? "bg-brand-600/80" : "bg-stone-600/80"}
      `}
              >
                {matchPercentage}% Match
              </Badge>
            </div>
          )}
          {/* Rating */}
          {rating != null && (
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-2 py-0.5 shadow-sm">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-[11px] font-semibold text-stone-800 leading-none">
                {typeof rating === "number" ? rating.toFixed(1) : rating}
              </span>
            </div>
          )}

          {/* Veg / Non-veg square dot */}
          {isVeg != null && (
            <div
              className="absolute top-2.5 left-2.5 w-5 h-5 rounded-sm border-2 bg-white flex items-center justify-center shadow-sm"
              style={{ borderColor: isVeg ? "#16a34a" : "#dc2626" }}
            >
              <div
                className={`w-2 h-2 rounded-full ${isVeg ? "bg-green-500" : "bg-red-500"}`}
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

          {missingIngredients?.length > 0 && (
            <div className="mt-1 rounded-xl bg-brand-50/50 p-2 border border-brand-100/50">
              <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-brand-800/80">
                Missing Ingredients
              </span>
              <div className="flex flex-wrap gap-1">
                {missingIngredients.slice(0, 3).map((ingredient) => (
                  <Badge
                    key={ingredient}
                    variant="outline"
                    className="rounded-md border-brand-200 bg-white px-1.5 py-0 text-[9px] font-medium text-brand-700 leading-tight"
                  >
                    {ingredient}
                  </Badge>
                ))}
                {missingIngredients.length > 3 && (
                  <Badge
                    variant="outline"
                    className="rounded-md border-brand-200 bg-white px-1.5 py-0 text-[9px] font-medium text-brand-700 leading-tight"
                  >
                    +{missingIngredients.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* show category, cuisine and diet if they exist */}
          <div className="flex flex-wrap gap-1 mt-auto pt-1">
            {category && (
              <Badge
                variant="outline"
                className="rounded-full border-stone-200 text-xs bg-stone-100 text-stone-500"
              >
                {category}
              </Badge>
            )}
            {cuisine && (
              <Badge
                variant="outline"
                className="rounded-full border-stone-200 text-xs bg-stone-100 text-stone-500"
              >
                {cuisine}
              </Badge>
            )}
            {diet && (
              <Badge
                variant="outline"
                className="rounded-full border-stone-200 text-xs bg-stone-100 text-stone-500"
              >
                {diet}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default RecipeCard;
