# API Endpoints

This file documents all the API endpoints for the ChefSense application.

Base URL: `http://localhost:1337`

Authentication is done via an **httpOnly cookie** named `token` (JWT, 7-day expiry).  
Endpoints marked with **Auth** require a valid token cookie.

---

## Root

| Method | Endpoint | Description                  | Auth |
| :----- | :------- | :--------------------------- | :--- |
| `GET`  | `/`      | Root health check.           | No   |

**Response:** `{ "message": "ChefSense API is running" }`

---

## Health Check

Base URL: `/api/health`

| Method | Endpoint | Description                     | Auth |
| :----- | :------- | :------------------------------ | :--- |
| `GET`  | `/`      | Check if the server is healthy. | No   |

**Response:** `{ "message": "Server is healthy" }`

---

## Authentication

Base URL: `/api/auth`

| Method | Endpoint            | Description                          | Auth | Request Body                                     | Response                                                  |
| :----- | :------------------ | :----------------------------------- | :--- | :----------------------------------------------- | :-------------------------------------------------------- |
| `POST` | `/signup`           | Register a new user.                 | No   | `{ "email", "password", "firstName"?, "lastName"? }` | `{ "message", "user": { "email", "firstName", "lastName" } }` |
| `POST` | `/login`            | Log in an existing user.             | No   | `{ "email", "password" }`                        | `{ "message", "user": { "email", "firstName", "lastName" } }` |
| `POST` | `/logout`           | Log out the current user.            | No   | -                                                | `{ "message": "User logged out successfully" }`           |
| `GET`  | `/me`               | Get the profile of the current user. | Yes  | -                                                | `{ "user": { ... } }`                                     |
| `GET`  | `/google`           | Redirect to Google OAuth consent.    | No   | -                                                | Redirects to `accounts.google.com`                         |
| `GET`  | `/google/callback`  | Google OAuth callback handler.       | No   | Query: `?code=...`                               | Redirects to frontend `/dashboard` or `/sign-in?error=`    |

> **Note:** Signup and login set the `token` cookie automatically. Logout clears it.
> **Note:** Auth endpoints return errors with `{ "error": "..." }` key (not `{ "message": "..." }`).

---

## Recipes

Base URL: `/api/recipes`

All endpoints require authentication.

| Method   | Endpoint        | Description                              | Request Body                               | Response                                    |
| :------- | :-------------- | :--------------------------------------- | :----------------------------------------- | :------------------------------------------ |
| `GET`    | `/`             | Get all recipes (public + own).          | Query: `?q=searchTerm`                     | `{ "recipes": [...] }`                     |
| `POST`   | `/`             | Create a new recipe.                     | `{ "title", "description"?, "ingredients"?, "instructions"?, "cuisine"?, "category"?, "diet"?, "difficulty"?, "tags"?, "prepTime"?, "cookTime"?, "servings"?, "imageUrl"?, "isVeg"?, "isPublic"? }` | `{ "recipe": { ... } }`                   |
| `GET`    | `/:id`          | Get a single recipe by its ID.           | -                                          | `{ "recipe": { ... } }`                    |
| `DELETE` | `/:id`          | Delete a recipe (own only).              | -                                          | `{ "message": "Recipe deleted successfully" }` |
| `PUT`    | `/:id/rate`     | Rate a recipe (1-5).                     | `{ "rating": 1-5 }`                        | `{ "message": "Recipe rated successfully" }` |
| `POST`   | `/generate`     | Generate a recipe via AI (Gemini).       | `{ "recipeName", "forceRegenerate"? }`     | See notes below                            |
| `POST`   | `/suggest`      | Suggest recipes based on pantry items.   | -                                          | `{ "recipes": [...] }`                     |

> **Notes:**
> - `GET /` supports optional `?q=` query parameter for case-insensitive title search.
> - `POST /` create also accepts body wrapped in a `data` key: `{ "data": { "title": "...", ... } }`.
> - `POST /generate` behavior:
>   - If a recipe with the given `title` already exists and has `contentStatus: "complete"`, returns `400` with `{ "existing": { ... } }`.
>   - If it exists but has `contentStatus: "partial"`, regenerates it via AI and returns the updated recipe.
>   - If no recipe with that title exists, creates a new one and returns `201` with `{ "recipe": { ... } }`.
>   - Increments user's `recipeGenerationCount` (limit: 100).
>   - Optional `forceRegenerate` boolean forces re-generation even if a complete recipe exists.
> - `POST /generate` response when new/regenerated: `{ "recipe": { ... } }`.
> - `POST /suggest` returns array of recipe objects with fields: `title`, `description`, `matchPercentage`, `missingIngredients[]`, `category`, `cuisine`, `prepTime`, `cookTime`, `servings`, `isVeg`, `usedIngredients[]`, `imageUrl`. Increments user's `suggestionCount` (limit: 100). Uses the authenticated user's pantry items.

---

## Pantry

Base URL: `/api/pantry`

All endpoints require authentication.

| Method   | Endpoint   | Description                                | Request Body                                                | Response                              |
| :------- | :--------- | :----------------------------------------- | :---------------------------------------------------------- | :------------------------------------ |
| `GET`    | `/`        | Get all pantry items for the user.         | -                                                           | `[ { ... }, ... ]`                    |
| `POST`   | `/`        | Add a new pantry item.                     | `{ "name", "quantity"?, "category"?, "expiryDate"? }`       | `{ ... }` (created item)              |
| `PUT`    | `/:id`     | Update an existing pantry item.            | `{ "name"?, "quantity"?, "category"?, "expiryDate"? }`      | `{ ... }` (updated item)              |
| `DELETE` | `/:id`     | Delete a pantry item.                      | -                                                           | `{ "message": "Pantry item deleted successfully" }` |
| `POST`   | `/bulk`    | Add multiple pantry items at once.         | `{ "items": [ { "name", "quantity"?, "category"?, "expiryDate"? }, ... ] }` | `[ { ... }, ... ]` (created items)    |
| `POST`   | `/scan`    | Scan an image to detect ingredients (AI).  | `multipart/form-data` with field `image` (JPEG/PNG/WEBP, max 5MB) | `{ "items": [...], "scanCount": N }`  |

> **Notes:**
> - `POST /scan` increments user's `scanCount` (limit: 100). Returns detected items with `name`, `quantity`, `confidence` fields.
> - `PUT /:id` and `DELETE /:id` are scoped to the authenticated user's items only.
> - `POST /` and `POST /bulk` automatically fetch an image from Unsplash for each item.
> - `PUT /:id` re-fetches Unsplash image if the `name` field changes.
> - `POST /scan` returns errors with `{ "error": "..." }` key.

---

## Discover

Base URL: `/api/discover`

All endpoints require authentication.

| Method | Endpoint                | Description                                       | Query Parameters       | Response                                    |
| :----- | :---------------------- | :------------------------------------------------ | :--------------------- | :------------------------------------------ |
| `GET`  | `/featured`             | Get a random featured recipe of the day.          | -                      | `{ "recipe": { ... } }`                    |
| `GET`  | `/trending`             | Get trending recipes sorted by views & rating.    | `?page=1`              | `{ "recipes": [...], "hasMore": bool }`    |
| `GET`  | `/quick-meals`          | Get quick meals (cookTime < 20 min).              | `?page=1`              | `{ "recipes": [...], "hasMore": bool }`    |
| `GET`  | `/categories`           | List all category filter options.                 | -                      | `{ "categories": [...] }`                  |
| `GET`  | `/cuisines`             | List all cuisine filter options.                  | -                      | `{ "cuisines": [...] }`                    |
| `GET`  | `/diets`                | List all diet filter options.                     | -                      | `{ "diets": [...] }`                       |
| `GET`  | `/category/:category`   | Filter recipes by category.                       | `?page=1`              | `{ "recipes": [...], "hasMore": bool }`    |
| `GET`  | `/cuisine/:cuisine`     | Filter recipes by cuisine.                        | `?page=1`              | `{ "recipes": [...], "hasMore": bool }`    |
| `GET`  | `/diet/:diet`           | Filter recipes by diet.                           | `?page=1`              | `{ "recipes": [...], "hasMore": bool }`    |

> **Notes:**
> - Paginated endpoints (`/trending`, `/quick-meals`, `/category/:category`, `/cuisine/:cuisine`, `/diet/:diet`) return 12 items per page. `hasMore` is `true` if there are more results available.
> - `/featured` selects a random recipe from all public complete recipes each time it's called.
> - Category, cuisine, and diet filters use case-insensitive matching.

---

## Saved Recipes

Base URL: `/api/saved-recipes`

All endpoints require authentication.

| Method   | Endpoint       | Description                         | Request Body | Response                                    |
| :------- | :------------- | :---------------------------------- | :----------- | :------------------------------------------ |
| `GET`    | `/`            | Get all saved recipes for the user. | -            | `{ "savedRecipes": [...] }`                 |
| `POST`   | `/:recipeId`   | Save a recipe for the user.         | -            | `{ "message": "Recipe saved successfully" }` |
| `DELETE` | `/:recipeId`   | Unsave a recipe for the user.       | -            | `{ "message": "Recipe unsaved successfully" }` |

---

## User

Base URL: `/api/user`

All endpoints require authentication.

| Method | Endpoint    | Description                      | Request Body                                  | Response                                    |
| :----- | :---------- | :------------------------------- | :-------------------------------------------- | :------------------------------------------ |
| `PUT`  | `/profile`  | Update user profile.             | `{ "firstName"?, "lastName"?, "avtarUrl"? }` | `{ "message", "user": { ... } }`           |
| `GET`  | `/usage`    | Get usage statistics.            | -                                             | `{ "usage": { "scanCount", "recipeGenerationCount", "suggestionCount" } }` |
| `PUT`  | `/password` | Change the user's password.      | `{ "currentPassword", "newPassword" }`        | `{ "message": "Password updated successfully" }` |

> **Note:** To get the current user's full profile, use `GET /api/auth/me` instead.

---

## Contact

Base URL: `/api/contact`

| Method | Endpoint | Description            | Auth | Request Body                              | Response                                    |
| :----- | :------- | :--------------------- | :--- | :---------------------------------------- | :------------------------------------------ |
| `POST` | `/`      | Submit a contact form. | No   | `{ "name", "email", "message" }`          | `{ "message": "Message sent successfully" }` |

---

## Summary Table

| Category        | Method   | Endpoint                          | Auth |
| :-------------- | :------- | :-------------------------------- | :--- |
| Root            | `GET`    | `/`                               | No   |
| Health          | `GET`    | `/api/health`                     | No   |
| **Auth**        | `POST`   | `/api/auth/signup`                | No   |
|                 | `POST`   | `/api/auth/login`                 | No   |
|                 | `POST`   | `/api/auth/logout`                | No   |
|                 | `GET`    | `/api/auth/me`                    | Yes  |
|                 | `GET`    | `/api/auth/google`                | No   |
|                 | `GET`    | `/api/auth/google/callback`       | No   |
| **Recipes**     | `GET`    | `/api/recipes`                    | Yes  |
|                 | `POST`   | `/api/recipes`                    | Yes  |
|                 | `GET`    | `/api/recipes/:id`                | Yes  |
|                 | `DELETE` | `/api/recipes/:id`                | Yes  |
|                 | `PUT`    | `/api/recipes/:id/rate`           | Yes  |
|                 | `POST`   | `/api/recipes/generate`           | Yes  |
|                 | `POST`   | `/api/recipes/suggest`            | Yes  |
| **Pantry**      | `GET`    | `/api/pantry`                     | Yes  |
|                 | `POST`   | `/api/pantry`                     | Yes  |
|                 | `PUT`    | `/api/pantry/:id`                 | Yes  |
|                 | `DELETE` | `/api/pantry/:id`                 | Yes  |
|                 | `POST`   | `/api/pantry/bulk`                | Yes  |
|                 | `POST`   | `/api/pantry/scan`                | Yes  |
| **Discover**    | `GET`    | `/api/discover/featured`          | Yes  |
|                 | `GET`    | `/api/discover/trending`          | Yes  |
|                 | `GET`    | `/api/discover/quick-meals`       | Yes  |
|                 | `GET`    | `/api/discover/categories`        | Yes  |
|                 | `GET`    | `/api/discover/cuisines`          | Yes  |
|                 | `GET`    | `/api/discover/diets`             | Yes  |
|                 | `GET`    | `/api/discover/category/:category`| Yes  |
|                 | `GET`    | `/api/discover/cuisine/:cuisine`  | Yes  |
|                 | `GET`    | `/api/discover/diet/:diet`        | Yes  |
| **Saved Recipes**| `GET`   | `/api/saved-recipes`              | Yes  |
|                 | `POST`   | `/api/saved-recipes/:recipeId`    | Yes  |
|                 | `DELETE` | `/api/saved-recipes/:recipeId`    | Yes  |
| **User**        | `PUT`    | `/api/user/profile`               | Yes  |
|                 | `GET`    | `/api/user/usage`                 | Yes  |
|                 | `PUT`    | `/api/user/password`              | Yes  |
| **Contact**     | `POST`   | `/api/contact`                    | No   |

