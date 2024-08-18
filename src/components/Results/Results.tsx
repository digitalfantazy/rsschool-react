import { useAppSelector } from '../../hooks/useAppSelector';
import styles from './Results.module.css';

const Results: React.FC = () => {
  const forms = useAppSelector((state) => state.forms.forms);
  const lastIndex = forms.length - 1;

  return (
    <div className={styles.resultContainer}>
      {forms.map((form, index) => (
        <div
          key={index}
          className={`${styles.result} ${index === lastIndex ? styles.highlight : ''}`}
        >
          <p>
            Name: <i>{form.name} </i>
          </p>
          <p>
            Age: <i>{form.age}</i>
          </p>
          <p>
            Email: <i>{form.email}</i>
          </p>
          <p>
            Password: <i>{form.password}</i>
          </p>
          <p>
            Gender: <i>{form.gender}</i>
          </p>
          <p>
            Country: <i>{form.country}</i>
          </p>
          {form.picture && <img src={form.picture} alt={`${form.name}'s upload`} />}
          <p>
            Terms: <i> {form.terms ? 'Accepted' : 'Not Accepted'}</i>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Results;
