import featuredRecipes from '@/Dummydata/featured'
import quick from '@/Dummydata/quick'
import trending from '@/Dummydata/trending'
import {
  DISCOVER_CATEGORIES,
  DISCOVER_CUISINES,
  DISCOVER_DIETS,
} from '@/utils/data'

export async function getFeatured() {
  return featuredRecipes
}

export async function getTrending() {
  // Mock trending recipes data
  return trending
}

export async function getQuickMeals() {
  // Mock quick meals data
  return quick
}

export async function getCategories() {
  // Mock categories data
  return DISCOVER_CATEGORIES
}

export async function getCuisines() {
  // Mock cuisines data
  return DISCOVER_CUISINES
}

export async function getDiets() {
  // Mock diets data
  return DISCOVER_DIETS
}
