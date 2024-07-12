import { Link } from 'react-router-dom';
import styles from './errorPage.module.css';

const NotFound = () => {
  return (
    <div className={styles.error_page}>
      <h1>Oops, this page is not found</h1>
      <button>
        <Link className={styles.link} to={'/'}>
          Go back
        </Link>
      </button>
    </div>
  );
};

export default NotFound;
