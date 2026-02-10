import { Camera, BookOpen, ChefHat, Search } from "lucide-react";

export const SITE_STATS = [
  { label: "Free Scans", val: "10/mo" },
  { label: "Recipes Generated", val: "1M+" },
  { label: "Cost to Start", val: "$0" },
  { label: "App Store Rating", val: "4.9" },
];

export const FEATURES = [
  {
    title: "Scan Your Pantry",
    description:
      "Photo recognition that actually works. Know what you have instantly.",
    icon: Camera,
    limit: "10 scans/mo free",
  },
  {
    title: "AI Chef Suggestions",
    description:
      "Turn random ingredients into a gourmet meal. Zero food waste.",
    icon: ChefHat,
    limit: "5 meals/mo free",
  },
  {
    title: "Search Any Dish",
    description:
      "Find any recipe instantly. Filter by cuisine, time, or dietary needs.",
    icon: Search,
    limit: "Unlimited searches",
  },
  {
    title: "Digital Cookbook",
    description: "Save your favorites. Export as PDF. Share with family.",
    icon: BookOpen,
    limit: "3 saves/mo free",
  },
];

// lib/data.js
export const popularRecipes = [
  {
    id: 1,
    title: "Miso Carbonara with Udon",
    image:
      "https://plus.unsplash.com/premium_photo-1664360228159-437020f924c8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.9,
    time: "20 min",
    match: 98, // The AI Score
    servings: 2,
    tags: ["Trending", "Umami"],
  },
  {
    id: 2,
    title: "Crispy Smash Tacos",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    time: "15 min",
    match: 96,
    servings: 4,
    tags: ["Quick Prep", "Spicy"],
  },
  {
    id: 3,
    title: "Hot Honey Halloumi Bowl",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    time: "25 min",
    match: 92,
    servings: 2,
    tags: ["Vegetarian", "High Protein"],
  },
  {
    id: 4,
    title: "One-Pot Lemon Orzo",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    time: "35 min",
    match: 89,
    servings: 4,
    tags: ["Family Favorite"],
  },
  {
    id: 4,
    title: "One-Pot Lemon Orzo",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    time: "35 min",
    match: 89,
    servings: 4,
    tags: ["Family Favorite"],
  },
  {
    id: 4,
    title: "One-Pot Lemon Orzo",
    image:
      "https://images.unsplash.com/photo-1594998893017-36147942756a?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    time: "35 min",
    match: 89,
    servings: 4,
    tags: ["Family Favorite"],
  },
  {
    id: 4,
    title: "One-Pot Lemon Orzo",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    time: "35 min",
    match: 89,
    servings: 4,
    tags: ["Family Favorite"],
  },
];
