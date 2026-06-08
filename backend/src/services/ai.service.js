import { GoogleGenAI } from "@google/genai";

const callGemini = async (prompt, parts) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Gemini API key is not set in environment variables.");
  }

  const client = new GoogleGenAI({
    apiKey,
  });

  const input = parts ? [prompt, ...parts] : prompt; // if there are parts (like images), send as array, otherwise just send the prompt string

  // Call the Gemini model to generate content based on the provided prompt
  const result = await client.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    contents: input,
  });

  // console.log("Raw Gemini Response:", result); // Log the raw response for debugging

  // get the generated text from the result
  const text = result.text;

  // console.log("Generated Text:", text); // Log the generated text for debugging

  return text;
};

// ai wil give plain json or sometimes a markdown code block with json inside, we need to parse it and return the json object
const parseJson = (raw) => {
  try {
    // gemini wraps json in ```json blocks sometimes -- annoying
    const cleaned = raw
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim(); // remove the markdown code block markers if they exist
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw new Error("Failed to parse JSON from AI response.");
  }
};

const generateRecipe = async (name) => {
  // first version of prompt (need to make more strict later )
  // current one says no markdown still somotimes returns markdown

  const prompt = `Generate a complete recipe for "${name}". Return ONLY a JSON object with these fields:
- title (keep it "${name}")
- description (2-3 sentences)
- ingredients (array of {item, amount, category})
- instructions (array of {step, title, instruction, tip}, 8-10 steps)
- cuisine, category, diet, difficulty
- prepTime, cookTime, servings
- rating (number between 3.5 and 5)
- isVeg (boolean)
- tags (array of strings)
- nutrition ({calories, protein, carbs, fat})
- substitutions (array of {original, alternatives})
No markdown.`;

  const raw = await callGemini(prompt);

  // console.log("Raw AI Response:", raw); // Log the raw response for debugging

  const json = parseJson(raw);

  if (!json || !json.title || !json.ingredients || !json.instructions) {
    throw new Error("Invalid JSON structure in AI response.");
  }

  // console.log("Parsed Recipe JSON:", json); // Log the parsed JSON for debugging

  // sometimes gemini returnns number or the string for numeric fields, we need to sanitize it before saving to db (which expects number)
  const sanitizeNum = (val) => {
    if (typeof val === "number") return val;
    if (typeof val === "string") return parseFloat(val) || 0;
    return 0;
  };

  return {
    title: name,
    description: json.description || "",
    ingredients: json.ingredients || [],
    instructions: json.instructions || [],
    cuisine: json.cuisine || "",
    category: json.category || "",
    diet: json.diet || "",
    difficulty: json.difficulty || "medium",

    rating: sanitizeNum(json.rating) || 4,
    nutrition: json.nutrition
      ? {
          calories: sanitizeNum(json.nutrition.calories),
          protein: sanitizeNum(json.nutrition.protein),
          carbs: sanitizeNum(json.nutrition.carbs),
          fat: sanitizeNum(json.nutrition.fat),
        }
      : {},
    substitutions: Array.isArray(json.substitutions) ? json.substitutions : [],

    prepTime: sanitizeNum(json.prepTime) || 0,
    cookTime: sanitizeNum(json.cookTime) || 0,
    servings: sanitizeNum(json.servings) || 1,
    isVeg: Boolean(json.isVeg),
    tags: json.tags || [],
  };
};

// generate the recipes suggestion based on pantry itmes -- this is used in the suggestion page where user can input their pantry items and get recipe suggestions based on that

const generateSuggestions = async (pantrySummary) => {
  const prompt = `I have these pantry ingredients:
${pantrySummary}

Suggest 8-10 recipes I can make. Return ONLY a JSON array, no other text.
Each item should be:
{
  "title": "string",
  "description": "string",
  "matchPercentage": 80,
  "missingIngredients": ["string"],
  "category": "string",
  "cuisine": "string",
  "prepTime": 10,
  "cookTime": 20,
  "servings": 2,
  "isVeg": false,
  "usedIngredients": ["string"]
}`;

  const text = await callGemini(prompt);
  const json = parseJson(text);

  // gemini sometimes wraps the array

  let arr = null;

  // handles all three formats geminin will send ==> {suggestions: [...]} or {recipes: [...]} or [...] (just the array)
  if (Array.isArray(json)) arr = json;
  else if (Array.isArray(json?.recipes)) arr = json.recipes;
  else if (Array.isArray(json?.suggestions)) arr = json.suggestions;

  if (!arr) throw new Error("suggestions parse failed");

  return arr;
};

// Accepts a raw Buffer from Multer memoryStorage and the file's MIME type.
// Converts to Base64 internally — the frontend never generates Base64.
const scanPantryImage = async (imageBuffer, mimeType) => {
  if (!Buffer.isBuffer(imageBuffer) || imageBuffer.length === 0) {
    throw new Error("Invalid image buffer");
  }

  const base64Data = imageBuffer.toString("base64");

  const prompt =
    "Look at this pantry image and return a JSON array of ingredients you see. each item must be {name, quantity, confidence}. only json, no markdown.";

  const text = await callGemini(prompt, [
    { inlineData: { mimeType, data: base64Data } },
  ]);

  const json = parseJson(text);
  if (!Array.isArray(json)) throw new Error("scan parse failed"); // if the result isn't an array of items, something went wrong

  // filter low confidence + clean names
  const items = [];
  for (let i = 0; i < json.length && items.length < 20; i++) {
    const conf = Number(json[i].confidence || 0);
    if (conf < 0.3) continue;
    const name = String(json[i].name || "")
      .trim()
      .slice(0, 50);
    if (name.length < 2) continue;
    items.push({
      name,
      quantity: String(json[i].quantity || "1").trim(),
      confidence: conf,
    });
  }
  return items;
};

export { generateRecipe, generateSuggestions, scanPantryImage };
