import React from 'react';
import loading from '../../../image/loading/loading.gif';
import styles from './loading.module.sass';

const Loading: React.FC = () => {
  return (
    <div className={styles.loading__wrapper}>
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Loading;
