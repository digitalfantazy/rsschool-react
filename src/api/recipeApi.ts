import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRecipeData, IRecipeDetails } from '../types/RecipeTypes';

export interface IgetAllRecipes {
  query: string;
  page: number;
}

export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/recipes' }),
  endpoints: (builder) => ({
    getAllRecipes: builder.query<IRecipeData, IgetAllRecipes>({
      query: ({ query = '', page }) => `/search?q=${query}&limit=${10}&skip=${(page - 1) * 10}`,
    }),
    getRecipesDetails: builder.query<IRecipeDetails, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetAllRecipesQuery, useGetRecipesDetailsQuery } = recipeApi;
