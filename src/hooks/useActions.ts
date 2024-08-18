import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { fromActions } from '../store/slices/forms.slice';
import { countriesActions } from '../store/slices/country.slice';

const actions = {
  ...fromActions,
  ...countriesActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
