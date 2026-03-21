import featuredRecipes from '@/Dummydata/featured'
import fileterRecipes from '@/Dummydata/filterRecipes'
import {
  DISCOVER_CATEGORIES,
  DISCOVER_CUISINES,
  DISCOVER_DIETS,
} from '@/utils/data'

export const DiscoverService = {
  async getFeatured() {
    // return dummy recipe
    return featuredRecipes
  },

  async getQuickMeals() {
    // returns dummy recipes
    return fileterRecipes
  },

  async getCategories() {
    // return dummy categegories
    return DISCOVER_CATEGORIES
  },

  async getCuisines() {
    // return dummy cusines
    return DISCOVER_CUISINES
  },

  async getDiets() {
    // returns dummy diets
    return DISCOVER_DIETS
  },

  async getByCategory(name) {
    // returns dummy recipes
    return fileterRecipes
  },
  async getByCuisine(name) {
    // returns dummy recipes
    return fileterRecipes
  },
  async getByDiet(name) {
    // returns dummy recipes
    return fileterRecipes
  },
}
