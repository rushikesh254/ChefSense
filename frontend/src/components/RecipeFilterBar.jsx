import { X } from "lucide-react";
import {
  DIFFICULTIES,
  DIET_TYPES,
  SORT_OPTIONS,
} from "@/hooks/useRecipeFilters";

function RecipeFilterBar({
  difficulty,
  setDifficulty,
  diet,
  setDiet,
  sortBy,
  setSortBy,
  clearAll,
  hasActiveFilters,
}) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 mb-6">
      <div className="flex flex-wrap items-center gap-2">
        {/* Difficulty filter chips */}
        {DIFFICULTIES.map((d) => (
          <button
            key={d}
            onClick={() => setDifficulty(difficulty === d ? null : d)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize border transition-colors ${
              difficulty === d
                ? "bg-stone-900 text-white border-stone-900"
                : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
            }`}
          >
            {d}
          </button>
        ))}

        <div className="w-px h-5 bg-stone-200" />

        {/* Veg/Non-Veg filter chips */}
        {DIET_TYPES.map((d) => (
          <button
            key={d}
            onClick={() => setDiet(diet === d ? null : d)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              diet === d
                ? "bg-stone-900 text-white border-stone-900"
                : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
            }`}
          >
            {d === "vegetarian" ? "Veg" : "Non-Veg"}
          </button>
        ))}

        <div className="w-px h-5 bg-stone-200" />

        {/* Sorting options */}
        {SORT_OPTIONS.map((s) => (
          <button
            key={s.value}
            onClick={() => setSortBy(sortBy === s.value ? null : s.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              sortBy === s.value
                ? "bg-stone-900 text-white border-stone-900"
                : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
            }`}
          >
            {s.label}
          </button>
        ))}

        {/* Show Clear All button if any filter is active */}
        {hasActiveFilters && (
          <>
            <div className="w-px h-5 bg-stone-200" />
            <button
              onClick={clearAll}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-50 transition-colors"
            >
              <X className="w-3 h-3" /> Clear all
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default RecipeFilterBar;
