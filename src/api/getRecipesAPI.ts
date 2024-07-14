// import { LoaderFunctionArgs } from 'react-router-dom';
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

// function getURL() {
//   return new URL('https://dummyjson.com/recipes/');
// }

// function getUrlWithParams({ params }: LoaderFunctionArgs) {
//   const url = getURL();
//   url.pathname += params.id;
//   return url;
// }

// function getUrlWithSearchParams({ request }: LoaderFunctionArgs) {
//   const url = getURL();
//   const searchParams = getSearchParams(request);
//   url.search = searchParams.toString();
//   return url;
// }

// function getMaxPage(total: number, limit: number) {
//   return Math.ceil(total / limit);
// }

// export async function fetchgetAllRecipes(fnArgs: LoaderFunctionArgs) {
//   const url = getUrlWithSearchParams(fnArgs);
//   const response = await fetch(url);
//   const { results, limit, total }: IRecipeResult = await response.json();
//   const maxPage = getMaxPage(total, limit);
//   return { results, maxPage };
// }
// export async function getDetailRecipe(fnArgs: LoaderFunctionArgs) {
//   const url = getUrlWithParams(fnArgs);
//   const response = await fetch(url);
//   const recipe: IRecipe = await response.json();
//   return recipe;
// }
