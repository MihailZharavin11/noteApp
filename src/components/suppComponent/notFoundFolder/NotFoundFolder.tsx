import React from 'react';
import notFound from '../../../image/NotFound/notFound.svg';
import { createFolder } from '../../../redux/slices/navigationSlice/NavSlice';
import { useAppDispatch } from '../../../redux/store/store';
import styles from './notFound.module.sass';

type NotFoundFolderProps = {
  path: string;
};

const NotFoundFolder: React.FC<NotFoundFolderProps> = ({ path }) => {
  const dispatch = useAppDispatch();
  const onClickCreateFolder = () => {
    dispatch(createFolder(path));
  };

  return (
    <div className={styles.notFound__wrapper}>
      <div className={styles.notFound__inner}>
        <img className={styles.notFound__img} src={notFound} alt="notFound" />
        <p className={styles.notFound__text}>
          {' '}
          There is no such folder,
          <br /> let’s create one
        </p>
        <div className={styles.notFound__button}>
          <button
            onClick={() => {
              onClickCreateFolder();
            }}
            className="content__button black">
            Create Folder
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundFolder;
