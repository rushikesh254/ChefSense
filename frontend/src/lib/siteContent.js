// site content for landing page its is static data

import { BookOpen, Brain, Camera, ChefHat, Heart, Search } from "lucide-react";

// used in landing page hero section

export const recipe = {
  title: "Paneer Butter Masala",
  description:
    "A rich and creamy North Indian curry made with paneer, tomatoes, and a blend of spices. Perfect for a comforting dinner.",
  cuisine: "indian",
  category: "dinner",
  diet: "vegetarian",
  difficulty: "medium",
  tags: ["Paneer", "Rich", "Curry", "North Indian"],
  imageUrl: "/PaneerButter.png",
  cookTime: 35,
  prepTime: 15,
  servings: 4,
  rating: 4.8,
  isVeg: true,
  matchPercentage: 85,
  missingIngredients: ["heavy cream", "kasuri methi", "tomatoes"],
};

//  testinomials amd avatars used in landing page

export const TESTIMONIALS = [
  {
    name: "Priya S.",
    avatar: "https://i.pravatar.cc/150?u=priya@example.com",
    text: "I had random veggies and it gave me a restaurant-level curry. Insane.",
  },
  {
    name: "James T.",
    avatar: "https://i.pravatar.cc/150?u=james@example.com",
    text: "Stopped throwing out food. This app paid for itself in a week.",
  },
  {
    name: "Meera K.",
    avatar: "https://i.pravatar.cc/150?u=meera@example.com",
    text: "The recipe steps are super clear. Even my kids follow them.",
  },
];

// features
// used in landing page

export const FEATURES = [
  {
    title: "Scan Your Pantry",
    description:
      "Photo recognition that actually works. Know what you have instantly.",
    icon: Camera,
    limit: "AI Vision",
  },
  {
    title: "AI Chef Suggestions",
    description:
      "Turn random ingredients into a gourmet meal. Zero food waste.",
    icon: ChefHat,
    limit: "Smart Matching",
  },
  {
    title: "Search Any Dish",
    description:
      "Find any recipe instantly. Filter by cuisine, time, or dietary needs.",
    icon: Search,
    limit: "Unlimited",
  },
  {
    title: "Digital Cookbook",
    description: "Save your favorites. Export as PDF. Share with family.",
    icon: BookOpen,
    limit: "PDF Export",
  },
];

// used in landing page

export const WITHOUT_CHEFSENSE = [
  "Open fridge. Stare. Close fridge.",
  'Google "recipes with eggs and sad carrots"',
  "Scroll for 20 mins. Nothing fits.",
  "Order pizza. Again.",
  "Throw out ₹800 worth of groceries.",
];

// used in landing page

export const WITH_CHEFSENSE = [
  "Open fridge. Snap photo.",
  "AI instantly identifies ingredients.",
  "Get 5+ recipes you can make right now.",
  "Cook a delicious meal in minutes.",
  "Save ₹800 worth of groceries.",
];

//stats used in landing page

export const STATS = [
  { value: "₹1500", label: "saved per week" },
  { value: "30%", label: "less food wasted" },
  { value: "10k+", label: "happy cooks" },
];

// used in faqs page

export const FAQS = [
  {
    question: "What is ChefSense?",
    answer:
      "ChefSense is an AI-powered recipe platform that helps you cook amazing meals using ingredients you already have. Simply scan your pantry and get personalized recipe suggestions.",
  },
  {
    question: "How does the AI scanning work?",
    answer:
      "Our platform uses Google Gemini AI Vision to analyze photos of your ingredients. Just take a picture of your fridge or pantry, and the AI will identify the items automatically.",
  },
  {
    question: "Is ChefSense free to use?",
    answer:
      "Yes! ChefSense is completely free to use. You can scan your pantry, generate recipes, and save your favorites at no cost.",
  },
  {
    question: "What features does ChefSense offer?",
    answer:
      "ChefSense includes AI pantry scanning, personalized recipe suggestions, dashboard, chef's tips, ingredient substitutions, and PDF recipe downloads.",
  },
];

// used in how it works page

export const STEPS = [
  {
    id: 1,
    title: "1. Snap your pantry",
    icon: Camera,
    description:
      "Take a photo of the ingredients in your fridge or pantry. Our AI will identify everything automatically.",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e",
  },
  {
    id: 2,
    title: "2. AI Analysis",
    icon: Brain,
    description:
      "Google Gemini AI analyzes your ingredients and matches them with thousands of recipes in our database.",
    img: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf",
  },
  {
    id: 3,
    title: "3. Get Recipes",
    icon: ChefHat,
    description:
      "Receive personalized recipe suggestions ranked by how well they match your available ingredients.",
    img: "https://images.unsplash.com/photo-1657143377606-ad2f0b790fc6?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "4. Cook & Enjoy",
    icon: Heart,
    description:
      "Follow step-by-step instructions, save your favorites, and enjoy delicious homemade meals!",
    img: "https://images.unsplash.com/photo-1710091691780-c7eb0dc50cf8",
  },
];
