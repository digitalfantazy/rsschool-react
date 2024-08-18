import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { countries } from '../../utils/helpers/countries';

interface CountryState {
  countries: string[];
}

const initialState: CountryState = {
  countries: countries,
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountries(state, action: PayloadAction<string[]>) {
      state.countries = action.payload;
    },
  },
});

export const countriesActions = countrySlice.actions;
export default countrySlice.reducer;
