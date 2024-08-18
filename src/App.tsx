import { Link } from 'react-router-dom';
import styles from './App.module.css';
import Results from './components/Results/Results';

const App: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>React-Form-Task</h1>
          <hr />
          <nav>
            <ul>
              <li>
                <Link to={'/uncontrolled-form'}>UnControlledForm</Link>
              </li>
              <li>
                <Link to={'/controlled-form'}>ControlledForm</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Results />
      </div>
    </>
  );
};

export default App;
