import { configureStore } from '@reduxjs/toolkit';
import { recipeApi } from '../api/recipeApi';
import paginationSlice from './slices/paginationSlice';
import openDetailsSlice from './slices/openDetailsSlice';

export const store = configureStore({
  reducer: {
    [recipeApi.reducerPath]: recipeApi.reducer,
    pagination: paginationSlice,
    openDetails: openDetailsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(recipeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
