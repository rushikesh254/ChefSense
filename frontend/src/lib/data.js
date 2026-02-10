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
    title: "Creamy Tuscan Garlic Chicken",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1470&auto=format&fit=crop",
    rating: 4.9,
    time: "30 min",
    match: 97,
    servings: 3,
    tags: ["High Protein", "Comfort Food"],
  },
  {
    id: 2,
    title: "Spicy Korean Gochujang Noodles",
    image:
      "https://images.unsplash.com/photo-1589308078055-8327f8d94a0f?q=80&w=1470&auto=format&fit=crop",
    rating: 4.8,
    time: "20 min",
    match: 95,
    servings: 2,
    tags: ["Spicy", "Trending"],
  },
  {
    id: 3,
    title: "Mediterranean Chickpea Bowl",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1470&auto=format&fit=crop",
    rating: 4.7,
    time: "25 min",
    match: 93,
    servings: 2,
    tags: ["Vegetarian", "Healthy"],
  },
  {
    id: 4,
    title: "BBQ Pulled Chicken Sliders",
    image:
      "https://images.unsplash.com/photo-1606756790138-261d2b21cd7d?q=80&w=1470&auto=format&fit=crop",
    rating: 4.6,
    time: "35 min",
    match: 90,
    servings: 4,
    tags: ["Party Favorite", "Quick Prep"],
  },
  {
    id: 5,
    title: "Pesto Burrata Flatbread",
    image:
      "https://images.unsplash.com/photo-1594007654729-407eedc4fe0f?q=80&w=1470&auto=format&fit=crop",
    rating: 4.9,
    time: "18 min",
    match: 96,
    servings: 3,
    tags: ["Italian", "Trending"],
  },
  {
    id: 6,
    title: "Thai Coconut Curry Shrimp",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1470&auto=format&fit=crop",
    rating: 4.8,
    time: "22 min",
    match: 94,
    servings: 2,
    tags: ["Seafood", "Spicy"],
  },
  {
    id: 7,
    title: "Avocado Toast with Poached Egg",
    image:
      "https://images.unsplash.com/photo-1603046891744-0a38d7b4c8d5?q=80&w=1470&auto=format&fit=crop",
    rating: 4.5,
    time: "10 min",
    match: 88,
    servings: 1,
    tags: ["Breakfast", "Quick"],
  },
  {
    id: 8,
    title: "Chocolate Lava Mug Cake",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1470&auto=format&fit=crop",
    rating: 4.9,
    time: "8 min",
    match: 99,
    servings: 1,
    tags: ["Dessert", "Sweet"],
  },
];
