import { useEffect, useState, Dispatch, SetStateAction } from 'react';

type IUseSearchQuery = [string, Dispatch<SetStateAction<string>>];

const useSearchQuery = (key: string, defData: () => string): IUseSearchQuery => {
  const [state, setState] = useState<string>(() => {
    const localData = localStorage.getItem(key);
    return localData || defData();
  });

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
};

export default useSearchQuery;
