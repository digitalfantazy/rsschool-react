import React from 'react';
import styles from './loading.module.css';

class Loading extends React.Component {
  render() {
    return (
      <div className={styles.loader_сontainer}>
        <div className={styles.loader} />
      </div>
    );
  }
}

export default Loading;
