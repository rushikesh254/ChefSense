import { GoogleGenAI } from "@google/genai";

const callGemini = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Gemini API key is not set in environment variables.");
  }

  const client = new GoogleGenAI({
    apiKey,
  });

  // Call the Gemini model to generate content based on the provided prompt
  const result = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
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

  const prompt = `Generate a recipe for "${name}". Return only JSON with: title, description, ingredients (array of {item, amount, category}), instructions (array of {step, title, instruction, tip}), cuisine, category, diet, difficulty, prepTime, cookTime, servings, isVeg, tags. No markdown.`;

  const raw = await callGemini(prompt);

  // console.log("Raw AI Response:", raw); // Log the raw response for debugging

  const json = parseJson(raw);

  if (!json || !json.title || !json.ingredients || !json.instructions) {
    throw new Error("Invalid JSON structure in AI response.");
  }

  // console.log("Parsed Recipe JSON:", json); // Log the parsed JSON for debugging

  return {
    title: name,
    description: json.description || "",
    ingredients: json.ingredients || [],
    instructions: json.instructions || [],
    cuisine: json.cuisine || "",
    category: json.category || "",
    diet: json.diet || "",
    difficulty: json.difficulty || "medium",
    prepTime: Number(json.prepTime) || 0,
    cookTime: Number(json.cookTime) || 0,
    servings: Number(json.servings) || 1,
    isVeg: Boolean(json.isVeg),
    tags: json.tags || [],
  };
};

export { generateRecipe };
