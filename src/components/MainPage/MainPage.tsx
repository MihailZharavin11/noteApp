import React from 'react';
import Content from '../Content/Content';
import NavComponent from '../Navigation/NavComponent';
import Error from '../suppComponent/Error/Error';
import styles from './mainPage.module.sass';
import { useAppSelector } from '../../redux/store/store';

const Mainpage: React.FC = () => {
  const { errorContent } = useAppSelector((state) => state.contentSlice);
  const { errorNavigation } = useAppSelector((state) => state.navigationSlice);

  const renderMainPage = () => {
    if (errorContent === 'Network Error' || errorNavigation === 'Network Error') {
      return <Error />;
    }
    return (
      <>
        <NavComponent />
        <Content />
      </>
    );
  };

  return (
    <div className={styles.main__wrapper}>
      <div className={styles.main__inner}>{renderMainPage()}</div>
    </div>
  );
};

export default Mainpage;
