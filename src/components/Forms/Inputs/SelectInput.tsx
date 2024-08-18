import { forwardRef } from 'react';
import styles from '../Forms.module.css';

interface InputProps {
  className: string;
  id: string;
  values: string[];
  error?: string;
  ref?: React.Ref<HTMLSelectElement>;
}

const SelectInput = forwardRef<HTMLSelectElement, InputProps>(
  ({ className, id, values, error, ...rest }, ref) => {
    return (
      <div className={styles[className]}>
        <label htmlFor={id}>{id.charAt(0).toUpperCase() + id.slice(1)}</label>
        <select
          id={id}
          ref={ref}
          defaultValue=""
          className={error ? styles.errorInput : ''}
          {...rest}
        >
          <option value="" disabled>
            Select your gender
          </option>
          {values &&
            values.map((value: string, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
        </select>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    );
  },
);

export default SelectInput;
