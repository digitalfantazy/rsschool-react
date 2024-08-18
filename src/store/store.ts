import { configureStore } from '@reduxjs/toolkit';
import formSlice from './slices/forms.slice';
import countrySlice from './slices/country.slice';

export const store = configureStore({
  reducer: {
    forms: formSlice,
    country: countrySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
