# ChefSense

An AI-powered recipe management platform that helps you turn leftover ingredients into delicious meals. Snap a photo of your fridge, and ChefSense's AI will suggest recipes using what you already have — reducing food waste and saving money.

## Live Demo

🔗 [ChefSense Live](https://chef-sense-peach.vercel.app)

## Problem Statement

Millions of people struggle with the daily "what should I cook?" dilemma. Kitchen pantries are full of ingredients that go to waste because people don't know how to combine them. ChefSense solves this by using AI to analyze your pantry and generate personalized recipes in seconds.

## Features

- **AI Recipe Generation** — Generate complete recipes with ingredients, instructions, nutrition info, and substitutions using Google Gemini AI
- **Smart Pantry Management** — Track ingredients with expiry dates, get freshness status (Fresh / Expiring Soon / Expired)
- **AI Recipe Suggestions** — Get recipe recommendations based on what's currently in your pantry
- **Recipe Discovery** — Browse recipes by category, cuisine, and diet (Trending, Quick Meals, etc.)
- **Recipe Search** — Search recipes by title with real-time results
- **Save & Rate Recipes** — Save favorite recipes and rate them with a 5-star system
- **Pantry Image Scan** — Upload a photo of your ingredients and AI will detect and add them to your pantry
- **PDF Export** — Download any recipe as a formatted PDF
- **Google OAuth** — Sign in with your Google account
- **User Profiles** — Track cooking stats, manage password, update profile

## Tech Stack

### Frontend

- React 19 + Vite 7
- Tailwind CSS v4 + shadcn/ui (Radix UI primitives)
- React Router v7
- Axios (HTTP client)
- Sonner (toast notifications)
- Lucide React (icons)
- React PDF Renderer (PDF export)

### Backend

- Node.js + Express 5
- MongoDB + Mongoose 9
- Google Gemini AI (recipe generation + image scanning)
- Unsplash API (recipe images)
- JWT (authentication via httpOnly cookies)
- Zod (request validation)
- Multer (file uploads)
- bcrypt (password hashing)
- Helmet (security headers)
- Express Rate Limit (abuse prevention)

## Project Structure

```
chefsense/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API route definitions
│   │   ├── middleware/      # Auth, error handling, uploads
│   │   ├── services/       # AI & image services
│   │   ├── validation/     # Zod schemas
│   │   ├── utils/          # Helper functions
│   │   ├── constants/      # Static data
│   │   └── db/             # Database connection
│   ├── scripts/            # Seed/unseed scripts
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level page components
│   │   ├── services/       # API call functions
│   │   ├── context/        # React context (auth)
│   │   ├── hooks/          # Custom hooks
│   │   └── lib/            # Utilities, constants, helpers
│   └── public/             # Static assets
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- Google Gemini API key
- Unsplash API key
- Google OAuth credentials (optional)

### Backend Setup

```bash
cd backend
cp .env.example .env   # fill in your values
npm install
npm run seed            # optional: seed sample data
npm run dev             # starts on http://localhost:1337
```

### Frontend Setup

```bash
cd frontend
cp .env.example .env    # set VITE_API_URL=http://localhost:1337/api
npm install
npm run dev             # starts on http://localhost:5173
```

## API Overview

| Method | Endpoint                       | Description                    |
| ------ | ------------------------------ | ------------------------------ |
| POST   | `/api/auth/signup`             | Register a new user            |
| POST   | `/api/auth/login`              | Login with email & password    |
| POST   | `/api/auth/logout`             | Logout (clear cookie)          |
| GET    | `/api/auth/me`                 | Get current user               |
| GET    | `/api/auth/google`             | Google OAuth redirect          |
| GET    | `/api/recipes`                 | Get all recipes (with search)  |
| POST   | `/api/recipes`                 | Create a recipe                |
| GET    | `/api/recipes/:id`             | Get recipe by ID               |
| DELETE | `/api/recipes/:id`             | Delete a recipe                |
| POST   | `/api/recipes/generate`        | AI generate a recipe           |
| PUT    | `/api/recipes/:id/rate`        | Rate a recipe                  |
| POST   | `/api/recipes/suggest`         | AI suggest recipes from pantry |
| GET    | `/api/pantry`                  | Get pantry items               |
| POST   | `/api/pantry`                  | Add pantry item                |
| PUT    | `/api/pantry/:id`              | Update pantry item             |
| DELETE | `/api/pantry/:id`              | Delete pantry item             |
| POST   | `/api/pantry/bulk`             | Bulk add pantry items          |
| POST   | `/api/pantry/scan`             | AI scan image for ingredients  |
| GET    | `/api/saved-recipes`           | Get saved recipes              |
| POST   | `/api/saved-recipes/:id`       | Save a recipe                  |
| DELETE | `/api/saved-recipes/:id`       | Unsave a recipe                |
| GET    | `/api/discover/featured`       | Recipe of the day              |
| GET    | `/api/discover/trending`       | Trending recipes               |
| GET    | `/api/discover/quick-meals`    | Quick meal recipes             |
| GET    | `/api/discover/category/:name` | Recipes by category            |
| GET    | `/api/discover/cuisine/:name`  | Recipes by cuisine             |
| GET    | `/api/discover/diet/:name`     | Recipes by diet                |
| PUT    | `/api/user/profile`            | Update profile                 |
| PUT    | `/api/user/password`           | Change password                |
| GET    | `/api/user/usage`              | Get usage stats                |
| POST   | `/api/contact`                 | Submit contact form            |

## Key Decisions

- **JWT in httpOnly cookies** — prevents XSS attacks on tokens
- **Zod validation** — type-safe request validation on all input
- **Rate limiting** — global (200 req/15min) and auth-specific (10 req/15min)
- **AI content caching** — recipes are saved to DB after first generation, avoiding repeated AI calls
- **Expiry tracking** — pantry items automatically track freshness status

## Author

**Rushikesh** — [GitHub](https://github.com/rushikesh254)
