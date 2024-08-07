import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Action, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IRecipeData, IRecipeDetails } from '../types/RecipeTypes';
import { RootState } from '../store/store';

export interface IgetAllRecipes {
  query: string | string[];
  page: number;
}

// function isHydrateAction(action: Action): action is PayloadAction<RootState> {
//   return action.type === HYDRATE;
// }

export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/recipes' }),
  // extractRehydrationInfo(action, { reducerPath }): any {
  //   if (isHydrateAction(action)) {
  //     return action.payload[reducerPath];
  //   }
  // },
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
