// this file contains ui related functions which returns jsx or tailwind classes

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// tailwind css utility function(MERGES THE CLASSES )
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// set badge style based on difficulty used in recipecard
export function getdifficultyColor(difficulty) {
  if (difficulty === "easy")
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (difficulty === "medium")
    return "bg-amber-50 text-amber-700 border-amber-200";
  if (difficulty === "hard") return "bg-red-100 text-red-700 border-red-200";
  return "bg-stone-50 text-stone-500";
}

// emoji helpers

// category emoji fn used in dashboard
export function getCategoryEmoji(category) {
  const emojis = {
    Breakfast: "🍳",
    Lunch: "🍱",
    Dinner: "🍽️",
    Snacks: "🍿",
    Snack: "🍿",
    Starters: "🥟",
    Soups: "🍜",
    Soup: "🍜",
    Salads: "🥗",
    Salad: "🥗",
    "Main Course": "🍛",
    "Side Dishes": "🍟",
    Desserts: "🍨",
    Dessert: "🍨",
  };

  // defaultt  emoji if no category emoji found
  return emojis[category] || "🍽️";
}

// country flag fn used in dashboard
export function getCountryFlag(country) {
  const flags = {
    American: "fi fi-us fis",
    Chinese: "fi fi-cn fis",
    French: "fi fi-fr fis",
    Indian: "fi fi-in fis",
    Italian: "fi fi-it fis",
    Japanese: "fi fi-jp fis",
    Korean: "fi fi-kr fis",
    Mediterranean: "fi fi-gr fis",
    Mexican: "fi fi-mx fis",
    Thai: "fi fi-th fis",
  };

  // default emoji if no country flag found
  return flags[country] || "fi fi-un fis";
}

// diet emoji fn used in dashboard

export function getDietEmoji(diet) {
  const emojis = {
    Vegetarian: "🥕",
    Vegan: "🌱",
    "Gluten-Free": "🌾",
    "Dairy-Free": "🥛",
    Keto: "🥩",
    Paleo: "🍗",
    "Low-Carb": "🥦",
    "Low-Fat": "🐟",
    "High-Protein": "💪",
    "Sugar-Free": "🍬",
  };
  // defaultt  emoji if no diet emoji  found

  return emojis[diet] || "🍏";
}

// diet colors fn used in dashboard

export const dietColors = {
  Vegetarian: "bg-orange-50  text-orange-700 hover:bg-orange-100",

  Vegan: "bg-green-50  text-green-700 hover:bg-green-100",

  "Gluten-Free": "bg-yellow-50  text-yellow-700 hover:bg-yellow-100",

  "Dairy-Free": "bg-blue-50  text-blue-700 hover:bg-blue-100",

  Keto: "bg-red-50  text-red-700 hover:bg-red-100",

  Paleo: "bg-amber-50  text-amber-700 hover:bg-amber-100",

  "Low-Carb": "bg-emerald-50  text-emerald-700 hover:bg-emerald-100",

  "Low-Fat": "bg-sky-50  text-sky-700 hover:bg-sky-100",

  "High-Protein": "bg-purple-50  text-purple-700 hover:bg-purple-100",

  "Sugar-Free": "bg-pink-50  text-pink-700 hover:bg-pink-100",
};

// status config used in pantry page
export const STATUS_CONFIG = {
  fresh: { label: "Fresh", color: "bg-green-100 text-green-600" },
  "expiring soon": {
    label: "Expiring Soon",
    color: "bg-yellow-100 text-yellow-600",
  },
  expired: { label: "Expired", color: "bg-red-100 text-red-500" },
  "no expiry": { label: "No Expiry", color: "bg-gray-100 text-gray-500" },
};
