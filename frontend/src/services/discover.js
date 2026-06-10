import api from "@/lib/api";

function normalizeRecipe(r) {
  return { ...r, id: r._id, rating: r.averageRating ?? r.ratings };
}

// get recipe of the day
export async function getFeatured() {
  const { data } = await api.get("/discover/featured");
  return { recipe: normalizeRecipe(data.recipe) };
}

// get quick meals (page parameter for pagination)
export async function getQuickMeals(page = 1) {
  const { data } = await api.get(`/discover/quick-meals?page=${page}`);
  return {
    recipes: (data.recipes || []).map(normalizeRecipe),
    hasMore: data.hasMore,
  };
}

// get trending recipes (page parameter for pagination)
export async function getTrending(page = 1) {
  const { data } = await api.get(`/discover/trending?page=${page}`);
  return {
    recipes: (data.recipes || []).map(normalizeRecipe),
    hasMore: data.hasMore,
  };
}

// get recipes categories
export async function getCategories() {
  const { data } = await api.get("/discover/categories");
  return { categories: data.categories || [] };
}

// get recipes cuisines
export async function getCuisines() {
  const { data } = await api.get("/discover/cuisines");
  return { cuisines: data.cuisines || [] };
}

// get diets names
export async function getDiets() {
  const { data } = await api.get("/discover/diets");
  return { diets: data.diets || [] };
}

// get recipes by category name (page parameter for pagination)
export async function getByCategory(name, page = 1) {
  const { data } = await api.get(
    `/discover/category/${encodeURIComponent(name)}?page=${page}`,
  );
  return {
    recipes: (data.recipes || []).map(normalizeRecipe),
    hasMore: data.hasMore,
  };
}

//  get recipes by cuisine name (page parameter for pagination)
export async function getByCuisine(name, page = 1) {
  const { data } = await api.get(
    `/discover/cuisine/${encodeURIComponent(name)}?page=${page}`,
  );
  return {
    recipes: (data.recipes || []).map(normalizeRecipe),
    hasMore: data.hasMore,
  };
}

// get recipes by diet name (page parameter for pagination)
export async function getByDiet(name, page = 1) {
  const { data } = await api.get(
    `/discover/diet/${encodeURIComponent(name)}?page=${page}`,
  );
  return {
    recipes: (data.recipes || []).map(normalizeRecipe),
    hasMore: data.hasMore,
  };
}

