import { LoaderFunctionArgs, defer } from 'react-router-dom';
import getSearchParams from '../api/getSearchParams';
import { fetchgetAllRecipes } from '../api/getRecipesAPI';
import { IRecipe } from '../types/RecipeTypes';

export interface ResultsLoaderData {
  results: Promise<{
    recipe: IRecipe[];
  }>;
  skip: number;
  limit: number;
}

export async function getAllRecipes(args: LoaderFunctionArgs) {
  const recipes = fetchgetAllRecipes(args);
  const { search, skip, limit } = Object.fromEntries(getSearchParams(args.request));
  return defer({ recipes, search, skip, limit });
}
