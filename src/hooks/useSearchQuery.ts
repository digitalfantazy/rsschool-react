import { useEffect, Dispatch, SetStateAction } from 'react';

import { RootState } from '../store/store';
import { useActions } from './useActions';
import { useAppSelector } from './useAppSelector';

type IUseSearchQuery = [string, Dispatch<SetStateAction<string>>];

const useSearchQuery = (key: string, initialValue: string): IUseSearchQuery => {
  const { setSearchString } = useActions();
  const { searchString } = useAppSelector((state: RootState) => state.search);

  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item) {
      setSearchString(item);
    } else {
      setSearchString(initialValue);
    }
  }, [key, initialValue]);

  useEffect(() => {
    localStorage.setItem(key, searchString);
  }, [key, searchString]);

  const setSearchQuery: Dispatch<SetStateAction<string>> = (query) => {
    if (typeof query === 'function') {
      setSearchString((query as (prev: string) => string)(searchString));
    } else {
      setSearchString(query);
    }
  };

  return [searchString, setSearchQuery];
};

export default useSearchQuery;
