import { useState, useEffect } from 'react';

type UseLocalStorageReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

function useLocalStorage<T>(key: string, initialValue: T): UseLocalStorageReturnType<T> {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : initialValue);
    } catch (error) {
      console.warn(error);
    }
  }, [key, initialValue]);

  const setValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
