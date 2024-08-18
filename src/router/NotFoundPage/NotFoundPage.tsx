import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.error_page}>
      <h1>Oops, this page is not found</h1>
      <button className={styles.link} onClick={() => navigate('/')}>
        Go back
      </button>
    </div>
  );
};

export default NotFound;
