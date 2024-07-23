// store/slices/detailsSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export interface DetailsState {
  isOpen: boolean;
}

const initialState: DetailsState = {
  isOpen: false,
};

const openDetailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    openDetails(state) {
      state.isOpen = true;
    },
    closeDetails(state) {
      state.isOpen = false;
    },
    toggleDetails(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openDetails, closeDetails, toggleDetails } = openDetailsSlice.actions;
export default openDetailsSlice.reducer;
