import { useContext } from 'react';
import styles from './themeSwitcher.module.css';
import { ThemeContext } from '../../providers/ThemeProvider';

const ThemeSwitcher: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('ThemeSwitcher must be used within a ThemeProvider');
  }

  const { isLightTheme, toggleTheme } = themeContext;

  return (
    <>
      <p className={styles.themeTitle}>Theme:</p>
      <label htmlFor="themeSwitch" className={styles.switch}>
        <input
          type="checkbox"
          id="themeSwitch"
          className={styles.switchInput}
          checked={isLightTheme}
          onChange={toggleTheme}
        />
        <span className={styles.switchSlider}></span>
      </label>
    </>
  );
};

export default ThemeSwitcher;
