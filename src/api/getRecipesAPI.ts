import { IRecipeData, IRecipeDetails } from '../types/RecipeTypes';

const URL = 'https://dummyjson.com/recipes';

export const limit = 10;

export const getAllRecipes = async (query: string, page: number): Promise<IRecipeData> => {
  try {
    const response = await fetch(
      `${URL}/search?q=${query}&limit=${limit}&skip=${(page - 1) * limit}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getRecipesDetails = async (id: string): Promise<IRecipeDetails> => {
  try {
    const response = await fetch(`${URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
