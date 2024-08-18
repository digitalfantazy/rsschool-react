import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormData } from '../../types/types';

interface FormState {
  forms: IFormData[];
}

const initialState: FormState = {
  forms: [],
};

const formSlice = createSlice({
  name: 'unControlledForm',
  initialState,
  reducers: {
    addData(state, action: PayloadAction<IFormData>) {
      state.forms.push(action.payload);
    },
  },
});

export const fromActions = formSlice.actions;

export default formSlice.reducer;
