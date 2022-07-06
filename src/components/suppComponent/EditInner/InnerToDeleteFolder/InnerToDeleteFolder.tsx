import React from 'react';
import xmark from '../../../../image/modal/xmark.svg';
import { deletesFolder } from '../../../../redux/slices/navigationSlice/NavSlice';
import { useNavigate } from 'react-router-dom';
import WidthWrapper from '../../../HOC/widthWrapper';
import styles from '../editInner.module.sass';
import { useAppDispatch } from '../../../../redux/store/store';

type EdditInnerToDeleteProps = {
  popUpWrapper: Boolean;
  setPopUpWrapper: Function;
  title: string;
  path: string;
};

const EdditInnerToDelete: React.FC<EdditInnerToDeleteProps> = ({
  popUpWrapper,
  setPopUpWrapper,
  title,
  path,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteFolder = () => {
    dispatch(deletesFolder({ title, path }));
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className={styles.rename__wrapper}>
      <div className={styles.rename__content}>
        <div className={styles.rename__title}>
          <p>Delete the folder?</p>
          <img onClick={() => setPopUpWrapper(!popUpWrapper)} src={xmark} alt="" />
        </div>
        <div className={styles.rename__text}>All notes will also be deleted</div>
      </div>
      <div className={styles.rename_buttons}>
        <button
          onClick={() => setPopUpWrapper(!popUpWrapper)}
          className={styles.rename__buttonsCancel}>
          Cancel
        </button>
        <button
          onClick={() => {
            setPopUpWrapper(!popUpWrapper);
            deleteFolder();
            navigate('../');
          }}
          className={styles.rename__butonsDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default WidthWrapper(EdditInnerToDelete);
