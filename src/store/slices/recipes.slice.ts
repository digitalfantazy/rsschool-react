import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFavorite {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
}

export interface IFavorites {
  favourites: IFavorite[];
}

const initialState: IFavorites = {
  favourites: JSON.parse(localStorage.getItem('favourites') || '[]'),
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<IFavorite>) {
      state.favourites.push(action.payload);
      localStorage.setItem('favourites', JSON.stringify(state.favourites));
    },
    removeFavorite(state, action: PayloadAction<IFavorite>) {
      state.favourites = state.favourites.filter((favorite) => favorite.id !== action.payload.id);
      localStorage.setItem('favourites', JSON.stringify(state.favourites));
    },
    clearFavourites(state) {
      state.favourites = [];
      localStorage.setItem('favourites', JSON.stringify(state.favourites));
    },
  },
});

export const recipesActions = recipesSlice.actions;
export const { addFavorite, removeFavorite, clearFavourites } = recipesSlice.actions;
export default recipesSlice.reducer;
