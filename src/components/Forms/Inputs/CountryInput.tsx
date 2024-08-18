import { forwardRef, useState } from 'react';
import styles from '../Forms.module.css';
import { useAppSelector } from '../../../hooks/useAppSelector';

interface InputProps {
  className: string;
  id: string;
  type: string;
  placeholder: string;
  error?: string;
  value?: string;
  ref?: React.Ref<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CountryInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, type, placeholder, error, onChange, ...rest }, ref) => {
    const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
    const [isListVisible, setIsListVisible] = useState(false);
    const countries = useAppSelector((state) => state.country.countries);

    const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const input = event.target.value;
      console.log(input);
      const filtered = countries.filter((country) =>
        country.toLowerCase().includes(input.toLowerCase()),
      );
      setFilteredCountries(filtered);
      setIsListVisible(filtered.length > 0);
      if (onChange) {
        onChange(event);
      }
    };
    const handleCountrySelect = (country: string) => {
      if (ref && typeof ref !== 'function' && ref.current) {
        console.log(ref);
        (ref as React.RefObject<HTMLInputElement>)!.current!.value = country;
      }
      if (onChange) {
        console.log({ target: { value: country } });
        onChange({ target: { value: country } } as React.ChangeEvent<HTMLInputElement>);
      }

      setFilteredCountries([]);
      setIsListVisible(false);
    };

    const handleBlur = () => {
      setTimeout(() => setIsListVisible(true), 200);
    };

    const handleFocus = () => {
      if (filteredCountries.length > 0) {
        setIsListVisible(true);
      }
    };

    return (
      <div className={styles[className]}>
        <label htmlFor={id}>Country</label>
        <input
          id={id}
          type={type}
          ref={ref}
          autoComplete="on"
          placeholder={placeholder}
          onChange={handleCountryChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={error ? styles.errorInput : ''}
          {...rest}
        />
        {isListVisible && filteredCountries.length > 0 && (
          <ul className={`${styles.suggestionsList} ${isListVisible ? styles.showList : ''}`}>
            {filteredCountries.map((country) => (
              <li key={country} onClick={() => handleCountrySelect(country)}>
                {country}
              </li>
            ))}
          </ul>
        )}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    );
  },
);

export default CountryInput;
