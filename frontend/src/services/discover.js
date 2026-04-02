import featuredRecipe from "@/data/featured";
import filterRecipes from "@/data/filterrecipes";
import recentlyviewed from "@/data/recentlyviewed";
import {
  DISCOVER_CATEGORIES,
  DISCOVER_CUISINES,
  DISCOVER_DIETS,
} from "@/lib/constants";

// todo: replace with real backend api later

// now just exporting dummy data

// func to return featured recipe
export function getFeatured() {
  return featuredRecipe;
}

// func to return categories options
export function getCategories() {
  return DISCOVER_CATEGORIES;
}

// func to return cuisines options

export function getCuisines() {
  return DISCOVER_CUISINES;
}
// func to return diets options

export function getDiets() {
  return DISCOVER_DIETS;
}
// func to return quick meals
export function getQuickMeals() {
  return filterRecipes;
}

// func to return category recipes based on category name

export function getByCategory(name) {
  return filterRecipes;
}

// func to return  cusine recipes  based on cuisine name
export function getByCuisine(name) {
  return filterRecipes;
}

// func to return diet recipes  options based on diet name
export function getByDiet(name) {
  return filterRecipes;
}

// func to return recently viewed recipes
export function getRecentlyViewed() {
  return recentlyviewed.recipes;
}
