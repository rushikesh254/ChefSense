import partialRecipes from '@/Dummydata/PartialRecipes'

const savedrecipesService = {
  async loadsavedrecipes() {
    return partialRecipes
  },
}

export default savedrecipesService
