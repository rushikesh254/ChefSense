import dummyrecipe from '@/Dummydata/dummyrecipe'

export const recipeservice = {
  async getById(id) {
    return dummyrecipe
  },

  async getByQuery(query) {
    return dummyrecipe
  },
}
