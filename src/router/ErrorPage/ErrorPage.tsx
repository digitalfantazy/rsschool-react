import { useNavigate } from 'react-router-dom';
import styles from './ErrorFallback.module.css';

export default function ErrorFallback() {
  const navigate = useNavigate();

  return (
    <div className={styles.error}>
      <p className={styles.errorMessage}>Something went wrong!</p>
      <button
        className={styles.reset}
        onClick={() => {
          navigate('/');
        }}
      >
        Try Again
      </button>
    </div>
  );
}
