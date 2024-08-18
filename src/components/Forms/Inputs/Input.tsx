import { forwardRef } from 'react';
import styles from '../Forms.module.css';

interface InputProps {
  className: string;
  id: string;
  type: string;
  placeholder: string;
  error?: string | number | boolean;
  ref?: React.Ref<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, type, placeholder, error, ...rest }, ref) => {
    return (
      <div className={styles[className]}>
        <label htmlFor={id}>{id.charAt(0).toUpperCase() + id.slice(1)}</label>
        <input
          id={id}
          type={type}
          ref={ref}
          placeholder={placeholder}
          className={error ? styles.errorInput : ''}
          {...rest}
        />
        {error && <div className={styles.error}>{error}</div>}
      </div>
    );
  },
);

export default Input;
