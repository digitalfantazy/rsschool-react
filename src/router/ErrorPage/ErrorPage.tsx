import { useNavigate } from 'react-router-dom';
import styles from './ErrorPage.module.css';

export default function ErrorPage() {
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
