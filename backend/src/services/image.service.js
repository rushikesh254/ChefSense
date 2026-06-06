const FALLBACK =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1600&auto=format&fit=crop";

const searchUnsplash = async (query) => {
  const key = process.env.UNSPLASH_ACCESS_KEY;

  if (!key || !query) {
    return "";
  }

  try {
    // this will convert query into urlsearch params format ( query=apple&per_page=1&orientation=landscape) ;ike this
    const params = new URLSearchParams({
      query: query,
      per_page: 1,
      orientation: "landscape",
    });

    // fetch data from unsplash api with the query and the access key in the header(for authentication)
    const res = await fetch(
      "https://api.unsplash.com/search/photos?" + params.toString(),
      {
        headers: { Authorization: "Client-ID " + key },
      },
    );

    if (!res.ok) {
      return "";
    }

    const data = await res.json();
    return data.results[0]?.urls?.regular || ""; // return empty string if no results or no URL found ( give first result if multiple results , only one result is requested )
  } catch (error) {
    console.error("Error fetching from Unsplash:", error);
    return "";
  }
};

const fetchRecipeImage = async (title) => {
  const url = await searchUnsplash(title);
  return url || FALLBACK;
};

const fetchPantryImage = async (name) => {
  const url = await searchUnsplash(name + " food");
  return url || FALLBACK;
};

export { fetchPantryImage, fetchRecipeImage };
