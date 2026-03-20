import featuredRecipes from '@/Dummydata/featured'
import fileterRecipes from '@/Dummydata/filterRecipes'
import quickmeals from '@/Dummydata/quick'
import quick from '@/Dummydata/quick'
import {
  DISCOVER_CATEGORIES,
  DISCOVER_CUISINES,
  DISCOVER_DIETS,
} from '@/utils/data'

export const DiscoverService = {
  async getFeatured() {
    return featuredRecipes
  },

  async getQuickMeals() {
    // Mock quick meals data
    return quickmeals
  },

  async getCategories() {
    // Mock categories data
    return DISCOVER_CATEGORIES
  },

  async getCuisines() {
    // Mock cuisines data
    return DISCOVER_CUISINES
  },

  async getDiets() {
    // Mock diets data
    return DISCOVER_DIETS
  },

  async getByCategory(name) {
    return fileterRecipes
  },
  async getByCuisine(name) {
    return fileterRecipes
  },
  async getByDiet(name) {
    return fileterRecipes
  },
}
