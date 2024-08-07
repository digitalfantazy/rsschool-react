import { configureStore } from '@reduxjs/toolkit';
import { recipeApi } from '../api/recipeApi';
import paginationSlice from './slices/pagination.slice';
import openDetailsSlice from './slices/openDetails.slice';
import searchSlice from './slices/search.slice';
import recipesSlice from './slices/recipes.slice';

export const store = configureStore({
  reducer: {
    [recipeApi.reducerPath]: recipeApi.reducer,
    pagination: paginationSlice,
    openDetails: openDetailsSlice,
    search: searchSlice,
    recipes: recipesSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(recipeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
