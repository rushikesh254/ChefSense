# API Endpoints

This file documents all the API endpoints for the ChefSense application.

## Authentication

Base URL: `/api/auth`

| Method | Endpoint  | Description                          | Authentication | Request Body                          | Response                                   |
| :----- | :-------- | :----------------------------------- | :------------- | :------------------------------------ | :----------------------------------------- |
| `POST` | `/signup` | Register a new user.                 | No             | `{ "username", "email", "password" }` | `{ "user": { ... }, "token": "..." }`      |
| `POST` | `/login`  | Log in an existing user.             | No             | `{ "email", "password" }`             | `{ "user": { ... }, "token": "..." }`      |
| `POST` | `/logout` | Log out the current user.            | Yes            | -                                     | `{ "message": "Logged out successfully" }` |
| `GET`  | `/me`     | Get the profile of the current user. | Yes            | -                                     | `{ "user": { ... } }`                      |

## Health Check

Base URL: `/api`

| Method | Endpoint       | Description                     | Authentication |
| :----- | :------------- | :------------------------------ | :------------- |
| `GET`  | `/healthcheck` | Check the health of the server. | No             |

## Pantry

Base URL: `/api/pantry`

| Method   | Endpoint | Description                               | Authentication | Request Body                                        | Response                                 |
| :------- | :------- | :---------------------------------------- | :------------- | :-------------------------------------------------- | :--------------------------------------- |
| `GET`    | `/`      | Get all pantry items for the user.        | Yes            | -                                                   | `[ { "item": { ... } }, ... ]`           |
| `POST`   | `/`      | Add a new item to the pantry.             | Yes            | `{ "name", "quantity", "category", "expiryDate" }`  | `{ "item": { ... } }`                    |
| `PUT`    | `/:id`   | Update an existing pantry item.           | Yes            | `{ "name", "quantity", "category", "expiryDate" }`  | `{ "item": { ... } }`                    |
| `DELETE` | `/:id`   | Delete a pantry item.                     | Yes            | -                                                   | `{ "message": "Item deleted" }`          |
| `POST`   | `/bulk`  | Add multiple items to the pantry at once. | Yes            | `{ "items": [ { "name", "quantity", ... }, ... ] }` | `{ "items": [ { ... }, ... ] }`          |
| `POST`   | `/scan`  | Scan an image to detect pantry items.     | Yes            | `multipart/form-data` with an `image` field         | `{ "items": [ ... ], "scanCount": ... }` |

## Recipes

Base URL: `/api/recipes`

| Method   | Endpoint    | Description                    | Authentication | Request Body                     | Response                          |
| :------- | :---------- | :----------------------------- | :------------- | :------------------------------- | :-------------------------------- |
| `GET`    | `/`         | Get all recipes.               | Yes            | -                                | `[ { "recipe": { ... } }, ... ]`  |
| `POST`   | `/`         | Create a new recipe.           | Yes            | `{ "name", "ingredients", ... }` | `{ "recipe": { ... } }`           |
| `GET`    | `/:id`      | Get a single recipe by its ID. | Yes            | -                                | `{ "recipe": { ... } }`           |
| `DELETE` | `/:id`      | Delete a recipe.               | Yes            | -                                | `{ "message": "Recipe deleted" }` |
| `POST`   | `/generate` | Generate a recipe using AI.    | Yes            | `{ "name": "..." }`              | `{ "recipe": { ... } }`           |

## Saved Recipes

Base URL: `/api/saved-recipes`

| Method   | Endpoint     | Description                         | Authentication |
| :------- | :----------- | :---------------------------------- | :------------- |
| `GET`    | `/`          | Get all saved recipes for the user. | Yes            |
| `POST`   | `/:recipeId` | Save a recipe for the user.         | Yes            |
| `DELETE` | `/:recipeId` | Unsave a recipe for the user.       | Yes            |
