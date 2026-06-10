import api from "@/lib/api";

function normalizeRecipe(r) {
  return { ...r, id: r._id, rating: r.averageRating ?? r.rating };
}

export async function getById(id) {
  const { data } = await api.get(`/recipes/${id}`);
  return { recipe: normalizeRecipe(data.recipe) };
}

export async function generateRecipe(recipeName) {
  const { data } = await api.post("/recipes/generate", {
    recipeName,
  });
  return data;
}

export async function rateRecipe(id, rating) {
  const { data } = await api.put(`/recipes/${id}/rate`, { rating });
  return data;
}

export async function getPantryRecipes() {
  const { data } = await api.post("/recipes/suggest");
  return {
    recipes: (data.recipes || []).map(normalizeRecipe),
    ...data,
  };
}
