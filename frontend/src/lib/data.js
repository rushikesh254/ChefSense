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

export const popularRecipes = [
  {
    id: 1,
    title: "Creamy Tuscan Garlic Chicken",
    image:
      "https://plus.unsplash.com/premium_photo-1712678280695-7525b7bf50d0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.9,
    time: "30 min",
    match: 97,
    servings: 3,
    tags: ["High Protein", "Comfort Food"],
    reviews: 128,
  },
  {
    id: 2,
    title: "Spicy Korean Gochujang Noodles",
    image:
      "https://plus.unsplash.com/premium_photo-1712678280695-7525b7bf50d0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.8,
    time: "20 min",
    match: 95,
    servings: 2,
    tags: ["Spicy", "Trending"],
    reviews: 96,
  },
  {
    id: 3,
    title: "Mediterranean Chickpea Bowl",
    image:
      "https://plus.unsplash.com/premium_photo-1712678280695-7525b7bf50d0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.9,
    time: "18 min",
    match: 96,
    servings: 2,
    tags: ["Vegetarian", "Lunch"],
    reviews: 89,
  },
  {
    id: 4,
    title: "Butternut Squash Risotto",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&auto=format&fit=crop&q=60",
    rating: 4.8,
    time: "45 min",
    match: 94,
    servings: 4,
    tags: ["Comfort Food", "Dinner"],
    reviews: 112,
  },
  {
    id: 5,
    title: "Pan-Seared Scallops",
    image: "https://images.unsplash.com/photo-1548590425-46fd2d8d875a?w=600&auto=format&fit=crop&q=60",
    rating: 4.9,
    time: "20 min",
    match: 98,
    servings: 2,
    tags: ["Seafood", "Fancy"],
    reviews: 76,
  },
  {
    id: 6,
    title: "Herb-Crusted Lamb Chops",
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6f54262?w=600&auto=format&fit=crop&q=60",
    rating: 4.7,
    time: "35 min",
    match: 92,
    servings: 3,
    tags: ["High Protein", "Dinner"],
    reviews: 54,
  },
  {
    id: 7,
    title: "Classic Caprese Salad",
    image: "https://images.unsplash.com/photo-1529312266912-b33cf6227e2f?w=600&auto=format&fit=crop&q=60",
    rating: 4.6,
    time: "10 min",
    match: 95,
    servings: 2,
    tags: ["Vegetarian", "Healthy"],
    reviews: 143,
  },
  {
    id: 8,
    title: "Mushroom Stroganoff",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=60",
    rating: 4.8,
    time: "30 min",
    match: 91,
    servings: 4,
    tags: ["Comfort Food", "Vegetarian"],
    reviews: 98,
  },
  {
    id: 9,
    title: "BBQ Pulled Chicken Sliders",
    image:
      "https://plus.unsplash.com/premium_photo-1712678280695-7525b7bf50d0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.6,
    time: "35 min",
    match: 90,
    servings: 4,
    tags: ["Party Favorite", "Quick Prep"],
    reviews: 61,
  },
  {
    id: 10,
    title: "Pesto Burrata Flatbread",
    image:
      "https://plus.unsplash.com/premium_photo-1712678280695-7525b7bf50d0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.9,
    time: "18 min",
    match: 96,
    servings: 3,
    tags: ["Italian", "Trending"],
    reviews: 113,
  },
];
