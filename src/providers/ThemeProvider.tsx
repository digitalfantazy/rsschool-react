import { createContext, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface ThemeContextProps {
  isLightTheme: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isLightTheme, setIsLightTheme] = useLocalStorage<boolean>('light theme', false);

  const toggleTheme = () => {
    setIsLightTheme((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isLightTheme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
