import React from 'react';
import errorImg from '../../../image/Error/Error.svg';
import styles from './error.module.sass';

const Error: React.FC = () => {
  return (
    <div className={styles.error__wrapper}>
      <div className={styles.error__title}>note.app</div>
      <div className={styles.error__content}>
        <img className="error__content-img" src={errorImg} alt="error" />
        <p className={styles.error__text}>
          There was an error on the server,
          <br />
          try to reload the page{' '}
        </p>
      </div>
    </div>
  );
};

export default Error;
