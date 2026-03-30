// site content for landing page its is static data

import { BookOpen, Brain, Camera, ChefHat, Heart, Search } from "lucide-react";

//  testinomials amd avatars

export const TESTIMONIALS = [
  {
    name: "Priya S.",
    avatar: "https://i.pravatar.cc/150?u=priya@example.com",
    text: "I had random veggies and it gave me a restaurant-level curry. Insane.",
    fallback: "C1",
  },
  {
    name: "James T.",
    avatar: "https://i.pravatar.cc/150?u=james@example.com",
    text: "Stopped throwing out food. This app paid for itself in a week.",
    fallback: "C2",
  },
  {
    name: "Meera K.",
    avatar: "https://i.pravatar.cc/150?u=meera@example.com",
    text: "The recipe steps are super clear. Even my kids follow them.",
    fallback: "C3",
  },
];

// site stats

export const SITE_STATS = [
  { label: "AI Scans", val: "unlimited" },
  { label: "Recipes Generated", val: "1M+" },
  { label: "Cost to Start", val: "$0" },
  { label: "App Store Rating", val: "4.9" },
];

// features

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

// how it works steps

export const STEPS = [
  {
    title: "1. Snap your pantry",
    icon: Camera,
    color: "bg-green-100 text-brand-600 ",
    description:
      "Take a photo of the ingredients in your fridge or pantry. Our AI will identify everything automatically.",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e",
    alt: "Ingredients",
  },
  {
    title: "2. AI Analysis",
    icon: Brain,
    color: "bg-blue-100 text-blue-600 ",
    description:
      "Google Gemini AI analyzes your ingredients and matches them with thousands of recipes in our database.",
    img: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf",
    alt: "AI Analysis",
  },
  {
    title: "3. Get Recipes",

    icon: ChefHat,
    color: "bg-amber-100 text-amber-600 ",
    description:
      "Receive personalized recipe suggestions ranked by how well they match your available ingredients.",
    img: "https://images.unsplash.com/photo-1657143377606-ad2f0b790fc6?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    alt: "recipes",
  },
  {
    title: "4. Cook & Enjoy",

    icon: Heart,
    color: "bg-pink-100 text-pink-600 ",
    description:
      "Follow step-by-step instructions, save your favorites, and enjoy delicious homemade meals!",
    img: "https://images.unsplash.com/photo-1710091691780-c7eb0dc50cf8",
    alt: "Cook Food",
  },
];

// faqs

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
