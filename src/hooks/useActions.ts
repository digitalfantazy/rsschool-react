import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { recipesActions } from '../store/slices/recipes.slice';
import { paginationActions } from '../store/slices/pagination.slice';
import { AppDispatch } from '../store/store';
import { openDetailsActions } from '../store/slices/openDetails.slice';
import { searchActions } from '../store/slices/search.slice';

const actions = {
  ...recipesActions,
  ...paginationActions,
  ...openDetailsActions,
  ...searchActions,
};

export const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  return bindActionCreators(actions, dispatch);
};
