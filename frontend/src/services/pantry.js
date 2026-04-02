// todo: add pantry functions  here now i have done it in the pantry page but it will be better to have it here and then import it in the pantry page

// function to get pantry recipes suggestions

import pantryRecipes from '@/data/pantryrecipes'

export async function getPantryRecipes() {
    return pantryRecipes.recipes
}
