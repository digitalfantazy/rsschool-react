import { useEffect, useState, Dispatch, SetStateAction } from 'react';

type IUseSearchQuery = [string, Dispatch<SetStateAction<string>>];

const useSearchQuery = (key: string, initialValue: string): IUseSearchQuery => {
  const [value, setValue] = useState<string>(() => {
    const item = localStorage.getItem(key);
    return item ? item : initialValue;
  });

  useEffect(() => {
    return () => {
      localStorage.setItem(key, value);
    };
    // eslint-disable-next-line
  }, [key, value]);

  return [value, setValue];
};

export default useSearchQuery;
