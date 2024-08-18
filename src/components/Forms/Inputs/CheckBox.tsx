import { forwardRef } from 'react';
import styles from '../Forms.module.css';

interface CheckBoxProps {
  id: string;
  type: string;
  ref?: React.Ref<HTMLInputElement>;
  title: string;
  error?: string;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ id, type, title, error, ...rest }, ref) => {
    return (
      <div className={styles.formGroup}>
        <label htmlFor={id}>
          <input id={id} type={type} ref={ref} {...rest} />
          <span
            className={error ? styles.errorInput : ''}
            style={error ? { borderColor: 'red' } : undefined}
          ></span>
          {title}
        </label>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    );
  },
);

export default CheckBox;
