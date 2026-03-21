const dummyrecipe = {
  id: '1',
  title: 'Royal Shahi Paneer',
  description:
    'A luxurious North Indian curry featuring soft paneer cubes simmered in a silky, mildly sweet gravy of cashews, tomatoes, and aromatic spices.',
  ingredients: [
    {
      item: 'Paneer (Cottage cheese)',
      amount: '250g, cubed',
      category: 'dairy',
    },
    {
      item: 'Cashew nuts',
      amount: '15-20, soaked',
      category: 'nut',
    },
    {
      item: 'Red onions',
      amount: '2 medium, roughly chopped',
      category: 'vegetable',
    },
    {
      item: 'Tomatoes',
      amount: '3 medium, pureed',
      category: 'vegetable',
    },
    {
      item: 'Ginger-Garlic paste',
      amount: '1 tbsp',
      category: 'spice',
    },
    {
      item: 'Heavy cream',
      amount: '3 tbsp',
      category: 'dairy',
    },
    {
      item: 'Kasoori Methi (Dried fenugreek)',
      amount: '1 tsp, crushed',
      category: 'herb',
    },
    {
      item: 'Shahi Garam Masala',
      amount: '1/2 tsp',
      category: 'spice',
    },
  ],
  instructions: [
    {
      step: 1,
      title: 'Prepare the Base',
      instruction:
        'Sauté onions, ginger, and garlic until translucent. Blend them with soaked cashews and tomato puree into a completely smooth paste.',
      tip: 'Strain the puree through a fine sieve for that signature "velvety" restaurant texture.',
    },
    {
      step: 2,
      title: 'Simmer the Gravy',
      instruction:
        'Heat butter in a pan, add the puree and spices. Cook on low heat until the oil begins to separate from the sides.',
      tip: 'Add a pinch of sugar or honey if the tomatoes are too acidic; Shahi Paneer should have a slight sweetness.',
    },
    {
      step: 3,
      title: 'Finish with Cream',
      instruction:
        'Gently fold in the paneer cubes and heavy cream. Simmer for 3-4 minutes. Sprinkle with crushed kasoori methi before serving.',
      tip: 'Do not overcook the paneer, or it will become rubbery.',
    },
  ],
  cuisine: 'Indian',
  category: 'Main Course',
  diet: 'Vegetarian',
  difficulty: 'medium',
  prepTime: 15,
  cookTime: 25,
  servings: 3,
  rating: 4.9,
  imageUrl: `
https://images.unsplash.com/photo-1631452180539-96aca7d48617?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
  tags: ['paneer', 'curry', 'indian', 'royal', 'vegetarian'],
  isVeg: true,
  contentStatus: 'complete',
  viewCount: 285,
  nutrition: {
    calories: 380,
    protein: 14,
    carbs: 18,
    fat: 28,
  },
  tips: [
    'For extra soft paneer, soak the cubes in warm water for 10 minutes before adding to the gravy.',
    'Use saffron-infused milk instead of plain water for a deeper yellow color and richer aroma.',
  ],
  substitutions: [
    {
      original: 'Paneer',
      alternatives: ['Tofu (for a vegan-ish base)', 'Halloumi'],
    },
    {
      original: 'Cashew nuts',
      alternatives: ['Blanched almonds', 'Melon seeds (Magaj)'],
    },
  ],
}

export default dummyrecipe
