import { useEffect, useState, Dispatch, SetStateAction } from 'react';

type IUseSearchQuery = [string, Dispatch<SetStateAction<string>>];

const useSearchQuery = (key: string, initialValue: string): IUseSearchQuery => {
  const [value, setValue] = useState<string>(() => {
    const item = localStorage.getItem(key);
    return item ? item : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
    return () => {
      localStorage.removeItem(value);
    };
  }, [key, value]);

  return [value, setValue];
};

export default useSearchQuery;
