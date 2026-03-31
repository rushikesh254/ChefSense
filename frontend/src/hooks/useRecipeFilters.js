import { useMemo, useState } from "react";

// simple constants for filtering
export const DIFFICULTIES = ["easy", "medium", "hard"];
export const DIET_TYPES = ["vegetarian", "non-vegetarian"];
export const SORT_OPTIONS = [
  { label: "Top Rated", value: "rating" },
  { label: "Quickest", value: "cookTime" },
];

export function useRecipeFilters(recipes = []) {
  // basic state for filters
  const [difficulty, setDifficulty] = useState(null);
  const [diet, setDiet] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  // logic for filtering and sorting - kept simple like original code
  const filteredRecipes = useMemo(() => {
    let result = [...recipes];

    // apply difficulty filter
    if (difficulty) {
      result = result.filter((r) => r.difficulty === difficulty);
    }

    // apply diet filter

    if (diet === "vegetarian") {
      result = result.filter((r) => r.isVeg === true);
    } else if (diet === "non-vegetarian") {
      result = result.filter((r) => r.isVeg === false);
    }

    // apply sorting
    if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "cookTime") {
      result.sort((a, b) => (a.cookTime || 0) - (b.cookTime || 0));
    }

    return result;
  }, [recipes, difficulty, diet, sortBy]);




  
  // simple helper functions
  function clearAll() {
    setDifficulty(null);
    setDiet(null);
    setSortBy(null);
  }

  const hasActiveFilters = !!(difficulty || diet || sortBy);

  return {
    difficulty,
    setDifficulty,
    diet,
    setDiet,
    sortBy,
    setSortBy,
    filteredRecipes,
    clearAll,
    hasActiveFilters,
  };
}
