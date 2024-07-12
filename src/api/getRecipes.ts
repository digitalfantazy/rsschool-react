const URL = 'https://dummyjson.com/recipes/';

export const getAllRecipes = async (query: string, skip: number, limit: number) => {
  try {
    const response = await fetch(`${URL}search?q=${query}&skip=${skip}&limit=${limit}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};

export const getRecipesDetails = async (id: string | undefined) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await response.json();
  return data;
};
