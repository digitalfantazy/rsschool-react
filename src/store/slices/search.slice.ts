import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISearch {
  searchString: string;
}

const initialState: ISearch = {
  searchString: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchString(state, action: PayloadAction<string>) {
      state.searchString = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
