import api from "@/lib/api";

function normalizeRecipe(r) {
  return { ...r, id: r._id, rating: r.averageRating ?? r.rating };
}

export async function loadSavedRecipes() {
  const { data } = await api.get("/saved-recipes");
  return { savedRecipes: (data.savedRecipes || []).map(normalizeRecipe) };
}

export async function saveRecipe(recipeId) {
  const { data } = await api.post(`/saved-recipes/${recipeId}`);
  return data;
}

export async function unsaveRecipe(recipeId) {
  const { data } = await api.delete(`/saved-recipes/${recipeId}`);
  return data;
}
